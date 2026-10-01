import type { Metadata } from "next";
import { Arrow } from "@/components/Mark";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rubayet Hassan to discuss useful software, AI products, and your next business idea.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="shell inner-page contact-page">
      <Reveal>
        <header className="contact-page-header">
          <p className="eyebrow">Contact / Start a conversation</p>
          <h1>
            Have a problem
            <br />
            worth <span className="serif">solving?</span>
          </h1>
          <p className="contact-description">
            Let’s turn it into software that moves your business forward.
            <br className="desktop-break" /> A useful AI product starts with a
            real need.
          </p>
        </header>
        <CopyEmail />
        <nav className="contact-socials" aria-label="Contact profiles">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
        </nav>
      </Reveal>
      <span className="contact-asterisk" aria-hidden="true">
        ✳
      </span>
    </div>
  );
}
