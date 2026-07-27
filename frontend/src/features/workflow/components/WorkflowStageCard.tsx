import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Cpu,
  FileText,
  Loader2
} from "lucide-react";
import type { WorkflowStage } from "../types";
import { StageStatusBadge } from "./StageStatusBadge";
import { WorkflowProgressBar } from "./WorkflowProgressBar";

const iconClass = {
  completed: "text-emerald",
  running: "text-sky-300",
  pending: "text-slate-400",
  warning: "text-amber",
  blocked: "text-red-300"
};

export function WorkflowStageCard({
  stage,
  index
}: {
  stage: WorkflowStage;
  index: number;
}) {
  const isRunning = stage.status === "running";

  return (
    <motion.article
      data-cursor="agent"
      className="relative glass-panel rounded-[1.75rem] p-5 transition hover:-translate-y-1 hover:border-white/25"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.06]">
            {isRunning && (
              <motion.span
                className="absolute inset-0 rounded-2xl border border-sky-300/40"
                animate={{ scale: [1, 1.22, 1], opacity: [0.75, 0.1, 0.75] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              />
            )}
            {isRunning ? (
              <Loader2 className="h-5 w-5 animate-spin text-sky-300" />
            ) : stage.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald" />
            ) : (
              <FileText className={`h-5 w-5 ${iconClass[stage.status]}`} />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-extrabold text-white">{stage.title}</h3>
              <StageStatusBadge status={stage.status} />
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {stage.description}
            </p>
          </div>
        </div>
        <div className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm md:min-w-52">
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <Clock3 className="h-4 w-4" />
              Time
            </span>
            <span className="font-bold text-white">{stage.executionTime}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-slate-400">
              <Cpu className="h-4 w-4" />
              Provider
            </span>
            <span className="font-bold text-white">{stage.provider}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-300">Progress</span>
          <span className="font-extrabold text-white">{stage.progress}%</span>
        </div>
        <WorkflowProgressBar progress={stage.progress} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.65fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Output Summary
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            {stage.outputSummary}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Issues
          </p>
          {stage.issues.length ? (
            <div className="mt-3 space-y-2">
              {stage.issues.map((issue) => (
                <p key={issue} className="flex gap-2 text-sm leading-6 text-amber">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {issue}
                </p>
              ))}
            </div>
          ) : (
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald">
              <CheckCircle2 className="h-4 w-4" />
              No issues detected
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}
