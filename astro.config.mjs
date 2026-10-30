// @ts-check
import { defineConfig } from 'astro/config';

// Single-origin site. Every route lives on evanzellner.com; there are no
// subdomains and no host-aware routing (see D-0002 in DECISION_LOG.md).
export default defineConfig({
  site: 'https://evanzellner.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
});
