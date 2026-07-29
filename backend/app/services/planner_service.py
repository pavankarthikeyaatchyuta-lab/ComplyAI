"""Planner stage service."""

from app.schemas.workflow import StageStatus, WorkflowStageName, WorkflowStageResult


class PlannerService:
    """Create a compliance plan from extracted document facts."""

    def run(self, workflow_id: str) -> tuple[WorkflowStageResult, dict]:
        """Run the planner stage and return stage metadata plus JSON artifact."""
        artifact = {
            "workflow_id": workflow_id,
            "objective": "Respond to GST Notice DRC-01 before deadline.",
            "priority": "high",
            "required_actions": [
                "Verify GSTIN and notice reference.",
                "Collect invoice annexures.",
                "Prepare response draft.",
            ],
        }
        return (
            WorkflowStageResult(
                stage=WorkflowStageName.PLANNER,
                status=StageStatus.COMPLETED,
                execution_time_ms=1800,
                provider_used="Gemini 1.5 Flash",
                output_summary="Created compliance plan and prioritized required actions.",
                issues=[],
                progress=100,
            ),
            artifact,
        )
