# Project Status

## Current Phase

In Progress

## Repository State

<!-- Machine-maintained by `prodoc update`. Do not hand-edit. -->
<!-- prodoc:observed:start -->
<!-- Observed from Git metadata only, by `prodoc update`. This block is not evidence that the implementation or its tests are correct; record that under `## Verification Evidence`. -->
- **Observed branch:** main
- **Observed commit:** 48c8578e887933bbcc54dc6b1da5d6d1948517a9
- **Observed working tree:** dirty
- **Observed at:** 2026-10-30T14:03:55Z
<!-- prodoc:observed:end -->

## Verification Evidence

- **Verification:** commit `0cc04db` — type check, production build, link check, and 15-assertion functional suite green against the local preview — evidence `scripts/test-site.mjs`, Tests table below
- **Verification:** commit `48c8578` — GitHub Actions run [41068177574](https://github.com/gitdamnit/evanzellner-website/actions/runs/41068177574) succeeded and deployed; the same 15-assertion suite passes against `https://gitdamnit.github.io/evanzellner-website`, with every `_astro` asset and the résumé PDF returning 200 — evidence: live run of `scripts/test-site.mjs` on 30 October 2026

Earlier local evidence was produced against the working tree before the first
commit existed; those runs are reproduced in the Tests table.

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
- [Deployed] Public repository created, `main` pushed, and GitHub Pages enabled with "GitHub Actions" as the source — https://github.com/gitdamnit/evanzellner-website
- [Deployed] Staging site serving from GitHub Pages — https://gitdamnit.github.io/evanzellner-website/
- [Tested] Live deployment verified: 6 routes, CSS and JS assets, favicon, Open Graph card, and the résumé PDF all return 200; 15-assertion suite green against the deployed URL — `scripts/test-site.mjs`, run 30 Oct 2026
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
| GitHub Actions build | `pages.yml` on push | Pass (run 41068177574, build + deploy jobs) | https://github.com/gitdamnit/evanzellner-website/actions/runs/41068177574 |
| Pages deployment smoke test | `TEST_BASE_URL=https://gitdamnit.github.io/evanzellner-website npm run test:site` | Pass (15 assertions) | local run, 30 Oct 2026 |
| Deployed asset responses | `curl` each `_astro` asset and the PDF | Pass (all 200) | local run, 30 Oct 2026 |
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

- **Custom domain.** Owner action: add the four `A` records (and the `www` CNAME)
  listed in `deploy/GITHUB-PAGES.md`, then set the custom domain in repository
  settings. The `github.io` URL redirects to `evanzellner.com` only after that,
  which is why no `CNAME` is committed yet.

## Next Actions

1. Owner adds the four `A` records and the `www` CNAME from `deploy/GITHUB-PAGES.md`.
2. Owner sets the custom domain to `evanzellner.com` in repository settings, then
   copies `deploy/CNAME` to `public/CNAME` and pushes.
3. Confirm the certificate and enable "Enforce HTTPS"; re-run the smoke test with
   `TEST_BASE_URL=https://evanzellner.com`.
4. Re-check the project inventory against GitHub when a new release is tagged.

## Release Status

Staging deployment is live at
`https://gitdamnit.github.io/evanzellner-website/` and verified. The production
domain `evanzellner.com` is **not** configured: no DNS record was added, no
`CNAME` file is committed, and the domain must not be described as live until the
owner completes the steps in `deploy/GITHUB-PAGES.md`.
