import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Mark";
import { analyses } from "@/lib/analysis";
import { projects } from "@/lib/projects";
type Props = { params: Promise<{ id: string }> };
export function generateStaticParams() {
  return analyses.map((item) => ({ id: item.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = analyses.find((note) => note.id === id);
  return item
    ? {
        title: item.title,
        description: item.excerpt,
        alternates: { canonical: "/analysis/" + id },
      }
    : {};
}
export default async function NoteDetail({ params }: Props) {
  const { id } = await params;
  const item = analyses.find((note) => note.id === id);
  if (!item) notFound();
  const related = projects.find(
    (project) => project.id === item.relatedProjectId,
  );
  return (
    <article className="shell inner-page note-detail">
      <div className="reading">
        <Reveal>
          <Link href="/analysis" className="back-link">
            ← All notes
          </Link>
          <header className="note-header">
            <p className="eyebrow">
              {item.topic} <span aria-hidden="true">/</span>{" "}
              <time dateTime={item.dateTime}>{item.date}</time>
            </p>
            <h1>{item.title}</h1>
            <p className="note-deck">{item.excerpt}</p>
          </header>
        </Reveal>
        <div className="article-prose">
          {item.body.map((paragraph, index) => (
            <Reveal key={index}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        {related && (
          <aside className="related-project">
            <p className="eyebrow">Behind the note</p>
            {related.github ? (
              <a
                href={related.github}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {related.title} on GitHub <Arrow diagonal />
              </a>
            ) : (
              <Link href={"/projects/" + related.id} className="text-link">
                Explore {related.title} <Arrow />
              </Link>
            )}
          </aside>
        )}
        <nav className="article-navigation" aria-label="Article navigation">
          <Link href="/analysis" className="text-link">
            ← All notes
          </Link>
          <Link href="/#contact" className="text-link">
            Continue the conversation <Arrow diagonal />
          </Link>
        </nav>
      </div>
    </article>
  );
}
