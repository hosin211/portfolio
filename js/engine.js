'use strict';
/* Shared engine for the story scenes: palette, language, math and SVG helpers, the character rig, furniture.
   Every scene draws into its own 820x720 SVG and is driven by one number, u = seconds since it started. */

const NS='http://www.w3.org/2000/svg';
const $=id=>document.getElementById(id);
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const lerp=(a,b,p)=>a+(b-a)*p;
const P=(t,a,b)=>clamp((t-a)/(b-a));
const E={
  outExpo:x=>x>=1?1:1-Math.pow(2,-10*x),
  inExpo:x=>x<=0?0:Math.pow(2,10*x-10),
  inOutCubic:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2,
  outCubic:x=>1-Math.pow(1-x,3),
  inCubic:x=>x*x*x,
  outBack:x=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)},
  outElastic:x=>x===0?0:x===1?1:Math.pow(2,-10*x)*Math.sin((x*10-.75)*(2*Math.PI)/3)+1
};
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

// ---------------- palette: calm, light, one accent per chapter ----------------
const K={
  ink:'#1C2029', ink2:'#3C4350', mute:'#6C7382', faint:'#A4AAB5',
  card:'#FFFFFF', card2:'#F7F5F0', line:'#DDD6CA', line2:'#C9C0B1',
  wall:'#EFEBE3', wall2:'#E4DED2', wallLn:'rgba(70,55,30,.05)',
  floor:'#DCD4C6', floor2:'#CEC5B5', floorLn:'rgba(70,55,30,.08)', skirt:'#CDC3B1',
  dev:'#2C3446', dev2:'#3D4658', dev3:'#5B6479', devIn:'#1B212D', devLed:'#4D576B',
  metal:'#A3AAB7', metal2:'#7D8595',
  wood:'#D8BC93', wood2:'#B79771', wood3:'#9A7D5C',
  scr:'#FBFAF7', scrHd:'#EDEFF3', scrLn:'#E3E6EB', scrBar:'#CDD2DA', scrTx:'#8A919E',
  teal:'#0E857A', teal2:'#18A393', tealL:'#CFECE7', tealLL:'#E8F6F3',
  ind:'#4055B4', ind2:'#6A79C9', indL:'#DDE2F5', indLL:'#EFF1FB',
  amb:'#C47915', amb2:'#E4A13E', ambL:'#F6E2BF', ambLL:'#FCF4E6',
  cor:'#C9483D', cor2:'#E2786C', corL:'#F7DBD6', corLL:'#FDF0EE',
  rose:'#C45B84', roseL:'#F5DCE6',
  blue:'#2F7EB2', blueL:'#D6E7F3',
  green:'#5B8F68',
  nightA:'#1D2A4C', nightB:'#3A4D7E', skyline:'#16203A', moon:'#F5F1E4',
  warm:'#F4C979', warm2:'#E7A857', lampOn:'#FFF4D2',
  macR:'#FF5F57', macY:'#FEBC2E', macG:'#28C840'
};

