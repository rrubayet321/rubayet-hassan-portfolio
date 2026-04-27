"use client";

import { cn } from "@/lib/utils";

/**
 * Tech stack as body-like text: sans, same scale as small copy, middot-separated.
 * Reads as a sentence fragment, not boxed chips.
 */
export function TechTagList({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  if (tags.length === 0) return null;
  return (
    <p
      className={cn(
        "m-0 max-w-prose font-sans [font-size:var(--text-small)] font-normal leading-[1.65] tracking-normal text-[var(--text-muted)]",
        className,
      )}
    >
      {tags.join(" · ")}
    </p>
  );
}
