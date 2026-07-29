"""Review and revision API routes."""

from fastapi import APIRouter, Depends

from app.api.deps import get_workflow_service
from app.schemas.common import ApiResponse
from app.schemas.review import ReviewResponse, RevisionRequest
from app.schemas.workflow import WorkflowResponse
from app.services.workflow_service import WorkflowService

router = APIRouter()


@router.get("/{workflow_id}/review", response_model=ApiResponse[ReviewResponse])
async def get_review(
    workflow_id: str,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[ReviewResponse]:
    """Return review-ready workflow status."""
    review = service.get_review(workflow_id)
    return ApiResponse(success=True, data=review, error=None)


@router.post("/{workflow_id}/revision", response_model=ApiResponse[WorkflowResponse])
async def submit_revision(
    workflow_id: str,
    request: RevisionRequest,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowResponse]:
    """Submit the one allowed workflow revision."""
    workflow = service.submit_revision(workflow_id=workflow_id, revision=request)
    return ApiResponse(success=True, data=workflow, error=None)


@router.post("/{workflow_id}/approve", response_model=ApiResponse[WorkflowResponse])
async def approve_workflow(
    workflow_id: str,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowResponse]:
    """Approve a reviewed workflow for final report generation."""
    workflow = service.approve_workflow(workflow_id)
    return ApiResponse(success=True, data=workflow, error=None)
