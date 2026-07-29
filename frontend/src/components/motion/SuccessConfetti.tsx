import { motion } from "framer-motion";

const colors = ["#10B981", "#2E90FA", "#F59E0B", "#F8FAFC"];

export function SuccessConfetti({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {Array.from({ length: 22 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-2 w-1 rounded-full"
          style={{
            left: `${12 + ((index * 17) % 76)}%`,
            top: "34%",
            background: colors[index % colors.length]
          }}
          initial={{ opacity: 0, y: 0, rotate: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -28 - (index % 5) * 8, 72],
            x: [0, (index % 2 === 0 ? 1 : -1) * (18 + (index % 6) * 7)],
            rotate: 180 + index * 24,
            scale: [0.7, 1, 0.8]
          }}
          transition={{ duration: 1.15, delay: index * 0.018, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
