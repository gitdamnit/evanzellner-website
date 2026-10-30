# evanzellner.com

The personal website for Evan Zellner. Static Astro build, dark olive and lime
bento design, deployed to GitHub Pages.

```
Home · Projects · Résumé · About · Contact
```

## Stack

- Astro 7, TypeScript strict
- Self-hosted variable fonts (Instrument Sans, Newsreader)
- No analytics, no cookies, no backend

## Run it

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/
```

## Checks

```bash
npm run check        # astro check: types, templates, content
npm run build        # production build
npm run check:links  # internal links, assets, and anchors in dist/
npm run test:site    # Playwright: nav, project counts, PDF, contact draft, 390px overflow
```

`test:site` needs the Playwright browser bundle (`npx playwright install chromium`)
and a running preview server on port 4321.

## Project inventory

`src/data/projects.ts` is the single source of truth. Seven entries are
**Completed** because they have a tagged GitHub release; nine are **Current
Development**. Status was read from the GitHub API on 30 October 2026 and is not
maintained automatically. Re-check it before claiming a release.

ProDoc Guard (released) and ProDoc Memory (in development) are separate projects.

## Deployment and domain

See [`deploy/GITHUB-PAGES.md`](deploy/GITHUB-PAGES.md). The staging URL works
today; the custom domain requires registrar access and has **not** been
configured.

## Documents

- [`PRODUCT_REQUIREMENTS.md`](PRODUCT_REQUIREMENTS.md) — what the site must do
- [`DECISION_LOG.md`](DECISION_LOG.md) — why it is built this way
- [`PROJECT_STATUS.md`](PROJECT_STATUS.md) — what is done, tested, and blocked

## Licence

None. All rights reserved. Do not add a licence file without a decision record.
