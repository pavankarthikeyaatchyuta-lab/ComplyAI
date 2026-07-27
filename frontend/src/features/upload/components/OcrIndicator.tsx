import { motion } from "framer-motion";
import { ScanText } from "lucide-react";
import type { UploadStatus } from "../types";

export function OcrIndicator({ status }: { status: UploadStatus }) {
  const active = status === "ocr" || status === "uploading";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center gap-4">
        <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-sky-400/10">
          {active && (
            <motion.span
              className="absolute inset-0 rounded-2xl border border-sky-300/50"
              animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0.1, 0.7] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}
          <ScanText className="h-6 w-6 text-sky-300" />
        </div>
        <div>
          <p className="font-bold text-white">OCR readiness</p>
          <p className="text-sm text-slate-400">
            {status === "ocr"
              ? "Reading document text and layout"
              : "Ready to extract GST fields after upload"}
          </p>
        </div>
      </div>
    </div>
  );
}
