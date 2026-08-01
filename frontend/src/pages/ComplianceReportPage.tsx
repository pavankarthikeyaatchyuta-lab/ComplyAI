import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  FileCheck2,
  Gauge,
  Layers3,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ActionList } from "../features/report/components/ActionList";
import { ChecklistPanel } from "../features/report/components/ChecklistPanel";
import { DraftResponsePanel } from "../features/report/components/DraftResponsePanel";
import { MissingInfoPanel } from "../features/report/components/MissingInfoPanel";
import { ReportActionBar } from "../features/report/components/ReportActionBar";
import { ReportMetricCard } from "../features/report/components/ReportMetricCard";
import { ReportSectionCard } from "../features/report/components/ReportSectionCard";
import { complianceReport } from "../features/report/data";
import { getWorkflowReport } from "../services";
import { useEffect, useState } from "react";

const priorityTone = {
  low: "border-emerald/30 bg-emerald/10 text-emerald",
  medium: "border-amber/30 bg-amber/10 text-amber",
  high: "border-red-400/30 bg-red-500/10 text-red-300"
};

export function ComplianceReportPage() {
  const [backendWorkflowId, setBackendWorkflowId] = useState<string | null>(null);

  useEffect(() => {
    const workflowId = window.sessionStorage.getItem("complyai_report_workflow_id");
    if (!workflowId) return;

    setBackendWorkflowId(workflowId);
    getWorkflowReport(workflowId).catch(() => {
      // Keep the static report visible if the backend is unavailable.
    });
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-navy text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(46,144,250,0.26),transparent_30rem),radial-gradient(circle_at_82%_16%,rgba(16,185,129,0.16),transparent_28rem)]" />
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
                <Sparkles className="h-4 w-4 text-emerald" />
                Verified compliance action report
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Compliance Action Report
              </h1>
              {backendWorkflowId && (
                <p className="mt-3 text-sm text-slate-400">
                  Synced from backend workflow{" "}
                  <span className="font-semibold text-white">{backendWorkflowId}</span>
                </p>
              )}
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                A professional, export-ready report with immediate actions,
                checklist, missing information, draft response, review status,
                and provider trace.
              </p>
            </div>
            <motion.div
              className="glass-panel rounded-[2rem] p-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Report ID</p>
                  <p className="text-xl font-extrabold text-white">
                    CMP-GST-2026-DRC01
                  </p>
                </div>
                <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-extrabold text-emerald">
                  Verified
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-slate-400">Generated</p>
                  <p className="mt-1 font-bold text-white">27 Jul 2026</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-slate-400">Revision</p>
                  <p className="mt-1 font-bold text-white">0 of 1 used</p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-4">
          <ReportMetricCard
            icon={FileCheck2}
            label="Document Type"
            tone="sky"
            value={complianceReport.documentType}
          />
          <ReportMetricCard
            icon={Gauge}
            label="Priority"
            tone="red"
            value={complianceReport.priority.toUpperCase()}
          />
          <ReportMetricCard
            icon={CalendarClock}
            label="Deadline"
            tone="amber"
            value={complianceReport.deadline}
          />
          <ReportMetricCard
            icon={ShieldCheck}
            label="Review Status"
            tone="emerald"
            value="VERIFIED"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <ReportSectionCard
              eyebrow="Priority Work"
              title="Immediate Actions"
              action={
                <span
                  className={`w-fit rounded-full border px-3 py-1 text-xs font-extrabold ${priorityTone[complianceReport.priority]}`}
                >
                  {complianceReport.priority} priority
                </span>
              }
            >
              <ActionList actions={complianceReport.immediateActions} />
            </ReportSectionCard>

            <div className="grid gap-6 xl:grid-cols-2">
              <ReportSectionCard eyebrow="Completion" title="Checklist">
                <ChecklistPanel checklist={complianceReport.checklist} />
              </ReportSectionCard>

              <ReportSectionCard
                eyebrow="Open Items"
                title="Missing Information"
                action={
                  <span className="rounded-full border border-amber/25 bg-amber/10 px-3 py-1 text-xs font-extrabold text-amber">
                    {complianceReport.missingInformation.length} required
                  </span>
                }
              >
                <MissingInfoPanel items={complianceReport.missingInformation} />
              </ReportSectionCard>
            </div>

            <ReportSectionCard eyebrow="Response Draft" title="Draft Response">
              <DraftResponsePanel response={complianceReport.draftResponse} />
            </ReportSectionCard>
          </div>

          <aside className="space-y-6">
            <ReportSectionCard eyebrow="Verification" title="Review Status">
              <div className="rounded-3xl border border-emerald/25 bg-emerald/10 p-5">
                <div data-cursor="review" className="flex gap-4">
                  <BadgeCheck className="h-6 w-6 text-emerald" />
                  <div>
                    <p className="font-extrabold text-white">
                      Reviewer verification passed
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      The report is ready for user approval, export, and print.
                      Missing information is visible and does not block report
                      review.
                    </p>
                  </div>
                </div>
              </div>
            </ReportSectionCard>

            <ReportSectionCard eyebrow="Provider Trace" title="Provider Used">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <Layers3 className="h-6 w-6 text-sky-300" />
                <p className="mt-4 font-extrabold text-white">
                  {complianceReport.providerUsed}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Planner, executor, and reviewer outputs are represented as
                  structured report sections for auditability.
                </p>
              </div>
            </ReportSectionCard>

            <ReportSectionCard eyebrow="Risk Notes" title="Attention Required">
              <div className="rounded-3xl border border-amber/25 bg-amber/10 p-5">
                <div data-cursor="error" className="flex gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber" />
                  <p className="text-sm leading-6 text-amber-50/85">
                    Attach the missing annexure reference and confirm the demand
                    amount before filing the response.
                  </p>
                </div>
              </div>
            </ReportSectionCard>
          </aside>
        </section>

        <div className="py-8">
          <ReportActionBar />
        </div>
      </div>
    </main>
  );
}
