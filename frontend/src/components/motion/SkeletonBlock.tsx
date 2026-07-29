import { motion } from "framer-motion";

export function SkeletonBlock({
  className = ""
}: {
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-full bg-white/10 ${className}`}
    >
      <motion.span
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["0%", "300%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
