// Walks the rebuilt NeuralVoid interface end to end against the local app and saves a picture of
// every screen. Uploads an older slice of the made-up history first, then the full one, so the
// "Since last time" comparison appears.  Run:  node check-new-ui.mjs <output-dir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire('C:/Users/David/orion/frontend/');
const { chromium } = require('@playwright/test');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

// an earlier upload: the same history without its last 14 days
const full = fs.readFileSync(path.join(HERE, 'Watch History.txt'), 'utf8');
const earlier = full
  .split('\n\n')
  .filter((block) => (block.match(/Date: (\d{4}-\d{2}-\d{2})/) || [])[1] < '2026-09-14')
  .join('\n\n');
fs.writeFileSync(path.join(OUT, 'Watch History (earlier).txt'), earlier);

const browser = await chromium.launch({ executablePath: 'C:/Users/David/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, acceptDownloads: true });
const page = await context.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
const shot = async (name, wait = 700) => {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log('shot', name);
};
const upload = async (file) => {
  await page.getByRole('button', { name: /upload my watch history/i }).click();
  await page.setInputFiles('#fu', file);
  await page.getByText(/about [\d,]+ videos/).waitFor();
};

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await shot('01-welcome');
await upload(path.join(OUT, 'Watch History (earlier).txt'));
await shot('02-add-file');
await page.getByRole('button', { name: /show me my summary/i }).click();
await shot('03-reading', 1700);
await page.getByRole('heading', { name: /you watched about/i }).waitFor({ timeout: 120000 });
await shot('04-summary-first-visit');

// second upload: the full history, which should now be compared with the first
await page.getByRole('button', { name: /check another file/i }).click();
await upload(path.join(HERE, 'Watch History.txt'));
await page.getByRole('button', { name: /show me my summary/i }).click();
await page.getByRole('heading', { name: /you watched about/i }).waitFor({ timeout: 120000 });
await shot('05-summary-since-last-time');
console.log('summary text:', (await page.locator('main').innerText()).replace(/\n+/g, ' | ').slice(0, 900));

await page.getByRole('button', { name: 'When you watch' }).click();
await shot('06-when');
await page.getByRole('button', { name: 'How you watch' }).click();
await shot('07-how');
await page.getByRole('button', { name: 'Your plan' }).click();
await page.getByRole('button', { name: /show me the taps/i }).click();
await shot('08-plan');
console.log('plan text:', (await page.locator('main').innerText()).replace(/\n+/g, ' | ').slice(0, 1400));

const [reminder] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /add the reminder/i }).click()]);
await reminder.saveAs(`${OUT}/reminder.ics`);
await page.getByRole('button', { name: /save my summary/i }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/09-save.png` });
const [picture] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /save as a picture/i }).click()]);
await picture.saveAs(`${OUT}/my-tiktok-summary.png`);
await page.keyboard.press('Escape');

// phone width
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole('button', { name: 'Summary', exact: true }).click();
await shot('10-phone-summary');
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log('phone horizontal overflow px:', overflow);
await page.getByRole('button', { name: 'Your plan' }).click();
await shot('11-phone-plan');

// example mode, in a clean page
await page.setViewportSize({ width: 1280, height: 800 });
await page.getByRole('button', { name: /check another file/i }).click();
await page.getByRole('button', { name: /see an example first/i }).click();
await shot('12-example');
console.log('errors:', errors.length ? errors.join(' || ') : 'none');
await browser.close();
