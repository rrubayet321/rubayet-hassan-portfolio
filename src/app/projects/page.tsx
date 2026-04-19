import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { thesisSummary } from "@/lib/thesis";

export default function ProjectsPage() {
  const figure = thesisSummary.figureSrc;

  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="blink font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        things i&apos;ve shipped
      </h1>
      <p className="mt-4 max-w-[480px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
        solo builds. real deploys. some have users; all have git history.
      </p>

      <section
        className="mt-12 border-t border-[var(--bg-border)] pt-10"
        aria-labelledby="thesis-heading"
      >
        <h2
          id="thesis-heading"
          className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-small)]"
        >
          research snapshot (no PDF — just the story)
        </h2>
        <div className="mt-5 max-w-[560px] space-y-4 text-[var(--text-body)] leading-relaxed text-[var(--text-secondary)]">
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
        {figure ? (
          <figure className="mt-6 max-w-lg">
            <div className="relative aspect-video overflow-hidden rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)]">
              <Image
                src={figure}
                alt={thesisSummary.figureCaption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </div>
            <figcaption className="mt-2 font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
              {thesisSummary.figureCaption}
            </figcaption>
          </figure>
        ) : (
          <div
            className="mt-6 max-w-lg rounded-md border border-dashed border-[var(--bg-border)] bg-[var(--bg-elevated)]/40 px-4 py-10 text-center text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]"
            role="status"
          >
            Figure coming — when you pick a chart or diagram, it&apos;ll live
            under{" "}
            <span className="text-[var(--text-secondary)]">public/thesis/</span>{" "}
            and show here. No full thesis PDF on this site.
          </div>
        )}
      </section>

      <div className="mt-14">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
