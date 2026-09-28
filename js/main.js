'use strict';
/* The page: a profile first (who I am, how to reach me, what I work with), then, on demand, the story:
   one slide per step, left to right along a real time axis. English or German, picked from the browser. */
document.documentElement.classList.add('js');
const REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;
const QS=new URLSearchParams(location.search);
const STILL=QS.has('still');                 // screenshots: nothing moves unless asked
const tx=v=>(v&&typeof v==='object'&&'en' in v)?v[LANG]:v;
const plain=h=>{const d=document.createElement('div');d.innerHTML=h;return d.textContent.replace(/\s+/g,' ').trim()};
const LOCALE=()=>LANG==='de'?'de-DE':'en-US';

function detectLang(){
  const q=QS.get('lang'); if(q==='de'||q==='en') return q;
  try{const s=localStorage.getItem('hts-lang'); if(s==='de'||s==='en') return s}catch(e){}
  const ls=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];
  return ls.some(l=>/^de(-|$)/i.test(l))?'de':'en';
}
LANG=detectLang();

const rail=$('rail'), track=$('track'), prof=$('profile'), storyEl=$('story');
let idx=0, mounted=[], secs=[], mode='', pro=null, tour=null, pushedStory=false;
const CHAP={alhadi:'01',apicbase:'02',own:'+2'};

