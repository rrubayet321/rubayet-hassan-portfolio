"use client";

import { cn } from "@/lib/utils";

export function TechChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-[var(--chip-border)] bg-[var(--chip-bg)] px-2 py-0.5 font-mono text-[var(--text-label)] tracking-[0.06em] text-[var(--chip-text)] transition-[border-color,color] duration-[120ms] hover:border-[var(--accent)] hover:text-[var(--accent)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
