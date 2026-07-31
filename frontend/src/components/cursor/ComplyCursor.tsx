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
        size: 34,
        ring: "rgba(255, 255, 255, 0.58)",
        core: "linear-gradient(135deg, #FFFFFF, #DCEBFF)",
        glow: "0 0 22px rgba(56, 189, 248, 0.24)"
      },
      button: {
        size: 46,
        ring: "rgba(125, 211, 252, 0.72)",
        core: "linear-gradient(135deg, #FFFFFF, #9DD8FF)",
        glow: "0 0 28px rgba(46, 144, 250, 0.34)"
      },
      upload: {
        size: 48,
        ring: "rgba(46, 144, 250, 0.7)",
        core: "linear-gradient(135deg, #FFFFFF, #7DD3FC)",
        glow: "0 0 26px rgba(56, 189, 248, 0.28)"
      },
      report: {
        size: 46,
        ring: "rgba(203, 213, 225, 0.72)",
        core: "linear-gradient(135deg, #FFFFFF, #E2E8F0)",
        glow: "0 0 22px rgba(226, 232, 240, 0.24)"
      },
      agent: {
        size: 46,
        ring: "rgba(16, 185, 129, 0.72)",
        core: "linear-gradient(135deg, #FFFFFF, #A7F3D0)",
        glow: "0 0 22px rgba(16, 185, 129, 0.28)"
      },
      review: {
        size: 46,
        ring: "rgba(16, 185, 129, 0.72)",
        core: "linear-gradient(135deg, #FFFFFF, #6EE7B7)",
        glow: "0 0 22px rgba(16, 185, 129, 0.28)"
      },
      error: {
        size: 46,
        ring: "rgba(245, 158, 11, 0.72)",
        core: "linear-gradient(135deg, #FFFFFF, #FDE68A)",
        glow: "0 0 22px rgba(245, 158, 11, 0.28)"
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
        className="absolute rounded-full border border-white/25 backdrop-blur-sm"
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
          <svg
            className="absolute left-1/2 top-1/2 drop-shadow-[0_0_10px_rgba(255,255,255,0.32)]"
            viewBox="0 0 100 100"
            aria-hidden="true"
            style={{
              width: Math.max(42, config.size * 1.15),
              height: Math.max(42, config.size * 1.15),
              transform: "translate(-52%, -54%) rotate(38deg) scaleX(-1)",
              overflow: "visible"
            }}
          >
            <defs>
              <linearGradient id="swordBlade" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="55%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="swordGuard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>

            <path
              d="M50 8 L60 18 L57 48 L43 48 L40 18 Z"
              fill="url(#swordBlade)"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="2"
            />
            <rect x="44" y="48" width="12" height="26" rx="4" fill="url(#swordGuard)" />
            <rect x="30" y="56" width="40" height="7" rx="3.5" fill="#e2e8f0" />
            <path d="M50 74 L56 89 H44 Z" fill="#cbd5e1" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
            <circle cx="50" cy="52" r="3.2" fill="#0ea5e9" />
          </svg>
          {(mode === "upload" || mode === "report" || mode === "agent" || mode === "review" || mode === "error") && (
            <span className="absolute -right-2 -bottom-1 rounded-full border border-white/10 bg-navy/90 p-1.5 text-white shadow-glass">
              <CursorIcon mode={mode} />
            </span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
