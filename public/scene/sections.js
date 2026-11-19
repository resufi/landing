(function () {
if (window.__resuSections) return;
window.__resuSections = true;
function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0;
  let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t;
  return ((t^t>>>14)>>>0)/4294967296; }; }
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const sstep=(a,b,v)=>{const t=clamp((v-a)/(b-a));return t*t*(3-2*t);};
const f1=n=>n.toFixed(1);
const D2R=Math.PI/180;
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(a,b,t)=>{const A=hex(a),B=hex(b);return `rgb(${A.map((v,i)=>Math.round(lerp(v,B[i],t))).join(',')})`;};
const PETAL_D='M94.00 104.34C93.04 104.05 92.41 103.56 90.55 101.65C88.51 99.55 85.98 97.20 82.25 93.94C79.02 91.11 62.47 74.51 61.47 73.10C61.01 72.45 60.38 71.40 60.06 70.77C59.74 70.14 59.01 69.13 58.43 68.51C53.86 63.64 53.11 46.24 57.09 37.24C58.02 35.15 58.76 34.36 61.28 32.78C62.24 32.18 62.76 31.44 63.34 29.81C65.38 24.16 68.25 20.65 72.39 18.75C75.38 17.38 76.35 17.51 80.66 19.90C84.01 21.76 84.32 21.71 85.89 19.02C89.06 13.58 92.11 12.60 98.17 15.08C101.34 16.38 103.04 17.59 105.18 20.08C106.75 21.93 107.32 22.28 109.13 22.50C117.41 23.54 125.92 39.99 125.89 54.88C125.88 58.18 125.88 58.18 125.38 58.80C124.61 59.76 124.56 59.93 124.09 62.59C123.10 68.29 118.83 78.66 115.61 83.18C112.98 86.85 108.72 91.67 104.18 96.09C102.59 97.65 100.54 99.80 99.62 100.89C97.12 103.85 95.55 104.82 94.00 104.34Z';
const PETAL_NORM='scale(1.0183) rotate(10.6) translate(-101 -111)';
const PETAL_W_NORM='scale(1.0194) rotate(-59.7) translate(-101 -111)';
const petalSVG=(fill,stroke,sw,extra='')=>{
  const white=String(fill).toLowerCase()==='#efebe3';
  return white
    ? `<g transform="${PETAL_W_NORM}" ${extra}><g clip-path="url(#pc0)"><use href="#petalArt"/></g></g>`
    : `<g transform="${PETAL_NORM}" ${extra}><g clip-path="url(#pc4)"><use href="#petalArt"/></g></g>`;
};

