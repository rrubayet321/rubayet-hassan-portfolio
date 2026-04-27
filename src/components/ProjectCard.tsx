"use client";

import Image from "next/image";
import Link from "next/link";
import { RichInline } from "@/components/RichInline";
import { TechTagList } from "@/components/TechTagList";
import type { Project } from "@/lib/projects";

const typeClass: Record<
  Project["type"],
  string
> = {
  product:
    "border-[var(--chip-border)] bg-[var(--chip-bg)] text-[var(--text-secondary)]",
  research:
    "border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[var(--text-muted)]",
};

/**
 * Shayaan-style project tile: large image first, title + tag row, copy always visible.
 */
export function ProjectCard({ project }: { project: Project }) {
  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];

  return (
    <article className="group flex h-full min-h-0 min-w-0 flex-col gap-5">
      {gallery.length > 0 && (
        <div className="flex w-full shrink-0 flex-col gap-3">
          {gallery.map((src, idx) => (
            <div
              key={src}
              className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--bg-elevated)] ring-1 ring-[var(--bg-border)] transition duration-300 group-hover:ring-[var(--text-primary)]/20"
            >
              <Image
                src={src}
                alt={
                  gallery.length > 1
                    ? `${project.title} — screenshot ${idx + 1} of ${gallery.length}`
                    : `${project.title} preview`
                }
                fill
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 45vw, 640px"
                className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.01] motion-reduce:group-hover:scale-100"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex shrink-0 items-start justify-between gap-4">
        <h3 className="min-w-0 max-w-[75%] font-sans [font-size:var(--text-title)] font-semibold leading-[var(--leading-tight)] tracking-[-0.02em] text-[var(--text-primary)] lowercase">
          {project.title}
        </h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase leading-none tracking-wider ${typeClass[project.type]}`}
        >
          {project.type}
        </span>
      </div>

      <div className="flex min-h-0 max-w-prose flex-1 flex-col gap-3 [font-size:var(--text-small)] leading-[1.65] text-[var(--text-muted)]">
        <p className="text-[var(--text-secondary)]">
          <RichInline text={project.subtitle} />
        </p>
        <p>
          <RichInline text={project.description} />
        </p>
      </div>

      <TechTagList tags={project.tags} className="shrink-0" />

      <p className="shrink-0 font-mono text-[var(--text-caption)] text-[var(--accent)] [letter-spacing:0.02em]">
        <RichInline text={project.stat} />
      </p>

      <div className="flex shrink-0 flex-wrap gap-6 font-mono [font-size:var(--text-label)] text-[var(--text-secondary)]">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] underline underline-offset-2 transition-colors duration-150 hover:text-[var(--text-primary)]"
          >
            GitHub
          </a>
        ) : (
          <span className="text-[var(--text-muted)]">
            GitHub:{" "}
            <span className="text-[var(--text-secondary)]">Coming soon</span>
          </span>
        )}
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-secondary)] underline underline-offset-2 transition-colors duration-150 hover:text-[var(--text-primary)]"
          >
            Live
          </a>
        ) : (
          <span className="text-[var(--text-muted)]">
            Live:{" "}
            <span className="text-[var(--text-secondary)]">Coming soon</span>
          </span>
        )}
        {project.caseStudy && (
          <Link
            href={`/projects/${project.id}`}
            className="text-[var(--accent)] underline underline-offset-2 transition-colors duration-150 hover:opacity-80"
          >
            case study →
          </Link>
        )}
      </div>
    </article>
  );
}
