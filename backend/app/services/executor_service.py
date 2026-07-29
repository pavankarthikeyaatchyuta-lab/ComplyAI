"""Executor stage service."""

from app.schemas.workflow import StageStatus, WorkflowStageName, WorkflowStageResult


class ExecutorService:
    """Generate user-facing compliance artifacts from a plan."""

    def run(self, planner_artifact: dict) -> tuple[WorkflowStageResult, dict]:
        """Run the executor stage using the planner artifact."""
        artifact = {
            "summary": "GST DRC-01 notice requires timely response with supporting records.",
            "checklist": [
                "Verify GSTIN.",
                "Confirm notice number.",
                "Attach invoice annexures.",
                "Approve draft response.",
            ],
            "missing_information": ["Annexure reference", "Demand amount confirmation"],
            "draft_response": "Draft response scaffold generated for authorized signatory.",
            "source_objective": planner_artifact.get("objective"),
        }
        return (
            WorkflowStageResult(
                stage=WorkflowStageName.EXECUTOR,
                status=StageStatus.COMPLETED,
                execution_time_ms=2400,
                provider_used="Groq Llama 3.1",
                output_summary="Generated summary, checklist, missing info, and draft response.",
                issues=["Demand amount confidence is medium."],
                progress=100,
            ),
            artifact,
        )
