const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {DatabaseSync}=require('node:sqlite');
(async()=>{
  const browser=await chromium.launch({executablePath:chromium.executablePath(),headless:true});
  const context=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const base='http://localhost:3000';const email=`rewoven-browser-${Date.now()}@example.test`;let reference;
  fs.mkdirSync('tests/artifacts',{recursive:true});
  try{
    await page.goto(base+'/shop',{waitUntil:'networkidle'});
    assert.equal(await page.locator('.product-card').count(),8);
    await page.selectOption('select[aria-label="Colour"]','Burgundy');
    assert.equal(await page.locator('.product-card').count(),2);
    await page.getByRole('button',{name:'Clear all'}).click();
    await page.selectOption('select[aria-label="Sort products"]','low');
    assert.match(await page.locator('.product-info h3').first().innerText(),/Raahi/);
    await page.locator('.product-card').first().hover();await page.getByRole('button',{name:'Quick View'}).first().click();
    await page.getByRole('button',{name:'Add to bag',exact:true}).click();assert.match(await page.locator('.error').innerText(),/select a colour/);
    await page.getByRole('button',{name:'Sage',exact:true}).click();await page.getByRole('button',{name:'M',exact:true}).click();await page.getByRole('button',{name:'Add to bag',exact:true}).click();assert.equal(await page.locator('.bag-item').count(),1);
    await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').count(),0);
    await page.reload({waitUntil:'networkidle'});await page.getByRole('button',{name:'Open shopping bag'}).click();assert.equal(await page.locator('.bag-item').count(),1);await page.keyboard.press('Escape');
    await page.locator('.heart').first().click();await page.goto(base+'/wishlist',{waitUntil:'networkidle'});assert.equal(await page.locator('.product-card').count(),1);
    const signup=await context.request.post(base+'/api/rewoven/service/auth',{data:{mode:'Sign up',name:'Browser verification',email,password:'test-password-2026-long'}});assert.equal(signup.status(),200);
    await page.goto(base+'/account',{waitUntil:'networkidle'});assert.match(await page.locator('h1').innerText(),/Browser verification/);
    const save=await context.request.post(base+'/api/rewoven/service/addresses',{data:{addresses:['Test address, Jaipur, Rajasthan, 302001']}});assert.equal(save.status(),200);
    assert.equal((await context.request.get(base+'/api/rewoven/service/admin')).status(),403);
    assert.equal((await context.request.get(base+'/api/rewoven/service/trade')).status(),403);
    assert.equal((await context.request.post(base+'/api/rewoven/service/admin',{data:{kind:'approve',id:'self',approved:true}})).status(),403);
    const enquiry=await context.request.post(base+'/api/rewoven/enquiries',{data:{type:'wholesale',name:'Browser verification',email,phone:'9999999999',business:'Test retailer',city:'Jaipur',businessType:'Retail store',quantity:'12',category:'Sherwani'}});assert.equal(enquiry.status(),201);reference=(await enquiry.json()).reference;
    const totals=await context.request.post(base+'/api/rewoven/service/totals',{data:{items:[{id:'aara-ivory-sherwani',size:'M',color:'Ivory',qty:1,price:1}]}});assert.equal((await totals.json()).subtotal,18990);
    assert.equal((await context.request.post(base+'/api/rewoven/service/totals',{data:{items:[{id:'aara-ivory-sherwani',size:'XXL',color:'Ivory',qty:1}]}})).status(),400);
    assert.equal((await context.request.post(base+'/api/rewoven/service/verify',{data:{razorpay_order_id:'forged',razorpay_payment_id:'forged',razorpay_signature:'bad'}})).status(),400);
    await context.request.post(base+'/api/rewoven/service/logout',{data:{}});
    await page.goto(base+'/shop',{waitUntil:'networkidle'});
    for(const card of await page.locator('.product-card').all()){await card.scrollIntoViewIfNeeded()}
    await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(500);
    await page.screenshot({path:'tests/artifacts/collection-desktop.png',fullPage:true});
    const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));assert.deepEqual(broken,[]);
    await page.goto(base,{waitUntil:'networkidle'});await page.screenshot({path:'tests/artifacts/home-desktop.png',fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:'tests/artifacts/home-mobile.png',fullPage:true});
    await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('dialog').getByRole('link',{name:'Shop All',exact:true}).click();await page.waitForURL('**/shop');
    await page.getByRole('button',{name:'Filters',exact:false}).click();await page.selectOption('select[aria-label="Colour"]','Ivory');await page.getByRole('button',{name:/Show .* pieces/}).click();assert.equal(await page.locator('.product-card').count(),2);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.screenshot({path:'tests/artifacts/collection-mobile.png',fullPage:true});
    assert.deepEqual(errors,[]);console.log('PASS: desktop/mobile, image loads, filters, sorting, quick view validation, keyboard dismissal, cart persistence, wishlist, accounts, addresses, admin/trade authorization, wholesale enquiry, server pricing and signature rejection.');
  }finally{
    await browser.close();const db=new DatabaseSync(path.join(process.cwd(),'.rewoven-data','store.sqlite'));const user=db.prepare('SELECT id FROM users WHERE email=?').get(email);if(user){db.prepare('DELETE FROM sessions WHERE user_id=?').run(user.id);db.prepare('DELETE FROM users WHERE id=?').run(user.id)}if(reference)db.prepare('DELETE FROM enquiries WHERE id=?').run(reference);db.prepare('DELETE FROM rate_limits WHERE key LIKE ?').run('%'+email+'%');db.close();
  }
})().catch(e=>{console.error(e);process.exitCode=1});

