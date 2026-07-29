"""LLM provider client placeholder."""


class LLMClient:
    """Provider abstraction for Gemini, Groq, or fallback models."""

    def complete_json(self, provider: str, prompt: str) -> dict:
        """Return scaffolded JSON from a provider call."""
        return {
            "provider": provider,
            "prompt_preview": prompt[:120],
            "status": "stubbed",
        }
