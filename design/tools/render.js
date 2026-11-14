const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const PROJ = path.resolve('pd-design/project');
const RT = path.resolve('artifact-files/f6011868-0587-4e43-a3ae-df6fe7e5fe3c/artifact-type/dc-runtime.js');
const boards = JSON.parse(fs.readFileSync(path.join(PROJ,'canvas.json'),'utf8')).boards;
const only = process.argv[2];
if (only && process.argv[3]) { for (const k of Object.keys(boards)) delete boards[k]; boards[only + '.dc.html'] = { w: +process.argv[3], h: +process.argv[4] }; }
(async () => {
  const b = await chromium.launch();
  for (const [name, f] of Object.entries(boards)) {
    if (only && !name.startsWith(only)) continue;
    const p = await b.newPage({ viewport: { width: f.w, height: f.h }, deviceScaleFactor: 1 });
    p.on('pageerror', e => console.log(name, 'PAGEERR', e.message.slice(0,300)));
    p.on('console', m => { if (m.type()==='error') console.log(name, 'CONSOLE', m.text().slice(0,300)); });
    await p.route('http://dc.local/**', route => {
      const rel = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\//,'');
      if (rel === 'support.js') return route.fulfill({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(RT) });
      const file = path.join(PROJ, rel);
      if (!file.startsWith(PROJ) || !fs.existsSync(file)) return route.fulfill({ status: 404, body: '' });
      route.fulfill({ status: 200, contentType: rel.endsWith('.html') ? 'text/html' : 'application/octet-stream', body: fs.readFileSync(file) });
    });
    await p.goto('http://dc.local/' + name);
    await p.waitForTimeout(2500);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    console.log(name, 'scrollHeight', h, 'frame', f.h, 'textlen', await p.evaluate(()=>document.body.innerText.length));
    await p.screenshot({ path: `review/${name.replace('.dc.html','')}.png`, fullPage: true });
    await p.close();
  }
  await b.close();
})();
