import { AlertTriangle } from "lucide-react";
import type { MissingInformation } from "../types";

export function MissingInfoPanel({
  items
}: {
  items: MissingInformation[];
}) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <article
          key={item.field}
          className="rounded-3xl border border-amber/25 bg-amber/10 p-4"
        >
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-extrabold text-white">{item.field}</p>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-extrabold ${
                    item.severity === "critical"
                      ? "border-red-400/30 bg-red-500/10 text-red-300"
                      : "border-amber/25 bg-amber/10 text-amber"
                  }`}
                >
                  {item.severity}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-amber-50/80">
                {item.reason}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
