import Link from "next/link";

const footerNav = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--bg-border)] px-5 py-8 md:px-6 md:py-10 md:pl-8">
      <div className="mx-auto max-w-content">
        <div className="space-y-2.5">
          <nav
            className="font-sans [font-size:var(--text-small)] leading-normal text-[var(--text-secondary)]"
            aria-label="Footer"
          >
            {footerNav.map(({ href, label }, i) => (
              <span key={href}>
                {i > 0 && <span className="text-[var(--text-muted)]/40"> · </span>}
                <Link
                  href={href}
                  className="underline-offset-2 transition-colors duration-150 hover:text-[var(--text-primary)] hover:underline"
                >
                  {label}
                </Link>
              </span>
            ))}
          </nav>
          <p className="font-mono text-[0.7rem] leading-[1.5] text-[var(--text-muted)] sm:text-[var(--text-caption)]">
            still here. still building.
          </p>
        </div>
        <p className="mt-5 border-t border-[var(--bg-border)] pt-4 font-sans text-[0.65rem] leading-snug text-[var(--text-muted)]/80 sm:text-[0.6875rem]">
          © {new Date().getFullYear()} Rubayet Hassan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
