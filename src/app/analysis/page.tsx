export default function AnalysisPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="blink font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        things i&apos;ve taken apart
      </h1>
      <p className="mt-4 max-w-[540px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
        short notes on product gaps and tradeoffs — sharper than a thread, lighter
        than a whitepaper.
      </p>
      <p className="mt-12 rounded-md border border-dashed border-[var(--bg-border)] bg-[var(--bg-elevated)]/40 px-6 py-14 text-center text-[var(--text-small)] leading-relaxed text-[var(--text-secondary)]">
        <strong className="font-medium text-[var(--text-primary)]">
          coming soon
        </strong>
        <br />
        <span className="mt-2 inline-block text-[var(--text-muted)]">
          nothing published here yet.
        </span>
      </p>
    </div>
  );
}
