import { Clock3, FileCheck2 } from "lucide-react";
import type { RecentUpload } from "../types";

const statusClass = {
  verified: "border-emerald/25 bg-emerald/10 text-emerald",
  needs_review: "border-amber/25 bg-amber/10 text-amber",
  failed: "border-red-400/25 bg-red-500/10 text-red-300"
};

export function RecentUploads({ uploads }: { uploads: RecentUpload[] }) {
  return (
    <section className="glass-panel rounded-[2rem] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Recent Uploads</p>
          <h2 className="text-xl font-extrabold text-white">Intake history</h2>
        </div>
        <Clock3 className="h-5 w-5 text-slate-400" />
      </div>
      <div className="grid gap-3">
        {uploads.map((upload) => (
          <article
            key={upload.id}
            className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky-400/10">
                <FileCheck2 className="h-5 w-5 text-sky-300" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{upload.fileName}</p>
                <p className="text-sm text-slate-400">
                  {upload.documentType} · {upload.uploadedAt}
                </p>
              </div>
            </div>
            <span
              className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass[upload.status]}`}
            >
              {upload.status === "needs_review"
                ? "Needs review"
                : upload.status}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