function el(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function chips(list,cls='chips'){const d=el('div',cls);list.forEach(c=>{const [label,at,tone]=Array.isArray(c)?c:[c];const s=el('span','chip'+(tone?' '+tone:''),tx(label));if(at)s.dataset.at=at;d.appendChild(s)});return d}
const ICONS={
  mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M4 7.5l8 6 8-6"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4.5"/><path d="M8 10.5v6M8 7.5v.2M12 16.5v-6M12 13.2c0-1.7 1.1-2.7 2.4-2.7 1.4 0 2.1 1 2.1 2.7v3.3"/></svg>',
  github:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.4 5.5l-2.8 13"/></svg>',
  arrow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>'
};
const contactLinks=()=>PROFILE.contact.map(c=>`<a class="cbtn ${c.kind}" href="${c.href}"${c.href.startsWith('http')?' target="_blank" rel="noopener"':''}>${ICONS[c.kind]}<span>${tx(c.label)}</span></a>`).join('');

// ---------------- time ----------------
const NOW=(()=>{const d=new Date();return d.getFullYear()+(d.getMonth()+(d.getDate()-1)/31)/12})();
const laneEnd=L=>L.to==null?NOW:L.to;
const AX=[2020.72,NOW+.3];                                  // the story's time axis
const pct=(t,[a,b])=>clamp((t-a)/(b-a))*100;
// chapters open their span; the beats inside keep their order and share the span evenly
function placeSlides(){
  const by={}; SLIDES.forEach(s=>(by[s.group]=by[s.group]||[]).push(s));
  LANES.forEach(L=>{const list=by[L.id]||[], beats=list.filter(s=>s.type!=='chapter'), to=laneEnd(L);
    list.forEach(s=>{s.lane=L.lane;s.t=L.from});
    beats.forEach((s,k)=>{s.t=L.from+(to-L.from)*(k+1)/(beats.length+.6)});
    list.forEach(s=>{s.x=pct(s.t,AX)})});
  SLIDES.forEach(s=>{if(s.group==='start'){s.lane=1;s.x=0}else if(s.group==='end'){s.lane=1;s.x=100}});
}
const navLabel=s=>s.group==='start'?tx(UI.story):s.group==='end'?tx(T('Contact','Kontakt')):plain(tx(s.kick));

// ---------------- the profile ----------------
function buildProfile(){
  const p=PROFILE; prof.innerHTML='';
  const w=el('div','pwrap');
  const L=el('div','pcol pleft');
  L.innerHTML=`<div class="prompt" aria-hidden="true"><span class="ptxt"></span><i class="caret"></i></div>
    <h1 class="pname"></h1>
    <div class="prole rise">${tx(p.role)}<span class="sep">·</span><b>${p.focus}</b></div>
    <div class="contact rise">${contactLinks()}</div>
    <p class="psum rise">${tx(p.summary)}</p>
    <div class="proof rise">${p.proof.map(x=>`<button type="button" class="pf" data-tone="${x.tone}" data-go="${x.go}"><b>${x.v}</b><span>${tx(x.l)}</span><i class="go">${ICONS.arrow}</i></button>`).join('')}</div>`;
  const R=el('div','pcol pright');
  R.innerHTML=`<section class="pcard glance rise"><h2>${tx(T('At a glance','Auf einen Blick'))}</h2>
      <dl class="facts">${p.facts.map(([k,v])=>`<div><dt>${tx(k)}</dt><dd>${tx(v)}</dd></div>`).join('')}</dl></section>
    <section class="pcard skills rise"><h2>${tx(UI.skills)}</h2>
      <div class="sgrid">${p.skills.map(g=>`<div class="sg"><h3>${tx(g.h)}</h3><div class="tags">${g.items.map(([n,y])=>`<span class="tag">${n}${y?`<b>${tx(y)}</b>`:''}</span>`).join('')}</div></div>`).join('')}</div></section>`;
  // the story card: milestones spaced evenly along one line, jobs above it, own systems below it
  const ms=p.milestones, X=k=>(11.5+k*77/(ms.length-1)).toFixed(2)+'%', yr=new Date().getFullYear();
  const YEARS=[['2021',0,'teal'],['2023',2,'ind'],[String(yr),ms.length-1,'ink']];
  const S=el('section','pcard pstory rise');
  S.innerHTML=`<div class="shead"><div><h2>${tx(UI.story)} · ${tx(T('2021 → today','2021 → heute'))}</h2><h3>${tx(UI.storyHead)}</h3></div>
      <div class="sactions"><button type="button" class="btn primary" data-go="story"><span>${tx(UI.storyStep)}</span>${ICONS.arrow}</button><button type="button" class="btn ghost" data-play><span class="ico">▶</span><span>${tx(UI.playShort)}</span></button></div></div>
    <div class="tl">
      <i class="tl-line"></i>
      ${YEARS.map(([y,k,tone])=>`<span class="tl-yr" data-tone="${tone}" style="--x:${X(k)};--i:${k}"><span class="ol">${y}</span></span>`).join('')}
      ${ms.map((m,k)=>`<i class="tl-stem ${m.side}" data-tone="${m.tone}" style="--x:${X(k)};--i:${k}"></i><i class="tl-node${m.today?' today':''}" data-tone="${m.tone}" style="--x:${X(k)};--i:${k}"></i>`).join('')}
      ${ms.map((m,k)=>{const inner=`<span class="tl-date">${tx(m.dates)}</span><b>${tx(m.name)}${m.badge?` <span class="tl-badge">${tx(m.badge)}</span>`:''}</b><span class="tl-role">${tx(m.role)}</span>${m.hi?`<span class="tl-hi">${m.hi.map(h=>`<em>${tx(h)}</em>`).join('')}</span>`:''}`;
        return m.go?`<button type="button" class="tl-card ${m.side}" data-tone="${m.tone}" data-go="${m.go}" style="--x:${X(k)};--i:${k}">${inner}<i class="go">${ICONS.arrow}</i></button>`
                   :`<div class="tl-card ${m.side} now" data-tone="${m.tone}" style="--x:${X(k)};--i:${k}">${inner}</div>`}).join('')}
    </div>
    <div class="sfoot"><span class="lg"><b>↑</b>${tx(UI.job)}</span><span class="lg"><b>↓</b>${tx(UI.ownSys)}</span><span class="snote">${tx(UI.storyNote)}</span></div>`;
  w.appendChild(L); w.appendChild(R); w.appendChild(S); prof.appendChild(w);
  const nm=L.querySelector('.pname'), chars=[];
  p.name.split(' ').forEach((word,wi,arr)=>{const ws=el('span','word');[...word].forEach(ch=>{const c=el('span','ch');c.textContent=ch;ws.appendChild(c);chars.push(c)});nm.appendChild(ws);if(wi<arr.length-1)nm.appendChild(document.createTextNode(' '))});
  w.querySelectorAll('.rise').forEach((c,k)=>c.style.setProperty('--k',k));
  pro={w,chars,u:pro?pro.u:0};
  paintProfile();
  const tl=S.querySelector('.tl'); fitTimeline();
  if(STILL||REDUCE||!('IntersectionObserver' in window)) tl.classList.add('in','done');
  else{const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){tl.classList.add('in');setTimeout(()=>tl.classList.add('done'),3400);io.disconnect()}},{root:prof,threshold:.3});io.observe(tl)}
}
function fitTimeline(){
  const tl=prof.querySelector('.tl'); if(!tl) return;
  if(innerWidth<=1100){tl.style.height='';return}
  let half=96; tl.querySelectorAll('.tl-card').forEach(c=>{half=Math.max(half,c.offsetHeight)});
  tl.style.height=(2*(half+36)+4)+'px';
}
function paintProfile(){
  if(!pro) return; const u=pro.u, w=pro.w;
  const pt='~ % whoami', n=Math.floor(clamp((u-.1)/.5)*pt.length);
  w.querySelector('.ptxt').textContent=pt.slice(0,n);
  w.querySelector('.caret').style.opacity=(u<.7||Math.floor(u*2.4)%2===0)?1:0;
  pro.chars.forEach((c,i)=>{const a=.4+i*.024,p=E.outExpo(P(u,a,a+.7));c.style.opacity=p;c.style.transform=`translateY(${((1-p)*.45).toFixed(3)}em)`});
}
window.profileAt=v=>{if(pro){pro.u=v;paintProfile()}};

