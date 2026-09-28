'use strict';
/* The story map, the move, and Chapter 02: Apicbase, in isometric motion graphics */

// =====================================================================
// The map of the story: one playhead moves through five years on two tracks
// =====================================================================
scene('map',{dur:5.6,
build(root,{defs,id}){
  const S={}, X=S.X=t=>100+(t-2021)/6*620;
  const T0=S.T0=2021.58, T1=S.T1=2023.37, T2=S.T2=2023.0, NOW=S.NOW=2026.74, Y1=S.Y1=330, Y2=S.Y2=450;
  S.grid=[2021,2022,2023,2024,2025,2026].map(y=>{const g=svg('g',{},root);
    svg('line',{x1:X(y),y1:262,x2:X(y),y2:556,stroke:K.line2,'stroke-width':1.2,'stroke-dasharray':'2 6'},g);
    txt(g,X(y),586,String(y),{'text-anchor':'middle','font-size':13,'font-weight':600,fill:K.mute});return g});
  S.ghost=svg('g',{},root);
  svg('path',{d:`M ${X(T0)} ${Y1} H ${X(NOW)}`,stroke:K.line,'stroke-width':14,'stroke-linecap':'round'},S.ghost);
  svg('path',{d:`M ${X(T2)} ${Y2} H ${X(NOW)}`,stroke:K.line,'stroke-width':14,'stroke-linecap':'round'},S.ghost);
  const seg=(y,a,b,col)=>{const p=drawPath(svg('path',{d:`M ${X(a)} ${y} H ${X(b)}`,stroke:col,'stroke-width':14,'stroke-linecap':'round'},root));p._a=a;p._b=b;return p};
  S.segs=[seg(Y1,T0,T1,K.teal),seg(Y1,T1,NOW,K.ind),seg(Y2,T2,NOW,K.amb)];
  S.cut=svg('circle',{cx:X(T1),cy:Y1,r:4,fill:'#FFFFFF'},root);
  const lab=(x,y,title,col,sub,t)=>{const g=svg('g',{},root);txt(g,x,y,title,{'font-size':15,'font-weight':750,fill:col,'font-family':FONT_UI});txt(g,x,y+21,sub,{'font-size':11,'letter-spacing':1.2,fill:K.mute});g._t=t;return g};
  S.labs=[lab(X(T0)-7,Y1+44,'Al-Hadi University College',K.teal,'08/2021 – 05/2023',T0),
          lab(X(T1)-7,Y1-40,'Apicbase',K.ind,'05/2023 → TODAY',T1),
          lab(X(T2)-7,Y2+44,'Own systems: Al-Nahrain University, Keppt',K.amb,'2023 → TODAY',T2)];
  S.head=svg('line',{x1:0,y1:Y1-74,x2:0,y2:Y2+26,stroke:K.ink,'stroke-width':1.6},root);
  S.h1=svg('circle',{r:10,fill:'#FFFFFF','stroke-width':4},root);
  S.h2=svg('circle',{r:10,fill:'#FFFFFF',stroke:K.amb,'stroke-width':4},root);
  S.today=pill(root,X(NOW),Y1-90,'TODAY',{color:K.ink,bg:'#FFFFFF',size:11,h:24});
  S.year=txt(root,410,184,'2021',{'text-anchor':'middle','font-size':104,'font-weight':900,fill:K.ink,'font-family':FONT_UI,'letter-spacing':-4});
  return S;
},
render(S,u){
  const X=S.X, tau=lerp(2021.2,S.NOW,E.inOutCubic(P(u,.5,4.1)));
  S.grid.forEach((g,i)=>op(g,E.outCubic(P(u,.05+i*.06,.4+i*.06))));
  op(S.ghost,P(u,.2,.6));
  S.segs.forEach(p=>drawTo(p,(tau-p._a)/(p._b-p._a)));
  op(S.cut,tau>S.T1?1:0);
  S.labs.forEach(l=>{const k=E.outCubic(P(tau,l._t,l._t+.3));op(l,k);l.setAttribute('transform',`translate(0 ${((1-k)*8).toFixed(1)})`)});
  const hx=X(tau).toFixed(1); S.head.setAttribute('x1',hx); S.head.setAttribute('x2',hx); op(S.head,P(u,.35,.55)*(1-P(u,4.3,4.7)));
  C(S.h1,{x:+hx,y:S.Y1}); S.h1.setAttribute('stroke',tau<S.T1?K.teal:K.ind); op(S.h1,P(tau,S.T0,S.T0+.05));
  C(S.h2,{x:+hx,y:S.Y2}); op(S.h2,P(tau,S.T2,S.T2+.05));
  popAt(S.today,X(S.NOW),S.Y1-90,E.outBack(P(u,4.1,4.45)));
  S.year.textContent=String(Math.min(2026,Math.floor(tau))); op(S.year,P(u,0,.3));
}});

// =====================================================================
// The move: from a desk in Baghdad to a company in Belgium
// =====================================================================
scene('move',{dur:6.6,
build(root,{defs,id}){
  const S={}, vL=view(214,336,33), vR=view(606,384,33);
  const face=(v,list,fill)=>svg('polygon',{points:pts(list.map(([x,y,z])=>ip(v,x,y,z))),fill},root);
  // Belgium: an office with the flag on the roof
  isoStage(root,defs,id+'L',vL,0,0,4.2,4.2);
  new IsoBox(root,vL,M.cream).set(.7,.7,0,2.8,2.8,2.9);
  for(let r=0;r<4;r++)for(let c=0;c<3;c++){
    const x0=.95+c*.85, z0=.5+r*.62;
    face(vL,[[x0,3.5,z0],[x0+.5,3.5,z0],[x0+.5,3.5,z0+.35],[x0,3.5,z0+.35]],'#C9D1DC');
    face(vL,[[3.5,x0,z0],[3.5,x0+.5,z0],[3.5,x0+.5,z0+.35],[3.5,x0,z0+.35]],'#BFC8D4')}
  const pole=ip(vL,1.3,1.3,2.9), ptop=S.ptop=ip(vL,1.3,1.3,4.3);
  svg('line',{x1:pole.x,y1:pole.y,x2:ptop.x,y2:ptop.y,stroke:K.metal2,'stroke-width':2.5},root);
  S.flag=['#1C1C1C','#F4C21E','#D23B30'].map((c,i)=>svg('rect',{x:ptop.x+1+i*11,y:ptop.y,width:11,height:22,fill:c},root));
  // Baghdad: a desk with a laptop and a palm
  isoStage(root,defs,id+'R',vR,0,0,4.2,4.2);
  new IsoBox(root,vR,M.wood).set(.6,1.4,.85,2.8,1.5,.14);
  [[.7,1.5],[3.2,1.5],[.7,2.75],[3.2,2.75]].forEach(([x,y])=>new IsoBox(root,vR,M.wood).set(x,y,0,.16,.16,.85));
  new IsoBox(root,vR,M.slate).set(1.4,1.85,.99,1.3,.95,.06);
  new IsoBox(root,vR,M.slate).set(1.4,1.85,1.05,1.3,.07,.85);
  S.glow=face(vR,[[1.47,1.92,1.12],[2.63,1.92,1.12],[2.63,1.92,1.83],[1.47,1.92,1.83]],'#9FDED4');
  isoCyl(root,vR,3.5,.7,0,.34,.5,M.cream);
  const tp=ip(vR,3.5,.7,.5);
  [[-26,-18],[-12,-30],[8,-32],[24,-20],[30,-4],[-30,-2]].forEach(([dx,dy])=>svg('path',{d:`M ${tp.x} ${tp.y} q ${dx*.4} ${dy-12} ${dx} ${dy}`,fill:'none',stroke:K.green,'stroke-width':5,'stroke-linecap':'round'},root));
  // the line between them, high above both
  const a=ip(vR,2.05,1.9,1.9), b=ip(vL,3.5,2.1,2.3);
  S.arc=drawPath(svg('path',{d:`M ${a.x} ${a.y} C ${a.x-40} 80, ${b.x+90} 70, ${b.x} ${b.y}`,fill:'none',stroke:lin(defs,id+'arc',[['0%',K.ind],['100%',K.teal2]],false),'stroke-width':3.5,'stroke-linecap':'round'},root));
  S.out=[0,1,2,3].map(i=>({el:svg('circle',{r:5,fill:K.amb2,stroke:'#FFFFFF','stroke-width':1.5},root),off:i/4}));
  S.back=[0,1,2].map(i=>({el:svg('circle',{r:4,fill:K.teal2,stroke:'#FFFFFF','stroke-width':1.2},root),off:i/3+.15}));
  S.remote=pill(root,410,212,'REMOTE',{color:K.ind,size:12,h:28});
  S.labL=pill(root,214,526,'BELGIUM · 2023 → TODAY',{color:K.ind,size:11,h:26});
  S.labR=pill(root,606,574,'BAGHDAD',{color:K.teal,size:11,h:26});
  // the years go by
  S.cal=svg('g',{},root);
  S.year=txt(S.cal,366,648,'2023',{'text-anchor':'middle','font-size':40,'font-weight':850,fill:K.ink,'font-family':FONT_UI,'letter-spacing':-1});
  S.y4=pill(root,468,634,'YEAR 4',{color:K.amb,size:12,h:28});
  return S;
},
render(S,u){
  drawTo(S.arc,E.inOutCubic(P(u,.6,1.6)));
  op(S.glow,.75+.25*Math.sin(u*3));
  S.flag.forEach((f,i)=>f.setAttribute('y',(S.ptop.y+Math.sin(u*4-i*.9)*1.6*(i/2+.3)).toFixed(2)));
  const L=S.arc._len, on=u>1.6;
  S.out.forEach(p=>{const ph=((u-1.6)*.42+p.off)%1;C(p.el,S.arc.getPointAtLength(L*ph));op(p.el,on?Math.sin(Math.PI*ph):0)});
  S.back.forEach(p=>{const ph=((u-1.6)*.33+p.off)%1;C(p.el,S.arc.getPointAtLength(L*(1-ph)));op(p.el,on?Math.sin(Math.PI*ph)*.9:0)});
  popAt(S.remote,410,212,E.outBack(P(u,1.7,2.05)));
  popAt(S.labR,606,574,E.outBack(P(u,.2,.5))); popAt(S.labL,214,526,E.outBack(P(u,1.4,1.75)));
  const flips=[3.3,3.8,4.3]; S.year.textContent=String(2023+flips.filter(f=>u>=f).length);
  let sq=1; flips.forEach(f=>{const k=P(u,f-.12,f+.12);if(k>0&&k<1)sq=Math.abs(Math.cos(Math.PI*k))});
  S.cal.setAttribute('transform',`translate(0 634) scale(1 ${Math.max(.02,sq).toFixed(3)}) translate(0 -634)`); op(S.cal,P(u,2.6,3.0));
  popAt(S.y4,468,634,E.outBack(P(u,4.6,4.95)));
}});

