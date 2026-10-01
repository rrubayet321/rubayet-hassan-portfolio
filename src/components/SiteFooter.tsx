import Link from "next/link";
import { Mark, Arrow } from "@/components/Mark";
import { profile } from "@/lib/profile";
export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="footer-top">
        <Link
          href="/"
          className="footer-identity"
          aria-label="Rubayet Hassan — home"
        >
          <Mark /> <span>Built with intention.</span>
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/photos">
            Photos <Arrow diagonal />
          </Link>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Rubayet Hassan</span>
        <span>
          Dhaka, Bangladesh{" "}
          <span className="footer-coordinate" aria-hidden="true">
            / 23° N, 90° E
          </span>
        </span>
      </div>
    </footer>
  );
}
