"""LLM client with Groq primary provider and Gemini fallback."""

from __future__ import annotations

import json
import logging
import socket
from dataclasses import dataclass
from typing import Any, Protocol, TypeVar
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from pydantic import BaseModel, ValidationError

from app.core.config import Settings

logger = logging.getLogger(__name__)

SchemaT = TypeVar("SchemaT", bound=BaseModel)


class LLMServiceUnavailable(RuntimeError):
    """Raised when both primary and fallback LLM providers fail."""


class LLMProviderTimeout(RuntimeError):
    """Raised when an LLM provider request times out."""


class LLMRateLimit(RuntimeError):
    """Raised when an LLM provider returns a rate limit response."""


class LLMProviderError(RuntimeError):
    """Raised for non-retryable provider failures."""


class LLMTransport(Protocol):
    """Transport contract used by the LLM client."""

    def complete_json(
        self,
        *,
        provider: str,
        model: str,
        api_key: str,
        prompt: str,
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """Return a raw JSON-compatible model response from a provider."""
        ...


@dataclass(frozen=True)
class LLMProviderConfig:
    """Configuration for a single LLM provider."""

    name: str
    model: str
    api_key: str | None


class HTTPProviderTransport:
    """Minimal HTTP transport for Groq and Gemini JSON completions."""

    def complete_json(
        self,
        *,
        provider: str,
        model: str,
        api_key: str,
        prompt: str,
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """Call the configured provider and return parsed JSON content."""
        if provider == "groq":
            return self._call_groq(model=model, api_key=api_key, prompt=prompt, timeout_seconds=timeout_seconds)
        if provider == "gemini":
            return self._call_gemini(model=model, api_key=api_key, prompt=prompt, timeout_seconds=timeout_seconds)
        raise LLMProviderError(f"Unsupported provider: {provider}")

    def _call_groq(
        self,
        *,
        model: str,
        api_key: str,
        prompt: str,
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """Call Groq chat completions and parse the JSON response content."""
        body = {
            "model": model,
            "messages": [
                {
                    "role": "system",
                    "content": "Return only valid JSON matching the requested schema.",
                },
                {"role": "user", "content": prompt},
            ],
            "temperature": 0,
            "response_format": {"type": "json_object"},
        }
        payload = self._post_json(
            url="https://api.groq.com/openai/v1/chat/completions",
            api_key=api_key,
            body=body,
            timeout_seconds=timeout_seconds,
        )
        content = payload["choices"][0]["message"]["content"]
        return self._loads_json_content(content)

    def _call_gemini(
        self,
        *,
        model: str,
        api_key: str,
        prompt: str,
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """Call Gemini generateContent and parse the JSON response content."""
        body = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": (
                                "Return only valid JSON matching the requested schema.\n\n"
                                f"{prompt}"
                            )
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0,
                "responseMimeType": "application/json",
            },
        }
        payload = self._post_json(
            url=f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}",
            api_key=None,
            body=body,
            timeout_seconds=timeout_seconds,
        )
        content = payload["candidates"][0]["content"]["parts"][0]["text"]
        return self._loads_json_content(content)

    def _post_json(
        self,
        *,
        url: str,
        api_key: str | None,
        body: dict[str, Any],
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """POST JSON and normalize common provider errors."""
        headers = {"Content-Type": "application/json"}
        if api_key:
            headers["Authorization"] = f"Bearer {api_key}"

        request = Request(
            url=url,
            data=json.dumps(body).encode("utf-8"),
            headers=headers,
            method="POST",
        )

        try:
            with urlopen(request, timeout=timeout_seconds) as response:
                return json.loads(response.read().decode("utf-8"))
        except socket.timeout as exc:
            raise LLMProviderTimeout("Provider request timed out.") from exc
        except HTTPError as exc:
            if exc.code == 429:
                raise LLMRateLimit("Provider rate limit reached.") from exc
            raise LLMProviderError(f"Provider HTTP error: {exc.code}") from exc
        except URLError as exc:
            if isinstance(exc.reason, socket.timeout):
                raise LLMProviderTimeout("Provider request timed out.") from exc
            raise LLMProviderError(f"Provider request failed: {exc.reason}") from exc
        except (KeyError, IndexError, json.JSONDecodeError) as exc:
            raise LLMProviderError("Provider returned an unexpected response shape.") from exc

    def _loads_json_content(self, content: str) -> dict[str, Any]:
        """Parse provider text content as a JSON object."""
        parsed = json.loads(content)
        if not isinstance(parsed, dict):
            raise LLMProviderError("Provider returned JSON that is not an object.")
        return parsed


class LLMClient:
    """Validate LLM JSON responses with Groq primary and Gemini fallback."""

    def __init__(
        self,
        settings: Settings,
        transport: LLMTransport | None = None,
        timeout_seconds: float = 12.0,
    ) -> None:
        self.settings = settings
        self.transport = transport or HTTPProviderTransport()
        self.timeout_seconds = timeout_seconds
        self.provider_used: str | None = None

    def complete_json(
        self,
        *,
        prompt: str,
        response_schema: type[SchemaT],
    ) -> SchemaT:
        """Return schema-validated JSON, retrying Gemini when Groq fails.

        The fallback is used when Groq times out, hits rate limits, or returns
        content that does not validate against the requested Pydantic schema.
        """
        providers = [
            LLMProviderConfig(
                name="groq",
                model="llama-3.1-70b-versatile",
                api_key=self.settings.groq_api_key,
            ),
            LLMProviderConfig(
                name="gemini",
                model="gemini-1.5-flash",
                api_key=self.settings.gemini_api_key,
            ),
        ]

        failures: list[str] = []
        for provider in providers:
            try:
                result = self._call_and_validate(provider, prompt, response_schema)
                self.provider_used = provider.name
                logger.info("llm_response_validated", extra={"provider_used": provider.name})
                return result
            except (LLMProviderTimeout, LLMRateLimit, ValidationError) as exc:
                failures.append(f"{provider.name}: {exc.__class__.__name__}")
                logger.warning(
                    "llm_provider_retryable_failure",
                    extra={"provider_used": provider.name, "error": exc.__class__.__name__},
                )
            except LLMProviderError as exc:
                failures.append(f"{provider.name}: {exc.__class__.__name__}")
                logger.error(
                    "llm_provider_failure",
                    extra={"provider_used": provider.name, "error": str(exc)},
                )

        self.provider_used = None
        raise LLMServiceUnavailable(
            "Both Groq and Gemini failed to return schema-valid JSON. "
            f"Failures: {', '.join(failures)}"
        )

    def _call_and_validate(
        self,
        provider: LLMProviderConfig,
        prompt: str,
        response_schema: type[SchemaT],
    ) -> SchemaT:
        """Call a provider and validate the raw JSON response."""
        if not provider.api_key:
            raise LLMProviderError(f"{provider.name} API key is not configured.")

        raw = self.transport.complete_json(
            provider=provider.name,
            model=provider.model,
            api_key=provider.api_key,
            prompt=prompt,
            timeout_seconds=self.timeout_seconds,
        )
        return response_schema.model_validate(raw)
