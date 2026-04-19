/** Founder-facing thesis summary — no full PDF in public; figures optional under /thesis/ */
export const thesisSummary = {
  problem:
    "Roughly 57 million people live with dementia; many wait years for an accurate diagnosis. Frontotemporal dementia is misdiagnosed as a psychiatric disorder in up to half of cases — wrong label, wrong treatment, years lost.",
  approach:
    "C‑MAT: a cross-modal attention system that jointly uses brain imaging and EEG-style signals to distinguish Alzheimer’s disease, frontotemporal dementia, and Parkinson’s — designed to stay useful when part of the data is missing.",
  outcome:
    "Training landed around ~$6 on commodity setups; evaluated across 1,102 subjects, 10 datasets, and 7 countries. Not a replacement for neurologists — a faster second opinion. Still early research, but directionally promising.",
  /** Set to a path under public/ when you add a figure, e.g. "/thesis/architecture.svg" */
  figureSrc: null as string | null,
  figureCaption: "Key diagram or result — add when you publish a vetted asset.",
} as const;
