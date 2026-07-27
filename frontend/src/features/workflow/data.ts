import type { WorkflowStage } from "./types";

export const workflowStages: WorkflowStage[] = [
  {
    id: "planner",
    title: "Planner",
    description: "Maps extracted GST facts into a compliance action strategy.",
    status: "completed",
    executionTime: "1.8s",
    provider: "Gemini 1.5 Flash",
    outputSummary:
      "Identified DRC-01 response objective, filing deadline, risk level, and required supporting documents.",
    issues: [],
    progress: 100
  },
  {
    id: "executor",
    title: "Executor",
    description: "Generates structured artifacts from the approved action plan.",
    status: "completed",
    executionTime: "2.4s",
    provider: "Groq Llama 3.1",
    outputSummary:
      "Generated compliance summary, required actions, missing information list, checklist, and draft response.",
    issues: ["Demand amount confidence is medium because scan quality is uneven."],
    progress: 100
  },
  {
    id: "reviewer",
    title: "Reviewer",
    description: "Verifies consistency, completeness, and report readiness.",
    status: "running",
    executionTime: "0.9s",
    provider: "Gemini 1.5 Pro",
    outputSummary:
      "Cross-checking extracted dates, GSTIN, notice category, and response checklist against generated output.",
    issues: ["One missing annexure reference requires user confirmation."],
    progress: 72
  },
  {
    id: "revision",
    title: "Revision",
    description: "Allows one controlled correction before the final report.",
    status: "pending",
    executionTime: "-",
    provider: "Workflow Policy",
    outputSummary:
      "Revision remains available if the reviewer flags a material correction.",
    issues: [],
    progress: 0
  },
  {
    id: "report",
    title: "Compliance Report",
    description: "Packages verified artifacts into the final action report.",
    status: "pending",
    executionTime: "-",
    provider: "Report Composer",
    outputSummary:
      "Waiting for reviewer approval before generating final compliance action report.",
    issues: [],
    progress: 0
  }
];