// ---------------- language ----------------
// Scene labels are written in English; LX() swaps them for German when the page is in German.
let LANG='en';
const DE={
  'SERVER ROOM':'SERVERRAUM',
  'ADMISSIONS':'ZULASSUNG','RESULTS':'NOTEN','FEES':'GEBÜHREN','DOCUMENTS':'DOKUMENTE','PAYROLL':'GEHÄLTER',
  'PLATFORM':'PLATTFORM','CARD PAYMENTS ✓':'KARTENZAHLUNG ✓',
  'WELCOME TO OUR WEBSITE':'WILLKOMMEN AUF UNSERER WEBSEITE','Apply online':'Online bewerben',
  'REGISTRATION':'EINSCHREIBUNG','ADMISSIONS PORTAL':'ZULASSUNGSPORTAL','OPEN':'OFFEN',
  'SOFTWARE SYSTEMS & NETWORKS UNIT':'ABTEILUNG SOFTWARESYSTEME & NETZWERKE','MOBILE':'MOBIL','UNIT LEAD':'LEITUNG',
  'BAGHDAD':'BAGDAD','BELGIUM':'BELGIEN','2023 → TODAY':'2023 → HEUTE','YEAR 4':'JAHR 4',
  'STOCK':'BESTAND','RECIPES':'REZEPTE','ORDERS':'BESTELLUNGEN','1 OF 500+':'1 VON 500+','OPEN NOW':'GEÖFFNET',
  'ORDERED EVENT QUEUE · SQS FIFO':'GEORDNETE EVENT-QUEUE · SQS FIFO','TOMATO':'TOMATEN','FLOUR':'MEHL','MILK':'MILCH','DELIVERIES':'LIEFERUNGEN','✓ saved':'✓ gespeichert',
  'INVENTORY':'BESTAND','ITEM':'ARTIKEL','ON HAND':'MENGE','UNIT':'EINHEIT','BEFORE':'VORHER','AFTER':'NACHHER','−25% RESPONSE TIMES':'−25 % ANTWORTZEIT',
  'FOOD COST':'WARENEINSATZ','WASTE':'ABFALL','STOCK VALUE':'LAGERWERT','PG READ REPLICAS':'PG-READ-REPLICAS','~500 ms UNDER LOAD':'~500 ms UNTER LAST',
  'OUTSIDE':'AUSSEN','WEB UI':'WEB-UI','CUSTOMER SYSTEM':'KUNDENSYSTEM','PRODUCTION PLANNING':'PRODUKTIONSPLANUNG','ORDER FULFILMENT':'AUFTRAGSABWICKLUNG','PUBLIC REST API':'ÖFFENTLICHE REST-API',
  'TEST DB SETUP':'TEST-DB-SETUP','✓ PASSED':'✓ BESTANDEN','RUNNING…':'LÄUFT…',
  'ROLE-BASED CHECKS':'ROLLENBASIERTE PRÜFUNG','PER-RESOURCE POLICIES':'RICHTLINIEN PRO RESSOURCE','PLATFORM · EVERY TENANT':'PLATTFORM · ALLE MANDANTEN',
  'SETTINGS':'EINSTELLUNG','REPORTS':'BERICHTE','ALL OR NOTHING':'ALLES ODER NICHTS','EVERY TENANT · EVERY RESOURCE':'JEDER MANDANT · JEDE RESSOURCE','RESOURCE':'RESSOURCE',
  'LOCKED':'GESPERRT','WORK ORDER':'ARBEITSAUFTRAG','CORRECTIVE':'INSTANDSETZUNG','CLOSED ✓':'ERLEDIGT ✓','PERMIT TO WORK':'ARBEITSFREIGABE',
  'ISOLATED':'FREIGESCHALTET','TESTED DEAD':'SPANNUNGSFREI','AREA SAFE':'BEREICH GESICHERT','APPROVED':'FREIGEGEBEN',
  'STUDENT RECORDS':'STUDIERENDE','FINANCE':'FINANZEN','RESEARCH':'FORSCHUNG','200+ DAILY STAFF':'200+ NUTZER TÄGLICH','EUPHRATES':'EUPHRAT',
  // chapter 01
  'STUDENTS':'STUDIERENDE','ONE ACADEMIC YEAR':'EIN STUDIENJAHR','0 PAPER FORMS':'0 PAPIERFORMULARE','1 dot = 10 students':'1 Punkt = 10 Studierende','3 ENGINEERS':'3 ENTWICKLER',
  // the story map and chapter 02
  'TODAY':'HEUTE','05/2023 → TODAY':'05/2023 → HEUTE','OWN SYSTEMS':'EIGENE SYSTEME','Own systems: Al-Nahrain University, Keppt':'Eigene Systeme: Al-Nahrain University, Keppt',
  'BELGIUM · 2023 → TODAY':'BELGIEN · 2023 → HEUTE','AUTOMATED TESTS · EVERY CHANGE':'AUTOMATISCHE TESTS · JEDE ÄNDERUNG','TEST DATABASE START-UP · 4 PARALLEL RUNS':'START DER TESTDATENBANK · 4 PARALLELE LÄUFE',
  'RESPONSE TIME · HEAVIEST-DATA CLIENT':'ANTWORTZEIT · DATENSTÄRKSTER KUNDE','−25%':'−25 %','ANALYTICS':'ANALYTICS',
  // own systems
  '5 COLLEGES · 200+ DAILY STAFF':'5 FAKULTÄTEN · 200+ NUTZER TÄGLICH','BLOCKED':'BLOCKIERT','SECURITY PASS':'SICHERHEITSPRÜFUNG',
  'LOCKOUT':'SPERREN','PERMIT':'FREIGABE','DONE':'ERLEDIGT','TWO PLANTS · 730 MW + 650 MW':'ZWEI KRAFTWERKE · 730 MW + 650 MW',
  // speed, told as two wins
  '01 · SLOWEST INVENTORY PAGES':'01 · LANGSAMSTE BESTANDSSEITEN','02 · HEAVIEST-DATA CLIENT':'02 · DATENSTÄRKSTER KUNDE','RESPONSE TIME':'ANTWORTZEIT',
  // the university
  'AL-NAHRAIN UNIVERSITY · BAGHDAD':'AL-NAHRAIN UNIVERSITY · BAGDAD','WHERE IT STARTED':'HIER FING ES AN','1 COLLEGE':'1 FAKULTÄT','EVERY COLLEGE':'JEDE FAKULTÄT',
  'STAFF':'PERSONAL','DASHBOARDS':'DASHBOARDS','ONE SYSTEM':'EIN SYSTEM','EVERY COLLEGE · ONE SYSTEM':'JEDE FAKULTÄT · EIN SYSTEM',
  // the power plants
  'KEPPT · TWO COMBINED-CYCLE POWER PLANTS':'KEPPT · ZWEI GUD-KRAFTWERKE','200+ ENGINEERS':'200+ INGENIEURE','EACH PLANT RUNS ITS OWN COPY OF KMS':'JEDES KRAFTWERK HAT SEINE EIGENE KMS-INSTANZ',
  'EVERY PART OF THE PLANT':'JEDER BEREICH DES KRAFTWERKS','MAINTENANCE':'INSTANDHALTUNG','SAFETY PERMITS':'ARBEITSFREIGABEN','SHIFTS':'SCHICHTEN','EQUIPMENT · KKS':'ANLAGEN · KKS',
  'STORES':'LAGER','PURCHASING':'EINKAUF','HR':'PERSONAL','QUALITY · ISO':'QUALITÄT · ISO','IT ASSETS':'IT-GERÄTE','AI · MCP':'KI · MCP'
};
function LX(s){
  if(LANG!=='de'||s==null) return s;
  if(DE[s]!=null) return DE[s];
  let m;
  if((m=/^COLLEGE (\d+)$/.exec(s))) return 'FAKULTÄT '+m[1];
  if((m=/^TENANT (\d+)$/.exec(s))) return 'MANDANT '+m[1];
  if((m=/^run (\d+)$/.exec(s))) return 'Lauf '+m[1];
  return s;
}
const NUMF=(v,dec=0)=>{const s=v.toFixed(dec);return LANG==='de'?s.replace('.',','):s};

// ---------------- svg helpers ----------------
function svg(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
const L=(el,a,b)=>{el.setAttribute('x1',a.x.toFixed(1));el.setAttribute('y1',a.y.toFixed(1));el.setAttribute('x2',b.x.toFixed(1));el.setAttribute('y2',b.y.toFixed(1))};
const C=(el,a)=>{el.setAttribute('cx',a.x.toFixed(1));el.setAttribute('cy',a.y.toFixed(1))};
const mixP=(a,b,k)=>{const o={};for(const key in a)o[key]=lerp(a[key],b[key]??a[key],k);return o};
const FONT_UI="Inter,system-ui,-apple-system,'Segoe UI',sans-serif";
const FONT_MONO="'JetBrains Mono',ui-monospace,Menlo,monospace";
// scene labels must stay readable on a small laptop, where the stage shrinks: every small font is drawn TS times larger
const TS=1.14, fsz=v=>v<=14?+(v*TS).toFixed(2):v;
function txt(parent,x,y,str,o={}){const a=Object.assign({x,y,fill:K.mute,'font-size':13,'font-family':FONT_MONO},o);a['font-size']=fsz(+a['font-size']);const t=svg('text',a,parent);t.textContent=LX(str);return t}
const op=(el,v)=>el.setAttribute('opacity',clamp(v).toFixed(3));
const tr=(el,x,y,s=1)=>el.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)})${s!==1?` scale(${s.toFixed(4)})`:''}`);
// scale an element about a point (pop-in)
const popAt=(el,x,y,k)=>{el.setAttribute('transform',`translate(${x} ${y}) scale(${Math.max(.001,k).toFixed(4)}) translate(${-x} ${-y})`);el.setAttribute('opacity',clamp(k).toFixed(3))};
function drawPath(el){const n=el.getTotalLength();el.setAttribute('stroke-dasharray',n);el.setAttribute('stroke-dashoffset',n);el._len=n;return el}
// round caps draw a dot even for a zero-length dash, so hide the path until it starts
const drawTo=(el,k)=>{el.setAttribute('stroke-dashoffset',(el._len*(1-clamp(k))).toFixed(1));el.style.visibility=k<=.001?'hidden':'visible'};
function lin(defs,id,stops,vertical=true){const g=svg('linearGradient',{id,x1:0,y1:0,x2:vertical?0:1,y2:vertical?1:0},defs);stops.forEach(([o,c,a])=>svg('stop',{offset:o,'stop-color':c,'stop-opacity':a??1},g));return `url(#${id})`}
function rad(defs,id,color,a){const g=svg('radialGradient',{id},defs);svg('stop',{offset:'0%','stop-color':color,'stop-opacity':a},g);svg('stop',{offset:'100%','stop-color':color,'stop-opacity':0},g);return `url(#${id})`}
// a point at fraction k of a polyline's length
function polyAt(pts,k){
  const seg=[];let total=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y);seg.push(d);total+=d}
  let d=clamp(k)*total;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const t=seg[i]?clamp(d/seg[i]):0;return {x:lerp(pts[i].x,pts[i+1].x,t),y:lerp(pts[i].y,pts[i+1].y,t)}}d-=seg[i]}
  return pts[pts.length-1];
}

