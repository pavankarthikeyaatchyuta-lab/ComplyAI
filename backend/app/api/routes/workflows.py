"""Workflow API routes."""

from fastapi import APIRouter, Depends

from app.api.deps import get_workflow_service
from app.schemas.common import ApiResponse
from app.schemas.workflow import CreateWorkflowRequest, WorkflowArtifacts, WorkflowResponse
from app.services.workflow_service import WorkflowService

router = APIRouter()


@router.post("", response_model=ApiResponse[WorkflowResponse])
async def create_workflow(
    request: CreateWorkflowRequest,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowResponse]:
    """Create a compliance workflow for an uploaded document."""
    workflow = service.create_workflow(document_id=request.document_id)
    return ApiResponse(success=True, data=workflow, error=None)


@router.get("/{workflow_id}", response_model=ApiResponse[WorkflowResponse])
async def get_workflow(
    workflow_id: str,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowResponse]:
    """Return workflow status and stage outputs."""
    workflow = service.get_workflow(workflow_id)
    return ApiResponse(success=True, data=workflow, error=None)


@router.post("/{workflow_id}/run", response_model=ApiResponse[WorkflowResponse])
async def run_workflow(
    workflow_id: str,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowResponse]:
    """Run the scaffolded compliance workflow."""
    workflow = service.run_workflow(workflow_id)
    return ApiResponse(success=True, data=workflow, error=None)


@router.get("/{workflow_id}/status", response_model=ApiResponse[WorkflowResponse])
async def get_workflow_status(
    workflow_id: str,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowResponse]:
    """Return current workflow status for polling."""
    workflow = service.get_workflow(workflow_id)
    return ApiResponse(success=True, data=workflow, error=None)


@router.get("/{workflow_id}/artifacts", response_model=ApiResponse[WorkflowArtifacts])
async def get_workflow_artifacts(
    workflow_id: str,
    service: WorkflowService = Depends(get_workflow_service),
) -> ApiResponse[WorkflowArtifacts]:
    """Return planner, executor, and reviewer artifacts."""
    artifacts = service.get_artifacts(workflow_id)
    return ApiResponse(success=True, data=artifacts, error=None)
