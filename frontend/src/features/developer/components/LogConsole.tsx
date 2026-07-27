import { TerminalSquare } from "lucide-react";
import type { LogEntry } from "../types";

const levelClass = {
  info: "text-sky-300",
  warn: "text-amber",
  error: "text-red-300"
};

export function LogConsole({ logs }: { logs: LogEntry[] }) {
  return (
    <section className="glass-panel overflow-hidden rounded-[1.75rem]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <TerminalSquare className="h-5 w-5 text-emerald" />
        <div>
          <p className="text-sm text-slate-400">Logs</p>
          <h2 className="font-extrabold text-white">Runtime console</h2>
        </div>
      </div>
      <div className="max-h-[320px] space-y-2 overflow-auto bg-slate-950/70 p-5 font-mono text-xs">
        {logs.map((log) => (
          <div key={log.id} className="grid gap-2 rounded-2xl border border-white/5 bg-white/[0.025] p-3 md:grid-cols-[88px_54px_1fr]">
            <span className="text-slate-500">{log.timestamp}</span>
            <span className={`font-bold uppercase ${levelClass[log.level]}`}>
              {log.level}
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
