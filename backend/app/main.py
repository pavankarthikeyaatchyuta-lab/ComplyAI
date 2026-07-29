"""FastAPI application entry point for ComplyAI."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import documents, health, reports, reviews, workflows
from app.core.config import get_settings
from app.core.errors import register_exception_handlers
from app.core.logging import configure_logging


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()
    configure_logging(settings.log_level)

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="ComplyAI turns compliance documents into verified action plans.",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)

    app.include_router(health.router, prefix="/api", tags=["health"])
    app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
    app.include_router(workflows.router, prefix="/api/workflows", tags=["workflows"])
    app.include_router(reviews.router, prefix="/api/workflows", tags=["reviews"])
    app.include_router(reports.router, prefix="/api", tags=["reports"])

    return app


app = create_app()
