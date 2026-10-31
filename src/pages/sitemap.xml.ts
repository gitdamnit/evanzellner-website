import type { APIRoute } from 'astro';

const pages = ['/', '/projects/', '/projects/bludit-wizard/', '/resume/', '/about/', '/contact/'];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://evanzellner.com');
  const urls = pages
    .map((path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
