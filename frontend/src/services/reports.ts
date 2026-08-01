import { apiGet, apiPost } from "./api";

export type RequiredAction = {
  title: string;
  owner: string;
  due: string;
};

export type MissingInformation = {
  field: string;
  reason: string;
  severity: string;
};

export type ComplianceReport = {
  report_id: string;
  workflow_id: string;
  document_type: string;
  priority: string;
  deadline: string;
  immediate_actions: RequiredAction[];
  checklist: string[];
  missing_information: MissingInformation[];
  draft_response: string;
  review_status: string;
  provider_used: string;
};

export function generateWorkflowReport(workflowId: string) {
  return apiPost<ComplianceReport>(`/api/workflows/${workflowId}/report`);
}

export function getWorkflowReport(workflowId: string) {
  return apiGet<ComplianceReport>(`/api/workflows/${workflowId}/report`);
}

export function getReport(reportId: string) {
  return apiGet<ComplianceReport>(`/api/reports/${reportId}`);
}

export async function downloadReport(reportId: string) {
  const response = await fetch(`${apiGetBaseUrl()}/api/reports/${reportId}/download`, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error("Unable to download the report.");
  }

  return response.json();
}

function apiGetBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";
}

