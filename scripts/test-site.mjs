import { chromium } from 'playwright';

// Staging builds live under a subpath; production serves from the root.
const base = process.env.TEST_BASE_URL ?? 'http://localhost:4321';
const results = [];
const fail = (msg) => results.push(`FAIL ${msg}`);
const pass = (msg) => results.push(`ok   ${msg}`);

const browser = await chromium.launch();

// 1. Navigation order and labels
{
  const page = await browser.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const labels = await page.$$eval('nav.primary-nav a', (links) =>
    links.map((link) => link.textContent.trim()),
  );
  const expected = ['Home', 'Projects', 'Résumé', 'About', 'Contact'];
  JSON.stringify(labels) === JSON.stringify(expected)
    ? pass(`nav order ${labels.join(' | ')}`)
    : fail(`nav order was ${labels.join(' | ')}`);

  // 2. Projects page sections
  await page.goto(base + '/projects/', { waitUntil: 'networkidle' });
  const sections = await page.$$eval('section.projects h2', (h) => h.map((x) => x.textContent.trim()));
  pass(`projects sections: ${sections.join(' / ')}`);
  const completed = await page.$$eval('#completed-projects li.project', (x) => x.length);
  const dev = await page.$$eval('#current-development li.project', (x) => x.length);
  completed === 7 ? pass('7 completed entries') : fail(`completed entries = ${completed}`);
  dev === 9 ? pass('9 in-development entries') : fail(`in-development entries = ${dev}`);

  // 3. Every external link is well formed and no private repo is linked
  const hrefs = await page.$$eval('a[href^="http"]', (a) => a.map((x) => x.href));
  const privateLeak = hrefs.filter((h) => /prodoc-memory|modelfile-forge|universal-cast|gitdamnit\/brainstorm|GPL-Scraper|Bible-Stories|gitdamnit\/travis|myrealgbff|gitdamnit\/hr-care-agent(?!---public)/.test(h));
  privateLeak.length === 0 ? pass(`${hrefs.length} external links, no private-repo links`) : fail(`private repos linked: ${privateLeak.join(', ')}`);

  await page.close();
}

// 4. Résumé PDF download
{
  const page = await browser.newPage();
  await page.goto(base + '/resume/', { waitUntil: 'networkidle' });
  const response = await page.request.get(base + '/downloads/evan-zellner-resume-october-2026.pdf');
  const body = await response.body();
  response.status() === 200 && body.length > 100000
    ? pass(`résumé PDF ${response.status()}, ${body.length} bytes, ${response.headers()['content-type']}`)
    : fail(`résumé PDF ${response.status()} ${body.length} bytes`);
  await page.close();
}

// 5. Contact form: validation and mailto draft, no network submission
{
  const page = await browser.newPage();
  const requests = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') requests.push(`${request.method()} ${request.url()}`);
  });
  await page.goto(base + '/contact/', { waitUntil: 'networkidle' });

  await page.click('button[type="submit"]');
  let status = await page.textContent('#form-status');
  status?.includes('Please fill in') ? pass('empty form is rejected') : fail(`empty form status: ${status}`);

  await page.fill('#name', 'Test Person');
  await page.fill('#email', 'not-an-email');
  await page.fill('#message', 'Hello');
  await page.click('button[type="submit"]');
  status = await page.textContent('#form-status');
  status?.includes('does not look complete') ? pass('invalid email is rejected') : fail(`invalid email status: ${status}`);

  await page.fill('#email', 'test@example.com');
  await page.fill('#subject', 'Website test');
  // Prevent the browser from actually handing off to a mail client in headless mode.
  await page.route('mailto:*', (route) => route.abort());
  await page.click('button[type="submit"]');
  status = await page.textContent('#form-status');
  status?.includes('Nothing has been sent yet')
    ? pass(`valid form prepared a draft: "${status}"`)
    : fail(`valid form status: ${status}`);

  requests.length === 0 ? pass('no non-GET request left the page') : fail(`unexpected requests: ${requests.join(', ')}`);
  await page.close();
}

// 6. Mobile overflow on every page
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const path of ['/', '/projects/', '/resume/', '/about/', '/contact/']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    overflow <= 1 ? pass(`${path} no horizontal overflow at 390px`) : fail(`${path} overflows ${overflow}px`);
  }
  await page.close();
}

await browser.close();
console.log(results.join('\n'));
const failures = results.filter((line) => line.startsWith('FAIL'));
console.log(`\n${results.length - failures.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
