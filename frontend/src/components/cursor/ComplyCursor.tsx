import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { AlertTriangle, FileText, ShieldCheck, UploadCloud } from "lucide-react";

type CursorMode = "default" | "button" | "upload" | "report" | "agent" | "review" | "error" | "hidden";

type TrailParticle = {
  id: number;
  x: number;
  y: number;
};

function CursorIcon({ mode }: { mode: CursorMode }) {
  if (mode === "upload") return <UploadCloud className="h-3.5 w-3.5" />;
  if (mode === "report") return <FileText className="h-3.5 w-3.5" />;
  if (mode === "error") return <AlertTriangle className="h-3.5 w-3.5" />;
  if (mode === "agent") return <ShieldCheck className="h-3.5 w-3.5" />;
  return null;
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
        size: 26,
        ring: "rgba(125, 211, 252, 0.42)",
        core: "linear-gradient(135deg, #2E90FA, #10B981)",
        glow: "0 0 18px rgba(46, 144, 250, 0.24)"
      },
      button: {
        size: 44,
        ring: "rgba(125, 211, 252, 0.5)",
        core: "linear-gradient(135deg, #155EEF, #10B981)",
        glow: "0 0 24px rgba(46, 144, 250, 0.3)"
      },
      upload: {
        size: 48,
        ring: "rgba(46, 144, 250, 0.52)",
        core: "linear-gradient(135deg, #2E90FA, #38BDF8)",
        glow: "0 0 26px rgba(56, 189, 248, 0.28)"
      },
      report: {
        size: 46,
        ring: "rgba(203, 213, 225, 0.42)",
        core: "linear-gradient(135deg, #E2E8F0, #2E90FA)",
        glow: "0 0 22px rgba(226, 232, 240, 0.2)"
      },
      agent: {
        size: 46,
        ring: "rgba(16, 185, 129, 0.5)",
        core: "linear-gradient(135deg, #10B981, #2E90FA)",
        glow: "0 0 22px rgba(16, 185, 129, 0.24)"
      },
      review: {
        size: 46,
        ring: "rgba(16, 185, 129, 0.52)",
        core: "linear-gradient(135deg, #10B981, #34D399)",
        glow: "0 0 22px rgba(16, 185, 129, 0.24)"
      },
      error: {
        size: 46,
        ring: "rgba(245, 158, 11, 0.5)",
        core: "linear-gradient(135deg, #F59E0B, #EF4444)",
        glow: "0 0 22px rgba(245, 158, 11, 0.22)"
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

      setMode((current) => (current === nextMode ? current : nextMode));

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
          className="absolute h-1.5 w-1.5 rounded-full bg-sky-300/25 blur-[0.5px]"
          style={{ left: particle.x - 3, top: particle.y - 3 }}
          initial={{ opacity: 0.35, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: 8 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
        />
      ))}

      <motion.div
        className="absolute backdrop-blur-sm"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: config.size,
          height: config.size,
          borderColor: config.ring,
          boxShadow: config.glow,
          background: "rgba(7, 26, 47, 0.18)"
        }}
        animate={{
          scale: pressed ? 0.92 : 1,
          opacity: mode === "hidden" ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{
            width: config.size,
            height: config.size
          }}
          animate={{
            rotate: mode === "button" ? -6 : mode === "upload" ? 8 : 0,
            scale: mode === "default" ? [1, 1.04, 1] : 1
          }}
          transition={{
            duration: 1.5,
            repeat: mode === "default" ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 block origin-center rounded-[2px] border border-white/70 bg-white/85 shadow-[0_0_10px_rgba(255,255,255,0.32)]"
            style={{
              width: Math.max(11, config.size * 0.26),
              height: Math.max(11, config.size * 0.26),
              transform: "translate(-72%, -78%) rotate(45deg)",
              clipPath: "polygon(0 0, 100% 20%, 72% 100%, 42% 62%, 0 100%)"
            }}
          />
          <span
            className="absolute left-1/2 top-1/2 block rounded-full bg-sky-300/70"
            style={{
              width: Math.max(4, config.size * 0.08),
              height: Math.max(4, config.size * 0.08),
              transform: "translate(-50%, -50%)"
            }}
          />
          {(mode === "upload" || mode === "report" || mode === "agent" || mode === "review" || mode === "error") && (
            <span className="absolute -right-2 -bottom-1 rounded-full border border-white/10 bg-navy/80 p-1.5 text-white shadow-glass">
              <CursorIcon mode={mode} />
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
