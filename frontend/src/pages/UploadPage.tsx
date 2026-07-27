import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  FileWarning,
  Play,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { FileDropzone } from "../features/upload/components/FileDropzone";
import { OcrIndicator } from "../features/upload/components/OcrIndicator";
import { RecentUploads } from "../features/upload/components/RecentUploads";
import { UnsupportedDocumentCard } from "../features/upload/components/UnsupportedDocumentCard";
import { UploadFailureCard } from "../features/upload/components/UploadFailureCard";
import { UploadPreviewPanel } from "../features/upload/components/UploadPreviewPanel";
import type { FileValidation, RecentUpload, UploadStatus } from "../features/upload/types";
import { validateUploadFile } from "../features/upload/validation";

const initialRecentUploads: RecentUpload[] = [
  {
    id: "recent-1",
    fileName: "drc-01-july-notice.pdf",
    documentType: "GST Notice DRC-01",
    status: "verified",
    uploadedAt: "Today"
  },
  {
    id: "recent-2",
    fileName: "gstr-3a-reminder.pdf",
    documentType: "GST Notice GSTR-3A",
    status: "needs_review",
    uploadedAt: "Yesterday"
  },
  {
    id: "recent-3",
    fileName: "supplier-invoice-gst.png",
    documentType: "GST Invoice",
    status: "verified",
    uploadedAt: "2 days ago"
  }
];

const stageCopy: Record<UploadStatus, string> = {
  idle: "Drop a supported document to begin.",
  validating: "Checking file type, size, and GST document signals.",
  uploading: "Uploading securely and preparing OCR.",
  ocr: "Running OCR indicator and extracting readable regions.",
  success: "Upload complete. Ready to start compliance workflow.",
  failure: "Upload failed. Retry with a supported GST document."
};

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<FileValidation | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [recentUploads, setRecentUploads] =
    useState<RecentUpload[]>(initialRecentUploads);

  const canUpload = Boolean(selectedFile && validation?.valid);

  const statusTone = useMemo(() => {
    if (status === "success") return "text-emerald";
    if (status === "failure" || validation?.valid === false) return "text-red-300";
    if (status === "uploading" || status === "ocr") return "text-sky-300";
    return "text-slate-300";
  }, [status, validation]);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setStatus("validating");
    setProgress(0);

    window.setTimeout(() => {
      const result = validateUploadFile(file);
      setValidation(result);
      setStatus(result.valid ? "idle" : "failure");
    }, 500);
  };

  const startUpload = () => {
    if (!selectedFile || !validation?.valid) return;

    setStatus("uploading");
    setProgress(8);
  };

  useEffect(() => {
    if (status !== "uploading" && status !== "ocr") return;

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 96) {
          window.clearInterval(interval);
          setStatus("success");
          return 100;
        }

        if (current >= 62 && status === "uploading") {
          setStatus("ocr");
        }

        return Math.min(100, current + 7);
      });
    }, 280);

    return () => window.clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (!selectedFile || !validation?.documentType || status !== "success") {
      return;
    }

    const documentType = validation.documentType;

    setRecentUploads((current) => [
      {
        id: `${selectedFile.name}-${Date.now()}`,
        fileName: selectedFile.name,
        documentType,
        status: "verified",
        uploadedAt: "Just now"
      },
      ...current.slice(0, 3)
    ]);
  }, [selectedFile, status, validation]);

  return (
    <main className="min-h-screen overflow-hidden bg-navy text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(46,144,250,0.28),transparent_28rem),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.18),transparent_26rem)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="#"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to landing
            </a>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-emerald" />
              Dropbox-simple upload - Vercel-polished workflow
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Upload GST documents with confidence.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Drag, validate, preview, and prepare OCR before ComplyAI starts
              the compliance workflow.
            </p>
          </div>
          <div className="glass-panel rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald" />
              <div>
                <p className="font-bold text-white">Secure intake</p>
                <p className="text-sm text-slate-400">
                  Local validation before workflow execution
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 py-8 lg:grid-cols-[1fr_390px]">
          <div className="space-y-6">
            <div className="glass-panel rounded-[2rem] p-5 md:p-6">
              <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-400">Upload Experience</p>
                  <h2 className="text-2xl font-extrabold text-white">
                    Document intake
                  </h2>
                </div>
                <span className={`text-sm font-bold ${statusTone}`}>
                  {stageCopy[status]}
                </span>
              </div>

              <FileDropzone onFileSelected={handleFileSelected} />

              <AnimatePresence mode="wait">
                {validation?.valid === false && validation.reason && (
                  <motion.div
                    key="unsupported"
                    className="mt-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                  >
                    <UnsupportedDocumentCard reason={validation.reason} />
                  </motion.div>
                )}
                {status === "failure" && validation?.valid && (
                  <motion.div
                    key="failure"
                    className="mt-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                  >
                    <UploadFailureCard onRetry={startUpload} />
                  </motion.div>
                )}
                {status === "success" && (
                  <motion.div
                    key="success"
                    className="mt-5 rounded-3xl border border-emerald/25 bg-emerald/10 p-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                  >
                    <div className="flex gap-4">
                      <CheckCircle2 className="h-6 w-6 text-emerald" />
                      <div>
                        <p className="font-bold text-white">Upload success</p>
                        <p className="mt-1 text-sm text-slate-300">
                          File validated, OCR indicator completed, and the
                          document is ready for extraction.
                        </p>
                        <a
                          data-cursor="button"
                          href="#/workflow"
                          className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-extrabold text-navy transition hover:bg-slate-100"
                        >
                          Open Workflow Dashboard
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  data-cursor="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald px-6 py-3 text-sm font-extrabold text-white shadow-glow transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                  type="button"
                  disabled={!canUpload || status === "uploading" || status === "ocr"}
                  onClick={startUpload}
                >
                  <Play className="h-4 w-4" />
                  Start upload
                </button>
                <button
                  data-cursor="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/[0.1]"
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setValidation(null);
                    setStatus("idle");
                    setProgress(0);
                  }}
                >
                  <FileWarning className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <OcrIndicator status={status} />
              <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
                <p className="font-bold text-white">Validation checks</p>
                <div className="mt-4 space-y-3 text-sm">
                  {[
                    "Supported file extension",
                    "Maximum size under 12 MB",
                    "GST document signal detected",
                    "Ready for OCR and extraction"
                  ].map((check) => (
                    <div key={check} className="flex items-center gap-3">
                      <CheckCircle2
                        className={`h-4 w-4 ${
                          validation?.valid ? "text-emerald" : "text-slate-500"
                        }`}
                      />
                      <span className="text-slate-300">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <RecentUploads uploads={recentUploads} />
          </div>

          <UploadPreviewPanel
            file={selectedFile}
            validation={validation}
            status={status}
            progress={progress}
          />
        </section>
      </div>
    </main>
  );
}
