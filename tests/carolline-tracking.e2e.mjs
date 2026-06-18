import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const html = readFileSync(
  new URL('../nhambi-moema/carolline/index.html', import.meta.url),
  'utf8',
);

async function withPage(webhookResponse, run) {
  const server = createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(html);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  let browser;
  try {
    browser = await chromium.launch({
      executablePath: process.env.CHROME_PATH || undefined,
      headless: true,
    });
    const page = await browser.newPage();
    await page.addInitScript(() => {
      window.openedUrls = [];
      window.open = (url) => {
        window.openedUrls.push(url);
        return {};
      };
    });
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      if (url.startsWith('http://127.0.0.1:')) return route.continue();
      if (url.includes('webhook.figueiramarketing.com.br')) {
        return route.fulfill({
          status: webhookResponse.status,
          contentType: 'application/json',
          body: JSON.stringify(webhookResponse.body),
        });
      }
      return route.abort();
    });

    await page.goto(`http://127.0.0.1:${server.address().port}`, {
      waitUntil: 'domcontentloaded',
    });
    await run(page);
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

async function fillLeadForm(page) {
  await page.locator('#leadName').fill('Pessoa Teste');
  await page.locator('#leadPhone').fill('(11) 99999-9999');
  await page.locator('#leadInterest').selectOption('111m2');
}

test('form_start fires once and successful submit emits the GTM contract', async () => {
  await withPage({ status: 200, body: { success: true } }, async (page) => {
    await page.locator('#leadName').focus();
    await page.locator('#leadPhone').focus();

    const starts = await page.evaluate(() =>
      window.dataLayer.filter((item) => item.event === 'form_start'),
    );
    assert.equal(starts.length, 1);
    assert.equal(starts[0].form_location, 'carolline_contact_section');

    await fillLeadForm(page);
    await page.locator('#leadForm button[type="submit"]').click();
    await page.waitForFunction(() =>
      window.dataLayer.some((item) => item.event === 'lead_form_submit'),
    );

    const submit = await page.evaluate(() =>
      window.dataLayer.find((item) => item.event === 'lead_form_submit'),
    );
    assert.equal('name' in submit, false);
    assert.equal('phone' in submit, false);
    assert.equal('email' in submit, false);
    assert.equal(submit.produto, 'nhambi-moema');
    assert.equal(submit.corretor, 'carolline');
    assert.match(submit.protocolo, /^PROTOCOLO-/);
  });
});

test('failed webhook does not emit lead_form_submit', async () => {
  await withPage(
    { status: 500, body: { success: false, error: 'simulated failure' } },
    async (page) => {
      await fillLeadForm(page);
      await page.locator('#leadForm button[type="submit"]').click();
      await page.waitForFunction(() =>
        window.dataLayer.some((item) => item.event === 'lead_form_submit_error'),
      );

      const submitted = await page.evaluate(() =>
        window.dataLayer.some((item) => item.event === 'lead_form_submit'),
      );
      assert.equal(submitted, false);
    },
  );
});

test('existing WhatsApp click tracking remains active', async () => {
  await withPage({ status: 200, body: { success: true } }, async (page) => {
    await page.locator('.cta-top').click();
    const whatsappEvents = await page.evaluate(() =>
      window.dataLayer.filter((item) => item.event === 'whatsapp_click'),
    );
    assert.equal(whatsappEvents.length, 1);
    assert.equal(whatsappEvents[0].corretor, 'carolline');
  });
});
