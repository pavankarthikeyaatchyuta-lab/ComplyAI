"""Workflow orchestration service."""

from uuid import uuid4

from app.core.config import Settings
from app.core.errors import ComplyAIError
from app.schemas.review import RevisionRequest, ReviewResponse
from app.schemas.workflow import (
    StageStatus,
    WorkflowArtifacts,
    WorkflowResponse,
    WorkflowStageName,
    WorkflowStageResult,
)
from app.services.executor_service import ExecutorService
from app.services.planner_service import PlannerService
from app.services.reviewer_service import ReviewerService


class WorkflowService:
    """Coordinate the ComplyAI compliance workflow."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.planner = PlannerService(settings=settings)
        self.executor = ExecutorService()
        self.reviewer = ReviewerService()

    def create_workflow(self, document_id: str) -> WorkflowResponse:
        """Create a workflow shell for a document."""
        return WorkflowResponse(
            workflow_id=f"wf_{uuid4().hex[:12]}",
            document_id=document_id,
            status=StageStatus.PENDING,
            current_stage=WorkflowStageName.EXTRACTION,
            revision_count=0,
            stages=[],
        )

    def run_workflow(self, workflow_id: str, document_id: str = "doc_demo") -> WorkflowResponse:
        """Run planner, executor, and reviewer stages for a workflow."""
        planner_stage, _planner_artifact = self.planner.run(workflow_id)
        executor_stage, _executor_artifact = self.executor.run(_planner_artifact)
        reviewer_stage, _reviewer_artifact = self.reviewer.run(_executor_artifact)

        stages: list[WorkflowStageResult] = [
            WorkflowStageResult(
                stage=WorkflowStageName.EXTRACTION,
                status=StageStatus.COMPLETED,
                execution_time_ms=650,
                provider_used="Local OCR Adapter",
                output_summary="Extracted GSTIN, notice type, due date, and tax period.",
                issues=[],
                progress=100,
            ),
            planner_stage,
            executor_stage,
            reviewer_stage,
        ]

        return WorkflowResponse(
            workflow_id=workflow_id,
            document_id=document_id,
            status=StageStatus.WARNING,
            current_stage=WorkflowStageName.REVIEWER,
            revision_count=0,
            stages=stages,
        )

    def get_workflow(self, workflow_id: str) -> WorkflowResponse:
        """Return current workflow state."""
        return self.run_workflow(workflow_id)

    def get_artifacts(self, workflow_id: str) -> WorkflowArtifacts:
        """Return planner, executor, and reviewer JSON artifacts."""
        _, planner_artifact = self.planner.run(workflow_id)
        _, executor_artifact = self.executor.run(planner_artifact)
        _, reviewer_artifact = self.reviewer.run(executor_artifact)
        return WorkflowArtifacts(
            planner=planner_artifact,
            executor=executor_artifact,
            reviewer=reviewer_artifact,
        )

    def get_review(self, workflow_id: str) -> ReviewResponse:
        """Return review status for a workflow."""
        return self.reviewer.get_review(workflow_id)

    def submit_revision(self, workflow_id: str, revision: RevisionRequest) -> WorkflowResponse:
        """Apply the single allowed revision request."""
        if not revision.details:
            raise ComplyAIError("EMPTY_REVISION", "Revision details are required.")

        response = self.run_workflow(workflow_id)
        response.revision_count = 1
        response.current_stage = WorkflowStageName.REVISION
        return response

    def approve_workflow(self, workflow_id: str) -> WorkflowResponse:
        """Mark a workflow as approved for report generation."""
        response = self.run_workflow(workflow_id)
        response.status = StageStatus.COMPLETED
        response.current_stage = WorkflowStageName.REPORT
        response.stages.append(
            WorkflowStageResult(
                stage=WorkflowStageName.REPORT,
                status=StageStatus.COMPLETED,
                execution_time_ms=420,
                provider_used="Report Composer",
                output_summary="Workflow approved and ready for final report.",
                issues=[],
                progress=100,
            )
        )
        return response
