import Link from "next/link";
import { TechChip } from "@/components/TechChip";

export function AnalysisCard({
  id,
  title,
  product,
  date,
  excerpt,
  tags,
}: {
  id: string;
  title: string;
  product: string;
  date: string;
  excerpt: string;
  tags: string[];
}) {
  return (
    <Link
      href={`/analysis/${id}`}
      className="block border-b border-[var(--bg-border)] py-6 transition-colors duration-150 hover:bg-[var(--bg-surface)]"
    >
      <h2 className="font-sans text-[0.95rem] font-medium text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="mt-2 font-mono text-[0.65rem] text-[var(--text-muted)]">
        {product} · {date}
      </p>
      <p className="mt-3 line-clamp-2 font-sans text-[0.8rem] text-[var(--text-secondary)]">
        {excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <TechChip key={t}>{t}</TechChip>
        ))}
      </div>
    </Link>
  );
}