// ---------------- the character rig ----------------
// Every body part is a round-capped stroke; joints are solved each frame (forward kinematics).
// Angles are radians from straight down; positive swings toward the facing direction.
const F={torso:104,neck:10,headR:29,thigh:82,shin:80,foot:30,upper:64,fore:60};
const RIG_FLOOR=650;
function hairPath(){const r=F.headR*1.07,p=d=>{const a=d*Math.PI/180;return [(r*Math.cos(a)).toFixed(1),(r*Math.sin(a)).toFixed(1)]};const s=p(-58),e=p(-205);
  return `M ${s[0]} ${s[1]} A ${r} ${r} 0 0 0 ${e[0]} ${e[1]} Q ${(-r*.25).toFixed(1)} ${(r*.05).toFixed(1)} ${(-r*.1).toFixed(1)} ${(-r*.38).toFixed(1)} Q ${(r*.2).toFixed(1)} ${(-r*.62).toFixed(1)} ${s[0]} ${s[1]} Z`}
function legPts(hip,h,k){
  const knee={x:hip.x+F.thigh*Math.sin(h),y:hip.y+F.thigh*Math.cos(h)};
  const a=h-k, ank={x:knee.x+F.shin*Math.sin(a),y:knee.y+F.shin*Math.cos(a)};
  const fa=clamp(-.55*a,-.4,.6);
  return {knee,ank,toe:{x:ank.x+F.foot*Math.cos(fa),y:ank.y+F.foot*Math.sin(fa)},heel:{x:ank.x-6*Math.cos(fa),y:ank.y-6*Math.sin(fa)}};
}
function solveRig(p){
  const f0=legPts({x:p.x,y:0},p.hF,p.kF), b0=legPts({x:p.x,y:0},p.hB,p.kB);
  const low=Math.max(f0.toe.y,f0.heel.y,b0.toe.y,b0.heel.y)+7;          // the lowest foot rests on the floor
  const hip={x:p.x,y:RIG_FLOOR-low-(p.lift||0)};
  const up={x:Math.sin(p.lean),y:-Math.cos(p.lean)};
  const top={x:hip.x+up.x*F.torso,y:hip.y+up.y*F.torso};
  const sh={x:hip.x+up.x*(F.torso-10),y:hip.y+up.y*(F.torso-10)};
  const ha=p.lean+p.head;
  const hc={x:top.x+Math.sin(ha)*(F.neck+F.headR),y:top.y-Math.cos(ha)*(F.neck+F.headR)};
  const arm=(s,e)=>{const el={x:sh.x+F.upper*Math.sin(s),y:sh.y+F.upper*Math.cos(s)};return {el,w:{x:el.x+F.fore*Math.sin(s+e),y:el.y+F.fore*Math.cos(s+e)}}};
  return {hip,up,top,sh,ha,hc,lf:legPts(hip,p.hF,p.kF),lb:legPts(hip,p.hB,p.kB),af:arm(p.sF,p.eF),ab:arm(p.sB,p.eB)};
}
const STAND={hF:.05,kF:.04,hB:-.05,kB:.03};
const SIT={hF:1.57,kF:1.57,hB:1.47,kB:1.5};
const CROUCH={hF:1.0,kF:1.7,hB:.55,kB:1.45};
const IDLE={sF:.08,eF:.32,sB:-.04,eB:.28};
const CARRY={sF:.3,eF:1.3,sB:.26,eB:1.35};          // held against the belly
const TYPE={sF:.62,eF:.95,sB:.56,eB:1.0};           // forearms level, at a desk
const RELAX={sF:.2,eF:.75,sB:.16,eB:.8};            // leaning back from the desk
const AMP=.45, LEG=F.thigh+F.shin, CYC=4*LEG*Math.sin(AMP);   // rig px advanced per full walk cycle
const walkL=(phi,amp=AMP)=>({hF:amp*Math.sin(phi),kF:.06+.8*Math.pow(Math.max(0,Math.cos(phi)),2),hB:amp*Math.sin(phi+Math.PI),kB:.06+.8*Math.pow(Math.max(0,Math.cos(phi+Math.PI)),2)});
const swingA=phi=>({sF:-.35*Math.sin(phi),eF:.35,sB:.35*Math.sin(phi),eB:.35});
const WALK_END=walkL(2*Math.PI*2.25);               // a walk of n+.25 cycles ends with the near foot forward
function breathe(u,arms){const b=Math.sin(u*2.2);const a=Object.assign({},arms);a.sF+=.012*b;a.sB-=.01*b;return {arms:a,lean:.006*b}}
// typing at a desk, with small busy hand movements
function typing(u,on=true){const a=Object.assign({},TYPE);if(on){a.eF+=.07*Math.sin(u*38);a.eB+=.07*Math.sin(u*41+1);a.sF+=.02*Math.sin(u*19)}return a}

