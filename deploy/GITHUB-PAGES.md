# GitHub Pages and custom domain

This document records the deployment wiring and the exact account actions that
remain. Nothing here claims `evanzellner.com` is live.

## How deployment works

- Repository: `https://github.com/gitdamnit/evanzellner-website`
- Workflow: `.github/workflows/pages.yml` runs on every push to `main`.
- It runs `npm ci`, `npm run check`, `npm run build`, and `npm run check:links`,
  then uploads `dist/` as a Pages artifact and deploys it.
- Pages source is "GitHub Actions", not a branch. There is no `gh-pages` branch.

## Current staging URL

```
https://gitdamnit.github.io/evanzellner-website/
```

This URL works now and is verified. Keep using it until DNS resolves. Because it
is a project site it lives under `/evanzellner-website/`, which is why the
workflow builds with `BASE_PATH` set (D-0009).

## Custom domain: what the owner must do

### 1. Choose apex or `www`

The site is built for the apex `evanzellner.com`. The `www` host should redirect
to the apex; GitHub Pages does that automatically once both records exist.

### 2. DNS records at the registrar (apex)

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

### 4. Configure the custom domain in GitHub

Repository → **Settings → Pages → Custom domain** → enter `evanzellner.com` →
**Save**. GitHub writes the `CNAME` file into the deployed artifact; the copy in
this repository stays out of `public/` on purpose (D-0007).

### 5. Enforce HTTPS

After DNS propagates and GitHub issues the certificate (usually minutes, up to
24 hours), tick **Enforce HTTPS** in the same panel.

### 6. Verify before announcing

Run these in order and keep the output:

```bash
dig +short evanzellner.com A
curl -sI https://evanzellner.com/ | head -5
curl -s https://evanzellner.com/ | grep -o '<title>[^<]*</title>'
```

The apex must answer with the four GitHub addresses, the HTTPS request must
return `200`, and the title must match the site.

## CNAME file, staged but not active

`deploy/CNAME` contains:

```
evanzellner.com
```

Copy it to `public/CNAME` only when step 4 has been done **and** DNS already
resolves. Committing it earlier makes the `github.io` URL redirect to a domain
that does not answer, which breaks the only working deployment.

## Verification run so far

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
- DNS: **not configured**. No record was added by this work. `dig
  evanzellner.com` will not return GitHub's addresses until the owner acts.
- Custom domain: **not set** in repository settings, and no `CNAME` is committed.
