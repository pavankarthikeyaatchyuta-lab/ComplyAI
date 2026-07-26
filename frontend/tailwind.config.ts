import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#071A2F",
        "navy-soft": "#0B2A4A",
        emerald: "#10B981",
        amber: "#F59E0B"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.34)",
        glow: "0 0 48px rgba(46, 144, 250, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;