// ---------------- the story's slides ----------------
function buildSlide(s,i){
  const sec=el('section','slide '+s.type); sec.id='slide-'+s.id; sec.dataset.tone=s.tone||'teal'; sec.dataset.i=i;
  sec.setAttribute('aria-roledescription','slide');
  const inner=el('div','inner'); sec.appendChild(inner);
  const n=CHAP[s.group];
  if(s.type==='beat'||s.type==='intro'){
    const g=el('div','grid'), t=el('div','txt');
    t.appendChild(el('div','kick',n?`<b>${n}</b>${tx(s.kick)}`:tx(s.kick)));
    t.appendChild(el('h2','',tx(s.title)));
    if(s.sub) t.appendChild(el('p','sub',tx(s.sub)));
    if(s.wins){const d=el('div','wins');s.wins.forEach(([big,label,at],k)=>{const w=el('div','win',`<i>0${k+1}</i><b>${tx(big)}</b><span>${tx(label)}</span>`);w.dataset.at=at;d.appendChild(w)});t.appendChild(d)}
    if(s.stat){const st=el('div','stat '+(s.stat.tone||''));st.dataset.at=s.stat.at;
      st.innerHTML=s.stat.count?`<span class="big" data-count="${s.stat.count}" data-count-at="${s.stat.run.join(',')}">${s.stat.count.toLocaleString(LOCALE())}+</span><span class="lab">${tx(s.stat.label)}</span>`
                               :`<span class="big">${s.stat.text}</span><span class="lab">${tx(s.stat.label)}</span>`;
      t.appendChild(st)}
    if(s.nums){const d=el('div','nums');s.nums.forEach(([v,l,at])=>{const c=el('div','',`<b>${tx(v)}</b><span>${tx(l)}</span>`);c.dataset.at=at;d.appendChild(c)});t.appendChild(d)}
    if(s.note) t.appendChild(el('p','note',tx(s.note)));
    if(s.checks){const ul=el('ul','checks');s.checks.forEach(([l,at])=>{const li=el('li','',`<i>✓</i>${tx(l)}`);li.dataset.at=at;ul.appendChild(li)});t.appendChild(ul)}
    if(s.chips) t.appendChild(chips(s.chips));
    if(s.type==='intro'){const c=el('div','cta');c.innerHTML=`<button class="play big" type="button" data-tour><span class="ico">▶</span><span class="lbl">${tx(UI.play)}</span></button><span class="hint">${tx(UI.hint)} <b class="arrow">→</b></span>`;t.appendChild(c)}
    const stage=el('div','stage'); stage.dataset.scene=s.scene; stage.setAttribute('role','img'); stage.setAttribute('aria-label',tx(s.aria));
    g.appendChild(t); g.appendChild(stage); inner.appendChild(g);
  }
  else if(s.type==='chapter'){
    inner.innerHTML=`<div class="chap"><div class="num${s.num.length>3?' yr':''}"><span class="ol">${s.num}</span></div>
      <div class="ctext"><div class="kick">${tx(s.kick)}</div><h2>${tx(s.title)}${s.badge?` <span class="badge">${tx(s.badge)}</span>`:''}</h2>${s.meta?`<div class="meta">${tx(s.meta)}</div>`:''}</div></div>`;
  }
  else if(s.type==='end'){
    inner.innerHTML=`<div class="endc"><div class="kick">${tx(s.kick)}</div><h2>${tx(s.title)}</h2><div class="rule"></div>
      <div class="ename">${s.name}</div><div class="role">${tx(s.role)}</div>
      <div class="contact">${contactLinks()}</div>
      <div class="eactions"><button type="button" class="btn primary" data-profile><span>← ${tx(UI.back)}</span></button><button type="button" class="btn ghost" data-again><span>↻ ${tx(UI.again)}</span></button></div></div>`;
  }
  if(n&&s.type!=='chapter') sec.appendChild(el('div','wm',n));
  sec.querySelectorAll('.txt > *, .ctext > *, .endc > *').forEach((c,k)=>c.style.setProperty('--k',k));
  return sec;
}

