variable "project_name" {
  description = "Used as prefix for resource names and tags."
  type        = string
  default     = "bagath-portfolio"
}

variable "aws_region" {
  description = "Region for the S3 bucket. CloudFront itself is global."
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "Optional custom domain (e.g. bagath.dev). Leave empty to use the default *.cloudfront.net URL."
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for the custom domain. MUST be in us-east-1 (CloudFront requirement). Required when domain_name is set."
  type        = string
  default     = ""

  validation {
    condition     = var.acm_certificate_arn == "" || can(regex("^arn:aws:acm:us-east-1:", var.acm_certificate_arn))
    error_message = "CloudFront requires the ACM certificate to live in us-east-1."
  }
}
