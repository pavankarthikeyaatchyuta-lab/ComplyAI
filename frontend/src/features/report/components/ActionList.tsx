import { ArrowUpRight, Clock3, UserRound } from "lucide-react";
import type { ImmediateAction } from "../types";

export function ActionList({ actions }: { actions: ImmediateAction[] }) {
  return (
    <div className="grid gap-3">
      {actions.map((action, index) => (
        <article
          key={action.id}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-4"
        >
          <div className="flex gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-sky-400/10 text-sm font-extrabold text-sky-300">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-6 text-white">{action.title}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5" />
                  {action.owner}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {action.due}
                </span>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-slate-500" />
          </div>
        </article>
      ))}
    </div>
  );
}
