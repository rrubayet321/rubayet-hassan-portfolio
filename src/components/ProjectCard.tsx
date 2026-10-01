import Link from "next/link";
import { Arrow } from "@/components/Mark";
import { Reveal } from "@/components/Reveal";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const content = (
    <>
      {project.title}
      <Arrow diagonal />
    </>
  );
  return (
    <Reveal delay={(index % 2) * 0.07} className="project-reveal">
      <article className={"project-card project-" + project.id}>
        <div className="project-heading">
          <span className="eyebrow project-category">{project.category}</span>
          <span className="project-number" aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        <h3 className="project-title">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.title + " on GitHub"}
            >
              {content}
            </a>
          ) : (
            <Link
              href={"/projects/" + project.id}
              aria-label={"Read " + project.title + " research"}
            >
              {content}
            </Link>
          )}
        </h3>
        <p className="project-headline">{project.headline}</p>
        <p className="project-summary">{project.summary}</p>
        <div className="project-bottom">
          <ul
            className="tech-list"
            aria-label={project.title + " technologies"}
          >
            {project.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="project-actions">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View on GitHub <Arrow diagonal />
              </a>
            ) : (
              <Link href={"/projects/" + project.id} className="text-link">
                Read research <Arrow />
              </Link>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
