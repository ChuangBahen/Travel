#!/usr/bin/env node
/*
 * 自動產生 GitHub Pages 首頁 index.html
 * 掃描 trips/<趟>/，凡有 output/travel-guide.html 者列為一張卡片。
 * 每趟的顯示資訊讀自 trips/<趟>/trip.json（沒有就用資料夾名當標題）。
 * 由 .github/workflows/static.yml 在每次 push 部署前自動執行 → 新增旅遊免手動改首頁。
 * 本機預覽：node scripts/build-index.mjs
 */
import { readdirSync, existsSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const TRIPS = join(ROOT, 'trips');

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadTrips() {
  if (!existsSync(TRIPS)) return [];
  const out = [];
  for (const name of readdirSync(TRIPS)) {
    const dir = join(TRIPS, name);
    if (!statSync(dir).isDirectory()) continue;
    const guide = join(dir, 'output', 'travel-guide.html');
    if (!existsSync(guide)) continue; // 沒有手冊就不上架

    let meta = {};
    const metaPath = join(dir, 'trip.json');
    if (existsSync(metaPath)) {
      try { meta = JSON.parse(readFileSync(metaPath, 'utf8')); }
      catch (e) { console.warn(`! trip.json 解析失敗 (${name}): ${e.message}`); }
    }
    const hasFinal = existsSync(join(dir, 'output', 'FINAL_GUIDE.md'));
    out.push({
      slug: name,
      title: meta.title || name,
      emoji: meta.emoji || '🧳',
      dates: meta.dates || '',
      duration: meta.duration || '',
      party: meta.party || '',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      sortDate: meta.sortDate || name,
      guideHref: `trips/${name}/output/travel-guide.html`,
      finalHref: hasFinal ? `trips/${name}/output/FINAL_GUIDE.md` : null,
    });
  }
  out.sort((a, b) => String(a.sortDate).localeCompare(String(b.sortDate)));
  return out;
}

function card(t) {
  const tags = t.tags.map(x => `<span class="tag">${esc(x)}</span>`).join('');
  const meta2 = t.party ? `<div class="meta">👨‍👩‍👧‍👦 ${esc(t.party)}</div>` : '';
  const dates = (t.dates || t.duration)
    ? `<div class="meta">📅 ${esc(t.dates)}${t.duration ? ` ｜ ${esc(t.duration)}` : ''}</div>` : '';
  const final = t.finalHref
    ? `\n      <a class="btn ghost" href="${esc(t.finalHref)}">文字版</a>` : '';
  return `  <div class="card">
    <h2>${esc(t.emoji)} ${esc(t.title)}</h2>
    ${dates}
    ${meta2}
    <div class="tags">${tags}</div>
    <div class="spacer"></div>
    <div class="btnrow">
      <a class="btn" href="${esc(t.guideHref)}">開啟手冊</a>${final}
    </div>
  </div>`;
}

function render(trips) {
  const cards = trips.length
    ? trips.map(card).join('\n\n')
    : '  <p class="note">目前還沒有已產出手冊的旅遊。</p>';
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
<meta name="theme-color" content="#0d9488">
<title>🧳 家族旅遊手冊總覽</title>
<!-- 此檔由 scripts/build-index.mjs 自動產生，請勿手動編輯；新增旅遊請放 trips/<趟>/trip.json -->
<style>
:root{
  --bg:#f5f5f7; --card:#fff; --text:#1d1d1f; --muted:#6e6e73; --border:#d2d2d7; --accent:#0d9488;
}
@media (prefers-color-scheme: dark){
  :root{ --bg:#1c1c1e; --card:#2c2c2e; --text:#f5f5f7; --muted:#a1a1a6; --border:#38383a; }
}
*{box-sizing:border-box;}
body{margin:0;font-family:"Microsoft JhengHei","PingFang TC","Noto Sans TC",-apple-system,BlinkMacSystemFont,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;}
header{background:linear-gradient(135deg,var(--accent) 0%,#22c55e 100%);color:#fff;padding:32px 16px;text-align:center;}
header h1{margin:0 0 8px;font-size:24px;}
header p{margin:0;opacity:.95;font-size:14px;}
main{max-width:900px;margin:0 auto;padding:16px;}
.grid{display:grid;grid-template-columns:1fr;gap:16px;}
@media (min-width:640px){.grid{grid-template-columns:1fr 1fr;}}
.card{background:var(--card);border-radius:14px;padding:18px;box-shadow:0 1px 3px rgba(0,0,0,.08);border-left:6px solid var(--accent);display:flex;flex-direction:column;}
.card h2{margin:0 0 6px;font-size:18px;}
.card .meta{font-size:13px;color:var(--muted);margin:2px 0;}
.card .tags{margin:8px 0 14px;}
.tag{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600;margin:2px 4px 2px 0;background:var(--bg);border:1px solid var(--border);color:var(--muted);}
.card .spacer{flex:1;}
.btn{display:inline-block;text-align:center;padding:10px 14px;border-radius:22px;background:var(--accent);color:#fff !important;text-decoration:none;font-weight:700;font-size:14px;}
.btn.ghost{background:transparent;color:var(--accent) !important;border:2px solid var(--accent);}
.btnrow{display:flex;flex-wrap:wrap;gap:8px;}
.note{font-size:13px;color:var(--muted);margin:24px 0 8px;text-align:center;}
footer{text-align:center;padding:24px 16px;font-size:12px;color:var(--muted);}
a.src{color:var(--accent);}
</style>
</head>
<body>
<header>
<h1>🧳 家族旅遊手冊總覽</h1>
<p>點選任一趟旅遊即可開啟手機版手冊（可離線、Ctrl+P 列印 PDF）</p>
</header>
<main>
<div class="grid">

${cards}

</div>

<p class="note">📂 原始檔與規劃資料：<a class="src" href="https://github.com/ChuangBahen/Travel">github.com/ChuangBahen/Travel</a></p>
</main>
<footer>家族旅遊規劃工作區 ｜ 本頁每次 push 自動重建（共 ${trips.length} 趟）</footer>
</body>
</html>
`;
}

const trips = loadTrips();
writeFileSync(join(ROOT, 'index.html'), render(trips), 'utf8');
console.log(`index.html 已產生，共 ${trips.length} 趟：`);
for (const t of trips) console.log(`  - ${t.slug} → ${t.title}`);