// =====================================================================
// 500+ client locations: a city of restaurants lights up, then we go into one
// =====================================================================
scene('restaurants',{dur:7.4,
build(root,{defs,id}){
  const S={}, v=S.v=view(410,196,29);
  const city=S.city=svg('g',{},root), cam=S.cam=svg('g',{},city);
  isoStage(cam,defs,id,v,0,0,12,12);
  const rnd=mulberry32(19), cells=[];
  for(let j=0;j<6;j++)for(let i=0;i<6;i++){const x=1.1+i*1.95,y=1.1+j*1.95,r=rnd();cells.push({i,j,x,y,kind:(i===3&&j===2)?'target':r<.66?'rest':r<.82?'tree':'none',h:.55+rnd()*.7,amber:rnd()<.3})}
  cells.sort((a,b)=>(a.x+a.y)-(b.x+b.y));
  const T=cells.find(c=>c.kind==='target'); T.h=.9;
  S.T=ip(v,T.x,T.y,T.h);
  const maxD=Math.hypot(6,6)*1.95;
  S.items=[];
  cells.forEach(c=>{
    if(c.kind==='none') return;
    if(c.kind==='tree'){isoCyl(cam,v,c.x,c.y,0,.12,.35,M.wood);const top=ip(v,c.x,c.y,.35);const e=isoR(v,.42);svg('ellipse',{cx:top.x,cy:top.y-8,rx:e.rx*.8,ry:e.rx*.62,fill:'#7FAF86'},cam);return}
    const b=new IsoBox(cam,v,M.cream); b.set(c.x-.48,c.y-.48,0,.96,.96,.001);
    const aw=new IsoBox(cam,v,c.amber?M.amb:M.teal); aw.set(c.x-.44,c.y+.48,.001,.88,.18,.001);
    const glow=svg('circle',{r:4.5,fill:c.kind==='target'?K.amb:(c.amber?K.amb2:K.teal2),stroke:'#FFFFFF','stroke-width':1.5},cam);
    const halo=svg('circle',{r:12,fill:c.kind==='target'?K.amb2:K.teal2,opacity:0},cam);
    S.items.push({c,b,aw,glow,halo,t:.3+2.3*Math.hypot(c.x-T.x,c.y-T.y)/maxD+rnd()*.15});
  });
  // one restaurant, up close
  const shop=S.shop=svg('g',{},root), w=view(420,236,44);
  isoStage(shop,defs,id+'shop',w,0,0,7,6);
  const B=[1.1,.9,4.6,3.6,2.7], FY=B[1]+B[3], FX=B[0]+B[2];
  new IsoBox(shop,w,M.cream).set(B[0],B[1],0,B[2],B[3],B[4]);
  new IsoBox(shop,w,M.cream).set(4.2,1.3,B[4],.7,.7,1.0);
  const Lf=(x0,x1,z0,z1,fill)=>svg('polygon',{points:pts([[x0,FY,z0],[x1,FY,z0],[x1,FY,z1],[x0,FY,z1]].map(([x,y,z])=>ip(w,x,y,z))),fill},shop);
  const Rf=(y0,y1,z0,z1,fill)=>svg('polygon',{points:pts([[FX,y0,z0],[FX,y1,z0],[FX,y1,z1],[FX,y0,z1]].map(([x,y,z])=>ip(w,x,y,z))),fill},shop);
  Lf(1.5,3.2,.4,1.7,'#F4C979'); Lf(3.6,4.5,0,1.8,'#8C7A62'); Lf(4.8,5.4,.4,1.7,'#F4C979');
  Rf(1.3,2.4,.9,1.9,'#DCC9A8'); Rf(2.9,4.1,.9,1.9,'#DCC9A8');
  new IsoBox(shop,w,M.teal).set(1.3,FY,1.85,4.2,.55,.18);
  const sp=ip(w,3.4,FY+.3,2.3); S.sign=pill(shop,sp.x,sp.y,'RESTAURANT',{color:K.ink,bg:'#FFFFFF',size:12,h:26});
  S.steam=[0,1,2,3].map(()=>svg('circle',{r:6,fill:'#FFFFFF',opacity:.8},shop)); S.chim=ip(w,4.55,1.65,B[4]+1.0);
  const tag=(label,col,x,y,to)=>{const g=svg('g',{},shop);svg('line',{x1:x,y1:y,x2:to.x,y2:to.y,stroke:col,'stroke-width':1.5,'stroke-dasharray':'3 4'},g);svg('circle',{cx:to.x,cy:to.y,r:4,fill:col},g);pill(g,x,y,label,{color:col,size:12.5,h:30});return g};
  S.tags=[tag('STOCK',K.teal,150,300,ip(w,1.6,FY,.9)),tag('RECIPES',K.ind,420,96,ip(w,3.0,2.2,B[4])),tag('ORDERS',K.amb,700,300,ip(w,FX,3.5,1.4))];
  S.one=pill(shop,420,640,'1 OF 500+',{color:K.amb,size:12,h:28});
  return S;
},
render(S,u){
  const v=S.v;
  S.items.forEach(it=>{const k=E.outBack(P(u,it.t,it.t+.35)), h=Math.max(.001,it.c.h*clamp(k,0,1.08));
    it.b.set(it.c.x-.48,it.c.y-.48,0,.96,.96,h); op(it.b.g,P(u,it.t-.05,it.t+.05));
    it.aw.set(it.c.x-.44,it.c.y+.48,h*.55,.88,.18,.08); op(it.aw.g,k>.9?1:0);
    const top=ip(v,it.c.x,it.c.y,h+.25); C(it.glow,{x:top.x,y:top.y-6}); C(it.halo,{x:top.x,y:top.y-6});
    op(it.glow,E.outBack(P(u,it.t+.25,it.t+.45)));
    const rp=u>it.t?((u-it.t)*1.1)%1:0; it.halo.setAttribute('r',(5+rp*14).toFixed(1)); op(it.halo,u>it.t+.3?.35*(1-rp):0);
  });
  // dive into one of them
  const z=E.inOutCubic(P(u,3.1,4.5)), s=Math.exp(lerp(0,Math.log(7),z));
  const q=E.inOutCubic(P(u,2.9,3.9)), cx=lerp(410,S.T.x,q), cy=lerp(370,S.T.y,q);
  S.cam.setAttribute('transform',`translate(${(410-cx*s).toFixed(2)} ${(370-cy*s).toFixed(2)}) scale(${s.toFixed(4)})`);
  const sh=E.inOutCubic(P(u,3.95,4.45)); op(S.city,1-sh); op(S.shop,sh);
  S.city.style.display=sh>=1?'none':''; S.shop.style.display=sh<=0?'none':'';
  S.shop.setAttribute('transform',`translate(410 400) scale(${lerp(.8,1,E.outCubic(P(u,3.95,4.9))).toFixed(4)}) translate(-410 -400)`);
  S.steam.forEach((p,i)=>{const ph=((u*.5+i/4)%1);C(p,{x:S.chim.x+ph*18,y:S.chim.y-8-ph*60});p.setAttribute('r',(5+ph*10).toFixed(1));op(p,.8*(1-ph))});
  S.tags.forEach((t,i)=>{const k=E.outBack(P(u,5.0+i*.22,5.35+i*.22));op(t,k);t.setAttribute('transform',`translate(0 ${((1-clamp(k))*10).toFixed(1)})`)});
  popAt(S.one,420,640,E.outBack(P(u,6.1,6.45)));
}});

