# Rubayet Hassan — Portfolio

Source for [rubayethassan.com](https://rubayethassan.com). A Next.js App Router site: dark-first UI, command palette navigation, and content driven from TypeScript modules under `src/lib/`.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS v4, Framer Motion
- **Theming:** `next-themes` (light / dark)

## Requirements

- Node.js 20+
- npm (or compatible client)

## Setup

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with your values (see below), then:

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server (webpack) |
| `npm run dev:turbo` | Development with Turbopack |
| `npm run dev:clean` | Remove `.next` then start dev (if build cache is corrupt) |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | ESLint |

## Environment variables

| Variable | Required for production | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL, no trailing slash (e.g. `https://rubayethassan.com`). Used for metadata and absolute links. |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID. If unset, analytics scripts are not loaded. |

## Content and data

Copy and page copy live in `src/lib/*.ts` (projects, about, analysis, uses, photos, now, etc.). Update those files to change what appears on the site.

| Area | Primary file |
| --- | --- |
| Home “now” strip | `src/lib/now.ts` |
| About | `src/lib/about.ts` |
| Projects and case studies | `src/lib/projects.ts` |
| Analysis / notes | `src/lib/analysis.ts` |
| Uses / stack | `src/lib/uses.ts` |
| Photo captions | `src/lib/photos.ts` |

**Static assets:** place files under `public/` (e.g. resume PDF, project screenshots, `public/photos/*`). Rich text in some fields supports inline markers (see comments in `src/lib/projects.ts` and `src/components/RichInline.tsx`).

## Routes

| Path | Description |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/projects` | Project index |
| `/projects/[id]` | Case study (where defined) |
| `/analysis`, `/analysis/[id]` | Product notes |
| `/uses` | Stack / tools |
| `/photos` | Photo grid |
| `/contact` | Contact |
| `/resume` | Resume download / link |

## Deployment

```bash
npm run build
```

Deploy on [Vercel](https://vercel.com) or any host that supports Next.js. Set `NEXT_PUBLIC_SITE_URL` to your production domain in the host’s environment variables.

## Shortcuts (in the running app)

- **⌘K** / **Ctrl+K** — command palette (navigation and quick actions)
- **?** — shortcut help overlay
- **Esc** — close modals / palette
