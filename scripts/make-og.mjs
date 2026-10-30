import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

// One Open Graph card, generated from the same tokens as the site so it cannot
// drift from the palette. Run with `npm run og` after a design change.

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0c0d0a"/>
  <rect x="48" y="48" width="1104" height="534" rx="18" fill="#1b1f18" stroke="#2f342a"/>
  <g transform="translate(96, 104)" stroke="#d8f76b" stroke-width="5" stroke-linecap="round">
    <line x1="20" y1="0" x2="20" y2="40"/>
    <line x1="0" y1="20" x2="40" y2="20"/>
    <line x1="5.9" y1="5.9" x2="34.1" y2="34.1"/>
    <line x1="34.1" y1="5.9" x2="5.9" y2="34.1"/>
  </g>
  <text x="96" y="300" font-family="Instrument Sans, Helvetica, Arial, sans-serif"
        font-size="104" font-weight="700" letter-spacing="-5" fill="#d8f76b">Evan Zellner.</text>
  <text x="96" y="368" font-family="Instrument Sans, Helvetica, Arial, sans-serif"
        font-size="34" fill="#cbd0c0">Curiosity is the starting point.</text>
  <text x="96" y="500" font-family="Instrument Sans, Helvetica, Arial, sans-serif"
        font-size="24" letter-spacing="3" fill="#858b7b">EVANZELLNER.COM</text>
  <text x="1104" y="500" text-anchor="end" font-family="Instrument Sans, Helvetica, Arial, sans-serif"
        font-size="24" letter-spacing="3" fill="#858b7b">PROJECTS · RÉSUMÉ · ABOUT</text>
</svg>
`;

await mkdir(publicDir, { recursive: true });
await sharp(Buffer.from(svg))
  .png()
  .resize(1200, 630)
  .toFile(`${publicDir}og-default.png`);

await writeFile(`${publicDir}og-default.svg`, svg, 'utf8');
console.log('Wrote public/og-default.png and public/og-default.svg');
