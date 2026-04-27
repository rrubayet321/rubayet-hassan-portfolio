# Rubayet Hassan — Portfolio

Personal portfolio built with Next.js 15, React 19, Tailwind CSS v4, and Framer Motion. Dark-default, minimal, color-highlighted.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (for prod) | Your deployed URL, no trailing slash. e.g. `https://rubayethassan.com` |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`). Omit entirely to disable analytics — no script ships without this. |

## Content checklist — drop your real files here

Before deploying, replace these placeholders:

- [ ] **Resume PDF** — overwrite `public/Rubayet_Hassan_Resume.pdf` with your actual PDF
- [ ] **Photos** — replace `public/photos/01.jpg` through `12.jpg` with your real photos. Captions live in `src/lib/photos.ts`

## Site map

| Route | Source |
|---|---|
| `/` | `src/app/page.tsx` — home, "now" strip, photo strip |
| `/about` | `src/app/about/page.tsx` + `src/lib/about.ts` |
| `/projects` | `src/app/projects/page.tsx` — expandable project cards |
| `/projects/[id]` | `src/app/projects/[id]/page.tsx` — case study detail |
| `/analysis` | `src/app/analysis/page.tsx` — product notes list |
| `/analysis/[id]` | `src/app/analysis/[id]/page.tsx` — note detail |
| `/uses` | `src/app/uses/page.tsx` + `src/lib/uses.ts` |
| `/photos` | `src/app/photos/page.tsx` — masonry grid |
| `/contact` | `src/app/contact/page.tsx` — copy email + form |
| `/resume` | `src/app/resume/page.tsx` — embedded PDF viewer |

## Content files (update these to keep the site fresh)

| File | What it controls |
|---|---|
| `src/lib/now.ts` | "what I'm doing now" strip on the home page — update monthly |
| `src/lib/about.ts` | Bio, education, experience, competitions, languages, philosophy |
| `src/lib/projects.ts` | Project cards + case studies |
| `src/lib/analysis.ts` | Product notes / teardowns |
| `src/lib/uses.ts` | Stack with editorial notes |
| `src/lib/photos.ts` | Photo captions |

## Builder easter eggs

- **⌘K** — command palette: jump to any page, copy email, toggle theme, download resume
- **?** — keyboard shortcuts overlay
- **3× click on RH monogram** — "you found me. probably at the gym."
- **Konami code** — up up down down left right left right B A

## Deploy

```bash
npm run build
```

Deploy to Vercel in one command:

```bash
npx vercel
```

Set `NEXT_PUBLIC_SITE_URL` in your Vercel project environment variables to your production domain.
