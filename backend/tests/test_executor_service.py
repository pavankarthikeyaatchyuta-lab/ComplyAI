"""Tests for Executor normal and revision modes."""

from __future__ import annotations

import unittest

from app.schemas.executor import ExecutorField, ExecutorMode, ExecutorOutput, ExecutorRevisionRequest
from app.services.executor_service import ExecutorService


PLANNER_ARTIFACT = {
    "objective": "Respond to GST Notice DRC-01 with reconciliation and invoice support.",
    "required_actions": [
        {
            "title": "Verify GSTIN",
            "description": "Confirm GSTIN and taxpayer legal name before drafting response.",
            "due": "Today",
            "priority": "high",
        },
        {
            "title": "Collect annexures",
            "description": "Collect invoice annexures and purchase register extracts.",
            "due": "24 hours",
            "priority": "high",
        },
    ],
    "missing_information": ["Demand amount confirmation"],
}


class ExecutorServiceTest(unittest.TestCase):
    """Validate executor generation and revision safety."""

    def setUp(self) -> None:
        """Create a fresh executor for every test."""
        self.executor = ExecutorService()

    def test_normal_mode_returns_valid_executor_schema(self) -> None:
        """Normal mode should return a strict ExecutorOutput."""
        output = self.executor.execute(PLANNER_ARTIFACT)

        self.assertIsInstance(output, ExecutorOutput)
        self.assertEqual(output.mode, ExecutorMode.NORMAL)
        self.assertEqual(output.provider_used, "Executor Rules Engine")
        self.assertEqual(len(output.required_actions), 2)
        self.assertGreaterEqual(len(output.checklist), 1)
        self.assertIn("Demand amount confirmation", output.missing_information)

    def test_run_returns_workflow_stage_and_json_artifact(self) -> None:
        """The workflow-facing run method should return stage metadata and JSON."""
        stage, artifact = self.executor.run(PLANNER_ARTIFACT)

        self.assertEqual(stage.provider_used, "Executor Rules Engine")
        self.assertEqual(stage.progress, 100)
        self.assertEqual(artifact["mode"], "normal")
        self.assertIn("required_actions", artifact)

    def test_revision_updates_only_summary(self) -> None:
        """Revision mode must not mutate unflagged fields."""
        original = self.executor.execute(PLANNER_ARTIFACT)
        revised = self.executor.revise(
            original,
            ExecutorRevisionRequest(
                flagged_fields=[ExecutorField.SUMMARY],
                instructions="Clarify that reconciliation is already prepared.",
            ),
        )

        self.assertEqual(revised.mode, ExecutorMode.REVISION)
        self.assertEqual(revised.revised_fields, [ExecutorField.SUMMARY])
        self.assertNotEqual(revised.summary, original.summary)
        self.assertEqual(revised.required_actions, original.required_actions)
        self.assertEqual(revised.checklist, original.checklist)
        self.assertEqual(revised.missing_information, original.missing_information)
        self.assertEqual(revised.draft_response, original.draft_response)

    def test_revision_updates_only_draft_response(self) -> None:
        """Draft response revision should preserve summary, actions, checklist, and missing info."""
        original = self.executor.execute(PLANNER_ARTIFACT)
        revised = self.executor.revise(
            original,
            ExecutorRevisionRequest(
                flagged_fields=[ExecutorField.DRAFT_RESPONSE],
                instructions="Add respectful request for additional time if annexures are unavailable.",
            ),
        )

        self.assertEqual(revised.summary, original.summary)
        self.assertEqual(revised.required_actions, original.required_actions)
        self.assertEqual(revised.checklist, original.checklist)
        self.assertEqual(revised.missing_information, original.missing_information)
        self.assertNotEqual(revised.draft_response, original.draft_response)

    def test_revision_can_update_multiple_flagged_fields_only(self) -> None:
        """Multiple flagged fields should update only those fields."""
        original = self.executor.execute(PLANNER_ARTIFACT)
        revised = self.executor.revise(
            original,
            ExecutorRevisionRequest(
                flagged_fields=[ExecutorField.CHECKLIST, ExecutorField.MISSING_INFORMATION],
                instructions="Add annexure upload confirmation.",
            ),
        )

        self.assertEqual(revised.summary, original.summary)
        self.assertEqual(revised.required_actions, original.required_actions)
        self.assertEqual(revised.draft_response, original.draft_response)
        self.assertNotEqual(revised.checklist, original.checklist)
        self.assertNotEqual(revised.missing_information, original.missing_information)


if __name__ == "__main__":
    unittest.main()
