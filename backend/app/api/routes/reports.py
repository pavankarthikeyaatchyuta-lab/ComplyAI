"""Report API routes."""

from fastapi import APIRouter, Depends

from app.api.deps import get_report_service
from app.schemas.common import ApiResponse
from app.schemas.report import ComplianceReport
from app.services.report_service import ReportService

router = APIRouter()


@router.post("/workflows/{workflow_id}/report", response_model=ApiResponse[ComplianceReport])
async def generate_workflow_report(
    workflow_id: str,
    service: ReportService = Depends(get_report_service),
) -> ApiResponse[ComplianceReport]:
    """Generate the final compliance action report for a workflow."""
    report = service.generate_report(workflow_id)
    return ApiResponse(success=True, data=report, error=None)


@router.get("/workflows/{workflow_id}/report", response_model=ApiResponse[ComplianceReport])
async def get_workflow_report(
    workflow_id: str,
    service: ReportService = Depends(get_report_service),
) -> ApiResponse[ComplianceReport]:
    """Return the generated report for a workflow."""
    report = service.generate_report(workflow_id)
    return ApiResponse(success=True, data=report, error=None)


@router.get("/reports/{report_id}", response_model=ApiResponse[ComplianceReport])
async def get_report(
    report_id: str,
    service: ReportService = Depends(get_report_service),
) -> ApiResponse[ComplianceReport]:
    """Return a compliance report by report ID."""
    report = service.get_report(report_id)
    return ApiResponse(success=True, data=report, error=None)


@router.get("/reports/{report_id}/download", response_model=ApiResponse[dict[str, str]])
async def download_report(report_id: str) -> ApiResponse[dict[str, str]]:
    """Return a scaffolded report download descriptor."""
    return ApiResponse(
        success=True,
        data={"report_id": report_id, "download_status": "pdf_export_not_implemented_yet"},
        error=None,
    )
