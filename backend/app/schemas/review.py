"""Review and revision schemas."""

from enum import Enum

from pydantic import BaseModel, Field


class ReviewStatus(str, Enum):
    """Reviewer decision for generated compliance artifacts."""

    APPROVED = "approved"
    READY_WITH_WARNINGS = "ready_with_warnings"
    REVISION_REQUIRED = "revision_required"


class ReviewSeverity(str, Enum):
    """Severity for reviewer findings."""

    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"


class ReviewerFinding(BaseModel):
    """Single reviewer finding from missing info or consistency checks."""

    category: str = Field(min_length=3)
    message: str = Field(min_length=5)
    severity: ReviewSeverity
    field: str | None = None


class ReviewerOutput(BaseModel):
    """Strict schema for reviewer output."""

    review_status: ReviewStatus
    missing_information: list[ReviewerFinding] = Field(default_factory=list)
    inconsistencies: list[ReviewerFinding] = Field(default_factory=list)
    require_revision: bool
    revision_count: int = Field(ge=0, le=1)
    revision_available: bool
    completeness_score: float = Field(ge=0, le=1)
    provider_used: str = Field(min_length=1)
    summary: str = Field(min_length=10)


class RevisionRequest(BaseModel):
    """User request for the single allowed revision."""

    reason: str = Field(min_length=3)
    details: str = Field(min_length=5)
    affected_sections: list[str] = Field(default_factory=list)


class ReviewResponse(BaseModel):
    """Review-ready status for a workflow."""

    workflow_id: str
    review_status: str
    completeness_score: float
    warnings: list[str]
    revision_available: bool
