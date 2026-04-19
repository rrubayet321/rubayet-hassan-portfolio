"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Framer's `useReducedMotion()` is not reliable during SSR (underlying preference
 * is `null` in Node). Using it directly in `initial={…}` causes server HTML to
 * disagree with the client's first paint when `prefers-reduced-motion` is on,
 * which triggers a hydration error on hard refresh. Until the client mounts we
 * assume reduced motion is off so markup matches; then we sync to the real value.
 */
export function useReducedMotionSafe(): boolean {
  const fromMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;
  return fromMotion === true;
}
