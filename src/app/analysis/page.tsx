import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { AnalysisCard } from "@/components/AnalysisCard";
import { analyses } from "@/lib/analysis";
export const metadata: Metadata = {
  title: "Notes",
  description:
    "Notes on AI engineering, product decisions, and building useful software.",
  alternates: { canonical: "/analysis" },
};
export default function NotesPage() {
  return (
    <div className="shell inner-page notes-page">
      <Reveal>
        <header className="page-heading">
          <p className="eyebrow">Notes / Thinking in progress</p>
          <h1>
            A little more <span className="serif">context.</span>
          </h1>
          <p>
            Observations from building things. Small lessons in engineering,
            <br className="desktop-break" /> product decisions, and making
            software useful.
          </p>
        </header>
      </Reveal>
      <Reveal>
        <div className="notes-list">
          {analyses.map((item) => (
            <AnalysisCard key={item.id} item={item} />
          ))}
        </div>
      </Reveal>
      <p className="notes-footnote caption">
        Personal observations from independent projects. Always a work in
        progress.
      </p>
    </div>
  );
}
