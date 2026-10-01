import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Mark";
import { SignatureArt } from "@/components/SignatureArt";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { AnalysisCard } from "@/components/AnalysisCard";
import { BusinessFocus } from "@/components/BusinessFocus";
import { featuredProjects } from "@/lib/projects";
import { analyses } from "@/lib/analysis";
import { profile } from "@/lib/profile";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <div className="shell home-page">
      <section className="hero" aria-labelledby="intro-heading">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              {profile.title}
            </p>
          </Reveal>
          <Reveal delay={0.07}>
            <h1 id="intro-heading">
              Rubayet
              <br />
              Hassan<span className="copper">.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="hero-description">
              Less busywork.
              <br />
              <span className="serif">More business.</span>
            </p>
            <p className="hero-value">{profile.introduction}</p>
          </Reveal>
          <Reveal delay={0.21}>
            <div className="hero-links">
              <Link href="/projects" className="button">
                Explore my work <Arrow />
              </Link>
              <Link href="/contact" className="hero-contact">
                Let’s talk <Arrow diagonal />
              </Link>
            </div>
            <p className="hero-location">
              {profile.location} <span aria-hidden="true">↗</span>
            </p>
          </Reveal>
        </div>
        <Reveal className="hero-art" delay={0.14}>
          <SignatureArt />
        </Reveal>
      </section>

      <Reveal>
        <section className="current-work" aria-labelledby="current-heading">
          <div className="current-label">
            <span className="eyebrow">Currently</span>
            <h2 id="current-heading">
              <a
                href={profile.employerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="current-building">Building</span>{" "}
                {profile.employer}
                <Arrow diagonal />
              </a>
            </h2>
          </div>
          <p>{profile.currentWork}</p>
          <span className="current-stamp" aria-hidden="true">
            PLAN
            <br />
            BUILD
            <br />
            REFINE
          </span>
        </section>
      </Reveal>
      <BusinessFocus />

      <section className="section selected-work" aria-labelledby="work-heading">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow section-index">01 / Selected work</p>
              <h2 id="work-heading">
                Small ideas. <span className="serif">Real utility.</span>
              </h2>
            </div>
            <Link href="/projects" className="text-link section-action">
              All work <Arrow />
            </Link>
          </div>
        </Reveal>
        <div className="project-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <Reveal>
          <a
            href="https://github.com/rrubayet321/ummahspeaks"
            target="_blank"
            rel="noopener noreferrer"
            className="compact-project"
            aria-label="Ummah Speaks on GitHub"
          >
            <span className="compact-plus" aria-hidden="true">
              +
            </span>
            <div>
              <h3>Also built: Ummah Speaks</h3>
              <p>A little clarity. A moment to reflect.</p>
            </div>
            <Arrow diagonal />
          </a>
        </Reveal>
      </section>

      <section className="research-strip" aria-labelledby="research-heading">
        <Reveal>
          <div className="research-inner">
            <div className="research-symbol" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="research-copy">
              <p className="eyebrow">02 / A research detour</p>
              <h2 id="research-heading">
                Different signals.
                <br />
                <span className="serif">A shared understanding.</span>
              </h2>
              <p>
                C-MAT explores the connection between brain imaging and EEG
                through multimodal machine learning. A lesson in asking better
                questions of imperfect data.
              </p>
              <Link href="/projects/cmat" className="text-link">
                Explore the research <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="about"
        className="section about-section"
        aria-labelledby="about-heading"
      >
        <Reveal>
          <div className="about-layout">
            <div>
              <p className="eyebrow">03 / A little background</p>
              <h2 id="about-heading">
                Curious by nature.
                <br />
                <span className="serif">Engineer by practice.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p>
                I’m a computer science graduate from BRAC University, based in
                Dhaka. I work across AI products, full-stack software, and the
                practical details that keep a system running.
              </p>
              <p>
                Outside the work, there’s usually a strong coffee, an early
                morning, or a little time away from the keyboard.
              </p>
              <Link href="/photos" className="text-link">
                A few moments outside work <Arrow diagonal />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        className="section notes-section"
        aria-labelledby="notes-heading"
      >
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / Field notes</p>
              <h2 id="notes-heading">
                Behind the <span className="serif">build.</span>
              </h2>
            </div>
            <Link href="/analysis" className="text-link section-action">
              All notes <Arrow />
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <div className="notes-list">
            {analyses.slice(0, 2).map((item) => (
              <AnalysisCard key={item.id} item={item} />
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section
          id="contact"
          className="home-contact-link"
          aria-labelledby="get-in-touch-heading"
        >
          <div>
            <p className="eyebrow">05 / What’s next?</p>
            <h2 id="get-in-touch-heading">
              Something worth <span className="serif">building?</span>
            </h2>
          </div>
          <Link href="/contact" className="text-link">
            Let’s talk <Arrow diagonal />
          </Link>
        </section>
      </Reveal>
    </div>
  );
}
