export type UsesItem = {
  name: string;
  note: string;
};

export type UsesGroup = {
  label: string;
  items: UsesItem[];
};

export const usesGroups: UsesGroup[] = [
  {
    label: "languages",
    items: [
      { name: "Python", note: "default brain. AI, backend, scripts, everything that shouldn't be TypeScript." },
      { name: "TypeScript", note: "JavaScript but with a safety net. Use it for anything that ships to users." },
      { name: "JavaScript", note: "still here. still relevant. use it when TS feels like overkill." },
      { name: "SQL", note: "the language that never left. joins are just philosophy problems with consequences." },
      { name: "C", note: "learned it. respect it. avoid it whenever possible." },
    ],
  },
  {
    label: "ai / ml",
    items: [
      { name: "PyTorch", note: "primary framework. research-grade control without the masochism of raw NumPy." },
      { name: "TensorFlow", note: "when the dataset has opinions about frameworks." },
      { name: "scikit-learn", note: "for when you don't need a GPU to get a baseline." },
      { name: "Transformers (HF)", note: "because reinventing attention from scratch is a bad use of time." },
      { name: "SHAP", note: "explainability layer. the 'why did the model do that' tool." },
    ],
  },
  {
    label: "llm / nlp",
    items: [
      { name: "Llama 3.x via Groq", note: "fast, cheap, runs inference at sub-2s latency. the working LLM." },
      { name: "Prompt Engineering", note: "it's not a dark art. it's just being precise. most people aren't." },
      { name: "RAG Pipelines", note: "retrieval-augmented generation — because hallucination is a feature nobody asked for." },
    ],
  },
  {
    label: "backend",
    items: [
      { name: "FastAPI", note: "Python API server. fast, typed, async-first. the one I reach for first." },
      { name: "Flask", note: "older, lighter, still useful when FastAPI feels like too much ceremony." },
      { name: "Node.js", note: "for TypeScript backends and Next.js route handlers." },
      { name: "Docker", note: "containerise once, argue about environment variables forever." },
    ],
  },
  {
    label: "frontend",
    items: [
      { name: "Next.js", note: "App Router. the one framework that makes full-stack feel like one thing." },
      { name: "React", note: "components all the way down. sometimes that's a feature." },
      { name: "Tailwind CSS", note: "utility classes, dark mode variables, no style fights with teammates." },
      { name: "Recharts", note: "for data viz that doesn't require a design degree." },
      { name: "Framer Motion", note: "animations that feel like they were meant to be there." },
    ],
  },
  {
    label: "databases",
    items: [
      { name: "PostgreSQL", note: "the default. relational, reliable, never surprised me badly." },
      { name: "MySQL", note: "when the hosting is opinionated." },
      { name: "Supabase", note: "Postgres with an API. caching SkipTheTerms on this cut costs 40%." },
      { name: "MongoDB", note: "for when the schema is a moving target and you've accepted that." },
      { name: "Redis", note: "in-memory. used for rate limiting. very fast. very ephemeral." },
    ],
  },
  {
    label: "analytics",
    items: [
      { name: "GA4", note: "11-event funnel on ChannelSpy. 'users visited' isn't analytics." },
      { name: "Microsoft Clarity", note: "heatmaps and session replays. see where users actually click vs where you think they click." },
    ],
  },
  {
    label: "tools & editor",
    items: [
      { name: "Cursor", note: "AI-first editor. this site was built in it." },
      { name: "Vercel", note: "deploy in 30 seconds. the answer to 'where do I host this' 90% of the time." },
      { name: "Git / GitHub", note: "version control and public proof of work. same thing." },
      { name: "Linux / zsh", note: "terminal-first workflow. tab completion is load-bearing." },
    ],
  },
];
