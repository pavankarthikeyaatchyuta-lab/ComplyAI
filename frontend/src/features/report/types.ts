export type Priority = "low" | "medium" | "high";

export type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type MissingInformation = {
  field: string;
  reason: string;
  severity: "required" | "critical";
};

export type ImmediateAction = {
  id: string;
  title: string;
  owner: string;
  due: string;
};

export type ComplianceReport = {
  documentType: string;
  priority: Priority;
  deadline: string;
  providerUsed: string;
  reviewStatus: "verified" | "needs_revision";
  immediateActions: ImmediateAction[];
  checklist: ChecklistItem[];
  missingInformation: MissingInformation[];
  draftResponse: string;
};
