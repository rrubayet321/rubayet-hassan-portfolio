"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

const shortcuts = [
  { keys: "⌘ K", desc: "open command palette" },
  { keys: "?", desc: "show keyboard shortcuts" },
  { keys: "↑ ↓", desc: "navigate palette" },
  { keys: "↵", desc: "select command" },
  { keys: "esc", desc: "close anything" },
];

export function KeyboardHints() {
  const [hintsOpen, setHintsOpen] = useState(false);
  const [konamiToast, setKonamiToast] = useState(false);

  useEffect(() => {
    const seq: string[] = [];

    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      const isInput = tag === "INPUT" || tag === "TEXTAREA";

      /* Konami — works everywhere */
      seq.push(e.key);
      if (seq.length > KONAMI.length) seq.shift();
      if (seq.join(",") === KONAMI.join(",")) {
        setKonamiToast(true);
        seq.length = 0;
      }

      /* ? hint overlay — only when not typing */
      if (e.key === "?" && !isInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setHintsOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setHintsOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!konamiToast) return;
    const id = setTimeout(() => setKonamiToast(false), 3500);
    return () => clearTimeout(id);
  }, [konamiToast]);

  return (
    <>
      {/* Keyboard hints overlay */}
      <AnimatePresence>
        {hintsOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[190] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setHintsOpen(false)}
            />
            <motion.div
              className="fixed left-1/2 top-[25vh] z-[195] w-full max-w-[340px] -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-6 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <p className="mb-5 font-mono text-[0.65rem] uppercase tracking-widest text-[var(--text-muted)]">
                keyboard shortcuts
              </p>
              <div className="flex flex-col gap-3">
                {shortcuts.map((s) => (
                  <div key={s.keys} className="flex items-center justify-between gap-4">
                    <span className="font-sans text-[var(--text-small)] text-[var(--text-secondary)]">
                      {s.desc}
                    </span>
                    <kbd className="shrink-0 rounded border border-[var(--bg-border)] bg-[var(--bg-surface)] px-2 py-0.5 font-mono text-[0.65rem] text-[var(--text-muted)]">
                      {s.keys}
                    </kbd>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-mono text-[0.62rem] text-[var(--text-muted)]">
                press ? or esc to close
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Konami toast */}
      <AnimatePresence>
        {konamiToast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 z-[300] max-w-[90vw] -translate-x-1/2 rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-5 py-2.5 font-mono text-[var(--text-caption)] text-[var(--accent)]"
          >
            ok, you&apos;re a builder. respect.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
