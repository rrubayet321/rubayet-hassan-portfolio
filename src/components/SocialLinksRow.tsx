import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";

const items = [
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

export function SocialLinksRow({ className = "" }: { className?: string }) {
  return (
    <nav
      className={`flex flex-wrap items-center gap-1 ${className}`}
      aria-label="Social and contact links"
    >
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          aria-label={label}
          title={label}
          className="flex h-11 min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--text-muted)] transition-[color,background-color,box-shadow] duration-150 hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] hover:shadow-sm"
        >
          <Icon className="h-[22px] w-[22px]" />
        </a>
      ))}
    </nav>
  );
}
