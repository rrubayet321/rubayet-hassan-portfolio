import Link from "next/link";

const footerNav = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--bg-border)] px-6 py-10">
      <div className="mx-auto max-w-content">
        <nav
          className="mb-6 font-sans [font-size:var(--text-small)] text-[var(--text-secondary)] sm:text-left"
          aria-label="Footer"
        >
          {footerNav.map(({ href, label }, i) => (
            <span key={href}>
              {i > 0 && <span className="text-[var(--text-muted)]/45"> · </span>}
              <Link
                href={href}
                className="underline-offset-2 transition-colors duration-150 hover:text-[var(--text-primary)] hover:underline"
              >
                {label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
            still here. still building.
          </p>
          <p className="font-mono text-[var(--text-label)] text-[var(--text-muted)]">
            © 2026 Rubayet Hassan ·{" "}
            <span className="text-[var(--text-muted)]">
              press{" "}
              <kbd className="rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-1.5 py-0.5 font-mono text-[0.6rem]">
                ?
              </kbd>{" "}
              for shortcuts
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
