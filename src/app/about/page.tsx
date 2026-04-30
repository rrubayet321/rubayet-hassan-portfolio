import type { Metadata } from "next";
import { AboutJourneyFlow, type AboutJourneyItem } from "@/components/AboutJourneyFlow";
import {
  competitions,
  experience,
  languages,
} from "@/lib/about";

export const metadata: Metadata = {
  title: "About — Rubayet Hassan",
  description:
    "Experience, competitions, languages, and things I actually believe.",
};

const highlightMap = {
  orange: "orange",
  green: "green",
  blue: "blue",
  purple: "purple",
  maroon: "maroon",
} as const;

const experienceItems: AboutJourneyItem[] = experience.map((item, index) => ({
  id: `experience-${index}`,
  eyebrow: "experience",
  title: item.role,
  description: item.line,
  badge: item.org,
  badgeVariant: highlightMap[item.highlight],
}));

const participationItems: AboutJourneyItem[] = competitions.map((item, index) => ({
  id: `competition-${index}`,
  eyebrow: "participation",
  title: item.title,
  badge: item.org,
  description: item.note,
}));

const languageItems: AboutJourneyItem[] = [
  {
    id: "languages",
    eyebrow: "languages spoken",
    title: "working across languages",
    description:
      "Communication stack for teams, users, communities, and real-world field work.",
    details: languages.map((language) => `${language.name}: ${language.level}`),
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14 md:pl-8">
      <h1 className="font-medium tracking-[-0.01em] text-[var(--text-primary)] [font-size:var(--text-title)]">
        about
      </h1>
      <AboutJourneyFlow
        title="experience"
        description="roles connected in the order they shaped the work."
        items={experienceItems}
      />
      <AboutJourneyFlow
        title="participation"
        description="competitions and rooms that sharpened the thinking."
        items={participationItems}
      />
      <AboutJourneyFlow
        title="languages"
        description="languages kept separate from work history."
        items={languageItems}
      />
    </div>
  );
}
