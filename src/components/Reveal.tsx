"use client";
import { m, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";
import { motionEase, motionTiming } from "@/lib/motion";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver | undefined;
    const show = () => {
      element.dataset.revealed = "true";
      void controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: motionTiming.entrance,
          ease: [...motionEase],
          delay: Math.min(delay, 0.21),
        },
      });
    };
    // SSR stays visible. Animate only after hydration, with an observer fallback.
    if (element.getBoundingClientRect().top < window.innerHeight) {
      controls.set({ opacity: 0.65, y: 10 });
      show();
    } else {
      controls.set({ opacity: 0, y: 14 });
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            show();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px 24px 0px" },
      );
      observer.observe(element);
    }
    const onPreference = () => {
      observer?.disconnect();
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
    };
    preference.addEventListener("change", onPreference);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", onPreference);
      controls.stop();
    };
  }, [controls, delay]);
  return (
    <m.div ref={ref} initial={false} animate={controls} className={className}>
      {children}
    </m.div>
  );
}
