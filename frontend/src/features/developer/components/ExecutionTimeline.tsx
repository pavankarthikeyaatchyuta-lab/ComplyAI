import { motion } from "framer-motion";
import { Clock3, Cpu } from "lucide-react";
import type { TimelineEvent } from "../types";
import { DevStatusPill } from "./DevStatusPill";

export function ExecutionTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="glass-panel rounded-[1.75rem] p-6">
      <div className="mb-6">
        <p className="text-sm text-slate-400">Execution Timeline</p>
        <h2 className="text-2xl font-extrabold text-white">Pipeline trace</h2>
      </div>
      <div className="relative space-y-4">
        <div className="absolute left-5 top-4 h-[calc(100%-2rem)] w-px bg-white/12" />
        <motion.div
          className="absolute left-5 top-4 w-px bg-gradient-to-b from-sky-400 to-emerald"
          initial={{ height: 0 }}
          animate={{ height: "76%" }}
          transition={{ duration: 1.1 }}
        />
        {events.map((event, index) => (
          <motion.article
            key={event.id}
            className="relative ml-12 rounded-3xl border border-white/10 bg-white/[0.04] p-4"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <span className="absolute -left-[39px] top-5 h-4 w-4 rounded-full border border-white/20 bg-navy">
              <span className="absolute inset-1 rounded-full bg-emerald" />
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-extrabold text-white">{event.stage}</h3>
                  <DevStatusPill status={event.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" />
                    {event.provider}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />
                    {event.duration}
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm">
                <span className="text-slate-400">API </span>
                <span className="font-extrabold text-white">{event.apiTiming}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
