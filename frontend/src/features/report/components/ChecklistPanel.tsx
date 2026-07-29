import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import type { ChecklistItem } from "../types";

export function ChecklistPanel({ checklist }: { checklist: ChecklistItem[] }) {
  return (
    <div className="grid gap-3">
      {checklist.map((item, index) => (
        <motion.div
          key={item.id}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.28, delay: index * 0.04 }}
          whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.055)" }}
        >
          {item.completed ? (
            <motion.span
              initial={{ scale: 0.6, rotate: -18 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 20 }}
            >
              <CheckCircle2 className="h-5 w-5 text-emerald" />
            </motion.span>
          ) : (
            <Circle className="h-5 w-5 text-slate-500" />
          )}
          <span
            className={
              item.completed
                ? "font-semibold text-white"
                : "font-semibold text-slate-300"
            }
          >
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
