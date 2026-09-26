# Infrastructure — S3 + CloudFront via Terraform

Static site hosting: a **private S3 bucket** served through **CloudFront**
with Origin Access Control (no public bucket). A CloudFront Function
rewrites directory-style URLs to `index.html` so Next.js static export
routing works.

```
Browser ──> CloudFront (HTTPS, cache, edge rewrite) ──> S3 (private, OAC)
```

## One-time setup

Requires Terraform >= 1.5 and AWS credentials with rights to create
S3/CloudFront/IAM-policy resources.

```bash
cd infra
terraform init
terraform plan            # review
terraform apply
```

Outputs give you the live URL, the bucket name, and the distribution ID.

## First deploy (manual)

```bash
npm run build                                   # writes ./out
aws s3 sync out/ "s3://$(terraform -chdir=infra output -raw s3_bucket)" --delete
aws cloudfront create-invalidation \
  --distribution-id "$(terraform -chdir=infra output -raw cloudfront_distribution_id)" \
  --paths "/*"
```

After that, CI deploys automatically — see `.github/workflows/deploy.yml`.
Add these GitHub repo secrets (Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Deploy user credentials (scope to this bucket + distribution) |
| `AWS_REGION` | e.g. `ap-south-1` |
| `S3_BUCKET` | `terraform output -raw s3_bucket` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `terraform output -raw cloudfront_distribution_id` |

## Custom domain (later)

1. Request an ACM certificate for the domain **in us-east-1** and validate it.
2. `terraform apply -var domain_name=your.domain -var acm_certificate_arn=arn:aws:acm:us-east-1:...`
3. Point DNS (ALIAS/CNAME) at the CloudFront domain name.

## Notes

- State is local by default; uncomment the `backend "s3"` block in
  `versions.tf` once you have a state bucket.
- Estimated cost at portfolio traffic: well under $1/month (CloudFront +
  S3 free tiers cover most of it).
