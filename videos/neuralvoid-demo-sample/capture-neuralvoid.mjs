// Drives the local NeuralVoid app (front end on :5173, API on :8000) with the made-up sample history
// and saves full-size captures of each step, plus the position of the controls a cursor would use.
// Run:  node capture-neuralvoid.mjs <output-dir>
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire('C:/Users/David/orion/frontend/');
const { chromium } = require('@playwright/test');

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2];
const K = 1.5;
fs.mkdirSync(OUT, { recursive: true });
const boxes = {};
const browser = await chromium.launch({ executablePath: 'C:/Users/David/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: K });

const shot = async (name, wait = 1500) => {
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log('shot', name);
};
const box = async (key, locator) => {
  try {
    const b = await locator.first().boundingBox({ timeout: 3000 });
    boxes[key] = b && { x: Math.round(b.x * K), y: Math.round(b.y * K), w: Math.round(b.width * K), h: Math.round(b.height * K) };
  } catch {
    boxes[key] = null;
  }
  console.log('box', key, JSON.stringify(boxes[key]));
};
const dump = async (label) => {
  const items = await page.evaluate(() =>
    [...document.querySelectorAll('button, h1, h2, h3, h4')]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return [el.tagName, (el.innerText || '').slice(0, 44).replace(/\n/g, ' '), Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)].join('|');
      })
      .filter((i) => !/\|0\|0$/.test(i))
  );
  console.log('--', label, 'pageH', await page.evaluate(() => document.documentElement.scrollHeight), items.join('  ;  '));
};
const scrollShots = async (prefix) => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  let n = 0;
  for (let y = 0; y < h - 200; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await shot(`${prefix}-${String.fromCharCode(97 + n)}`, 900);
    n += 1;
    if (n > 5) break;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
};

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await shot('01-landing');
await box('analyze-button', page.getByRole('button', { name: /analyze my data/i }));
await page.getByRole('button', { name: /analyze my data/i }).first().click();
await shot('02-upload', 900);
await box('dropzone', page.getByText(/click or drag/i));
await page.setInputFiles('#fu', path.join(HERE, 'Watch History.txt'));
await shot('03-file-chosen', 700);
await box('run-button', page.getByRole('button', { name: /run full analysis/i }));
await page.getByRole('button', { name: /run full analysis/i }).click();
await page.waitForTimeout(350);
await page.screenshot({ path: `${OUT}/04-analyzing.png` });
await page.getByRole('button', { name: /overview/i }).first().waitFor({ timeout: 120000 });
await page.waitForTimeout(2500);
await dump('overview');
await scrollShots('05-overview');
for (const [tab, prefix] of [['Sessions', '06-sessions'], ['Patterns', '07-patterns']]) {
  await box(`tab-${tab.toLowerCase()}`, page.getByRole('button', { name: tab, exact: true }));
  await page.getByRole('button', { name: tab, exact: true }).first().click();
  await page.waitForTimeout(1500);
  await dump(tab);
  await scrollShots(prefix);
}
fs.writeFileSync(`${OUT}/boxes.json`, JSON.stringify(boxes, null, 2));
await browser.close();