// ---------------- scenes ----------------
function mountScenes(){
  mounted=[];
  secs.forEach((sec,i)=>{
    const stage=sec.querySelector('.stage[data-scene]'); if(!stage) return;
    const def=SCENES[stage.dataset.scene]; if(!def) return;
    stage.innerHTML='';
    const root=svg('svg',{viewBox:'0 0 820 720',preserveAspectRatio:'xMidYMid meet'},stage);
    const defs=svg('defs',{},root);
    const m={i,id:stage.dataset.scene,def,sec,el:stage,u:0,
      ats:[...sec.querySelectorAll('[data-at]')],counts:[...sec.querySelectorAll('[data-count]')]};
    m.st=def.build(root,{defs,id:stage.dataset.scene+'_'+i});
    const b=el('button','replay',tx(UI.replay)); b.type='button'; b.onclick=e=>{e.stopPropagation();m.u=0;paint(m)}; stage.appendChild(b);
    const x=el('button','expand','⤢'); x.type='button'; x.title=tx(UI.enlarge); x.setAttribute('aria-label',tx(UI.enlarge)); x.onclick=e=>{e.stopPropagation();openZoom(m)}; stage.appendChild(x);
    if(REDUCE) m.u=def.dur;
    mounted.push(m); paint(m);
  });
}
function paint(m){
  m.def.render(m.st,m.u);
  m.ats.forEach(a=>a.classList.toggle('at-on',m.u>=parseFloat(a.dataset.at)));
  m.counts.forEach(c=>{const [a,b]=c.dataset.countAt.split(',').map(Number),N=+c.dataset.count,n=Math.round(N*E.outCubic(P(m.u,a,b)));c.textContent=n.toLocaleString(LOCALE())+(n>=N?'+':'')});
  m.el.classList.toggle('done',m.u>=m.def.dur);
}
// ---------------- a scene, full screen ----------------
// the drawing moves into an overlay and keeps playing there; closing puts it back
const zoom=el('div','zoom'); zoom.id='zoom';
zoom.innerHTML=`<div class="zbox"></div><div class="zbar"><button type="button" class="zreplay"></button><button type="button" class="zclose">✕</button></div>`;
document.body.appendChild(zoom);
let zoomed=null;
function openZoom(m){
  closeZoom(); const g=m.el.querySelector('svg'); zoom.querySelector('.zbox').appendChild(g); zoomed={m,g};
  zoom.querySelector('.zreplay').textContent=tx(UI.replay); zoom.querySelector('.zclose').setAttribute('aria-label',tx(UI.close));
  document.body.classList.add('zoomed'); stopTour();
}
function closeZoom(){ if(!zoomed) return; zoomed.m.el.insertBefore(zoomed.g,zoomed.m.el.firstChild); zoomed=null; document.body.classList.remove('zoomed') }
zoom.addEventListener('click',e=>{ if(e.target===zoom||e.target.closest('.zclose')) closeZoom(); else if(e.target.closest('.zreplay')&&zoomed){zoomed.m.u=0;paint(zoomed.m)} });
window.renderScene=(id,u)=>{const m=mounted.find(x=>x.id===id);if(!m)return false;m.u=u;paint(m);return true};

