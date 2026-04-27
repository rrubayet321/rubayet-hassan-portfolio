"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconCamera,
  IconChart,
  IconFile,
  IconFolder,
  IconHome,
  IconMail,
  IconMenu,
  IconTerminal,
  IconUser,
  IconX,
} from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "home", Icon: IconHome },
  { href: "/projects", label: "projects", Icon: IconFolder },
  { href: "/analysis", label: "analysis", Icon: IconChart },
  { href: "/about", label: "about", Icon: IconUser },
  { href: "/uses", label: "uses", Icon: IconTerminal },
  { href: "/photos", label: "photos", Icon: IconCamera },
  { href: "/contact", label: "contact", Icon: IconMail },
  { href: "/resume", label: "resume", Icon: IconFile },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (clickTimer.current) clearTimeout(clickTimer.current); };
  }, []);

  const onMonogramClick = useCallback(() => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      setToast(true);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const NavColumn = ({
    onNavigate,
    layoutBar,
    isMobileDrawer,
    onCloseDrawer,
  }: {
    onNavigate?: () => void;
    layoutBar: boolean;
    isMobileDrawer?: boolean;
    onCloseDrawer?: () => void;
  }) => (
    <div
      className={
        isMobileDrawer
          ? "flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-y-auto"
          : "flex h-full min-h-0 flex-col overflow-visible"
      }
    >
      {isMobileDrawer && onCloseDrawer && (
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--bg-border)] px-3 py-3">
          <p className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--text-muted)]">
            navigate
          </p>
          <button
            type="button"
            onClick={onCloseDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
            aria-label="Close menu"
          >
            <IconX />
          </button>
        </div>
      )}

      {/* Monogram — compact in drawer */}
      <div
        className={`flex shrink-0 justify-center ${
          isMobileDrawer ? "py-3" : "py-4"
        }`}
      >
        <Link
          href="/"
          onClick={() => {
            onMonogramClick();
            onNavigate?.();
          }}
          title="Home"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-elevated)] font-mono text-[0.7rem] font-semibold text-[var(--accent)] ring-1 ring-[var(--bg-border)] transition-all duration-150 hover:ring-[var(--accent)]"
        >
          RH
        </Link>
      </div>

      <LayoutGroup>
        <nav
          className={
            isMobileDrawer
              ? "flex flex-1 flex-col gap-0.5 px-2 pb-6 pt-1"
              : "flex flex-col items-center gap-2 overflow-visible px-2 pb-6"
          }
        >
          {nav.map(({ href, label, Icon }) => (
            <NavIconLink
              key={href}
              href={href}
              label={label}
              Icon={Icon}
              active={isActive(pathname, href)}
              onNavigate={onNavigate}
              layoutBar={layoutBar}
              isMobileDrawer={Boolean(isMobileDrawer)}
            />
          ))}
        </nav>
      </LayoutGroup>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed left-0 right-0 top-0 z-[90] flex h-14 items-center justify-between border-b border-[var(--bg-border)] bg-[var(--bg-base)]/90 px-4 backdrop-blur-xl md:hidden">
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-elevated)] font-mono text-[0.7rem] font-semibold text-[var(--accent)] ring-1 ring-[var(--bg-border)]"
          onClick={onMonogramClick}
          title="Home"
        >
          RH
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle variant="chrome" />
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
            onClick={() => setDrawerOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-[80] hidden h-screen w-[60px] flex-col overflow-visible border-r border-[var(--bg-border)] bg-[var(--bg-base)]/90 backdrop-blur-xl md:flex shadow-[inset_-1px_0_0_rgba(0,0,0,0.04)] dark:shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]">
        <NavColumn layoutBar />
      </aside>

      {/* Mobile drawer — z above page content; labeled rows for touch devices */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[200] touch-manipulation bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="fixed left-0 top-0 z-[210] flex h-[100dvh] max-w-[min(20rem,88vw)] w-full flex-col border-r border-[var(--bg-border)] bg-[var(--bg-base)] shadow-2xl md:hidden"
            >
              <NavColumn
                onNavigate={() => setDrawerOpen(false)}
                layoutBar={false}
                isMobileDrawer
                onCloseDrawer={() => setDrawerOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Easter egg toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 z-[100] max-w-[90vw] -translate-x-1/2 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-4 py-2.5 font-mono text-[var(--text-caption)] text-[var(--accent)] shadow-lg"
          >
            you found me. probably at the gym. back in 45 minutes.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavIconLink({
  href,
  label,
  Icon,
  active,
  onNavigate,
  layoutBar,
  isMobileDrawer,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  onNavigate?: () => void;
  layoutBar: boolean;
  isMobileDrawer?: boolean;
}) {
  const [hover, setHover] = useState(false);

  if (isMobileDrawer) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={`flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
          active
            ? "bg-[var(--bg-elevated)] text-[var(--accent)] ring-1 ring-[var(--bg-border)]"
            : "text-[var(--text-primary)] active:bg-[var(--bg-surface)]"
        }`}
      >
        <Icon
          className={`h-5 w-5 shrink-0 ${active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}`}
          aria-hidden
        />
        <span className="min-w-0 font-sans text-[var(--text-small)] font-medium leading-snug">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={href}
        onClick={onNavigate}
        title={label}
        aria-current={active ? "page" : undefined}
        className={`relative flex h-10 w-full items-center justify-center rounded-xl transition-all duration-150 ${
          active
            ? "bg-[var(--bg-elevated)] text-[var(--accent)] shadow-[0_0_0_1px_var(--bg-border)]"
            : "text-[var(--text-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
        }`}
      >
        {active && layoutBar && (
          <motion.span
            layoutId="activeBar"
            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-[var(--accent)]"
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
          />
        )}
        {active && !layoutBar && (
          <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-[var(--accent)]" />
        )}
        <Icon className="relative z-[1] h-4 w-4" />
      </Link>

      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, x: -6, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.95 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[200] hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-secondary)] shadow-lg md:block"
          >
            {label}
            <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-[var(--bg-border)]" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
