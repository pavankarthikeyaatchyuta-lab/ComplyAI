import { motion } from "framer-motion";

export function WorkflowProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-emerald"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <motion.span
          className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/35 blur-sm"
          animate={{ x: ["0%", "420%"] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}