// ---------------- the navigator: the story on a real time axis ----------------
function buildTimeline(){
  track.innerHTML='';
  for(let y=Math.ceil(AX[0]);y<=Math.floor(NOW);y++){const x=pct(y,AX)+'%';const g=el('i','ygrid');g.style.left=x;track.appendChild(g);const l=el('span','yr',String(y));l.style.left=x;track.appendChild(l)}
  const now=el('i','now');now.style.left=pct(NOW,AX)+'%';now.innerHTML=`<span>${tx(UI.today)}</span>`;track.appendChild(now);
  LANES.forEach(L=>{const a=pct(L.from,AX),b=pct(laneEnd(L),AX);
    const seg=el('i','seg lane'+L.lane);seg.dataset.tone=L.tone;seg.style.left=a+'%';seg.style.width=(b-a)+'%';track.appendChild(seg);
    const fill=el('i','segfill lane'+L.lane);fill.dataset.tone=L.tone;fill.dataset.lane=L.id;fill.style.left=a+'%';track.appendChild(fill);
    const lab=el('button','lab lane'+L.lane,`<span class="long">${tx(L.label)}</span><span class="short">${tx(L.short)}</span>`);lab.type='button';lab.dataset.group=L.id;lab.dataset.tone=L.tone;lab.style.left=a+'%';
    lab.onclick=()=>{stopTour();go(SLIDES.findIndex(s=>s.group===L.id))};track.appendChild(lab)});
  track.appendChild(el('i','head'));
  const tip=el('div','tip');
  SLIDES.forEach((s,i)=>{
    const d=el('button','dot lane'+s.lane+(s.type==='chapter'?' chap':'')+(s.group==='start'||s.group==='end'?' cap':''));d.type='button';
    d.style.left=s.x+'%'; d.dataset.tone=(LANES.find(l=>l.id===s.group)||{}).tone||'ink';
    if(s.group==='start') d.innerHTML='<span>▶</span>'; if(s.group==='end') d.innerHTML='<span>✉</span>';
    const label=navLabel(s); d.setAttribute('aria-label',label);
    d.onclick=()=>{stopTour();go(i)};
    d.onmouseenter=d.onfocus=()=>{tip.textContent=label;tip.style.left=d.style.left;tip.dataset.lane=s.lane;tip.classList.add('show')};
    d.onmouseleave=d.onblur=()=>tip.classList.remove('show');
    track.appendChild(d)});
  track.appendChild(tip);
}
function updateTimeline(){
  const s=SLIDES[idx];
  track.querySelectorAll('.dot').forEach((d,i)=>{d.classList.toggle('on',i===idx);d.classList.toggle('done',i<idx)});
  track.querySelectorAll('.lab').forEach(l=>l.classList.toggle('on',l.dataset.group===s.group));
  LANES.forEach(L=>{const f=track.querySelector(`.segfill[data-lane="${L.id}"]`), a=pct(L.from,AX), b=pct(laneEnd(L),AX);
    const ids=SLIDES.map((x,i)=>x.group===L.id?i:-1).filter(i=>i>=0);
    f.style.width=(idx>ids[ids.length-1]?b-a:idx>=ids[0]?Math.max(0,s.x-a):0)+'%'});
  const head=track.querySelector('.head'); head.style.left=s.x+'%';
  $('prev').disabled=idx===0; $('next').disabled=idx===SLIDES.length-1;
  document.body.dataset.tone=s.tone||'teal';
}

// ---------------- moving through the story ----------------
function go(n,{instant=false}={}){
  closeZoom(); n=clamp(Math.round(n),0,SLIDES.length-1); idx=n;
  if(instant){rail.style.transition='none';requestAnimationFrame(()=>requestAnimationFrame(()=>rail.style.transition=''))}
  rail.style.transform=`translateX(${-n*100}vw)`;
  secs.forEach((s,i)=>{if(i!==n)s.classList.remove('on');s.setAttribute('aria-hidden',i!==n);s.inert=i!==n});
  if(mode==='story'){const cur=secs[n]; void cur.offsetWidth; cur.classList.add('on')}
  const inner=secs[n].querySelector('.inner'); if(inner) inner.scrollTop=0;
  const m=mounted.find(x=>x.i===n); if(m&&!REDUCE){m.u=0;paint(m)}
  updateTimeline();
  if(mode==='story') try{history.replaceState(null,'','#story/'+SLIDES[n].id)}catch(e){}
  if(n>0) document.body.classList.add('moved');
}
window.go=go;
const next=()=>go(idx+1), prev=()=>go(idx-1);
$('next').onclick=()=>{stopTour();next()}; $('prev').onclick=()=>{stopTour();prev()};

