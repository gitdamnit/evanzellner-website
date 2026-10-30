// @ts-check
import { defineConfig } from 'astro/config';

// Single-origin site. Every route lives on evanzellner.com; there are no
// subdomains and no host-aware routing (see D-0002 in DECISION_LOG.md).
//
// BASE_PATH exists only so the GitHub Pages *project* staging site, which is
// served from /evanzellner-website/, does not request assets from the domain
// root. The production build leaves it unset and resolves to "/" (D-0007).
export default defineConfig({
  site: 'https://evanzellner.com',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
