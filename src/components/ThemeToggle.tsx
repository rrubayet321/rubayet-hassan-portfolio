"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

/** Split-disk silhouette: rotates with resolved theme; all state from `next-themes`. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const clipId = useId().replace(/:/g, "");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      disabled={!mounted}
      whileTap={reduce ? undefined : { scale: 0.94 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-[var(--accent)] hover:shadow-md disabled:opacity-60 ${className}`}
      aria-label={
        !mounted
          ? "Toggle color theme"
          : isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="h-[22px] w-[22px]"
        aria-hidden
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 28 }
        }
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx="12" cy="12" r="9" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="3"
            y="3"
            width="9"
            height="18"
            fill="var(--text-primary)"
            opacity={0.92}
          />
          <rect
            x="12"
            y="3"
            width="9"
            height="18"
            fill="var(--text-muted)"
            opacity={0.45}
          />
        </g>
        <circle
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="var(--bg-border)"
          strokeWidth="1.1"
          opacity={0.9}
        />
      </motion.svg>
    </motion.button>
  );
}
