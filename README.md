# Bagath — Portfolio

Personal branding site: software engineering (Python · AWS · Terraform ·
Data Engineering · DevOps) with a fitness/coaching section that will grow
into its own thing.

**Stack:** Next.js 15 (static export) · Tailwind CSS · TypeScript
**Hosting:** S3 + CloudFront, provisioned with Terraform (see [`infra/`](infra/))
**CI/CD:** GitHub Actions — builds on every push, deploys `master` to AWS

## Editing content

Everything shown on the site lives in **[`content/site.ts`](content/site.ts)**.
Replace the values marked `[PLACEHOLDER]` — no other file needs touching.

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
```

## Deploying

One-time infrastructure setup and the CI secrets it needs:
[`infra/README.md`](infra/README.md).

## Structure

```
app/          Layout, global styles, page composition
components/   One component per section (hero, skills, fitness, …)
content/      site.ts — single source of truth for all copy
infra/        Terraform: S3 + CloudFront + OAC
.github/      Build & deploy workflow
```
