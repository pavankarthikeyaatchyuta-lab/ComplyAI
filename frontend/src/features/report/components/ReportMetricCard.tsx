import type { LucideIcon } from "lucide-react";
import { TiltCard } from "../../../components/motion/TiltCard";

export function ReportMetricCard({
  label,
  value,
  tone,
  icon: Icon
}: {
  label: string;
  value: string;
  tone: "sky" | "emerald" | "amber" | "red";
  icon: LucideIcon;
}) {
  const toneClass = {
    sky: "text-sky-300 bg-sky-400/10 border-sky-300/25",
    emerald: "text-emerald bg-emerald/10 border-emerald/25",
    amber: "text-amber bg-amber/10 border-amber/25",
    red: "text-red-300 bg-red-500/10 border-red-400/25"
  };

  return (
    <TiltCard className="glass-panel rounded-3xl p-5" cursor="report">
      <div
        className={`mb-5 grid h-11 w-11 place-items-center rounded-2xl border ${toneClass[tone]}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-white">{value}</p>
    </TiltCard>
  );
}
