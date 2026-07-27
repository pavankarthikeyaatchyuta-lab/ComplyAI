import { Activity, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import type { DevMetric } from "../types";
import { DevStatusPill } from "./DevStatusPill";

const icons = {
  success: CheckCircle2,
  running: Loader2,
  warning: AlertTriangle,
  failed: Activity
};

export function DevMetricCard({ metric }: { metric: DevMetric }) {
  const Icon = icons[metric.status];

  return (
    <article className="glass-panel rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.05]">
          <Icon className={`h-5 w-5 ${metric.status === "running" ? "animate-spin text-sky-300" : "text-emerald"}`} />
        </div>
        <DevStatusPill status={metric.status} />
      </div>
      <p className="mt-5 text-sm text-slate-400">{metric.label}</p>
      <p className="mt-1 text-2xl font-extrabold text-white">{metric.value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{metric.detail}</p>
    </article>
  );
}
