"""Waitlist signup Lambda.

POST /waitlist  {"email": "...", "name": "...", "persona": "engineer"|"athlete",
                 "website": ""  <- honeypot, humans leave it empty}

Stores the signup idempotently in DynamoDB and notifies via SES.
Notification failures never fail the signup.
"""

import json
import logging
import os
import re
import time

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PERSONAS = {"engineer", "athlete"}

_dynamodb = boto3.resource("dynamodb")
_ses = boto3.client("ses")


def _resp(status, body):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def lambda_handler(event, _context):
    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return _resp(400, {"error": "invalid JSON"})

    # Honeypot: bots fill hidden fields. Pretend success, store nothing.
    if body.get("website"):
        logger.info("honeypot tripped")
        return _resp(200, {"ok": True})

    email = (body.get("email") or "").strip().lower()
    if not EMAIL_RE.match(email) or len(email) > 254:
        return _resp(400, {"error": "a valid email is required"})

    name = (body.get("name") or "").strip()[:120]
    persona = body.get("persona") if body.get("persona") in PERSONAS else "unknown"

    table = _dynamodb.Table(os.environ["TABLE_NAME"])
    created = True
    try:
        table.put_item(
            Item={
                "email": email,
                "name": name,
                "persona": persona,
                "created_at": int(time.time()),
            },
            ConditionExpression="attribute_not_exists(email)",
        )
    except table.meta.client.exceptions.ConditionalCheckFailedException:
        created = False  # already on the list — idempotent success

    notify_to = os.environ.get("NOTIFY_EMAIL")
    if created and notify_to:
        try:
            _ses.send_email(
                Source=notify_to,
                Destination={"ToAddresses": [notify_to]},
                Message={
                    "Subject": {"Data": f"New waitlist signup: {email}"},
                    "Body": {
                        "Text": {
                            "Data": (
                                f"Email: {email}\n"
                                f"Name: {name or '—'}\n"
                                f"Persona: {persona}\n"
                            )
                        }
                    },
                },
            )
        except Exception:  # noqa: BLE001 — never fail the signup on notify
            logger.exception("SES notification failed")

    return _resp(200, {"ok": True, "already_registered": not created})
