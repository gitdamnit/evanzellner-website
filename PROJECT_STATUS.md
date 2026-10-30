# Project Status

## Current Phase

In Progress

## Repository State

<!-- Machine-maintained by `prodoc update`. Do not hand-edit. -->
<!-- prodoc:observed:start -->
<!-- Observed from Git metadata only, by `prodoc update`. This block is not evidence that the implementation or its tests are correct; record that under `## Verification Evidence`. -->
- **Observed branch:** main
- **Observed commit:** 412e876e74c29c049e38f546c4e6561630e79b13
- **Observed working tree:** dirty
- **Observed at:** 2026-10-30T16:19:12Z
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
- [Deployed] Custom domain cut over: apex `A`/`AAAA` replaced with GitHub's addresses, `www` pointed at `gitdamnit.github.io`, four dead subdomains removed, all records DNS-only (D-0010) — Cloudflare zone `8085a44df807cf8aa8a14c515de1c71d`, 30 Oct 2026
- [Implemented] `BASE_PATH` removed from the Pages workflow and `deploy/CNAME` copied to `public/CNAME`, so builds serve from `/` — `.github/workflows/pages.yml`, `public/CNAME`
- [Deployed] GitHub Pages custom domain set to `evanzellner.com` with a certificate covering apex and `www`; "Enforce HTTPS" enabled — repository Pages settings, 30 Oct 2026
- [Tested] `https://evanzellner.com/` returns 200 from GitHub, serves the correct `<title>`, redirects `http`→`https` and `www`→apex, and passes all assertions — `TEST_BASE_URL=https://evanzellner.com npm run test:site`, 30 Oct 2026
- [Implemented] Homepage hero cycles 63 photographs of the owner as film characters every 15 s and types/erases five roles after "Hi. I'm" — `src/data/moviestar.ts`, `src/pages/index.astro` (D-0011, FR-11)
- [Implemented] Greeting sits on a solid lime plate, so text contrast is 15.32:1 regardless of the photograph behind it — `src/pages/index.astro`
- [Tested] Hero: greeting in HTML, role in HTML before JavaScript, 63 photographs all resolve, plate width stable while typing — `scripts/test-site.mjs`
- [Tested] Hero fallbacks: reduced motion keeps the first role static and removes the caret; JavaScript off renders the role, loads the first photograph, and hides the caret — `scripts/test-site.mjs`

## Tests

| Suite | Command | Result | Evidence |
| --- | --- | --- | --- |
| Type, template, and integrity check | `npx astro check` | Pass (23 files, 0 errors, 0 warnings, 0 hints) | local run, 30 Oct 2026 |
| Production build | `npm run build` | Pass (6 pages) | `dist/` |
| Internal links, assets, anchors | `npm run check:links` | Pass (75 links, 22 assets, 0 failures) | local run, 30 Oct 2026 |
| Functional suite | `npm run test:site` | Pass (25 assertions) | `scripts/test-site.mjs`, 30 Oct 2026 |
| External repository and release links | manual `curl` sweep | Pass (15 URLs, all 200) | local run, 30 Oct 2026 |
| Contrast | computed WCAG ratios for every text/surface pair | Pass (lowest 4.76:1, body text 14.79:1) | local calculation, 30 Oct 2026 |
| Visual sweep | Playwright captures at 1440 px and 390 px | Pass (7 captures, no overflow, no console errors) | local run, 30 Oct 2026 |
| GitHub Actions build | `pages.yml` on push | Pass (run 41068177574, build + deploy jobs) | https://github.com/gitdamnit/evanzellner-website/actions/runs/41068177574 |
| Pages deployment smoke test | `TEST_BASE_URL=https://gitdamnit.github.io/evanzellner-website npm run test:site` | Pass (15 assertions) | local run, 30 Oct 2026 |
| Custom domain functional suite | `TEST_BASE_URL=https://evanzellner.com npm run test:site` | Pass (15 assertions, before the hero change) | local run, 30 Oct 2026 |
| Custom domain resolution | `dig evanzellner.com` at 1.1.1.1, 8.8.8.8, and authoritative | Pass (4×`185.199.*` A, 4×`2606:50c0:*` AAAA) | local run, 30 Oct 2026 |
| Custom domain certificate | `openssl s_client` + Pages certificate state | Pass (`approved`, apex and `www`, expires 15 Jan 2027) | local run, 30 Oct 2026 |
| HTTPS enforcement | `curl -I http://evanzellner.com/` | Pass (301 → `https://evanzellner.com/`) | local run, 30 Oct 2026 |
| Deployed assets | `curl` each `_astro` asset, favicon, OG card, PDF | Pass (all 200) | local run, 30 Oct 2026 |

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
- The `github.io` project URL is no longer usable as staging: once a custom domain
  is set, GitHub Pages redirects it to `https://evanzellner.com/`. Future staging
  needs a separate origin (D-0010).
- Four hostnames that previously pointed at the apex (`about`, `projects`,
  `secrets`, `writing`) were deleted and no longer resolve. They were already
  failing TLS, so nothing that worked was removed (D-0010).
- `resume.evanzellner.com` (→ `evan-resume-alk.pages.dev`) and
  `ferngeist.evanzellner.com` (→ a Cloudflare Tunnel) return 404. They were
  broken before this work, are unrelated to this repository, and were left alone.
  `opencode.evanzellner.com` serves content and is likewise untouched.

## Blockers

- **None for this release.** The custom domain cutover that was previously
  blocked is complete (D-0010).

## Next Actions

1. Re-check the project inventory against GitHub when a new release is tagged
   (`src/data/projects.ts`).
2. Decide what `resume.evanzellner.com` and `ferngeist.evanzellner.com` should
   serve — both currently 404 and are outside this repository's scope.
3. Rotate the Cloudflare API token used for the cutover and the R2 credential that
   was exposed in the working transcript; neither is stored in this repository.
4. Confirm `http://` and `https://www` redirects still behave after the certificate
   renews in January 2027.

## Release Status

Production is live at `https://evanzellner.com/`, served by GitHub Pages from this
repository and verified on 30 October 2026: apex and `www` return 200, certificates
are approved, HTTPS is enforced, and all 15 functional assertions pass against the
domain. The `github.io` project URL now redirects to the custom domain.

