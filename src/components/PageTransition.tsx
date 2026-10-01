"use client";
import { m, useAnimationControls } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motionTiming } from "@/lib/motion";
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const controls = useAnimationControls();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      controls.set({ opacity: 1 });
      return;
    }
    controls.set({ opacity: 0.75 });
    void controls.start({
      opacity: 1,
      transition: { duration: motionTiming.page },
    });
    return () => controls.stop();
  }, [pathname, controls]);
  return (
    <m.div initial={false} animate={controls}>
      {children}
    </m.div>
  );
}
