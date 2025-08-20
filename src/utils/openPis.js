// src/utils/pis.js
export async function openPisFromUrl(jsonUrl) {
  const r = await fetch(jsonUrl, { cache: "no-store" });
  if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
  const d = await r.json();
  const html = renderPisHTML(d);
  const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
  window.open(url, "_blank", "noopener");
}

function esc(x){return x==null?"":String(x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
const li = a => (a||[]).map(x=>`<li>${esc(x)}</li>`).join("");
const kv = o => Object.entries(o||{}).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("");
const steps = a => (a||[]).map(s=>`<div class="step"><b>${s.step}. ${esc(s.label||"")}</b><div>${esc(s.product||"")}</div><small>${esc(s.purpose||"")}</small></div>`).join("");

export function renderPisHTML(d){
return `<!doctype html><html lang="en"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(d.sheet_title||"Product Information Sheet")}</title>
<style>
:root{--p:#5E3A98;--g:#C9A941;--bd:#e5e7eb;--mut:#6b7280}
*{box-sizing:border-box} body{font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;margin:0;padding:28px;color:#111}
header{border-bottom:3px solid var(--p);padding-bottom:10px;margin-bottom:20px}
h1{margin:0 0 6px;color:var(--p)} h2{font-size:18px;margin:18px 0 8px}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.card{border:1px solid var(--bd);border-radius:12px;padding:14px}
ul{margin:6px 0 0 18px} table{width:100%;border-collapse:collapse}
td{border-top:1px solid var(--bd);padding:6px;vertical-align:top}
.tag{background:var(--g);color:#fff;padding:3px 8px;border-radius:999px;font-size:12px}
.muted{color:var(--mut);font-size:13px} .step{border-left:3px solid var(--g);padding:8px 10px;margin:6px 0;background:#fff8e1;border-radius:6px}
footer{margin-top:22px;font-size:12px;color:var(--mut)}
</style></head><body>
<header><h1>${esc(d.sheet_title||"")}</h1><div class="muted">${esc(d.pis_title||"")}</div></header>
<section class="card"><h2>Overview</h2><p>${esc(d.product_overview||"")}</p></section>
<section class="grid">
  <div class="card"><h2>Key Features</h2><ul>${li(d.key_features)}</ul></div>
  <div class="card"><h2>Recommended Use</h2><p class="muted">${esc(d?.recommended_use?.intro||"")}</p><ul>${li(d?.recommended_use?.items)}</ul></div>
  <div class="card"><h2>Application System</h2>${steps(d.application_system)}</div>
  <div class="card"><h2>Application Tools</h2><ul>${li(d.application_tools)}</ul></div>
  <div class="card"><h2>Timings</h2><table>${kv(d.timings)}</table></div>
  <div class="card"><h2>Coverage & Finish</h2>
    <div><span class="tag">Coverage</span> ${esc(d.coverage||"")}</div>
    <div style="margin-top:6px;"><span class="tag">Finish</span> ${esc(d.finish||"")}</div>
    <div class="muted" style="margin-top:6px;">${esc(d.thinner||"")}</div>
  </div>
  <div class="card"><h2>Technical Data</h2><table>${kv(d.technical_data)}</table></div>
  <div class="card"><h2>Surface Preparation</h2><ul>${li(d.surface_preparation)}</ul></div>
  <div class="card"><h2>Application</h2><ul>${li(d.application)}</ul></div>
          <div class="card"><h2>Available Sizes</h2><p>${esc(d.available_sizes||"")}</p></div>
  <div class="card"><h2>Storage & Safety</h2><ul>${li(d.storage_safety)}</ul></div>
</section>
<footer>© CALYCO</footer></body></html>`;
}
