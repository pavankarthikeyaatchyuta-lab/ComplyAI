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
    status: "completed",
    executionTime: "0.9s",
    provider: "Gemini 1.5 Pro",
    outputSummary:
      "Cross-checking extracted dates, GSTIN, notice category, and response checklist against generated output.",
    issues: ["One missing annexure reference requires user confirmation."],
    progress: 100
  },
  {
    id: "report",
    title: "Compliance Report",
    description: "Packages verified artifacts into the final action report.",
    status: "running",
    executionTime: "0.4s",
    provider: "Report Composer",
    outputSummary:
      "Assembling the final compliance action report from verified planner, executor, and reviewer output.",
    issues: [],
    progress: 64
  }
];
