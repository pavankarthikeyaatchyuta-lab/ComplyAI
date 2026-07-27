import { RefreshCw, XCircle } from "lucide-react";

export function UploadFailureCard({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <XCircle className="h-6 w-6 text-red-300" />
          <div>
            <p className="font-bold text-white">Upload failed</p>
            <p className="mt-1 text-sm text-red-100/80">
              The file could not be processed. Retry with a clearer file or a
              supported GST document.
            </p>
          </div>
        </div>
        <button
          className="inline-flex items-center justify-center gap-2 rounded-full border border-red-300/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-100 transition hover:bg-red-500/20"
          type="button"
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    </div>
  );
}
