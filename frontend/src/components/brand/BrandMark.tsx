import { Check, FileText, Shield } from "lucide-react";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = {
    sm: "h-9 w-9 rounded-2xl",
    md: "h-11 w-11 rounded-2xl",
    lg: "h-16 w-16 rounded-[1.35rem]"
  };
  const shieldClass = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-9 w-9"
  };

  return (
    <span
      className={`relative grid place-items-center bg-gradient-to-br from-sky-500 via-blue-500 to-emerald shadow-glow ${sizeClass[size]}`}
      aria-hidden="true"
    >
      <Shield className={`text-white ${shieldClass[size]}`} strokeWidth={2.4} />
      <Check className="absolute h-3.5 w-3.5 translate-x-1 translate-y-0.5 text-white" strokeWidth={3} />
      <FileText className="absolute h-3 w-3 -translate-x-1.5 translate-y-2 text-white/85" strokeWidth={2.5} />
    </span>
  );
}
