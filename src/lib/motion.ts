import type { CSSProperties } from "react";

export const motionEase = [0.22, 1, 0.36, 1] as const;
export const motionTiming = {
  entrance: 0.6,
  page: 0.2,
  interaction: 0.18,
  stagger: 0.07,
} as const;
export const motionCss = {
  "--ease": "cubic-bezier(" + motionEase.join(",") + ")",
  "--motion-interaction": motionTiming.interaction + "s",
} as CSSProperties;
