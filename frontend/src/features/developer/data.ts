import type { DevMetric, LogEntry, SchemaCheck, TimelineEvent } from "./types";

export const devMetrics: DevMetric[] = [
  {
    label: "Provider Used",
    value: "Gemini + Groq",
    detail: "Planner and reviewer on Gemini, executor on Groq",
    status: "success"
  },
  {
    label: "Revision Count",
    value: "0 / 1",
    detail: "Controlled revision remains available",
    status: "success"
  },
  {
    label: "Fallback Provider",
    value: "Ready",
    detail: "Groq fallback available for planner timeout",
    status: "warning"
  },
  {
    label: "API Timing",
    value: "5.1s",
    detail: "End-to-end simulated pipeline latency",
    status: "running"
  }
];

export const plannerJson = {
  stage: "planner",
  provider: "Gemini 1.5 Flash",
  objective: "Respond to GST Notice DRC-01 before statutory deadline",
  priority: "high",
  deadline: "2026-07-15",
  requiredActions: [
    "Verify GSTIN and notice reference",
    "Collect invoice annexures",
    "Prepare reconciliation and response"
  ],
  risk: {
    level: "medium",
    reason: "Demand amount confidence requires confirmation"
  }
};

export const executorJson = {
  stage: "executor",
  provider: "Groq Llama 3.1",
  artifacts: [
    "compliance_summary",
    "required_actions",
    "missing_information",
    "checklist",
    "draft_response"
  ],
  outputQuality: {
    completeness: 0.86,
    missingFields: ["annexure_reference", "demand_amount_confirmation"]
  }
};

export const reviewerJson = {
  stage: "reviewer",
  provider: "Gemini 1.5 Pro",
  schemaValidation: "passed",
  approvalReadiness: "ready_with_warnings",
  warnings: [
    "Annexure reference not found in upload",
    "Demand amount extracted with medium confidence"
  ],
  revisionPolicy: {
    allowed: true,
    remaining: 1
  }
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "upload",
    stage: "Upload Intake",
    provider: "Local Validation",
    duration: "0.6s",
    apiTiming: "38ms",
    status: "success"
  },
  {
    id: "planner",
    stage: "Planner",
    provider: "Gemini 1.5 Flash",
    duration: "1.8s",
    apiTiming: "1.28s",
    status: "success"
  },
  {
    id: "executor",
    stage: "Executor",
    provider: "Groq Llama 3.1",
    duration: "2.4s",
    apiTiming: "1.74s",
    status: "success"
  },
  {
    id: "reviewer",
    stage: "Reviewer",
    provider: "Gemini 1.5 Pro",
    duration: "0.9s",
    apiTiming: "812ms",
    status: "warning"
  },
  {
    id: "report",
    stage: "Report Composer",
    provider: "Internal Renderer",
    duration: "0.4s",
    apiTiming: "116ms",
    status: "running"
  }
];

export const logs: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "10:42:18.204",
    level: "info",
    message: "Document intake completed and workflow context initialized."
  },
  {
    id: "log-2",
    timestamp: "10:42:19.481",
    level: "info",
    message: "Planner produced high-priority response plan for DRC-01."
  },
  {
    id: "log-3",
    timestamp: "10:42:21.883",
    level: "warn",
    message: "Executor marked demand_amount_confirmation as missing."
  },
  {
    id: "log-4",
    timestamp: "10:42:22.702",
    level: "warn",
    message: "Reviewer passed schema validation with warnings."
  },
  {
    id: "log-5",
    timestamp: "10:42:23.019",
    level: "error",
    message: "No runtime error. Displaying sample error lane for judge visibility."
  }
];

export const schemaChecks: SchemaCheck[] = [
  {
    id: "schema-1",
    schema: "ComplianceSummary",
    status: "success",
    detail: "All required fields present"
  },
  {
    id: "schema-2",
    schema: "RequiredActions",
    status: "success",
    detail: "3 actions normalized"
  },
  {
    id: "schema-3",
    schema: "MissingInformation",
    status: "warning",
    detail: "2 unresolved items remain visible"
  },
  {
    id: "schema-4",
    schema: "DraftResponse",
    status: "success",
    detail: "Response body passed length and structure checks"
  }
];
