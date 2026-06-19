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
  const webhookRequests = [];
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
        webhookRequests.push(route.request().postDataJSON());
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
    await run(page, webhookRequests);
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
  await page.locator('#leadPurpose').selectOption('Investir');
  await page.locator('#leadTimeline').selectOption('Até 3 meses');
}

test('form_start fires once and successful submit emits the GTM contract', async () => {
  await withPage({ status: 200, body: { success: true } }, async (page, webhookRequests) => {
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
    assert.equal(submit.lead_purpose, 'Investir');
    assert.equal(submit.purchase_timeline, 'Até 3 meses');
    assert.match(submit.protocolo, /^PROTOCOLO-/);
    assert.equal(webhookRequests[0].purpose, 'Investir');
    assert.equal(webhookRequests[0].purchase_timeline, 'Até 3 meses');
    assert.equal(webhookRequests[0].interest, 'Investir');
    assert.equal(webhookRequests[0].schedule, 'Até 3 meses');

    await page.locator('#leadThankYou').waitFor({ state: 'visible' });
    const openedBeforeChoice = await page.evaluate(() => window.openedUrls.length);
    assert.equal(openedBeforeChoice, 0);

    await page.locator('#thankYouWhatsapp').click();
    const qualifiedEvents = await page.evaluate(() =>
      window.dataLayer.filter((item) => item.event === 'qualified_whatsapp_action'),
    );
    assert.equal(qualifiedEvents.length, 1);
    assert.equal(qualifiedEvents[0].protocolo, submit.protocolo);
    assert.equal(qualifiedEvents[0].lead_temperature, 'hot');
    assert.equal(qualifiedEvents[0].lead_purpose, 'Investir');
    const genericWhatsappEvents = await page.evaluate(() =>
      window.dataLayer.filter((item) => item.event === 'whatsapp_click'),
    );
    assert.equal(genericWhatsappEvents.length, 0);
    const openedUrl = await page.evaluate(() => window.openedUrls.at(-1));
    assert.match(decodeURIComponent(openedUrl), /LEAD QUALIFICADO/);
    assert.match(decodeURIComponent(openedUrl), /Objetivo: Investir/);
    assert.match(decodeURIComponent(openedUrl), /Prazo para adquirir: Até 3 meses/);
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
      await page.locator('#leadThankYou').waitFor({ state: 'hidden' });
      const openedUrls = await page.evaluate(() => window.openedUrls.length);
      assert.equal(openedUrls, 0);
    },
  );
});

test('invalid phone is rejected before submission', async () => {
  await withPage({ status: 200, body: { success: true } }, async (page) => {
    await page.locator('#leadName').fill('Pessoa Teste');
    await page.locator('#leadPhone').fill('123');
    await page.locator('#leadPurpose').selectOption('Morar');
    await page.locator('#leadTimeline').selectOption('De 3 a 6 meses');
    await page.locator('#leadForm button[type="submit"]').click();

    await page.locator('#leadFormStatus.is-error').waitFor({ state: 'visible' });
    const submitted = await page.evaluate(() =>
      window.dataLayer.some((item) => item.event === 'lead_form_submit'),
    );
    assert.equal(submitted, false);
  });
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
