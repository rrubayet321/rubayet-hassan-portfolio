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
  IconMenu,
} from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/", label: "home", Icon: IconHome },
  { href: "/projects", label: "projects", Icon: IconFolder },
  { href: "/analysis", label: "analysis", Icon: IconChart },
  { href: "/photos", label: "photos", Icon: IconCamera },
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
    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  const onMonogramClick = useCallback(() => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 600);
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

  const NavColumn = ({
    onNavigate,
    layoutBar,
  }: {
    onNavigate?: () => void;
    layoutBar: boolean;
  }) => (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 flex-col items-center border-b border-[var(--bg-border)] py-3">
        <Link
          href="/"
          onClick={() => {
            onMonogramClick();
            onNavigate?.();
          }}
          className="font-mono text-[0.75rem] text-[var(--accent)] transition-colors duration-150 hover:text-[var(--text-primary)]"
          title="Home"
        >
          RH
        </Link>
      </div>
      <LayoutGroup>
        <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain py-3">
          {nav.map(({ href, label, Icon }) => (
            <NavIconLink
              key={href}
              href={href}
              label={label}
              Icon={Icon}
              active={isActive(pathname, href)}
              onNavigate={onNavigate}
              layoutBar={layoutBar}
            />
          ))}
          <ThemeToggleNavRow />
        </nav>
      </LayoutGroup>
    </div>
  );

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[60] flex h-14 items-center justify-between border-b border-[var(--bg-border)] bg-[var(--bg-base)]/95 px-4 backdrop-blur-md md:hidden">
        <Link
          href="/"
          className="font-mono text-[0.75rem] text-[var(--accent)]"
          onClick={onMonogramClick}
          title="Home"
        >
          RH
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            className="flex h-10 min-h-10 min-w-10 items-center justify-center rounded-md text-[var(--text-muted)] transition-colors duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
            onClick={() => setDrawerOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </header>

      <aside className="fixed left-0 top-0 z-[50] hidden h-screen w-16 flex-col border-r border-[var(--bg-border)] bg-[var(--bg-base)]/95 backdrop-blur-md md:flex md:isolate dark:shadow-[inset_-1px_0_0_rgba(255,255,255,0.03)]">
        <NavColumn layoutBar />
      </aside>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed left-0 top-0 z-[70] flex h-full w-64 flex-col border-r border-[var(--bg-border)] bg-[var(--bg-base)] md:hidden"
            >
              <NavColumn
                onNavigate={() => setDrawerOpen(false)}
                layoutBar={false}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 left-1/2 z-[100] max-w-[90vw] -translate-x-1/2 rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-4 py-2 font-mono text-[var(--text-caption)] text-[var(--accent)]"
          >
            you found me. probably at the gym. back in 45 minutes.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggleNavRow() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex w-full justify-center border-t border-[var(--bg-border)] px-1 pt-3 mt-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div title="Light / dark theme">
        <ThemeToggle />
      </div>
      <div className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[80] hidden -translate-y-1/2 md:block">
        <AnimatePresence>
          {hover && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.12 }}
              className="whitespace-nowrap rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-2 py-1 font-mono text-[var(--text-caption)] text-[var(--text-secondary)] shadow-md"
            >
              theme
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NavIconLink({
  href,
  label,
  Icon,
  active,
  onNavigate,
  layoutBar,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active: boolean;
  onNavigate?: () => void;
  layoutBar: boolean;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex w-full justify-center px-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        href={href}
        onClick={onNavigate}
        title={label}
        className={`relative flex h-10 min-h-10 w-full max-w-[40px] items-center justify-center rounded-md transition-[color,background-color,box-shadow] duration-150 ${
          active
            ? "bg-[var(--bg-elevated)] text-[var(--accent)] shadow-[0_0_0_1px_var(--bg-border),0_1px_8px_rgba(0,0,0,0.12)]"
            : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] hover:shadow-[0_0_0_1px_var(--bg-border),0_0_12px_rgba(255,255,255,0.06)]"
        } `}
        aria-current={active ? "page" : undefined}
      >
        {active && layoutBar && (
          <motion.span
            layoutId="activeBar"
            className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 bg-[var(--accent)]"
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
          />
        )}
        {active && !layoutBar && (
          <span className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 bg-[var(--accent)]" />
        )}
        <Icon className="relative z-[1]" />
      </Link>
      <div className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-[80] hidden -translate-y-1/2 md:block">
        <AnimatePresence>
          {hover && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.12 }}
              className="whitespace-nowrap rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-2 py-1 font-mono text-[var(--text-caption)] text-[var(--text-secondary)] shadow-md"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