// =====================================================================
// The stock pipeline: sales and deliveries become numbered events on a conveyor;
// one worker applies them to the ledger in order, and the till answers at once
// =====================================================================
scene('pipeline',{dur:9.4,
build(root,{defs,id}){
  const S={}, v=S.v=view(282,276,32);
  const face=(list,fill)=>svg('polygon',{points:pts(list.map(([x,y,z])=>ip(v,x,y,z))),fill},root);
  isoStage(root,defs,id,v,0,0,14,5);
  // the restaurant and its till
  new IsoBox(root,v,M.cream).set(.4,.4,0,2.8,3.0,1.9);
  new IsoBox(root,v,M.teal).set(.4,3.4,1.2,2.8,.4,.14);
  face([[.8,3.4,.3],[1.9,3.4,.3],[1.9,3.4,1.05],[.8,3.4,1.05]],'#F4C979');
  face([[3.2,.9,.25],[3.2,2.2,.25],[3.2,2.2,1.4],[3.2,.9,1.4]],'#DCC9A8');
  new IsoBox(root,v,M.slate).set(3.35,2.35,0,.6,.55,.62);
  S.tillScr=face([[3.95,2.42,.36],[3.95,2.82,.36],[3.95,2.82,.56],[3.95,2.42,.56]],K.devLed);
  // the delivery van
  new IsoBox(root,v,M.white).set(.3,3.85,.18,2.2,1.0,1.05);
  new IsoBox(root,v,M.amb).set(.3,4.85,.55,2.2,.01,.16);
  new IsoBox(root,v,M.slate).set(2.5,3.9,.18,.75,.9,.72);
  [[.8,4.87],[2.6,4.87]].forEach(([x,y])=>isoDisc(root,v,x,y,.1,.2,{fill:K.dev}));
  // the conveyor: the ordered queue
  new IsoBox(root,v,M.slate).set(4.0,2.0,0,6.6,1.0,.34);
  S.rollers=[...Array(14)].map(()=>svg('line',{stroke:'#6B758B','stroke-width':1.5},root));
  S.qTag=floatTag(root,'ORDERED EVENT QUEUE · SQS FIFO',{color:K.amb,size:10.5,h:24});
  // the worker and the database
  new IsoBox(root,v,{top:'#5BC7B9',left:'#3D4658',right:'#2C3446'}).set(10.9,1.6,0,1.6,1.8,1.5);
  S.gear=badge(root,17,K.teal,g=>ICON.gear(g,K.teal));
  const wt=ip(v,11.7,2.5,1.5); S.gear._p=wt;
  pill(root,wt.x,wt.y-62,'CELERY',{color:K.teal,size:11,h:24});
  S.db=isoCyl(root,v,13.3,2.5,0,.75,1.7,M.ind);
  S.dbFlash=svg('ellipse',{cx:S.db.top.x,cy:S.db.top.y,rx:S.db.e.rx,ry:S.db.e.ry,fill:'#FFFFFF',opacity:0},root);
  pill(root,S.db.top.x,S.db.top.y-30,'POSTGRES',{color:K.ind,size:11,h:24});
  // the ledger
  const lg=S.ledger=svg('g',{},root);
  card(lg,defs,id,560,86,210,146);
  txt(lg,578,114,'STOCK',{'font-size':11,'letter-spacing':1.6,fill:K.ind,'font-weight':700});
  svg('line',{x1:578,y1:124,x2:752,y2:124,stroke:K.line,'stroke-width':1},lg);
  const ITEMS=[['TOMATO',40],['FLOUR',12],['MILK',20]];
  S.rows=ITEMS.map(([n,val],i)=>{const y=152+i*30;const hl=svg('rect',{x:570,y:y-19,width:190,height:26,rx:7,fill:K.teal2,opacity:0},lg);txt(lg,580,y,n,{'font-size':12.5,fill:K.ink2});return {hl,val:txt(lg,752,y,String(val),{'text-anchor':'end','font-size':15,'font-weight':750,fill:K.ink,'font-family':FONT_UI}),v0:val}});
  // the events: [time, kind, item, change]
  S.BELT0=4.3; S.SPEED=5; S.SLOT0=9.9; S.GAP=.78;
  const TRAVEL=(S.SLOT0-S.BELT0)/S.SPEED, PROC=.5;
  const EV=[[.8,'sale',0,-2],[1.9,'del',0,24],[3.2,'sale',1,-1],[3.5,'sale',0,-3],[3.8,'sale',2,-1],[4.1,'sale',0,-2],[5.0,'del',2,12],[5.4,'sale',1,-2]];
  let prevEnd=0; const vals=ITEMS.map(x=>x[1]);
  S.ev=EV.map(([t,kind,item,delta],i)=>{const arr=t+.8, st=Math.max(arr+TRAVEL,prevEnd), en=st+PROC; prevEnd=en; vals[item]+=delta; return {i,t,kind,item,arr,st,en,after:vals[item]}});
  S.ev.forEach(e=>{const ahead=S.ev.slice(0,e.i).filter(o=>o.st>e.arr);e.land=ahead.length;e.moves=ahead.map(o=>o.st)});
  S.tok=S.ev.map(e=>{const sale=e.kind==='sale';return {b:new IsoBox(root,v,sale?M.amb:M.ind),lab:txt(root,0,0,`#${e.i+1}`,{'text-anchor':'middle','font-size':11,'font-weight':800,fill:sale?K.amb:K.ind,'font-family':FONT_UI})}});
  S.saved=S.ev.filter(e=>e.kind==='sale').map(e=>({e,el:pill(root,0,0,'✓ saved',{color:K.teal,size:10,h:22})}));
  S.till=ip(v,3.65,2.62,.62);
  return S;
},
render(S,u){
  const v=S.v, slotX=k=>S.SLOT0-k*S.GAP;
  const off=(u*1.2)%.5;
  S.rollers.forEach((r,i)=>{const x=4.15+i*.5+off, a=ip(v,x,2.0,.345), b=ip(v,x,3.0,.345);L(r,a,b);r.style.display=x>10.5?'none':''});
  const bt=ip(v,7.3,2.5,.34); S.qTag.at(bt.x,bt.y,58,E.outBack(P(u,.3,.6)));
  let busy=0; S.ev.forEach(e=>busy+=clamp(u-e.st,0,.5));
  S.gear.setAttribute('transform',`translate(${S.gear._p.x.toFixed(1)} ${(S.gear._p.y-26).toFixed(1)}) rotate(${(u*30+busy*600).toFixed(1)})`);
  let lastEn=-9;
  S.rows.forEach((r,i)=>{let val=r.v0,last=-9;S.ev.forEach(e=>{if(e.item===i&&u>=e.en){val=e.after;last=e.en}});lastEn=Math.max(lastEn,last);r.val.textContent=String(val);op(r.hl,.24*(1-P(u,last,last+.6)))});
  op(S.dbFlash,.55*(1-P(u,lastEn,lastEn+.4)));
  // tokens: out of the till or the van, onto the belt, along it in order, into the worker
  S.ev.forEach((e,i)=>{
    const tk=S.tok[i]; let x,y=2.5,z=.34;
    const src=e.kind==='sale'?{x:3.65,y:2.62,z:.62}:{x:1.4,y:4.35,z:1.25};
    const show=u>=e.t&&u<=e.st+.3;
    tk.b.show(show); op(tk.lab,show?1:0); if(!show) return;
    if(u<e.arr){const q=E.inOutCubic(P(u,e.t,e.arr));x=lerp(src.x,S.BELT0,q);y=lerp(src.y,2.5,q);z=lerp(src.z,.34,q)+Math.sin(Math.PI*q)*1.6}
    else if(u<e.st){let target=slotX(e.land);e.moves.forEach(tc=>target+=S.GAP*E.inOutCubic(P(u,tc,tc+.25)));x=Math.min(S.BELT0+S.SPEED*(u-e.arr),target)}
    else{const q=E.inOutCubic(P(u,e.st,e.st+.3));x=lerp(slotX(0),11.4,q);z=.34+q*.4}
    tk.b.set(x-.31,y-.31,z,.62,.62,.46); const lp=ip(v,x,y,z+.46); tk.lab.setAttribute('x',lp.x.toFixed(1)); tk.lab.setAttribute('y',(lp.y-8).toFixed(1));
    op(tk.b.g,u>e.st?1-P(u,e.st+.15,e.st+.3):1);
  });
  // the till answers at once, whatever the queue is doing: each sale sends up a small "saved"
  S.saved.forEach(({e,el})=>{const age=u-e.t;if(age<0||age>1){op(el,0);return}
    const k=E.outBack(P(age,0,.16));el.setAttribute('transform',`translate(${(S.till.x-58).toFixed(1)} ${(S.till.y-34-age*84).toFixed(1)}) scale(${Math.max(.001,k).toFixed(3)})`);op(el,Math.min(k,1-P(age,.6,1)))});
  const lastTap=Math.max(-9,...S.ev.filter(e=>e.kind==='sale'&&e.t<=u).map(e=>e.t));
  S.tillScr.setAttribute('fill',u-lastTap<.3?K.teal2:K.devLed);
  popAt(S.ledger,665,159,E.outBack(P(u,.2,.55)));
}});