(function(){
const SVGNS='http://www.w3.org/2000/svg';
const el=(tag,attrs={},parent)=>{ const e=document.createElementNS(SVGNS,tag); for(const k in attrs) e.setAttribute(k,attrs[k]); if(parent) parent.appendChild(e); return e; };
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rnd=rng(2026);
const LAVc='#b4a3e8', V1='#cfc4f4', V2='#a996e8', V3='#7c5ce6', INKc='#1c1a17', IVc='#efebe3';
const TOUCH=matchMedia('(hover: none) and (pointer: coarse)').matches;
const vhProbe=document.createElement('div'); vhProbe.setAttribute('aria-hidden','true');
vhProbe.style.cssText='position:fixed;top:0;left:0;width:0;height:100vh;visibility:hidden;pointer-events:none';
document.body.appendChild(vhProbe);
let VH=vhProbe.offsetHeight||innerHeight;
const visible=r=>r.bottom>-80 && r.top<VH+80;
const SM={}; let SM_dt=1/60, SM_last=0;
function damp(key,target,rate=5){ if(TOUCH) rate*=4; const c=SM[key]; if(c===undefined||RM){ SM[key]=target; return target; }
  const v=c+(target-c)*(1-Math.exp(-SM_dt*rate)); SM[key]=Math.abs(v-target)<1e-4?target:v; return SM[key]; }

const io=new IntersectionObserver(es=>{ for(const e of es){ if(!e.isIntersecting) continue; const t=e.target; t.classList.add('in'); io.unobserve(t);
    if(t.id==='stats') runStats(); } },
  {rootMargin:'0px 0px -12% 0px'});
$$('.rv,.brush,#stats,.kr').forEach(x=>io.observe(x));

const qFx=$('#queueFx'), rows=$$('#bars .bar-row');
const QM=matchMedia('(max-width: 820px), (pointer: coarse)').matches;
const qPetals=QM?[]:[0,1,2].map(i=>{ const g=el('g',{},qFx); g.innerHTML=petalSVG(LAVc,'#7a68b8',1.2); g.style.opacity=0; return g; });
const SHADES=[V1,V2,V3];
function tickQueue(vh,t){
  const bars=$('#bars').getBoundingClientRect(), sec=$('#queue').getBoundingClientRect();
  if(!visible(sec)) return;
  if(QM){ const tops=rows.map(r=>r.getBoundingClientRect().top);
    rows.forEach((row,i)=>setBar(row,RM?1:damp('qb'+i,clamp((vh*.9-tops[i])/(vh*.3)),3.5))); return; }
  let k=RM?1:damp('q',clamp((vh*1.02-bars.top)/(vh*.8)),4.5);
  const rr=rows.map(r=>r.querySelector('.bar').getBoundingClientRect());
  const S={x:sec.width*.64, y:(bars.top-sec.top)-vh*.78};
  const fall=sstep(0,.4,k), split=sstep(.36,.58,k);
  const mid={x:rr[1].left-sec.left-18, y:rr[1].top-sec.top+19};
  qPetals.forEach((g,i)=>{
    const tgt={x:rr[i].left-sec.left-18, y:rr[i].top-sec.top+19};
    const ri=RM?1:sstep(.52+i*.06,.9+i*.03,k);
    let x=lerp(S.x,mid.x,fall)+Math.sin(fall*Math.PI*2.4)*60*(1-fall), y=lerp(S.y,mid.y,fall*fall*(3-2*fall));
    x=lerp(x,tgt.x,split); y=lerp(y,tgt.y,split);
    const bw=rr[i].width; x+=bw*ri+18*sstep(0,.1,ri);
    let rot=lerp(Math.sin(fall*9)*40+180,90,split);
    const sc=lerp(.42,.32,split)*(1-.35*sstep(.85,1,ri));
    g.setAttribute('transform',`translate(${f1(x)} ${f1(y)}) rotate(${f1(rot+Math.sin(t*2+i)*4*(1-ri))}) scale(${sc.toFixed(3)})`);
    g.style.opacity=(sstep(0,.06,k)*(1-sstep(.88,1,ri))).toFixed(3);
    setBar(rows[i],ri);
  });
}
function setBar(row,ri){ const bar=row.querySelector('.bar'); bar.querySelector('.fill').style.clipPath=`inset(0 ${(100-clamp(ri)*100).toFixed(1)}% 0 0 round 19px)`;
  bar.classList.toggle('lit',ri>.45);
  row.querySelector('.bv em').textContent='~'+(row.dataset.v*sstep(0,1,ri)).toFixed(1)+'%'; }

let statsRan=false;
function buildNum(n,si){ const v=n.textContent.trim(); n.textContent=''; n.setAttribute('aria-label',v);
  const m=v.match(/^(.*?)(\s[A-Za-z]+)$/); const main=m?m[1]:v, unit=m?m[2].trim():'';
  let di=0;
  [...main].forEach(ch=>{ if(/\d/.test(ch)){ const d=document.createElement('span'); d.className='dg'; const st=document.createElement('span'); st.className='strip';
      for(let r=0;r<20;r++){ const x=document.createElement('span'); x.textContent=r%10; st.appendChild(x); }
      st.dataset.to=10+(+ch); st.style.transitionDelay=(si*.18+di*.12)+'s'; d.appendChild(st); n.appendChild(d); di++; }
    else { const c=document.createElement('span'); c.className='ch'; c.textContent=ch; c.style.transitionDelay=(si*.18)+'s'; n.appendChild(c); } });
  if(unit){ const u=document.createElement('span'); u.className='unit ch'; u.textContent=unit; u.style.transitionDelay=(si*.18+.6)+'s'; n.appendChild(u); }
}
const statNums=$$('#stats .num');
statNums.forEach(buildNum);
function rollStats(scope){ scope.querySelectorAll('.strip').forEach(st=>st.style.transform=`translateY(${-st.dataset.to*1.1}em)`); }
function runStats(){ statsRan=true; $$('#stats .stat').forEach((s,i)=>{
  setTimeout(()=>s.classList.add('on'),RM?0:i*180); rollStats(s); }); }
function applyLive(list){ (list||[]).forEach(({id,value})=>{ const i=statNums.findIndex(n=>n.dataset.id===id); if(i<0||!value) return;
  const n=statNums[i]; n.textContent=value; buildNum(n,i); if(statsRan) requestAnimationFrame(()=>rollStats(n)); }); }
applyLive(window.__resuStats);
addEventListener('resu:stats',e=>applyLive(e.detail));
function layoutStats(){}

const wFx=$('#waterFx');
el('defs',{},wFx).innerHTML=`
  <pattern id="wHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><line x1="0" y1="0" x2="0" y2="7" stroke="${INKc}" stroke-width=".7" opacity=".55"/></pattern>
  <linearGradient id="wFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="wMask" maskUnits="userSpaceOnUse" x="0" y="260" width="420" height="180"><rect x="0" y="260" width="420" height="180" fill="url(#wFade)"/></mask>
  <pattern id="sHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="5" stroke="${INKc}" stroke-width=".6" opacity=".5"/></pattern>`;
function stonePath(cx,by,w,h,seed){ const r=rng(seed), n=14, pts=[];
  for(let i=0;i<n;i++){ const a=Math.PI+i/(n-1)*Math.PI; const k=.9+r()*.16; pts.push([cx+Math.cos(a)*w/2*k, by+Math.sin(a)*h*k*(a>Math.PI*1.5?1:.96)]); }
  pts.push([cx+w/2*.96,by]); let d=`M${f1(cx-w/2)} ${by}`; for(const p of pts) d+=`L${f1(p[0])} ${f1(p[1])}`; return d+'Z'; }
function stone(g,cx,by,w,h,seed){ const d=stonePath(cx,by,w,h,seed);
  el('path',{d,fill:IVc},g);
  const cp=el('clipPath',{id:'sc'+seed},g); el('path',{d},cp);
  el('rect',{x:cx+w*.12,y:by-h-4,width:w,height:h+8,fill:'url(#sHatch)','clip-path':`url(#sc${seed})`},g);
  el('path',{d,class:'fx-ink'},g);
  el('path',{d:`M${f1(cx-w*.28)} ${f1(by-h*.62)}q${f1(w*.12)} ${f1(-h*.14)} ${f1(w*.26)} ${f1(-h*.08)}`,class:'fx-thin'},g);
}
const W_BASE=330;
const wLeft={x0:14,x1:206,stones:[[52,56,54],[112,56,54],[172,56,54]]};
const wRight={x0:222,x1:410,cairn:[[292,104,50],[292,88,46],[292,74,42]]};
const gStones=el('g',{},wFx);
wLeft.stones.forEach(([cx,w,h],i)=>stone(el('g',{},gStones),cx,W_BASE,w,h,11+i));
let cy=W_BASE; const cairnY=[];
wRight.cairn.forEach(([cx,w,h],i)=>{ cairnY.push(cy); stone(el('g',{},gStones),cx,cy,w,h,21+i); cy-=h*.92; });
const txt=(x,y,s,cls,anchor='middle',parent=wFx)=>{ const t=el('text',{x,y,class:cls,'text-anchor':anchor},parent); t.textContent=s; return t; };
txt(112,92,'Ordinary staking','fx-label'); txt(316,92,'Resu','fx-label');
const capCalm=txt(210,40,'Most years','fx-label'), capStorm=txt(210,40,'The year it goes wrong','fx-label');
const tCalm=el('g',{},wFx), tStorm=el('g',{},wFx);
wLeft.stones.forEach(([cx],i)=>{ txt(cx,462,'+4.5%','fx-num','middle',tCalm); txt(cx,462,'−5.0%','fx-num','middle',tStorm); });
['Junior','Middle','Senior'].forEach((n,i)=>{ const y=cairnY[i]-wRight.cairn[i][2]*.45;
  txt(352,y-6,n,'fx-label','start'); txt(352,y+13,['+10.3%','+4.7%','+2.5%'][i],'fx-num','start',tCalm); txt(352,y+13,['−25.0%','0.0%','0.0%'][i],'fx-num','start',tStorm); });
['Junior','Middle','Senior'].forEach((n,i)=>{ const tt=txt(52+i*60,486,n,'fx-label'); tt.style.fontSize='9.5px'; tt.style.letterSpacing='.08em'; });
const waters=[wLeft,wRight].map(P=>({P,fill:el('path',{fill:IVc,'fill-opacity':.62,mask:'url(#wMask)'},wFx),hatch:el('path',{fill:'url(#wHatch)',mask:'url(#wMask)'},wFx),line:el('path',{class:'fx-ink'},wFx),
  petals:[0,1].map(i=>{ const g=el('g',{},wFx); g.innerHTML=petalSVG(IVc,INKc,1); return g; })}));
function tickWater(vh,t){
  const sec=$('#flaw').getBoundingClientRect(); if(!visible(sec)) return;
  const mob=innerWidth<=860, st=(mob?wFx:$('#stormTbl')).getBoundingClientRect();
  const ph=RM?1:damp('w',(mob?sstep(vh*.55,vh*.12,st.top):sstep(vh*.82,vh*.38,st.top)),4);
  capCalm.style.opacity=(1-ph).toFixed(3); capStorm.style.opacity=ph.toFixed(3);
  tCalm.style.opacity=(1-ph).toFixed(3); tStorm.style.opacity=ph.toFixed(3);
  waters.forEach((w,wi)=>{
    const calmL=W_BASE+12, stormL=wi===0? W_BASE-54*.32 : W_BASE-wRight.cairn[0][2]*.98-3;
    const L=lerp(calmL,stormL,ph), amp=lerp(1.6,4.2,ph);
    const pts=[]; for(let x=w.P.x0;x<=w.P.x1;x+=6) pts.push([x, L+amp*Math.sin(x*.07+t*1.7+wi)+amp*.5*Math.sin(x*.16-t*1.2)]);
    const line='M'+pts.map(p=>f1(p[0])+' '+f1(p[1])).join('L');
    const area=line+`L${w.P.x1} 440L${w.P.x0} 440Z`;
    w.fill.setAttribute('d',area); w.hatch.setAttribute('d',area); w.line.setAttribute('d',line);
    w.hatch.setAttribute('opacity',(.35+.4*ph).toFixed(3));
    w.petals.forEach((g,i)=>{ const x=w.P.x0+40+i*90+Math.sin(t*.4+i*2)*14, y=L+amp*Math.sin(x*.07+t*1.7+wi)-1;
      g.setAttribute('transform',`translate(${f1(x)} ${f1(y)}) rotate(${f1(80+Math.sin(t+i)*12)}) scale(.13 .07)`); g.style.opacity=(1-ph).toFixed(3); });
  });
  $$('#stormTbl td:last-child').forEach((td,i)=>td.style.color=ph>.6?(i===0?V3:INKc):'');
}

const cFx=$('#cascadeFx');
el('defs',{},cFx).innerHTML=`<pattern id="bHatch" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="${INKc}" stroke-width=".55" opacity=".45"/></pattern>
  <linearGradient id="wGl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".3" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
const RX=60, RY=11, DEP=40, G=640;
const BOWLS=[{cx:150,cy:130,n:'Senior',c:V3,fee:'−2.0%',net:'+2.5%',d:-.16},{cx:245,cy:265,n:'Middle',c:V2,fee:'+0.2%',net:'+4.7%',d:.03},{cx:340,cy:400,n:'Junior',c:V1,fee:'+5.8%',net:'+10.3%',d:.3}];
const halfW=y=>{ const q=clamp((y)/DEP,0,1); return RX*Math.sqrt(1-q*q); };
const gStream=el('g',{},cFx);
BOWLS.forEach((b,i)=>{
  const {cx,cy}=b, body=`M${cx-RX} ${cy}A${RX} ${DEP} 0 0 0 ${cx+RX} ${cy}Z`;
  const outer=`M${cx-RX-6} ${cy}A${RX+6} ${DEP+7} 0 0 0 ${cx+RX+6} ${cy}`;
  el('path',{d:`M${cx-20} ${cy+DEP+5}L${cx-24} ${cy+DEP+12}L${cx+24} ${cy+DEP+12}L${cx+20} ${cy+DEP+5}`,fill:IVc,class:'fx-ink'},cFx);
  el('path',{d:outer+'Z',fill:IVc},cFx);
  const cpo=el('clipPath',{id:'bo'+i},cFx); el('path',{d:outer+'Z'},cpo);
  el('rect',{x:cx+RX*.18,y:cy,width:RX,height:DEP+10,fill:'url(#bHatch)','clip-path':`url(#bo${i})`},cFx);
  const cp=el('clipPath',{id:'bw'+i},cFx); el('path',{d:body},cp);
  el('path',{d:body,fill:'#e4dfd4'},cFx);
  b.water=el('rect',{x:cx-RX,width:RX*2,height:DEP+4,fill:b.c,'clip-path':`url(#bw${i})`},cFx);
  b.gl=el('rect',{x:cx-RX,width:RX*2,height:DEP+4,fill:'url(#wGl)','clip-path':`url(#bw${i})`},cFx);
  b.surf=el('ellipse',{cx,fill:mix(b.c,'#ffffff',.35),stroke:INKc,'stroke-width':.7,'stroke-opacity':.6},cFx);
  b.ripG=el('g',{},cFx);
  el('path',{d:outer,class:'fx-ink'},cFx);
  el('ellipse',{cx,cy,rx:RX+6,ry:RY+2,class:'fx-ink',fill:'none'},cFx);
  el('path',{d:`M${cx-RX} ${cy}A${RX} ${RY} 0 0 0 ${cx+RX} ${cy}`,class:'fx-thin'},cFx);
  if(i<2){ const sx=cx+RX*.86, sy=cy+DEP*.42, ex=sx+17, ey=sy+5;
    const g=el('g',{},cFx);
    el('path',{d:`M${sx} ${sy-3.2}L${ex} ${ey-3.2}L${ex} ${ey+3.2}L${sx} ${sy+3.2}Z`,fill:'#e9e2cf',class:'fx-ink'},g);
    el('path',{d:`M${sx+8} ${sy+.6}l0 6.4`,class:'fx-thin'},g);
    el('ellipse',{cx:ex,cy:ey,rx:1.6,ry:3.2,fill:IVc,class:'fx-thin'},g);
    b.spout=[ex+.5,ey+1]; }
  const lb=txt(cx-RX-14,cy+4,b.n,'fx-label','end',cFx);
  b.tFee=txt(cx,cy+DEP+36,'','fx-num','middle',cFx); b.tFee.style.fontSize='15px';
  b.sy=cy+DEP*.7;
});
const pipes=[0,1].map(i=>{ const a=BOWLS[i], b=BOWLS[i+1];
  const body=el('path',{fill:a.c,'fill-opacity':.62,stroke:INKc,'stroke-width':.55,'stroke-opacity':.5,'stroke-linejoin':'round'},gStream);
  const core=el('path',{fill:mix(a.c,'#ffffff',.45),'fill-opacity':.55},gStream);
  const flecks=[...Array(7)].map((_,k)=>({ph:k/7+rnd()*.08, e:el('path',{fill:'none',stroke:'#fff','stroke-linecap':'round','stroke-width':.9,'stroke-opacity':.85},gStream)}));
  const beads=[...Array(9)].map((_,k)=>({ph:k/9, e:el('ellipse',{fill:a.c,'fill-opacity':.75,stroke:INKc,'stroke-width':.45,'stroke-opacity':.45},gStream)}));
  const foamG=el('g',{},b.ripG);
  const plume=el('path',{fill:'#fff','fill-opacity':.35,'clip-path':`url(#bw${i+1})`},foamG);
  const foam=[...Array(7)].map(()=>el('ellipse',{fill:'#fff','fill-opacity':.8,stroke:INKc,'stroke-width':.35,'stroke-opacity':.35},foamG));
  const hl=[core,...flecks.map(f=>f.e),...beads.map(q=>q.e),foamG];
  return {a,b,to:i+1,body,core,flecks,beads,foam,plume,hl,acc:0,o:0};
});
const DROP_D='M0 -6C1.6 -2.6 3 -.4 3 1.6A3 3 0 0 1 -3 1.6C-3 -.4 -1.6 -2.6 0 -6Z';
const dropPool=[...Array(40)].map(()=>{ const e=el('path',{d:DROP_D,stroke:INKc,'stroke-width':.6},cFx); e.style.display='none'; return {e,on:false}; });
const ripPool=[...Array(30)].map(()=>({e:null,on:false}));
const rainAcc=[0,0,0];
function spawnDrop(x,y,vx,vy,to,fill,size,splash){ const d=dropPool.find(q=>!q.on); if(!d) return;
  Object.assign(d,{on:true,x,y,vx,vy,to,s:size,splash:!!splash}); d.e.setAttribute('fill',fill); d.e.style.display=''; }
function spawnRipple(i,x,y,big){ const r=ripPool.find(q=>!q.on); if(!r) return;
  if(!r.e) r.e=el('ellipse',{fill:'none',stroke:INKc,'stroke-width':.7});
  BOWLS[i].ripG.appendChild(r.e); Object.assign(r,{on:true,i,x,y,age:0,big}); r.e.style.display=''; }
let cLast=0;
const cCap=txt(210,34,'','fx-label','middle',cFx);
function tickCascade(vh,t){
  const dt=Math.min(.05,t-cLast||0); cLast=t;
  const sec=$('#seats').getBoundingClientRect(); if(!visible(sec)) return;
  const mob=innerWidth<=860, cr=cFx.getBoundingClientRect();
  const k=RM?1:damp('c',(mob?clamp((vh*.8-cr.top)/(vh*.7)):clamp((vh*.85-sec.top)/(sec.height*.62))),4);
  const rain=sstep(.05,.35,k), fee=sstep(.4,.8,k);
  cCap.textContent=fee>.5?'Protection fee flows down':'Staking gives +4.5% each';
  BOWLS.forEach((b,i)=>{
    const lev=clamp(.18+.42*rain+b.d*fee,.08,.92);
    b.lev=lev;
    const dep=(1-lev)*DEP*.92; b.sy=b.cy+dep+Math.sin(t*1.3+i)*.4;
    const w=halfW(dep);
    b.water.setAttribute('y',f1(b.sy)); b.gl.setAttribute('y',f1(b.sy));
    b.surf.setAttribute('cy',f1(b.sy)); b.surf.setAttribute('rx',f1(w)); b.surf.setAttribute('ry',f1(RY*w/RX));
    b.w=w;
    b.tFee.textContent=fee>.05?`${b.fee} → ${b.net}`:(rain>.05?'+4.5%':'');
    b.tFee.style.opacity=(fee>.05?sstep(.4,.6,k):rain).toFixed(3);
    const rr=rain*(1-fee)*(RM?0:1); rainAcc[i]+=dt*rr*2.4;
    while(rainAcc[i]>1){ rainAcc[i]-=1; spawnDrop(b.cx+(rnd()-.5)*RX*1.1,b.cy-110-rnd()*30,(rnd()-.5)*6,60,i,IVc,.9+rnd()*.3); }
  });
  pipes.forEach((p,i)=>{
    const o=RM?1:sstep(.42+i*.08,.56+i*.08,k); p.o=o;
    if(o<.02){ p.body.style.display='none'; p.hl.forEach(h=>h.style.display='none'); return; }
    p.body.style.display=''; p.hl.forEach(h=>h.style.display='');
    const a=p.a, b=p.b, x0=a.spout[0], y0=a.spout[1], vy0=8;
    const yl=b.sy, xl=b.cx+RX*.02;
    const T=(-vy0+Math.sqrt(vy0*vy0+2*G*(yl-y0)))/G, vx=(xl-x0)/T;
    const at=tt=>[x0+vx*tt, y0+vy0*tt+.5*G*tt*tt];
    const speed=tt=>Math.hypot(vx, vy0+G*tt), v0=speed(0);
    const flow=o*lerp(.88,1.12,clamp((a.lev||.5)/.6))*(1+.06*Math.sin(t*3.1+i*2));
    const brk=.9+.025*Math.sin(t*2.3+i);
    const N=36, C=[], W=[];
    for(let j=0;j<=N;j++){ const u=brk*j/N, tt=T*u; C.push(at(tt));
      const w0=3.3*flow*Math.sqrt(v0/speed(tt));
      W.push(Math.max(.4, w0*(1+.22*u*u*Math.sin(t*26-j*1.25)) * (j===N?.55:1))); }
    const side=(scale,off)=>{ const L=[],R=[];
      C.forEach(([px,py],j)=>{ const q=C[Math.min(j+1,N)], r0=C[Math.max(j-1,0)], dx=q[0]-r0[0], dy=q[1]-r0[1], l=Math.hypot(dx,dy)||1, nx=-dy/l, ny=dx/l, w=W[j]*scale;
        L.push([px+nx*(w+off),py+ny*(w+off)]); R.push([px-nx*(w-off),py-ny*(w-off)]); });
      return 'M'+L.map(q=>f1(q[0])+' '+f1(q[1])).join('L')+'L'+R.reverse().map(q=>f1(q[0])+' '+f1(q[1])).join('L')+'Z'; };
    p.body.setAttribute('d',side(1,0));
    p.core.setAttribute('d',side(.38,-W[0]*.18));
    p.flecks.forEach(f=>{ f.ph=(f.ph+dt/(T*1.15))%1; const u=f.ph*brk, tt=T*u, [px,py]=at(tt), sp=speed(tt);
      const len=2+sp*.012, ux=vx/sp, uy=(vy0+G*tt)/sp, w=W[Math.round(u/brk*N)]*.35;
      f.e.setAttribute('d',`M${f1(px-uy*w-ux*len*.5)} ${f1(py+ux*w-uy*len*.5)}l${f1(ux*len)} ${f1(uy*len)}`);
      f.e.style.opacity=(o*sstep(0,.1,f.ph)*(1-sstep(.85,1,f.ph))).toFixed(3); });
    p.beads.forEach((q,k)=>{ q.ph=(q.ph+dt/(T*(1-brk))*.9)%1; const u=brk+(1-brk)*q.ph, tt=T*u, [px,py]=at(tt), sp=speed(tt);
      const r=(1.25+.45*Math.sin(k*2.7))*flow, st=1+Math.min(.8,sp/600), ang=Math.atan2(vy0+G*tt,vx)/D2R;
      q.e.setAttribute('cx',f1(px)); q.e.setAttribute('cy',f1(py)); q.e.setAttribute('rx',f1(r*st)); q.e.setAttribute('ry',f1(r/st));
      q.e.setAttribute('transform',`rotate(${f1(ang)} ${f1(px)} ${f1(py)})`); q.e.style.opacity=o.toFixed(3); });
    p.foam.forEach((e,k)=>{ const ph=t*2.2+k*1.9, rr=(1.2+.9*Math.abs(Math.sin(ph)))*flow;
      e.setAttribute('cx',f1(xl+Math.sin(k*2.1+t*1.3)*(3+k*.9))); e.setAttribute('cy',f1(yl+Math.cos(k*1.7+t)*1.1));
      e.setAttribute('rx',f1(rr)); e.setAttribute('ry',f1(rr*.55)); });
    const pd=(9+3*Math.sin(t*4))*flow, pw=3.2*flow;
    p.plume.setAttribute('d',`M${f1(xl-pw)} ${f1(yl)}Q${f1(xl-pw*1.6)} ${f1(yl+pd*.6)} ${f1(xl)} ${f1(yl+pd)}Q${f1(xl+pw*1.6)} ${f1(yl+pd*.6)} ${f1(xl+pw)} ${f1(yl)}Z`);
    if(!RM && rnd()<dt*7*o) spawnRipple(p.to,xl+(rnd()-.5)*3,yl,rnd()<.4);
    p.acc+=dt*o*6*flow; while(!RM && p.acc>1){ p.acc-=1;
      spawnDrop(xl+(rnd()-.5)*4,yl-1,(rnd()-.5)*70,-(50+rnd()*70),p.to,b.c,.35+rnd()*.25,true); }
  });
  for(const d of dropPool){ if(!d.on) continue;
    d.vy+=G*dt; d.x+=d.vx*dt; d.y+=d.vy*dt;
    const b=BOWLS[d.to];
    if(d.vy>0 && d.y>=b.sy && Math.abs(d.x-b.cx)<(b.w||RX)){ if(!d.splash) spawnRipple(d.to,d.x,b.sy,d.s>.85); d.on=false; d.e.style.display='none'; continue; }
    if(d.y>520){ d.on=false; d.e.style.display='none'; continue; }
    const sp=Math.hypot(d.vx,d.vy), ang=Math.atan2(d.vy,d.vx)/D2R-90, st=1+Math.min(.9,sp/520);
    d.e.setAttribute('transform',`translate(${f1(d.x)} ${f1(d.y)}) rotate(${f1(ang+180)}) scale(${(d.s/st).toFixed(3)} ${(d.s*st).toFixed(3)})`);
  }
  for(const r of ripPool){ if(!r.on) continue; r.age+=dt; const life=r.big?1.2:.85, q=r.age/life;
    if(q>=1){ r.on=false; r.e.style.display='none'; continue; }
    const b=BOWLS[r.i], maxR=(b.w||RX)*.9, rx=Math.min(maxR,(r.big?22:13)*Math.sqrt(q));
    r.e.setAttribute('cx',f1(r.x)); r.e.setAttribute('cy',f1(b.sy)); r.e.setAttribute('rx',f1(rx)); r.e.setAttribute('ry',f1(rx*RY/RX)); r.e.setAttribute('opacity',((1-q)*.7).toFixed(3)); }
}

const rootsBox=$('#roots'), rFx=$('#rootsFx'), soil=$('#soilFx'), rms=$$('#roots .rm');
let RT=null;
function tapered(pts,w0,w1){ const n=pts.length, L=[],Rr=[];
  for(let i=0;i<n;i++){ const a=pts[Math.max(0,i-1)], b=pts[Math.min(n-1,i+1)], dx=b[0]-a[0], dy=b[1]-a[1], l=Math.hypot(dx,dy)||1;
    const w=lerp(w0,w1,Math.pow(i/(n-1),.8))/2*(1+.1*Math.sin(i*1.7)); L.push([pts[i][0]-dy/l*w,pts[i][1]+dx/l*w]); Rr.push([pts[i][0]+dy/l*w,pts[i][1]-dx/l*w]); }
  const e=pts[n-1]; return 'M'+L.map(p=>f1(p[0])+' '+f1(p[1])).join('L')+`L${f1(e[0])} ${f1(e[1])}L`+Rr.reverse().map(p=>f1(p[0])+' '+f1(p[1])).join('L')+'Z'; }
function wander(x,y,ang,len,step,r,bend=.35,down=.04){ const pts=[[x,y]]; let a=ang;
  for(let d=0;d<len;d+=step){ a+=(r()-.5)*bend; a+=(Math.PI/2-a)*down; x+=Math.cos(a)*step; y+=Math.sin(a)*step; pts.push([x,y]); } return pts; }
function dashSetup(m){ const L=m.getTotalLength()||1; m.L=L; m.setAttribute('stroke-dasharray',`${L.toFixed(1)} ${(L*3+40).toFixed(1)}`); draw(m,0); return m; }
function draw(m,k){ m.style.strokeDashoffset=((1-k)*m.L).toFixed(1); m.style.visibility=k<=0?'hidden':''; }
const thin=(p,max=90)=>{ if(p.length<=max) return p; const k=Math.ceil(p.length/max), o=p.filter((_,i)=>i%k===0); if(o[o.length-1]!==p[p.length-1]) o.push(p[p.length-1]); return o; };
const polyline=p=>'M'+p.map(q=>f1(q[0])+' '+f1(q[1])).join('L');
function layoutRoots(){
  rFx.innerHTML='';
  const TOP=74;
  const RW=rFx.clientWidth, H=rootsBox.clientHeight+TOP, x0=RW*.42, r=rng(77);
  rFx.setAttribute('viewBox',`0 0 ${RW} ${H}`);
  const GY=58;
  const ys=rms.map(m=>{ const h=m.querySelector('h3'); return m.offsetTop+h.offsetTop+h.offsetHeight/2+TOP; });
  const yEnd=ys[ys.length-1]+46;
  const defs=el('defs',{},rFx), mask=el('mask',{id:'rootMask',maskUnits:'userSpaceOnUse',x:-50,y:-50,width:RW+100,height:H+100},defs);
  const gFill=el('g',{mask:'url(#rootMask)'},rFx);
  const piece=(pts,w0,w1,opts={})=>{ const fill=el('path',{d:tapered(pts,w0,w1),fill:opts.col||INKc,opacity:opts.op??1},gFill);
    const m=el('path',{d:polyline(thin(pts)),fill:'none',stroke:'#fff','stroke-width':w0+8,'stroke-linecap':'round','stroke-linejoin':'round',},mask);
    dashSetup(m);
    if(opts.tr) m.style.transition=opts.tr; return {fill,m,y:pts[0][1]}; };
  const xAt=y=>x0+6*Math.sin(y*.010+.5)*Math.min(1,(y-GY)/120)+3*Math.sin(y*.027)*Math.min(1,(y-GY)/80)+1.5*Math.sin(y*.071+2);
  const ground=el('g',{class:'rm-ground'},rFx);
  let gd=''; for(let x=x0-46;x<x0+46;x+=4+r()*5){ const l=3+r()*5; gd+=`M${f1(x)} ${f1(GY+2+r()*3)}l${f1(-l*.5)} ${f1(l*.7)}`; }
  el('path',{d:`M${f1(x0-54)} ${GY}Q${f1(x0-20)} ${GY-2.5} ${f1(x0)} ${GY-1}T${f1(x0+54)} ${GY+.5}`,fill:'none',stroke:INKc,'stroke-width':1.3,'stroke-linecap':'round'},ground);
  el('path',{d:gd,fill:'none',stroke:INKc,'stroke-width':.6,opacity:.45},ground);
  const sprout=el('g',{},rFx); sprout.style.transformOrigin=`${x0}px ${GY}px`;
  el('path',{d:`M${f1(x0)} ${GY}C${f1(x0-1)} ${GY-10} ${f1(x0+3)} ${GY-20} ${f1(x0+1)} ${GY-30}`,fill:'none',stroke:INKc,'stroke-width':1.4,'stroke-linecap':'round'},sprout);
  el('path',{d:`M${f1(x0+.5)} ${GY-14}C${f1(x0-6)} ${GY-20} ${f1(x0-14)} ${GY-19} ${f1(x0-17)} ${GY-14}C${f1(x0-12)} ${GY-11} ${f1(x0-5)} ${GY-11} ${f1(x0+.5)} ${GY-14}Z`,fill:IVc,stroke:INKc,'stroke-width':1},sprout);
  el('path',{d:`M${f1(x0+1)} ${GY-20}C${f1(x0+7)} ${GY-27} ${f1(x0+14)} ${GY-26} ${f1(x0+17)} ${GY-21}C${f1(x0+12)} ${GY-17} ${f1(x0+6)} ${GY-17} ${f1(x0+1)} ${GY-20}Z`,fill:IVc,stroke:INKc,'stroke-width':1},sprout);
  const fl=el('use',{href:'#petalArt',transform:`translate(${f1(x0+1-101*.13)} ${f1(GY-31-111*.13)}) scale(.13)`},sprout);
  const main=[]; for(let y=GY;y<=yEnd;y+=4) main.push([xAt(y),y]);
  const M=piece(main,9,1.6);
  el('path',{d:`M${f1(x0-7)} ${GY}Q${f1(x0-4.5)} ${GY+5} ${f1(x0-4)} ${GY+12}L${f1(x0+4)} ${GY+12}Q${f1(x0+4.5)} ${GY+5} ${f1(x0+7)} ${GY}Z`,fill:INKc},gFill);
  const hl=main.map(([x,y],i)=>[x-2.3*(1-i/main.length),y]);
  el('path',{d:polyline(hl),fill:'none',stroke:IVc,'stroke-width':.9,opacity:.5},gFill);
  const hairs=[];
  for(let i=0;i<18;i++){ const y=GY+16+r()*(yEnd-GY-40); if(ys.some(v=>Math.abs(v-y)<22)) continue;
    const dir=r()<.62?-1:1, x=xAt(y), wTop=lerp(2.4,1.1,(y-GY)/(yEnd-GY));
    const p1=wander(x,y,Math.PI/2+dir*(.9+r()*.5),12+r()*26,3,r,.5,.06);
    hairs.push(piece(p1,wTop,.25,{tr:'stroke-dashoffset 1s ease-out'}));
    if(r()<.55){ const j=p1[Math.floor(p1.length*.5)]; hairs.push(piece(wander(j[0],j[1],Math.PI/2+dir*.2,8+r()*10,2.5,r,.6,.08),wTop*.5,.2,{tr:'stroke-dashoffset .8s .5s ease-out'})); }
  }
  const BR=rms.map((m,i)=>{ const y=ys[i], s=m.dataset.s, cx=xAt(y);
    const col=s==='later'?'#9a9488':INKc, op=s==='later'?.6:1;
    const pts=[]; const ex=RW-14;
    for(let j=0;j<=12;j++){ const a=j/12; pts.push([lerp(cx+5,ex,a), y+Math.sin(a*Math.PI)*-3+Math.sin(a*9+i)*.8]); }
    const parts=[piece(pts,2.2,.35,{col,op,tr:'stroke-dashoffset .9s .15s cubic-bezier(.5,0,.2,1)'})];
    if(s!=='later') for(let k=0;k<2;k++){ const j=pts[4+Math.floor(r()*6)];
      parts.push(piece(wander(j[0],j[1],Math.PI/2+(r()-.5)*.9,6+r()*9,2.2,r,.6,.08),.9,.15,{col,op,tr:`stroke-dashoffset .7s ${.55+k*.15}s ease-out`})); }
    const ring=el('circle',{cx:f1(cx),cy:f1(y),r:8.5,fill:'var(--paper,#efebe3)',stroke:'none',opacity:0},rFx);
    const node=el('circle',{cx:f1(cx),cy:f1(y),r:5.5,fill:s==='done'?INKc:(s==='now'?V3:IVc),stroke:s==='now'?V3:(s==='later'?'#9a9488':INKc),'stroke-width':1.5,opacity:0},rFx);
    if(s==='done') el('circle',{cx:f1(cx-1.4),cy:f1(y-1.4),r:1.4,fill:IVc,opacity:0,class:'nd-hl'},rFx);
    [ring,node].forEach(e=>e.style.transition='opacity .4s');
    const glow=s==='now'?el('circle',{cx:f1(cx),cy:f1(y),r:5.5,fill:'none',stroke:V3,'stroke-width':1.2,opacity:0},rFx):null;
    return {y,s,m,parts,node,ring,glow,on:false}; });
  RT={M,hairs,BR,yEnd,GY,sprout,ground};
  const sec=$('#roadmap'), SW=sec.clientWidth, SH=sec.clientHeight;
  soil.setAttribute('viewBox',`0 0 ${SW} ${SH}`); soil.innerHTML='';
  const rs=rng(5);
  for(let k=0;k<5;k++){ const y=SH*(.32+k*.14); let dd=''; let x=-10; while(x<SW){ const l=60+rs()*220; dd+=`M${f1(x)} ${f1(y+rs()*8)}q${f1(l/2)} ${f1((rs()-.5)*8)} ${f1(l)} ${f1((rs()-.5)*6)}`; x+=l+30+rs()*90; }
    el('path',{d:dd,fill:'none',stroke:INKc,'stroke-width':.7,opacity:.1},soil); }
  for(let k=0;k<26;k++){ const x=rs()*SW, y=SH*(.3+rs()*.65), w=4+rs()*8;
    el('ellipse',{cx:f1(x),cy:f1(y),rx:f1(w),ry:f1(w*.6),fill:'none',stroke:INKc,'stroke-width':.7,opacity:.13},soil); }
}
function tickRoots(vh,t){
  if(!RT) return; const box=rootsBox.getBoundingClientRect(), TOP=74, target=vh*.74-box.top+TOP;
  const vis=visible(box); if(!vis){ const side=box.top>0?'below':'above'; if(RT.parked===side) return; RT.parked=side; SM.r=target; } else RT.parked=null;
  const yRev=RM?1e5:(vis?damp('r',target,5):target);
  const sp=RM?1:clamp((yRev-RT.GY+30)/60);
  RT.sprout.style.transform=`scale(${(.2+.8*easeOutBack(sp)).toFixed(3)})`; RT.sprout.style.opacity=sstep(0,.3,sp).toFixed(3);
  RT.ground.style.opacity=sstep(0,.5,sp).toFixed(3);
  draw(RT.M.m,clamp((yRev-RT.GY)/(RT.yEnd-RT.GY)));
  RT.hairs.forEach(h=>{ const on=yRev>h.y+6; if(on!==h.on){ h.on=on; draw(h.m,on?1:0); } });
  RT.BR.forEach(b=>{ const on=yRev>b.y;
    if(on!==b.on){ b.on=on; b.m.classList.toggle('in',on); b.parts.forEach(p=>draw(p.m,on?1:0)); b.node.setAttribute('opacity',on?1:0); b.ring.setAttribute('opacity',on?1:0); }
    if(b.glow){ const ph=(t*.8)%1; b.glow.setAttribute('r',f1(5.5+ph*12)); b.glow.setAttribute('opacity',b.on?((1-ph)*.7).toFixed(3):0); }
  });
  rFx.querySelectorAll('.nd-hl').forEach((e,i)=>e.setAttribute('opacity',RT.BR.filter(b=>b.s==='done')[i]?.on?.8:0));
}
function easeOutBack(x){ const c1=1.6, c3=c1+1; return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2); }

