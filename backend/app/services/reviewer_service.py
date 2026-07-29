"""Reviewer stage service."""

from typing import Any

from app.schemas.executor import ExecutorOutput
from app.schemas.planner import PlannerOutput
from app.schemas.review import (
    ReviewerFinding,
    ReviewerOutput,
    ReviewResponse,
    ReviewSeverity,
    ReviewStatus,
)
from app.schemas.workflow import StageStatus, WorkflowStageName, WorkflowStageResult


class ReviewerService:
    """Verify generated artifacts before report generation."""

    def review(
        self,
        *,
        planner_artifact: dict[str, Any],
        executor_artifact: dict[str, Any],
        revision_count: int = 0,
    ) -> ReviewerOutput:
        """Detect missing information, inconsistencies, and revision need."""
        planner = PlannerOutput.model_validate(planner_artifact)
        executor = ExecutorOutput.model_validate(executor_artifact)

        missing_information = self._detect_missing_information(executor)
        inconsistencies = self._detect_inconsistencies(planner, executor)
        critical_findings = [
            finding
            for finding in [*missing_information, *inconsistencies]
            if finding.severity == ReviewSeverity.CRITICAL
        ]
        require_revision = bool(critical_findings) and revision_count < 1
        revision_available = revision_count < 1
        score_penalty = (0.1 * len(missing_information)) + (0.14 * len(inconsistencies))
        completeness_score = max(0.0, round(1.0 - score_penalty, 2))

        if require_revision:
            status = ReviewStatus.REVISION_REQUIRED
        elif missing_information or inconsistencies:
            status = ReviewStatus.READY_WITH_WARNINGS
        else:
            status = ReviewStatus.APPROVED

        return ReviewerOutput(
            review_status=status,
            missing_information=missing_information,
            inconsistencies=inconsistencies,
            require_revision=require_revision,
            revision_count=revision_count,
            revision_available=revision_available,
            completeness_score=completeness_score,
            provider_used="Reviewer Rules Engine",
            summary=self._build_summary(status, missing_information, inconsistencies),
        )

    def run(
        self,
        executor_artifact: dict[str, Any],
        planner_artifact: dict[str, Any] | None = None,
        revision_count: int = 0,
    ) -> tuple[WorkflowStageResult, dict[str, Any]]:
        """Run reviewer checks on executor output."""
        if planner_artifact is None:
            planner_artifact = {
                "document_type": "DRC_01",
                "priority": "high",
                "deadline": "Detected from document",
                "objective": str(executor_artifact.get("summary", "Prepare compliance response.")),
                "required_actions": [
                    {
                        "title": "Verify compliance document",
                        "description": "Confirm GSTIN, period, deadline, and supporting evidence.",
                        "due": "Before statutory deadline",
                        "priority": "high",
                    }
                ],
                "missing_information": [],
                "risk_notes": [],
                "provider_used": "Planner fallback context",
            }

        output = self.review(
            planner_artifact=planner_artifact,
            executor_artifact=executor_artifact,
            revision_count=revision_count,
        )
        issues = [
            finding.message
            for finding in [*output.missing_information, *output.inconsistencies]
        ]
        stage_status = (
            StageStatus.WARNING
            if output.review_status != ReviewStatus.APPROVED
            else StageStatus.COMPLETED
        )
        return (
            WorkflowStageResult(
                stage=WorkflowStageName.REVIEWER,
                status=stage_status,
                execution_time_ms=900,
                provider_used=output.provider_used,
                output_summary=output.summary,
                issues=issues,
                progress=int(output.completeness_score * 100),
            ),
            output.model_dump(mode="json"),
        )

    def get_review(self, workflow_id: str, revision_count: int = 0) -> ReviewResponse:
        """Return review status for a workflow."""
        return ReviewResponse(
            workflow_id=workflow_id,
            review_status="ready_with_warnings",
            completeness_score=0.86,
            warnings=[
                "Annexure reference is missing.",
                "Demand amount should be confirmed.",
            ],
            revision_available=revision_count < 1,
        )

    def _detect_missing_information(self, executor: ExecutorOutput) -> list[ReviewerFinding]:
        """Promote executor missing information into reviewer findings."""
        findings = [
            ReviewerFinding(
                category="missing_information",
                field=item,
                message=f"Missing required information: {item}.",
                severity=ReviewSeverity.CRITICAL
                if "demand" in item.lower() or "amount" in item.lower()
                else ReviewSeverity.WARNING,
            )
            for item in executor.missing_information
            if item.strip()
        ]

        if not executor.draft_response.strip():
            findings.append(
                ReviewerFinding(
                    category="missing_information",
                    field="draft_response",
                    message="Draft response is empty.",
                    severity=ReviewSeverity.CRITICAL,
                )
            )

        return findings

    def _detect_inconsistencies(
        self,
        planner: PlannerOutput,
        executor: ExecutorOutput,
    ) -> list[ReviewerFinding]:
        """Detect inconsistencies between planner intent and executor artifacts."""
        findings: list[ReviewerFinding] = []
        executor_action_titles = " ".join(action.title.lower() for action in executor.required_actions)
        planner_action_titles = " ".join(action.title.lower() for action in planner.required_actions)

        for keyword in ("gstin", "deadline", "notice", "invoice", "response"):
            if keyword in planner_action_titles and keyword not in executor_action_titles:
                findings.append(
                    ReviewerFinding(
                        category="inconsistency",
                        field="required_actions",
                        message=f"Planner expects action related to {keyword}, but executor actions omit it.",
                        severity=ReviewSeverity.WARNING,
                    )
                )

        if planner.priority.value == "high" and not any(
            action.priority.lower() == "high" for action in executor.required_actions
        ):
            findings.append(
                ReviewerFinding(
                    category="inconsistency",
                    field="priority",
                    message="Planner marked the workflow high priority, but executor actions do not.",
                    severity=ReviewSeverity.CRITICAL,
                )
            )

        if planner.deadline.lower() not in {"not detected", "detected from document"}:
            deadline_token = planner.deadline.split()[0].lower()
            if deadline_token and deadline_token not in executor.draft_response.lower():
                findings.append(
                    ReviewerFinding(
                        category="inconsistency",
                        field="draft_response",
                        message="Planner deadline is not referenced in the draft response.",
                        severity=ReviewSeverity.WARNING,
                    )
                )

        return findings

    def _build_summary(
        self,
        status: ReviewStatus,
        missing_information: list[ReviewerFinding],
        inconsistencies: list[ReviewerFinding],
    ) -> str:
        """Build a concise reviewer summary."""
        if status == ReviewStatus.APPROVED:
            return "Reviewer approved all generated artifacts with no blocking issues."

        return (
            "Reviewer detected "
            f"{len(missing_information)} missing information item(s) and "
            f"{len(inconsistencies)} inconsistency item(s)."
        )
