(() => {
const root = document.getElementById('intro');
if (!root || root.dataset.started) return;
root.dataset.started = '1';
const BASE = root.dataset.base || '';

const IW = 864, IH = 1152, SUN = { x: 590.5, y: 600 }, PAPER = '#f2eee6', INK = '#1c1a17', LAV = '#a684ff';
const ART_SCALE = .68, SVGNS = 'http://www.w3.org/2000/svg';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const $ = id => document.getElementById(id);

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
const f = n => n.toFixed(1);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const LAYERS = {
  cFar:   { seed: 11, tile: 1600, speed: 5,  y: [850, 905],   n: 9,  sc: [.36, .5],  alpha: .45, zoom: .35 },
  cMid:   { seed: 29, tile: 1800, speed: 9,  y: [945, 1035],  n: 9,  sc: [.62, .85], alpha: .75, zoom: .8 },
  cFront: { seed: 47, tile: 2000, speed: 15, y: [1055, 1150], n: 8,  sc: [.95, 1.3], alpha: 1, floor: true, zoom: 1.15 }
};

function cloud(r, sc, uid, ink) {
  const Wb = 170 + r() * 110, n = 3 + Math.floor(r() * 3), bumps = [];
  for (let i = 0; i < n; i++) {
    const t = (i + .5) / n, R = Wb * (.13 + .1 * Math.sin(Math.PI * t)) * (.85 + r() * .3);
    bumps.push({ x: Wb * (.08 + .84 * t) + (r() - .5) * 8, y: -R, R });
  }
  const big = bumps.reduce((a, b) => b.R > a.R ? b : a);
  if (n >= 4) { const R = big.R * .72; bumps.push({ x: big.x + (r() - .5) * big.R * .9, y: -big.R * 1.55, R }); }
  const minR = Math.min(...bumps.map(b => b.R)), hh = minR * .9, th = 5 + r() * 4;
  const left = r() < .5, tl = left ? 60 + r() * 90 : 12 + r() * 25, tr = left ? 12 + r() * 25 : 60 + r() * 90;
  const tyL = -(th + hh * (left ? .45 : .15)), tyR = -(th + hh * (left ? .15 : .45));
  const base = `M${f(-tl)} ${f(tyL)}Q${f(-tl * .5)} 0 ${f(Wb * .18)} 0L${f(Wb * .82)} 0Q${f(Wb + tr * .5)} 0 ${f(Wb + tr)} ${f(tyR)}` +
    `Q${f(Wb + tr * .3)} ${f(-hh * .45)} ${f(Wb * .8)} ${f(-hh)}L${f(Wb * .2)} ${f(-hh)}Q${f(-tl * .3)} ${f(-hh * .45)} ${f(-tl)} ${f(tyL)}Z`;
  const circ = bumps.map(b => `<circle cx="${f(b.x)}" cy="${f(b.y)}" r="${f(b.R)}"/>`).join('');
  let spir = '';
  bumps.forEach((b, i) => {
    if (r() < .25) return;
    const s = (i + (left ? 1 : 0)) % 2 ? 1 : -1, cx = b.x + s * b.R * .1, cy = b.y + b.R * .14;
    const r0 = b.R * .62, r1 = b.R * .13, turns = 1.05 + r() * .25, th0 = Math.PI / 2 + s * .5, N = 44;
    for (let k = 0; k <= N; k++) {
      const u = k / N, a = th0 + s * Math.PI * 2 * turns * u, rr = r0 + (r1 - r0) * Math.pow(u, .85);
      spir += (k ? 'L' : 'M') + f(cx + Math.cos(a) * rr) + ' ' + f(cy + Math.sin(a) * rr);
    }
  });
  let hatch = '';
  for (let x = -tl; x < Wb + tr; x += 3.6 + r() * .8) {
    const len = hh * (.3 + r() * .25);
    hatch += `M${f(x)} ${f(-1)}l${f(len * .45)} ${f(-len)}`;
  }
  const lw = 1.5 / sc, sw = 1.15 / sc, hw = .55 / sc;
  return `<clipPath id="${uid}"><path d="${base}"/>${circ}</clipPath>
<g stroke="${INK}" stroke-opacity="${ink}" stroke-width="${f(lw * 2)}" fill="${PAPER}"><path d="${base}"/>${circ}</g>
<g fill="${PAPER}"><path d="${base}"/>${circ}</g>
<path clip-path="url(#${uid})" d="${hatch}" stroke="${INK}" stroke-width="${f(hw)}" stroke-opacity="${(.45 * ink).toFixed(2)}" fill="none"/>
<path d="${spir}" stroke="${INK}" stroke-opacity="${ink}" stroke-width="${f(sw)}" fill="none"/>`;
}

function cloudSvg(id, cfg, W, y0, H) {
  const r = rng(cfg.seed), items = [];
  for (let i = 0; i < cfg.n; i++) {
    const sc = cfg.sc[0] + r() * (cfg.sc[1] - cfg.sc[0]);
    items.push({ x: (i + r() * .6) * cfg.tile / cfg.n, y: cfg.y[0] + r() * (cfg.y[1] - cfg.y[0]), sc, k: i });
  }
  items.sort((a, b) => a.y - b.y);
  const body = items.map(c =>
    `<g transform="translate(${f(c.x)} ${f(c.y)}) scale(${c.sc.toFixed(3)})">${cloud(r, c.sc, `${id}k${c.k}`, cfg.alpha)}</g>`).join('\n');
  const copies = Math.ceil((W + cfg.tile) / cfg.tile) + 1, VW = copies * cfg.tile;
  let uses = '';
  for (let c = 0; c < copies; c++) uses += `<use href="#${id}T" x="${c * cfg.tile}"/>`;
  const floor = cfg.floor
    ? `<linearGradient id="${id}F" x1="0" y1="${f(y0)}" x2="0" y2="${f(y0 + H)}" gradientUnits="userSpaceOnUse">
    <stop offset="${f(clamp((1085 - y0) / H, 0, .98))}" stop-color="${PAPER}" stop-opacity="0"/>
    <stop offset="${f(clamp((1140 - y0) / H, .01, .99))}" stop-color="${PAPER}" stop-opacity="1"/>
  </linearGradient>`
    : '';
  return {
    VW,
    svg: `<svg xmlns="${SVGNS}" viewBox="0 ${f(y0)} ${VW} ${f(H)}" preserveAspectRatio="none">
<defs>${floor}<g id="${id}T" stroke-linecap="round" stroke-linejoin="round">${body}</g></defs>
${uses}
${cfg.floor ? `<rect x="0" y="${f(y0 - 10)}" width="${VW}" height="${f(H + 20)}" fill="url(#${id}F)"/>` : ''}
</svg>`
  };
}

const sceneSvg = $('sceneSvg'), sunSvg = $('sunSvg'), sun = $('sun'), sunWrap = $('sunWrap'), stage = $('stage');
let V = null;

const SAM = { x: 190, y: 713, scale: .32 }, ZOOM = 2.6;
const zoomLayers = [['layerFar', LAYERS.cFar.zoom], ['layerScene', 1], ['layerMid', LAYERS.cMid.zoom], ['layerFront', LAYERS.cFront.zoom]]
  .map(([id, k]) => ({ el: $(id), k }));

function layout() {
  const vw = stage.clientWidth || innerWidth, vh = stage.clientHeight || innerHeight;
  const W = Math.max(IW, IH * vw / vh), H = W * vh / vw, y0 = IH - H, s = vw / W;
  const vb = `0 ${y0} ${W} ${H}`;
  sceneSvg.setAttribute('viewBox', vb);
  sunSvg.setAttribute('viewBox', vb);
  const sx = W <= IW + 1 ? SUN.x : Math.max(SUN.x, W * .66);
  sun.setAttribute('cx', sx); sun.setAttribute('cy', SUN.y);
  sunWrap.style.visibility = 'visible';
  const drift = {};
  for (const id in LAYERS) {
    const cfg = LAYERS[id], { VW, svg } = cloudSvg(id, cfg, W, y0, H), el = $(id);
    el.innerHTML = svg;
    el.style.width = (VW * s) + 'px';
    el.firstElementChild.style.width = (VW * s) + 'px';
    drift[id] = { el, tilePx: cfg.tile * s, pxPerSec: cfg.speed * s };
  }
  const ox = SAM.x * s, oy = (SAM.y - 35 - y0) * s;
  for (const z of zoomLayers) z.el.style.transformOrigin = `${f(ox)}px ${f(oy)}px`;
  V = { s, y0, drift, rise: (1200 - SUN.y) * s, ox, oy };
  if (!sunDone && !reduce.matches) sunWrap.style.transform = `translate3d(0,${V.rise.toFixed(2)}px,0)`;
  rasterize();
}

const TREE_CUT = 488, TREE_PIVOT = [345, 492];
let sway = null, rockCv = null, rasterK = 0, rasterBusy = false;
const sceneLayer = $('layerScene');
function artBox() { const u = ART_SCALE * V.s; return { top: (IH - IH * ART_SCALE - V.y0) * V.s, u }; }
function placeArt() {
  if (!sway) return; const b = artBox();
  rockCv.style.cssText = `position:absolute;left:0;top:${f(b.top + TREE_CUT * b.u)}px;width:${f(2048 * b.u)}px;height:${f((1152 - TREE_CUT) * b.u)}px`;
  sway.style.cssText = `position:absolute;left:0;top:${f(b.top)}px;width:${f(2048 * b.u)}px;height:${f((TREE_CUT + 1) * b.u)}px;will-change:transform;transform-origin:${f(TREE_PIVOT[0] * b.u)}px ${f(TREE_PIVOT[1] * b.u)}px`;
}
const COARSE = matchMedia('(pointer: coarse)').matches || innerWidth < 820;
const artImgs = {};
function artImg(w) {
  if (!artImgs[w]) {
    const img = new Image(); img.decoding = 'async'; img.src = `${BASE}/scene/cliff-tree-${w}.webp`;
    artImgs[w] = (img.decode ? img.decode() : new Promise((r, e) => { img.onload = r; img.onerror = e; })).then(() => img);
  }
  return artImgs[w];
}
function rasterize() {
  if (!V || rasterBusy) return;
  const b = artBox(), dpr = Math.min(devicePixelRatio || 1, 2);
  const k = Math.min(b.u * dpr * (COARSE ? 1.25 : 2.5), (COARSE ? 2048 : 4096) / 2048);
  if (rasterK && k <= rasterK * 1.05) { placeArt(); return; }
  rasterBusy = true;
  const Wp = Math.round(2048 * k), Hp = Math.round(1152 * k), cut = Math.round(TREE_CUT * k);
  artImg(Wp > 2048 ? 4096 : 2048).then(img => {
    const rc = document.createElement('canvas'); rc.width = Wp; rc.height = Hp - cut;
    const x = rc.getContext('2d'); x.drawImage(img, 0, -cut, Wp, Hp);
    x.globalCompositeOperation = 'destination-in';
    const g = x.createLinearGradient(0, 762 * k - cut, 0, 915 * k - cut);
    g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, rc.width, rc.height);
    const tc = document.createElement('canvas'); tc.width = Wp; tc.height = Math.round((TREE_CUT + 1) * k);
    tc.getContext('2d').drawImage(img, 0, 0, Wp, Hp);
    rc.setAttribute('aria-hidden', 'true'); tc.setAttribute('aria-hidden', 'true');
    if (rockCv) { rockCv.replaceWith(rc); sway.replaceWith(tc); }
    else { sceneLayer.insertBefore(rc, sceneSvg); sceneLayer.insertBefore(tc, sceneSvg); $('cliffTree').innerHTML = ''; }
    rockCv = rc; sway = tc; rasterK = k; rasterBusy = false; placeArt();
  }).catch(() => { rasterBusy = false; });
}
artImg(COARSE ? 2048 : 4096);
if (COARSE) {
  $('trailGlow').removeAttribute('filter');
  document.querySelector('#shS feGaussianBlur').setAttribute('stdDeviation', '5');
  document.querySelector('#shH feGaussianBlur').setAttribute('stdDeviation', '1.2');
}

const samurai = $('samurai');
samurai.setAttribute('transform', `translate(${SAM.x} ${SAM.y}) scale(${SAM.scale})`);
samurai.innerHTML = window.SAMURAI_FRAMES;
const POSES = [...samurai.querySelectorAll('.pose')];

let pose = 0, prev = null, shown = [];
function scrollProgress() {
  const max = root.offsetHeight - innerHeight;
  return max > 0 ? clamp(scrollY / max) : 0;
}
function showPose(fr) {
  const i = Math.min(POSES.length - 2, Math.floor(fr)), u = fr - i;
  const next = [[i, 1 - smooth(.5, .56, u)], [i + 1, smooth(.44, .5, u)]];
  for (const [j] of shown) if (j !== i && j !== i + 1) POSES[j].style.opacity = 0;
  for (const [j, o] of next) POSES[j].style.opacity = o.toFixed(3);
  shown = next;
}
POSES.forEach(p => p.style.opacity = 0);

const PH = {
  poses:   [0, .66],
  slash:   [.638, .66],
  tint:    [.645, .7],
  dissolve:[.665, .76],
  trail:   [.72, .79],
  brand:   [.68, .77],
  lift:    [.8, .975]
};
const span = (k, p) => clamp((p - PH[k][0]) / (PH[k][1] - PH[k][0]));

const slash = $('slash'), trailGlow = $('trailGlow'), trailBody = $('trailBody'), trailStreaks = $('trailStreaks');
const cutShadow = $('cutShadow'), cutEdge = $('cutEdge'), scrollBadge = $('scrollBadge');
const brand = $('brand'), bLogo = $('brandLogo'), bChars = [...brand.querySelectorAll('.char')], bRule = $('brandRule'), bLav = $('brandLav');
let line = null, maskKey = '';
const brandEl = $('brand');

const STREAKS = [[-.9, .05, .55, .5], [-1.6, .2, .8, .35], [1.3, .1, .45, .45], [2.1, .35, .9, .3], [-2.4, .45, .95, .25]];
function bez(c, t) {
  const u = 1 - t, a = u * u * u, b = 3 * u * u * t, d = 3 * u * t * t, e = t * t * t;
  return { x: a * c[0].x + b * c[1].x + d * c[2].x + e * c[3].x, y: a * c[0].y + b * c[1].y + d * c[2].y + e * c[3].y };
}
function measureLine() {
  const vw = stage.clientWidth, vh = stage.clientHeight;
  const sr = POSES[POSES.length - 1].getBoundingClientRect(), st = stage.getBoundingClientRect();
  const k = ZOOM / (1 + (ZOOM - 1) * (parseFloat(zLast) || 0));
  const P = { x: V.ox + (sr.left - st.left + sr.width * .6 - V.ox) * k, y: V.oy + (sr.top - st.top + sr.height * .45 - V.oy) * k };
  const A = { x: -.12 * vw, y: P.y + .1 * vh }, B = { x: 1.12 * vw, y: -.04 * vh };
  const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy), n = { x: -dy / len, y: dx / len }, bulge = .2 * len;
  const C = [A, { x: A.x + dx * .45 + n.x * bulge, y: A.y + dy * .45 + n.y * bulge }, { x: A.x + dx * .92 + n.x * bulge * .9, y: A.y + dy * .92 + n.y * bulge * .9 }, B];
  const N = 90, pts = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, q = bez(C, t), q2 = bez(C, Math.min(1, t + .001)), q1 = bez(C, Math.max(0, t - .001));
    const tl = Math.hypot(q2.x - q1.x, q2.y - q1.y) || 1;
    pts.push({ t, x: q.x, y: q.y, nx: -(q2.y - q1.y) / tl, ny: (q2.x - q1.x) / tl });
  }
  slash.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
  const R = rng(7), lat = Array.from({ length: 4096 }, () => R() * 2 - 1);
  const vnoise = x => { const i = Math.floor(x), u = x - i, s = u * u * (3 - 2 * u); return lat[i & 4095] * (1 - s) + lat[(i + 1) & 4095] * s; };
  const chips = Array.from({ length: 6 }, () => ({ at: .06 + R() * .88, w: 6 + R() * 10, d: (R() < .5 ? -1 : 1) * (1.5 + R() * 2) }));
  const M = 1400, dense = [];
  let arc = 0, pv = null;
  for (let i = 0; i <= M; i++) {
    const t = i / M, q = bez(C, t), q2 = bez(C, Math.min(1, t + .0005)), q1 = bez(C, Math.max(0, t - .0005));
    const tl = Math.hypot(q2.x - q1.x, q2.y - q1.y) || 1, nx = -(q2.y - q1.y) / tl, ny = (q2.x - q1.x) / tl;
    if (pv) arc += Math.hypot(q.x - pv.x, q.y - pv.y); pv = q;
    let o = 1.1 * vnoise(arc / 38) + 1.0 * vnoise(arc / 11 + 50) + .7 * vnoise(arc / 3.6 + 130) + .35 * vnoise(arc / 1.4 + 260);
    for (const c of chips) { const dd = (t - c.at) * len / c.w; if (Math.abs(dd) < 1) o += c.d * (1 - dd * dd) * (1 - dd * dd); }
    dense.push({ x: q.x + nx * o, y: q.y + ny * o, nx, ny });
  }
  const curve = dense.map(q => `${f(q.x)} ${f(q.y)}`).join('L');
  let lift = 0;
  for (const q of dense) if (q.x >= -20 && q.x <= vw + 20) lift = Math.max(lift, q.y);
  lift += 60;
  const X0 = -.5 * vw, X1 = 1.5 * vw;
  const upper = `M${curve}L${f(X1)} ${f(B.y)}L${f(X1)} ${f(-3 * vh)}L${f(X0)} ${f(-3 * vh)}L${f(X0)} ${f(A.y)}Z`;
  const lower = `M${curve}L${f(X1)} ${f(B.y)}L${f(X1)} ${f(3 * vh)}L${f(X0)} ${f(3 * vh)}L${f(X0)} ${f(A.y)}Z`;
  const lp = [...dense, { x: X1, y: B.y }, { x: X1, y: 3 * vh }, { x: X0, y: 3 * vh }, { x: X0, y: A.y }].map(q => [Math.round(q.x * 10), Math.round(q.y * 10)]);
  let lowerRel = '';
  for (let i = 1; i < lp.length; i++) lowerRel += `l${(lp[i][0] - lp[i - 1][0]) / 10} ${(lp[i][1] - lp[i - 1][1]) / 10}`;
  const lowerAt = dy => `path("M${lp[0][0] / 10} ${(lp[0][1] / 10 + dy).toFixed(1)}${lowerRel}z")`;
  const nm = { x: n.x, y: n.y }, mid = pts[N >> 1];
  const far = Math.max(...[[vw, vh], [0, vh], [vw, 0]].map(([x, y]) => (x - mid.x) * nm.x + (y - mid.y) * nm.y));
  line = { pts, W: .075 * vh, vw, vh, upper, lower, lowerAt, n: nm, mid, far, lift };
  cutShadow.setAttribute('viewBox', `0 0 ${vw} ${vh}`); cutEdge.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
  const sr2 = $('shRect'); sr2.setAttribute('width', vw); sr2.setAttribute('height', vh + 5000);
  $('shSoft').setAttribute('d', upper); $('shHard').setAttribute('d', upper);
  const edge = 'M' + curve;
  $('edgeInk').setAttribute('d', edge);
  $('edgeLight').setAttribute('d', 'M' + dense.map(q => `${f(q.x - q.nx * 1.6)} ${f(q.y - q.ny * 1.6)}`).join('L'));
  let fib = '';
  for (let i = 3; i < dense.length - 3; i += 3) {
    if (R() > .28) continue;
    const q = dense[i], l = 1.5 + R() * 4.5, a = (R() - .5) * 1.1, c = Math.cos(a), sn = Math.sin(a);
    const dx = q.nx * c - q.ny * sn, dy = q.nx * sn + q.ny * c;
    fib += `M${f(q.x)} ${f(q.y)}l${f(dx * l)} ${f(dy * l)}`;
  }
  $('edgeFib').setAttribute('d', fib);
  maskKey = '';
}
function ribbon(pts, t0, t1, off, w) {
  const seg = pts.filter(p => p.t >= t0 && p.t <= t1);
  if (seg.length < 2) return '';
  const side = s => seg.map(p => { const u = (p.t - t0) / (t1 - t0 || 1), h = w(u) / 2 * s;
    return `${f(p.x + p.nx * (off + h))} ${f(p.y + p.ny * (off + h))}`; });
  return `M${side(1).join('L')}L${side(-1).reverse().join('L')}Z`;
}
const bodyW = u => Math.pow(u, 1.4) * (1 - .75 * smooth(.9, 1, u)) + .004;
const streakW = u => Math.sin(Math.PI * u);
function drawTrail(r) {
  const L = line, head = Math.max(.001, r);
  const body = ribbon(L.pts, 0, head, -L.W * .15, u => L.W * bodyW(u));
  const streaks = STREAKS.map(([o, a, b, k]) => {
    const t0 = a * head, t1 = b * head;
    return t1 - t0 > .02 ? ribbon(L.pts, t0, t1, o * L.W * .55, u => L.W * .09 * k * 2 * streakW(u)) : '';
  }).join('');
  trailBody.setAttribute('d', body); trailStreaks.setAttribute('d', streaks); trailGlow.setAttribute('d', body + streaks);
}

