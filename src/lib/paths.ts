/**
 * URL helper for GitHub Pages project sites.
 *
 * A project Pages site is served from `/<repo>/`, not from the domain root, so
 * every root-absolute link must carry Astro's `base`. `import.meta.env.BASE_URL`
 * is `/` locally and on the custom domain, and `/evanzellner-website/` on the
 * staging deployment.
 */
export const BASE = import.meta.env.BASE_URL;

const EXTERNAL = /^(https?:|mailto:|tel:|#|data:)/;

/** Prefixes an internal path with the configured base. Leaves external URLs and anchors alone. */
export const href = (path: string): string => {
  if (EXTERNAL.test(path)) return path;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
};