// =====================================================================
// Speed, two wins: the slowest inventory pages from 25 s to under one,
// and the heaviest-data client's responses 25% faster
// =====================================================================
scene('speed',{dur:7.8,
build(root,{defs,id}){
  const S={};
  // win 1: the page that took 25 seconds
  S.p1=pill(root,196,40,'01 · SLOWEST INVENTORY PAGES',{color:K.ind,size:11,h:26});
  const W=svg('g',{},root);
  card(W,defs,id,36,70,440,262);
  svg('rect',{x:36,y:70,width:440,height:36,rx:14,fill:K.scrHd},W); svg('rect',{x:36,y:94,width:440,height:12,fill:K.scrHd},W);
  [K.macR,K.macY,K.macG].forEach((c,i)=>svg('circle',{cx:56+i*13,cy:88,r:4.5,fill:c},W));
  txt(W,108,93,'INVENTORY',{'font-size':11.5,'letter-spacing':2,fill:K.ink2,'font-weight':700});
  svg('rect',{x:36,y:106,width:440,height:4,fill:K.scrLn},W);
  S.prog=svg('rect',{x:36,y:106,width:0,height:4,fill:K.cor},W);
  svg('rect',{x:52,y:120,width:408,height:22,rx:5,fill:K.scrLn},W);
  [['ITEM',62],['ON HAND',330],['UNIT',408]].forEach(([h,x])=>txt(W,x,135,h,{'font-size':9,'letter-spacing':1,fill:K.scrTx,'font-weight':600}));
  const rr=mulberry32(6); S.skel=[]; S.rows=[];
  for(let i=0;i<7;i++){const y=150+i*25;
    S.skel.push(svg('rect',{x:58,y:y+7,width:396,height:9,rx:4.5,fill:K.scrLn},W));
    const g=svg('g',{},W); svg('rect',{x:52,y,width:408,height:22,rx:5,fill:i%2?'#FFFFFF':'#F6F7F9'},g);
    svg('rect',{x:62,y:y+9,width:80+rr()*110,height:5,rx:2.5,fill:K.scrBar},g);
    svg('rect',{x:330,y:y+9,width:20+rr()*34,height:5,rx:2.5,fill:K.teal2},g);
    svg('rect',{x:408,y:y+6,width:36,height:10,rx:5,fill:K.scrLn},g);
    S.rows.push(g)}
  S.spin=svg('circle',{cx:256,cy:236,r:20,fill:'none',stroke:K.teal2,'stroke-width':4,'stroke-linecap':'round','stroke-dasharray':'80 46'},W);
  S.timer=txt(root,648,212,'0.0 s',{'text-anchor':'middle','font-size':78,'font-weight':900,fill:K.cor,'font-family':FONT_UI,'letter-spacing':-3});
  S.ff=txt(root,648,132,'▶▶',{'text-anchor':'middle','font-size':18,fill:K.cor});
  S.st1=pill(root,648,262,'BEFORE',{color:K.cor,size:11,h:26}); S.st2=pill(root,648,262,'AFTER',{color:K.teal,size:11,h:26});
  svg('line',{x1:36,y1:372,x2:784,y2:372,stroke:K.line,'stroke-width':1.5,'stroke-dasharray':'2 7','stroke-linecap':'round'},root);
  // win 2: the same request, before and after, racing to the answer
  S.p2=pill(root,176,412,'02 · HEAVIEST-DATA CLIENT',{color:K.ind,size:11,h:26});
  txt(root,36,462,'RESPONSE TIME',{'font-size':10.5,'letter-spacing':1.6,fill:K.mute,'font-weight':600});
  S.lanes=[{y:506,col:K.cor,col2:K.cor2,lab:'BEFORE',dur:2.0},{y:586,col:K.teal,col2:K.teal2,lab:'AFTER',dur:1.5}].map(L=>{
    txt(root,36,L.y+5,L.lab,{'font-size':11,'letter-spacing':1,fill:L.col,'font-weight':700});
    svg('rect',{x:140,y:L.y-9,width:400,height:18,rx:9,fill:L.col===K.cor?K.corL:K.tealLL},root);
    L.bar=svg('rect',{x:140,y:L.y-9,width:0,height:18,rx:9,fill:L.col2},root);
    L.dot=svg('circle',{r:9,fill:'#FFFFFF',stroke:L.col,'stroke-width':3},root);
    L.ok=txt(root,0,L.y+6,'✓',{'font-size':17,'font-weight':800,fill:L.col,'font-family':FONT_UI,opacity:0});
    return L});
  S.cut=txt(root,694,566,'−25%',{'text-anchor':'middle','font-size':62,'font-weight':900,fill:K.teal,'font-family':FONT_UI,'letter-spacing':-2});
  S.cutLab=txt(root,694,604,'RESPONSE TIME',{'text-anchor':'middle','font-size':10,'letter-spacing':1.4,fill:K.mute,'font-weight':600});
  return S;
},
render(S,u){
  const A=.3, B=3.0, T2=3.9, run1=u<3.45, loading=u>A&&u<B;
  popAt(S.p1,196,40,E.outBack(P(u,0,.3)));
  S.skel.forEach((k,i)=>op(k,loading?.5+.5*Math.sin(u*6-i*.5):0));
  op(S.spin,loading?1:0); S.spin.setAttribute('transform',`rotate(${(u*400).toFixed(1)} 256 236)`);
  S.rows.forEach((g,i)=>op(g,run1?E.outCubic(P(u,B+i*.03,B+.25+i*.03))*(1-P(u,3.3,3.45)):E.outCubic(P(u,T2+.03+i*.02,T2+.15+i*.02))));
  S.prog.setAttribute('width',(run1?440*P(u,A,B)*(1-P(u,3.3,3.45)):440*E.outExpo(P(u,T2,T2+.12))).toFixed(1)); S.prog.setAttribute('fill',run1?K.cor:K.teal2);
  if(run1){S.timer.textContent=NUMF(25*P(u,A,B),1)+' s';S.timer.setAttribute('fill',K.cor);op(S.timer,1-P(u,3.3,3.45));S.timer.removeAttribute('transform')}
  else{S.timer.textContent='< 1 s';S.timer.setAttribute('fill',K.teal);const k=E.outBack(P(u,T2+.05,T2+.35));S.timer.setAttribute('transform',`translate(648 186) scale(${Math.max(.001,k).toFixed(3)}) translate(-648 -186)`);op(S.timer,clamp(k))}
  op(S.ff,loading&&Math.floor(u*3)%2===0?1:0);
  popAt(S.st1,648,262,E.outBack(P(u,.2,.5))*(1-P(u,3.3,3.45))); popAt(S.st2,648,262,E.outBack(P(u,T2+.2,T2+.5)));
  // the race
  const R0=4.7;
  popAt(S.p2,176,412,E.outBack(P(u,4.3,4.6)));
  // both answers grow at the same rate; the faster one simply stops sooner
  S.lanes.forEach(L=>{const w=400*L.dur/2.0*P(u,R0,R0+L.dur), x=140+w;
    L.bar.setAttribute('width',w.toFixed(1)); C(L.dot,{x,y:L.y}); op(L.dot,P(u,R0-.25,R0));
    L.ok.setAttribute('x',(x+16).toFixed(1)); op(L.ok,P(u,R0+L.dur,R0+L.dur+.15))});
  const ck=E.outBack(P(u,R0+2.05,R0+2.4)); S.cut.setAttribute('transform',`translate(694 546) scale(${Math.max(.001,ck).toFixed(3)}) translate(-694 -546)`); op(S.cut,clamp(ck)); op(S.cutLab,P(u,R0+2.2,R0+2.4));
}});

