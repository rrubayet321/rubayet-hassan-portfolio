export function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--bg-border)] py-10 first:pt-0 last:border-b-0">
      <h2 className="font-mono text-[0.68rem] uppercase tracking-wide text-[var(--text-secondary)]">
        {title}
      </h2>
      <div className="mt-6 text-[0.88rem] leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>
    </section>
  );
}
