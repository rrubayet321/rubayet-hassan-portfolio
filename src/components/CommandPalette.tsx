"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  IconCamera,
  IconChart,
  IconDownload,
  IconFile,
  IconFolder,
  IconGitHub,
  IconHome,
  IconLinkedIn,
  IconMail,
  IconSearch,
  IconSun,
  IconTerminal,
  IconUser,
} from "@/components/icons";

type Command = {
  id: string;
  label: string;
  hint?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  action: () => void;
  group: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const commands: Command[] = [
    { id: "home", group: "navigate", label: "home", Icon: IconHome, action: () => { router.push("/"); close(); } },
    { id: "projects", group: "navigate", label: "projects", Icon: IconFolder, action: () => { router.push("/projects"); close(); } },
    { id: "analysis", group: "navigate", label: "analysis", Icon: IconChart, action: () => { router.push("/analysis"); close(); } },
    { id: "about", group: "navigate", label: "about", Icon: IconUser, action: () => { router.push("/about"); close(); } },
    { id: "uses", group: "navigate", label: "uses", Icon: IconTerminal, action: () => { router.push("/uses"); close(); } },
    { id: "photos", group: "navigate", label: "photos", Icon: IconCamera, action: () => { router.push("/photos"); close(); } },
    { id: "contact", group: "navigate", label: "contact", Icon: IconMail, action: () => { router.push("/contact"); close(); } },
    { id: "resume", group: "navigate", label: "resume", Icon: IconFile, action: () => { router.push("/resume"); close(); } },
    {
      id: "copy-email",
      group: "actions",
      label: "copy email address",
      hint: "rrubayet321@gmail.com",
      Icon: IconMail,
      action: () => {
        navigator.clipboard.writeText("rrubayet321@gmail.com").catch(() => {});
        close();
      },
    },
    {
      id: "download-resume",
      group: "actions",
      label: "download resume",
      Icon: IconDownload,
      action: () => {
        const a = document.createElement("a");
        a.href = "/Rubayet_Hassan_Resume.pdf";
        a.download = "Rubayet_Hassan_Resume.pdf";
        a.click();
        close();
      },
    },
    {
      id: "toggle-theme",
      group: "actions",
      label: resolvedTheme === "dark" ? "switch to light mode" : "switch to dark mode",
      Icon: IconSun,
      action: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        close();
      },
    },
    {
      id: "github",
      group: "links",
      label: "open github",
      hint: "github.com/rrubayet321",
      Icon: IconGitHub,
      action: () => { window.open("https://github.com/rrubayet321", "_blank", "noopener"); close(); },
    },
    {
      id: "linkedin",
      group: "links",
      label: "open linkedin",
      hint: "linkedin.com/in/rubayet-hassan2",
      Icon: IconLinkedIn,
      action: () => { window.open("https://www.linkedin.com/in/rubayet-hassan2", "_blank", "noopener"); close(); },
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          (c.hint ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpenEvent);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((v) => Math.min(v + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter") {
      filtered[selected]?.action();
    }
  }

  let itemIndex = 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          />

          {/* Panel */}
          <motion.div
            className="fixed left-1/2 top-[20vh] z-[210] w-full max-w-[520px] -translate-x-1/2 overflow-hidden rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--bg-border)] px-4 py-3">
              <IconSearch className="shrink-0 text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command or search..."
                className="flex-1 bg-transparent font-mono text-[var(--text-small)] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <kbd className="hidden rounded border border-[var(--bg-border)] bg-[var(--bg-surface)] px-1.5 py-0.5 font-mono text-[0.65rem] text-[var(--text-muted)] sm:block">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[360px] overflow-y-auto overscroll-contain py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-8 text-center font-mono text-[var(--text-small)] text-[var(--text-muted)]">
                  no commands match &ldquo;{query}&rdquo;
                </p>
              )}
              {groups.map((group) => {
                const groupItems = filtered.filter((c) => c.group === group);
                return (
                  <div key={group}>
                    <p className="px-4 pb-1 pt-3 font-mono text-[0.65rem] uppercase tracking-widest text-[var(--text-muted)]">
                      {group}
                    </p>
                    {groupItems.map((cmd) => {
                      const idx = itemIndex++;
                      const isActive = idx === selected;
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75 ${
                            isActive
                              ? "bg-[var(--bg-border)] text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]"
                          }`}
                          onMouseEnter={() => setSelected(idx)}
                          onClick={cmd.action}
                        >
                          <cmd.Icon className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                          <span className="flex-1 font-sans text-[var(--text-small)]">
                            {cmd.label}
                          </span>
                          {cmd.hint && (
                            <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                              {cmd.hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-[var(--bg-border)] px-4 py-2">
              <span className="font-mono text-[0.62rem] text-[var(--text-muted)]">
                ↑↓ navigate · enter select · esc close
              </span>
              <span className="ml-auto font-mono text-[0.62rem] text-[var(--text-muted)]">
                ⌘K
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
