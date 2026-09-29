# Fitness Agent — future product (parked spec)

**Status: parked.** Decided 2026-09-28: the AI fitness agent is a
separate product, not a portfolio feature. It gets its own repo, its
own roadmap, and its own working session when we start. This document
is the warm handoff so that session doesn't start from zero.

## Product sketch

An AI fitness assistant under the Buggy fitness brand: answers training
questions in Bagath's voice/system (progressive overload, tracked
metrics, honest iteration), qualifies coaching leads, and later becomes
the front door of the coaching business (intake, programming Q&A).

## What was already designed (from the portfolio v1 planning)

### Architecture (drafted, unbuilt)
- `POST /chat` on API Gateway HTTP API → Lambda (Python 3.12) → Claude model
- Persona/system prompt grounded in the fitness content + coaching offer
- Non-streaming v1; streaming later
- DynamoDB `chat_usage` for per-IP daily caps

### Cost controls (hard requirement — public paid endpoint)
- API Gateway throttling (burst 3 / rate 1 rps)
- Per-IP daily message cap
- Global daily token/cost budget counter — polite refusal when spent
- `max_tokens` clamp, input length limit, short context window
- Kill-switch env var

### Decision D2 (still open): provider + model
- **Amazon Bedrock**: IAM-only auth (no key management), AWS-native, on-brand; partner pricing, feature lag
- **Claude API direct**: first-party pricing/features; key lives in Secrets Manager
- Model candidates (first-party pricing, verify current at build time):
  Claude Haiku 4.5 ($1/$5 per MTok), Claude Sonnet 5 ($2/$10), Claude Opus 5 ($5/$25)
- Projected cost at cap: ~200 chats/day × ~1K tokens ≈ single-digit $/month on Haiku-class

### Guardrails (planned stories)
- Scoped system prompt (fitness/coaching topics only), graceful decline otherwise
- Prompt-injection test set before launch; abuse/burst simulation
- Clear "AI assistant" disclosure in UI

## Integration back to the portfolio
- The portfolio's athlete mode is the marketing surface: under-construction
  badge → waitlist signups (kept in the portfolio) are the launch audience
- When the agent ships, the portfolio links out to it (own domain/subdomain)

## Ready-made waitlist implementation
Removed from the portfolio 2026-09-30 (coaching ~3 months out), but
fully built and tested at portfolio commit `facedc5`: Python Lambda
(validation, honeypot, idempotent DynamoDB writes, SES notify) with a
7-test pytest+moto suite, Terraform (DynamoDB + HTTP API + throttling
+ CORS), and a React form with graceful fallback. Cherry-pick or copy
from that commit when this product starts.

## Kickoff checklist for the future session
1. New repo (name TBD: e.g. `buggy-fit`)
2. Re-run D2 with current model pricing
3. Decide brand/domain
4. Import waitlist contacts as the beta audience
