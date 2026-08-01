import { apiGet, apiPost } from "./api";

export type WorkflowStageStatus = "pending" | "running" | "completed" | "failed" | "warning";
export type WorkflowStageName = "extraction" | "planner" | "executor" | "reviewer" | "revision" | "report";

export type WorkflowStageResult = {
  stage: WorkflowStageName;
  status: WorkflowStageStatus;
  execution_time_ms: number;
  provider_used: string;
  output_summary: string;
  issues: string[];
  progress: number;
};

export type WorkflowResponse = {
  workflow_id: string;
  document_id: string;
  status: WorkflowStageStatus;
  current_stage: WorkflowStageName;
  revision_count: number;
  stages: WorkflowStageResult[];
};

export type WorkflowArtifacts = {
  planner: Record<string, unknown>;
  executor: Record<string, unknown>;
  reviewer: Record<string, unknown>;
};

export function createWorkflow(documentId: string) {
  return apiPost<WorkflowResponse>("/api/workflows", { document_id: documentId });
}

export function getWorkflow(workflowId: string) {
  return apiGet<WorkflowResponse>(`/api/workflows/${workflowId}`);
}

export function runWorkflow(workflowId: string) {
  return apiPost<WorkflowResponse>(`/api/workflows/${workflowId}/run`);
}

export function getWorkflowStatus(workflowId: string) {
  return apiGet<WorkflowResponse>(`/api/workflows/${workflowId}/status`);
}

export function getWorkflowArtifacts(workflowId: string) {
  return apiGet<WorkflowArtifacts>(`/api/workflows/${workflowId}/artifacts`);
}

