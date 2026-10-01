import type { Metadata } from "next";
import Link from "next/link";
import { CopyResumeLink } from "@/components/CopyResumeLink";
import { Arrow } from "@/components/Mark";
import { siteUrl } from "@/lib/profile";
export const metadata: Metadata = {
  title: "Resume",
  description: "View or download Rubayet Hassan's existing resume PDF.",
  alternates: { canonical: "/resume" },
  robots: { index: false, follow: true },
};
const pdf = "/Rubayet_Hassan_Resume.pdf";
export default function ResumePage() {
  return (
    <div className="shell inner-page resume-page">
      <header className="page-heading">
        <p className="eyebrow">Document / Resume</p>
        <h1>
          The <span className="serif">details.</span>
        </h1>
        <p>
          This existing PDF may not include my current role.
          <br />
          <Link className="inline-link" href="/">
            Visit the homepage for my current work.
          </Link>
        </p>
      </header>
      <div className="resume-actions">
        <a href={pdf} download="Rubayet_Hassan_Resume.pdf" className="button">
          Download PDF <Arrow />
        </a>
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-secondary"
        >
          Open PDF <Arrow diagonal />
        </a>
        <CopyResumeLink url={siteUrl + "/resume"} />
      </div>
      <iframe
        title="Rubayet Hassan — existing resume PDF"
        src={pdf + "#toolbar=0&view=FitH"}
        className="resume-viewer"
      />
      <p className="caption">
        If the viewer is unavailable, use the Open PDF or Download PDF link
        above.
      </p>
    </div>
  );
}
