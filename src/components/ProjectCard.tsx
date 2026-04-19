"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { TechChip } from "@/components/TechChip";
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

export function ProjectCard({ project }: { project: Project }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const fn = () => setIsDesktop(mql.matches);
    fn();
    mql.addEventListener("change", fn);
    return () => mql.removeEventListener("change", fn);
  }, []);

  const expanded = isDesktop ? hover : tapped;
  const motionDur = reduceMotion ? 0 : 0.22;

  return (
    <div
      className="border-b border-[var(--bg-border)]"
      onMouseEnter={() => isDesktop && setHover(true)}
      onMouseLeave={() => isDesktop && setHover(false)}
    >
      <div
        role="button"
        tabIndex={0}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left outline-none md:cursor-default"
        onClick={() => !isDesktop && setTapped((v) => !v)}
        onKeyDown={(e) => {
          if (!isDesktop && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setTapped((v) => !v);
          }
        }}
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          <span className="truncate font-sans text-[var(--text-body)] font-medium text-[var(--text-primary)]">
            {project.title}
          </span>
          <span
            className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[var(--text-label)] uppercase tracking-wide ${typeClass[project.type]}`}
          >
            {project.type}
          </span>
        </span>
        <span className="shrink-0 text-[var(--text-muted)]">→</span>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: motionDur, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--bg-surface)] py-4 pl-[14px] pr-2">
              <p className="font-sans text-[var(--text-small)] text-[var(--text-secondary)]">
                {project.subtitle}
              </p>
              <p className="mt-3 font-sans text-[var(--text-small)] leading-[1.7] text-[var(--text-muted)]">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <TechChip key={t}>{t}</TechChip>
                ))}
              </div>
              <p className="mt-4 font-mono text-[var(--text-small)] text-[var(--accent)]">
                {project.stat}
              </p>
              <div className="mt-4 flex flex-wrap gap-6 font-mono text-[var(--text-small)]">
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
                    <span className="text-[var(--text-secondary)]">
                      Coming soon
                    </span>
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
                    <span className="text-[var(--text-secondary)]">
                      Coming soon
                    </span>
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
