"use client";
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 35,
    mass: 0.2,
  });
  const reduced = useReducedMotion();
  return reduced ? null : (
    <m.div
      className="header-progress"
      aria-hidden="true"
      style={{ scaleX: progress }}
    />
  );
}
