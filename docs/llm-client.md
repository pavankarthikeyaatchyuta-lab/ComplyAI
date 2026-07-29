# Phase 11 LLM Client

This document describes the LLM client implemented for ComplyAI.

## File

```text
backend/app/integrations/llm_client.py
```

## Provider Strategy

Primary provider:

```text
Groq
```

Fallback provider:

```text
Gemini
```

## Behavior

Every LLM response is validated against a caller-provided Pydantic schema.

Fallback to Gemini occurs when Groq returns:

- timeout
- rate limit
- schema mismatch

If both providers fail, the client raises:

```text
LLMServiceUnavailable
```

## Logging

The client logs provider outcome with:

```text
provider_used
```

Successful validation logs the selected provider. Retryable and non-retryable failures also include provider context.

## Transport Design

The client uses a transport interface:

```text
LLMTransport
```

This allows:

- real HTTP provider calls in production
- mocked provider responses in tests
- deterministic fallback testing

## Tests

Test file:

```text
backend/tests/test_llm_client.py
```

Covered cases:

- Groq success does not call Gemini
- Groq timeout retries Gemini
- Groq rate limit retries Gemini
- Groq schema mismatch retries Gemini
- both providers failing raises `LLMServiceUnavailable`

Tests use mocked transports and do not call real provider APIs.
