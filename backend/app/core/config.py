"""Application configuration loaded from environment variables."""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings for the ComplyAI backend."""

    app_name: str = "ComplyAI API"
    app_version: str = "0.1.0"
    log_level: str = "INFO"
    database_url: str = "sqlite:///./complyai.db"
    upload_dir: str = "./uploads"
    report_dir: str = "./reports"
    allowed_origins: list[str] = Field(default_factory=lambda: ["http://localhost:5173"])
    gemini_api_key: str | None = None
    groq_api_key: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """Return cached application settings."""
    return Settings()
