"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Variant = "pill" | "chrome";

export function ThemeToggle({
  className = "",
  variant = "chrome",
}: {
  className?: string;
  variant?: Variant;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  if (variant === "pill") {
    return (
      <button
        type="button"
        disabled={!mounted}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={`relative flex h-7 w-12 items-center rounded-full border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-0.5 transition-colors duration-300 disabled:opacity-40 hover:border-[var(--accent)] ${className}`}
      >
        <motion.span
          className="relative z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-base)] shadow-sm"
          animate={{ x: isDark ? 20 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 35 }}
        >
          {mounted &&
            (isDark ? <MoonIcon /> : <SunIcon small />)}
        </motion.span>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-1.5" aria-hidden>
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" className="opacity-30">
            <circle cx="8" cy="8" r="3" fill="var(--text-muted)" />
            <g stroke="var(--text-muted)" strokeWidth="1.6" strokeLinecap="round">
              <line x1="8" y1="1.5" x2="8" y2="3" />
              <line x1="8" y1="13" x2="8" y2="14.5" />
              <line x1="1.5" y1="8" x2="3" y2="8" />
              <line x1="13" y1="8" x2="14.5" y2="8" />
            </g>
          </svg>
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" className="opacity-30">
            <path d="M13.5 10.5A6 6 0 015.5 2.5a6.5 6.5 0 108 8z" fill="var(--text-muted)" />
          </svg>
        </span>
      </button>
    );
  }

  /* Shayaan-style: borderless sun / moon, top-right chrome */
  return (
    <button
      type="button"
      disabled={!mounted}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors duration-200 hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] disabled:opacity-40 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: reduce ? 0 : 0.15 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function SunIcon({ small }: { small?: boolean }) {
  const s = small ? 11 : 18;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-primary)]" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[var(--text-primary)] opacity-80">
        <line x1="12" y1="2" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="22" />
        <line x1="4" y1="12" x2="2" y2="12" />
        <line x1="22" y1="12" x2="20" y2="12" />
        <line x1="5" y1="5" x2="6.5" y2="6.5" />
        <line x1="19" y1="19" x2="17.5" y2="17.5" />
        <line x1="19" y1="5" x2="17.5" y2="6.5" />
        <line x1="5" y1="19" x2="6.5" y2="17.5" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A7.5 7.5 0 1111 3.2a6 6 0 0010 11.3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="text-[var(--text-primary)]"
      />
    </svg>
  );
}
