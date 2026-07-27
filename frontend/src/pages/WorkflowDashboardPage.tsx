import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  Clock3,
  FileCheck2,
  Radio,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { workflowStages } from "../features/workflow/data";
import { WorkflowTimeline } from "../features/workflow/components/WorkflowTimeline";

export function WorkflowDashboardPage() {
  const [livePulse, setLivePulse] = useState(72);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLivePulse((current) => (current >= 88 ? 72 : current + 2));
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  const completedStages = useMemo(
    () => workflowStages.filter((stage) => stage.status === "completed").length,
    []
  );

  return (
    <main className="min-h-screen overflow-hidden bg-navy text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(46,144,250,0.28),transparent_30rem),radial-gradient(circle_at_82%_20%,rgba(16,185,129,0.16),transparent_26rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">
        <header className="border-b border-white/10 pb-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <a
                href="#/upload"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to upload
              </a>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                <Radio className="h-4 w-4 text-emerald" />
                Live workflow updates enabled
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Workflow Dashboard
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                Track Planner, Executor, Reviewer, Revision, and Compliance
                Report stages as structured execution cards instead of chat
                messages.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
              {[
                ["Completed", `${completedStages}/5`, BadgeCheck],
                ["Live progress", `${livePulse}%`, Sparkles],
                ["Elapsed", "5.1s", Clock3]
              ].map(([label, value, Icon]) => (
                <motion.div
                  key={label as string}
                  className="glass-panel rounded-3xl p-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Icon className="h-5 w-5 text-emerald" />
                  <p className="mt-3 text-sm text-slate-400">{label as string}</p>
                  <p className="text-2xl font-extrabold text-white">
                    {value as string}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[1fr_360px]">
          <WorkflowTimeline stages={workflowStages} />

          <aside className="space-y-6">
            <div className="glass-panel rounded-[2rem] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Document Context</p>
                  <h2 className="text-xl font-extrabold text-white">
                    DRC-01 Notice
                  </h2>
                </div>
                <span className="rounded-full border border-amber/25 bg-amber/10 px-3 py-1 text-xs font-extrabold text-amber">
                  Due soon
                </span>
              </div>
              <div className="mt-5 rounded-3xl border border-dashed border-white/18 bg-white/[0.04] p-6">
                <FileCheck2 className="h-11 w-11 text-sky-300" />
                <div className="mt-6 space-y-3">
                  <div className="h-3 rounded-full bg-white/20" />
                  <div className="h-3 w-4/5 rounded-full bg-white/14" />
                  <div className="h-3 w-3/5 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {[
                  ["GSTIN", "Detected"],
                  ["Notice", "DRC-01"],
                  ["Risk", "Medium"],
                  ["Revision", "Available"]
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-white/10 pb-3"
                  >
                    <span className="text-slate-400">{label}</span>
                    <span className="font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] p-6">
              <div className="flex gap-4">
                <ShieldCheck className="h-6 w-6 text-emerald" />
                <div>
                  <p className="font-extrabold text-white">Enterprise trace</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Every stage exposes provider, execution time, progress,
                    output summary, and issues before the report is generated.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#/workflow"
              className="flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-emerald px-6 py-4 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
            >
              Continue Review
            </a>
          </aside>
        </section>
      </div>
    </main>
  );
}
