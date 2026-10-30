# Decision Log

## How to Use This Log

1. Copy the block below to the end of the `## Decisions` section.
2. Use the next free four-digit ID. IDs are never reused and never renumbered.
3. Date the record the day the decision was actually made (`YYYY-MM-DD`).
4. Record the alternatives you rejected and why. A decision without context is a
   rumour, not a record.
5. Never rewrite history. If a decision changes, append a superseding record.

```markdown
### D-0001 — Short imperative title

- **Date:** YYYY-MM-DD
- **Status:** Accepted
- **Context:** the situation and the constraint that forced a choice
- **Alternatives Considered:** option A (rejected because ...), option B (rejected because ...)
- **Decision:** what was decided, in one or two sentences
- **Rationale:** why this option wins, including what it costs
- **Consequences:** what follows from it — new constraints, follow-up work, risks
- **Supersedes:** None
```

Allowed statuses: `Proposed`, `Accepted`, `Superseded`, `Deprecated`, `Rejected`.

## Decisions

### D-0001 — Publish from a new repository and leave the old build in place

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** Two prior attempts exist. `~/Projects/evanzellner` holds a blue React landing page that the owner rejected as generic. `~/Projects/evanzellner-site` holds an amber, serif, six-hostname Astro build with uncommitted work and no remote. The owner asked for a fresh start in `~/Projects/evanzellner-website` using the approved olive-and-lime design.
- **Alternatives Considered:** Rename the old repository and continue there (rejected: its identity, palette, and six-host architecture are all things the owner asked to leave behind, and its dirty tree makes a clean baseline harder); copy the old repository so both survive (rejected: two diverging copies of the same site invite edits in the wrong one).
- **Decision:** The new repository is the publishing target for `evanzellner.com`. `evanzellner-site` stays on disk, untouched, as a reference and as the source of verified résumé copy.
- **Rationale:** A clean history matches a clean design. Keeping the old tree intact costs disk, not correctness, and nothing is lost if the new direction is abandoned.
- **Consequences:** Verified content (résumé data, About copy) was copied forward deliberately. The old repository has no remote, so this is not a fork and the two histories will not be merged.
- **Supersedes:** None

### D-0002 — One origin with in-page routes, not six hostnames

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** The previous build spread sections across six hostnames. The approved screenshot shows a single site whose navigation is Home, Projects, Résumé, About, Contact.
- **Alternatives Considered:** Keep one hostname per section (rejected: the approved navigation and screenshot describe one site, and six hosts multiply DNS, TLS, and deployment surface); use path prefixes with host-aware redirects (rejected: there is nothing to redirect from yet).
- **Decision:** `evanzellner.com` serves every page. Sections are routes with trailing slashes; projects are anchored subsections of one page.
- **Rationale:** One origin removes an entire class of canonical, sitemap, and cross-host routing defects, and matches the approved design.
- **Consequences:** `astro.config.mjs` sets `trailingSlash: 'always'` and a single `site`. Sitemap and robots are generated from that origin.
- **Supersedes:** None

