"""Planner stage service."""

from app.core.config import Settings, get_settings
from app.integrations.llm_client import LLMClient
from app.schemas.planner import PlannerInput, PlannerOutput
from app.schemas.workflow import StageStatus, WorkflowStageName, WorkflowStageResult


class PlannerService:
    """Create a compliance plan from extracted document facts."""

    def __init__(
        self,
        llm_client: LLMClient | None = None,
        settings: Settings | None = None,
    ) -> None:
        """Create the planner service with an injectable LLM client."""
        self.settings = settings or get_settings()
        self.llm_client = llm_client or LLMClient(settings=self.settings)

    def plan(self, planner_input: PlannerInput) -> PlannerOutput:
        """Generate a schema-valid compliance plan with the LLM client."""
        prompt = self._build_prompt(planner_input)
        output = self.llm_client.complete_json(
            prompt=prompt,
            response_schema=PlannerOutput,
        )
        return output.model_copy(
            update={"provider_used": self.llm_client.provider_used or output.provider_used}
        )

    def run(
        self,
        workflow_id: str,
        document_text: str | None = None,
    ) -> tuple[WorkflowStageResult, dict]:
        """Run the planner stage and return stage metadata plus JSON artifact."""
        planner_input = PlannerInput(
            workflow_id=workflow_id,
            document_text=document_text
            or "GST Notice DRC-01 for taxpayer response before deadline with supporting records.",
        )
        output = self.plan(planner_input)
        artifact = output.model_dump(mode="json")
        issue_count = len(output.risk_notes) + len(output.missing_information)
        return (
            WorkflowStageResult(
                stage=WorkflowStageName.PLANNER,
                status=StageStatus.COMPLETED,
                execution_time_ms=1800,
                provider_used=output.provider_used,
                output_summary=output.objective,
                issues=[*output.risk_notes, *output.missing_information],
                progress=100,
            ),
            artifact,
        )

    def _build_prompt(self, planner_input: PlannerInput) -> str:
        """Build a deterministic JSON-only prompt for the planner."""
        return (
            "You are the ComplyAI Planner. Return only JSON matching this schema: "
            "document_type, priority, deadline, objective, required_actions, "
            "missing_information, risk_notes, provider_used. "
            "Allowed document_type values: DRC_01, GSTR_3A, ASMT_10, GST_INVOICE, TAX_REMINDER. "
            "Allowed priority values: low, medium, high. "
            "Each required_actions item must include title, description, due, priority.\n\n"
            f"Workflow ID: {planner_input.workflow_id}\n"
            f"Document text:\n{planner_input.document_text}"
        )
