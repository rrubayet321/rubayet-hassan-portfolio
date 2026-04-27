import type { Metadata } from "next";
import { Highlight } from "@/components/Highlight";
import {
  competitions,
  experience,
  languages,
  philosophy,
} from "@/lib/about";

export const metadata: Metadata = {
  title: "About — Rubayet Hassan",
  description:
    "Experience, competitions, languages, and things I actually believe.",
};

const highlightMap = {
  orange: "orange",
  green: "green",
  blue: "blue",
  purple: "purple",
  maroon: "maroon",
} as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        about
      </h1>

      {/* Experience */}
      <section className="mt-10">
        <h2 className="font-mono text-[var(--text-caption)] uppercase tracking-widest text-[var(--text-muted)]">
          experience
        </h2>
        <div className="mt-5 flex flex-col gap-8">
          {experience.map((e) => (
            <div key={e.role}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
                  {e.role}
                </p>
                <Highlight variant={highlightMap[e.highlight]}>
                  {e.org}
                </Highlight>
                <span className="font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
                  {e.period}
                </span>
              </div>
              <p className="mt-2 max-w-[480px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
                {e.line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Competitions */}
      <section className="mt-14 border-t border-[var(--bg-border)] pt-10">
        <h2 className="font-mono text-[var(--text-caption)] uppercase tracking-widest text-[var(--text-muted)]">
          competitions
        </h2>
        <div className="mt-5 flex flex-col gap-6">
          {competitions.map((c) => (
            <div key={c.title}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
                  {c.title}
                </p>
                <span className="font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
                  {c.org} · {c.year}
                </span>
              </div>
              <p className="mt-1 max-w-[480px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
                {c.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="mt-14 border-t border-[var(--bg-border)] pt-10">
        <h2 className="font-mono text-[var(--text-caption)] uppercase tracking-widest text-[var(--text-muted)]">
          languages spoken
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {languages.map((l) => (
            <div
              key={l.name}
              className="rounded border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-3 py-2"
            >
              <p className="font-sans text-[var(--text-small)] font-medium text-[var(--text-primary)]">
                {l.name}
              </p>
              <p className="mt-0.5 font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
                {l.level}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mt-14 border-t border-[var(--bg-border)] pt-10">
        <h2 className="font-mono text-[var(--text-caption)] uppercase tracking-widest text-[var(--text-muted)]">
          things i actually believe
        </h2>
        <div className="mt-6 flex flex-col gap-7">
          {philosophy.map((p) => (
            <div key={p.line}>
              <p className="font-sans font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
                ↳ {p.line}
              </p>
              <p className="mt-1.5 max-w-[500px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
                {p.sub}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
