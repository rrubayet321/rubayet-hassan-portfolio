import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "AI products, full-stack software, and multimodal research by Rubayet Hassan.",
  alternates: { canonical: "/projects" },
};
export default function ProjectsPage() {
  const products = projects.filter((project) => project.type === "product");
  const research = projects.filter((project) => project.type === "research");
  return (
    <div className="shell inner-page">
      <Reveal>
        <header className="page-heading">
          <p className="eyebrow">Work / Independent projects</p>
          <h1>
            Less talk. <span className="serif">More shipped.</span>
          </h1>
          <p>
            Software for real questions, daily friction, and a few curious
            ideas.
            <br className="desktop-break" /> Explore the code behind each
            product on GitHub.
          </p>
        </header>
      </Reveal>
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="eyebrow collection-heading">
          01 / Products
        </h2>
        <div className="project-grid">
          {products.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
      <section
        className="research-collection"
        aria-labelledby="research-heading"
      >
        <h2 id="research-heading" className="eyebrow collection-heading">
          02 / Research
        </h2>
        <div className="project-grid">
          {research.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={products.length + index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
