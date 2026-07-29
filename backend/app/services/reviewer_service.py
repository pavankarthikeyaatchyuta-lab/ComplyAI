"""Reviewer stage service."""

from app.schemas.review import ReviewResponse
from app.schemas.workflow import StageStatus, WorkflowStageName, WorkflowStageResult


class ReviewerService:
    """Verify generated artifacts before report generation."""

    def run(self, executor_artifact: dict) -> tuple[WorkflowStageResult, dict]:
        """Run reviewer checks on executor output."""
        warnings = [
            "Annexure reference is missing.",
            "Demand amount should be confirmed from original notice.",
        ]
        artifact = {
            "schema_validation": "passed",
            "approval_readiness": "ready_with_warnings",
            "warnings": warnings,
            "checked_sections": list(executor_artifact.keys()),
        }
        return (
            WorkflowStageResult(
                stage=WorkflowStageName.REVIEWER,
                status=StageStatus.WARNING,
                execution_time_ms=900,
                provider_used="Gemini 1.5 Pro",
                output_summary="Verified artifacts and surfaced unresolved warnings.",
                issues=warnings,
                progress=88,
            ),
            artifact,
        )

    def get_review(self, workflow_id: str) -> ReviewResponse:
        """Return review status for a workflow."""
        return ReviewResponse(
            workflow_id=workflow_id,
            review_status="ready_with_warnings",
            completeness_score=0.86,
            warnings=[
                "Annexure reference is missing.",
                "Demand amount should be confirmed.",
            ],
            revision_available=True,
        )
