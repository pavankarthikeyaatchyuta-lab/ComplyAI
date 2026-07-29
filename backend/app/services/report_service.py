"""Final report generation service."""

from uuid import uuid4

from app.core.config import Settings
from app.schemas.report import ComplianceReport, MissingInformation, RequiredAction


class ReportService:
    """Compose final compliance action reports."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def generate_report(self, workflow_id: str) -> ComplianceReport:
        """Generate a compliance report for an approved workflow."""
        return ComplianceReport(
            report_id=f"rpt_{uuid4().hex[:12]}",
            workflow_id=workflow_id,
            document_type="GST Notice DRC-01",
            priority="high",
            deadline="15 Jul 2026",
            immediate_actions=[
                RequiredAction(
                    title="Verify notice number, GSTIN, and tax period.",
                    owner="Chartered Accountant",
                    due="Today",
                ),
                RequiredAction(
                    title="Collect purchase register and invoice annexures.",
                    owner="Business Owner",
                    due="24 hours",
                ),
            ],
            checklist=[
                "GSTIN verified",
                "Notice reference captured",
                "Deadline reviewed",
                "Annexure evidence attached",
            ],
            missing_information=[
                MissingInformation(
                    field="Annexure reference",
                    reason="The uploaded scan references supporting annexures that are not attached.",
                    severity="required",
                )
            ],
            draft_response="Draft response generated for authorized signatory review.",
            review_status="verified_with_warnings",
            provider_used="Gemini 1.5 Pro + Groq Llama 3.1",
        )

    def get_report(self, report_id: str) -> ComplianceReport:
        """Return a report by ID using scaffolded sample data."""
        report = self.generate_report(workflow_id="wf_demo")
        report.report_id = report_id
        return report
