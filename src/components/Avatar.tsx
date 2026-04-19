"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function Avatar() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex flex-col items-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex h-[68px] w-[68px] items-center justify-center rounded-lg border border-[var(--bg-border)] bg-[var(--bg-elevated)] font-mono text-base text-[var(--accent)] transition-[border-color] duration-[180ms] ease-out hover:border-[var(--accent)]"
        aria-hidden
      >
        RH
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-10 max-w-[280px] whitespace-nowrap font-mono text-[0.6rem] text-[var(--text-muted)]"
          >
            23.8103° N, 90.4125° E · dhaka, bangladesh
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
