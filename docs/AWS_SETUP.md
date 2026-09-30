# AWS setup — Bagath's 15-minute checklist (issue #2)

Do this once; everything else deploys itself.

## 1. Account
aws.amazon.com → Create account (free tier). Region: **ap-south-1** (Mumbai).

## 2. Deploy user (least privilege)
IAM → Users → Create user `portfolio-deployer` → Attach policies directly
→ Create policy → JSON → paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SiteAndState",
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": [
        "arn:aws:s3:::bagath-portfolio-*",
        "arn:aws:s3:::bagath-portfolio-*/*"
      ]
    },
    {
      "Sid": "CDN",
      "Effect": "Allow",
      "Action": ["cloudfront:*"],
      "Resource": "*"
    },
    {
      "Sid": "EdgeFunction",
      "Effect": "Allow",
      "Action": ["cloudfront:*"],
      "Resource": "*"
    }
  ]
}
```

Name it `portfolio-deploy-policy`. v1 is fully static — only S3 and
CloudFront are needed.

## 3. Access keys
The new user → Security credentials → Create access key →
"Third-party service" → copy **Access key ID** and **Secret**.

## 4. GitHub secrets
Repo → Settings → Secrets and variables → Actions → add:

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | from step 3 |
| `AWS_SECRET_ACCESS_KEY` | from step 3 |
| `AWS_REGION` | `ap-south-1` |

(`S3_BUCKET` and `CLOUDFRONT_DISTRIBUTION_ID` come from terraform
outputs after first apply.)

## 5. Tell Claude
Say "AWS is ready" in the session — Claude takes it from there:
baseline PR → merge → terraform apply → live URL.
