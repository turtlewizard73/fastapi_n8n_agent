from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        # Use top level .env file (one level above ./backend/)
        env_file="../.env",
        env_ignore_empty=True,
        extra="ignore",
    )

    app_title: str = "FastAPI Agent Service"
    app_version: str = "1.0.0"
    app_description: str = "A FastAPI application for hosting an agent service"


settings = Settings()
