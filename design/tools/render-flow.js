const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const PROJ = path.resolve('pd-design/project');
const RT = path.resolve('artifact-files/f6011868-0587-4e43-a3ae-df6fe7e5fe3c/artifact-type/dc-runtime.js');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +(process.env.W||390), height: +(process.env.H||844) }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('PAGEERR', e.message.slice(0,300)));
  await p.route('http://dc.local/**', route => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\//,'');
    if (rel === 'support.js') return route.fulfill({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(RT) });
    const file = path.join(PROJ, rel);
    if (!fs.existsSync(file)) return route.fulfill({ status: 404, body: '' });
    route.fulfill({ status: 200, contentType: 'text/html', body: fs.readFileSync(file) });
  });
  await p.goto('http://dc.local/' + (process.argv[2] || 'Phone-flow.dc.html'));
  await p.waitForTimeout(2000);
  const steps = (process.argv[3] || 'Start|Show key points|Got it|Show key points|Partly|Time pressure|Got it now').split('|');
  let i = 1;
  for (const s of steps) {
    await p.getByRole('button', { name: s, exact: false }).first().click({ timeout: 4000 }).catch(e => console.log('click fail', s));
    await p.waitForTimeout(900);
    await p.screenshot({ path: `review/flow-${i++}.png` });
  }
  await b.close();
})();