// =====================================================================
// Analytics: the dashboard builds itself while its queries run on their own lanes
// =====================================================================
scene('dashboard',{dur:7.2,
build(root,{defs,id}){
  const S={};
  const D=svg('g',{},root);
  card(D,defs,id,110,40,600,262);
  svg('rect',{x:110,y:40,width:600,height:34,rx:14,fill:K.scrHd},D); svg('rect',{x:110,y:62,width:600,height:12,fill:K.scrHd},D);
  txt(D,130,62,'ANALYTICS',{'font-size':12,'letter-spacing':2,fill:K.ink2,'font-weight':700});
  const KC=[K.teal2,K.amb2,K.ind2];
  S.kpi=[0,1,2].map(i=>{const x=126+i*194,g=svg('g',{},D);
    svg('rect',{x,y:88,width:180,height:56,rx:8,fill:'#FFFFFF',stroke:K.line,'stroke-width':1},g);
    txt(g,x+12,106,['FOOD COST','WASTE','STOCK VALUE'][i],{'font-size':9,'letter-spacing':1,fill:K.scrTx,'font-weight':600});
    const bar=svg('rect',{x:x+12,y:120,width:0,height:10,rx:5,fill:KC[i]},g);
    const spark=drawPath(svg('polyline',{points:[...Array(9)].map((_,j)=>`${x+108+j*8},${(134-((j*37+i*13)%16)).toFixed(1)}`).join(' '),fill:'none',stroke:KC[i],'stroke-width':2,'stroke-linejoin':'round'},g));
    return {bar,spark,w:[70,44,86][i]}});
  svg('rect',{x:126,y:156,width:320,height:130,rx:8,fill:'#FFFFFF',stroke:K.line,'stroke-width':1},D);
  for(let j=0;j<4;j++) svg('line',{x1:140,y1:180+j*26,x2:432,y2:180+j*26,stroke:K.scrLn,'stroke-width':1},D);
  S.line=drawPath(svg('polyline',{points:[...Array(13)].map((_,j)=>`${140+j*24},${(262-((Math.sin(j*.9)+1)*34+j*3)).toFixed(1)}`).join(' '),fill:'none',stroke:K.teal2,'stroke-width':3,'stroke-linejoin':'round','stroke-linecap':'round'},D));
  svg('rect',{x:458,y:156,width:236,height:130,rx:8,fill:'#FFFFFF',stroke:K.line,'stroke-width':1},D);
  S.bars=[52,74,40,86,64,94].map((h,j)=>({el:svg('rect',{x:474+j*36,y:274,width:22,height:0,rx:4,fill:j%2?K.ind:K.ind2},D),h}));
  // the engine room: one lane to Redis and the replicas, a separate lane to Redshift
  const v=S.v=view(410,376,30), Z=.45, g=(x,y)=>ip(v,x,y,Z);
  isoStage(root,defs,id,v,0,0,8,8);
  const lane=list=>{const p=list.map(([x,y])=>ip(v,x,y,.02));svg('path',{d:'M '+p.map(q=>q.x.toFixed(1)+' '+q.y.toFixed(1)).join(' L '),fill:'none',stroke:K.line2,'stroke-width':7,'stroke-linecap':'round','stroke-linejoin':'round'},root)};
  lane([[3.2,2.3],[4.6,2.3]]); lane([[5.8,2.3],[6.4,2.3]]); lane([[6.4,1.3],[6.4,3.3]]); lane([[6.4,1.3],[7.0,1.3]]); lane([[6.4,3.3],[7.0,3.3]]); lane([[2.3,3.2],[2.3,4.6]]);
  S.drop=svg('line',{x1:410,y1:302,x2:410,y2:396,stroke:K.line2,'stroke-width':3,'stroke-dasharray':'4 5'},root);
  // queries run under the boxes, so a box hides the query inside it
  const QG=svg('g',{},root);
  new IsoBox(root,v,M.teal).set(1.4,1.4,0,1.8,1.8,1.0);
  new IsoBox(root,v,M.cor).set(4.6,1.7,0,1.2,1.2,.8);
  isoCyl(root,v,7.0,1.3,0,.42,.9,M.blue); isoCyl(root,v,7.0,3.3,0,.42,.9,M.blue);
  isoCyl(root,v,2.3,5.4,0,.85,1.35,M.amb);
  S.tags=[[2.3,2.3,1.0,'API',K.teal,34],[5.2,2.3,.8,'REDIS',K.cor,34]].map(([x,y,z,l,c,lift])=>{const t=floatTag(root,l,{color:c,size:10.5,h:24});t._p=ip(v,x,y,z);t._lift=lift;return t});
  const side=(label,col,x,y,to)=>{const s=svg('g',{},root);svg('line',{x1:x,y1:y,x2:to.x,y2:to.y,stroke:col,'stroke-width':1.4,'stroke-dasharray':'3 4'},s);svg('circle',{cx:to.x,cy:to.y,r:3.5,fill:col},s);pill(s,x,y,label,{color:col,size:10.5,h:24});return s};
  S.sides=[side('PG READ REPLICAS',K.blue,704,470,ip(v,7.3,2.3,.6)),side('REDSHIFT',K.amb,196,470,ip(v,1.5,5.4,.8))];
  S.lat=pill(root,640,354,'~500 ms UNDER LOAD',{color:K.teal,size:11,h:26});
  const A={x:410,y:302}, top={x:410,y:ip(v,2.3,2.3,1.0).y};
  const r1=[A,top,g(3.2,2.3),g(5.2,2.3)], viaR=k=>[...r1,g(5.8,2.3),g(6.4,2.3),g(6.4,k?3.3:1.3),g(7.0,k?3.3:1.3)];
  const there=p=>p.concat(p.slice(0,-1).reverse());
  S.route={hit:there(r1),miss0:there(viaR(0)),miss1:there(viaR(1)),heavy:there([A,top,g(2.3,3.2),g(2.3,5.4)])};
  S.dur={hit:1.0,miss0:1.5,miss1:1.5,heavy:2.0};
  const Q=[[.5,'hit','k0'],[.62,'hit','k1'],[.74,'hit','k2'],[.9,'heavy','line'],[1.3,'miss0','bars']];
  const loop=['hit','hit','miss1','hit','heavy','hit','miss0','hit','hit','miss1','hit','heavy'];
  for(let t=3.2,i=0;t<6.9;t+=.3,i++) Q.push([t,loop[i%loop.length],null]);
  S.q=Q.map(([t,kind,w])=>({t,kind,w,ret:t+S.dur[kind],el:svg('circle',{r:kind==='heavy'?7:5,fill:kind==='heavy'?K.amb2:kind==='hit'?K.cor2:K.blue,stroke:'#FFFFFF','stroke-width':1.5},QG)}));
  S.when=k=>S.q.find(q=>q.w===k).ret;
  return S;
},
render(S,u){
  S.tags.forEach((t,i)=>t.at(t._p.x,t._p.y,t._lift,E.outBack(P(u,.3+i*.12,.6+i*.12))));
  S.sides.forEach((s,i)=>{const k=E.outCubic(P(u,.55+i*.15,.9+i*.15));op(s,k)});
  S.q.forEach(q=>{if(u<q.t||u>q.ret){op(q.el,0);return}
    let k=(u-q.t)/(q.ret-q.t); if(q.kind==='heavy') k=k<.4?k/.4*.5:k<.6?.5:.5+(k-.6)/.4*.5;
    C(q.el,polyAt(S.route[q.kind],k)); op(q.el,1)});
  S.kpi.forEach((t,i)=>{const r=S.when('k'+i);t.bar.setAttribute('width',(t.w*E.outCubic(P(u,r,r+.4))).toFixed(1));drawTo(t.spark,P(u,r,r+.5))});
  drawTo(S.line,E.inOutCubic(P(u,S.when('line'),S.when('line')+.9)));
  const rb=S.when('bars'); S.bars.forEach((b,j)=>{const h=Math.max(0,b.h*E.outBack(P(u,rb+j*.06,rb+.35+j*.06)));b.el.setAttribute('height',h.toFixed(1));b.el.setAttribute('y',(274-h).toFixed(1))});
  popAt(S.lat,640,354,E.outBack(P(u,5.2,5.55)));
}});

