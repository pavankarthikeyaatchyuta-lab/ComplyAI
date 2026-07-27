import { Braces } from "lucide-react";

export function JsonViewer({
  title,
  data
}: {
  title: string;
  data: Record<string, unknown>;
}) {
  return (
    <section className="glass-panel overflow-hidden rounded-[1.75rem]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <Braces className="h-5 w-5 text-sky-300" />
          <h2 className="font-extrabold text-white">{title}</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-bold text-slate-300">
          JSON
        </span>
      </div>
      <pre className="max-h-[360px] overflow-auto bg-slate-950/70 p-5 text-xs leading-6 text-slate-200">
        {JSON.stringify(data, null, 2)}
      </pre>
    </section>
  );
}
