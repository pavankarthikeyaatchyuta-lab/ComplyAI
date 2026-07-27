import type { WorkflowStageStatus } from "../types";

const statusStyles: Record<WorkflowStageStatus, string> = {
  completed: "border-emerald/30 bg-emerald/10 text-emerald",
  running: "border-sky-300/30 bg-sky-400/10 text-sky-300",
  pending: "border-white/12 bg-white/[0.06] text-slate-300",
  warning: "border-amber/30 bg-amber/10 text-amber",
  blocked: "border-red-400/30 bg-red-500/10 text-red-300"
};

const statusLabels: Record<WorkflowStageStatus, string> = {
  completed: "Completed",
  running: "Running",
  pending: "Pending",
  warning: "Needs review",
  blocked: "Blocked"
};

export function StageStatusBadge({ status }: { status: WorkflowStageStatus }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-extrabold ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
