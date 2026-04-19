import { Libre_Baskerville } from "next/font/google";

const RESUME_PDF = "/Rubayet_Hassan_Resume.pdf";
const SITE_ORIGIN = "https://rubayethassan.com";

const resumeSerif = Libre_Baskerville({
  weight: "700",
  subsets: ["latin"],
});

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 md:pl-8">
      <h1
        className={`${resumeSerif.className} lowercase tracking-[-0.02em] text-[var(--text-primary)]`}
        style={{ fontSize: "var(--text-title)" }}
      >
        resume
      </h1>
      <p className="mt-2 font-mono text-[length:var(--text-caption)] leading-relaxed text-[var(--text-muted)]">
        Download or share:{" "}
        <a
          href={`${SITE_ORIGIN}/resume`}
          className="text-[var(--text-secondary)] underline decoration-[var(--bg-border)] underline-offset-[5px] transition-colors hover:text-[var(--text-primary)] hover:decoration-[var(--text-muted)]"
        >
          {SITE_ORIGIN.replace(/^https:\/\//, "")}/resume
        </a>
      </p>

      <div className="mt-10 overflow-hidden rounded-xl bg-[#111113] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08] dark:shadow-[0_28px_56px_-16px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#18181b] px-3 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 font-mono text-[11px] text-zinc-500">
            <span className="shrink-0 opacity-80" aria-hidden>
              ≡
            </span>
            <span className="truncate text-zinc-300">Rubayet_Hassan_Resume.pdf</span>
          </div>
          <a
            href={RESUME_PDF}
            download
            className="shrink-0 rounded-md px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
            title="Download PDF"
          >
            Download
          </a>
        </div>
        <iframe
          title="Rubayet Hassan resume PDF"
          src={`${RESUME_PDF}#view=FitH`}
          className="h-[min(78vh,900px)] w-full min-h-[480px] border-0 bg-[#525659]"
        />
      </div>
    </div>
  );
}