### D-0003 — Derive the project inventory from the GitHub API, not from memory

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** The task referred to a built `dist/` containing seven completed and nine in-development entries. No such build exists on this machine: the only `dist/` under the projects directory is the older amber build, and the attached ZIP contains media only. The numbers could not be preserved from an artefact, so they had to be reconstructed from a source of truth.
- **Alternatives Considered:** Invent sixteen plausible entries (rejected: the project's own standard forbids claiming work that is not verified); copy all nine case studies from the old repository (rejected: their set does not match the released/private split and includes a retired project); leave the Projects page empty (rejected: the page is the point of the site).
- **Decision:** A project is Completed only when `gh api repos/gitdamnit/<name>/releases` returns a tag; the tag is displayed as the version. Everything else is In Development. Descriptions come from each repository's description or README. The owner selected five in-development entries (ProDoc Memory, TRAVIS, My(real)GBFF, HR CARE, Modelfile Forge); four more were added from verified repositories to reach nine (Universal Cast, Brainstorm, GPL Scraper, Bible Stories — Kids Edition).
- **Rationale:** A release tag is checkable by anyone, and it is the only signal that distinguishes finished from in-progress without judging the work.
- **Consequences:** Exactly seven public repositories have releases, which matches the requested count. The four additions are the owner's to amend; changing them is a data edit in `src/data/projects.ts`, not a redesign. Private repositories are named without links so no visitor meets a 404.
- **Supersedes:** None

### D-0004 — Adopt the dark olive and lime bento design as the visual direction

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** Three visual directions exist in the record: a rejected blue React landing page, an amber serif Astro build, and an approved screenshot of a dark olive bento grid with a lime hero card. The owner's instruction was to preserve the bento design and not replace it with a generic blue portfolio.
- **Alternatives Considered:** Reuse the amber palette for continuity with the old build (rejected: the owner asked for the bento design); take the blue landing page as the base (explicitly rejected); restyle the bento into a conventional hero-plus-sections page (rejected: the bento grid is the design).
- **Decision:** The olive ground (`#0c0d0a`), lime accent (`#d8f76b`), Instrument Sans display type, and four-card bento grid are the design system, defined once in `src/styles/tokens.css`.
- **Rationale:** The screenshot is the only artefact that has both the owner's approval and a complete layout. Tokens keep it from drifting.
- **Consequences:** The paper-toned variable family is retained for the résumé surface. Any future page starts from the same tokens.
- **Supersedes:** None

### D-0005 — The contact form opens a mail draft and says so

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** A static GitHub Pages site cannot receive form submissions. The owner asked for a contact form that intentionally opens an email draft, and warned against claiming delivery that was not implemented and tested.
- **Alternatives Considered:** Post to a third-party form service (rejected: adds a dependency, a privacy surface, and an unverified processor without the owner's consent); omit the form and link `mailto:` only (rejected: the owner asked for the form); silently attempt a fetch (rejected: it would fail on Pages and look like delivery).
- **Decision:** The form validates name, email, and message in the browser, then navigates to a `mailto:` URL. The visible status line reads "Opening your email app with the draft. Nothing has been sent yet."
- **Rationale:** It is honest about the mechanism, needs no service, and degrades to a direct email link when no client is configured.
- **Consequences:** There is no delivery receipt, no spam control, and no server-side record. Anyone who needs those must add a backend and test it before the copy changes.
- **Supersedes:** None

### D-0006 — Keep the raw media archive out of Git

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** `evanzellner.com.zip` (53 MB, 124 files) was provided as the starting point. It contains logos and plant photographs alongside résumés, LLC filings, receipts, correspondence, and offensive material. It also contains no source code.
- **Alternatives Considered:** Commit the archive (rejected: it publishes private documents and offensive material and bloats every clone); delete the archive (rejected: it is the owner's material and some of it is usable); extract only the logos (chosen, in part).
- **Decision:** The extracted folder `evanzellner.com/` is Git-excluded. Only curated files move into `public/` or `src/assets/` and are committed. Today that is the favicon and the résumé PDF.
- **Rationale:** Publication is irreversible; a wrong file in a public repository cannot be un-published by deleting it.
- **Consequences:** Adding media requires a deliberate copy step and a review. The archive remains available locally.
- **Supersedes:** None

### D-0007 — Deploy to GitHub Pages from an Actions artifact, and prepare the domain without activating it

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** The site needs a public host. The owner asked for a dedicated repository, a Pages deployment, and custom-domain preparation, while explicitly refusing premature claims that the domain is live.
- **Alternatives Considered:** Commit `public/CNAME` immediately (rejected: with DNS unset, Pages begins redirecting the `github.io` URL to a domain that does not resolve, which breaks the only working URL); deploy a `gh-pages` branch by hand (rejected: more manual state than an official artifact workflow); Cloudflare Pages (rejected for now: the owner asked for GitHub Pages).
- **Decision:** `.github/workflows/pages.yml` builds, type-checks, link-checks, uploads `dist/` as a Pages artifact, and deploys it. Custom-domain records are documented in `deploy/GITHUB-PAGES.md`; the `CNAME` file is staged there, not in `public/`, until DNS resolves.
- **Rationale:** The verification URL keeps working while the owner arranges DNS, and the cutover becomes one deliberate step.
- **Consequences:** The Pages URL is the canonical link in the README until the domain cutover. Adding the CNAME file is a separate, owner-approved change.
- **Supersedes:** None

### D-0008 — ProDoc Guard and ProDoc Memory are separate projects

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** The two names are close enough that a portfolio would be tempted to merge them. They have different release states and different repositories.
- **Alternatives Considered:** List ProDoc Memory as a version of ProDoc Guard (rejected: it would claim a released parent for an unreleased project); omit ProDoc Memory until it ships (rejected: the owner asked for nine in-development entries and it is one of them).
- **Decision:** ProDoc Guard appears under Completed at v0.1.0 with its release link. ProDoc Memory appears under Current Development with no version and no public link (its repository is private).
- **Rationale:** Status is a fact about a repository, not a family resemblance.
- **Consequences:** Editing either description must not borrow claims from the other.
- **Supersedes:** None

### D-0009 — Build the Pages staging site under its repository subpath

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** GitHub Pages serves a project site from `https://<user>.github.io/<repo>/`, not from the domain root. The first deployment returned 200 for the HTML but 404 for every stylesheet and navigation link, because Astro had emitted root-absolute URLs. The screenshot looked unstyled, and the deployment was therefore not usable as staging.
- **Alternatives Considered:** Deploy to a user site repository (rejected: `gitdamnit.github.io` already exists as the profile repository); switch hosting (rejected: the owner asked for GitHub Pages); hard-code the subpath in every link (rejected: the production build must stay at `/`, so the subpath has to be a build-time input, not a source edit); accept a broken staging URL until the domain is cut over (rejected: an unverifiable deployment is not a deployment).
- **Decision:** Astro's `base` is driven by the `BASE_PATH` environment variable, and every internal URL goes through `src/lib/paths.ts`. The workflow builds with `BASE_PATH=/evanzellner-website/`; local and custom-domain builds default to `/`.
- **Rationale:** One helper keeps the staging and production builds identical apart from a prefix, and both can be verified with the same suite by changing `TEST_BASE_URL`.
- **Consequences:** New internal links must use the helper; a raw `href="/..."` will work locally and fail on staging. `scripts/check-links.mjs` strips the base when resolving files, so the same check covers both.
- **Supersedes:** None