// people: shirt, shirt in shadow, near sleeve
const PALETTE={
  hero:{shirt:'#1E9A8C',shirtBack:'#15736A',arm:'#198B7E'},
  violet:{shirt:'#5A6BC9',shirtBack:'#3F4EA3',arm:'#4E5FBE'},
  amber:{shirt:'#E39C3C',shirtBack:'#B67A25',arm:'#D38F33'},
  pink:{shirt:'#D46C88',shirtBack:'#AA4F68',arm:'#C8617D'},
  blue:{shirt:'#4A92C5',shirtBack:'#33719D',arm:'#4288BA'},
  white:{shirt:'#FFFFFF',shirtBack:'#D4D9E0',arm:'#F1F3F6'},
  slate:{shirt:'#6B7488',shirtBack:'#525A6C',arm:'#62697C'}
};
const SKIN=[['#C8966E','#A97B55','#B98660'],['#DDB08A','#BF916B','#CFA17C'],['#A87450','#8A5D3E','#99684A'],['#E8C3A0','#CCA482','#DBB592']];
class Figure{
  // scale: size relative to the rig; floor: the scene y the feet stand on
  constructor(parent,o={}){
    const sk=SKIN[o.skin||0];
    const c=Object.assign({shirt:PALETTE.hero.shirt,shirtBack:PALETTE.hero.shirtBack,arm:PALETTE.hero.arm,pants:'#2E3A57',pantsBack:'#232D45',
      skin:sk[0],skinBack:sk[1],neck:sk[2],hair:'#241D19',shoe:'#1C2230',outline:'#1B2230'},o.colors||{});
    this.scale=o.scale||1; this.floor=o.floor??RIG_FLOOR;
    this.ty=this.floor-RIG_FLOOR*this.scale;
    this.wrap=svg('g',{transform:`translate(0 ${this.ty.toFixed(2)}) scale(${this.scale})`},parent);
    const G=this.G=svg('g',{},this.wrap);
    const cap=(col,w)=>svg('line',{stroke:col,'stroke-width':w,'stroke-linecap':'round'},G);
    this.shadow=svg('ellipse',{rx:48,ry:7,fill:'rgba(60,45,25,.16)'},G);
    this.bArmU=cap(c.shirtBack,18); this.bArmF=cap(c.shirtBack,16); this.bHand=svg('circle',{r:9.5,fill:c.skinBack},G);
    this.bThigh=cap(c.pantsBack,25); this.bShin=cap(c.pantsBack,22); this.bFoot=cap('#151A24',14);
    if(o.edge) this.torsoO=cap(o.edge,58);                 // a white shirt needs an edge on a light background
    this.torso=cap(c.shirt,54);
    this.neck=cap(c.neck,16);
    this.head=svg('circle',{r:F.headR,fill:c.skin},G);
    this.hair=svg('path',{d:hairPath(),fill:c.hair},G);
    this.hat=null;
    if(o.hat==='chef'){this.hat=svg('g',{},G);svg('rect',{x:-26,y:-37,width:50,height:14,rx:4,fill:'#F1F3F6',stroke:'#C3C9D2','stroke-width':2.5},this.hat);svg('path',{d:'M -24 -36 C -40 -44, -30 -66, -14 -60 C -10 -76, 12 -76, 14 -60 C 32 -66, 40 -44, 22 -36 Z',fill:'#FFFFFF',stroke:'#C3C9D2','stroke-width':2.5},this.hat)}
    if(o.hat==='cap'){this.hat=svg('g',{},G);svg('path',{d:'M -30 -4 A 30 30 0 0 1 30 -4 Z',fill:c.capColor||'#2E3A57'},this.hat);svg('rect',{x:12,y:-9,width:34,height:7,rx:3.5,fill:c.capColor||'#2E3A57'},this.hat)}
    if(o.hat==='hard'){this.hat=svg('g',{},G);svg('path',{d:'M -30 -8 A 30 30 0 0 1 30 -8 Z',fill:'#F2B63F'},this.hat);svg('rect',{x:-32,y:-11,width:72,height:7,rx:3.5,fill:'#D59A28'},this.hat);svg('line',{x1:0,y1:-38,x2:0,y2:-10,stroke:'#D59A28','stroke-width':4},this.hat)}
    this.fThigh=cap(c.pants,25); this.fShin=cap(c.pants,22); this.fFoot=cap(c.shoe,14);
    this.slot=svg('g',{},G);                      // carried things sit between the body and the near arm
    this.fArmUo=cap(c.outline,22); this.fArmFo=cap(c.outline,20);
    this.fArmU=cap(c.arm,18); this.fArmF=cap(c.arm,16); this.fHand=svg('circle',{r:9.5,fill:c.skin},G);
    this.front=svg('g',{},G);                     // things held in front of the near hand
  }
  // p.x is in scene units; everything else is rig angles
  set(p){
    const q=Object.assign({lean:.02,head:0,sx:1},STAND,IDLE,p); q.x=(p.x??0)/this.scale;
    const s=solveRig(q); this.s=s; this.sx=q.sx; this.draw(s,q.sx);
    this.shadow.style.display=q.lift?'none':'';           // a lifted figure stands on something else
    return s;
  }
  draw(s,sx){
    const {hip,up,top,sh,ha,hc,lf,lb,af,ab}=s;
    this.G.setAttribute('transform',Math.abs(sx-1)<1e-4?'':`translate(${hip.x.toFixed(1)} 0) scale(${sx.toFixed(3)} 1) translate(${(-hip.x).toFixed(1)} 0)`);
    C(this.shadow,{x:hip.x+8,y:RIG_FLOOR+3});
    L(this.bArmU,sh,ab.el); L(this.bArmF,ab.el,ab.w); C(this.bHand,ab.w);
    L(this.bThigh,hip,lb.knee); L(this.bShin,lb.knee,lb.ank); L(this.bFoot,lb.heel,lb.toe);
    const ta={x:hip.x+up.x*22,y:hip.y+up.y*22}, tb={x:top.x-up.x*27,y:top.y-up.y*27};
    if(this.torsoO) L(this.torsoO,ta,tb);
    L(this.torso,ta,tb);
    const dir={x:Math.sin(ha),y:-Math.cos(ha)};
    L(this.neck,{x:top.x-up.x*6,y:top.y-up.y*6},{x:hc.x-dir.x*(F.headR-6),y:hc.y-dir.y*(F.headR-6)});
    C(this.head,hc);
    const ht=`translate(${hc.x.toFixed(1)} ${hc.y.toFixed(1)}) rotate(${(ha*57.2958).toFixed(2)})`;
    this.hair.setAttribute('transform',ht); if(this.hat) this.hat.setAttribute('transform',ht);
    L(this.fThigh,hip,lf.knee); L(this.fShin,lf.knee,lf.ank); L(this.fFoot,lf.heel,lf.toe);
    L(this.fArmUo,sh,af.el); L(this.fArmFo,af.el,af.w); L(this.fArmU,sh,af.el); L(this.fArmF,af.el,af.w); C(this.fHand,af.w);
  }
  W(pt){const hx=this.s.hip.x;return {x:(hx+(pt.x-hx)*(this.sx??1))*this.scale,y:this.ty+pt.y*this.scale}}   // rig point → scene point, mirrored when facing left
  hand(){return this.W(this.s.af.w)}
  headPos(){return this.W(this.s.hc)}
  show(v){this.wrap.style.display=v?'':'none'}
  fade(v){this.wrap.setAttribute('opacity',clamp(v).toFixed(3))}
}
// walking: d is the distance walked in scene units; returns the leg and arm angles for it
function walkAt(fig,d,{carry=null,amp=AMP}={}){
  const cyc=4*LEG*Math.sin(amp)*fig.scale, phi=2*Math.PI*d/cyc;
  return Object.assign({},walkL(phi,amp),carry||swingA(phi),{lean:carry?-.03+.015*Math.sin(2*phi):.03});
}
const cycleLen=(fig,amp=AMP)=>4*LEG*Math.sin(amp)*fig.scale;       // scene units per walk cycle