// =====================================================================
// The public API: a gate in the platform's wall; each client has its own lane
// =====================================================================
scene('api',{dur:7.4,
build(root,{defs,id}){
  const S={}, v=S.v=view(380,222,34);
  isoStage(root,defs,id,v,0,0,11,9);
  const path=list=>'M '+list.map(q=>q.x.toFixed(1)+' '+q.y.toFixed(1)).join(' L ');
  const lane=(list,col)=>{const p=list.map(([x,y])=>ip(v,x,y,.02));svg('path',{d:path(p),fill:'none',stroke:K.line2,'stroke-width':7,'stroke-linecap':'round','stroke-linejoin':'round'},root);
    return {p,lit:drawPath(svg('path',{d:path(p),fill:'none',stroke:col,'stroke-width':3,'stroke-linecap':'round','stroke-linejoin':'round'},root))}};
  S.web=lane([[3.3,1.4],[8.85,1.4],[8.85,2.6]],K.blue);
  S.cus=lane([[3.0,4.2],[7.3,4.2],[7.3,3.35],[8.0,3.35]],K.ind);
  S.mob=lane([[2.7,7.0],[4.5,7.0],[4.5,5.2],[7.3,5.2],[7.3,6.35],[8.0,6.35]],K.amb);
  // requests travel under the wall and the buildings, so they vanish into them
  const RG=svg('g',{},root);
  // the clients outside, behind the wall
  new IsoBox(root,v,M.white).set(2.4,.9,.55,.9,1.0,.08); new IsoBox(root,v,M.slate).set(2.75,1.25,0,.2,.3,.55);
  new IsoBox(root,v,M.blue).set(2.4,.9,.63,.07,1.0,.75);
  new IsoBox(root,v,M.ind).set(1.6,3.5,0,1.4,1.4,1.6);
  for(let i=0;i<3;i++) svg('polygon',{points:pts([[3.0,3.65,.3+i*.42],[3.0,4.75,.3+i*.42],[3.0,4.75,.52+i*.42],[3.0,3.65,.52+i*.42]].map(([x,y,z])=>ip(v,x,y,z))),fill:'#8C99DC'},root);
  new IsoBox(root,v,M.slate).set(2.4,6.62,0,.3,.76,1.25);
  svg('polygon',{points:pts([[2.7,6.69,.12],[2.7,7.31,.12],[2.7,7.31,1.13],[2.7,6.69,1.13]].map(([x,y,z])=>ip(v,x,y,z))),fill:K.amb2},root);
  // the wall, with the old small door for the web UI and the new gate
  const WM={top:'#EFE6D6',left:'#DCCFB8',right:'#CBBBA0'};
  new IsoBox(root,v,WM).set(5.5,0,0,.4,1.1,1.8);
  new IsoBox(root,v,M.blue).set(5.45,1.1,1.4,.5,.6,.4);
  new IsoBox(root,v,WM).set(5.5,1.7,0,.4,1.8,1.8);
  S.gate=new IsoBox(root,v,M.slate);
  new IsoBox(root,v,M.teal).set(5.45,3.5,1.45,.5,2.4,.36);
  new IsoBox(root,v,WM).set(5.5,5.9,0,.4,3.1,1.8);
  // the modules inside
  S.mods=[new IsoBox(root,v,M.teal).set(8.0,2.6,0,1.7,1.5,1.1),new IsoBox(root,v,M.teal).set(8.0,5.6,0,1.7,1.5,1.1)];
  S.flash=S.mods.map(m=>svg('polygon',{points:m.T.getAttribute('points'),fill:'#FFFFFF',opacity:0},root));
  const tag=(x,y,z,l,c,lift)=>{const t=floatTag(root,l,{color:c,size:10,h:24});t._p=ip(v,x,y,z);t._lift=lift;return t};
  S.tags=[tag(2.4,1.4,1.38,'WEB UI',K.blue,30),tag(2.3,4.2,1.6,'CUSTOMER SYSTEM',K.ind,34),tag(2.55,7.0,1.25,'MOBILE APP',K.amb,34),
          tag(8.85,3.35,1.1,'PRODUCTION PLANNING',K.teal,34),tag(8.85,6.35,1.1,'ORDER FULFILMENT',K.teal,34)];
  S.gateTag=floatTag(root,'PUBLIC REST API',{color:K.teal,size:11,h:26}); S.gateP=ip(v,5.7,4.7,1.81);
  S.no=[0,1].map(()=>pill(root,0,0,'✕',{color:K.cor,size:13,pad:8,h:26}));
  S.rq=[];
  for(let i=0;i<6;i++){S.rq.push({t:3.3+i*.55,L:S.cus,col:K.ind2,mod:0});S.rq.push({t:3.55+i*.55,L:S.mob,col:K.amb2,mod:1})}
  S.rq.forEach(r=>{r.el=svg('circle',{r:5.5,fill:r.col,stroke:'#FFFFFF','stroke-width':1.5},RG);r.ok=svg('circle',{r:4.5,fill:K.teal2,stroke:'#FFFFFF','stroke-width':1.2},RG)});
  S.blk=[{t:.6,L:S.cus,col:K.ind2,wy:4.2},{t:.95,L:S.mob,col:K.amb2,wy:5.2}].map(b=>Object.assign(b,{el:svg('circle',{r:5.5,fill:b.col,stroke:'#FFFFFF','stroke-width':1.5},root)}));
  S.blk.forEach(b=>{const n=b.L===S.cus?2:4;b.path=b.L.p.slice(0,n).concat([ip(v,5.35,b.wy,.02)])});
  S.webq=[0,1,2].map(i=>({el:svg('circle',{r:4.5,fill:K.blue,stroke:'#FFFFFF','stroke-width':1.2},RG),off:i/3}));
  return S;
},
render(S,u){
  const OPEN=2.4, g=E.inOutCubic(P(u,OPEN,OPEN+.6)), gh=1.45*(1-g);
  S.gate.set(5.52,3.5,0,.36,2.4,Math.max(.001,gh)); S.gate.show(gh>.01);
  S.tags.forEach((t,i)=>t.at(t._p.x,t._p.y,t._lift,E.outBack(P(u,.2+i*.1,.5+i*.1))));
  S.gateTag.at(S.gateP.x,S.gateP.y,44,E.outBack(P(u,OPEN+.3,OPEN+.65)));
  drawTo(S.web.lit,E.inOutCubic(P(u,.3,.9)));
  S.webq.forEach(p=>{if(u<.9){op(p.el,0);return}const ph=(u*.45+p.off)%1;C(p.el,polyAt(S.web.p,ph));op(p.el,Math.sin(Math.PI*ph))});
  // before the gate opens, requests stop at the wall
  S.blk.forEach((b,i)=>{const hit=b.t+.7;
    if(u<b.t||u>hit+.5) op(b.el,0);
    else if(u<hit){C(b.el,polyAt(b.path,E.inCubic(P(u,b.t,hit))));op(b.el,1)}
    else{const q=E.outCubic(P(u,hit,hit+.5));C(b.el,polyAt(b.path,1-.2*q));op(b.el,1-q)}
    const wp=ip(S.v,5.35,b.wy,.6), k=E.outBack(P(u,hit,hit+.2))*(1-P(u,hit+.6,hit+.8));
    S.no[i].setAttribute('transform',`translate(${(wp.x-22).toFixed(1)} ${(wp.y-20).toFixed(1)}) scale(${Math.max(.001,k).toFixed(3)})`);op(S.no[i],k)});
  drawTo(S.cus.lit,E.inOutCubic(P(u,OPEN+.6,OPEN+1.2))); drawTo(S.mob.lit,E.inOutCubic(P(u,OPEN+.75,OPEN+1.35)));
  const lastIn=[-9,-9];
  S.rq.forEach(r=>{const a=r.t,b=r.t+1.0,c=b+.8;
    if(u>=b) lastIn[r.mod]=Math.max(lastIn[r.mod],b);
    if(u<a||u>c){op(r.el,0);op(r.ok,0);return}
    if(u<b){C(r.el,polyAt(r.L.p,E.inOutCubic(P(u,a,b))));op(r.el,1);op(r.ok,0)}
    else{op(r.el,0);C(r.ok,polyAt(r.L.p,1-E.inOutCubic(P(u,b,c))));op(r.ok,1)}});
  S.flash.forEach((f,m)=>op(f,.5*(1-P(u,lastIn[m],lastIn[m]+.35))));
}});

