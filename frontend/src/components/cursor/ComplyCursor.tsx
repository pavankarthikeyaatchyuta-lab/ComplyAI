import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Check, FileText, ShieldCheck, UploadCloud } from "lucide-react";

type CursorMode = "default" | "button" | "upload" | "report" | "agent" | "hidden";

type TrailParticle = {
  id: number;
  x: number;
  y: number;
};

const cursorLabels: Record<CursorMode, string> = {
  default: "Verify",
  button: "Open",
  upload: "Upload",
  report: "Report",
  agent: "Agent",
  hidden: ""
};

function CursorIcon({ mode }: { mode: CursorMode }) {
  if (mode === "upload") return <UploadCloud className="h-4 w-4" />;
  if (mode === "report") return <FileText className="h-4 w-4" />;
  if (mode === "agent") return <ShieldCheck className="h-4 w-4" />;
  return <Check className="h-3.5 w-3.5" />;
}

export function ComplyCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const springX = useSpring(x, { stiffness: 620, damping: 42, mass: 0.42 });
  const springY = useSpring(y, { stiffness: 620, damping: 42, mass: 0.42 });

  const config = useMemo(() => {
    const configs = {
      default: {
        size: 34,
        ring: "rgba(46, 144, 250, 0.42)",
        core: "linear-gradient(135deg, #2E90FA, #10B981)",
        glow: "0 0 28px rgba(46, 144, 250, 0.34)"
      },
      button: {
        size: 58,
        ring: "rgba(125, 211, 252, 0.62)",
        core: "linear-gradient(135deg, #155EEF, #10B981)",
        glow: "0 0 42px rgba(46, 144, 250, 0.52)"
      },
      upload: {
        size: 66,
        ring: "rgba(46, 144, 250, 0.72)",
        core: "linear-gradient(135deg, #2E90FA, #38BDF8)",
        glow: "0 0 46px rgba(56, 189, 248, 0.5)"
      },
      report: {
        size: 62,
        ring: "rgba(203, 213, 225, 0.5)",
        core: "linear-gradient(135deg, #E2E8F0, #2E90FA)",
        glow: "0 0 42px rgba(226, 232, 240, 0.26)"
      },
      agent: {
        size: 62,
        ring: "rgba(16, 185, 129, 0.72)",
        core: "linear-gradient(135deg, #10B981, #2E90FA)",
        glow: "0 0 46px rgba(16, 185, 129, 0.48)"
      },
      hidden: {
        size: 0,
        ring: "transparent",
        core: "transparent",
        glow: "none"
      }
    };

    return configs[mode];
  }, [mode]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let particleId = 0;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const interactiveTarget = target?.closest<HTMLElement>("a,button,input,textarea,select");
      const nextMode = (cursorTarget?.dataset.cursor as CursorMode | undefined)
        ?? (interactiveTarget ? "button" : "default");

      setMode(nextMode);

      frame += 1;
      if (frame % 3 === 0) {
        particleId += 1;
        const particle = {
          id: particleId,
          x: event.clientX,
          y: event.clientY
        };

        setTrail((current) => [...current.slice(-7), particle]);
      }
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setMode("hidden");
    const handleEnter = () => setMode("default");

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="comply-custom-cursor-ready pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {trail.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-2 w-2 rounded-full bg-sky-300/55 blur-[1px]"
          style={{ left: particle.x - 4, top: particle.y - 4 }}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1, y: 14 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute grid place-items-center rounded-full border backdrop-blur-sm"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: config.size,
          height: config.size,
          borderColor: config.ring,
          boxShadow: config.glow,
          background: "rgba(7, 26, 47, 0.28)"
        }}
        animate={{
          scale: pressed ? 0.82 : 1,
          opacity: mode === "hidden" ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="grid place-items-center rounded-full text-white"
          style={{
            width: Math.max(18, config.size * 0.42),
            height: Math.max(18, config.size * 0.42),
            background: config.core
          }}
          animate={{
            scale: mode === "default" ? [1, 1.14, 1] : 1
          }}
          transition={{
            duration: 1.25,
            repeat: mode === "default" ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <CursorIcon mode={mode} />
        </motion.div>

        {mode !== "default" && mode !== "hidden" && (
          <motion.span
            className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-navy/85 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-100 shadow-glass"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {cursorLabels[mode]}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
