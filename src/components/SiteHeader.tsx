"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "@/components/Mark";
import { ReadingProgress } from "@/components/ReadingProgress";
export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="identity" href="/" aria-label="Rubayet Hassan — home">
          <Mark className="site-mark" />
          <span>
            rubayet hassan<span className="identity-period">.</span>
          </span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link
            href="/projects"
            aria-current={pathname.startsWith("/projects") ? "page" : undefined}
          >
            Work
          </Link>
          <Link
            href="/analysis"
            aria-current={pathname.startsWith("/analysis") ? "page" : undefined}
          >
            Notes
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
      <ReadingProgress />
    </header>
  );
}