function prepMask() {
  const L = line;
  L.ang = Math.atan2(L.n.x, -L.n.y) * 180 / Math.PI;
  const gl = Math.abs(L.vw * L.n.x) + Math.abs(L.vh * L.n.y);
  const pc = (L.vw / 2) * L.n.x + (L.vh / 2) * L.n.y;
  L.g0 = pc - gl / 2;
  L.pm = L.mid.x * L.n.x + L.mid.y * L.n.y;
}
let prepped = null;
function setMask(d, D, off) {
  const L = line, key = (d >= 1 ? 'done' : d.toFixed(4)) + '|' + D.toFixed(1) + '|' + off.toFixed(1);
  if (key === maskKey) return; maskKey = key;
  const bs = brandEl.style;
  bs.zIndex = '10';
  bs.clipPath = bs.webkitClipPath = L.lowerAt(-D);
  cutShadow.style.zIndex = '10';
  cutShadow.style.clipPath = cutShadow.style.webkitClipPath = L.lowerAt(-off);
  if (d >= 1) { bs.webkitMaskImage = bs.maskImage = ''; return; }
  const w = 1.2 - 1.4 * d, s1 = L.pm + L.far * (w - .22) - L.g0, s2 = L.pm + L.far * w - L.g0;
  bs.webkitMaskImage = bs.maskImage = `linear-gradient(${L.ang.toFixed(2)}deg, transparent ${s1.toFixed(1)}px, #000 ${Math.max(s1 + 1, s2).toFixed(1)}px)`;
}
function clearMask() {
  const bs = brandEl.style;
  bs.zIndex = ''; bs.clipPath = bs.webkitClipPath = ''; bs.webkitMaskImage = bs.maskImage = '';
  cutShadow.style.zIndex = ''; cutShadow.style.clipPath = cutShadow.style.webkitClipPath = '';
  maskKey = '';
}

