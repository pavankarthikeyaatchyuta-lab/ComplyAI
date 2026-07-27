import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bug,
  CircuitBoard,
  Gauge,
  GitBranch,
  Radio,
  ShieldAlert
} from "lucide-react";
import {
  devMetrics,
  executorJson,
  logs,
  plannerJson,
  reviewerJson,
  schemaChecks,
  timelineEvents
} from "../features/developer/data";
import { DevMetricCard } from "../features/developer/components/DevMetricCard";
import { ExecutionTimeline } from "../features/developer/components/ExecutionTimeline";
import { JsonViewer } from "../features/developer/components/JsonViewer";
import { LogConsole } from "../features/developer/components/LogConsole";
import { SchemaValidationPanel } from "../features/developer/components/SchemaValidationPanel";

export function DeveloperModePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-navy text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(46,144,250,0.24),transparent_30rem),radial-gradient(circle_at_86%_16%,rgba(16,185,129,0.14),transparent_26rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">
        <header className="border-b border-white/10 pb-7">
          <a
            data-cursor="button"
            href="#/workflow"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to workflow
          </a>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                <CircuitBoard className="h-4 w-4 text-emerald" />
                Judge-facing pipeline observability
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Developer Mode
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                Inspect planner, executor, reviewer, schema validation,
                provider usage, fallback readiness, logs, errors, and API
                timing in a professional DevOps dashboard.
              </p>
            </div>
            <motion.div
              className="glass-panel rounded-[2rem] p-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <div className="relative grid h-14 w-14 place-items-center rounded-3xl bg-emerald/10">
                  <motion.span
                    className="absolute inset-0 rounded-3xl border border-emerald/35"
                    animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0.1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <Radio className="h-6 w-6 text-emerald" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Pipeline State</p>
                  <p className="text-2xl font-extrabold text-white">
                    Running with warnings
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-4">
          {devMetrics.map((metric) => (
            <DevMetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <ExecutionTimeline events={timelineEvents} />
            <div className="grid gap-6 xl:grid-cols-3">
              <JsonViewer title="Planner JSON" data={plannerJson} />
              <JsonViewer title="Executor JSON" data={executorJson} />
              <JsonViewer title="Reviewer JSON" data={reviewerJson} />
            </div>
            <LogConsole logs={logs} />
          </div>

          <aside className="space-y-6">
            <SchemaValidationPanel checks={schemaChecks} />

            <section className="glass-panel rounded-[1.75rem] p-6">
              <div className="mb-5 flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-sky-300" />
                <div>
                  <p className="text-sm text-slate-400">Fallback Provider</p>
                  <h2 className="text-xl font-extrabold text-white">
                    Groq standby
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  ["Primary planner", "Gemini 1.5 Flash"],
                  ["Fallback planner", "Groq Llama 3.1"],
                  ["Retry budget", "2 attempts"],
                  ["Timeout threshold", "8 seconds"]
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <span className="text-slate-400">{label}</span>
                    <span className="font-bold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-panel rounded-[1.75rem] p-6">
              <div className="mb-5 flex items-center gap-3">
                <Gauge className="h-5 w-5 text-emerald" />
                <div>
                  <p className="text-sm text-slate-400">API Timing</p>
                  <h2 className="text-xl font-extrabold text-white">
                    Latency budget
                  </h2>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ["Upload", 18],
                  ["Planner", 64],
                  ["Executor", 78],
                  ["Reviewer", 42],
                  ["Report", 22]
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-400">{label as string}</span>
                      <span className="font-bold text-white">{value as number}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald"
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-panel rounded-[1.75rem] p-6">
              <div className="flex gap-4">
                <ShieldAlert className="h-6 w-6 text-amber" />
                <div>
                  <p className="font-extrabold text-white">Errors lane</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Runtime errors are separated from schema warnings so judges
                    can see that the pipeline distinguishes system failure from
                    compliance uncertainty.
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-red-400/25 bg-red-500/10 p-4">
                <div className="flex gap-3">
                  <Bug className="mt-1 h-5 w-5 shrink-0 text-red-300" />
                  <p className="text-sm leading-6 text-red-100/85">
                    No active runtime error. Sample error lane remains visible
                    for evaluation and debugging demonstration.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
