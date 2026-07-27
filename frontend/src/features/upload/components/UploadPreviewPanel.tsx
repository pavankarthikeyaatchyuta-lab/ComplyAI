import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { formatFileSize } from "../validation";
import type { FileValidation, UploadStatus } from "../types";
import { ProgressRing } from "./ProgressRing";

export function UploadPreviewPanel({
  file,
  validation,
  status,
  progress
}: {
  file: File | null;
  validation: FileValidation | null;
  status: UploadStatus;
  progress: number;
}) {
  return (
    <aside className="glass-panel rounded-[2rem] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Preview Panel</p>
          <h2 className="text-xl font-extrabold text-white">Document intake</h2>
        </div>
        <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200">
          OCR ready
        </span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-navy/45 p-5">
        <div className="rounded-2xl border border-dashed border-white/18 bg-white/[0.045] p-6">
          <FileText className="h-12 w-12 text-slate-300" />
          <div className="mt-6 space-y-3">
            <div className="h-3 rounded-full bg-white/20" />
            <div className="h-3 w-4/5 rounded-full bg-white/14" />
            <div className="h-3 w-3/5 rounded-full bg-white/10" />
          </div>
        </div>

        {file ? (
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-sm text-slate-400">Selected file</p>
              <p className="break-words font-bold text-white">{file.name}</p>
              <p className="mt-1 text-sm text-slate-400">
                {formatFileSize(file.size)}
              </p>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400">Document type</span>
                <span className="font-semibold text-white">
                  {validation?.documentType ?? "Not detected"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-slate-400">Validation</span>
                <span
                  className={
                    validation?.valid
                      ? "font-semibold text-emerald"
                      : "font-semibold text-red-300"
                  }
                >
                  {validation?.valid ? "Passed" : "Needs attention"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Select a supported file to see document metadata, validation, OCR
            readiness, and upload progress.
          </p>
        )}
      </div>

      {(status === "uploading" || status === "ocr" || status === "success") && (
        <div className="mt-6 flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <ProgressRing progress={progress} />
          <p className="mt-3 font-bold text-white">
            {status === "ocr"
              ? "Running OCR"
              : status === "success"
                ? "Upload complete"
                : "Uploading document"}
          </p>
          <p className="mt-1 text-center text-sm text-slate-400">
            {status === "success"
              ? "Ready for extraction and workflow planning."
              : "Securing file and preparing compliance extraction."}
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="mt-6 rounded-3xl border border-emerald/25 bg-emerald/10 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald" />
            <div>
              <p className="font-bold text-white">Upload success</p>
              <p className="mt-1 text-sm text-slate-300">
                Validation passed, OCR queued, and the compliance workflow can
                begin.
              </p>
            </div>
          </div>
        </div>
      )}

      {validation?.valid && status === "idle" && (
        <div className="mt-6 flex items-center gap-3 rounded-3xl border border-emerald/25 bg-emerald/10 p-5">
          <CheckCircle2 className="h-5 w-5 text-emerald" />
          <p className="text-sm font-semibold text-white">
            File validation passed. Ready to upload.
          </p>
        </div>
      )}
    </aside>
  );
}
