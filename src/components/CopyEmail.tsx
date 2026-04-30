"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IconCheck, IconCopy } from "@/components/icons";
import { profile } from "@/lib/profile";

const EMAIL = profile.email;

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* Clipboard blocked — graceful fallback: do nothing */
    }
  }

  return (
    <div className="relative inline-flex items-center gap-3">
      <span className="font-mono text-[var(--text-small)] text-[var(--text-secondary)]">
        {EMAIL}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email address"
        title="Copy email"
        className="flex h-8 w-8 items-center justify-center rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] transition-[color,border-color] duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              <IconCheck className="text-[var(--mark-green-fg)]" />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              <IconCopy />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Toast */}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-[calc(100%+8px)] whitespace-nowrap font-mono text-[0.65rem] text-[var(--mark-green-fg)]"
          >
            copied to clipboard
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
