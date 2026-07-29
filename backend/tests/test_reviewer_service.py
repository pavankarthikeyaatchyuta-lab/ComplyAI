"""Tests for reviewer missing info, inconsistency, and revision policy."""

from __future__ import annotations

import unittest

from app.core.config import Settings
from app.core.errors import ComplyAIError
from app.schemas.executor import ExecutorOutput
from app.schemas.review import RevisionRequest, ReviewStatus
from app.services.executor_service import ExecutorService
from app.services.reviewer_service import ReviewerService
from app.services.workflow_service import WorkflowService


PLANNER_ARTIFACT = {
    "document_type": "DRC_01",
    "priority": "high",
    "deadline": "15 Jul 2026",
    "objective": "Respond to GST DRC-01 demand notice with reconciliation.",
    "required_actions": [
        {
            "title": "Verify GSTIN",
            "description": "Confirm GSTIN and taxpayer legal name.",
            "due": "Today",
            "priority": "high",
        },
        {
            "title": "Prepare response",
            "description": "Prepare response before statutory deadline.",
            "due": "Before deadline",
            "priority": "high",
        },
    ],
    "missing_information": [],
    "risk_notes": [],
    "provider_used": "groq",
}


class ReviewerServiceTest(unittest.TestCase):
    """Validate reviewer output and one-revision policy."""

    def setUp(self) -> None:
        """Create fresh services for every test."""
        self.executor = ExecutorService()
        self.reviewer = ReviewerService()

    def make_executor_artifact(self) -> dict:
        """Create a valid executor artifact for review tests."""
        output = self.executor.execute(
            {
                **PLANNER_ARTIFACT,
                "missing_information": ["Demand amount confirmation"],
            }
        )
        return output.model_dump(mode="json")

    def test_detects_missing_information(self) -> None:
        """Reviewer should surface executor missing information."""
        output = self.reviewer.review(
            planner_artifact=PLANNER_ARTIFACT,
            executor_artifact=self.make_executor_artifact(),
        )

        self.assertEqual(output.review_status, ReviewStatus.REVISION_REQUIRED)
        self.assertTrue(output.require_revision)
        self.assertTrue(output.revision_available)
        self.assertGreaterEqual(len(output.missing_information), 1)
        self.assertIn("Demand amount confirmation", output.missing_information[0].message)

    def test_detects_inconsistent_priority_and_requires_revision(self) -> None:
        """High-priority planner output must remain high priority in executor actions."""
        executor = ExecutorOutput.model_validate(self.make_executor_artifact())
        executor.required_actions = [
            action.model_copy(update={"priority": "medium"})
            for action in executor.required_actions
        ]
        executor.missing_information = []

        output = self.reviewer.review(
            planner_artifact=PLANNER_ARTIFACT,
            executor_artifact=executor.model_dump(mode="json"),
        )

        self.assertEqual(output.review_status, ReviewStatus.REVISION_REQUIRED)
        self.assertTrue(output.require_revision)
        self.assertTrue(
            any("high priority" in finding.message for finding in output.inconsistencies)
        )

    def test_revision_not_required_after_revision_limit_used(self) -> None:
        """Reviewer should not request another revision after the one allowed revision."""
        output = self.reviewer.review(
            planner_artifact=PLANNER_ARTIFACT,
            executor_artifact=self.make_executor_artifact(),
            revision_count=1,
        )

        self.assertEqual(output.revision_count, 1)
        self.assertFalse(output.revision_available)
        self.assertFalse(output.require_revision)
        self.assertEqual(output.review_status, ReviewStatus.READY_WITH_WARNINGS)

    def test_workflow_service_enforces_maximum_one_revision(self) -> None:
        """Workflow service must reject a second revision."""
        service = WorkflowService(settings=Settings(groq_api_key="test", gemini_api_key="test"))

        with self.assertRaises(ComplyAIError) as context:
            service.submit_revision(
                workflow_id="wf_demo",
                revision=RevisionRequest(
                    reason="Correction",
                    details="Please correct the demand amount.",
                    affected_sections=["missing_information"],
                ),
                current_revision_count=1,
            )

        self.assertEqual(context.exception.code, "REVISION_LIMIT_REACHED")


if __name__ == "__main__":
    unittest.main()
