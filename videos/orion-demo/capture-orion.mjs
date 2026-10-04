// Drives the local Orion front end and saves full-size captures of each step of the claim flow,
// plus the on-screen position of the controls a cursor would use.
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('C:/Users/David/orion/frontend/');
const { chromium } = require('@playwright/test');

const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });
const boxes = {};
const browser = await chromium.launch({ executablePath: 'C:/Users/David/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe' });

const VALUES = [
  [/full name/i, 'David Kurniawan'],
  [/employee id/i, 'EMP-1042'],
  [/manager id/i, 'MGR-0207'],
  [/team/i, 'Engineering'],
  [/email/i, 'david@orion.example'],
  [/code/i, 'ORION-DEMO-2026'],
];

async function session(role, run) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });
  // The backend wants an API key that the front end never sends; attach the repo's default dev key.
  await page.route('http://localhost:8000/**', (route) =>
    route.continue({ headers: { ...route.request().headers(), 'x-api-key': 'dev-key' } })
  );
  const shot = async (name, wait = 1500) => {
    await page.waitForTimeout(wait);
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log('shot', name);
  };
  const box = async (key, locator) => {
    try {
      const b = await locator.first().boundingBox({ timeout: 3000 });
      boxes[key] = b && { x: Math.round(b.x * 1.5), y: Math.round(b.y * 1.5), w: Math.round(b.width * 1.5), h: Math.round(b.height * 1.5) };
    } catch {
      boxes[key] = null;
    }
    console.log('box', key, JSON.stringify(boxes[key]));
  };
  const dump = async (label) => {
    const items = await page.evaluate(() =>
      [...document.querySelectorAll('button, textarea, input, select, h1, h2, h3, h4')]
        .map((el) => {
          const r = el.getBoundingClientRect();
          return [el.tagName, (el.innerText || el.placeholder || el.getAttribute('aria-label') || '').slice(0, 40).replace(/\n/g, ' '), Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)].join('|');
        })
        .filter((i) => !/\|0\|0$/.test(i))
    );
    console.log('--', label, items.join('  ;  '));
  };

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  if (role === 'employee') await shot('01-splash');
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(1200);
  if (role === 'employee') {
    await shot('02-role-select');
    await box('role-employee', page.getByRole('button', { name: /sign in as employee/i }));
  }
  await page.getByRole('button', { name: new RegExp(`sign in as ${role}`, 'i') }).click();
  await page.waitForTimeout(900);

  // the sign-in form is front-end only; fill every field with demo values
  const fields = page.locator('label');
  const n = await fields.count();
  for (let i = 0; i < n; i++) {
    const text = (await fields.nth(i).innerText()).trim();
    const input = fields.nth(i).locator('xpath=following::*[self::input or self::select][1]');
    const tag = await input.evaluate((el) => el.tagName).catch(() => null);
    if (tag === 'SELECT') await input.selectOption({ index: 1 });
    else if (tag === 'INPUT') {
      const hit = VALUES.find(([re]) => re.test(text));
      await input.fill(hit ? hit[1] : 'Demo');
    }
  }
  if (role === 'employee') {
    await shot('03-signin', 600);
    await box('signin-continue', page.getByRole('button', { name: /continue to dashboard/i }));
  }
  await page.getByRole('button', { name: /continue to dashboard/i }).click();
  await page.waitForURL(`**/${role}`, { timeout: 8000 });
  await page.waitForTimeout(2500);
  await run({ page, shot, box, dump });
  await page.close();
}

await session('employee', async ({ page, shot, box, dump }) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('04-employee-dashboard');
  await box('agent-intelligence', page.getByText('Agent Intelligence').first());
  await box('claim-timeline', page.getByText('AI Parsing & Extraction').first());
  await dump('employee');
  const fab = page.locator('button.fixed').last();
  await box('new-claim-fab', fab);
  await fab.click();
  await shot('05-claim-empty', 1200);
  const area = page.locator('textarea').first();
  await box('claim-textarea', area);
  await area.fill('Took a client to dinner at Sate Khas Senayan on 14 May after the product demo: RM 186.40 for four people. Also renewed our Canva Pro seat for the design sprint, RM 59.90.');
  await shot('06-claim-typed', 600);
  await dump('claim modal');
  await box('claim-continue', page.getByRole('button', { name: /continue/i }));

  // submit for real: the backend runs the six agents and writes the decision to the ledger
  if (process.argv.includes('--submit')) {
    await page.getByRole('button', { name: /continue/i }).click();
    await shot('06b-claim-processing', 1500);
    await page.getByText(/processing with ai agents/i).waitFor({ state: 'hidden', timeout: 180000 });
    await shot('06c-claim-extracted', 1200);
    await dump('extracted');
    await box('extracted-continue', page.getByRole('button', { name: /continue/i }));
    await page.getByRole('button', { name: /continue/i }).click();
    await shot('06d-claim-decision', 1200);
    await dump('decision');
    await box('decision-history', page.getByRole('button', { name: /view in history/i }));
    await page.getByRole('button', { name: /view in history/i }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await shot('06e-dashboard-after', 1500);
    await box('agent-intelligence-after', page.getByText('Agent Intelligence').first());
  }
});

await session('manager', async ({ page, shot, box, dump }) => {
  await shot('07-manager');
  const card = page.getByText('Raj Kumar').first();
  await box('manager-reasoning', page.getByText('AI Agent Reasoning').last());
  await box('manager-card-name', card);
  const b = await card.boundingBox();
  // approve the top card the way the app expects: drag it to the right
  await page.mouse.move(b.x + 60, b.y + 200);
  await page.mouse.down();
  await page.mouse.move(b.x + 180, b.y + 200, { steps: 10 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/07b-manager-dragging.png` });
  await page.mouse.move(b.x + 620, b.y + 200, { steps: 14 });
  await page.mouse.up();
  await shot('07c-manager-approved', 900);
  await dump('manager after');
});

await session('finance', async ({ page, shot, box, dump }) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('08-finance');
  await box('finance-policy', page.getByText('Business justification required').first());
  const row = page.getByRole('button').filter({ hasText: /RM\s?\d/ }).first();
  await row.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 260));
  await shot('09-audit-trail', 900);
  await box('audit-row', row);
  await row.click();
  await shot('10-audit-expanded', 1200);
  await box('audit-verify', page.getByText(/verify on ledger/i).first());
  await dump('audit');
});

fs.writeFileSync(`${OUT}/boxes.json`, JSON.stringify(boxes, null, 2));
await browser.close();
