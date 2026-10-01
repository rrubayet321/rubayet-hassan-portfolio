# Portfolio redesign — validation report

Validated locally on 1 October 2026 after the typography, project presentation, business positioning, motion revisions, and Contact consolidation. Preview: [http://127.0.0.1:3001](http://127.0.0.1:3001).

## Delivered

- Charcoal, ivory, and copper editorial layout; locally bundled Geist Sans/Mono; Georgia italic accents; RH identity mark.
- Replaced the abstract metallic artwork with animated **創造 (sōzō, creation)** typography. The word's meaning is supported by the [Cambridge Japanese–English Dictionary](https://dictionary.cambridge.org/dictionary/japanese-english/%E5%89%B5%E9%80%A0).
- Locally bundled 2.3 KB Japanese glyph subset with its open font license. Social previews use local Japanese and Latin fonts; the final build completed without a Google Fonts request.
- Clear software/AI business positioning: work smarter, serve customers better, and grow revenue. These are goals, with no invented outcomes or metrics.
- Linked “Building StorageAtlas” to the user-confirmed [company website](https://storageatlas.co/), keeping the supplied website, platform, dialer, maintenance, and technical planning responsibilities.
- Replaced screenshot cards with typographic project entries, purpose-led headlines, concise summaries, up to three technologies, and direct GitHub links. Product case studies also omit interface screenshots.
- Retained the four case-study routes, three original article routes, research introduction, original C-MAT architecture figure, gallery, and resume.
- New motion: staggered kanji entrances, outline echo, path drawing, RH stamp, pointer movement capped at 8px, drawn capability icons, section rules, once-only reveals, project arrows, and reading progress.
- Entrances settle within five seconds; reduced motion disables movement and reading progress. No scroll hijacking. Server-rendered text and direct links work without JavaScript.
- Compact visible navigation, a single dedicated Contact page, direct email, honest copy feedback, native photo dialog, preserved PDF open/download links.
- Removed full contact information from the homepage and repeated social links from the footer. Header, homepage, footer, and article contact links all point to `/contact`; the old `/#contact` anchor lands on a compact link to that page.
- Updated metadata and social preview; retained favicon, sitemap, robots, 404, and error boundaries.
- Studied [Shayaan Azeem's site](https://www.shayaanazeem.com/) visually for its direct introduction, inline current-work context, and concise project descriptions. The dark palette and Japanese typography retain this portfolio's own identity.

The redesign and Contact cleanup were developed and validated locally. GitHub publication of each change was explicitly authorized by the user after review.

## Build and automated checks

| Check | Result |
| --- | --- |
| ESLint | Pass, no errors or warnings |
| TypeScript | Pass |
| Production build | Pass, 20 prerendered/static route outputs |
| Git diff whitespace check | Pass |
| Playwright | 52 passed, 0 failed, 2 intentionally skipped, 40.8 seconds |
| axe WCAG 2 A/AA, 2.1 AA, 2.2 AA checks | No detected violations in 27 page/dialog scans |

The 17 functional scenarios passed in each of Chromium, Firefox, and WebKit. The additional delivery-capture scenario runs in Chromium; the two skips omit duplicate screenshot generation in the other engines.

After the final text-spacing and decorative-position adjustments, the production build passed again. Contact navigation, clipboard feedback, and refreshed delivery captures passed a focused rerun: 7 passed, 0 failed, 2 duplicate-capture skips, 10.2 seconds. The full-suite report above is preserved.

Engines: Chromium 153, Firefox 155, WebKit 26.6. These are local engine checks, not tests on physical phones or every operating system.

### Coverage

- All 13 content routes: homepage, Contact, work, four case studies, notes, three articles, photos, resume.
- The About redirect and sticky-header offsets; unknown top-level/project/article URLs; repeated navigation and browser back/forward.
- Discovered internal links, sitemap, robots, favicon, social preview, photo files, and resume PDF.
- Layouts at 320×568, 375×812, 390×844, 768×1024, 1024×768, 1440×1000, and 844×390.
- No horizontal overflow, two project columns from 768px, visible mobile navigation, header targets at least 44×44px.
- Dialog containment across all seven layouts; arrow navigation/bounds, Tab cycling, Escape, button dismissal, focus restoration, body scroll restoration.
- Skip link and visible keyboard focus; Option+Tab in macOS WebKit.
- Touch-visible project copy/actions, no nested anchors or placeholder links.
- No-JavaScript content and direct navigation, email, photo, and PDF actions.
- Reduced-motion typography, static artwork, and disabled reading progress.
- Pointer movement bounded to 8px, resetting on pointer exit and preference changes.
- Long unbroken project titles, absent repository actions, blocked fonts, failed photos, and delayed font loading without a changing art frame.
- Clipboard success and denial, with no false success feedback.
- Actual PDF download, independently of the embedded viewer.
- Correct business copy, employer URL, product GitHub destinations, and animation durations/iteration counts.
- Contact exists as a normal 200 page, with a matching canonical URL and sitemap entry. Email, copy action, and profile links appear once there and no longer appear on the homepage or footer. All contact entry points and the old homepage anchor lead to the same destination.
- Actual product-title navigation to a GitHub URL, intercepted locally in the test rather than depending on a third-party service.
- No detected hydration warnings, uncaught runtime errors, failed ordinary requests, or broken internal links.

Accessibility scans cover home, Contact, work, C-MAT, a note, gallery, resume, 404, and the open photo dialog in all three engines. Shared article/case-study templates also receive route/content/runtime checks.

Error boundaries compile; deliberate server failures were not injected. Clipboard outcomes use controlled implementations rather than altering the user's clipboard or permissions. External service availability is not guaranteed by these tests.

## Mobile Lighthouse results

Recorded before the Contact consolidation, using the default simulated mobile profile. These performance results are retained for reference and have not been rerun for this small navigation/content change:

| Page | Performance | Accessibility | Best practices | SEO | LCP | Blocking time | Layout shift |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Homepage | 96 | 100 | 100 | 100 | 2.9 s | 40 ms | 0 |
| Work | 96 | 100 | 100 | 100 | 2.9 s | 50 ms | 0 |
| Photos | 94 | 100 | 100 | 100 | 3.1 s | 30 ms | 0 |

All pages recorded first contentful paint at 0.8 seconds. Scores are local lab observations and vary with device, network, and server conditions. The browser tests warm the local image optimizer; a fresh host may need an initial photo transformation.

Reports:

- [Homepage mobile audit](artifacts/lighthouse/home-mobile.html)
- [Work mobile audit](artifacts/lighthouse/work-mobile.html)
- [Photos mobile audit](artifacts/lighthouse/photos-mobile.html)
- [Audit summary](artifacts/lighthouse/summary.json)
- [Playwright HTML report](playwright-report/index.html)
- [Playwright results](artifacts/playwright-results.json)

## Screenshots

Desktop: 1440×1000. Mobile: 390×844. Captures use reduced motion after fonts and media settle; full-page captures scroll through retained sections before capture.

| View | Desktop | Mobile |
| --- | --- | --- |
| Introduction | [Desktop](artifacts/screenshots/desktop-hero.png) | [Mobile](artifacts/screenshots/mobile-hero.png) |
| Full homepage | [Desktop](artifacts/screenshots/desktop-home.png) | [Mobile](artifacts/screenshots/mobile-home.png) |
| Homepage ending | [Desktop](artifacts/screenshots/desktop-home-end.png) | [Mobile](artifacts/screenshots/mobile-home-end.png) |
| Contact | [Desktop](artifacts/screenshots/desktop-contact.png) | [Mobile](artifacts/screenshots/mobile-contact.png) |
| Work | [Desktop](artifacts/screenshots/desktop-work.png) | [Mobile](artifacts/screenshots/mobile-work.png) |
| Research | [Desktop](artifacts/screenshots/desktop-research.png) | [Mobile](artifacts/screenshots/mobile-research.png) |
| Notes | [Desktop](artifacts/screenshots/desktop-notes.png) | [Mobile](artifacts/screenshots/mobile-notes.png) |
| Photos | [Desktop](artifacts/screenshots/desktop-photos.png) | [Mobile](artifacts/screenshots/mobile-photos.png) |
| Photo dialog | [Desktop](artifacts/screenshots/desktop-photo-dialog.png) | [Mobile](artifacts/screenshots/mobile-photo-dialog.png) |

## Remaining content limits

The existing resume may predate the StorageAtlas role and is labeled accordingly. C-MAT has no supplied GitHub URL, so it links to its research page. Other products link directly to their supplied repositories. The research remains experimental, with no clinical validation claims.

Source and tests remain reviewable locally. Reports and screenshots are stored in Git-ignored artifact directories.
