import Link from "next/link";
import { Mark, Arrow } from "@/components/Mark";
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
          <Link href="/contact">
            Contact <Arrow diagonal />
          </Link>
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
