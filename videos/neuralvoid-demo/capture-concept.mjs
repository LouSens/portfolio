// Renders the NeuralVoid concept design views (design/previews) to images for the demo video.
// Needs the portfolio dev server on :5173.  Run:  node capture-concept.mjs
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire('C:/Users/David/orion/frontend/');
const { chromium } = require('@playwright/test');
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'shots');
const browser = await chromium.launch({ executablePath: 'C:/Users/David/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });
const page = await browser.newPage({ viewport: { width: 1100, height: 760 }, deviceScaleFactor: 2 });
for (const view of ['upload', 'pipeline', 'dashboard', 'report']) {
  await page.goto(`http://localhost:5173/design/previews/render.html?c=neuralvoid&view=${view}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000); // let the entrance animations finish
  const content = page.locator('#stage .min-h-0').first();
  const b = await content.boundingBox();
  await content.screenshot({ path: `${OUT}/${view}.png` });
  console.log(view, Math.round(b.width * 2), Math.round(b.height * 2));
}
await browser.close();
