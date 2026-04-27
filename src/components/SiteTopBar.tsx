"use client";

import { IconSearch } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";

/**
 * Shayaan-style utilities: borderless theme sun/moon + command palette affordance, top-right on md+.
 */
export function SiteTopBar() {
  return (
    <div
      className="pointer-events-none fixed right-0 top-0 z-[70] hidden items-center gap-1 pr-4 pt-3 md:flex md:pr-8 md:pt-4"
      aria-label="Site utilities"
    >
      <div className="pointer-events-auto flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new Event("command-palette:open"));
          }}
          className="hidden items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-surface)] hover:text-[var(--text-secondary)] md:flex"
          aria-label="Open command palette"
        >
          <IconSearch className="h-3.5 w-3.5" />
          <span className="select-none">⌘K</span>
        </button>
        <ThemeToggle variant="chrome" />
      </div>
    </div>
  );
}
