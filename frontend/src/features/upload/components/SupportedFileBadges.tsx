import { FileArchive, FileImage, FileText } from "lucide-react";

const supportedFiles = [
  { label: "PDF", icon: FileText },
  { label: "DOCX", icon: FileArchive },
  { label: "PNG", icon: FileImage },
  { label: "JPG", icon: FileImage }
];

export function SupportedFileBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {supportedFiles.map((fileType) => (
        <span
          key={fileType.label}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-slate-200"
        >
          <fileType.icon className="h-3.5 w-3.5 text-sky-300" />
          {fileType.label}
        </span>
      ))}
    </div>
  );
}
