import importlib
import json
import os

import boto3
import pytest
from moto import mock_aws

TABLE = "waitlist-test"


@pytest.fixture()
def handler(monkeypatch):
    monkeypatch.setenv("AWS_DEFAULT_REGION", "us-east-1")
    monkeypatch.setenv("AWS_ACCESS_KEY_ID", "testing")
    monkeypatch.setenv("AWS_SECRET_ACCESS_KEY", "testing")
    monkeypatch.setenv("TABLE_NAME", TABLE)
    monkeypatch.setenv("NOTIFY_EMAIL", "owner@example.com")
    with mock_aws():
        boto3.resource("dynamodb").create_table(
            TableName=TABLE,
            KeySchema=[{"AttributeName": "email", "KeyType": "HASH"}],
            AttributeDefinitions=[{"AttributeName": "email", "AttributeType": "S"}],
            BillingMode="PAY_PER_REQUEST",
        )
        boto3.client("ses").verify_email_identity(EmailAddress="owner@example.com")
        import handler as module

        importlib.reload(module)  # bind boto3 clients inside the mock
        yield module


def post(handler, payload):
    return handler.lambda_handler({"body": json.dumps(payload)}, None)


def test_valid_signup_stored_and_ok(handler):
    res = post(handler, {"email": "Fan@Example.com", "name": "Fan", "persona": "athlete"})
    assert res["statusCode"] == 200
    assert json.loads(res["body"]) == {"ok": True, "already_registered": False}
    item = boto3.resource("dynamodb").Table(TABLE).get_item(Key={"email": "fan@example.com"})["Item"]
    assert item["persona"] == "athlete"
    assert item["name"] == "Fan"


def test_duplicate_is_idempotent(handler):
    post(handler, {"email": "x@y.co"})
    res = post(handler, {"email": "x@y.co"})
    assert res["statusCode"] == 200
    assert json.loads(res["body"])["already_registered"] is True


def test_invalid_email_rejected(handler):
    res = post(handler, {"email": "not-an-email"})
    assert res["statusCode"] == 400


def test_missing_email_rejected(handler):
    res = post(handler, {})
    assert res["statusCode"] == 400


def test_honeypot_pretends_success_stores_nothing(handler):
    res = post(handler, {"email": "bot@spam.io", "website": "http://spam"})
    assert res["statusCode"] == 200
    scan = boto3.resource("dynamodb").Table(TABLE).scan()
    assert scan["Count"] == 0


def test_invalid_json_rejected(handler):
    res = handler.lambda_handler({"body": "{nope"}, None)
    assert res["statusCode"] == 400


def test_unknown_persona_normalized(handler):
    post(handler, {"email": "a@b.co", "persona": "hacker"})
    item = boto3.resource("dynamodb").Table(TABLE).get_item(Key={"email": "a@b.co"})["Item"]
    assert item["persona"] == "unknown"
