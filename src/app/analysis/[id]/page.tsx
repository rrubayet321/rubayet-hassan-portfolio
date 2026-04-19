import Link from "next/link";
import { notFound } from "next/navigation";
import { TechChip } from "@/components/TechChip";
import { analyses } from "@/lib/analysis";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return analyses.map((a) => ({ id: a.id }));
}

export default async function AnalysisDetailPage({ params }: Props) {
  const { id } = await params;
  const item = analyses.find((a) => a.id === id);
  if (!item) notFound();

  const paragraphs = item.body.split("\n\n");

  return (
    <article className="mx-auto max-w-reading px-6 py-14 md:pl-8">
      <Link
        href="/analysis"
        className="font-mono text-[0.68rem] text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--text-primary)]"
      >
        ← back
      </Link>
      <h1 className="mt-8 font-sans text-[1.5rem] font-medium text-[var(--text-primary)]">
        {item.title}
      </h1>
      <p className="mt-4 font-mono text-[0.65rem] text-[var(--text-muted)]">
        {item.product} · {item.date}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <TechChip key={t}>{t}</TechChip>
        ))}
      </div>
      <div className="my-10 border-t border-[var(--bg-border)]" />
      <div className="space-y-6 font-sans text-[0.9rem] leading-[1.9] text-[var(--text-secondary)]">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <footer className="mt-14 border-t border-[var(--bg-border)] pt-10 font-mono text-[0.72rem] text-[var(--text-muted)]">
        this led to →{" "}
        <a
          href={item.relatedProject.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline-offset-2 hover:underline"
        >
          {item.relatedProject.label}
        </a>
      </footer>
    </article>
  );
}
