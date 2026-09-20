const { request, chromium } = require('@playwright/test');
const { spawn } = require('node:child_process');
const { createServer } = require('node:net');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { randomBytes } = require('node:crypto');
const path = require('node:path');
const assert = require('node:assert/strict');

async function main() {
  const directory = mkdtempSync(path.join(tmpdir(), 'rewoven-api-'));
  const probe = createServer();
  await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
  const port = probe.address().port;
  await new Promise(resolve => probe.close(resolve));
  const email = 'admin@example.test', password = randomBytes(24).toString('hex');
  const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: process.cwd(), windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'development', REWOVEN_BUILD_DIR: '.next-api-test', REWOVEN_DATA_DIR: directory,
      REWOVEN_ADMIN_EMAIL: email, REWOVEN_ADMIN_PASSWORD: password,
      RAZORPAY_KEY_ID: 'rzp_live_disabled_fixture', RAZORPAY_KEY_SECRET: 'local-only',
      REWOVEN_SITE_URL: `http://127.0.0.1:${port}`, REWOVEN_MAIL_WEBHOOK: '' }
  });
  let logs = ''; child.stdout.on('data', b => logs = (logs + b).slice(-12000)); child.stderr.on('data', b => logs = (logs + b).slice(-12000));
  const baseURL = `http://127.0.0.1:${port}`;
  let admin, customer, browser;
  try {
    let ready = false;
    for (let i = 0; i < 60; i++) {
      try { const r = await fetch(baseURL + '/api/rewoven/service/catalog', { signal: AbortSignal.timeout(5000) }); if (r.ok) { ready = true; break; } } catch {}
      if(child.exitCode !== null) throw new Error('Test server exited: ' + logs);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    assert(ready, 'Test server did not become ready: ' + logs);
    admin = await request.newContext({ baseURL }); customer = await request.newContext({ baseURL });
    assert.equal((await customer.get('/api/rewoven/service/admin')).status(), 403);
    assert.equal((await customer.post('/api/rewoven/service/auth', { headers: { origin: 'https://untrusted.example' }, data: {} })).status(), 403);
    assert.equal((await customer.post('/api/rewoven/enquiries', { headers: { origin: 'https://untrusted.example' }, data: {} })).status(), 403);
    assert.equal((await customer.post('/api/rewoven/enquiries', { headers: { origin: baseURL }, data: { type: 'contact', name: 'Test buyer', email: 'buyer@example.test', phone: '9999999999', message: 'Test enquiry' } })).status(), 201);
    assert.equal((await admin.post('/api/rewoven/service/auth', { data: { mode: 'Login', email, password } })).status(), 200);
    let data = await (await admin.get('/api/rewoven/service/admin')).json();
    const row = data.products[0], p = JSON.parse(row.data);
    const variant = data.stock.find(s => s.product_id === p.id);
    const change = { size: variant.size, color: variant.color, expected: variant.quantity, quantity: 3 };
    const payload = { kind: 'product', product: p, tradePrice: row.trade_price, moq: row.moq };
    assert.equal((await admin.post('/api/rewoven/service/admin', { data: { ...payload, stockChanges: [change] } })).status(), 200);
    assert.equal((await admin.post('/api/rewoven/service/admin', { data: { ...payload, stockChanges: [change] } })).status(), 400);
    assert.equal((await admin.post('/api/rewoven/service/admin', { data: { ...payload, stock: 20 } })).status(), 400);
    assert.equal((await admin.post('/api/rewoven/service/admin', { data: payload })).status(), 200);
    browser = await chromium.launch({ executablePath: chromium.executablePath(), headless: true });
    const context = await browser.newContext({ storageState: await admin.storageState() });
    const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto(baseURL + '/admin', { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.getByRole('button', { name: 'Edit', exact: true }).first().click();
    const stockInput = page.locator('input[name="stock_0"]'); assert.equal(await stockInput.inputValue(), '');
    const savedResponse = page.waitForResponse(r => r.url().endsWith('/api/rewoven/service/admin') && r.request().method() === 'POST');
    await page.getByRole('button', { name: 'Save product', exact: true }).click();
    const saved = await savedResponse;
    assert.equal(saved.status(), 200, await saved.text());
    await page.getByRole('status').filter({ hasText: 'Changes saved.' }).waitFor();
    data = await (await admin.get('/api/rewoven/service/admin')).json();
    assert.equal(data.stock.find(s => s.product_id === p.id && s.size === variant.size && s.color === variant.color).quantity, 3);
    assert.deepEqual(errors, []);
    await customer.post('/api/rewoven/service/auth', { data: { mode: 'Sign up', name: 'Trade tester', email: 'trade@example.test', password: 'test-password-long' } });
    const user = (await (await customer.get('/api/rewoven/service/me')).json()).user;
    assert.equal((await customer.get('/api/rewoven/service/trade')).status(), 403);
    await admin.post('/api/rewoven/service/admin', { data: { kind: 'approve', id: user.id, approved: true } });
    await admin.post('/api/rewoven/service/admin', { data: { kind: 'settings', values: { shipping: 0, taxPercent: 0 } } });
    const trade = JSON.parse(data.products[1].data);
    const quote = await customer.post('/api/rewoven/service/quote', { data: { items: [{ id: trade.id, size: trade.sizes[0], color: trade.color, qty: 6 }] } });
    assert.equal(quote.status(), 200, JSON.stringify(await quote.json()));
    const quoteId = (await quote.json()).id;
    await admin.post('/api/rewoven/service/admin', { data: { kind: 'quote', id: quoteId, status: 'APPROVED' } });
    const pay = await customer.post('/api/rewoven/service/quote-pay', { data: { id: quoteId, customer: { name: 'Test', email: 'trade@example.test', phone: '9999999999', address: 'Test street', city: 'Jaipur', state: 'Rajasthan', pincode: '302001' } } });
    assert.equal(pay.status(), 400); assert.match((await pay.json()).error, /test credentials/);
    const quotes = (await (await customer.get('/api/rewoven/service/trade')).json()).quotes;
    assert.equal(quotes.find(q => q.id === quoteId).status, 'APPROVED');
    console.log('PASS: actual admin stock editor, stale inventory rejection, metadata preservation, protected trade access, quote creation, and live-key rejection.');
  } finally {
    await browser?.close(); await admin?.dispose(); await customer?.dispose();
    // Kill only this test server tree, including Next's worker, before removing its private database.
    if (process.platform === 'win32') await new Promise(resolve => { const kill = spawn('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }); kill.on('exit', resolve); });
    else child.kill('SIGTERM');
    const target = path.resolve(directory);
    if (path.dirname(target) !== path.resolve(tmpdir()) || !path.basename(target).startsWith('rewoven-api-')) throw new Error('Unsafe cleanup path');
    rmSync(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
