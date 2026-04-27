import type { Metadata } from "next";
import { usesGroups } from "@/lib/uses";

export const metadata: Metadata = {
  title: "Uses — Rubayet Hassan",
  description:
    "The actual tools, languages, and frameworks I use daily — with one honest line on each.",
};

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        uses
      </h1>
      <p className="mt-3 max-w-[480px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
        my actual stack. one honest line per tool. no sponsored opinions.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {usesGroups.map((group) => (
          <section key={group.label}>
            <h2 className="mb-4 font-mono text-[var(--text-caption)] uppercase tracking-widest text-[var(--text-muted)]">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-lg border border-[var(--bg-border)] bg-[var(--bg-surface)] px-4 py-3.5 transition-[border-color,background-color] duration-150 hover:border-[var(--bg-elevated)] hover:bg-[var(--bg-elevated)]"
                >
                  <p className="font-sans text-[var(--text-small)] font-medium text-[var(--text-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-1 font-mono text-[0.72rem] leading-relaxed text-[var(--text-muted)]">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
