import { motion } from "framer-motion";
import type { WorkflowStage } from "../types";
import { WorkflowStageCard } from "./WorkflowStageCard";

export function WorkflowTimeline({ stages }: { stages: WorkflowStage[] }) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-white/12 md:block" />
      <motion.div
        className="absolute left-6 top-8 hidden w-px bg-gradient-to-b from-sky-400 to-emerald md:block"
        initial={{ height: 0 }}
        animate={{ height: "58%" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <div className="space-y-5">
        {stages.map((stage, index) => (
          <div key={stage.id} className="relative md:pl-16">
            <motion.div
              className="absolute left-[17px] top-8 hidden h-5 w-5 rounded-full border border-white/20 bg-navy md:block"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
            >
              <span
                className={`absolute inset-1 rounded-full ${
                  stage.status === "completed"
                    ? "bg-emerald"
                    : stage.status === "running"
                      ? "bg-sky-300"
                      : "bg-slate-600"
                }`}
              />
            </motion.div>
            <WorkflowStageCard stage={stage} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
