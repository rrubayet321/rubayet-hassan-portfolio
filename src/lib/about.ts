export const bio =
  "I build AI products end-to-end and ship them before I'm fully ready. Then I fix what breaks. Then I build something else. Repeat until the thing is actually good, or until someone hires me — whichever comes first.";

export const education = {
  institution: "BRAC University",
  degree: "B.Sc. in Computer Science",
  graduated: "2025",
  location: "Dhaka, Bangladesh",
  /** Only the coursework that pulls actual weight on the resume */
  coursework: [
    "Machine Learning",
    "Neural Networks",
    "AI",
    "Data Structures & Algorithms",
  ],
} as const;

export const experience = [
  {
    role: "Teaching Assistant",
    org: "Vertical Horizon",
    period: "2024",
    line: "Taught Python and biology to people who'd never typed a semicolon. Survived. Recursion was the hard part — for both of us.",
    highlight: "orange" as const,
  },
  {
    role: "Project Lead & Distribution Manager",
    org: "Youth Society of Bangladesh",
    period: "Dec 2023 – Present",
    line: "Logistics across distributed locations, 500+ beneficiaries. Turns out spreadsheets and empathy both need to scale.",
    highlight: "green" as const,
  },
  {
    role: "Technical Facilitator",
    org: "BRAC University Computer Club",
    period: "Ongoing",
    line: "Ran workshops for 100+ people. Made them care about code. Mixed results, but the coffee was good.",
    highlight: "blue" as const,
  },
] as const;

export const competitions = [
  {
    title: "AgentX AI Prompting Competition",
    org: "Microsoft",
    year: "2025",
    note: "Competed against a room of people who also thought they were good at talking to LLMs.",
  },
  {
    title: "BRAC Intra-Programming Contest",
    org: "BRAC University",
    year: "N/A",
    note: "Competitive programming. The problems were hard. My sleep schedule harder.",
  },
] as const;

export const languages = [
  { name: "English", level: "fluent" },
  { name: "Bangla", level: "native" },
  { name: "Hindi", level: "conversational" },
  { name: "Urdu", level: "conversational" },
] as const;

export const philosophy = [
  {
    line: "latency is design.",
    sub: "every second a user waits is a second they're thinking about the wait, not the product.",
  },
  {
    line: "the best LLM optimisation is not calling the LLM.",
    sub: "cache the obvious stuff. your users can't tell the difference between GPT-4o and Llama 70B on a summarisation task. they can absolutely tell 50ms from 3 seconds.",
  },
  {
    line: "ship beats perfect.",
    sub: "git history > design doc. a deployed product with real users teaches you more in a week than a spec does in a month.",
  },
  {
    line: "founder mode is endurance with better tooling.",
    sub: "the bottleneck is rarely intelligence. it's usually sustained output over time.",
  },
  {
    line: "product gaps live where someone else made a deliberate choice.",
    sub: "YouTube not showing competitor stats isn't an oversight — it's a moat. the interesting products live in the space left behind.",
  },
] as const;
