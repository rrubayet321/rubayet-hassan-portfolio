import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import {
  IconCalendar,
  IconGitHub,
  IconLinkedIn,
  IconMail,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact — Rubayet Hassan",
  description:
    "Fast replies. Based in Dhaka. If you're building something interesting — say hi.",
};

const socialLinks = [
  {
    href: "https://github.com/rrubayet321",
    label: "GitHub",
    Icon: IconGitHub,
  },
  {
    href: "https://www.linkedin.com/in/rubayet-hassan2",
    label: "LinkedIn",
    Icon: IconLinkedIn,
  },
  {
    href: "mailto:rrubayet321@gmail.com",
    label: "Email",
    Icon: IconMail,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      {/* Header */}
      <h1 className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        let&apos;s talk
      </h1>
      <p className="mt-3 max-w-[440px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
        fast replies. based in dhaka. if you&apos;re building something — or
        breaking something interestingly — say hi.
      </p>

      {/* Social icon row */}
      <div className="mt-6 flex items-center gap-2">
        {socialLinks.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] transition-[color,border-color,background-color] duration-150 hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-[var(--bg-border)]" />

      {/* Book a call — featured CTA */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-[var(--text-primary)] [font-size:var(--text-small)]">
            book a quick chat
          </p>
          <p className="mt-1 text-[var(--text-small)] text-[var(--text-muted)]">
            30 minutes. no agenda required. pick a slot that works.
          </p>
        </div>
        <a
          href="https://cal.com/rubayeth"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2.5 rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-4 py-2.5 font-mono text-[var(--text-small)] text-[var(--text-secondary)] transition-[color,border-color,background-color] duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <IconCalendar className="h-4 w-4 transition-colors duration-150 group-hover:text-[var(--accent)]" />
          cal.com/rubayeth
        </a>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-[var(--bg-border)]" />

      {/* Copy email */}
      <div className="mt-10">
        <p className="mb-4 font-mono text-[var(--text-caption)] uppercase tracking-widest text-[var(--text-muted)]">
          or just email
        </p>
        <CopyEmail />
      </div>

      {/* Contact form */}
      <ContactForm />
    </div>
  );
}
