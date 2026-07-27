import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, FileUp, FolderOpen } from "lucide-react";
import { SupportedFileBadges } from "./SupportedFileBadges";

export function FileDropzone({
  onFileSelected
}: {
  onFileSelected: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      onFileSelected(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  return (
    <motion.div
      data-cursor="upload"
      className={`relative overflow-hidden rounded-[2rem] border border-dashed p-8 text-center transition ${
        dragging
          ? "border-sky-300 bg-sky-400/10"
          : "border-white/18 bg-white/[0.045]"
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      whileHover={{ y: -3 }}
    >
      {dragging && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-sky-400/12 to-emerald/12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
      <div className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-[1.7rem] bg-gradient-to-br from-sky-500 to-emerald shadow-glow">
        {dragging ? (
          <Cloud className="h-9 w-9 text-white" />
        ) : (
          <FileUp className="h-9 w-9 text-white" />
        )}
      </div>
      <h2 className="relative z-10 mt-6 text-2xl font-extrabold text-white">
        Drop your GST document here
      </h2>
      <p className="relative z-10 mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300">
        Upload GST notices, invoices, or tax reminders. ComplyAI validates the
        file before starting OCR and extraction.
      </p>
      <div className="relative z-10 mt-6 flex justify-center">
        <SupportedFileBadges />
      </div>
      <button
        className="relative z-10 mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-navy transition hover:-translate-y-0.5 hover:bg-slate-100"
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <FolderOpen className="h-4 w-4" />
        Browse files
      </button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept=".pdf,.docx,.png,.jpg,.jpeg"
        onChange={handleChange}
      />
    </motion.div>
  );
}
