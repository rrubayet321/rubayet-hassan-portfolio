export type Analysis = {
  id: string;
  title: string;
  product: string;
  date: string;
  tags: string[];
  excerpt: string;
  body: string;
  relatedProject: { label: string; href: string };
};

export const analyses: Analysis[] = [
  {
    id: "youtube-analytics-gap",
    title: "Why YouTube has no native competitor analytics",
    product: "YouTube Studio",
    date: "April 2026",
    tags: ["product gap", "deliberate design", "why i built channelspy"],
    excerpt:
      "YouTube Studio shows your own metrics in excruciating, beautiful detail. It tells you absolutely nothing about anyone else's. That's not an oversight — it's a deliberate strategic moat. Here's what that gap looks like from the outside.",
    body: `YouTube Studio is genuinely well-designed for what it does. The dashboards are clean. The audience retention graph might be the most actionable analytics view I've seen outside paid enterprise tools. It is, by most measures, good software.

But there's one enormous blind spot built into it by design: you cannot see anyone else's numbers. Not a competitor's view count trend. Not their upload cadence. Not even a rough ballpark of what a sponsored post in your niche is worth.

This is not a technical limitation. YouTube has all of this data. The decision is strategic.

Surfacing competitor metrics would push creators into a pure imitation loop — copy whatever's working, chase whoever's winning, race to someone else's ceiling. YouTube would rather you focused inward. The algorithm rewards genuine quality over engineered virality, and surfacing rival stats would undermine that nudge. Better content beats copied content. YouTube's growth depends on that being true.

The side effect is a genuine market gap. Agencies running brand deals, independent creators pricing their sponsorships, and marketers benchmarking a niche have no native tool. They're screenshotting Social Blade and building spreadsheets.

That's exactly why ChannelSpy exists. Not to spy — great name though — but to give context. Knowing that channels in your niche average 40K views per video changes how you set goals, pitch clients, and decide what's worth building.

The lesson that stuck: the most interesting products don't live where the obvious problems are. They live in the gaps left by someone else's deliberate strategic choice.`,
    relatedProject: {
      label: "ChannelSpy",
      href: "https://channelspy.vercel.app",
    },
  },
  {
    id: "llm-chrome-extension-ux",
    title: "The UX problem with AI browser extensions",
    product: "Chrome Extension ecosystem",
    date: "March 2026",
    tags: ["UX", "latency is design", "why i built skiptheterms"],
    excerpt:
      "Most AI Chrome extensions make you open a panel, paste text, click a button, wait, read the result, close the panel, and return to the page. That's five steps. For a problem that should take one. Building SkipTheTerms taught me what zero-friction actually means.",
    body: `The dominant UX pattern for AI browser extensions goes like this: notice the problem → click extension icon → panel opens → paste or select text → click summarise → wait → read result → close panel → return to page → realise you lost context.

That's eight steps. For a tool that exists to save you time.

The core insight behind SkipTheTerms was simple: the trigger — landing on a Terms of Service page — is completely predictable. The URL contains /terms, /privacy, /legal. The page title says it. The extension doesn't need to wait for the user to initiate anything. It can detect the context automatically, pre-trigger the summarisation in the background, and surface the result with a single badge. No panel. No copy-paste. No mental context switch.

This collapsed the interaction: arrive at terms page → see badge → click once → read summary.

The backend had to match this UX promise. If the summary takes 8 seconds, the friction isn't gone — it's just relocated. Supabase caching on document hash was the fix. Cache hits return in 50ms. Fast enough to feel instant. Not fast. Instant. There's a difference, and users can feel it.

The thing I most underestimated: backend latency isn't just an engineering metric. It is a UX decision. Every second a user waits is a second they're thinking about the wait, not the result.

Zero-friction doesn't mean fewer features. It means removing the distance between the problem and the answer.`,
    relatedProject: {
      label: "SkipTheTerms",
      href: "https://github.com/rrubayet321/skiptheterms",
    },
  },
  {
    id: "llm-cost-reality",
    title: "You're probably spending 10× more on LLM calls than you need to",
    product: "LLM API economics",
    date: "February 2026",
    tags: ["cost optimisation", "caching", "what nobody tells you"],
    excerpt:
      "Everyone argues about which LLM to use. Nobody talks about how to stop calling it 40 times for the same document. Here's what building SkipTheTerms taught me about the most underrated decision in LLM engineering: just cache it.",
    body: `When I first launched SkipTheTerms, every request hit the Groq API fresh. Llama 3.3 70B, every time, for every user, for every document. Clean. Expensive. Stupid.

The problem became obvious fast: Terms of Service documents don't change. The same GDPR policy gets read by hundreds of users. I was paying API credits to summarise an identical 5,000-word document dozens of times a day. Different users. Same document. Same result.

The fix was two hours of work: hash the document content on arrival, check Supabase for an existing summary, return it if found, call the LLM if not, store the result. Cache hit rate hit 70% within the first week.

Cost reduction: 40%. Latency on cache hits: 50ms vs ~3 seconds cold. User experience: the thing felt instant on the majority of requests.

The broader point is that most LLM applications have natural caching surfaces — repeated queries, identical documents, common prompts — and most developers skip them entirely because they're thinking about model quality rather than call frequency.

The uncomfortable truth: a worse model with a cache is often a better product than a better model without one. Your users probably cannot distinguish GPT-4o from Llama 3.3 70B on a summarisation task. They can absolutely tell the difference between 50ms and 3 seconds.

Optimise for the experience, not the benchmark.`,
    relatedProject: {
      label: "SkipTheTerms",
      href: "https://github.com/rrubayet321/skiptheterms",
    },
  },
];
