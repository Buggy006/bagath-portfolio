# ── Waitlist service: HTTP API → Lambda → DynamoDB (+ SES notify) ──

variable "notify_email" {
  description = "Address that receives a notification per signup (SES identity — verify once via the emailed link)."
  type        = string
  default     = "" # empty disables notifications
}

variable "site_origin" {
  description = "Origin allowed by CORS, e.g. https://dxxxx.cloudfront.net. Use * only before the first deploy."
  type        = string
  default     = "*"
}

resource "aws_dynamodb_table" "waitlist" {
  name         = "${var.project_name}-waitlist"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "email"

  attribute {
    name = "email"
    type = "S"
  }

  tags = local.tags
}

data "archive_file" "waitlist_lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/waitlist/handler.py"
  output_path = "${path.module}/.build/waitlist.zip"
}

resource "aws_iam_role" "waitlist_lambda" {
  name = "${var.project_name}-waitlist-lambda"
  tags = local.tags

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy" "waitlist_lambda" {
  name = "waitlist"
  role = aws_iam_role.waitlist_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["dynamodb:PutItem"]
        Resource = aws_dynamodb_table.waitlist.arn
      },
      {
        Effect   = "Allow"
        Action   = ["ses:SendEmail"]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
    ]
  })
}

resource "aws_lambda_function" "waitlist" {
  function_name    = "${var.project_name}-waitlist"
  role             = aws_iam_role.waitlist_lambda.arn
  runtime          = "python3.12"
  handler          = "handler.lambda_handler"
  filename         = data.archive_file.waitlist_lambda.output_path
  source_code_hash = data.archive_file.waitlist_lambda.output_base64sha256
  timeout          = 10
  memory_size      = 128
  tags             = local.tags

  environment {
    variables = {
      TABLE_NAME   = aws_dynamodb_table.waitlist.name
      NOTIFY_EMAIL = var.notify_email
    }
  }
}

resource "aws_ses_email_identity" "notify" {
  count = var.notify_email != "" ? 1 : 0
  email = var.notify_email
}

resource "aws_apigatewayv2_api" "waitlist" {
  name          = "${var.project_name}-api"
  protocol_type = "HTTP"
  tags          = local.tags

  cors_configuration {
    allow_origins = [var.site_origin]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }
}

resource "aws_apigatewayv2_integration" "waitlist" {
  api_id                 = aws_apigatewayv2_api.waitlist.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.waitlist.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "waitlist" {
  api_id    = aws_apigatewayv2_api.waitlist.id
  route_key = "POST /waitlist"
  target    = "integrations/${aws_apigatewayv2_integration.waitlist.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.waitlist.id
  name        = "$default"
  auto_deploy = true
  tags        = local.tags

  default_route_settings {
    throttling_burst_limit = 5
    throttling_rate_limit  = 2
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.waitlist.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.waitlist.execution_arn}/*/*"
}

output "waitlist_api_url" {
  description = "Base URL for the site's NEXT_PUBLIC_API_BASE_URL."
  value       = aws_apigatewayv2_api.waitlist.api_endpoint
}
