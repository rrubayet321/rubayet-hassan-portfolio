# Rubayet Hassan — Portfolio

A dark editorial portfolio for Rubayet Hassan, AI Software Engineer building [StorageAtlas](https://storageatlas.co/). Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion. All fonts and visual assets are served locally.

## Local development

Use Node.js 22 or newer (Lighthouse requires Node 22.19+).

```bash
npm ci
npm run dev
```

Development runs at http://127.0.0.1:3000. The scripts do not stop other processes using that port.

For the production preview and browser tests:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3001
```

Keep that server running while using the local preview. There is no automatic publishing or GitHub push.

## Content and design

| Content | Source |
| --- | --- |
| Identity, business positioning, current role, contact | `src/lib/profile.ts` |
| Project order, headlines, summaries, links, case studies | `src/lib/projects.ts` |
| Notes and existing article slugs | `src/lib/analysis.ts` |
| Photo captions | `src/lib/photos.ts` |
| Shared motion timing and easing | `src/lib/motion.ts` |
| Palette, responsive layout, interactions | `src/app/globals.css` |

The introduction explains the goal of building software and AI products that help businesses work smarter, serve customers, and grow revenue. It does not claim measured revenue gains. Employer details stay within the supplied platform, website, dialer, production maintenance, and technical planning responsibilities.

The hero uses **創造 (sōzō, creation)** as a large typographic motif. A 2.3 KB Noto Sans JP subset contains only the two glyphs, with its open font license in `src/assets/fonts/`. Geist Sans/Mono are locally bundled through the `geist` package. Social previews also use local font files, so neither build nor runtime requires Google Fonts.

Project presentation is entirely typographic. Product titles and actions go directly to their supplied GitHub repositories; screenshots and interface covers have been removed from the displayed portfolio. C-MAT retains its research page and original architecture figure because no repository URL has been provided. Existing case-study URLs remain accessible. Mark projects `featured` to include them on the homepage in the central list's order.

Motion includes staggered kanji entrances, an outline echo, path drawing, an RH stamp, desktop pointer movement capped at 8px, once-only reveals and section rules, drawn capability icons, navigation feedback, project arrows, and reading progress. Entrances settle within five seconds. Reduced motion disables animation, pointer movement, and reading progress. Written content and direct links remain available without JavaScript.

## Pages

- `/`: introduction, current work, business focus, selected projects, research, background, notes, contact.
- `/projects`: three products linking to GitHub and a separate research collection.
- `/projects/channelspy`, `/projects/skiptheterms`, `/projects/ummahspeaks`, `/projects/cmat`: retained case studies.
- `/analysis` and the three original article URLs: notes.
- `/photos`: native dialog, keyboard navigation, image-link fallback, focus restoration.
- `/resume`: original PDF and direct open/download links; excluded from indexing.
- `/about` and `/contact`: permanent redirects to homepage anchors.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium firefox webkit
npm run test:e2e
npm run audit:performance
npm audit
```

Playwright runs Chromium, Firefox, and WebKit against port 3001. Set `PLAYWRIGHT_BASE_URL` for another local preview. Reports and screenshots stay in Git-ignored `artifacts/` and `playwright-report/`.

Coverage includes all routes, redirects, internal links, 320px through desktop and landscape layouts, touch, no JavaScript, reduced motion, clipboard denial, missing photos/fonts, delayed fonts, browser history, PDF download, keyboard navigation, GitHub destinations, finite motion, and axe accessibility scans. macOS WebKit uses Option+Tab to visit links, following Safari's keyboard preference.

Lighthouse uses its simulated mobile profile. Results are local lab measurements; see `VALIDATION.md` for the current results.

## Environment and dependencies

`NEXT_PUBLIC_SITE_URL` defaults to `https://rubayethassan.com` for canonical URLs and the sitemap. Optional `NEXT_PUBLIC_GA_ID` enables the existing Google Analytics integration; it stays off when unset.

Compatible patches retain Next.js 15. A PostCSS 8.5.28 override replaces its older nested version. The original resume may predate the current role. No employer dates, employer technologies, or performance metrics have been invented.

References: [Muhib Waqar](https://muhibwaqar.com/) for concise dark presentation and [Shayaan Azeem](https://www.shayaanazeem.com/) for a direct personal introduction and purposeful project descriptions. The typography and visual identity are original to this portfolio.