function cutFrame(p) {
  if (p < PH.slash[0]) {
    if (line) { slash.style.opacity = 0; clearMask(); stage.style.transform = ''; stage.style.visibility = ''; cutShadow.style.opacity = cutEdge.style.opacity = 0; line = null; }
  } else if (!line) { if (prepped) line = prepped; else { measureLine(); prepMask(); } }
  if (!prepped && p >= PH.slash[0] - .12) { const was = line; measureLine(); prepMask(); prepped = line; line = was ? prepped : null; }

  sun.setAttribute('fill', mix('#c62824', LAV, smooth(0, 1, span('tint', p))));
  sun.style.opacity = (1 - smooth(.15, .7, span('dissolve', p))).toFixed(3);

  const bOn = p >= PH.slash[0];
  brand.style.visibility = bOn ? 'visible' : 'hidden';
  const br = span('brand', p), lift = easeInOut(span('lift', p));
  const lg = easeOut(clamp(br * 1.25));
  bLogo.style.opacity = lg.toFixed(3);
  bLogo.style.transform = `translateY(${f((1 - lg) * 18 + (1 - lift) * 10)}px) scale(${(.9 + .06 * lg + .04 * lift).toFixed(4)})`;
  bLav.style.opacity = (.35 + .65 * smooth(.3, 1, lift)).toFixed(3);
  bChars.forEach((c, i) => {
    const k = easeOut(clamp(br * 1.6 - .25 - i * .045));
    c.style.transform = `translateY(${f((1 - k) * 110)}%)`;
  });
  bRule.style.transform = `scaleX(${(easeInOut(clamp(br * 2 - 1)) * (.5 + .5 * lift)).toFixed(3)})`;

  if (!line) return;
  drawTrail(easeOut(span('slash', p)));
  slash.style.opacity = (1 - smooth(0, 1, span('trail', p))).toFixed(3);

  const d = easeInOut(span('dissolve', p));

  const L = line, D = L.lift * lift;
  const tr = lift > 0 ? `translate3d(0,${f(-D)}px,0)` : '';
  stage.style.transform = tr; cutEdge.style.transform = tr;
  const off = 7 + 20 * lift;
  cutShadow.style.transform = `translate3d(0,${f(-D + off)}px,0)`;
  if (p >= PH.slash[1] - .004 && lift < 1) setMask(d, D, off); else clearMask();
  const cut = p >= PH.slash[1] - .004;
  cutShadow.style.opacity = cut ? (smooth(.1, .8, d) * (1 - smooth(.85, 1, lift))).toFixed(3) : 0;
  cutEdge.style.opacity = cut ? (smooth(.2, 1, span('trail', p)) * (1 - smooth(.9, 1, lift))).toFixed(3) : 0;
  stage.style.visibility = lift >= 1 ? 'hidden' : '';
}

