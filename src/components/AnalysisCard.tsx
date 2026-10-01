import Link from "next/link";
import { Arrow } from "@/components/Mark";
import type { Analysis } from "@/lib/analysis";
export function AnalysisCard({ item }: { item: Analysis }) {
  return (
    <article className="note-row">
      <Link href={"/analysis/" + item.id} className="note-link">
        <div>
          <span className="eyebrow">{item.topic}</span>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
        </div>
        <div className="note-tail">
          <time dateTime={item.dateTime}>{item.date}</time>
          <Arrow diagonal />
        </div>
      </Link>
    </article>
  );
}
