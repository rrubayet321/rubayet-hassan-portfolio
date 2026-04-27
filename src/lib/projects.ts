export type CaseStudy = {
  problem: string;
  approach: string;
  decisions: { title: string; body: string }[];
  metrics: { label: string; value: string }[];
  learnings: string;
};

/** In subtitle/description/stat: `**bold**` and `{{purple}}highlight{{/}}` (variants: a–e, purple, blue, green, maroon, orange). See RichInline. */

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  type: "product" | "research";
  live: string | null;
  github: string | null;
  stat: string;
  image?: string;
  /** Multiple full-fidelity screenshots (e.g. real app captures), shown in order */
  images?: string[];
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: "channelspy",
    title: "ChannelSpy",
    subtitle:
      "YouTube **competitor intelligence** — for people who hate guessing",
    description:
      "Converts any YouTube channel URL into a full performance report — **KPIs**, trend charts, estimated earnings, and CSV export in {{blue}}~15 seconds{{/}}. Server-side route handlers protect **API keys**. Median-based scoring with IQR outlier detection means one viral video doesn't skew the whole benchmark. **11-event** {{purple}}GA4{{/}} funnel — because \"users visited\" isn't analytics.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "YouTube Data API v3",
      "Recharts",
      "GA4",
      "Vercel",
    ],
    type: "product",
    image: "/projects/channelspy-2-trends.png",
    live: "https://channelspy.vercel.app",
    github: "https://github.com/rrubayet321/channelspy",
    stat: "**11-event** {{purple}}GA4{{/}} funnel · IQR outlier scoring · **~15s** to full report",
    caseStudy: {
      problem:
        "YouTube Studio is well-designed for your own analytics and completely silent about everyone else's. That's deliberate — showing competitor data would push creators into pure imitation loops. The side effect: agencies, independent creators, and marketers pricing sponsorships had no native tool. They were screenshotting Social Blade.",
      approach:
        "A full-stack SaaS dashboard that accepts any YouTube channel URL and returns a complete performance report in under 15 seconds. The backend calls the YouTube Data API v3, applies median-based scoring with IQR outlier detection to handle viral outliers, and returns structured JSON. The frontend renders interactive Recharts visualisations and exports to CSV.",
      decisions: [
        {
          title: "Server-side API calls only",
          body: "API keys never touch the client. All YouTube Data API v3 calls happen in Next.js route handlers. Not clever engineering — just not leaking credentials.",
        },
        {
          title: "Median + IQR scoring, not mean",
          body: "One viral video can make a dead channel look healthy if you average views. Median-based scoring with IQR outlier detection means the benchmark reflects typical performance, not lucky performance.",
        },
        {
          title: "11-event GA4 instrumentation",
          body: "Tracking: URL submitted, report generated, chart interacted, CSV exported, and 7 others. 'Users visited' is vanity. Knowing 60% of users export CSV tells you what they actually value.",
        },
      ],
      metrics: [
        { label: "Report generation time", value: "~15 seconds" },
        { label: "GA4 funnel events", value: "11 events" },
        { label: "Scoring method", value: "Median + IQR outlier detection" },
      ],
      learnings:
        "The most interesting products don't live where the obvious problems are. They live in the gaps left by someone else's deliberate strategic choice. YouTube not showing competitor stats isn't an oversight — it's a moat. Understanding why a feature doesn't exist is more useful than copying one that does.",
    },
  },
  {
    id: "ummahspeaks",
    title: "Ummah Speaks",
    subtitle:
      "AI Islamic companion — **emotional intent**, {{green}}sub-2s latency{{/}}",
    description:
      "Detects what you're **actually feeling** (not just what you typed) and responds with personalised Islamic reflections via **Llama 3**. In-memory rate limiting so a weekend of traffic doesn't cost **$400**. {{maroon}}Privacy-first{{/}} local storage — some conversations aren't for the cloud, and that's not a bug.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Groq API",
      "Llama 3",
      "Tailwind CSS 4",
    ],
    type: "product",
    image: "/projects/ummah-speaks-1-reflect.png",
    live: "https://ummahspeaks.vercel.app",
    github: "https://github.com/rrubayet321/ummahspeaks",
    stat: "{{green}}sub-2s{{/}} latency · **emotional intent** · **zero** server-side storage",
    caseStudy: {
      problem:
        "Most AI chatbots respond to the literal text you send. If you type 'I'm struggling', they respond to the word 'struggling'. Emotional intent is different — the same words mean different things depending on context, exhaustion level, and what you're not saying. For an Islamic companion specifically, this distinction matters: a person venting needs a different response than a person seeking guidance.",
      approach:
        "A serverless Next.js app that classifies emotional intent before generating a response. The Groq API runs Llama 3 inference. In-memory rate limiting prevents weekend traffic from becoming a billing surprise. All conversation history is stored in localStorage — deliberately. No database, no user data, no GDPR problem.",
      decisions: [
        {
          title: "Emotional intent classification first",
          body: "Before generating any response, the app classifies the user's message into one of several intent categories (venting, seeking guidance, expressing gratitude, etc.). The response prompt changes based on the classification. This is the thing that makes responses feel like they understood you.",
        },
        {
          title: "In-memory rate limiting, no Redis",
          body: "A proper rate limiter would use Redis. This app uses an in-memory Map keyed by IP. Resets on server restart. For a free-tier serverless app without a persistent database, this is the right tradeoff — it handles real traffic without adding infrastructure costs.",
        },
        {
          title: "localStorage for conversation history",
          body: "Every message stays on the user's device. No backend storage. This is a privacy decision first — some conversations shouldn't be in a database — and a simplicity decision second. No auth, no user management, no compliance headache.",
        },
      ],
      metrics: [
        { label: "Response latency", value: "< 2 seconds" },
        { label: "Server-side storage", value: "zero" },
        { label: "External database", value: "none" },
      ],
      learnings:
        "Privacy-first isn't a compromise — it's a feature. Telling users their conversations never leave their device is a selling point, not a limitation. And in-memory rate limiting is underrated: it handles real production traffic on a free tier without adding any infrastructure.",
    },
  },
  {
    id: "skiptheterms",
    title: "SkipTheTerms",
    subtitle:
      "AI **Terms of Service** summarizer — because life is short",
    description:
      "Chrome Extension + **FastAPI** backend that reads the Terms of Service so you don't have to. **Llama 3.3 70B** in under {{blue}}3 seconds{{/}} cold. Supabase caching on document hash: cache hits return in {{green}}50ms{{/}}, cutting LLM costs **40%**. The best LLM optimization is not calling the LLM.",
    tags: [
      "FastAPI",
      "Python",
      "Manifest V3",
      "Supabase",
      "Groq API",
      "Llama 3.3 70B",
    ],
    type: "product",
    image: "/projects/skiptheterms.png",
    live: null,
    github: "https://github.com/rrubayet321/skiptheterms",
    stat: "{{green}}50ms{{/}} cache hits · **40%** cost reduction · **<3s** cold",
    caseStudy: {
      problem:
        "The dominant UX pattern for AI browser extensions is broken: notice problem → open panel → paste text → click button → wait → read result → close panel → return to page → realise you lost context. Eight steps. For a tool that exists to save time. Terms of Service pages are fully predictable — the URL contains /terms or /privacy, the page title says it. The trigger is automatic. The extension shouldn't wait for you to initiate anything.",
      approach:
        "A Chrome Extension (Manifest V3) that detects Terms of Service pages automatically, pre-triggers summarisation in the background, and surfaces the result as a badge — one click. The FastAPI backend receives the document text, hashes it, checks Supabase for an existing summary, returns it if found, calls Llama 3.3 70B via Groq if not, and stores the result. Cold calls take under 3 seconds. Cache hits: 50ms.",
      decisions: [
        {
          title: "Auto-detect + background summarisation",
          body: "The extension doesn't wait for you to click 'summarise'. It detects the page context from the URL and title, triggers the backend call in the background, and shows a badge when ready. The interaction collapses to: arrive → see badge → click once → read. Four steps, not eight.",
        },
        {
          title: "Document hash caching via Supabase",
          body: "Every Terms of Service document gets hashed on arrival. If Supabase has a summary for that hash, return it. Skip the LLM entirely. This hit a 70% cache rate within the first week — because the same GDPR policy gets read by hundreds of users. Cost reduction: 40%. Latency on cache hits: 50ms.",
        },
        {
          title: "Llama 3.3 70B for accuracy",
          body: "Summarising legal documents requires a capable model — smaller models miss nuance and produce summaries that technically describe the document but miss the dangerous clauses. Llama 3.3 70B via Groq hits the accuracy bar without the GPT-4o price tag.",
        },
      ],
      metrics: [
        { label: "Cold call latency", value: "< 3 seconds" },
        { label: "Cache hit latency", value: "50ms" },
        { label: "LLM cost reduction", value: "40%" },
        { label: "Cache hit rate (week 1)", value: "~70%" },
      ],
      learnings:
        "Backend latency isn't just an engineering metric — it's a UX decision. Every second a user waits is a second they're thinking about the wait, not the result. And the best LLM optimisation is not calling the LLM: a worse model with a cache is often a better product than a better model without one.",
    },
  },
];
