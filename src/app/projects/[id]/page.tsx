import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RichInline } from "@/components/RichInline";
import { TechTagList } from "@/components/TechTagList";
import { projects } from "@/lib/projects";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study · Rubayet Hassan`,
    description: project.subtitle,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project || !project.caseStudy) notFound();

  const cs = project.caseStudy;

  return (
    <article className="mx-auto max-w-reading px-6 py-14 md:pl-8">
      <Link
        href="/projects"
        className="font-mono text-[0.68rem] text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--text-primary)]"
      >
        ← projects
      </Link>

      {/* Header */}
      <h1 className="mt-8 font-sans text-[1.5rem] font-medium text-[var(--text-primary)]">
        {project.title}
      </h1>
      <p className="mt-2 text-[var(--text-small)] text-[var(--text-secondary)]">
        <RichInline text={project.subtitle} />
      </p>
      <TechTagList tags={project.tags} className="mt-4" />

      {/* Links */}
      <div className="mt-4 flex flex-wrap gap-6 font-mono text-[var(--text-small)]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] underline underline-offset-2 transition-colors hover:text-[var(--text-primary)]"
          >
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] underline underline-offset-2 transition-colors hover:text-[var(--text-primary)]"
          >
            Live demo
          </a>
        )}
      </div>

      <div className="my-10 border-t border-[var(--bg-border)]" />

      {/* Case study body */}
      <div className="space-y-12 font-sans text-[0.9rem] leading-[1.9] text-[var(--text-secondary)]">

        <section>
          <h2 className="mb-4 font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
            the problem
          </h2>
          <p>
            <RichInline text={cs.problem} />
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
            the approach
          </h2>
          <p>
            <RichInline text={cs.approach} />
          </p>
        </section>

        {cs.decisions.length > 0 && (
          <section>
            <h2 className="mb-6 font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
              key decisions
            </h2>
            <div className="flex flex-col gap-6">
              {cs.decisions.map((d) => (
                <div key={d.title}>
                  <p className="font-medium text-[var(--text-primary)]">
                    ↳ {d.title}
                  </p>
                  <p className="mt-1.5 text-[var(--text-muted)]">
                    <RichInline text={d.body} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.metrics.length > 0 && (
          <section>
            <h2 className="mb-6 font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
              by the numbers
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {cs.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-4 py-4"
                >
                  <p className="font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
                    <RichInline text={m.label} />
                  </p>
                  <p className="mt-1 font-sans font-medium text-[var(--accent)] [font-size:var(--text-small)]">
                    <RichInline text={m.value} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-4 font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
            what i actually learned
          </h2>
          <p>
            <RichInline text={cs.learnings} />
          </p>
        </section>
      </div>

      {/* Stat line */}
      <p className="mt-10 font-mono text-[var(--text-small)] text-[var(--accent)]">
        <RichInline text={project.stat} />
      </p>

      <div className="mt-10 border-t border-[var(--bg-border)] pt-8">
        <Link
          href="/projects"
          className="font-mono text-[0.72rem] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
        >
          ← back to all projects
        </Link>
      </div>
    </article>
  );
}
