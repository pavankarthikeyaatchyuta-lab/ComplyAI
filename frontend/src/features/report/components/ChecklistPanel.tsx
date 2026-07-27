import { CheckCircle2, Circle } from "lucide-react";
import type { ChecklistItem } from "../types";

export function ChecklistPanel({ checklist }: { checklist: ChecklistItem[] }) {
  return (
    <div className="grid gap-3">
      {checklist.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
        >
          {item.completed ? (
            <CheckCircle2 className="h-5 w-5 text-emerald" />
          ) : (
            <Circle className="h-5 w-5 text-slate-500" />
          )}
          <span
            className={
              item.completed
                ? "font-semibold text-white"
                : "font-semibold text-slate-300"
            }
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
