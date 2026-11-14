// Keeps the shared navigation identical across boards.
// A board marks a slot as  <!--pd:rail today-->...<!--/pd:rail-->  (or pd:tabs).
// Running this rewrites what is between the markers; the markers stay, so it can be re-run.
const fs = require('fs'); const path = require('path');
const PROJ = path.resolve(__dirname, 'pd-design/project');

const ico = (d, stroke) => `<svg aria-hidden="true" viewBox="0 0 24 24" style="width: 20px; height: 20px; flex: 0 0 20px; fill: none; stroke: ${stroke}; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round">${d}</svg>`;
const ICON = {
  today: '<circle cx="12" cy="12" r="9"></circle><path d="M8 12l3 3 5-6"></path>',
  practice: '<path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z"></path>',
  syllabus: '<path d="M5 6h14M5 12h10M5 18h6"></path>',
  progress: '<path d="M5 19V10M12 19V5M19 19v-6"></path>',
  search: '<circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4.5 4.5"></path>',
  settings: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"></path><circle cx="16" cy="7" r="2"></circle><circle cx="8" cy="17" r="2"></circle>'
};
const PLACES = [
  ['today', 'Today', 'Main.dc.html'],
  ['practice', 'Practice', 'Practice.dc.html'],
  ['syllabus', 'Syllabus', 'Syllabus.dc.html'],
  ['progress', 'Progress', 'Progress.dc.html']
];

function rail(active) {
  const item = ([id, label, href]) => {
    const on = id === active;
    return `<a href="${href}" class="pd-nav"${on ? ' aria-current="page"' : ''} style="display: flex; align-items: center; gap: 12px; min-height: 44px; box-sizing: border-box; padding: 0 12px; border-radius: 10px; ${on ? 'background: #1E222D; color: #ECEEF4' : 'color: #A9AEBD'}; text-decoration: none; font-weight: 500">${ico(ICON[id], on ? '#9BA3FF' : 'currentColor')}${label}</a>`;
  };
  const foot = (id, label, href) => {
    const on = id === active;
    return `<a href="${href}" class="pd-nav"${on ? ' aria-current="page"' : ''} style="display: flex; align-items: center; gap: 12px; min-height: 44px; box-sizing: border-box; padding: 0 12px; border-radius: 10px; ${on ? 'background: #1E222D; color: #ECEEF4' : 'color: #A9AEBD'}; text-decoration: none; font-weight: 500; font-size: 14px">${ico(ICON[id], on ? '#9BA3FF' : 'currentColor')}${label}</a>`;
  };
  return `
<nav aria-label="Main" style="flex: 0 0 216px; box-sizing: border-box; padding: 28px 16px 18px; background: #11141B; border-right: 1px solid #222632; display: flex; flex-direction: column; gap: 22px">
<div style="padding: 0 12px; font-family: 'Inter Tight', Inter, sans-serif; font-weight: 600; font-size: 17px; letter-spacing: -0.01em">Practice Director</div>
<a href="Search.dc.html" class="pd-nav" style="display: flex; align-items: center; gap: 10px; min-height: 40px; box-sizing: border-box; padding: 0 12px; border-radius: 10px; border: 1px solid #262B38; color: #8A90A2; text-decoration: none; font-size: 14px">${ico(ICON.search, 'currentColor').replace(/20px/g, '17px')}<span style="flex: 1 1 auto">Search</span><span style="padding: 1px 7px; border-radius: 6px; border: 1px solid #343A4A; font-size: 12px; color: #8A90A2">/</span></a>
<div style="display: flex; flex-direction: column; gap: 4px">
${PLACES.map(item).join('\n')}
</div>
<div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px">
${foot('settings', 'Settings', 'Settings.dc.html')}
<div style="padding: 0 12px; display: flex; align-items: center; gap: 8px; color: #8A90A2; font-size: 13px"><span style="width: 7px; height: 7px; border-radius: 50%; background: #6FD3A8"></span>Backed up 2 min ago</div>
</div>
</nav>
`;
}

const TAB_HREF = { today: 'Phone-flow.dc.html', practice: 'Phone-places.dc.html', syllabus: 'Phone-places.dc.html', progress: 'Phone-places.dc.html' };
function tabs(active) {
  const item = ([id, label]) => {
    const on = id === active;
    return `<a href="${TAB_HREF[id]}"${on ? ' aria-current="page"' : ''} style="flex: 1 1 0; min-height: 48px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; text-decoration: none; font-size: 11px; font-weight: 500; color: ${on ? '#9BA3FF' : '#8A90A2'}">${ico(ICON[id], 'currentColor').replace(/20px/g, '22px')}${label}</a>`;
  };
  return `
<nav aria-label="Main" style="flex: 0 0 auto; display: flex; padding: 8px 8px 20px; background: #11141B; border-top: 1px solid #222632">
${PLACES.map(item).join('\n')}
</nav>
`;
}

const GEN = { rail, tabs };
let changed = 0;
for (const f of fs.readdirSync(PROJ).filter((n) => n.endsWith('.dc.html'))) {
  const file = path.join(PROJ, f);
  const src = fs.readFileSync(file, 'utf8');
  const out = src.replace(/<!--pd:(rail|tabs) ([a-z-]+)-->[\s\S]*?<!--\/pd:\1-->/g, (m, kind, arg) => `<!--pd:${kind} ${arg}-->${GEN[kind](arg)}<!--/pd:${kind}-->`);
  if (out !== src) { fs.writeFileSync(file, out); changed++; console.log('injected', f); }
}
console.log('files changed:', changed);
