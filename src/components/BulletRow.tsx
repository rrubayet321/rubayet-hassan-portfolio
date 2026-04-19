"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function BulletRow({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.28,
        ease: "easeOut",
        delay: reduce ? 0 : delay,
      }}
      className="flex gap-2"
    >
      <span className="shrink-0 font-mono text-[var(--accent)]">↳</span>
      <div className="min-w-0 flex-1 font-sans text-[var(--text-body)] font-normal leading-[1.65] text-[var(--text-secondary)]">
        {children}
      </div>
    </motion.div>
  );
}
