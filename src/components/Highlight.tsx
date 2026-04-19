import type { ReactNode } from "react";

/** Semantic: purple = cs, blue = school, green = bottle, maroon = accent, orange = links/orgs */
const markClass = {
  a: "bg-[var(--mark-a-bg)] text-[var(--mark-a-fg)]",
  b: "bg-[var(--mark-b-bg)] text-[var(--mark-b-fg)]",
  c: "bg-[var(--mark-c-bg)] text-[var(--mark-c-fg)]",
  d: "bg-[var(--mark-d-bg)] text-[var(--mark-d-fg)]",
  e: "bg-[var(--mark-e-bg)] text-[var(--mark-e-fg)]",
  purple: "bg-[var(--mark-purple-bg)] text-[var(--mark-purple-fg)]",
  blue: "bg-[var(--mark-blue-bg)] text-[var(--mark-blue-fg)]",
  green: "bg-[var(--mark-green-bg)] text-[var(--mark-green-fg)]",
  maroon: "bg-[var(--mark-maroon-bg)] text-[var(--mark-maroon-fg)]",
  orange: "bg-[var(--mark-orange-bg)] text-[var(--mark-orange-fg)]",
} as const;

export type HighlightVariant = keyof typeof markClass;

export function Highlight({
  variant = "purple",
  children,
  className = "",
}: {
  variant?: HighlightVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 font-medium ${markClass[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
