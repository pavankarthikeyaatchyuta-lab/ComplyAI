import { Download, FileJson2, Printer } from "lucide-react";
import { RippleButton } from "../../../components/motion/RippleButton";
import { complianceReport } from "../data";

export function ReportActionBar() {
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(complianceReport, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "complyai-compliance-report.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => window.print();

  const actions = [
    { label: "Download PDF", icon: Download, onClick: handlePrint },
    { label: "Export JSON", icon: FileJson2, onClick: handleExportJson },
    { label: "Print", icon: Printer, onClick: handlePrint }
  ];

  return (
    <div className="glass-panel sticky bottom-5 z-20 flex flex-col gap-3 rounded-3xl p-3 sm:flex-row">
      {actions.map((action, index) => (
        <RippleButton
          data-cursor="button"
          key={action.label}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 ${
            index === 0
              ? "bg-gradient-to-r from-sky-500 to-emerald text-white shadow-glow"
              : "border border-white/12 bg-white/[0.06] text-white hover:bg-white/[0.1]"
          }`}
          type="button"
          onClick={action.onClick}
        >
          <action.icon className="h-4 w-4" />
          {action.label}
        </RippleButton>
      ))}
    </div>
  );
}
