import { ShieldCheck } from "lucide-react";
import type { SchemaCheck } from "../types";
import { DevStatusPill } from "./DevStatusPill";

export function SchemaValidationPanel({ checks }: { checks: SchemaCheck[] }) {
  return (
    <section className="glass-panel rounded-[1.75rem] p-6">
      <div className="mb-5 flex items-center gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald" />
        <div>
          <p className="text-sm text-slate-400">Schema Validation</p>
          <h2 className="text-xl font-extrabold text-white">Pydantic-ready contracts</h2>
        </div>
      </div>
      <div className="grid gap-3">
        {checks.map((check) => (
          <article
            key={check.id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-extrabold text-white">{check.schema}</p>
                <p className="mt-1 text-sm text-slate-400">{check.detail}</p>
              </div>
              <DevStatusPill status={check.status} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
