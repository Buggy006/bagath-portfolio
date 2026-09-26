output "site_url" {
  description = "Where the site is served."
  value       = var.domain_name != "" ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "s3_bucket" {
  description = "Bucket the CI pipeline syncs the build into (S3_BUCKET secret)."
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "Distribution the CI pipeline invalidates (CLOUDFRONT_DISTRIBUTION_ID secret)."
  value       = aws_cloudfront_distribution.site.id
}
