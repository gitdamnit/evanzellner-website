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

### D-0010 — Cut `evanzellner.com` over to GitHub Pages and drop the four dead subdomains

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** D-0007 deliberately left the custom domain unset until DNS resolved. On 2026-10-30 the owner supplied a Cloudflare API token with `Zone.DNS Edit` on `evanzellner.com`, and inspection of the live zone showed the apex was not serving a working site: `https://evanzellner.com/` returned `301` to `https://more-surface-302655.framer.app/`, a Framer staging hostname. `www` did the same. Four subdomains — `about`, `projects`, `secrets`, `writing` — were CNAMEs to the apex and failed TLS because Hostinger held no certificate for them. `resume` and `ferngeist` returned 404; only `opencode` (a Cloudflare Tunnel host) served content. The claim in `PROJECT_STATUS.md` that the apex "returns 200 from a Framer site" was therefore wrong.
- **Alternatives Considered:** Leave the domain alone and keep the `github.io` staging URL (rejected: the apex redirected visitors off-domain to a staging hostname, so there was no working site to protect); use CNAME flattening at the apex pointing to `gitdamnit.github.io` (rejected: GitHub's documented configuration is four `A` records, and the repo already documents that shape); proxy the records through Cloudflare (rejected: the orange-cloud proxy intercepts the ACME challenge GitHub uses to issue the certificate); keep the four dead subdomains (rejected by the owner: the site is one origin with in-page routes per D-0002, and a subdomain pointed at GitHub Pages would throw certificate errors); set the custom domain before changing DNS (rejected: Pages immediately redirects the only working `github.io` URL to the domain, which would have shown the Framer staging page).
- **Decision:** The apex `A`/`AAAA` records were replaced with GitHub's four `A` (`185.199.108-111.153`) and four `AAAA` (`2606:50c0:8000-8003::153`) addresses, new records added before the old ones were deleted so the apex never went dark. `www` now CNAMEs to `gitdamnit.github.io`. The four dead subdomains were deleted. All records stay DNS-only. `BASE_PATH` was removed from `.github/workflows/pages.yml` (closing the D-0009 staging path) and `deploy/CNAME` was copied to `public/CNAME`.
- **Rationale:** The cutover replaced a redirect to a staging hostname rather than a live site, so the risk recorded in D-0007 was overstated. Keeping the `opencode`, `ferngeist`, `resume`, and `travis` tunnel/Pages records untouched preserved the one host that works.
- **Consequences:** The production build is now root-path; the `github.io` project URL is no longer a usable staging target because Pages redirects it to the custom domain. Any future staging needs a separate origin or a preview deployment. The four deleted hostnames no longer resolve; restoring any of them is a new DNS record, not a rollback. The old apex values (`A 2.57.91.91`, `AAAA 2a02:4780:84::32`, `CNAME www → evanzellner.com`) roll back the domain if needed.
- **Supersedes:** D-0009 (the `BASE_PATH` mechanism is no longer used by the deployment workflow; `src/lib/paths.ts` and the environment-variable support remain in place for future project-site use)

### D-0011 — Rotate the moviestar photographs behind a typed greeting in the homepage hero

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** The owner supplied 63 generated photographs of himself as film characters (`evan-moviestar/`, 12 MB of PNG) and asked for the homepage hero to cycle through them every 15 seconds while the greeting types and erases a role. The hero was previously a flat lime card holding the name "Evan Zellner." FR-2 requires a lime hero card, NFR-1 requires 4.5:1 text contrast, and NFR-4 requires the copy to read without JavaScript.
- **Alternatives Considered:** Tint the photographs with a heavy lime veil and keep the dark ink directly on them (rejected after testing: a uniform 72–90% veil washed the pictures out to the point that cycling them was pointless, and the contrast margin depended on the photograph, since a 52% lime veil over a black frame measures only 4.3:1); put white text over a dark scrim (rejected: it discards the lime card that FR-2 specifies); show the photographs in an inset panel beside the text (rejected: the hero is 731×383, so a portrait inset would crop 40% of each 1.42:1 source and upscale it 1.6×); keep the existing name-only hero (rejected: the owner asked for the pictures and the typing).
- **Decision:** The photograph fills the card under a light 26% lime cast, and the greeting sits on a solid lime plate with a soft shadow. Contrast is therefore exact — lime `#d8f76b` on ink `#12150c` measures 15.32:1 regardless of which picture is behind it. Two stacked `<img>` layers crossfade over 1.2 s; a random photograph is chosen on load and a different one every 15 s. The greeting is static HTML (`Hi. I'm a developer`) and JavaScript animates it through five roles, holding each for 2 s. The plate reserves the width of the longest role so it does not resize mid-word.
- **Rationale:** A solid plate is the only way to keep a photograph vivid and the contrast exact at the same time. It also keeps the card legible at 390 px, where the photograph is cropped hardest.
- **Consequences:** Copy and one photograph render with JavaScript disabled; the caret is only shown once the script runs. `prefers-reduced-motion` stops the rotation and the typing and removes the caret. Photographs are picked up automatically from `src/assets/moviestar/*.png` and optimised to WebP at build time (12 MB of PNG becomes 1.4 MB of WebP), so adding a picture means dropping a file in that folder. Every photograph is only fetched when it is about to be shown.
- **Supersedes:** None

### D-0012 — Give the hero photographs their own column, not the whole card

- **Date:** 2026-10-30
- **Status:** Accepted
- **Context:** D-0011 put the photographs behind the entire hero card and floated the greeting on a solid lime plate. On real content that plate landed on the subject's face: most of the photographs are close-up portraits with the head in the upper-left, which is exactly where the copy sits. The plate also read as a sticker laid over a picture. The owner's original sketch had the photographs in a box on the right of the card and the words on plain lime.
- **Alternatives Considered:** Keep the full-bleed photograph and move the plate to the lower-left (rejected: only relocates the collision, since faces span the middle and bottom of the crop); shrink the plate and lean on a scrim again (rejected: makes contrast depend on which random photograph loaded, which is what D-0011 rejected); inset the photograph in a right-hand panel (chosen); stack the panel below the copy at every width (rejected: wastes the card's horizontal space on desktop).
- **Decision:** The hero is a two-column card. Copy occupies the left 56%; the photographs sit in an absolutely positioned panel on the right 42%, full height, with a 30 px lime fade along the seam. The lime plate, its shadow, and the full-card veil are removed because the copy now sits on plain lime. Below 720 px the panel drops below the copy at full width and 9.5 rem tall. `--text-greeting` drops from a 4.1 rem to a 3.5 rem maximum so the longest role fits the narrower column without wrapping.
- **Rationale:** A photograph can never be cut by text that is not on top of it, and contrast becomes structural rather than a property of the image. The panel also crops landscape sources to a portrait slot, which keeps heads centred instead of slicing the top off.
- **Consequences:** Contrast is 15.32:1 by construction (lime `#d8f76b` on ink `#12150c`). `scripts/test-site.mjs` asserts the panel and the copy never overlap at 1280 px and at 390 px, and that the hero's height does not change while the role is typing. A longer role than the current longest would need the type scale or the column width revisited.
- **Supersedes:** D-0011 (layout only; rotation, typing, reduced-motion handling, and the build-time image pipeline are unchanged)
