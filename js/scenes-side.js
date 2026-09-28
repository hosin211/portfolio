'use strict';
/* Own systems: The Two Rivers (a university ERP) and KMS (two power plants), in isometric motion graphics */

// grow a part out of the ground: squash it into its base point, then let it rise
const riseAt=(el,p,k)=>{el.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) scale(1 ${Math.max(.001,k).toFixed(4)}) translate(${(-p.x).toFixed(1)} ${(-p.y).toFixed(1)})`);op(el,clamp(k*3))};
const tri=t=>{const m=((t%2)+2)%2;return m<1?m:2-m};      // 0→1→0, forever: a bounce between two walls

// =====================================================================
// Al-Nahrain University: the system started in one college, Information Engineering,
// and spread down the campus streets until every college ran on it
// =====================================================================
scene('university',{dur:8.2,
build(root,{defs,id}){
  const S={}, v=S.v=view(410,164,28), P3=(x,y,z=0)=>ip(v,x,y,z);
  S.head=pill(root,410,58,'AL-NAHRAIN UNIVERSITY · BAGHDAD',{color:K.ink2,bg:'#FFFFFF',size:11,h:28});
  isoStage(root,defs,id,v,0,0,12,12);
  const quad=(x0,y0,x1,y1,z,attrs)=>svg('polygon',Object.assign({points:pts([P3(x0,y0,z),P3(x1,y0,z),P3(x1,y1,z),P3(x0,y1,z)])},attrs),root);
  // streets, and the lawn in the middle
  [4,8].forEach(c=>{quad(c-.32,0,c+.32,12,.004,{fill:'#E7E0D3'});quad(0,c-.32,12,c+.32,.004,{fill:'#E7E0D3'})});
  quad(4.4,4.4,7.6,7.6,.006,{fill:'#DCE8D3'});
  isoDisc(root,v,6,6,.01,.55,{fill:'#C9DFEC',stroke:'#FFFFFF','stroke-width':2});
  [[5,5],[7,5],[5,7],[7,7],[6,4.9],[4.9,6]].forEach(([x,y])=>{isoCyl(root,v,x,y,0,.08,.3,M.wood);const t=P3(x,y,.3),e=isoR(v,.36);svg('ellipse',{cx:t.x,cy:t.y-7,rx:e.rx*.85,ry:e.rx*.66,fill:'#86B38C'},root)});
  // the light that spreads along the streets from where it started
  const NODES={}, key=(x,y)=>x+','+y;
  const SEG=[[[4,0],[4,4]],[[4,4],[4,6]],[[4,6],[4,8]],[[4,8],[4,12]],[[8,0],[8,4]],[[8,4],[8,8]],[[8,8],[8,12]],
             [[0,4],[4,4]],[[4,4],[8,4]],[[8,4],[12,4]],[[0,8],[4,8]],[[4,8],[8,8]],[[8,8],[12,8]]];
  SEG.forEach(([a,b])=>{NODES[key(...a)]=1e9;NODES[key(...b)]=1e9}); NODES[key(4,6)]=0;
  for(let k=0;k<20;k++) SEG.forEach(([a,b])=>{const l=Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]),A=key(...a),B=key(...b);NODES[B]=Math.min(NODES[B],NODES[A]+l);NODES[A]=Math.min(NODES[A],NODES[B]+l)});
  const LG=svg('g',{},root);
  S.light=SEG.flatMap(([a,b])=>{const l=Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
    return [[a,b],[b,a]].map(([p,q])=>{const pp=P3(p[0],p[1],.01),qq=P3(q[0],q[1],.01);const el=drawPath(svg('path',{d:`M ${pp.x.toFixed(1)} ${pp.y.toFixed(1)} L ${qq.x.toFixed(1)} ${qq.y.toFixed(1)}`,stroke:K.teal2,'stroke-width':3.2,'stroke-linecap':'round',fill:'none'},LG));return {el,d0:NODES[key(...p)],l}})});
  // the colleges; distance along the streets from Information Engineering decides when each one joins
  const COL=[
    {i:0,j:1,icon:'chip',c:K.teal2,h:1.5,w:2.5,d:2.5,door:[4,6],ie:1},
    {i:0,j:0,icon:'cross',c:K.cor2,h:2.1,w:2.6,d:2.3,door:[4,2],lag:0},
    {i:1,j:0,icon:'gear',c:K.ind2,h:1.3,w:2.9,d:2.1,door:[6,4],lag:.25},
    {i:0,j:2,icon:'scales',c:K.rose,h:1.15,w:2.7,d:2.3,door:[4,10],lag:.5},
    {i:1,j:2,icon:'chart',c:'#6FA37B',h:1.75,w:2.3,d:2.7,door:[6,8],lag:.75},
    {i:2,j:0,icon:'flask',c:K.blue,h:1.6,w:2.3,d:2.5,door:[8,2],lag:0},
    {i:2,j:1,icon:'globe',c:K.amb2,h:1.25,w:2.5,d:2.5,door:[8,6],lag:.3},
    {i:2,j:2,icon:'capsule',c:'#8E7CC3',h:1.45,w:2.5,d:2.3,door:[8,10],lag:.6}];
  const dist=([x,y])=>{let best=1e9;SEG.forEach(([a,b])=>{const onx=a[0]===b[0]&&a[0]===x&&y>=Math.min(a[1],b[1])&&y<=Math.max(a[1],b[1]), ony=a[1]===b[1]&&a[1]===y&&x>=Math.min(a[0],b[0])&&x<=Math.max(a[0],b[0]);
    if(onx||ony){const da=NODES[key(...a)]+Math.abs(a[0]-x)+Math.abs(a[1]-y), db=NODES[key(...b)]+Math.abs(b[0]-x)+Math.abs(b[1]-y);best=Math.min(best,da,db)}});return best};
  S.L0=1.6; S.SPD=.28;
  const DORM={top:'#EFEBE3',left:'#E2DCD0',right:'#D3CBBB'};
  COL.sort((a,b)=>(a.i+a.j)-(b.i+b.j)).forEach(c=>{
    const cx=4*c.i+2, cy=4*c.j+2, x0=cx-c.w/2, y0=cy-c.d/2, g=svg('g',{},root);
    c.at=c.ie?1.0:S.L0+dist(c.door)*S.SPD+c.lag;
    c.zone=svg('polygon',{points:pts([P3(4*c.i+.45,4*c.j+.45,.012),P3(4*c.i+3.55,4*c.j+.45,.012),P3(4*c.i+3.55,4*c.j+3.55,.012),P3(4*c.i+.45,4*c.j+3.55,.012)]),fill:'none',stroke:c.c,'stroke-width':1.6,'stroke-dasharray':'5 5',opacity:0},root);
    c.g=g; c.base=P3(cx,cy+c.d/2,0);
    new IsoBox(g,v,DORM).set(x0,y0,0,c.w,c.d,c.h);
    c.win=[];
    for(let z=.32;z<c.h-.25;z+=.42){
      for(let x=x0+.28;x<x0+c.w-.3;x+=.55) c.win.push(svg('polygon',{points:pts([P3(x,y0+c.d,z),P3(x+.28,y0+c.d,z),P3(x+.28,y0+c.d,z+.22),P3(x,y0+c.d,z+.22)]),fill:'#D6CFC2'},g));
      for(let y=y0+.28;y<y0+c.d-.3;y+=.55) c.win.push(svg('polygon',{points:pts([P3(x0+c.w,y,z),P3(x0+c.w,y+.28,z),P3(x0+c.w,y+.28,z+.22),P3(x0+c.w,y,z+.22)]),fill:'#CCC4B6'},g));
    }
    c.roof=new IsoBox(g,v,mat(c.c)).set(x0,y0,c.h,c.w,c.d,.12); op(c.roof.g,0);
    c.badge=badge(root,15,c.c.startsWith('#')?c.c:K.teal,b=>ICON[c.icon](b,c.c),{fill:'#FFFFFF'});
    c.top=P3(cx,cy,c.h+.12);
    c.ring=isoDisc(root,v,cx,cy,.02,1.2,{fill:'none',stroke:c.c,'stroke-width':2,opacity:0}); c.ringC=P3(cx,cy,.02);
  });
  S.col=COL; S.ie=COL.find(c=>c.ie);
  // where it started
  // the card sits off the campus, top left, so it never covers a college
  const lab=S.lab=svg('g',{},root), lt=S.ie.top;
  const L1=LX('WHERE IT STARTED'), L2='INFORMATION ENGINEERING · 2023', wl=Math.max(L1.length*(fsz(9.5)*.61+1.4),L2.length*(fsz(10.5)*.61+1))+30, cx0=26+wl/2, cy0=100;
  svg('path',{d:`M ${cx0+wl/2-40} ${cy0+23} L ${lt.x} ${lt.y-40}`,stroke:K.teal,'stroke-width':1.5,'stroke-opacity':.6,fill:'none','stroke-dasharray':'3 4'},lab);
  svg('circle',{cx:lt.x,cy:lt.y-40,r:3,fill:K.teal},lab);
  svg('rect',{x:cx0-wl/2,y:cy0-23,width:wl,height:46,rx:12,fill:'#FFFFFF',stroke:K.teal,'stroke-width':1.6},lab);
  txt(lab,cx0,cy0-5,L1,{'text-anchor':'middle','font-size':9.5,'letter-spacing':1.4,fill:K.mute,'font-weight':600});
  txt(lab,cx0,cy0+13,L2,{'text-anchor':'middle','font-size':10.5,'letter-spacing':1,fill:K.teal,'font-weight':750});
  // one college, then every college
  S.one=pill(root,410,552,'1 COLLEGE',{color:K.teal,size:12,h:30});
  S.all=pill(root,410,552,'EVERY COLLEGE · ONE SYSTEM',{color:K.teal,size:12,h:30});
  const MODS=[['STUDENTS','cap'],['STAFF','person'],['FEES','card'],['PAYROLL','note'],['RESEARCH','book'],['DOCUMENTS','doc'],['DASHBOARDS','chart']];
  const chips=MODS.map(([l,ic])=>iconChip(root,0,0,l,ic,{color:K.ind,size:LANG==='de'?9:9.5,h:28}));
  // one row if it fits, otherwise two centred rows
  const widthOf=list=>list.reduce((a,c)=>a+c._w,0)+(list.length-1)*8;
  const rows=widthOf(chips)>780?[chips.slice(0,4),chips.slice(4)]:[chips];
  S.mods=rows.flatMap((row,r)=>{let x=410-widthOf(row)/2;const y=rows.length>1?604+r*40:616;
    return row.map(c=>{const cx=x+c._w/2;x+=c._w+8;c.setAttribute('transform',`translate(${cx.toFixed(1)} ${y})`);return {el:c,cx,y}})});
  return S;
},
render(S,u){
  const v=S.v;
  popAt(S.head,410,58,E.outBack(P(u,0,.3)));
  const tau=(u-S.L0)/S.SPD;
  S.light.forEach(L=>drawTo(L.el,(tau-L.d0)/L.l));
  S.col.forEach((c,k)=>{
    riseAt(c.g,c.base,E.outBack(P(u,.1+k*.07,.5+k*.07)));
    const a=E.outCubic(P(u,c.at,c.at+.35));
    op(c.roof.g,a); c.win.forEach((w,j)=>w.setAttribute('fill',u>c.at+.05+(j%5)*.04?'#F4C979':'#D6CFC2'));
    const bk=E.outBack(P(u,c.at+.1,c.at+.4)); c.badge.setAttribute('transform',`translate(${c.top.x.toFixed(1)} ${(c.top.y-24).toFixed(1)}) scale(${Math.max(.001,bk).toFixed(3)})`); op(c.badge,clamp(bk));
    op(c.zone,.7*P(u,c.at+.2,c.at+.5));
    const rk=P(u,c.at,c.at+.8), rc=c.ringC; c.ring.setAttribute('transform',`translate(${rc.x.toFixed(1)} ${rc.y.toFixed(1)}) scale(${(.5+rk).toFixed(3)}) translate(${(-rc.x).toFixed(1)} ${(-rc.y).toFixed(1)})`); op(c.ring,rk>0&&rk<1?.8*(1-rk):0);
  });
  const lk=E.outBack(P(u,1.2,1.5)); op(S.lab,clamp(lk)); S.lab.setAttribute('transform',`translate(0 ${((1-clamp(lk))*10).toFixed(1)})`);
  const last=Math.max(...S.col.map(c=>c.at));
  popAt(S.one,410,552,E.outBack(P(u,1.3,1.6))*(1-P(u,last+.3,last+.45)));
  popAt(S.all,410,552,E.outBack(P(u,last+.45,last+.8)));
  S.mods.forEach((m,k)=>{const t=last+.9+k*.13,q=E.outBack(P(u,t,t+.3));m.el.setAttribute('transform',`translate(${m.cx.toFixed(1)} ${(m.y+(1-clamp(q))*14).toFixed(1)}) scale(${Math.max(.001,q).toFixed(3)})`);op(m.el,clamp(q))});
}});

// =====================================================================
// Keppt: two combined-cycle power plants, 200+ engineers each, each with its own copy of KMS,
// and KMS runs every part of the plant
// =====================================================================
scene('plants',{dur:8.8,
build(root,{defs,id}){
  const S={}, V=[view(185,142,20),view(567,142,20)];
  S.head=pill(root,410,40,'KEPPT · TWO COMBINED-CYCLE POWER PLANTS',{color:K.ink2,bg:'#FFFFFF',size:11,h:28});
  S.P=V.map((v,pi)=>{
    const m=plantModel(root,defs,id+'p'+pi,v);
    const g=svg('g',{},root), base=ip(v,6.7,7.1,0);
    new IsoBox(g,v,M.slate).set(6.2,6.1,0,1.0,1.0,1.35);
    const leds=[.35,.65,.95].map(z=>{const p=ip(v,7.2,6.45,z);return svg('rect',{x:p.x-1,y:p.y-5,width:10,height:3,rx:1.5,fill:K.devLed},g)});
    const scr=svg('polygon',{points:pts([ip(v,6.3,7.1,.2),ip(v,7.1,7.1,.2),ip(v,7.1,7.1,1.2),ip(v,6.3,7.1,1.2)]),fill:'#20283A'},g);
    const kms=floatTag(root,'KMS',{color:K.teal,size:11,h:26});
    const mw=floatTag(root,pi?'650 MW':'730 MW',{color:K.amb,size:11,h:26});
    // 20 figures, one for every ten engineers
    const cx=pi?601:219, figs=[];
    for(let r=0;r<2;r++)for(let c=0;c<10;c++){const x=cx-72+c*16,y=380+r*22,f=svg('g',{},root);
      svg('circle',{cx:x,cy:y-8,r:3.6},f); svg('path',{d:`M ${x-5.5} ${y+4} q 0 -7.5 5.5 -7.5 q 5.5 0 5.5 7.5 Z`},f); f.setAttribute('fill','#D6CFC2'); figs.push(f)}
    const eng=pill(root,cx,432,'200+ ENGINEERS',{color:K.ind,size:10.5,h:26});
    return {v,m,g,base,leds,scr,kms,mw,figs,eng,top:ip(v,6.7,6.6,1.35)};
  });
  S.copy=pill(root,410,474,'EACH PLANT RUNS ITS OWN COPY OF KMS',{color:K.teal,size:10.5,h:28});
  S.every=txt(root,410,518,'EVERY PART OF THE PLANT',{'text-anchor':'middle','font-size':10.5,'letter-spacing':2,fill:K.mute,'font-weight':600});
  const MODS=[['MAINTENANCE','wrench'],['SAFETY PERMITS','shield'],['SHIFTS','clock'],['EQUIPMENT · KKS','tag'],
              ['STORES','box'],['PURCHASING','cart'],['FINANCE','note'],['HR','person'],
              ['QUALITY · ISO','doc'],['IT ASSETS','chip'],['DASHBOARDS','chart'],['AI · MCP','spark']];
  S.mods=MODS.map(([l,ic],k)=>{const x=125+(k%4)*190, y=552+Math.floor(k/4)*40;const c=iconChip(root,0,0,l,ic,{color:K.amb,size:9.5,h:28});c.setAttribute('transform',`translate(${x} ${y})`);return {el:c,x,y}});
  return S;
},
render(S,u){
  popAt(S.head,410,40,E.outBack(P(u,0,.3)));
  S.P.forEach((p,pi)=>{
    p.m.parts.forEach((q,i)=>riseAt(q.g,q.base,E.outBack(P(u,.1+pi*.15+i*.08,.5+pi*.15+i*.08))));
    riseAt(p.g,p.base,E.outBack(P(u,1.6+pi*.15,1.95+pi*.15)));
    p.leds.forEach((l,i)=>l.setAttribute('fill',u>2.0&&Math.floor(u*4+i*1.7+pi)%3!==0?K.teal2:K.devLed));
    p.scr.setAttribute('fill',u>2.0?K.teal:'#20283A'); op(p.scr,u>2.0?.55+.2*Math.sin(u*3+pi):1);
    p.kms.at(p.top.x,p.top.y,30,E.outBack(P(u,2.0+pi*.12,2.3+pi*.12)));
    const st=p.m.stackTop; p.mw.at(st.x,st.y,28,E.outBack(P(u,1.3+pi*.12,1.6+pi*.12)));
    p.figs.forEach((f,i)=>{const t=2.4+(i*2+pi)*.042, k=E.outBack(P(u,t,t+.25));f.setAttribute('fill',k>.05?K.ind2:'#D6CFC2');f.setAttribute('transform',`translate(0 ${((1-clamp(k))*6).toFixed(1)})`);op(f,.35+.65*clamp(k))});
    popAt(p.eng,pi?601:219,432,E.outBack(P(u,4.2+pi*.1,4.5+pi*.1)));
  });
  popAt(S.copy,410,474,E.outBack(P(u,4.7,5.0)));
  op(S.every,P(u,5.1,5.4));
  S.mods.forEach((m,k)=>{const t=5.3+k*.14,q=E.outBack(P(u,t,t+.3));m.el.setAttribute('transform',`translate(${m.x} ${(m.y+(1-clamp(q))*12).toFixed(1)}) scale(${Math.max(.001,q).toFixed(3)})`);op(m.el,clamp(q))});
}});

// =====================================================================
// KMS: two power plants. A work order on live equipment: lockout, permit, the job, closed
// =====================================================================
function plantModel(g,defs,id,v){
  const parts=[], part=(base)=>{const pg=svg('g',{},g);parts.push({g:pg,base:ip(v,base[0],base[1],0)});return pg};
  isoStage(g,defs,id,v,0,0,12,8);
  // gas turbine hall
  let p=part([3.1,3.0]); new IsoBox(p,v,M.cream).set(1.0,1.0,0,4.2,2.0,1.6); new IsoBox(p,v,M.teal).set(1.0,1.0,1.6,4.2,.35,.12);
  for(let i=0;i<4;i++) svg('polygon',{points:pts([[1.4+i*.95,3.0,.55],[1.95+i*.95,3.0,.55],[1.95+i*.95,3.0,1.15],[1.4+i*.95,3.0,1.15]].map(([x,y,z])=>ip(v,x,y,z))),fill:'#D5DCE4'},p);
  // heat recovery boiler and its stack
  p=part([6.7,2.0]); new IsoBox(p,v,M.white).set(5.6,1.1,0,2.2,1.8,2.8);
  p=part([8.4,2.0]); const st=isoCyl(p,v,8.4,2.0,0,.36,4.6,M.cream); isoCyl(p,v,8.4,2.0,4.1,.365,.5,M.cor);
  // steam turbine hall
  p=part([2.6,5.0]); new IsoBox(p,v,M.cream).set(1.0,4.0,0,3.2,2.0,1.3); new IsoBox(p,v,M.ind).set(1.0,4.0,1.3,3.2,.3,.1);
  // transformers
  p=part([5.9,4.7]); [[5.2,4.4],[6.3,4.4]].forEach(([x,y])=>{new IsoBox(p,v,M.slate).set(x,y,0,.7,.6,.7);[.18,.52].forEach(dx=>isoCyl(p,v,x+dx,y+.3,.7,.06,.3,M.white))});
  // cooling tower
  p=part([9.6,5.5]); const c0=ip(v,9.6,5.5,0), c1=ip(v,9.6,5.5,2.1), c2=ip(v,9.6,5.5,3.1), e0=isoR(v,1.35), e1=isoR(v,.92), e2=isoR(v,1.02);
  svg('path',{d:`M ${c0.x-e0.rx} ${c0.y} Q ${c1.x-e1.rx*.9} ${c1.y} ${c2.x-e2.rx} ${c2.y} L ${c2.x+e2.rx} ${c2.y} Q ${c1.x+e1.rx*.9} ${c1.y} ${c0.x+e0.rx} ${c0.y} A ${e0.rx} ${e0.ry} 0 0 1 ${c0.x-e0.rx} ${c0.y} Z`,fill:'#E9E2D4'},p);
  svg('path',{d:`M ${c0.x} ${c0.y+e0.ry} Q ${c1.x+e1.rx*.2} ${c1.y+e1.ry} ${c2.x} ${c2.y+e2.ry} L ${c2.x+e2.rx} ${c2.y} Q ${c1.x+e1.rx*.9} ${c1.y} ${c0.x+e0.rx} ${c0.y} A ${e0.rx} ${e0.ry} 0 0 1 ${c0.x} ${c0.y+e0.ry} Z`,fill:'#D6CCB9'},p);
  svg('ellipse',{cx:c2.x,cy:c2.y,rx:e2.rx,ry:e2.ry,fill:'#C9BFAC'},p);
  return {parts,stackTop:st.top,towerTop:c2,towerR:e2.rx};
}
scene('permit',{dur:8.6,
build(root,{defs,id}){
  const S={}, vA=S.vA=view(282,146,30);
  S.A=plantModel(root,defs,id+'a',vA);
  // the pump the job is on, with a pipe into the steam turbine hall
  const pg=S.pumpG=svg('g',{},root);
  new IsoBox(pg,vA,M.slate).set(4.2,6.35,.25,1.2,.26,.26);
  new IsoBox(pg,vA,M.slate).set(5.35,6.1,0,1.0,.8,.18);
  S.pump=new IsoBox(pg,vA,M.teal).set(5.45,6.18,.18,.8,.64,.55);
  S.pumpBase=ip(vA,5.85,6.5,0); S.pumpTop=ip(vA,5.85,6.5,.75);
  S.fan=svg('g',{},pg); const ft=ip(vA,5.85,6.5,.73); S.fan._p=ft;
  [0,1,2].forEach(k=>svg('ellipse',{cx:0,cy:-5,rx:2.2,ry:5,fill:'#FFFFFF',transform:`rotate(${k*120})`},S.fan));
  S.ringG=isoDisc(root,vA,5.85,6.5,.01,.9,{fill:'none',stroke:K.amb2,'stroke-width':2.5,opacity:0});
  S.steam=[...Array(5)].map(()=>svg('circle',{r:8,fill:'#FFFFFF',opacity:.85},root));
  S.smoke=[...Array(4)].map(()=>svg('circle',{r:5,fill:'#E2DED7',opacity:.8},root));
  S.mw=floatTag(root,'730 MW',{color:K.amb,size:11,h:26});
  // the work order
  const wo=S.wo=svg('g',{},root);
  card(wo,defs,id,30,470,214,86);
  txt(wo,50,500,'WORK ORDER',{'font-size':12,'letter-spacing':1.6,fill:K.ink,'font-weight':750});
  txt(wo,50,520,'CORRECTIVE',{'font-size':10,'letter-spacing':1.2,fill:K.mute});
  S.status=[['OPEN',K.amb],['LOCKED',K.cor],['APPROVED',K.ind],['CLOSED ✓',K.teal]].map(([l,c])=>{const s=pill(wo,0,0,l,{color:c,size:10,h:22});s.setAttribute('transform',`translate(${50+s._w/2} 540)`);return s});
  S.lead=svg('path',{d:'',fill:'none',stroke:K.amb,'stroke-width':1.5,'stroke-dasharray':'3 4'},root);
  // lock and wrench over the pump
  S.lock=badge(root,15,K.cor,b=>ICON.lock(b,K.cor),{fill:K.corLL});
  S.wrench=badge(root,15,K.ind,b=>ICON.wrench(b,K.ind),{fill:K.indLL});
  // the permit
  const pm=S.permit=svg('g',{},root);
  card(pm,defs,id,606,286,188,176);
  txt(pm,624,314,'PERMIT TO WORK',{'font-size':11,'letter-spacing':1.4,fill:K.ind,'font-weight':750});
  svg('line',{x1:624,y1:326,x2:776,y2:326,stroke:K.line,'stroke-width':1},pm);
  S.checks=['ISOLATED','TESTED DEAD','AREA SAFE'].map((l,i)=>{const y=352+i*30;svg('rect',{x:624,y:y-12,width:15,height:15,rx:4,fill:'#FFFFFF',stroke:K.line2,'stroke-width':1.5},pm);
    const ck=svg('path',{d:`M ${627.5} ${y-4.5} l 3 3 l 6 -6.5`,fill:'none',stroke:K.teal,'stroke-width':2.4,'stroke-linecap':'round','stroke-linejoin':'round'},pm);txt(pm,648,y,l,{'font-size':11,fill:K.ink2});return ck});
  S.stamp=svg('g',{},pm); const sp=pill(S.stamp,0,0,'APPROVED',{color:K.teal,size:12,h:30,weight:800}); S.stamp._p={x:700,y:440};
  // the steps
  S.stepX=[150,320,490,660];
  svg('line',{x1:150,y1:634,x2:660,y2:634,stroke:K.line,'stroke-width':3,'stroke-linecap':'round'},root);
  S.stepFill=svg('line',{x1:150,y1:634,x2:150,y2:634,stroke:K.teal2,'stroke-width':3,'stroke-linecap':'round'},root);
  S.steps=['WORK ORDER','LOCKOUT','PERMIT','DONE'].map((l,i)=>({off:pill(root,S.stepX[i],634,l,{color:K.faint,bg:'#FFFFFF',size:10.5,h:26}),on:pill(root,S.stepX[i],634,l,{color:i===3?K.teal:K.amb,size:10.5,h:26})}));
  S.T=[.9,2.3,3.5,6.4];
  return S;
},
render(S,u){
  const T=S.T;
  S.A.parts.forEach((p,i)=>riseAt(p.g,p.base,E.outBack(P(u,.05+i*.08,.45+i*.08))));
  riseAt(S.pumpG,S.pumpBase,E.outBack(P(u,.55,.9)));
  const st=S.A.stackTop;
  S.mw.at(st.x,st.y,30,E.outBack(P(u,.9,1.2)));
  S.steam.forEach((p,i)=>{const ph=(u*.32+i/5)%1, t=S.A.towerTop;C(p,{x:t.x+Math.sin(i*2.1)*S.A.towerR*.5+ph*14,y:t.y-6-ph*64});p.setAttribute('r',(7+ph*12).toFixed(1));op(p,P(u,.9,1.2)*.85*(1-ph))});
  S.smoke.forEach((p,i)=>{const ph=(u*.4+i/4)%1;C(p,{x:st.x+ph*20,y:st.y-4-ph*46});p.setAttribute('r',(4+ph*7).toFixed(1));op(p,P(u,.9,1.2)*.7*(1-ph))});
  // is the pump running?
  const locked=u>T[1]+.2&&u<T[3], cool=P(u,T[1]+.2,T[1]+.6)*(1-P(u,T[3],T[3]+.3));
  S.pump.paint(cool>.5?{top:'#D9DCE2',left:'#B7BCC6',right:'#A2A8B3'}:M.teal);
  S.fan.setAttribute('transform',`translate(${S.fan._p.x.toFixed(1)} ${S.fan._p.y.toFixed(1)}) scale(1 .55) rotate(${(locked?T[1]*900:u*900)%360})`);
  // the work order arrives
  const wk=E.outCubic(P(u,T[0]-.3,T[0]+.2));
  S.wo.setAttribute('transform',`translate(${((1-wk)*-260).toFixed(1)} 0)`);
  const cur=u<T[1]+.2?0:u<4.8?1:u<T[3]?2:3;
  S.status.forEach((s,i)=>op(s,i===cur?1:0));
  const pt=S.pumpTop; S.lead.setAttribute('d',`M 244 500 C 290 500, ${pt.x-40} ${pt.y+60}, ${pt.x-10} ${pt.y+18}`); op(S.lead,wk*(1-P(u,T[3]+.8,T[3]+1.2)));
  const rp=((u-T[0])*.9)%1; S.ringG.setAttribute('stroke-width',(2.5*(1-rp)+.5).toFixed(2)); op(S.ringG,u>T[0]&&u<T[3]?.9*(1-rp):0);
  S.ringG.setAttribute('transform',`translate(${pt.x.toFixed(1)} ${(pt.y+21).toFixed(1)}) scale(${(.6+rp*.7).toFixed(3)}) translate(${(-pt.x).toFixed(1)} ${(-pt.y-21).toFixed(1)})`);
  // lockout
  const lk=E.outBack(P(u,T[1],T[1]+.3))*(1-P(u,T[3]-.1,T[3]+.15));
  S.lock.setAttribute('transform',`translate(${(pt.x+24).toFixed(1)} ${(pt.y-24).toFixed(1)}) scale(${Math.max(.001,lk).toFixed(3)})`); op(S.lock,lk);
  // the permit, checked line by line, then approved
  const pk=E.outCubic(P(u,T[2]-.3,T[2]+.1)); S.permit.setAttribute('transform',`translate(${((1-pk)*40).toFixed(1)} 0)`); op(S.permit,pk);
  S.checks.forEach((c,i)=>op(c,P(u,3.8+i*.35,3.95+i*.35)));
  const sk=E.outBack(P(u,4.9,5.15)); S.stamp.setAttribute('transform',`translate(${S.stamp._p.x} ${S.stamp._p.y}) rotate(-8) scale(${Math.max(.001,1.6-.6*sk).toFixed(3)})`); op(S.stamp,P(u,4.9,5.0));
  // the job itself
  const wr=P(u,5.3,5.5)*(1-P(u,6.1,6.3));
  S.wrench.setAttribute('transform',`translate(${(pt.x-26).toFixed(1)} ${(pt.y-26).toFixed(1)}) rotate(${(Math.sin(u*9)*24).toFixed(1)}) scale(${Math.max(.001,wr).toFixed(3)})`); op(S.wrench,wr);
  // steps along the bottom
  const reached=T.filter(t=>u>=t).length;
  S.steps.forEach((s,i)=>{const k=P(u,T[i],T[i]+.25);op(s.on,k);op(s.off,1-k)});
  const fx=reached<=1?150:S.stepX[Math.min(3,reached-1)]; const prevX=S.stepX[Math.max(0,reached-2)];
  S.stepFill.setAttribute('x2',lerp(prevX,fx,E.inOutCubic(P(u,T[Math.max(0,reached-1)],T[Math.max(0,reached-1)]+.3))).toFixed(1));
}});
