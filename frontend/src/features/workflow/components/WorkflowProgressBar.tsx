import { motion } from "framer-motion";

export function WorkflowProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
    </div>
  );
}
