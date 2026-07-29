"""Compliance report schemas."""

from pydantic import BaseModel, Field


class RequiredAction(BaseModel):
    """Action that the taxpayer or CA must complete."""

    title: str
    owner: str
    due: str


class MissingInformation(BaseModel):
    """Information required to complete or strengthen the response."""

    field: str
    reason: str
    severity: str


class ComplianceReport(BaseModel):
    """Final compliance action report."""

    report_id: str
    workflow_id: str
    document_type: str
    priority: str
    deadline: str
    immediate_actions: list[RequiredAction]
    checklist: list[str]
    missing_information: list[MissingInformation]
    draft_response: str
    review_status: str
    provider_used: str


class GenerateReportRequest(BaseModel):
    """Request to generate a report for a workflow."""

    workflow_id: str = Field(min_length=1)
