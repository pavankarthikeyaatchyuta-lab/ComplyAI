export type WorkflowStageStatus =
  | "completed"
  | "running"
  | "pending"
  | "warning"
  | "blocked";

export type WorkflowStage = {
  id: string;
  title: string;
  description: string;
  status: WorkflowStageStatus;
  executionTime: string;
  provider: string;
  outputSummary: string;
  issues: string[];
  progress: number;
};
