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
};

export const projects: Project[] = [
  {
    id: "channelspy",
    title: "ChannelSpy",
    subtitle: "YouTube competitor intelligence — for people who hate guessing",
    description:
      "Converts any YouTube channel URL into a full performance report — KPIs, trend charts, estimated earnings, and CSV export in ~15 seconds. Server-side route handlers protect API keys. Median-based scoring with IQR outlier detection means one viral video doesn't skew the whole benchmark. 11-event GA4 funnel because 'users visited' isn't analytics.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "YouTube Data API v3",
      "Recharts",
      "GA4",
      "Vercel",
    ],
    type: "product",
    live: "https://channelspy.vercel.app",
    github: "https://github.com/rrubayet321/channelspy",
    stat: "11-event GA4 funnel · IQR outlier scoring · ~15s to full report",
  },
  {
    id: "ummahspeaks",
    title: "Ummah Speaks",
    subtitle: "AI Islamic companion — emotional intent, sub-2s latency",
    description:
      "Detects what you're actually feeling (not just what you typed) and responds with personalised Islamic reflections via Llama 3. In-memory rate limiting so a weekend of traffic doesn't cost $400. Privacy-first local storage because some conversations aren't for the cloud — and that's not a bug.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Groq API",
      "Llama 3",
      "Tailwind CSS 4",
    ],
    type: "product",
    live: "https://ummahspeaks.vercel.app",
    github: "https://github.com/rrubayet321/ummahspeaks",
    stat: "sub-2s latency · emotional intent detection · zero server-side storage",
  },
  {
    id: "skiptheterms",
    title: "SkipTheTerms",
    subtitle: "AI Terms of Service summarizer — because life is short",
    description:
      "Chrome Extension + FastAPI backend that reads the Terms of Service so you don't have to. Llama 3.3 70B in under 3 seconds cold. Supabase caching on document hash: cache hits return in 50ms, cutting LLM costs 40%. Turns out the best LLM optimization is not calling the LLM.",
    tags: [
      "FastAPI",
      "Python",
      "Manifest V3",
      "Supabase",
      "Groq API",
      "Llama 3.3 70B",
    ],
    type: "product",
    live: null,
    github: "https://github.com/rrubayet321/skiptheterms",
    stat: "50ms cache hits · 40% cost reduction · <3s cold",
  },
  {
    id: "ganvae",
    title: "Hybrid GAN-VAE",
    subtitle: "Generative dialogue model — 329% BLEU-4 improvement (yes, really)",
    description:
      "Hybrid GAN-VAE architecture for IT support dialogue. Cut redundant responses from 98% to 2% — the baseline was essentially saying the same thing 49 out of 50 times. Added SHAP explainability so you can see why the model said what it said. Deployed via containerised FastAPI.",
    tags: ["PyTorch", "FastAPI", "Docker", "SHAP", "Python"],
    type: "research",
    live: null,
    github: "https://github.com/rrubayet321/ganvae",
    stat: "329% BLEU-4 improvement · 98%→2% redundancy · SHAP explainability",
  },
];
