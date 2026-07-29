"""Executor stage service."""

from copy import deepcopy
from typing import Any

from app.schemas.executor import (
    ExecutorAction,
    ExecutorChecklistItem,
    ExecutorField,
    ExecutorMode,
    ExecutorOutput,
    ExecutorRevisionRequest,
)
from app.schemas.workflow import StageStatus, WorkflowStageName, WorkflowStageResult


class ExecutorService:
    """Generate and revise user-facing compliance artifacts."""

    def run(
        self,
        planner_artifact: dict[str, Any],
        revision_request: ExecutorRevisionRequest | None = None,
        existing_output: ExecutorOutput | None = None,
    ) -> tuple[WorkflowStageResult, dict[str, Any]]:
        """Run executor in normal mode or revision mode."""
        if revision_request:
            if existing_output is None:
                existing_output = self.execute(planner_artifact)
            output = self.revise(existing_output, revision_request)
        else:
            output = self.execute(planner_artifact)

        issues = output.missing_information.copy()
        return (
            WorkflowStageResult(
                stage=WorkflowStageName.EXECUTOR,
                status=StageStatus.COMPLETED,
                execution_time_ms=2400 if output.mode == ExecutorMode.NORMAL else 1100,
                provider_used=output.provider_used,
                output_summary=output.summary,
                issues=issues,
                progress=100,
            ),
            output.model_dump(mode="json"),
        )

    def execute(self, planner_artifact: dict[str, Any]) -> ExecutorOutput:
        """Generate executor artifacts from the planner artifact."""
        objective = str(planner_artifact.get("objective", "Prepare compliance response."))
        planner_actions = planner_artifact.get("required_actions", [])

        required_actions = [
            self._coerce_action(action)
            for action in planner_actions
            if isinstance(action, dict | str)
        ]
        if not required_actions:
            required_actions = [
                ExecutorAction(
                    title="Verify compliance document",
                    description="Confirm GSTIN, notice type, period, and deadline before response.",
                    due="Before statutory deadline",
                    priority="high",
                )
            ]

        checklist = [
            ExecutorChecklistItem(label="Verify GSTIN and legal name"),
            ExecutorChecklistItem(label="Confirm notice number and tax period"),
            ExecutorChecklistItem(label="Attach supporting records"),
            ExecutorChecklistItem(label="Review draft response before filing"),
        ]

        missing_information = [
            str(item)
            for item in planner_artifact.get("missing_information", [])
            if str(item).strip()
        ]

        return ExecutorOutput(
            summary=objective,
            required_actions=required_actions,
            checklist=checklist,
            missing_information=missing_information,
            draft_response=(
                "To the Proper Officer,\n\n"
                f"With reference to the compliance document, the taxpayer submits: {objective} "
                "Supporting records and reconciliations will be provided for review.\n\n"
                "Regards,\nAuthorized Signatory"
            ),
            provider_used="Executor Rules Engine",
            mode=ExecutorMode.NORMAL,
            revised_fields=[],
        )

    def revise(
        self,
        existing_output: ExecutorOutput,
        revision_request: ExecutorRevisionRequest,
    ) -> ExecutorOutput:
        """Update only the fields explicitly flagged in a revision request."""
        revised = deepcopy(existing_output)
        instructions = revision_request.instructions.strip()

        for field in revision_request.flagged_fields:
            if field == ExecutorField.SUMMARY:
                revised.summary = f"{existing_output.summary} Revision note: {instructions}"
            elif field == ExecutorField.REQUIRED_ACTIONS:
                revised.required_actions = [
                    *existing_output.required_actions,
                    ExecutorAction(
                        title="Address reviewer correction",
                        description=instructions,
                        due="Before final report approval",
                        priority="high",
                    ),
                ]
            elif field == ExecutorField.CHECKLIST:
                revised.checklist = [
                    *existing_output.checklist,
                    ExecutorChecklistItem(label=f"Reviewer correction: {instructions}"),
                ]
            elif field == ExecutorField.MISSING_INFORMATION:
                revised.missing_information = [
                    *existing_output.missing_information,
                    instructions,
                ]
            elif field == ExecutorField.DRAFT_RESPONSE:
                revised.draft_response = (
                    f"{existing_output.draft_response}\n\nRevision update:\n{instructions}"
                )

        revised.mode = ExecutorMode.REVISION
        revised.provider_used = "Executor Revision Rules Engine"
        revised.revised_fields = revision_request.flagged_fields
        return revised

    def _coerce_action(self, action: dict[str, Any] | str) -> ExecutorAction:
        """Convert planner action input into an executor action."""
        if isinstance(action, str):
            return ExecutorAction(
                title=action[:80],
                description=action,
                due="Before statutory deadline",
                priority="high",
            )

        return ExecutorAction(
            title=str(action.get("title", "Complete compliance action")),
            description=str(action.get("description", action.get("title", "Complete action"))),
            due=str(action.get("due", "Before statutory deadline")),
            priority=str(action.get("priority", "high")),
        )
