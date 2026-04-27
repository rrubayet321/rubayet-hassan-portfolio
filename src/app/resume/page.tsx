import type { Metadata } from "next";
import { CopyResumeLink } from "@/components/CopyResumeLink";

export const metadata: Metadata = {
  title: "Resume — Rubayet Hassan",
  description: "Download or view Rubayet Hassan's resume.",
};

const RESUME_PDF = "/Rubayet_Hassan_Resume.pdf";
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubayethassan.com";

export default function ResumePage() {
  const shareUrl = `${SITE_ORIGIN}/resume`;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 md:pl-8">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1
          className="font-medium tracking-[-0.025em] text-[var(--text-primary)]"
          style={{ fontSize: "var(--text-display)" }}
        >
          resume
        </h1>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <a
            href={RESUME_PDF}
            download="Rubayet_Hassan_Resume.pdf"
            className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2 font-mono text-[var(--text-caption)] text-white transition-opacity duration-150 hover:opacity-85"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            download pdf
          </a>
          <a
            href={RESUME_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--bg-border)] bg-[var(--bg-surface)] px-3.5 py-2 font-mono text-[var(--text-caption)] text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            open ↗
          </a>
          <CopyResumeLink url={shareUrl} />
        </div>
      </div>

      {/* PDF viewer */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--bg-border)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]">
        <iframe
          title="Rubayet Hassan — Resume"
          src={`${RESUME_PDF}#toolbar=0&view=FitH&zoom=90`}
          className="h-[min(90vh,1100px)] w-full min-h-[600px] border-0"
        >
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <p className="text-[var(--text-small)] text-[var(--text-secondary)]">
              Your browser couldn&apos;t display the PDF inline.
            </p>
            <a
              href={RESUME_PDF}
              download
              className="rounded-lg bg-violet-700 px-4 py-2 font-mono text-[var(--text-caption)] text-white"
            >
              download instead
            </a>
          </div>
        </iframe>
      </div>

    </div>
  );
}
