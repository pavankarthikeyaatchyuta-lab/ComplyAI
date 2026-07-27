export type PipelineStatus = "success" | "running" | "warning" | "failed";

export type DevMetric = {
  label: string;
  value: string;
  detail: string;
  status: PipelineStatus;
};

export type TimelineEvent = {
  id: string;
  stage: string;
  provider: string;
  duration: string;
  apiTiming: string;
  status: PipelineStatus;
};

export type LogEntry = {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error";
  message: string;
};

export type SchemaCheck = {
  id: string;
  schema: string;
  status: PipelineStatus;
  detail: string;
};