// =====================================================================
// CI: the pipeline from two hours to 49 minutes, then test-database setup from 16 minutes to 6 seconds
// =====================================================================
scene('ci',{dur:7.4,
build(root,{defs,id}){
  const S={};
  const A=svg('g',{},root);
  card(A,defs,id,70,56,680,270);
  txt(A,96,94,'AUTOMATED TESTS · EVERY CHANGE',{'font-size':12,'letter-spacing':2,fill:K.ink2,'font-weight':700});
  const X=S.XA=m=>120+m/120*480;
  svg('line',{x1:120,y1:258,x2:600,y2:258,stroke:K.line2,'stroke-width':2},A);
  [0,30,60,90,120].forEach(m=>{svg('line',{x1:X(m),y1:252,x2:X(m),y2:264,stroke:K.line2,'stroke-width':2},A);txt(A,X(m),286,m===0?'0':m%60===0?`${m/60} h`:`${Math.floor(m/60)?Math.floor(m/60)+' h ':''}30 min`,{'text-anchor':'middle','font-size':11,fill:K.mute})});
  svg('rect',{x:120,y:166,width:480,height:44,rx:10,fill:K.scrLn},A);
  S.barA=svg('rect',{x:120,y:166,width:0,height:44,rx:10,fill:K.cor2},A);
  S.labA=txt(A,0,197,'',{'font-size':22,'font-weight':850,fill:K.cor,'font-family':FONT_UI});
  S.cups=[0,1,2,3,4,5].map(i=>{const g=svg('g',{},A),x=560+i*26;svg('path',{d:`M ${x} 80 h 18 l -2.5 20 h -13 Z`,fill:'#FFFFFF',stroke:K.line2,'stroke-width':1.2},g);svg('rect',{x:x+1,y:86,width:16,height:4,fill:K.cor2},g);return g});
  const B=svg('g',{},root);
  card(B,defs,id,70,362,680,290);
  txt(B,96,400,'TEST DATABASE START-UP · 4 PARALLEL RUNS',{'font-size':12,'letter-spacing':2,fill:K.ink2,'font-weight':700});
  const XB=S.XB=m=>200+m/16*480;
  S.shards=[0,1,2,3].map(i=>{const y=426+i*44;txt(B,96,y+19,`run ${i+1}`,{'font-size':12,fill:K.ink2,'font-weight':600});
    svg('rect',{x:200,y,width:480,height:28,rx:8,fill:K.scrLn},B);
    return {bar:svg('rect',{x:200,y,width:0,height:28,rx:8,fill:K.ind2},B),lab:txt(B,0,y+19,'',{'font-size':13,'font-weight':800,fill:K.cor,'font-family':FONT_UI})}});
  [0,4,8,12,16].forEach(m=>txt(B,XB(m),632,`${m} min`,{'text-anchor':'middle','font-size':10.5,fill:K.mute}));
  return S;
},
render(S,u){
  // the whole run: two hours, then 49 minutes
  const after=u>3.6, mA=u<3.4?120*E.inOutCubic(P(u,.3,1.7)):lerp(120,49,E.inOutCubic(P(u,3.6,4.5)));
  S.barA.setAttribute('width',(S.XA(mA)-120).toFixed(1)); S.barA.setAttribute('fill',after?K.teal2:K.cor2);
  const hh=Math.floor(mA/60), mm=Math.round(mA%60);
  S.labA.textContent=mA>=60?`${hh} h ${String(mm).padStart(2,'0')}`:`${Math.round(mA)} min`;
  S.labA.setAttribute('x',(S.XA(mA)+14).toFixed(1)); S.labA.setAttribute('fill',after?K.teal:K.cor); op(S.labA,P(u,.35,.5));
  S.cups.forEach((c,i)=>{const t=.4+i*.22;op(c,E.outBack(P(u,t,t+.2))*(i===0?1:1-P(u,3.9,4.3)))});
  // each shard's database setup: 16 minutes, then 6 seconds
  S.shards.forEach((s,i)=>{const m=u<4.9?16*E.inOutCubic(P(u,1.9+i*.12,2.7+i*.12)):lerp(16,.1,E.inOutCubic(P(u,5.0+i*.1,5.6+i*.1)));
    s.bar.setAttribute('width',Math.max(0,S.XB(m)-200).toFixed(1)); s.bar.setAttribute('fill',u>5.0?K.teal2:K.ind2);
    s.lab.textContent=u>5.0&&m<1?'6 s':`${Math.round(m)} min`; s.lab.setAttribute('x',(S.XB(m)+12).toFixed(1)); s.lab.setAttribute('fill',u>5.0?K.teal:K.cor); op(s.lab,P(u,1.95+i*.12,2.1+i*.12))});
}});