$$('.kr .crack').forEach((svg,i)=>{
  const r=rng(400+i); let x=0, y=8, d=`M0 8`, pts=[[0,8]];
  while(x<1000){ x+=10+r()*34; y=clamp(8+(r()-.5)*(r()<.25?14:7),1,15); pts.push([Math.min(x,1000),y]); }
  d='M'+pts.map(p=>f1(p[0])+' '+f1(p[1])).join('L');
  el('path',{d,class:'ink'},svg);
  el('path',{d,class:'glow'},svg);
  el('path',{d,class:'gold'},svg);
  const j=pts[2+Math.floor(r()*(pts.length-4))], dir=r()<.5?-1:1;
  el('path',{d:`M${f1(j[0])} ${f1(j[1])}l${f1(14+r()*20)} ${f1(dir*5)}l${f1(10+r()*14)} ${f1(dir*2)}`,class:'twig'},svg);
});

const fFx=$('#finalFx'), fFront=$('#finalFront'), finalSec=$('#final'), openApp=$('#openApp');
let F={};
function layoutFinal(){
  fFx.innerHTML=''; fFront.innerHTML='';
  const W=finalSec.clientWidth, H=finalSec.clientHeight; fFx.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const tr=$('.final-in').getBoundingClientRect(), sr=finalSec.getBoundingClientRect();
  const mob=W<700, KY=1;
  const R0=mob?Math.min(W*.2,84):Math.min(W*.27,H*.38,330);
  const cx=W/2, cyc=mob?(tr.top-sr.top-R0-34):(tr.top-sr.top+tr.height/2);
  const ls=mob?R0*1.15/200:Math.min(.44,R0/620+.1);
  F={W,H,cx,cyc,R0,ls,fy:mob?cyc+6:cyc-R0};
  const r=rng(31), defs=el('defs',{},fFx);
  const a0=-Math.PI/2+.32, a1=-Math.PI/2+Math.PI*2-.30, N=220, L=[],Rr=[],axis=[];
  for(let i=0;i<=N;i++){ const u=i/N, a=lerp(a0,a1,u);
    const rad=R0*(1+.012*Math.sin(u*9+1)+.02*u);
    const w=(u<.06?lerp(2,7.5,u/.06):lerp(7.5,1.2,Math.pow((u-.06)/.94,1.4)))*(1+.12*Math.sin(u*41))*Math.min(1,R0/220+.4);
    const x=cx+Math.cos(a)*rad, y=cyc+Math.sin(a)*rad*KY; axis.push([x,y]);
    L.push([cx+Math.cos(a)*(rad-w/2),cyc+Math.sin(a)*(rad-w/2)*KY]); Rr.push([cx+Math.cos(a)*(rad+w/2),cyc+Math.sin(a)*(rad+w/2)*KY]); }
  el('filter',{id:'ensoBlur',x:'-10%',y:'-10%',width:'120%',height:'120%'},defs).innerHTML='<feGaussianBlur stdDeviation="3"/>';
  const mask=el('mask',{id:'ensoM',maskUnits:'userSpaceOnUse',x:0,y:0,width:W,height:H},defs);
  F.ensoM=el('path',{d:polyline(thin(axis)),fill:'none',stroke:'#fff','stroke-width':18,filter:'url(#ensoBlur)','stroke-linecap':'round'},mask);
  dashSetup(F.ensoM);
  const g=el('g',{mask:'url(#ensoM)'},fFx); F.ensoG=g;
  el('path',{d:'M'+L.map(p=>f1(p[0])+' '+f1(p[1])).join('L')+'L'+Rr.reverse().map(p=>f1(p[0])+' '+f1(p[1])).join('L')+'Z',fill:INKc,opacity:.88},g);
  for(let k=0;k<5;k++){ const s0=.55+r()*.3, s1=Math.min(1,s0+.08+r()*.12), off=(r()-.5)*5, pts=[];
    for(let i=Math.floor(s0*N);i<=Math.floor(s1*N);i++){ const a=lerp(a0,a1,i/N), rad=R0*(1+.012*Math.sin(i/N*9+1)+.02*i/N)+off; pts.push([cx+Math.cos(a)*rad,cyc+Math.sin(a)*rad*KY]); }
    el('path',{d:polyline(pts),fill:'none',stroke:INKc,'stroke-width':.7,opacity:.5},g); }
  F.logo=el('g',{},fFx);
  F.logoIn=el('g',{},F.logo); el('use',{href:'#petalArt',transform:'translate(-101 -111)'},F.logoIn);
}
function tickFinal(vh,t){
  if(!F.W) return; const wr=$('#finalWrap').getBoundingClientRect(); if(!visible(wr)) return;
  const k=RM?1:damp('f',clamp((vh*.35-wr.top)/((wr.height-vh)*.92+vh*.35)),3.5);
  const {cx,cyc,R0,ls,fy}=F;
  const en=sstep(0,.62,k);
  draw(F.ensoM,en);
  F.ensoG.style.opacity=sstep(0,.12,k).toFixed(3);
  const lg=RM?1:sstep(.5,.78,k), le=1-Math.pow(1-lg,3);
  F.logo.setAttribute('transform',`translate(${f1(cx)} ${f1(fy+(1-le)*10)}) scale(${(ls*(.9+.1*le)).toFixed(4)})`);
  F.logo.style.opacity=lg.toFixed(3);
  const bq=RM?1:sstep(.66,.94,k), be=bq;
  openApp.style.transform=`translate3d(0,${((1-be)*22).toFixed(1)}px,0)`; openApp.style.opacity=be.toFixed(3);
}
function easeIO(x){ return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2; }

function layoutAll(){ layoutStats(); layoutRoots(); layoutFinal(); }
addEventListener('load',layoutAll); document.fonts&&document.fonts.ready.then(layoutAll);
let rt, lastW=innerWidth; addEventListener('resize',()=>{ if(innerWidth===lastW) return; lastW=innerWidth; VH=vhProbe.offsetHeight||innerHeight; clearTimeout(rt); rt=setTimeout(layoutAll,150); });
layoutAll();
const contentEl=$('#content'); let contentTop=0;
const measureContent=()=>{ contentTop=contentEl.getBoundingClientRect().top+scrollY; };
measureContent(); addEventListener('load',measureContent); addEventListener('resize',measureContent);
document.fonts&&document.fonts.ready.then(measureContent);
gsap.ticker.add(()=>{ const vh=VH, t=performance.now()/1000; SM_dt=SM_last?Math.min(.05,t-SM_last):1/60; SM_last=t;
  if(scrollY+vh*1.15<contentTop){ for(const k in SM) delete SM[k]; return; }
  tickQueue(vh,t); tickWater(vh,t); tickCascade(vh,t); tickRoots(vh,t); tickFinal(vh,t); });
})();
})();
