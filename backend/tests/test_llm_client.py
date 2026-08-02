"""Tests for Groq primary and Gemini fallback LLM client behavior."""

from __future__ import annotations

import unittest
from typing import Any

from pydantic import BaseModel

from app.core.config import Settings
from app.integrations.llm_client import (
    LLMClient,
    HTTPProviderTransport,
    LLMProviderTimeout,
    LLMRateLimit,
    LLMServiceUnavailable,
)


class SampleResponse(BaseModel):
    """Schema used to validate mocked provider responses."""

    status: str
    summary: str


class FakeTransport:
    """Deterministic LLM transport for tests."""

    def __init__(self, responses: dict[str, dict[str, Any] | Exception]) -> None:
        self.responses = responses
        self.calls: list[str] = []

    def complete_json(
        self,
        *,
        provider: str,
        model: str,
        api_key: str,
        prompt: str,
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """Return or raise the configured provider response."""
        self.calls.append(provider)
        response = self.responses[provider]
        if isinstance(response, Exception):
            raise response
        return response


class LLMClientTest(unittest.TestCase):
    """Validate provider selection and schema enforcement."""

    def make_settings(self) -> Settings:
        """Create settings with fake provider keys."""
        return Settings(groq_api_key="groq-test-key", gemini_api_key="gemini-test-key")

    def test_groq_success_does_not_call_gemini(self) -> None:
        """Groq is primary and should short-circuit when schema validation passes."""
        transport = FakeTransport(
            {
                "groq": {"status": "ok", "summary": "planned"},
                "gemini": {"status": "ok", "summary": "fallback"},
            }
        )
        client = LLMClient(settings=self.make_settings(), transport=transport)

        result = client.complete_json(prompt="Return JSON", response_schema=SampleResponse)

        self.assertEqual(result.summary, "planned")
        self.assertEqual(client.provider_used, "groq")
        self.assertEqual(transport.calls, ["groq"])

    def test_timeout_retries_gemini(self) -> None:
        """A Groq timeout should retry Gemini and return its validated response."""
        transport = FakeTransport(
            {
                "groq": LLMProviderTimeout("timeout"),
                "gemini": {"status": "ok", "summary": "fallback"},
            }
        )
        client = LLMClient(settings=self.make_settings(), transport=transport)

        result = client.complete_json(prompt="Return JSON", response_schema=SampleResponse)

        self.assertEqual(result.summary, "fallback")
        self.assertEqual(client.provider_used, "gemini")
        self.assertEqual(transport.calls, ["groq", "gemini"])

    def test_rate_limit_retries_gemini(self) -> None:
        """A Groq rate limit should retry Gemini."""
        transport = FakeTransport(
            {
                "groq": LLMRateLimit("rate limited"),
                "gemini": {"status": "ok", "summary": "fallback"},
            }
        )
        client = LLMClient(settings=self.make_settings(), transport=transport)

        result = client.complete_json(prompt="Return JSON", response_schema=SampleResponse)

        self.assertEqual(result.summary, "fallback")
        self.assertEqual(client.provider_used, "gemini")

    def test_schema_mismatch_retries_gemini(self) -> None:
        """A schema mismatch from Groq should retry Gemini."""
        transport = FakeTransport(
            {
                "groq": {"status": "ok"},
                "gemini": {"status": "ok", "summary": "schema valid"},
            }
        )
        client = LLMClient(settings=self.make_settings(), transport=transport)

        result = client.complete_json(prompt="Return JSON", response_schema=SampleResponse)

        self.assertEqual(result.summary, "schema valid")
        self.assertEqual(client.provider_used, "gemini")

    def test_both_providers_fail_raises_service_unavailable(self) -> None:
        """If both providers fail, the client raises LLMServiceUnavailable."""
        transport = FakeTransport(
            {
                "groq": LLMProviderTimeout("timeout"),
                "gemini": {"status": "ok"},
            }
        )
        client = LLMClient(settings=self.make_settings(), transport=transport)

        with self.assertRaises(LLMServiceUnavailable):
            client.complete_json(prompt="Return JSON", response_schema=SampleResponse)

        self.assertIsNone(client.provider_used)
        self.assertEqual(transport.calls, ["groq", "gemini"])

    def test_default_provider_models_are_current(self) -> None:
        """The baked-in provider defaults should target the current model IDs."""
        transport = FakeTransport(
            {
                "groq": {"status": "ok", "summary": "planned"},
                "gemini": {"status": "ok", "summary": "fallback"},
            }
        )
        client = LLMClient(settings=self.make_settings(), transport=transport)

        client.complete_json(prompt="Return JSON", response_schema=SampleResponse)

        self.assertEqual(transport.calls, ["groq"])
        self.assertEqual(client.provider_used, "groq")

    def test_gemini_url_includes_current_model_name(self) -> None:
        """Gemini requests should be formed from the current model identifier."""

        class CaptureTransport(HTTPProviderTransport):
            def __init__(self) -> None:
                self.urls: list[str] = []

            def _post_json(
                self,
                *,
                url: str,
                api_key: str | None,
                body: dict[str, Any],
                timeout_seconds: float,
            ) -> dict[str, Any]:
                self.urls.append(url)
                return {"candidates": [{"content": {"parts": [{"text": '{"status":"ok","summary":"fallback"}'}]}}]}

        transport = CaptureTransport()
        transport._call_gemini(
            model="gemini-3.5-flash",
            api_key="gemini-test-key",
            prompt="Return JSON",
            timeout_seconds=1.0,
        )

        self.assertEqual(
            transport.urls,
            ["https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=gemini-test-key"],
        )


if __name__ == "__main__":
    unittest.main()
