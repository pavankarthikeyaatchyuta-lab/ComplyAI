import { motion } from "framer-motion";

export function ProgressRing({ progress }: { progress: number }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative grid h-32 w-32 place-items-center">
      <svg className="-rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="10"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="url(#uploadGradient)"
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="uploadGradient" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#2E90FA" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute text-2xl font-extrabold text-white">
        {progress}%
      </span>
    </div>
  );
}
