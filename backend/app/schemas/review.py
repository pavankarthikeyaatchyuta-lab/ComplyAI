"""Review and revision schemas."""

from pydantic import BaseModel, Field


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