// ---------------- profile ⇄ story ----------------
function setMode(m){
  if(m===mode) return; mode=m; document.body.dataset.mode=m;
  prof.inert=m!=='profile'; storyEl.inert=m!=='story';
  prof.setAttribute('aria-hidden',m!=='profile'); storyEl.setAttribute('aria-hidden',m!=='story');
  if(m==='profile'){stopTour();secs.forEach(s=>s.classList.remove('on'));document.body.dataset.tone='teal';document.title=PAGE_TITLE}
  else document.title=`${tx(UI.story)} · Hussein Thamer Sadeq`;
}
const PAGE_TITLE=document.title;
function openStory(i=0){
  i=Math.max(0,i);
  if(mode!=='story'){try{history.pushState(null,'','#story/'+SLIDES[i].id);pushedStory=true}catch(e){} setMode('story'); go(i,{instant:true})}
  else go(i);
}
function openProfile(){
  if(mode==='profile') return;
  if(pushedStory){pushedStory=false;history.back();return}         // popstate brings the profile back
  try{history.pushState(null,'',location.pathname+location.search)}catch(e){}
  setMode('profile');
}
window.openStory=openStory; window.openProfile=openProfile;
function route(){
  const h=decodeURIComponent(location.hash.slice(1));
  const id=h==='story'?'story':h.startsWith('story/')?h.slice(6):SLIDES.some(s=>s.id===h)?h:null;
  if(id!=null){setMode('story');go(Math.max(0,SLIDES.findIndex(s=>s.id===id)),{instant:true})}
  else {pushedStory=false;setMode('profile')}
}
addEventListener('popstate',route);
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-go],[data-play],[data-tour],#tour,[data-profile],[data-again],#toStory,#toProfile,#mark');
  if(!t) return;
  if(t.id==='mark'){e.preventDefault();if(mode==='profile')prof.scrollTo({top:0,behavior:'smooth'});else openProfile();return}
  if(t.id==='toProfile'||t.hasAttribute('data-profile')){openProfile();return}
  if(t.id==='toStory'){openStory(0);return}
  if(t.hasAttribute('data-go')){openStory(SLIDES.findIndex(s=>s.id===t.dataset.go));return}
  if(t.hasAttribute('data-again')){stopTour();go(0);return}
  if(t.hasAttribute('data-play')){startTour();return}
  tour?stopTour():startTour();
});

// wheel and trackpad in the story: one step per gesture, but let a tall slide scroll first
let wheelAcc=0, locked=false, lockAt=0, lastWheel=0;
addEventListener('wheel',e=>{
  if(mode!=='story'||e.ctrlKey||zoomed) return;
  const inner=secs[idx]&&secs[idx].querySelector('.inner');
  const d=Math.abs(e.deltaY)>=Math.abs(e.deltaX)?e.deltaY:e.deltaX;
  if(inner&&Math.abs(e.deltaY)>=Math.abs(e.deltaX)){
    const canDown=inner.scrollTop+inner.clientHeight<inner.scrollHeight-2, canUp=inner.scrollTop>2;
    if((d>0&&canDown)||(d<0&&canUp)) return;
  }
  e.preventDefault();
  const now=performance.now();
  if(locked){if(now-lastWheel>200&&now-lockAt>700)locked=false;lastWheel=now;if(locked)return}
  lastWheel=now; wheelAcc+=d;
  if(Math.abs(wheelAcc)>28){stopTour();go(idx+Math.sign(wheelAcc));wheelAcc=0;locked=true;lockAt=now}
},{passive:false});
addEventListener('keydown',e=>{
  if(zoomed){ if(e.key==='Escape'){e.preventDefault();closeZoom()} return }
  if(mode!=='story'||(e.target.closest&&e.target.closest('input,textarea'))) return;
  const k=e.key;
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(k)){e.preventDefault();stopTour();next()}
  else if(['ArrowLeft','ArrowUp','PageUp'].includes(k)){e.preventDefault();stopTour();prev()}
  else if(k==='Home'){stopTour();go(0)} else if(k==='End'){stopTour();go(SLIDES.length-1)}
  else if(k==='Escape'){openProfile()}
});
let tX=0,tY=0;
addEventListener('touchstart',e=>{const t=e.touches[0];tX=t.clientX;tY=t.clientY},{passive:true});
addEventListener('touchend',e=>{if(mode!=='story'||zoomed)return;const t=e.changedTouches[0],dx=t.clientX-tX,dy=t.clientY-tY;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.2){stopTour();go(idx+(dx<0?1:-1))}},{passive:true});

