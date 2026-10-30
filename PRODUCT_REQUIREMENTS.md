# Product Requirements

## Project Identity

**Name:** evanzellner.com — personal website
**Tagline:** The personal home for Evan Zellner: the work, the background, the résumé, and the projects still being built.
**Repository:** https://github.com/gitdamnit/evanzellner-website
**Licence:** none. The project is deliberately unlicensed; all rights reserved. Do not add a licence file without a decision record.
**Maintainer:** Evan Zellner

## Purpose

Evan Zellner's public identity spans human resources, technical recruiting, business operations, independent software development, and horticulture. Existing profiles reduce that to a job title. This site exists to present the whole picture on owned infrastructure, with evidence of work rather than a list of keywords, and with project status that is true at the moment it is read.

The site is a static publication. It does not store visitor data, run a backend, or require a login.

## Intended Users

| User | Goal | What they already know |
| --- | --- | --- |
| Recruiter or hiring manager | Assess fit in under two minutes, then open the résumé or email | Recruiting vocabulary, ATS and compensation language |
| Potential collaborator or employer | See what was actually built, at what stage, and how it was reasoned about | Software delivery vocabulary |
| Anyone curious about the person | Read a plain account without inflated claims | Nothing |

## Functional Requirements

| ID | Requirement | Acceptance signal |
| --- | --- | --- |
| FR-1 | The primary navigation is exactly Home, Projects, Résumé, About, Contact, in that order, on every page | Rendered nav text equals that list; each link resolves |
| FR-2 | The homepage presents the approved bento layout: lime hero card, About card, Résumé card, Projects card | Screenshot comparison at 1440 px and 390 px |
| FR-3 | The Projects page contains two sections under the single Projects nav link: Completed Projects and Current Development, each with a stable anchor | `#completed-projects` and `#current-development` resolve; counts are 7 and 9 |
| FR-4 | A project appears under Completed only if a tagged GitHub release exists; its version text is that tag | Every completed entry has a release URL returning HTTP 200 |
| FR-5 | In-development entries are labelled as such and never described as released or shipped | Rendered badge text and copy review |
| FR-6 | Private repositories are named without a public link | No `github.com` link points at a private repository |
| FR-7 | The résumé page reproduces the October 2026 résumé content and offers the original PDF download | PDF returns HTTP 200 with `application/pdf`; every listed role, date, and credential appears |
| FR-8 | The contact form opens a draft in the visitor's own email client and states that nothing has been sent | Form validates name, email, and message; status text says nothing has been sent; no non-GET request is made |
| FR-9 | Every internal link, asset, and in-page anchor resolves in the built output | `npm run check:links` exits 0 |
| FR-10 | The site builds to static HTML, CSS, and JS with no server runtime | `dist/` contains only static files; GitHub Pages serves it |

## Nonfunctional Requirements

| ID | Requirement | Target |
| --- | --- | --- |
| NFR-1 | Text contrast meets WCAG 2.1 AA | Every body-text colour pairing ≥ 4.5:1 against its surface |
| NFR-2 | No horizontal overflow at a 390 px viewport | 0 px on all five pages |
| NFR-3 | No console errors on any page | 0 errors in Chromium |
| NFR-4 | Content is readable without JavaScript | All copy and navigation render from HTML; only the contact draft needs JS |
| NFR-5 | The palette and type scale are defined once and consumed as tokens | No component hard-codes a palette value outside `src/styles/tokens.css` |
| NFR-6 | Build reproduces from a clean checkout | `npm ci && npm run build` succeeds on Node 22 |

## Scope and Exclusions

In scope: five pages (home, projects, résumé, about, contact), a 404 page, sitemap, robots, Open Graph card, GitHub Pages deployment, and custom-domain preparation for `evanzellner.com`.

Out of scope for this release:

- A backend, CMS, database, or server-side form handler. The contact form opens a mail client only.
- Hostname-per-section routing. The site is one origin with in-page routes (D-0002).
- The retired "I Hope It Offends You" case study (carried forward from the previous repository's D-0025).
- Publishing the raw media archive. It contains private documents and stays Git-excluded (D-0006).
- Individual case-study pages. The Projects page lists and links to repositories instead (D-0003).

## Technical Constraints

- Node 22 (`.nvmrc`), npm, Astro 7 with TypeScript strict mode.
- Static output only; deploy target is GitHub Pages served from an Actions artifact.
- Fonts are self-hosted through `@fontsource-variable` packages; no third-party font requests.
- No analytics, tracking pixels, or cookies.
- `evanzellner.com` is the canonical origin; the GitHub Pages URL is the staging origin until DNS is configured.

## Acceptance Criteria

A release is complete when:

1. `npm run check`, `npm run build`, and `npm run check:links` all exit 0.
2. The functional suite passes: nav order, 7/9 project split, résumé PDF, contact-draft behaviour, and 390 px overflow.
3. The built site is committed and pushed to the public repository.
4. GitHub Pages deploys that commit and the Pages URL returns HTTP 200.
5. The custom-domain steps are documented with exact DNS records. Public DNS and the `CNAME` file remain unset until the owner performs them.

## Release Objectives

- Ship the bento design that was approved as a screenshot, replacing the earlier amber and blue directions.
- Publish an honest inventory of seven released and nine in-development projects, sourced from the GitHub API on 30 October 2026.
- Have a working Pages deployment this week, with the domain cutover left to the owner because it needs registrar access.
