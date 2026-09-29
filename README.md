# Bagath — Portfolio

Personal branding site: software engineering (Python · AWS · Terraform ·
Data Engineering · DevOps) with a fitness/coaching section that will grow
into its own thing.

**Stack:** Next.js 15 (static export) · Tailwind CSS · TypeScript
**Hosting:** S3 + CloudFront, provisioned with Terraform (see [`infra/`](infra/))
**CI/CD:** GitHub Actions — builds on every push, deploys `master` to AWS

## Persona switch

The hero toggle flips the whole site between the **engineer** profile
(blue) and the **athlete** profile (amber) — different sections, accent
color, nav, and CTAs. The choice is remembered per visitor and shareable
via URL: link `/?p=athlete` from Instagram, the plain URL from LinkedIn.

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

## Backend (waitlist)

`backend/waitlist/` — Python Lambda with tests (`python -m pytest backend/waitlist`).
Provisioned by `infra/waitlist.tf` (DynamoDB + HTTP API + SES). After
`terraform apply`, set `NEXT_PUBLIC_API_BASE_URL` to the `waitlist_api_url`
output at build time; without it the form falls back to a mailto button.
