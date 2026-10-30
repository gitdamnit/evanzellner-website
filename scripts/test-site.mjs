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

// 4. Homepage hero: rotating photographs and the typed greeting
{
  const page = await browser.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });

  const greeting = (await page.locator('.hero-card__greeting').textContent())?.trim();
  greeting === "Hi. I'm" ? pass('hero greeting present') : fail(`hero greeting was "${greeting}"`);

  const role = (await page.locator('[data-typed]').textContent())?.trim() ?? '';
  role.length > 0
    ? pass(`hero role is in the HTML: "${role}"`)
    : fail('hero role is empty before JavaScript runs');

  const payload = await page.evaluate(() =>
    JSON.parse(document.getElementById('moviestar-data')?.textContent ?? '{}'),
  );
  const photos = payload.photos ?? [];
  const roles = payload.roles ?? [];
  photos.length >= 10
    ? pass(`${photos.length} rotating photographs, ${roles.length} roles`)
    : fail(`only ${photos.length} photographs configured`);

  // Every optimised photograph must exist in the build.
  const statuses = await Promise.all(
    photos.map(async (photo) => (await page.request.head(base + photo.src)).status()),
  );
  const broken = statuses.filter((code) => code !== 200).length;
  broken === 0 ? pass(`all ${photos.length} photographs resolve`) : fail(`${broken} photographs 404`);

  // The photograph panel must never sit underneath the copy.
  const layout = await page.evaluate(() => {
    const content = document.querySelector('.hero-card__content').getBoundingClientRect();
    const media = document.querySelector('.hero-card__media').getBoundingClientRect();
    return { overlap: content.right - media.left, stacked: media.top >= content.bottom - 1 };
  });
  layout.stacked || layout.overlap <= 0
    ? pass('photograph panel never overlaps the copy')
    : fail(`photograph panel overlaps the copy by ${Math.round(layout.overlap)}px`);

  // Typing must not change the hero height.
  const heights = await page.evaluate(() => {
    const typed = document.querySelector('[data-typed]');
    const card = document.querySelector('.hero-card');
    if (!typed || !card) return [0, 0, 0];
    const original = typed.textContent;
    const full = card.getBoundingClientRect().height;
    typed.textContent = '';
    const empty = card.getBoundingClientRect().height;
    typed.textContent = 'a gardener';
    const long = card.getBoundingClientRect().height;
    typed.textContent = original;
    return [full, empty, long];
  });
  Math.max(...heights) - Math.min(...heights) < 1
    ? pass('hero height is stable while typing')
    : fail(`hero height changed ${heights.join(' -> ')}`);

  await page.close();
}

// 5. Résumé PDF download
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

// 6. Contact form: validation and mailto draft, no network submission
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

// 7. Hero fallbacks: reduced motion and no JavaScript
{
  const reducedContext = await browser.newContext({ reducedMotion: 'reduce' });
  const reduced = await reducedContext.newPage();
  await reduced.goto(base + '/', { waitUntil: 'networkidle' });
  await reduced.waitForTimeout(2600);
  const reducedRole = (await reduced.locator('[data-typed]').textContent())?.trim();
  reducedRole === 'a developer'
    ? pass('reduced motion keeps the first role static')
    : fail(`reduced motion changed the role to "${reducedRole}"`);
  const carets = await reduced.locator('.hero-card__caret').count();
  carets === 0 ? pass('reduced motion removes the caret') : fail('caret still present under reduced motion');
  await reducedContext.close();

  const noJsContext = await browser.newContext({ javaScriptEnabled: false });
  const noJs = await noJsContext.newPage();
  await noJs.goto(base + '/', { waitUntil: 'domcontentloaded' });
  const noJsRole = (await noJs.locator('[data-typed]').textContent())?.trim();
  noJsRole === 'a developer'
    ? pass('role renders with JavaScript disabled')
    : fail(`role without JavaScript was "${noJsRole}"`);
  const photoLoaded = await noJs
    .locator('[data-photo][data-photo="0"]')
    .evaluate((img) => img.complete && img.naturalWidth > 0);
  photoLoaded ? pass('first photograph loads with JavaScript disabled') : fail('no photograph without JavaScript');
  const noJsCaret = await noJs.locator('.hero-card__caret').isVisible();
  noJsCaret ? fail('caret is visible with JavaScript disabled') : pass('caret hidden with JavaScript disabled');
  await noJsContext.close();
}

// 8. Mobile overflow on every page
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const path of ['/', '/projects/', '/resume/', '/about/', '/contact/']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    overflow <= 1 ? pass(`${path} no horizontal overflow at 390px`) : fail(`${path} overflows ${overflow}px`);

    if (path === '/') {
      const heroOverlap = await page.evaluate(() => {
        const content = document.querySelector('.hero-card__content');
        const media = document.querySelector('.hero-card__media');
        if (!content || !media) return 0;
        const copy = content.getBoundingClientRect();
        const photo = media.getBoundingClientRect();
        return photo.top >= copy.bottom - 1 ? 0 : copy.right - photo.left;
      });
      heroOverlap <= 0
        ? pass('hero photographs stack below the copy at 390px')
        : fail(`hero photographs overlap the copy at 390px by ${Math.round(heroOverlap)}px`);
    }
  }
  await page.close();
}

await browser.close();
console.log(results.join('\n'));
const failures = results.filter((line) => line.startsWith('FAIL'));
console.log(`\n${results.length - failures.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
