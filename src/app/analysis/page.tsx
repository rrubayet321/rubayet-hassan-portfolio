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
          <details
            key={item.id}
            className="group relative overflow-hidden rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] transition-[border-color,background-color] duration-200 open:border-[var(--bg-elevated)] open:bg-[var(--bg-elevated)]"
          >
            <summary className="grid cursor-pointer list-none grid-cols-[auto,1fr,auto] items-center gap-4 p-6 transition-colors duration-200 marker:hidden hover:bg-[var(--bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)] [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[2rem] font-bold leading-none text-[var(--bg-border)] transition-colors duration-200 group-open:text-[var(--text-muted)] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-mono text-[0.65rem] uppercase tracking-widest text-[var(--text-muted)]">
                  {item.date}
                </span>
                <span className="mt-2 block max-w-[440px] font-sans text-[var(--text-body)] font-medium leading-snug text-[var(--text-primary)]">
                  {item.title}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-3 py-1.5 font-mono text-[0.72rem] text-[var(--text-muted)] transition-[border-color,color,transform] duration-200 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-open:text-[var(--accent)]">
                <span className="hidden sm:inline group-open:hidden">read note</span>
                <span className="hidden group-open:sm:inline">close</span>
                <span className="relative h-3 w-3">
                  <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
                </span>
              </span>
            </summary>

            <div className="border-t border-[var(--bg-border)] px-6 pb-6 pt-5">
              <div className="max-w-[560px] space-y-4 text-[var(--text-small)] leading-relaxed text-[var(--text-secondary)]">
                {item.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {item.relatedProject && (
                  <Link
                    href={item.relatedProject.href}
                    className="font-mono text-[0.72rem] text-[var(--accent)] transition-opacity hover:opacity-80"
                  >
                    {item.relatedProject.label} ↗
                  </Link>
                )}
                <Link
                  href={`/analysis/${item.id}`}
                  className="font-mono text-[0.72rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                >
                  open full page →
                </Link>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