// =====================================================================
// Permissions, platform-wide: a role opened a whole tenant; now every resource has its own policy
// =====================================================================
scene('access',{dur:7.6,
build(root,{defs,id}){
  const S={};
  S.old=pill(root,222,52,'ROLE-BASED CHECKS',{color:K.cor,size:12,h:32});
  S.strike=drawPath(svg('line',{x1:222-S.old._w/2+12,y1:52,x2:222+S.old._w/2-12,y2:52,stroke:K.cor,'stroke-width':3,'stroke-linecap':'round'},root));
  txt(root,410,59,'→',{'text-anchor':'middle','font-size':24,fill:K.mute});
  S.neu=pill(root,598,52,'PER-RESOURCE POLICIES',{color:K.teal,size:12,h:32});
  const P0=svg('g',{},root);
  card(P0,defs,id,24,96,772,450,{rx:18});
  txt(P0,48,128,'PLATFORM · EVERY TENANT',{'font-size':11,'letter-spacing':2,'font-weight':600});
  const COLS=['RECIPES','STOCK','ORDERS','REPORTS','SETTINGS'], IC=['book','box','cart','chart','cog'], CX=S.CX=[262,370,478,586,694], RY=S.RY=[216,290,364,438];
  S.heads=COLS.map((c,j)=>{const g=svg('g',{},P0);const ic=svg('g',{transform:`translate(${CX[j]} 152)`},g);ICON[IC[j]](ic,K.ind);txt(g,CX[j],184,c,{'text-anchor':'middle','font-size':LANG==='de'?9:10,'letter-spacing':.6,fill:K.ink2,'font-weight':600});
    const ok=badge(root,9,K.teal,b=>svg('path',{d:'M -4 0 l 2.6 2.6 l 5 -5',fill:'none',stroke:K.teal,'stroke-width':2.2,'stroke-linecap':'round'},b),{fill:K.tealLL});return {ok}});
  RY.forEach((y,i)=>txt(P0,48,y+5,`TENANT ${i+1}`,{'font-size':11,'letter-spacing':1.2,fill:K.ink2,'font-weight':600}));
  S.cells=RY.map((y,i)=>CX.map((x,j)=>{const g=svg('g',{},root);
    const box=svg('rect',{x:x-42,y:y-26,width:84,height:52,rx:12,fill:K.card2,stroke:K.line,'stroke-width':1.5},g);
    const kg=svg('g',{transform:`translate(${x} ${y})`},g); ICON.key(kg,K.amb);
    const sg=svg('g',{transform:`translate(${x} ${y})`},g); ICON.shield(sg,K.teal); op(sg,0);
    const ok=txt(g,x+30,y-10,'✓',{'font-size':14,'font-weight':800,fill:K.teal,'font-family':FONT_UI,opacity:0});
    const no=txt(g,x+30,y-10,'✕',{'font-size':13,'font-weight':800,fill:K.cor,'font-family':FONT_UI,opacity:0});
    return {g,box,kg,sg,ok,no}}));
  S.band=svg('rect',{x:0,y:190,width:96,height:276,rx:14,fill:K.teal2,opacity:0},root);
  S.row=svg('rect',{x:34,y:RY[1]-32,width:752,height:64,rx:14,fill:'none',stroke:K.cor,'stroke-width':2.5,opacity:0},root);
  // the access card that asks
  S.cardTok=svg('g',{},root); svg('rect',{x:-18,y:-12,width:36,height:24,rx:5,fill:'#FFFFFF',stroke:K.ink2,'stroke-width':2},S.cardTok); svg('rect',{x:-18,y:-12,width:36,height:7,rx:3,fill:K.ink2},S.cardTok);
  txt(root,48,592,'ROLLOUT',{'font-size':11,'letter-spacing':2,fill:K.mute,'font-weight':700});
  svg('rect',{x:140,y:580,width:560,height:14,rx:7,fill:K.line},root);
  S.roll=svg('rect',{x:140,y:580,width:0,height:14,rx:7,fill:K.teal2},root);
  S.aon=pill(root,410,648,'ALL OR NOTHING',{color:K.cor,size:11.5,h:28});
  S.every=pill(root,410,648,'EVERY TENANT · EVERY RESOURCE',{color:K.teal,size:11.5,h:28});
  S.CHECK=[4.8,5.15,5.5,5.85,6.2]; S.ALLOW=[1,1,1,0,0]; S.WAVE=j=>2.6+j*.34;
  return S;
},
render(S,u){
  const W=S.WAVE, flash=E.outCubic(P(u,.9,1.1))*(1-E.inCubic(P(u,1.9,2.2)));
  op(S.row,flash); popAt(S.aon,410,648,E.outBack(P(u,1.1,1.4))*(1-P(u,2.0,2.25)));
  drawTo(S.strike,E.inOutCubic(P(u,2.3,2.6))); op(S.old,1-.55*P(u,2.5,2.8)); popAt(S.neu,598,52,E.outBack(P(u,2.5,2.85)));
  const bx=lerp(180,780,P(u,W(0)-.3,W(4)+.3)); S.band.setAttribute('x',(bx-48).toFixed(1)); op(S.band,u>W(0)-.3&&u<W(4)+.3?.12:0);
  S.roll.setAttribute('width',(560*E.inOutCubic(P(u,W(0)-.2,W(4)+.3))).toFixed(1));
  S.heads.forEach((h,j)=>{const k=E.outBack(P(u,W(j)+.2,W(j)+.45));h.ok.setAttribute('transform',`translate(${S.CX[j]+30} 150) scale(${Math.max(.001,k).toFixed(3)})`);op(h.ok,k)});
  S.cells.forEach((row,i)=>row.forEach((c,j)=>{
    const k=E.inOutCubic(P(u,W(j),W(j)+.25)); op(c.kg,1-k); op(c.sg,k);
    let fill=K.card2, stroke=K.line, dx=0;
    if(i===1&&flash>0){fill=K.ambLL;stroke=K.amb}
    if(k>0&&k<1) stroke=K.teal2;
    if(i===1){const t=S.CHECK[j], q=P(u,t,t+.2);
      if(q>0){if(S.ALLOW[j]){fill=K.tealLL;stroke=K.teal;op(c.ok,q);op(c.no,0)}else{stroke=q<1?K.cor:K.line;dx=4*Math.sin(u*60)*(1-P(u,t+.1,t+.35));op(c.no,q);op(c.ok,0)}}
      else{op(c.ok,0);op(c.no,0)}}
    c.box.setAttribute('fill',fill); c.box.setAttribute('stroke',stroke); c.g.setAttribute('transform',`translate(${dx.toFixed(1)} 0)`);
  }));
  // the card: first against the whole row, then resource by resource
  let cx=150, vis=0;
  if(u>.6&&u<2.2){vis=E.outCubic(P(u,.6,.85))*(1-P(u,1.95,2.2));cx=lerp(150,S.CX[2],E.inOutCubic(P(u,.7,1.0)))}
  if(u>4.5&&u<6.7){vis=E.outCubic(P(u,4.5,4.7))*(1-P(u,6.45,6.7));let j=0;S.CHECK.forEach((t,k)=>{if(u>=t-.2)j=k});cx=lerp(j?S.CX[j-1]:150,S.CX[j],E.inOutCubic(P(u,S.CHECK[j]-.25,S.CHECK[j])))}
  S.cardTok.setAttribute('transform',`translate(${cx.toFixed(1)} ${S.RY[1]+44})`); op(S.cardTok,vis);
  popAt(S.every,410,648,E.outBack(P(u,6.6,6.95)));
}});
