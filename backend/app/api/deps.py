"""Dependency injection helpers for FastAPI routes."""

from functools import lru_cache

from app.core.config import Settings, get_settings
from app.services.document_service import DocumentService
from app.services.report_service import ReportService
from app.services.workflow_service import WorkflowService


@lru_cache
def get_document_service() -> DocumentService:
    """Return the document service singleton for the current process."""
    return DocumentService(settings=get_settings())


@lru_cache
def get_workflow_service() -> WorkflowService:
    """Return the workflow service singleton for the current process."""
    return WorkflowService(settings=get_settings())


@lru_cache
def get_report_service() -> ReportService:
    """Return the report service singleton for the current process."""
    return ReportService(settings=get_settings())


def get_app_settings() -> Settings:
    """Expose settings as an injectable dependency."""
    return get_settings()
