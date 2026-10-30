# GitHub Pages and custom domain

This document records the deployment wiring and the state of the custom domain.
`evanzellner.com` was cut over to GitHub Pages on 30 October 2026 and verified
(D-0010).

## How deployment works

- Repository: `https://github.com/gitdamnit/evanzellner-website`
- Workflow: `.github/workflows/pages.yml` runs on every push to `main`.
- It runs `npm ci`, `npm run check`, `npm run build`, and `npm run check:links`,
  then uploads `dist/` as a Pages artifact and deploys it.
- Pages source is "GitHub Actions", not a branch. There is no `gh-pages` branch.

## Live URL

```
https://evanzellner.com/
```

Production. The `github.io` project URL
(`https://gitdamnit.github.io/evanzellner-website/`) now redirects here, because
GitHub Pages redirects a project site to its configured custom domain. It is no
longer usable as staging.

## What was done on 30 October 2026

- Apex `A` and `AAAA` records replaced with GitHub's addresses (four each). New
  records were added before the old Hostinger ones were deleted, so the apex
  never stopped resolving.
- `www` CNAME changed from `evanzellner.com` to `gitdamnit.github.io`.
- Four dead subdomain CNAMEs deleted: `about`, `projects`, `secrets`, `writing`.
  All four pointed at the apex and had been failing TLS.
- Every record left DNS-only (grey cloud). Proxying would break GitHub's ACME
  challenge.
- `BASE_PATH` removed from `.github/workflows/pages.yml`; `deploy/CNAME` copied
  to `public/CNAME`; custom domain set in Pages; "Enforce HTTPS" enabled.

The `opencode`, `ferngeist`, `resume`, and `travis` records were not touched.

### Old values, for rollback

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `2.57.91.91` |
| AAAA | `@` | `2a02:4780:84::32` |
| CNAME | `www` | `evanzellner.com` |

Restoring these returns the domain to Hostinger. Note that the apex did not serve
a working site before the cutover: it returned `301` to
`https://more-surface-302655.framer.app/`, a Framer staging hostname.

## Custom domain configuration (for reference)

### 1. Apex or `www`

The site is built for the apex `evanzellner.com`. The `www` host should redirect
to the apex; GitHub Pages does that automatically once both records exist.

### 2. Apex records

GitHub Pages documents four `A` records for the apex. Add all four:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |

Optional IPv6, if the registrar supports `AAAA`:

| Type | Name | Value |
| --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

If the DNS provider supports `ALIAS`/`ANAME` at the apex, `gitdamnit.github.io`
is the alternative to the four `A` records. Do not mix `A` records with an
`ALIAS`.

### 3. `www` record

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `gitdamnit.github.io` | 3600 |

### 4. Custom domain in GitHub (done)

Repository → **Settings → Pages → Custom domain** → enter `evanzellner.com` →
**Save**. GitHub writes the `CNAME` file into the deployed artifact; the copy in
this repository stays out of `public/` on purpose (D-0007).

### 5. Base path (done — `BASE_PATH` removed)

The staging build sets `BASE_PATH=/evanzellner-website/` in
`.github/workflows/pages.yml` because a project site is served from a subpath
(D-0009). On the custom domain the site is served from `/`, so **remove both
`BASE_PATH` entries from the workflow** before the custom domain goes live.
Otherwise every link and stylesheet still points at `/evanzellner-website/…`
and the site renders unstyled.

### 6. Enforce HTTPS (done)

After DNS propagates and GitHub issues the certificate (usually minutes, up to
24 hours), tick **Enforce HTTPS** in the same panel.

### 7. Verification (done 30 October 2026)

Run these in order and keep the output:

```bash
dig +short evanzellner.com A
curl -sI https://evanzellner.com/ | head -5
curl -s https://evanzellner.com/ | grep -o '<title>[^<]*</title>'
```

The apex must answer with the four GitHub addresses, the HTTPS request must
return `200`, and the title must match the site.

## CNAME file, staged but not active

`deploy/CNAME` (and now `public/CNAME`) contains:

```
evanzellner.com
```

It was copied into `public/` only after DNS resolved and the custom domain was
set. Committing it earlier makes the `github.io` URL redirect to a domain that
does not answer, which breaks the only working deployment.

## Verification runs

- Local build: `npm run build` — 6 pages.
- Local link check with `BASE_PATH=/evanzellner-website/` — 75 internal links,
  22 asset references, 0 failures.
- GitHub Actions: run `41068177574` on commit `48c8578` — build and deploy jobs
  succeeded.
- Staging smoke test against `https://gitdamnit.github.io/evanzellner-website` —
  15 assertions pass: nav order, 7 completed and 9 in-development entries,
  résumé PDF (200, PDF media type, 121,322 bytes), contact-draft behaviour, and
  no horizontal overflow at 390 px.
- Deployed assets: every `_astro` stylesheet, the favicon, the Open Graph card,
  and the résumé PDF return 200.
- DNS: **configured** on 30 October 2026. `dig evanzellner.com` returns the four
  GitHub `A` and four `AAAA` addresses from 1.1.1.1, 8.8.8.8, and the
  authoritative Cloudflare nameservers.
- Custom domain: **set** in repository settings to `evanzellner.com`, certificate
  state `approved` for apex and `www`, "Enforce HTTPS" on.
- Live: `https://evanzellner.com/` returns 200 with the correct `<title>`,
  `http://` 301s to `https://`, and `www` 301s to the apex.
- Functional suite against the live domain:
  `TEST_BASE_URL=https://evanzellner.com npm run test:site` — 15 assertions pass.
- Deployed assets: every `_astro` stylesheet, the favicon, `og-default.png`, and
  the résumé PDF return 200 on the domain.
