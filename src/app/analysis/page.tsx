import Link from "next/link";
import type { Metadata } from "next";
import { analyses } from "@/lib/analysis";

export const metadata: Metadata = {
  title: "Analysis — Rubayet Hassan",
  description:
    "Short notes on product gaps and tradeoffs — sharper than a thread, lighter than a whitepaper.",
};

export default function AnalysisPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="blink font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        things i&apos;ve taken apart
      </h1>
      <p className="mt-3 max-w-[480px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
        short notes on product gaps and tradeoffs — sharper than a thread,
        lighter than a whitepaper.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-3">
        {analyses.map((item, i) => (
          <Link
            key={item.id}
            href={`/analysis/${item.id}`}
            className="group relative overflow-hidden rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] p-6 transition-[border-color,background-color] duration-200 hover:border-[var(--bg-elevated)] hover:bg-[var(--bg-elevated)]"
          >
            {/* Index number — decorative */}
            <span className="absolute right-5 top-5 font-mono text-[2rem] font-bold leading-none text-[var(--bg-border)] transition-colors duration-200 group-hover:text-[var(--bg-elevated)] select-none">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Meta */}
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--text-muted)]">
              {item.product} · {item.date}
            </p>

            {/* Title */}
            <h2 className="mt-3 max-w-[440px] font-sans text-[var(--text-body)] font-medium leading-snug text-[var(--text-primary)] transition-colors duration-150">
              {item.title}
            </h2>

            {/* Excerpt */}
            <p className="mt-3 max-w-[480px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
              {item.excerpt}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {item.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[0.65rem] text-[var(--text-muted)] transition-colors duration-150 group-hover:bg-[var(--bg-border)]"
                >
                  {t}
                </span>
              ))}
              <span className="ml-auto font-mono text-[0.72rem] text-[var(--accent)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
