"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function BulletRow({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotionSafe();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.28,
        ease: "easeOut",
        delay: reduce ? 0 : delay,
      }}
      className="group relative flex gap-2 rounded-lg px-2.5 py-2 -mx-2.5 transition-colors duration-150 hover:bg-[var(--bg-surface)] md:px-3 md:py-2.5 md:-mx-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="shrink-0 font-mono text-[var(--accent)]"
        animate={hovered && !reduce ? { x: 3 } : { x: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        ↳
      </motion.span>
      <div className="min-w-0 flex-1 font-sans text-[var(--text-body)] font-normal leading-[1.5] text-[var(--text-secondary)] transition-colors duration-150 group-hover:text-[var(--text-primary)] md:leading-[1.65]">
        {children}
      </div>
    </motion.div>
  );
}
