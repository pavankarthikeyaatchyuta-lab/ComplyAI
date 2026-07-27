import { AlertTriangle } from "lucide-react";

export function UnsupportedDocumentCard({ reason }: { reason: string }) {
  return (
    <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5">
      <div className="flex gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-red-500/15">
          <AlertTriangle className="h-5 w-5 text-red-300" />
        </div>
        <div>
          <p className="font-bold text-white">Unsupported document</p>
          <p className="mt-1 text-sm leading-6 text-red-100/80">{reason}</p>
        </div>
      </div>
    </div>
  );
}
