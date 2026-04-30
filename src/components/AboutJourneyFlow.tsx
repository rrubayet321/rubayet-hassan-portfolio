"use client";

import { useEffect, useRef, useState } from "react";
import { Highlight, type HighlightVariant } from "@/components/Highlight";

export type AboutJourneyItem = {
  id: string;
  eyebrow: string;
  title: string;
  period?: string;
  description: string;
  badge?: string;
  badgeVariant?: HighlightVariant;
  details?: readonly string[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const detailHighlightClass = [
  "border-[var(--mark-purple-bg)] bg-[var(--mark-purple-bg)] text-[var(--mark-purple-fg)]",
  "border-[var(--mark-blue-bg)] bg-[var(--mark-blue-bg)] text-[var(--mark-blue-fg)]",
  "border-[var(--mark-green-bg)] bg-[var(--mark-green-bg)] text-[var(--mark-green-fg)]",
  "border-[var(--mark-orange-bg)] bg-[var(--mark-orange-bg)] text-[var(--mark-orange-fg)]",
] as const;

export function AboutJourneyFlow({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly AboutJourneyItem[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateFlow = () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const viewportAnchor = window.innerHeight * 0.45;
      const containerRect = container.getBoundingClientRect();
      const scrollableDistance = Math.max(
        containerRect.height - window.innerHeight * 0.25,
        1,
      );
      const nextProgress = clamp(
        ((viewportAnchor - containerRect.top) / scrollableDistance) * 100,
        0,
        100,
      );

      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height * 0.35;
        const distance = Math.abs(itemCenter - viewportAnchor);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setProgress(nextProgress);
      setActiveIndex(nearestIndex);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateFlow);
    };

    updateFlow();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const scrollToItem = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const flowId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      className="mt-10 border-t border-[var(--bg-border)] pt-8 first:border-t-0 first:pt-0"
      aria-labelledby={`${flowId}-heading`}
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id={`${flowId}-heading`}
            className="font-sans text-[var(--text-body)] font-medium tracking-[-0.01em] text-[var(--text-primary)]"
          >
            {title}
          </h2>
          <p className="mt-1 max-w-[420px] text-[var(--text-caption)] leading-relaxed text-[var(--text-muted)]">
            {description}
          </p>
        </div>
        <p className="font-mono text-[var(--text-caption)] text-[var(--text-muted)]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>
      </div>

      <div ref={containerRef} className="relative mt-8">
        <div
          className="absolute left-[1.15rem] top-0 h-full w-px bg-[var(--bg-border)]"
          aria-hidden="true"
        />
        <div
          className="absolute left-[1.15rem] top-0 w-px bg-[var(--accent)] transition-[height] duration-150"
          style={{ height: `${progress}%` }}
          aria-hidden="true"
        />

        <div className="max-w-[520px] space-y-5">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const isLanguageCard = item.id === "languages";

            return (
              <article
                key={item.id}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className="relative grid grid-cols-[2.35rem,1fr] gap-4"
              >
                <button
                  type="button"
                  onClick={() => scrollToItem(index)}
                  className={`relative z-10 mt-5 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[0.72rem] transition-[background-color,border-color,color,transform] duration-200 ${
                    isActive
                      ? "scale-110 border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-base)]"
                      : "border-[var(--bg-border)] bg-[var(--bg-base)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                  aria-label={`Jump to ${item.title}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>

                <div
                  className={`rounded-lg border px-4 py-3.5 transition-[background-color,border-color,transform,opacity] duration-300 ${
                    isLanguageCard
                      ? "border-[var(--chip-border)] bg-[var(--accent-dim)] opacity-100"
                      : isActive
                      ? "translate-x-1 border-[var(--bg-elevated)] bg-[var(--bg-elevated)] opacity-100"
                      : "border-[var(--bg-border)] bg-[var(--bg-surface)] opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <Highlight
                        variant={item.badgeVariant ?? "purple"}
                        className="text-[0.82rem] leading-none"
                      >
                        {item.badge}
                      </Highlight>
                    )}
                  </div>
                  <p className="mt-1.5 max-w-[440px] text-[var(--text-caption)] leading-relaxed text-[var(--text-muted)]">
                    {item.description}
                  </p>
                  {item.details && item.details.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.details.map((detail, detailIndex) => (
                        <span
                          key={detail}
                          className={`rounded border px-2.5 py-1 font-mono text-[0.7rem] ${
                            isLanguageCard
                              ? detailHighlightClass[
                                  detailIndex % detailHighlightClass.length
                                ]
                              : "border-[var(--bg-border)] bg-[var(--bg-base)] text-[var(--text-muted)]"
                          }`}
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