function mix(a, b, k) {
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
  const [x, y] = [h(a), h(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * k)).join(',')})`;
}

let t0 = null, prog = 0, zLast = '', zMoved = 0, zLifted = false, lastProg = -1, sunDone = false;
const RISE_DELAY = .5, RISE_DUR = 5.5;

function frame(now) {
  if (t0 === null) t0 = now;
  const t = (now - t0) / 1000, still = reduce.matches;
  const dt = prev === null ? 0 : Math.min(.1, (now - prev) / 1000); prev = now;
  const target = scrollProgress();
  prog += still ? target - prog : (target - prog) * (1 - Math.exp(-dt * 10));
  if (Math.abs(target - prog) < 1e-4) prog = target;

  if (prog < 1) {
    for (const id in V.drift) {
      const d = V.drift[id], x = still ? 0 : -((t * d.pxPerSec) % d.tilePx);
      d.el.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    }
    if (sway && !still) {
      const a = -(.9 + .7 * Math.sin(t * .8) + .25 * Math.sin(t * 2.1 + 1));
      sway.style.transform = `rotate(${a.toFixed(3)}deg)`;
    }
  }
  const k = still ? 1 : easeOut(clamp((t - RISE_DELAY) / RISE_DUR));
  if (k < 1 || !sunDone) { sunWrap.style.transform = `translate3d(0,${((1 - k) * V.rise).toFixed(2)}px,0)`; sunDone = k >= 1; }

  if (prog === lastProg) { requestAnimationFrame(frame); return; }
  lastProg = prog;
  const hb = 1 - smooth(.002, .02, prog);
  scrollBadge.style.opacity = hb.toFixed(3); scrollBadge.style.visibility = hb > 0 ? '' : 'hidden';
  const ps = span('poses', prog);
  showPose(ps * (POSES.length - 1));
  const z = easeInOut(ps);
  const zKey = z.toFixed(4);
  if (zKey !== zLast) {
    zLast = zKey; zMoved = now;
    if (!zLifted) { for (const L of zoomLayers) L.el.style.willChange = 'transform'; zLifted = true; }
    for (const L of zoomLayers) L.el.style.transform = `scale(${(1 + (ZOOM - 1) * L.k * z).toFixed(4)})`;
  }
  cutFrame(prog);
  requestAnimationFrame(frame);
}

layout();
let stageSize = stage.clientWidth + 'x' + stage.clientHeight;
addEventListener('resize', () => {
  const sz = stage.clientWidth + 'x' + stage.clientHeight;
  if (sz === stageSize) return; stageSize = sz;
  layout(); line = null; prepped = null; maskKey = ''; lastProg = -1; zLast = '';
});
requestAnimationFrame(frame);
})();
