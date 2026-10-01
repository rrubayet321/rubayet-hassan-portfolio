export type Analysis = {
  id: string;
  title: string;
  date: string;
  dateTime: string;
  topic: string;
  excerpt: string;
  body: string[];
  relatedProjectId: string;
};
export const analyses: Analysis[] = [
  {
    id: "youtube-analytics-gap",
    title: "The useful space between analytics and context",
    date: "April 2026",
    dateTime: "2026-04",
    topic: "Product thinking",
    excerpt:
      "What building ChannelSpy taught me about turning public data into a useful point of comparison.",
    body: [
      "Your own numbers answer one set of questions. Knowing how other public channels perform answers another: what is typical in a niche, how consistent are uploads, and how much does an unusual spike change the picture?",
      "Building ChannelSpy started with that need for context. Public channel data is available, but gathering it and turning it into a comparison takes work. A dashboard can make that process easier if it chooses the right comparisons.",
      "The important decision was to look at typical performance. A mean can be heavily influenced by one unusually popular upload. Median-based scoring and outlier detection offer a different view: what the channel tends to do, rather than what happened on its best day.",
      "I cannot speak for why a platform includes or omits a feature. My takeaway is narrower: there can be useful products in the work people do between existing tools. Finding that work starts with watching how someone tries to answer a question.",
      "The interface is only part of the solution. A clear benchmark, an honest explanation of what it measures, and an export someone can use elsewhere are what make the report useful.",
    ],
    relatedProjectId: "channelspy",
  },
  {
    id: "llm-chrome-extension-ux",
    title: "Latency is part of the interface",
    date: "March 2026",
    dateTime: "2026-03",
    topic: "Interaction design",
    excerpt:
      "An AI feature should fit the moment it is needed. Preparing an answer can matter more than adding another button.",
    body: [
      "An extension can solve a useful problem and still interrupt the person using it. Open a panel, select text, trigger a request, wait, and return to the page: each step asks for attention.",
      "With SkipTheTerms, the page itself provides a clue about what someone needs. A terms or privacy page can be recognized from its context. That makes it possible to prepare a summary in the background instead of waiting for a manual request.",
      "This changes the interaction, but it also changes the engineering requirements. Background work needs limits, clear failure states, and a sensible rule for when to run. A fast interface should not imply that every request succeeded.",
      "Caching unchanged documents helps the backend support the same idea. Reusing an available summary removes unnecessary generation work. The useful question is not only how fast the model responds; it is how long someone waits before the result becomes useful.",
      "My lesson was to design the trigger and the waiting state together. A model call is part of a longer interaction, and the experience depends on the whole sequence.",
    ],
    relatedProjectId: "skiptheterms",
  },
  {
    id: "llm-cost-reality",
    title: "Before choosing a faster model, check the cache",
    date: "February 2026",
    dateTime: "2026-02",
    topic: "AI engineering",
    excerpt:
      "Repeated documents are an opportunity to avoid repeated work. A small lesson from building SkipTheTerms.",
    body: [
      "Model selection gets a lot of attention. Call frequency deserves some too. If different people request the same transformation of an unchanged document, generating the same answer repeatedly may be unnecessary.",
      "SkipTheTerms uses a hash of the document content to identify that opportunity. The backend looks for an existing summary before making a new request. A changed document produces a different hash, so an old summary is not automatically reused for new content.",
      "A cache also needs a definition of what makes two requests equivalent. The prompt, model, language, and output format can affect the answer. In a growing system, those choices belong in the cache identity or its invalidation rules.",
      "This is not a claim that caching solves every AI workload. Personalized or time-sensitive requests need different treatment. The point is to look for the repeated work your specific product creates.",
      "My default question now is simple: does this request need a new generation? Sometimes the better engineering decision is to return work the system has already done.",
    ],
    relatedProjectId: "skiptheterms",
  },
];
