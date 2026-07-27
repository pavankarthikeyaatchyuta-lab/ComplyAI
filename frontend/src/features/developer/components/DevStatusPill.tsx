import type { PipelineStatus } from "../types";

const styles: Record<PipelineStatus, string> = {
  success: "border-emerald/30 bg-emerald/10 text-emerald",
  running: "border-sky-300/30 bg-sky-400/10 text-sky-300",
  warning: "border-amber/30 bg-amber/10 text-amber",
  failed: "border-red-400/30 bg-red-500/10 text-red-300"
};

export function DevStatusPill({ status }: { status: PipelineStatus }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${styles[status]}`}>
      {status}
    </span>
  );
}
