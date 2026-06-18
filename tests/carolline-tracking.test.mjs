import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = readFileSync(
  new URL('../nhambi-moema/carolline/index.html', import.meta.url),
  'utf8',
);

test('uses the requested form event names without a direct generate_lead push', () => {
  assert.match(html, /event:\s*["']form_start["']/);
  assert.match(html, /event:\s*["']lead_form_submit["']/);
  assert.doesNotMatch(html, /event:\s*["']generate_lead["']/);
  assert.doesNotMatch(html, /event:\s*["']lead_form_start["']/);
  assert.doesNotMatch(html, /event:\s*["']lead_form_submit_success["']/);
});

test('fires form_start once per page load on the first form interaction', () => {
  assert.match(html, /var leadFormTouched = false;/);
  assert.match(
    html,
    /leadForm\.addEventListener\("focusin"[\s\S]*?if\(leadFormTouched\) return;[\s\S]*?leadFormTouched = true;[\s\S]*?event:\s*"form_start"/,
  );
});

test('pushes lead_form_submit only after a successful webhook response', () => {
  const successBlock = html.match(/if\(webhookOk\)\{([\s\S]*?)\}\s*else\s*\{/);

  assert.ok(successBlock, 'success-only branch should exist');
  assert.match(successBlock[1], /event:\s*"lead_form_submit"/);
});

test('exposes the requested dataLayer contract for the form', () => {
  for (const key of [
    'form_location',
    'lead_source',
    'protocolo',
    'produto',
    'corretor',
    'tipo_pagina',
    'content_name',
    'content_category',
  ]) {
    assert.match(html, new RegExp(`\\b${key}:`), `missing dataLayer key: ${key}`);
  }
});

test('does not expose personally identifiable information to GTM tags', () => {
  const successBlock = html.match(/if\(webhookOk\)\{([\s\S]*?)\}\s*else\s*\{/);

  assert.ok(successBlock, 'success-only branch should exist');
  assert.doesNotMatch(successBlock[1], /\b(?:name|email|phone):/);
});

test('keeps the existing WhatsApp tracking event', () => {
  assert.match(html, /event:\s*"whatsapp_click"/);
  assert.match(html, /data-whatsapp-link/);
});