// ---------------- rooms and furniture ----------------
function room(root,defs,id,{floor=650,wall=[K.wall,K.wall2]}={}){
  svg('rect',{x:0,y:0,width:820,height:720,fill:lin(defs,id+'wall',[['0%',wall[0]],['100%',wall[1]]])},root);
  for(let y=110;y<floor-10;y+=62) svg('line',{x1:0,y1:y,x2:820,y2:y,stroke:K.wallLn,'stroke-width':1},root);
  svg('rect',{x:0,y:floor-10,width:820,height:10,fill:K.skirt},root);
  svg('rect',{x:0,y:floor,width:820,height:720-floor,fill:lin(defs,id+'floor',[['0%',K.floor],['100%',K.floor2]])},root);
  for(let i=-6;i<=20;i++){const x0=i*60;svg('line',{x1:410+(x0-410)*.62,y1:floor,x2:x0,y2:720,stroke:K.floorLn,'stroke-width':1},root)}
}
// a group in rig space, so furniture can be drawn at the same scale as a Figure
function rigGroup(parent,scale,floor=RIG_FLOOR){return svg('g',{transform:`translate(0 ${(floor-RIG_FLOOR*scale).toFixed(2)}) scale(${scale})`},parent)}
function deskAt(g,x,y,w,{legs=true,floor=RIG_FLOOR}={}){
  svg('rect',{x,y,width:w,height:12,rx:3,fill:K.wood,stroke:K.wood2,'stroke-width':1.6},g);
  if(legs){svg('rect',{x:x+10,y:y+12,width:8,height:floor-y-12,fill:K.wood3},g);svg('rect',{x:x+w-18,y:y+12,width:8,height:floor-y-12,fill:K.wood3},g)}
}
// office chair, facing right (face:-1 for left), seat top at y
function chairAt(g,x,y,{floor=RIG_FLOOR,face=1}={}){
  const c=svg('g',face<0?{transform:`translate(${2*x} 0) scale(-1 1)`}:{},g);
  svg('rect',{x:x-44,y:y-100,width:14,height:106,rx:6,fill:K.dev2},c);
  svg('rect',{x:x-44,y,width:92,height:13,rx:6,fill:K.dev2},c);
  svg('rect',{x:x-2,y:y+13,width:8,height:floor-y-26,fill:K.dev},c);
  svg('rect',{x:x-34,y:floor-14,width:76,height:6,rx:3,fill:K.dev},c);
  svg('circle',{cx:x-30,cy:floor-5,r:5,fill:K.devIn},c); svg('circle',{cx:x+38,cy:floor-5,r:5,fill:K.devIn},c);
  return c;
}
// a monitor seen front-on; content goes in .screen (clipped to the glass)
function monitorAt(g,x,y,w,h,{stand=true}={}){
  const m=svg('g',{},g);
  if(stand){svg('rect',{x:x+w/2-8,y:y+h,width:16,height:26,fill:K.metal2},m);svg('rect',{x:x+w/2-40,y:y+h+24,width:80,height:7,rx:3,fill:K.metal2},m)}
  svg('rect',{x:x-8,y:y-8,width:w+16,height:h+16,rx:10,fill:K.dev,stroke:K.devIn,'stroke-width':2},m);
  const clipId='clip'+Math.random().toString(36).slice(2,8);
  const cp=svg('clipPath',{id:clipId},m); svg('rect',{x,y,width:w,height:h,rx:4},cp);
  svg('rect',{x,y,width:w,height:h,rx:4,fill:K.scr},m);
  const screen=svg('g',{'clip-path':`url(#${clipId})`},m);
  return {m,screen};
}
// a window onto the Baghdad night: skyline, a palm, a crescent
function nightWindow(g,x,y,w,h,defs,id){
  const win=svg('g',{},g);
  svg('rect',{x:x-8,y:y-8,width:w+16,height:h+16,rx:6,fill:'#FAF8F4',stroke:K.line2,'stroke-width':2},win);
  svg('rect',{x,y,width:w,height:h,fill:lin(defs,id+'sky',[['0%',K.nightA],['100%',K.nightB]])},win);
  const r=mulberry32(x*7+y); for(let i=0;i<14;i++) svg('circle',{cx:x+r()*w,cy:y+r()*h*.55,r:r()*1.1+.4,fill:'#fff',opacity:.75},win);
  svg('path',{d:`M ${x+w*.8} ${y+h*.2} a ${h*.07} ${h*.07} 0 1 0 ${h*.06} ${h*.11} a ${h*.055} ${h*.055} 0 1 1 ${-h*.06} ${-h*.11} Z`,fill:K.moon},win);
  let bx=x; const base=y+h; while(bx<x+w){const bw=18+r()*30, bh=h*(.12+r()*.22); svg('rect',{x:bx,y:base-bh,width:bw,height:bh,fill:K.skyline},win); if(r()<.35) svg('rect',{x:bx+bw*.3,y:base-bh+8,width:4,height:5,fill:K.warm,opacity:.8},win); bx+=bw+2}
  svg('path',{d:`M ${x+w*.3} ${base-h*.3} a ${h*.1} ${h*.1} 0 0 1 ${h*.2} 0 Z`,fill:K.skyline},win);
  const px=x+w*.14, py=base; svg('path',{d:`M ${px} ${py} Q ${px-4} ${py-h*.25} ${px+4} ${py-h*.45}`,fill:'none',stroke:K.skyline,'stroke-width':5},win);
  [[-26,6],[-20,-10],[-4,-18],[14,-12],[24,4],[12,12]].forEach(([dx,dy])=>svg('path',{d:`M ${px+4} ${py-h*.45} q ${dx*.5} ${dy-10} ${dx} ${dy}`,fill:'none',stroke:K.skyline,'stroke-width':4,'stroke-linecap':'round'},win));
  svg('rect',{x:x+w/2-3,y,width:6,height:h,fill:'#FAF8F4'},win);
  return win;
}
function wallClock(g,cx,cy,r=24){
  const c=svg('g',{},g);
  svg('circle',{cx,cy,r,fill:'#FFFFFF',stroke:K.dev,'stroke-width':3},c);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;svg('line',{x1:cx+Math.sin(a)*(r-7),y1:cy-Math.cos(a)*(r-7),x2:cx+Math.sin(a)*(r-4),y2:cy-Math.cos(a)*(r-4),stroke:K.faint,'stroke-width':2},c)}
  const h=svg('line',{x1:cx,y1:cy,x2:cx,y2:cy-r*.46,stroke:K.dev,'stroke-width':3,'stroke-linecap':'round'},c);
  const m=svg('line',{x1:cx,y1:cy,x2:cx,y2:cy-r*.72,stroke:K.teal,'stroke-width':2.2,'stroke-linecap':'round'},c);
  svg('circle',{cx,cy,r:2.5,fill:K.dev},c);
  return {set(rev){m.setAttribute('transform',`rotate(${((rev*360)%360).toFixed(1)} ${cx} ${cy})`);h.setAttribute('transform',`rotate(${((rev*30+100)%360).toFixed(1)} ${cx} ${cy})`)}};
}
// a rounded label; the tone picks a matching light fill
const TONE={[K.teal]:K.tealLL,[K.ind]:K.indLL,[K.amb]:K.ambLL,[K.cor]:K.corLL,[K.rose]:'#FBEFF4',[K.blue]:'#EEF5FB'};
function pill(g,cx,cy,label,{color=K.teal,bg=null,size=12,pad=12,h=26,weight=600}={}){
  const k=fsz(size)/size; size*=k; pad*=k; h*=k;
  const p=svg('g',{},g), lab=LX(label);
  const w=lab.length*(size*.61+1)+pad*2;            // mono glyphs plus the letter spacing
  svg('rect',{x:cx-w/2,y:cy-h/2,width:w,height:h,rx:h/2,fill:bg||TONE[color]||'#FFFFFF',stroke:color,'stroke-width':1.6},p);
  const t=svg('text',{x:cx,y:cy+size*.36,'text-anchor':'middle',fill:color,'font-size':size,'letter-spacing':1,'font-family':FONT_MONO,'font-weight':weight},p); t.textContent=lab;
  p._w=w;
  return p;
}
// a cylinder (a database) centred at cx,cy
function cylinder(g,cx,cy,w,h,col,fill='#FFFFFF'){
  const c=svg('g',{},g), rx=w/2, ry=h*.14;
  svg('path',{d:`M ${cx-rx} ${cy-h/2+ry} V ${cy+h/2-ry} A ${rx} ${ry} 0 0 0 ${cx+rx} ${cy+h/2-ry} V ${cy-h/2+ry}`,fill,stroke:col,'stroke-width':2},c);
  svg('ellipse',{cx,cy:cy-h/2+ry,rx,ry,fill,stroke:col,'stroke-width':2},c);
  svg('path',{d:`M ${cx-rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx+rx} ${cy}`,fill:'none',stroke:col,'stroke-width':1.2,'stroke-opacity':.5},c);
  return c;
}
// a small EU-style ring of stars, for the Belgium pin
function starRing(g,cx,cy,r,n=12,size=3.4,color=K.amb2){
  const ring=svg('g',{},g);
  for(let i=0;i<n;i++){const a=i*2*Math.PI/n, x=cx+Math.sin(a)*r, y=cy-Math.cos(a)*r;
    let d='';for(let k=0;k<10;k++){const rr=k%2?size*.45:size, aa=-Math.PI/2+k*Math.PI/5;d+=(k?'L':'M')+(x+Math.cos(aa)*rr).toFixed(2)+' '+(y+Math.sin(aa)*rr).toFixed(2)+' '}
    svg('path',{d:d+'Z',fill:color},ring)}
  return ring;
}
// the top bar of an app or browser window drawn inside a screen
function chrome(g,x,y,w,title,{h=20,size=9}={}){
  svg('rect',{x,y,width:w,height:h,fill:K.scrHd},g);
  [K.macR,K.macY,K.macG].forEach((c,i)=>svg('circle',{cx:x+12+i*11,cy:y+h/2,r:3.5,fill:c},g));
  if(title) txt(g,x+52,y+h/2+size*.36,title,{'font-size':size,fill:K.scrTx});
}

