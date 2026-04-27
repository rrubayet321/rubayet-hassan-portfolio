import Image from "next/image";
import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { thesisSummary } from "@/lib/thesis";

export const metadata: Metadata = {
  title: "Projects — Rubayet Hassan",
  description: "Solo builds. Real deploys. Some have users; all have git history.",
};

export default function ProjectsPage() {
  const figure = thesisSummary.figureSrc;

  return (
    <div className="mx-auto w-full max-w-wide px-5 py-10 md:px-10 md:py-14 md:pl-12">
      <header className="max-w-3xl">
        <h1 className="blink font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)] leading-tight">
          things i&apos;ve shipped
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--text-small)] leading-snug text-[var(--text-muted)] md:mt-4 md:leading-relaxed">
          solo builds. real deploys. some have users; all have git history.
        </p>
      </header>

      <section
        className="mt-10 border-t border-[var(--bg-border)] pt-8 md:mt-14 md:pt-12"
        aria-labelledby="thesis-heading"
      >
        <h2
          id="thesis-heading"
          className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-small)]"
        >
          research snapshot (no PDF — just the story)
        </h2>
        <div className="mt-4 max-w-3xl space-y-3 text-[var(--text-body)] leading-snug text-[var(--text-secondary)] md:mt-6 md:space-y-4 md:leading-relaxed">
          <p>
            <strong className="text-[var(--text-primary)]">Problem.</strong>{" "}
            {thesisSummary.problem}
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">Approach.</strong>{" "}
            {thesisSummary.approach}
          </p>
          <p>
            <strong className="text-[var(--text-primary)]">Why it matters.</strong>{" "}
            {thesisSummary.outcome}
          </p>
        </div>
        <figure className="mt-10 w-full">
          <div className="overflow-hidden rounded-2xl border border-[var(--bg-border)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.55)]">
            <Image
              src="/projects/cmat.png"
              alt="C-MAT architecture: MRI + EEG → Cross-Modal Attention → 4-class classification"
              width={1280}
              height={720}
              className="w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 max-w-3xl font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
            C-MAT pipeline — structural MRI + resting-state EEG → cross-modal attention → AD / FTD / PD / Healthy
          </figcaption>
        </figure>
        {figure && (
          <figure className="mt-10 max-w-3xl">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)]">
              <Image
                src={figure}
                alt={thesisSummary.figureCaption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <figcaption className="mt-2 font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
              {thesisSummary.figureCaption}
            </figcaption>
          </figure>
        )}
      </section>

      {/* Shayaan-style: wide two-column grid, image-led tiles */}
      <div className="mt-10 border-t border-[var(--bg-border)] pt-10 md:mt-16 md:pt-16">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