// ---------------- Play the story ----------------
function setTourBtns(on){document.querySelectorAll('[data-tour],#tour').forEach(b=>{b.classList.toggle('on',on);b.querySelector('.ico').textContent=on?'■':'▶';b.querySelector('.lbl').textContent=tx(on?UI.stop:UI.play)})}
function startTour(){tour={t:0};if(mode!=='story')openStory(0);else go(0);setTourBtns(true)}
function stopTour(){if(!tour)return;tour=null;setTourBtns(false)}
function tourTick(dt){
  if(!tour||mode!=='story') return; tour.t+=dt;
  const s=SLIDES[idx], m=mounted.find(x=>x.i===idx);
  const need=m?m.def.dur+1.4:s.type==='chapter'?3.2:5.5;
  if((m?m.u:tour.t)>=need){ if(idx>=SLIDES.length-1){stopTour();return} tour.t=0; next() }
}

// ---------------- language and building ----------------
function applyStatic(){
  document.documentElement.lang=LANG;
  $('lnMail').textContent=tx(UI.email);
  $('prev').setAttribute('aria-label',tx(UI.prev)); $('next').setAttribute('aria-label',tx(UI.next));
  track.setAttribute('aria-label',tx(UI.timeline));
  document.querySelectorAll('.lang button').forEach(b=>{b.classList.toggle('on',b.dataset.lang===LANG);b.setAttribute('aria-pressed',b.dataset.lang===LANG)});
  $('tour').querySelector('.lbl').textContent=tx(tour?UI.stop:UI.play);
  $('toStory').querySelector('.lbl').textContent=tx(UI.story);
  $('toProfile').querySelector('.lbl').textContent=tx(UI.profile);
  prof.setAttribute('aria-label',tx(UI.profile)); storyEl.setAttribute('aria-label',tx(UI.story));
}
function build(){
  placeSlides(); buildProfile();
  rail.innerHTML='';
  secs=SLIDES.map((s,i)=>{const sec=buildSlide(s,i);rail.appendChild(sec);return sec});
  rail.style.width=(SLIDES.length*100)+'vw';
  mountScenes(); buildTimeline(); applyStatic();
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{fitSlides();fitTimeline()}); fitSlides();
  if(REDUCE||STILL){pro.u=9;paintProfile()}
  requestAnimationFrame(()=>prof.classList.add('on'));
}
// a slide whose text is taller than the screen gets tighter type, then loses its footnote
function fitSlides(){
  secs.forEach(sec=>{const inner=sec.querySelector('.inner');if(!inner)return;
    sec.classList.remove('tight','tighter');
    if(innerWidth<=860) return;
    if(inner.scrollHeight>inner.clientHeight+2){sec.classList.add('tight');
      if(inner.scrollHeight>inner.clientHeight+2) sec.classList.add('tighter')}
  });
}
addEventListener('resize',()=>{clearTimeout(fitSlides._t);fitSlides._t=setTimeout(()=>{fitSlides();fitTimeline()},120)});
function setLang(l){
  if(l===LANG) return; LANG=l;
  try{localStorage.setItem('hts-lang',l)}catch(e){}
  const keep=idx, was=mode; mode=''; stopTour(); closeZoom(); build(); setMode(was||'profile'); go(keep,{instant:true});
}
window.setLang=setLang;
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));

// ---------------- start ----------------
build(); route();
let last=performance.now();
function frame(ts){
  const dt=Math.min(.05,(ts-last)/1000); last=ts;
  if(!REDUCE){
    if(mode==='profile'&&pro&&pro.u<3){pro.u+=dt;paintProfile()}
    if(mode==='story'){const m=mounted.find(x=>x.i===idx); if(m){m.u+=dt;paint(m)}}
  }
  tourTick(dt);
  requestAnimationFrame(frame);
}
if(!STILL) requestAnimationFrame(frame);
