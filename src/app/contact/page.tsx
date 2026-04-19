import { ContactForm } from "@/components/ContactForm";
import { SocialLinksRow } from "@/components/SocialLinksRow";

function IconEnvelope(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      {...props}
    >
      <path d="M4 6h16v12H4V6Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      {...props}
    >
      <path d="M10 13a5 5 0 0 1 7 0" />
      <path d="M14 11a5 5 0 0 0-7 0" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconGitHubSmall(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
      {...props}
    >
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.4 2.9 8.1 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 1.6-.4 3.4-.4 5 0 1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5 4-1.4 6.8-5.1 6.8-9.5C22 6.6 17.5 2 12 2Z" />
    </svg>
  );
}

const rows = [
  {
    icon: IconEnvelope,
    label: "rrubayet321@gmail.com",
    href: "mailto:rrubayet321@gmail.com",
  },
  {
    icon: IconLink,
    label: "linkedin.com/in/rubayet-hassan2",
    href: "https://www.linkedin.com/in/rubayet-hassan2",
  },
  {
    icon: IconGitHubSmall,
    label: "github.com/rrubayet321",
    href: "https://github.com/rrubayet321",
  },
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
            let&apos;s talk
          </h1>
          <p className="mt-4 max-w-[440px] text-[var(--text-small)] leading-relaxed text-[var(--text-muted)]">
            fast replies. based in dhaka. if you&apos;re building something — or
            breaking something interestingly — say hi.
          </p>
        </div>
        <SocialLinksRow className="sm:pt-1" />
      </div>

      <ul className="mt-10 max-w-md space-y-1">
        {rows.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                href.startsWith("mailto") ? undefined : "noopener noreferrer"
              }
              className="group flex min-h-12 items-center gap-4 rounded-md py-2 pl-1 pr-2 text-[var(--text-secondary)] transition-[color,background-color] duration-150 hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--text-muted)] transition-colors duration-150 group-hover:text-[var(--accent)]">
                <Icon />
              </span>
              <span className="font-mono text-[var(--text-small)] leading-snug tracking-normal">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <ContactForm />
    </div>
  );
}
