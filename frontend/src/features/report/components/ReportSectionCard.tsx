import type { ReactNode } from "react";

export function ReportSectionCard({
  title,
  eyebrow,
  children,
  action
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="glass-panel rounded-[1.75rem] p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-1 text-2xl font-extrabold text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
