"use client";
import { useEffect, useRef } from "react";

export function SignatureArt() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)",
    );
    let frame = 0;
    const reset = () => {
      element.style.setProperty("--word-x", "0px");
      element.style.setProperty("--word-y", "0px");
    };
    const move = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches) return;
      const box = element.getBoundingClientRect();
      const x = Math.max(
        -8,
        Math.min(8, ((event.clientX - box.left) / box.width - 0.5) * 16),
      );
      const y = Math.max(
        -8,
        Math.min(8, ((event.clientY - box.top) / box.height - 0.5) * 16),
      );
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--word-x", x + "px");
        element.style.setProperty("--word-y", y + "px");
      });
    };
    const resetPointer = () => {
      cancelAnimationFrame(frame);
      reset();
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", resetPointer);
    reduce.addEventListener("change", resetPointer);
    fine.addEventListener("change", resetPointer);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", resetPointer);
      reduce.removeEventListener("change", resetPointer);
      fine.removeEventListener("change", resetPointer);
    };
  }, []);
  return (
    <figure
      className="creation-art"
      ref={ref}
      aria-label="Sōzō, the Japanese word for creation. A builder’s mindset."
    >
      <div className="creation-grid" aria-hidden="true" />
      <span className="creation-top eyebrow">A builder’s mindset / 01</span>
      <span className="creation-side" aria-hidden="true">
        From idea to impact
      </span>
      <div className="creation-word" aria-hidden="true">
        <span className="creation-echo" lang="ja">
          創造
        </span>
        <span className="creation-glyph" lang="ja">
          創
        </span>
        <span className="creation-glyph" lang="ja">
          造
        </span>
      </div>
      <svg
        className="creation-path"
        viewBox="0 0 480 440"
        fill="none"
        aria-hidden="true"
      >
        <path className="creation-track" d="M28 290V356H322L354 388H446" />
        <path
          className="creation-trace"
          pathLength="1"
          d="M28 290V356H322L354 388H446"
        />
        <circle cx="28" cy="290" r="3" />
        <circle cx="446" cy="388" r="3" />
        <path
          className="creation-cross"
          d="M27 63H39M33 57V69M428 70H440M434 64V76"
        />
      </svg>
      <span className="creation-seal" aria-hidden="true">
        RH<span>BUILD</span>
      </span>
      <figcaption className="creation-caption">
        <span>
          SŌZŌ <span className="creation-translation">/ creation</span>
        </span>
        <span className="creation-caption-note">Ideas deserve to exist.</span>
      </figcaption>
    </figure>
  );
}
