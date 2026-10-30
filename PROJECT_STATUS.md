# Project Status

## Current Phase

In Progress

## Repository State

<!-- Machine-maintained by `prodoc update`. Do not hand-edit. -->
<!-- prodoc:observed:start -->
<!-- Observed from Git metadata only, by `prodoc update`. This block is not evidence that the implementation or its tests are correct; record that under `## Verification Evidence`. -->
- **Observed branch:** main
- **Observed commit:** -
- **Observed working tree:** unknown
- **Observed at:** -
<!-- prodoc:observed:end -->

## Verification Evidence

All evidence below was produced locally against the working tree on 30 October
2026, before the first commit existed. No commit SHA is cited because none
existed at the time. The artefacts are reproduced in the Tests table.

Environment: Node 22.23.2, npm 10.9.8, Astro 7.4, Chromium via Playwright 1.64.

## Completed Work

- [Implemented] Five pages plus a 404, built on the olive-and-lime bento design from the approved screenshot — `src/pages/`, `src/styles/tokens.css`
- [Implemented] Design tokens defined once and consumed everywhere; paper surface retained for the résumé — `src/styles/tokens.css`
- [Tested] Primary navigation is exactly Home, Projects, Résumé, About, Contact — `scripts/test-site.mjs`
- [Implemented] Projects page with two anchored sections, seven released and nine in-development entries, sourced from the GitHub API — `src/pages/projects/index.astro`, `src/data/projects.ts`
- [Tested] Project inventory: 7 completed, 9 in development, 19 external links, no private-repository link — `scripts/test-site.mjs`
- [Tested] All 15 GitHub repository and release URLs return HTTP 200 — manual `curl` sweep, see Tests
- [Implemented] Résumé page reproducing the October 2026 résumé, with the original PDF download — `src/pages/resume/index.astro`, `public/downloads/`
- [Tested] Résumé PDF returns 200 with the PDF media type, 121,322 bytes — `scripts/test-site.mjs`
- [Implemented] Contact form that validates input and opens a `mailto:` draft without claiming delivery — `src/pages/contact/index.astro` (D-0005)
- [Tested] Contact form: empty input rejected, malformed email rejected, valid input prepares a draft, no non-GET request — `scripts/test-site.mjs`
- [Implemented] Sitemap, robots, favicon, and a generated Open Graph card — `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `public/favicon.svg`, `scripts/make-og.mjs`
- [Tested] No horizontal overflow at 390 px on all five pages 0 console errors — `scripts/test-site.mjs`
- [Implemented] GitHub Pages workflow using an Actions artifact — `.github/workflows/pages.yml`
- [Implemented] Custom-domain instructions with exact DNS records, and a staged `CNAME` kept out of the build — `deploy/GITHUB-PAGES.md`, `deploy/CNAME`
- [Blocked] Repository creation, push, and Pages enablement — needs the owner's repository scope and an explicit go-ahead in this session
- [Blocked] Custom domain cutover — needs registrar DNS access, owned by Evan Zellner

## Tests

| Suite | Command | Result | Evidence |
| --- | --- | --- | --- |
| Type, template, and integrity check | `npx astro check` | Pass (23 files, 0 errors, 0 warnings, 0 hints) | local run, 30 Oct 2026 |
| Production build | `npm run build` | Pass (6 pages) | `dist/` |
| Internal links, assets, anchors | `npm run check:links` | Pass (75 links, 22 assets, 0 failures) | local run, 30 Oct 2026 |
| Functional suite | `npm run test:site` | Pass (15 assertions) | `scripts/test-site.mjs` |
| External repository and release links | manual `curl` sweep | Pass (15 URLs, all 200) | local run, 30 Oct 2026 |
| Contrast | computed WCAG ratios for every text/surface pair | Pass (lowest 4.76:1, body text 14.79:1) | local calculation, 30 Oct 2026 |
| Visual sweep | Playwright captures at 1440 px and 390 px | Pass (7 captures, no overflow, no console errors) | local run, 30 Oct 2026 |
| GitHub Actions build | `pages.yml` on push | Not run | - |
| Pages deployment smoke test | `curl` the Pages URL | Not run | - |
| Custom domain resolution | `dig evanzellner.com` | Not run — DNS not configured | - |

## Known Defects

None known in the current build.

Limitations worth recording, none of which are defects:

- The project inventory is a snapshot from 30 October 2026. Nothing refreshes it,
  so a newly tagged release will not appear until `src/data/projects.ts` is edited.
- Four in-development entries (Universal Cast, Brainstorm, GPL Scraper, Bible
  Stories — Kids Edition) were added to reach nine after the owner selected five.
  They are labelled and linkable, but the owner may prefer a different four (D-0003).
- The contact form depends on a configured mail client. Where none exists, the
  visible fallback is a direct `mailto:` link. There is no delivery guarantee and
  no spam control.
- The résumé page omits the phone number printed in the PDF. The PDF is the
  original document and still contains it.
- Active SHRM-CP and PHR status is as stated on the October 2026 résumé and should
  be confirmed with the issuing organisations before relying on it.
- The raw media archive `evanzellner.com/` is present locally and Git-excluded; it
  is not deployed, and only the favicon and résumé PDF were curated from it.
- Automated checks cover Chromium only. Safari, Firefox, and real devices were not
  tested.
- No analytics or privacy policy exists; the site sets no cookies and makes no
  third-party requests other than links the visitor chooses to follow.

## Blockers

- **GitHub repository and Pages enablement.** Owner action: approve creating the
  public repository `gitdamnit/evanzellner-website`, pushing this source, and
  enabling Pages with "GitHub Actions" as the source.
- **Custom domain.** Owner action: add the four `A` records (and the `www` CNAME)
  listed in `deploy/GITHUB-PAGES.md`, then set the custom domain in repository
  settings. The `github.io` URL redirects to `evanzellner.com` only after that,
  which is why no `CNAME` is committed yet.

## Next Actions

1. Create the public repository, push `main`, and enable Pages from Actions.
2. Confirm the workflow deploy, then record the Pages URL and its HTTP status here.
3. Owner adds DNS records and sets the custom domain; then copy `deploy/CNAME` to
   `public/CNAME` and re-deploy.
4. Confirm HTTPS enforcement and re-run the smoke test against the apex domain.
5. Re-check the project inventory against GitHub when a new release is tagged.

## Release Status

Source complete and verified locally. Not yet pushed or deployed. The custom
domain is not configured and must not be described as live.
