"""Workflow schemas for the compliance pipeline."""

from enum import Enum

from pydantic import BaseModel, Field


class StageStatus(str, Enum):
    """Execution status for a workflow stage."""

    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    WARNING = "warning"


class WorkflowStageName(str, Enum):
    """Named stages in the ComplyAI pipeline."""

    EXTRACTION = "extraction"
    PLANNER = "planner"
    EXECUTOR = "executor"
    REVIEWER = "reviewer"
    REVISION = "revision"
    REPORT = "report"


class CreateWorkflowRequest(BaseModel):
    """Request to create a workflow for an uploaded document."""

    document_id: str


class WorkflowStageResult(BaseModel):
    """Structured status and output for a workflow stage."""

    stage: WorkflowStageName
    status: StageStatus
    execution_time_ms: int = Field(ge=0)
    provider_used: str
    output_summary: str
    issues: list[str] = Field(default_factory=list)
    progress: int = Field(ge=0, le=100)


class WorkflowResponse(BaseModel):
    """Workflow metadata and current stage outputs."""

    workflow_id: str
    document_id: str
    status: StageStatus
    current_stage: WorkflowStageName
    revision_count: int
    stages: list[WorkflowStageResult]


class WorkflowArtifacts(BaseModel):
    """Combined artifacts produced by planner, executor, and reviewer."""

    planner: dict
    executor: dict
    reviewer: dict
