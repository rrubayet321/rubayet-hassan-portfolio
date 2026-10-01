import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Arrow } from "@/components/Mark";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: "/projects/" + id },
  };
}
export default async function ProjectDetail({ params }: Props) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.id === id);
  const next = projects[(index + 1) % projects.length];
  return (
    <article className="shell inner-page case-page">
      <Reveal>
        <Link href="/projects" className="back-link">
          ← All work
        </Link>
        <header className="case-header">
          <p className="eyebrow">
            {project.type === "research" ? "Research" : "Independent project"} /{" "}
            {project.category}
          </p>
          <h1>
            {project.title}
            <span className="copper">.</span>
          </h1>
          <p className="case-tagline serif">{project.headline}</p>
          <p className="case-intro">{project.summary}</p>
          <ul className="tech-list">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {(project.live || project.github) && (
            <div className="case-actions">
              {project.live && (
                <a
                  className="button button-secondary"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open project <Arrow diagonal />
                </a>
              )}
              {project.github && (
                <a
                  className="button"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source on GitHub <Arrow diagonal />
                </a>
              )}
            </div>
          )}
        </header>
      </Reveal>
      <div className="reading case-body">
        <Reveal>
          <section className="article-section">
            <p className="eyebrow">01 / The starting point</p>
            <h2>The problem</h2>
            <p>{project.caseStudy.problem}</p>
          </section>
        </Reveal>
        <Reveal>
          <section className="article-section">
            <p className="eyebrow">02 / From idea to implementation</p>
            <h2>What I built</h2>
            <p>{project.caseStudy.contribution}</p>
          </section>
        </Reveal>
        <Reveal>
          <section className="article-section">
            <p className="eyebrow">03 / The choices behind it</p>
            <h2>Engineering decisions</h2>
            <div className="decisions">
              {project.caseStudy.decisions.map((decision, decisionIndex) => (
                <section key={decision.title} className="decision">
                  <span className="decision-index" aria-hidden="true">
                    0{decisionIndex + 1}
                  </span>
                  <div>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </div>
                </section>
              ))}
            </div>
          </section>
        </Reveal>
        {project.figure && (
          <Reveal>
            <figure className="research-figure">
              <Image
                src={project.figure.src}
                alt={project.figure.alt}
                width={1024}
                height={682}
                sizes="(max-width: 768px) calc(100vw - 40px), 680px"
              />
              <figcaption className="caption">
                {project.figure.caption}
              </figcaption>
            </figure>
          </Reveal>
        )}
        <Reveal>
          <section className="article-section learning-section">
            <p className="eyebrow">04 / Looking back</p>
            <h2>What stayed with me</h2>
            <p>{project.caseStudy.learnings}</p>
          </section>
        </Reveal>
        <nav className="article-navigation" aria-label="Project navigation">
          <Link href="/projects" className="text-link">
            ← All work
          </Link>
          {next.github ? (
            <a
              href={next.github}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next: {next.title} <Arrow diagonal />
            </a>
          ) : (
            <Link href={"/projects/" + next.id} className="text-link">
              Next: {next.title} <Arrow />
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
