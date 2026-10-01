export type CaseStudy = {
  problem: string;
  contribution: string;
  decisions: { title: string; body: string }[];
  learnings: string;
};
export type Project = {
  id: string;
  title: string;
  category: string;
  headline: string;
  summary: string;
  tags: string[];
  type: "product" | "research";
  live: string | null;
  github: string | null;
  featured: boolean;
  caseStudy: CaseStudy;
  figure?: { src: string; alt: string; caption: string };
};
export const projects: Project[] = [
  {
    id: "channelspy",
    title: "ChannelSpy",
    category: "Creator intelligence",
    headline: "Less guessing. Better content decisions.",
    summary:
      "A clearer picture of how a YouTube channel is performing. From a channel URL to trends, benchmarks, and exportable insights.",
    tags: ["Next.js", "YouTube Data API", "Recharts"],
    type: "product",
    live: "https://channelspy.vercel.app",
    github: "https://github.com/rrubayet321/channelspy",
    featured: true,
    caseStudy: {
      problem:
        "Creators and agencies need context beyond their own analytics. Comparing public channel data manually means collecting numbers, dealing with unusual spikes, and turning a spreadsheet into something useful.",
      contribution:
        "I built a full-stack dashboard that turns a YouTube channel URL into a structured performance report. Server-side handlers retrieve public data; the interface presents trends and benchmarks with interactive charts and CSV export.",
      decisions: [
        {
          title: "Keep credentials on the server",
          body: "YouTube API requests run through server-side handlers. The browser receives the report it needs, rather than the credentials used to retrieve it.",
        },
        {
          title: "Measure typical performance",
          body: "Median-based scoring and interquartile-range outlier detection reduce the influence of unusually viral uploads. The aim is a useful baseline rather than an impressive average.",
        },
        {
          title: "Make the report usable elsewhere",
          body: "Charts help people explore the data; CSV export lets them use it in their own workflow. Instrumenting meaningful actions helps distinguish a visit from actual use.",
        },
      ],
      learnings:
        "A dashboard earns its place when it helps someone make a decision. Choosing a sensible benchmark and making the result portable mattered as much as drawing the charts.",
    },
  },
  {
    id: "skiptheterms",
    title: "SkipTheTerms",
    category: "AI browser extension",
    headline: "The fine print, without the friction.",
    summary:
      "An AI-assisted way to understand Terms of Service. Detect the page, reuse an existing summary, and make the important parts easier to read.",
    tags: ["FastAPI", "Supabase", "Groq"],
    type: "product",
    live: null,
    github: "https://github.com/rrubayet321/skiptheterms",
    featured: true,
    caseStudy: {
      problem:
        "Terms pages are long and easy to skip. A summarization tool adds its own friction if it requires someone to copy text, open another interface, and wait for an answer.",
      contribution:
        "I built a Manifest V3 Chrome extension and a FastAPI backend. The extension recognizes relevant pages and requests a summary in the background. The backend checks a document-hash cache in Supabase before calling Llama through Groq.",
      decisions: [
        {
          title: "Start from the page context",
          body: "Use the URL and page title to identify likely terms pages. Background preparation makes the summary available closer to the moment it is needed.",
        },
        {
          title: "Cache the document, not the user",
          body: "A content hash identifies an unchanged document. Reusing its existing summary avoids doing the same work for each reader; a changed document gets a new hash.",
        },
        {
          title: "Treat the summary as assistance",
          body: "The original document remains the source. A readable summary helps someone orient themselves, but it does not replace the terms or a careful review.",
        },
      ],
      learnings:
        "Latency is part of the interaction. Often the most useful optimization is recognizing work that has already been done, then removing the steps between the question and its answer.",
    },
  },
  {
    id: "ummahspeaks",
    title: "Ummah Speaks",
    category: "Faith & reflection",
    headline: "A little clarity. A moment to reflect.",
    summary:
      "An Islamic reflection companion designed around the intention behind a message, with a calm interface and conversation history stored locally.",
    tags: ["Next.js", "Llama", "Groq"],
    type: "product",
    live: "https://ummahspeaks.vercel.app",
    github: "https://github.com/rrubayet321/ummahspeaks",
    featured: false,
    caseStudy: {
      problem:
        "The same words can come from someone seeking guidance or someone who simply wants to be heard. A reflection companion needs to account for that difference in its responses and its interface.",
      contribution:
        "I built a Next.js application that classifies a message's intent before generating an Islamic reflection using Llama through Groq. It stores conversation history in the browser and applies rate limiting to incoming requests.",
      decisions: [
        {
          title: "Classify intent before responding",
          body: "The response prompt changes with the message's intent. This offers a more deliberate starting point than treating every message as the same kind of request.",
        },
        {
          title: "Keep history local",
          body: "Conversation history is stored in localStorage rather than a server-side database. Messages still go to the inference service to generate responses; local history does not mean local inference.",
        },
        {
          title: "Keep infrastructure proportional",
          body: "An in-memory rate limiter limits bursts without another service. It has deployment-dependent limitations, including resets and separate server instances, so it is a tradeoff rather than a complete abuse-prevention system.",
        },
      ],
      learnings:
        "Intent, tone, and restraint shape the experience as much as the model does. Privacy descriptions should also make the distinction between storing a conversation and processing a message clear.",
    },
  },
  {
    id: "cmat",
    title: "C-MAT",
    category: "Multimodal machine learning",
    headline: "Different signals. A shared understanding.",
    summary:
      "Undergraduate research exploring how brain imaging and EEG representations can work together through cross-modal attention and gated fusion.",
    tags: ["Multimodal ML", "Cross-modal attention", "Gated fusion"],
    type: "research",
    live: null,
    github: null,
    featured: false,
    figure: {
      src: "/projects/cmat.png",
      alt: "Detailed C-MAT architecture with MRI and EEG inputs, encoders, representations, cross-modal fusion, and classification outputs.",
      caption:
        "The research architecture: separate representations, cross-modal fusion, and a shared classification output.",
    },
    caseStudy: {
      problem:
        "Different signals describe different aspects of a subject. Combining them requires more than putting their features beside one another, particularly when the available data is incomplete.",
      contribution:
        "My undergraduate research explored a multimodal framework combining structural MRI and resting-state EEG representations. Cross-modal attention and gated fusion form the connection between the modalities and the classification stage.",
      decisions: [
        {
          title: "Represent each modality deliberately",
          body: "The architecture separates input representations before fusion, allowing the system to retain the different structure of imaging and signal data.",
        },
        {
          title: "Learn the connection between signals",
          body: "Cross-modal attention examines relationships between the representations. Gated fusion controls their contribution to the shared representation.",
        },
        {
          title: "Consider missing information",
          body: "Missing-modality support is part of the research design. This work is an experimental machine-learning study, with no claim of clinical validation or deployment.",
        },
      ],
      learnings:
        "Research taught me to pay attention to the assumptions around a result: what data is available, what a model can actually support, and what would need to be established before practical use.",
    },
  },
];
export const featuredProjects = projects.filter((project) => project.featured);