// ---------------- registry ----------------
const SCENES={};
function scene(id,def){SCENES[id]=def}

// ---------------- isometric motion graphics ----------------
// x runs down-right, y runs down-left, z runs up. A view is {ox,oy,S}: the screen origin and the size of one unit.
const ISO_C=Math.cos(Math.PI/6), ISO_S=.5;
const view=(ox,oy,S)=>({ox,oy,S});
const ip=(v,x,y,z=0)=>({x:v.ox+(x-y)*ISO_C*v.S,y:v.oy+(x+y)*ISO_S*v.S-z*v.S});
const pts=a=>a.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ');
function hexRgb(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))}
function shade(hex,f){const c=hexRgb(hex),t=f>0?255:0,a=Math.abs(f);return '#'+c.map(v=>Math.round(v+(t-v)*a).toString(16).padStart(2,'0')).join('')}
function mat(base,{top=.4,right=-.16}={}){return {top:shade(base,top),left:base,right:shade(base,right)}}
const M={
  plate:{top:'#F6F2EA',left:'#E4DCCD',right:'#D4CAB7'},
  cream:{top:'#FBF8F2',left:'#EEE6D8',right:'#DDD2BF'},
  white:{top:'#FFFFFF',left:'#F2EFEA',right:'#E3DED5'},
  slate:mat('#3D4658',{top:.18,right:-.2}),
  teal:mat('#18A393'), tealDim:mat('#9FD8CF',{top:.3,right:-.1}),
  ind:mat('#5A6BC9'), amb:mat('#E4A13E'), cor:mat('#DE6A5E'), rose:mat('#D46C88'), blue:mat('#4A92C5'),
  wood:mat('#C9A77E',{top:.3,right:-.18}), green:mat('#6FA37B',{top:.3,right:-.18})
};
class IsoBox{
  constructor(g,v,m,{stroke=null,sw=1}={}){
    this.v=v; this.g=svg('g',{},g);
    const st=stroke?{stroke,'stroke-width':sw,'stroke-linejoin':'round'}:{};
    this.L=svg('polygon',Object.assign({fill:m.left},st),this.g);
    this.R=svg('polygon',Object.assign({fill:m.right},st),this.g);
    this.T=svg('polygon',Object.assign({fill:m.top},st),this.g);
  }
  set(x,y,z,w,d,h){
    const P=(a,b,c)=>ip(this.v,a,b,c);
    const A=P(x,y,z+h),B=P(x+w,y,z+h),Cc=P(x+w,y+d,z+h),D=P(x,y+d,z+h),Ee=P(x,y+d,z),Ff=P(x+w,y+d,z),G=P(x+w,y,z);
    this.T.setAttribute('points',pts([A,B,Cc,D]));
    this.L.setAttribute('points',pts([D,Cc,Ff,Ee]));
    this.R.setAttribute('points',pts([B,Cc,Ff,G]));
    this.topC=P(x+w/2,y+d/2,z+h); this.x=x;this.y=y;this.z=z;this.w=w;this.d=d;this.h=h;
    return this;
  }
  paint(m){this.T.setAttribute('fill',m.top);this.L.setAttribute('fill',m.left);this.R.setAttribute('fill',m.right);return this}
  show(v){this.g.style.display=v?'':'none';return this}
}
// a flat shape lying on a plane of height z
function isoPoly(g,v,list,z,attrs){return svg('polygon',Object.assign({points:pts(list.map(([x,y])=>ip(v,x,y,z)))},attrs),g)}
// an axis-aligned circle on the ground becomes this ellipse on screen
const isoR=(v,r)=>({rx:r*v.S*ISO_C*Math.SQRT2,ry:r*v.S*ISO_S*Math.SQRT2});
function isoDisc(g,v,cx,cy,z,r,attrs){const c=ip(v,cx,cy,z),e=isoR(v,r);return svg('ellipse',Object.assign({cx:c.x,cy:c.y,rx:e.rx,ry:e.ry},attrs),g)}
// a cylinder standing on the ground (a database, a tank)
function isoCyl(g,v,cx,cy,z,r,h,m){
  const cg=svg('g',{},g), b=ip(v,cx,cy,z), t=ip(v,cx,cy,z+h), e=isoR(v,r);
  svg('path',{d:`M ${b.x-e.rx} ${b.y} A ${e.rx} ${e.ry} 0 0 0 ${b.x+e.rx} ${b.y} L ${t.x+e.rx} ${t.y} L ${t.x-e.rx} ${t.y} Z`,fill:m.left},cg);
  svg('path',{d:`M ${b.x} ${b.y+e.ry} A ${e.rx} ${e.ry} 0 0 0 ${b.x+e.rx} ${b.y} L ${t.x+e.rx} ${t.y} L ${t.x} ${t.y+e.ry} Z`,fill:m.right,opacity:.55},cg);
  svg('ellipse',{cx:t.x,cy:t.y,rx:e.rx,ry:e.ry,fill:m.top},cg);
  return {g:cg,top:t,bottom:b,e};
}
// the base every diorama stands on, with a soft shadow under it
function isoStage(g,defs,id,v,x,y,w,d,h=.4,m=M.plate){
  const f=svg('filter',{id:id+'sh',x:'-30%',y:'-30%',width:'160%',height:'160%'},defs); svg('feGaussianBlur',{stdDeviation:16},f);
  const c=ip(v,x+w/2,y+d/2,0);
  svg('ellipse',{cx:c.x,cy:c.y+v.S*.9,rx:(w+d)*ISO_C*v.S*.55,ry:(w+d)*ISO_S*v.S*.5,fill:'rgba(70,52,28,.20)',filter:`url(#${id}sh)`},g);
  return new IsoBox(g,v,m).set(x,y,-h,w,d,h);
}
// a label that floats above a point, with a thin stem down to it
function floatTag(g,label,{color=K.teal,size=11.5,h=26,bg='#FFFFFF'}={}){
  const t=svg('g',{},g);
  t.stem=svg('line',{x1:0,y1:0,x2:0,y2:0,stroke:color,'stroke-width':1.4,'stroke-opacity':.55},t);
  t.body=pill(t,0,0,label,{color,size,h,bg});
  t.at=(x,y,lift,k=1)=>{t.stem.setAttribute('x1',x);t.stem.setAttribute('y1',y);t.stem.setAttribute('x2',x);t.stem.setAttribute('y2',y-lift+h/2);
    t.body.setAttribute('transform',`translate(${x.toFixed(1)} ${(y-lift).toFixed(1)}) scale(${Math.max(.001,k).toFixed(3)})`);op(t,k)};
  return t;
}
// a flat white card with a soft shadow, for screens, ledgers and permits drawn face-on
function card(g,defs,id,x,y,w,h,{rx=14,fill='#FFFFFF'}={}){
  if(!defs.querySelector('#'+id+'card')){const f=svg('filter',{id:id+'card',x:'-20%',y:'-20%',width:'140%',height:'160%'},defs);svg('feDropShadow',{dx:0,dy:10,stdDeviation:12,'flood-color':'#46341c','flood-opacity':.14},f)}
  return svg('rect',{x,y,width:w,height:h,rx,fill,stroke:K.line,'stroke-width':1.2,filter:`url(#${id}card)`},g);
}
// a small round badge with an icon drawn by fn(g) around 0,0
function badge(g,r,ring,fn,{fill='#FFFFFF'}={}){const b=svg('g',{},g);svg('circle',{cx:0,cy:0,r,fill,stroke:ring,'stroke-width':2.2},b);fn(b);return b}
const glyph=(g,s,fs,c)=>{const t=svg('text',{x:0,y:5,'text-anchor':'middle',fill:c,'font-size':fs,'font-weight':800,'font-family':FONT_MONO},g);t.textContent=s};
const ICON={
  form:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('rect',Object.assign({x:-7,y:-9,width:14,height:18,rx:2},s),g);svg('path',Object.assign({d:'M -3.5 1 l 2.5 2.5 l 5 -5.5'},s),g)},
  cap:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M -11 -2 L 0 -8 L 11 -2 L 0 4 Z'},s),g);svg('path',Object.assign({d:'M -6 1 v 5 q 6 4 12 0 v -5'},s),g)},
  card:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('rect',Object.assign({x:-10,y:-7,width:20,height:14,rx:2.5},s),g);svg('line',Object.assign({x1:-10,y1:-2,x2:10,y2:-2},s),g)},
  doc:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M -7 -9 h 9 l 5 5 v 13 h -14 Z M 2 -9 v 5 h 5'},s),g);svg('line',Object.assign({x1:-4,y1:3,x2:4,y2:3},s),g)},
  print:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};[4,7.5,11].forEach(r=>svg('path',Object.assign({d:`M ${-r} 4 a ${r} ${r} 0 0 1 ${2*r} 0`},s),g));svg('line',Object.assign({x1:0,y1:1,x2:0,y2:7},s),g)},
  code:(g,c)=>{glyph(g,'</>',14,c)},
  ui:(g,c)=>{glyph(g,'UI',14,c)},
  app:(g,c)=>{glyph(g,'APP',12,c)},
  person:(g,c)=>{svg('circle',{cx:0,cy:-5,r:5.5,fill:c},g);svg('path',{d:'M -10 11 q 0 -9 10 -9 q 10 0 10 9 Z',fill:c},g)},
  gear:(g,c)=>{svg('circle',{cx:0,cy:0,r:6,fill:'none',stroke:c,'stroke-width':3},g);for(let k=0;k<8;k++)svg('rect',{x:-1.8,y:-11,width:3.6,height:5,rx:1,fill:c,transform:`rotate(${k*45})`},g)},
  shield:(g,c)=>{svg('path',{d:'M 0 -11 l 10 4 v 6 c 0 7 -5 11 -10 13 c -5 -2 -10 -6 -10 -13 v -6 Z',fill:'none',stroke:c,'stroke-width':2,'stroke-linejoin':'round'},g);svg('path',{d:'M -4 1 l 3 3 l 6 -6',fill:'none',stroke:c,'stroke-width':2,'stroke-linecap':'round'},g)},
  key:(g,c)=>{svg('circle',{cx:-5,cy:0,r:4.5,fill:'none',stroke:c,'stroke-width':2.2},g);svg('path',{d:'M -0.5 0 H 10 M 6.5 0 V 4.5 M 10 0 V 3.5',fill:'none',stroke:c,'stroke-width':2.2,'stroke-linecap':'round'},g)},
  bolt:(g,c)=>{svg('path',{d:'M 2 -10 L -6 2 H 0 L -2 10 L 6 -2 H 0 Z',fill:c},g)},
  db:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9};svg('ellipse',Object.assign({cx:0,cy:-6,rx:8,ry:3},s),g);svg('path',Object.assign({d:'M -8 -6 V 6 A 8 3 0 0 0 8 6 V -6 M -8 0 A 8 3 0 0 0 8 0'},s),g)},
  cart:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M -10 -7 h 3 l 3 11 h 11 l 2 -8 h -15'},s),g);svg('circle',{cx:-2,cy:8,r:1.8,fill:c},g);svg('circle',{cx:7,cy:8,r:1.8,fill:c},g)},
  book:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M -10 -8 h 9 q 2 0 2 2 v 15 q -1 -2 -3 -2 h -8 Z M 10 -8 h -9 q -2 0 -2 2 v 15 q 1 -2 3 -2 h 8 Z'},s),g)},
  box:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M -10 -4 l 10 -5 l 10 5 v 10 l -10 5 l -10 -5 Z M -10 -4 l 10 5 l 10 -5 M 0 1 v 10'},s),g)},
  chart:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':2,'stroke-linecap':'round'};svg('path',Object.assign({d:'M -10 9 h 20 M -6 9 v -8 M 0 9 v -15 M 6 9 v -11'},s),g)},
  cog:(g,c)=>{svg('circle',{cx:0,cy:0,r:5,fill:'none',stroke:c,'stroke-width':2},g);for(let k=0;k<8;k++){const a=k*Math.PI/4;svg('line',{x1:Math.cos(a)*7,y1:Math.sin(a)*7,x2:Math.cos(a)*10,y2:Math.sin(a)*10,stroke:c,'stroke-width':2,'stroke-linecap':'round'},g)}},
  lock:(g,c)=>{svg('path',{d:'M -5 -1 v -4 a 5 5 0 0 1 10 0 v 4',fill:'none',stroke:c,'stroke-width':2.2},g);svg('rect',{x:-7,y:-1,width:14,height:11,rx:2.5,fill:c},g)},
  check:(g,c)=>{svg('path',{d:'M -6 0 l 4 4 l 8 -8',fill:'none',stroke:c,'stroke-width':2.6,'stroke-linecap':'round','stroke-linejoin':'round'},g)},
  wrench:(g,c)=>{svg('path',{d:'M -8 8 L 3 -3',stroke:c,'stroke-width':3.4,'stroke-linecap':'round'},g);svg('circle',{cx:5,cy:-5,r:4.5,fill:'none',stroke:c,'stroke-width':2.6},g)},
  chip:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round'};svg('rect',Object.assign({x:-6,y:-6,width:12,height:12,rx:2},s),g);svg('path',Object.assign({d:'M -3 -6 v -3 M 3 -6 v -3 M -3 6 v 3 M 3 6 v 3 M -6 -3 h -3 M -6 3 h -3 M 6 -3 h 3 M 6 3 h 3'},s),g);svg('rect',{x:-2.2,y:-2.2,width:4.4,height:4.4,rx:1,fill:c},g)},
  cross:(g,c)=>{svg('path',{d:'M -3 -9 h 6 v 6 h 6 v 6 h -6 v 6 h -6 v -6 h -6 v -6 h 6 Z',fill:c},g)},
  flask:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M -4 -9 h 8 M -2.5 -9 v 6 l -6 9.5 q -1.2 2.5 1.6 2.5 h 13.8 q 2.8 0 1.6 -2.5 l -6 -9.5 v -6'},s),g);svg('path',{d:'M -5.4 3 h 10.8 l 2.4 4 q .6 1.4 -1 1.4 h -13.6 q -1.6 0 -1 -1.4 Z',fill:c},g)},
  scales:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round','stroke-linejoin':'round'};svg('path',Object.assign({d:'M 0 -9 v 17 M -5 8 h 10 M -9 -6 h 18 M -9 -6 l -3.5 7 h 7 Z M 9 -6 l -3.5 7 h 7 Z'},s),g)},
  globe:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.8};svg('circle',Object.assign({cx:0,cy:0,r:9},s),g);svg('ellipse',Object.assign({cx:0,cy:0,rx:4,ry:9},s),g);svg('path',Object.assign({d:'M -9 0 h 18 M -7.5 -5 h 15 M -7.5 5 h 15'},s),g)},
  capsule:(g,c)=>{const cg=svg('g',{transform:'rotate(-45)'},g);svg('rect',{x:-4.5,y:-10,width:9,height:20,rx:4.5,fill:'none',stroke:c,'stroke-width':1.9},cg);svg('path',{d:'M -4.5 0 h 9 v 5.5 a 4.5 4.5 0 0 1 -9 0 Z',fill:c},cg)},
  clock:(g,c)=>{svg('circle',{cx:0,cy:0,r:9,fill:'none',stroke:c,'stroke-width':1.9},g);svg('path',{d:'M 0 -5 V 0 L 4 3',fill:'none',stroke:c,'stroke-width':1.9,'stroke-linecap':'round'},g)},
  note:(g,c)=>{svg('rect',{x:-10,y:-6,width:20,height:12,rx:2,fill:'none',stroke:c,'stroke-width':1.9},g);svg('circle',{cx:0,cy:0,r:2.8,fill:c},g)},
  spark:(g,c)=>{svg('path',{d:'M 0 -10 Q 1.4 -1.4 10 0 Q 1.4 1.4 0 10 Q -1.4 1.4 -10 0 Q -1.4 -1.4 0 -10 Z',fill:c},g)},
  server:(g,c)=>{const s={fill:'none',stroke:c,'stroke-width':1.9};svg('rect',Object.assign({x:-9,y:-8,width:18,height:7,rx:1.6},s),g);svg('rect',Object.assign({x:-9,y:1,width:18,height:7,rx:1.6},s),g);svg('circle',{cx:-5,cy:-4.5,r:1.3,fill:c},g);svg('circle',{cx:-5,cy:4.5,r:1.3,fill:c},g)},
  tag:(g,c)=>{svg('path',{d:'M -9 -9 h 8 l 9 9 l -8 8 l -9 -9 Z',fill:'none',stroke:c,'stroke-width':1.9,'stroke-linejoin':'round'},g);svg('circle',{cx:-5,cy:-5,r:1.6,fill:c},g)}
};
// a label with a small icon at its left, for module lists drawn inside a scene
function iconChip(g,cx,cy,label,icon,{color=K.teal,size=10,h=30,bg=null}={}){
  const k=fsz(size)/size; size*=k; h*=k;
  const p=svg('g',{},g), lab=LX(label), tw=lab.length*(size*.61+1), w=tw+(24+22)*k;
  svg('rect',{x:cx-w/2,y:cy-h/2,width:w,height:h,rx:h/2,fill:bg||TONE[color]||'#FFFFFF',stroke:color,'stroke-width':1.5},p);
  const ig=svg('g',{transform:`translate(${(cx-w/2+19*k).toFixed(1)} ${cy}) scale(${(.68*k).toFixed(3)})`},p); ICON[icon](ig,color);
  const t=svg('text',{x:cx-w/2+34*k,y:cy+size*.36,fill:color,'font-size':size,'letter-spacing':1,'font-family':FONT_MONO,'font-weight':650},p); t.textContent=lab;
  p._w=w; return p;
}
