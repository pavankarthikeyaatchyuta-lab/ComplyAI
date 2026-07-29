"""Regression tests for the Planner service across sample documents."""

from __future__ import annotations

import unittest
from pathlib import Path
from typing import Any

from app.core.config import Settings
from app.integrations.llm_client import LLMClient
from app.schemas.planner import PlannerDocumentType, PlannerInput, PlannerOutput
from app.services.planner_service import PlannerService


EXPECTED_BY_FILE = {
    "drc_01_notice.txt": PlannerDocumentType.DRC_01,
    "gstr_3a_notice.txt": PlannerDocumentType.GSTR_3A,
    "asmt_10_notice.txt": PlannerDocumentType.ASMT_10,
    "gst_invoice.txt": PlannerDocumentType.GST_INVOICE,
    "tax_reminder.txt": PlannerDocumentType.TAX_REMINDER,
}


class FakePlannerTransport:
    """Fake transport that returns deterministic PlannerOutput JSON."""

    def __init__(self) -> None:
        self.calls: list[str] = []

    def complete_json(
        self,
        *,
        provider: str,
        model: str,
        api_key: str,
        prompt: str,
        timeout_seconds: float,
    ) -> dict[str, Any]:
        """Return planner JSON based on sample document text."""
        self.calls.append(provider)
        lowered = prompt.split("Document text:", maxsplit=1)[-1].lower()
        if "drc-01" in lowered or "drc_01" in lowered:
            document_type = "DRC_01"
            objective = "Respond to GST DRC-01 demand notice with reconciliation."
        elif "gstr-3a" in lowered or "gstr_3a" in lowered:
            document_type = "GSTR_3A"
            objective = "File pending GST return and address non-filing notice."
        elif "asmt-10" in lowered or "asmt_10" in lowered:
            document_type = "ASMT_10"
            objective = "Prepare scrutiny response with ITC reconciliation."
        elif "tax invoice" in lowered or "invoice" in lowered:
            document_type = "GST_INVOICE"
            objective = "Validate GST invoice fields for compliance records."
        elif "tax reminder" in lowered or "reminder" in lowered:
            document_type = "TAX_REMINDER"
            objective = "Prepare records and complete filing before due date."
        else:
            document_type = "TAX_REMINDER"
            objective = "Prepare compliance action plan from reminder."

        return {
            "document_type": document_type,
            "priority": "high" if document_type in {"DRC_01", "ASMT_10"} else "medium",
            "deadline": "Detected from document",
            "objective": objective,
            "required_actions": [
                {
                    "title": "Verify document details",
                    "description": "Confirm GSTIN, period, deadline, and supporting evidence.",
                    "due": "Before statutory deadline",
                    "priority": "high",
                }
            ],
            "missing_information": [],
            "risk_notes": [],
            "provider_used": provider,
        }


class PlannerRegressionTest(unittest.TestCase):
    """Run Planner regression checks for every sample document."""

    def test_every_sample_document_matches_expected_type(self) -> None:
        """Planner should detect the expected document type for all samples."""
        sample_dir = Path(__file__).resolve().parents[1] / "sample_documents"
        files = sorted(sample_dir.glob("*.txt"))
        self.assertEqual(
            {file.name for file in files},
            set(EXPECTED_BY_FILE),
            "Every sample document must have an expected regression label.",
        )

        transport = FakePlannerTransport()
        client = LLMClient(
            settings=Settings(groq_api_key="groq-test-key", gemini_api_key="gemini-test-key"),
            transport=transport,
        )
        planner = PlannerService(llm_client=client)

        rows: list[tuple[str, str, str, bool, str]] = []
        for file in files:
            document_text = file.read_text(encoding="utf-8")
            output = planner.plan(
                PlannerInput(
                    workflow_id=f"wf_regression_{file.stem}",
                    document_text=document_text,
                )
            )
            expected = EXPECTED_BY_FILE[file.name]
            detected = output.document_type
            passed = detected == expected
            rows.append(
                (
                    file.name,
                    expected.value,
                    detected.value,
                    passed,
                    "ok" if passed else "document type mismatch",
                )
            )
            self.assertIsInstance(output, PlannerOutput)
            self.assertTrue(passed)

        print("\n| File | Expected | Detected | Pass | Notes |")
        print("| --- | --- | --- | --- | --- |")
        for file_name, expected, detected, passed, notes in rows:
            print(f"| {file_name} | {expected} | {detected} | {passed} | {notes} |")

        self.assertEqual(transport.calls, ["groq"] * len(files))


if __name__ == "__main__":
    unittest.main()
