'use strict';
/* Chapter 01: Al-Hadi University College, in isometric motion graphics */

// =====================================================================
// The platform: V1 typed into life, module by module, then the website rebuilt
// =====================================================================
scene('platform',{dur:9.0,
build(root,{defs,id}){
  const S={};
  // the code window
  const cw=svg('g',{},root);
  svg('rect',{x:36,y:52,width:330,height:214,rx:12,fill:'#FFFFFF',stroke:K.line,'stroke-width':1.2,filter:`url(#${id}card)`},cw);
  const cf=svg('filter',{id:id+'card',x:'-20%',y:'-20%',width:'140%',height:'160%'},defs); svg('feDropShadow',{dx:0,dy:10,stdDeviation:12,'flood-color':'#46341c','flood-opacity':.14},cf);
  svg('rect',{x:36,y:52,width:330,height:26,rx:12,fill:K.scrHd},cw); svg('rect',{x:36,y:66,width:330,height:12,fill:K.scrHd},cw);
  [K.macR,K.macY,K.macG].forEach((c,i)=>svg('circle',{cx:52+i*12,cy:65,r:4,fill:c},cw));
  txt(cw,98,69,'college / models.py',{'font-size':10.5,fill:K.scrTx});
  const KW=K.rose, CL=K.ind, TY=K.amb, PL=K.ink2;
  const CODE=[
    [['class ',KW],['Student',CL],['(models.Model):',PL]],[['  name = ',PL],['CharField',TY],['(120)',PL]],
    [['class ',KW],['Result',CL],['(models.Model):',PL]],[['  grade = ',PL],['DecimalField',TY],['()',PL]],
    [['class ',KW],['Fee',CL],['(models.Model):',PL]],[['  paid = ',PL],['BooleanField',TY],['()',PL]],
    [['class ',KW],['Document',CL],['(models.Model):',PL]],[['  file = ',PL],['FileField',TY],['()',PL]]
  ];
  S.code=[]; S.lineEnd=[];
  CODE.forEach((line,li)=>{const t=svg('text',{x:52,y:100+li*20,'font-size':11.5,'font-family':FONT_MONO},cw);line.forEach(([str,c])=>S.code.push({sp:svg('tspan',{fill:c},t),s:str}));S.lineEnd.push(S.code.reduce((n,c)=>n+c.s.length,0))});
  S.codeLen=S.code.reduce((n,c)=>n+c.s.length,0);
  // the browser: the old PHP website, then the new Django one
  const bw=svg('g',{},root);
  svg('rect',{x:454,y:52,width:330,height:214,rx:12,fill:'#FFFFFF',stroke:K.line,'stroke-width':1.2,filter:`url(#${id}card)`},bw);
  const bcp=svg('clipPath',{id:id+'bw'},defs); svg('rect',{x:454,y:52,width:330,height:214,rx:12},bcp);
  const bin=svg('g',{'clip-path':`url(#${id}bw)`},bw);
  svg('rect',{x:454,y:78,width:330,height:188,fill:'#F1F1EA'},bin);
  svg('rect',{x:454,y:52,width:330,height:26,fill:K.scrHd},bin);
  [K.macR,K.macY,K.macG].forEach((c,i)=>svg('circle',{cx:470+i*12,cy:65,r:4,fill:c},bin));
  svg('rect',{x:514,y:58,width:190,height:14,rx:7,fill:'#FFFFFF',stroke:K.line,'stroke-width':.8},bin);
  S.url=txt(bin,524,68.5,'college.edu/index.php',{'font-size':9,fill:K.scrTx});
  const oldG=svg('g',{},bin), serif="'Times New Roman',Times,serif";
  svg('rect',{x:464,y:88,width:310,height:34,fill:'#2b4d8f'},oldG);
  txt(oldG,619,110,'WELCOME TO OUR WEBSITE',{'text-anchor':'middle',fill:'#ffe066','font-size':LANG==='de'?11.5:14,'font-family':serif,'font-weight':700});
  for(let i=0;i<6;i++) svg('line',{x1:470,y1:136+i*20,x2:470+(i%2?48:64),y2:136+i*20,stroke:'#1f3fff','stroke-width':2},oldG);
  for(let r=0;r<5;r++)for(let c=0;c<3;c++) svg('rect',{x:556+c*72,y:132+r*24,width:66,height:20,fill:'#fff',stroke:'#9aa0a6','stroke-width':1},oldG);
  S.old=[...oldG.children];
  const newG=svg('g',{},bin);
  svg('rect',{x:454,y:78,width:330,height:188,fill:'#FFFFFF'},newG);
  svg('rect',{x:454,y:78,width:330,height:24,fill:'#1C2A45'},newG);
  svg('circle',{cx:470,cy:90,r:5,fill:K.teal2},newG);
  for(let i=0;i<4;i++) svg('rect',{x:610+i*40,y:88,width:28,height:4,rx:2,fill:'#AFC0DA'},newG);
  svg('rect',{x:466,y:110,width:306,height:78,rx:8,fill:lin(defs,id+'hero',[['0%','#1E3A66'],['100%','#2C5286']],false)},newG);
  svg('rect',{x:480,y:124,width:130,height:10,rx:5,fill:'#FFFFFF'},newG);
  svg('rect',{x:480,y:142,width:96,height:6,rx:3,fill:'#AFC0DA'},newG);
  const apply=S.apply=svg('g',{},newG);
  svg('rect',{x:480,y:158,width:96,height:22,rx:11,fill:K.teal2},apply);
  txt(apply,528,173,'Apply online',{'text-anchor':'middle',fill:'#FFFFFF','font-size':LANG==='de'?8.5:9.5,'font-family':FONT_UI,'font-weight':700});
  for(let i=0;i<3;i++){const x=466+i*104;svg('rect',{x,y:198,width:98,height:58,rx:8,fill:'#FFFFFF',stroke:K.line,'stroke-width':1},newG);svg('circle',{cx:x+16,cy:214,r:6,fill:[K.ind2,K.amb2,K.teal2][i]},newG);svg('rect',{x:x+10,y:228,width:70,height:5,rx:2.5,fill:K.scrBar},newG);svg('rect',{x:x+10,y:240,width:50,height:5,rx:2.5,fill:K.scrLn},newG)}
  S.neu=[...newG.children];
  S.phpTag=pill(root,520,292,'PHP',{color:K.cor,size:11,h:24});
  S.arrowTag=txt(root,619,297,'→',{'text-anchor':'middle','font-size':18,fill:K.mute});
  S.djTag=pill(root,700,292,'DJANGO',{color:K.teal,size:11,h:24});
  // the platform: an isometric base, modules rise as their models are typed
  const v=S.v=view(410,352,30);
  const LG=svg('g',{},root);
  isoStage(LG,defs,id,v,0,0,8,8);
  for(let i=1;i<8;i++){const a=ip(v,i,0,0),b=ip(v,i,8,0),c=ip(v,0,i,0),d=ip(v,8,i,0);svg('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,stroke:'rgba(70,55,30,.07)','stroke-width':1},LG);svg('line',{x1:c.x,y1:c.y,x2:d.x,y2:d.y,stroke:'rgba(70,55,30,.07)','stroke-width':1},LG)}
  const MODS=[['STUDENTS',7,1,1.8,M.teal,K.teal],['RESULTS',5,3,1.4,M.ind,K.ind],['FEES',3,5,1.6,M.amb,K.amb],['DOCUMENTS',1,7,1.2,M.rose,K.rose]];
  S.mods=MODS.map(([name,cx,cy,h,m,col],i)=>{const b=new IsoBox(LG,v,m);b.set(cx-.7,cy-.7,0,1.4,1.4,.001);
    const tag=floatTag(root,name,{color:col,size:10.5,h:24});return {b,tag,cx,cy,h,col,t:[.95,1.55,2.15,2.75][i]}});
  S.parts=[];for(let i=0;i<4;i++)for(let j=0;j<3;j++)S.parts.push({m:i,j,el:svg('circle',{r:3.2,fill:S.mods[i].col},root)});
  S.live=pill(root,410,640,'✓ V1 LIVE',{color:K.teal,size:12,h:28});
  S.flowTag=pill(root,0,0,'ADMISSIONS',{color:K.teal,size:9.5,h:22});
  S.flow=drawPath(svg('path',{d:'M 528 182 C 560 300, 620 330, 566 420',fill:'none',stroke:K.teal,'stroke-width':2.2,'stroke-dasharray':'0','stroke-linecap':'round'},root));
  S.flowDot=svg('circle',{r:4,fill:K.teal2},root);
  return S;
},
render(S,u){
  let n=Math.floor(clamp((u-.4)/2.6)*S.codeLen);
  S.code.forEach(c=>{const k=Math.min(c.s.length,Math.max(0,n));c.sp.textContent=c.s.slice(0,k);n-=c.s.length});
  S.mods.forEach((m,i)=>{
    const k=E.outBack(P(u,m.t,m.t+.45)), h=Math.max(.001,m.h*clamp(k,0,1.08));
    m.b.set(m.cx-.7,m.cy-.7,0,1.4,1.4,h); op(m.b.g,P(u,m.t-.05,m.t+.05));
    const top=ip(S.v,m.cx,m.cy,h); m.tag.at(top.x,top.y,40,E.outBack(P(u,m.t+.25,m.t+.55)));
  });
  S.parts.forEach(p=>{const m=S.mods[p.m],a=m.t-.35+p.j*.08,k=P(u,a,a+.4);
    if(k<=0||k>=1){op(p.el,0);return}
    const s={x:200,y:266},e=ip(S.v,m.cx,m.cy,m.h*.6),c={x:(s.x+e.x)/2,y:Math.min(s.y,e.y)-40},q=E.inOutCubic(k);
    C(p.el,{x:(1-q)*(1-q)*s.x+2*q*(1-q)*c.x+q*q*e.x,y:(1-q)*(1-q)*s.y+2*q*(1-q)*c.y+q*q*e.y});op(p.el,Math.sin(Math.PI*k))});
  popAt(S.live,410,640,E.outBack(P(u,3.3,3.65)));
  // the website: the old one falls apart, the new one builds up
  S.old.forEach((e,i)=>{const k=E.inCubic(P(u,4.4+i*.015,4.85+i*.015));e.setAttribute('transform',`translate(0 ${(k*170).toFixed(1)}) rotate(${(k*(i%2?7:-7)).toFixed(1)} 619 160)`);op(e,1-k)});
  S.neu.forEach((e,i)=>{const k=E.outCubic(P(u,5.1+i*.035,5.5+i*.035));e.setAttribute('transform',`translate(0 ${((1-k)*16).toFixed(1)})`);op(e,k)});
  S.url.textContent=u<5.1?'college.edu/index.php':'college.edu';
  op(S.phpTag,P(u,.3,.6)*(1-.6*P(u,4.4,4.8))); op(S.arrowTag,P(u,5.2,5.5)); popAt(S.djTag,700,292,E.outBack(P(u,5.6,5.95)));
  // admissions built in: the Apply button feeds the platform
  drawTo(S.flow,E.inOutCubic(P(u,6.3,7.0)));
  const fk=((u-7.0)*.8)%1; if(u>7.0){C(S.flowDot,S.flow.getPointAtLength(S.flow._len*fk));op(S.flowDot,Math.sin(Math.PI*fk))}else op(S.flowDot,0);
  const fp=S.flow.getPointAtLength(S.flow._len*.5); S.flowTag.setAttribute('transform',`translate(${(fp.x+46).toFixed(1)} ${fp.y.toFixed(1)}) scale(${Math.max(.001,E.outBack(P(u,6.8,7.1))).toFixed(3)})`); op(S.flowTag,P(u,6.8,7.0));
  if(u>7.2) op(S.apply,.8+.2*Math.sin(u*5));
}});

// =====================================================================
// The server room: an empty rack, the first server, the switch, then the whole rack
// =====================================================================
scene('server',{dur:12.4,
build(root,{defs,id}){
  const S={};
  // a rounded vignette, so the room reads as one picture on the page
  const cp=svg('clipPath',{id:id+'vig'},defs); svg('rect',{x:0,y:0,width:820,height:720,rx:26},cp);
  const RR=svg('g',{'clip-path':`url(#${id}vig)`},root);
  const L0=svg('g',{},RR), LBOX=svg('g',{},RR), LCAB=svg('g',{},RR), LFIG=svg('g',{},RR), LDIM=svg('g',{},RR), LGLOW=svg('g',{},RR);
  room(L0,defs,id);
  // ceiling, cable tray, cables down to the rack
  svg('rect',{x:0,y:0,width:820,height:40,fill:'#E2DBCF'},L0);
  svg('line',{x1:0,y1:40,x2:820,y2:40,stroke:K.line2,'stroke-width':2},L0);
  for(const x of [120,380,640]) svg('line',{x1:x,y1:40,x2:x,y2:58,stroke:K.metal2,'stroke-width':2},L0);
  svg('line',{x1:0,y1:58,x2:744,y2:58,stroke:K.metal2,'stroke-width':3},L0);
  svg('line',{x1:0,y1:70,x2:744,y2:70,stroke:K.metal2,'stroke-width':3},L0);
  for(let x=10;x<744;x+=26) svg('line',{x1:x,y1:58,x2:x,y2:70,stroke:K.metal2,'stroke-width':2},L0);
  [[K.teal,636],[K.ind,656],[K.amb,676]].forEach(([c,x],i)=>svg('path',{d:`M 0 ${62+i*2.5} L ${x-18} ${62+i*2.5} Q ${x} ${62+i*2.5} ${x} 84 L ${x} 244`,fill:'none',stroke:c,'stroke-width':2.5,'stroke-opacity':.75},L0));
  svg('rect',{x:290,y:44,width:200,height:10,rx:3,fill:K.line2},L0);
  // the split AC unit, a Baghdad server room staple
  svg('rect',{x:40,y:108,width:210,height:64,rx:12,fill:'#FAFBFC',stroke:K.line2,'stroke-width':2},L0);
  svg('rect',{x:52,y:156,width:186,height:7,rx:3.5,fill:'#D5DAE1'},L0);
  svg('line',{x1:54,y1:124,x2:170,y2:124,stroke:'#E3E6EB','stroke-width':2},L0);
  svg('rect',{x:300,y:228,width:176,height:34,rx:6,fill:K.card,stroke:K.line2,'stroke-width':1.5},L0);
  txt(L0,388,250,'SERVER ROOM',{'text-anchor':'middle','font-size':14,'letter-spacing':3,fill:K.ink2});
  svg('rect',{x:248,y:566,width:26,height:74,rx:9,fill:K.cor},L0);
  svg('rect',{x:254,y:556,width:14,height:12,rx:3,fill:K.dev2},L0);
  svg('path',{d:'M 268 561 q 17 4 14 24',fill:'none',stroke:K.dev2,'stroke-width':3,'stroke-linecap':'round'},L0);
  // the rack: empty, just the frame and rails
  svg('rect',{x:590,y:240,width:150,height:410,rx:6,fill:K.dev,stroke:K.devIn,'stroke-width':3},L0);
  svg('rect',{x:604,y:256,width:122,height:378,fill:'#1A202C'},L0);
  for(const x of [604,718]){svg('rect',{x,y:256,width:8,height:378,fill:K.dev2},L0);for(let y=262;y<632;y+=11)svg('circle',{cx:x+4,cy:y,r:1.3,fill:K.dev3},L0)}
  for(let i=0;i<6;i++) svg('line',{x1:604+i*21,y1:247,x2:616+i*21,y2:247,stroke:K.dev3,'stroke-width':2},L0);
  svg('rect',{x:596,y:650,width:14,height:6,fill:K.dev2},L0); svg('rect',{x:720,y:650,width:14,height:6,fill:K.dev2},L0);
  S.clock=wallClock(L0,152,318);
  // rack units, built front-on at 106px wide
  const BODY='#343E53', EDGE='#56617A', PORT='#1A202C';
  function makeUnit(kind){
    const g=svg('g',{},LBOX), u={kind,g,leds:[],h:22};
    const body=(h,stroke=EDGE)=>svg('rect',{x:0,y:0,width:106,height:h,rx:h>30?4:2.5,fill:BODY,stroke,'stroke-width':stroke===EDGE?1.6:2},g);
    if(kind==='server'||kind==='server1'){
      u.h=40; body(40,kind==='server1'?K.teal2:EDGE);
      for(let i=0;i<6;i++) svg('line',{x1:28+i*6,y1:10,x2:28+i*6,y2:30,stroke:EDGE,'stroke-width':2},g);
      svg('circle',{cx:13,cy:20,r:5.5,fill:'none',stroke:'#A9B1BF','stroke-width':2},g);
      u.leds=[0,1,2].map(i=>svg('circle',{cx:74+i*10,cy:14,r:3.2,fill:K.devLed},g));
      svg('rect',{x:70,y:25,width:28,height:5,rx:2.5,fill:'rgba(255,255,255,.1)'},g);
      u.bar=svg('rect',{x:70,y:25,width:0,height:5,rx:2.5,fill:K.teal2},g);
    } else if(kind==='switch'){
      body(22,K.ind2);
      for(let i=0;i<8;i++){svg('rect',{x:8+i*11,y:11,width:7,height:6,rx:1,fill:PORT},g);u.leds.push(svg('rect',{x:9+i*11,y:4,width:5,height:3,rx:1,fill:K.devLed},g))}
    } else if(kind==='storage'){
      u.h=40; body(40);
      for(let i=0;i<4;i++){svg('rect',{x:6+i*24,y:6,width:20,height:28,rx:2,fill:'#252C3A',stroke:EDGE,'stroke-width':1.2},g);u.leds.push(svg('circle',{cx:16+i*24,cy:29,r:2,fill:K.devLed},g))}
    } else if(kind==='ups'){
      u.h=44; body(44);
      svg('rect',{x:10,y:12,width:36,height:16,rx:2,fill:'#0E3A36'},g);
      u.txt=txt(g,28,24,'230V',{'text-anchor':'middle',fill:K.teal2,'font-size':9,opacity:0});
      u.leds.push(svg('circle',{cx:92,cy:20,r:3,fill:K.devLed},g));
    } else if(kind==='patch'){
      body(22); for(let i=0;i<12;i++) svg('circle',{cx:9+i*8.2,cy:11,r:2.4,fill:PORT},g);
    } else if(kind==='router'){
      body(22); for(let i=0;i<5;i++) svg('line',{x1:10+i*6,y1:6,x2:10+i*6,y2:16,stroke:EDGE,'stroke-width':2},g);
      u.leds=[svg('circle',{cx:84,cy:11,r:2.6,fill:K.devLed},g),svg('circle',{cx:94,cy:11,r:2.6,fill:K.devLed},g)];
    } else if(kind==='cable'){
      body(22); for(let i=0;i<5;i++) svg('rect',{x:8+i*20,y:5,width:12,height:12,rx:4,fill:'none',stroke:EDGE,'stroke-width':1.6},g);
    } else if(kind==='blank'){
      svg('rect',{x:0,y:0,width:106,height:22,rx:2.5,fill:'#2D3546',stroke:EDGE,'stroke-width':1.4},g); for(let i=0;i<10;i++) svg('line',{x1:10+i*9,y1:7,x2:10+i*9,y2:15,stroke:'#232A38','stroke-width':2},g);
    }
    g.style.display='none';
    return u;
  }
  S.units=[
    {kind:'server1',y:370},{kind:'switch',y:342},
    {kind:'ups',y:584},{kind:'blank',y:552},{kind:'storage',y:504},{kind:'server',y:460},{kind:'server',y:416},
    {kind:'patch',y:316},{kind:'router',y:290},{kind:'cable',y:264}
  ].map(o=>Object.assign(o,makeUnit(o.kind)));
  S.LBOX=LBOX;
  S.slotA=svg('rect',{x:612,y:370,width:106,height:40,rx:3,fill:'rgba(24,163,147,.12)',stroke:K.teal2,'stroke-width':1.6,'stroke-dasharray':'5 5'},L0);
  S.slotB=svg('rect',{x:612,y:342,width:106,height:22,rx:3,fill:'rgba(106,121,201,.14)',stroke:K.ind2,'stroke-width':1.6,'stroke-dasharray':'5 5'},L0);
  S.boot=svg('rect',{rx:8,fill:'none',stroke:K.teal2,'stroke-width':2},LBOX);
  S.cables=[
    {d:'M 712 353 C 760 356, 760 388, 712 392',c:K.amb2,t:8.4},
    {d:'M 712 356 C 772 362, 772 432, 712 436',c:K.teal2,unit:6},
    {d:'M 712 358 C 784 366, 784 476, 712 480',c:K.ind2,unit:5},
    {d:'M 712 360 C 796 370, 796 520, 712 524',c:K.rose,unit:4},
  ].map(o=>Object.assign(o,{el:drawPath(svg('path',{d:o.d,fill:'none',stroke:o.c,'stroke-width':3,'stroke-linecap':'round'},LCAB))}));
  S.fig=new Figure(LFIG);
  // the lights come on as he walks in
  S.dim=svg('rect',{x:0,y:0,width:820,height:720,fill:'#0F131B'},LDIM);
  S.tube=svg('rect',{x:300,y:52,width:180,height:5,rx:2.5,fill:'#B7BDC7'},LGLOW);
  S.cone=svg('path',{d:'M 300 57 L 480 57 L 650 650 L 130 650 Z',fill:lin(defs,id+'c',[['0%','#FFF1C4',.55],['100%','#FFF1C4',0]])},LGLOW);
  svg('circle',{cx:232,cy:124,r:2.6,fill:K.teal2},LGLOW);
  S.air=[0,1,2].map(i=>svg('path',{d:`M ${80+i*55} 178 q -10 20 0 40 q 10 20 0 40`,fill:'none',stroke:'#8FB9DA','stroke-width':2,'stroke-opacity':.8,'stroke-dasharray':'8 10','stroke-linecap':'round'},LGLOW));

  // ---- his moves, in seconds ----
  const T=S.T={walkA:.1,walkB:2.6,slideA:3.35,slideB:3.62,turn:4.75,out:4.95,off:6.2,back:6.3,arrive:7.55,swA:7.75,swSlide:8.1,swIn:8.35,tl:8.65,step:.3};
  T.tlEnd=T.tl+8*T.step;
  const XS=502, X0=XS-CYC*2.25;
  const INS={sF:1.42,eF:.3,sB:1.38,eB:.35}, INS_SW={sF:1.75,eF:.21,sB:1.7,eB:.26};
  const PRESS={sF:1.52,eF:.02,sB:-.04,eB:.28}, RESTR={sF:.75,eF:.45,sB:-.04,eB:.28};
  const G2={x:22,y:28}, G2IN={x:6,y:20}, G1={x:22,y:16}, G1IN={x:6,y:11};
  function installPose(y){
    if(y>=500) return {legs:CROUCH,arms:{sF:.75,eF:.3,sB:.7,eB:.35},lean:.45};
    if(y>=400) return {legs:STAND,arms:{sF:1.15,eF:.2,sB:1.1,eB:.25},lean:.04};
    return {legs:STAND,arms:{sF:2.25,eF:.25,sB:2.2,eB:.3},lean:-.02};
  }
  S.pose=function(u){
    let x=XS, sx=1, legs=STAND, arms=IDLE, lean=.02, head=0, grip=G2, carry=-1, still=true;
    const units=S.units;
    if(u<T.walkB){
      x=lerp(X0,XS,P(u,T.walkA,T.walkB)); const phi=2*Math.PI*(x-X0)/CYC;
      legs=walkL(phi); arms=CARRY; lean=-.03+.015*Math.sin(2*phi); head=.05; carry=0; still=false;
    } else if(u<T.turn){
      legs=mixP(WALK_END,STAND,E.inOutCubic(P(u,T.walkB,T.walkB+.3)));
      if(u<2.9){arms=CARRY;carry=0}
      else if(u<T.slideA){const k=E.inOutCubic(P(u,2.9,T.slideA));arms=mixP(CARRY,INS,k);grip=mixP(G2,G2IN,k);carry=0}
      else if(u<3.55) arms=INS;
      else if(u<4.05) arms=mixP(INS,IDLE,E.inOutCubic(P(u,3.55,3.95)));
      else if(u<4.38){arms=mixP(IDLE,PRESS,E.inOutCubic(P(u,4.05,4.3)));arms.sF+=.05*Math.sin(Math.PI*P(u,4.3,4.38))}
      else arms=mixP(PRESS,IDLE,E.inOutCubic(P(u,4.38,4.65)));
      head=.05*(1-P(u,T.walkB,T.walkB+.3));
    } else if(u<T.out){ sx=Math.cos(Math.PI*E.inOutCubic(P(u,T.turn,T.out))) }
    else if(u<T.off){
      sx=-1; const d=(XS-X0)*P(u,T.out,T.off); x=XS-d; const phi=2*Math.PI*d/CYC;
      legs=mixP(STAND,walkL(phi),E.outCubic(P(u,T.out,T.out+.12))); arms=swingA(phi); lean=.04; still=false;
    } else if(u<T.back){x=X0-60;still=false}
    else if(u<T.arrive){
      x=lerp(X0,XS,P(u,T.back,T.arrive)); const phi=2*Math.PI*(x-X0)/CYC;
      legs=walkL(phi); arms=CARRY; grip=G1; carry=1; lean=-.02+.015*Math.sin(2*phi); head=.05; still=false;
    } else if(u<T.tl){
      legs=mixP(WALK_END,STAND,E.inOutCubic(P(u,T.arrive,T.arrive+.2)));
      if(u<T.swA){arms=CARRY;grip=G1;carry=1}
      else if(u<T.swSlide){const k=E.inOutCubic(P(u,T.swA,T.swSlide));arms=mixP(CARRY,INS_SW,k);grip=mixP(G1,G1IN,k);carry=1}
      else if(u<8.3) arms=INS_SW;
      else arms=mixP(INS_SW,IDLE,E.inOutCubic(P(u,8.3,8.55)));
    } else if(u<T.tlEnd){                                            // time-lapse: hard cuts, one unit every step
      const i=Math.floor((u-T.tl)/T.step), w=(u-T.tl)/T.step-i, unit=units[2+i];
      if(w<.35){arms=CARRY;carry=2+i;grip=unit.h>30?G2:G1}
      else{const ip=installPose(unit.y);legs=ip.legs;arms=ip.arms;lean=ip.lean}
      still=false;
    } else {
      const k=E.inOutCubic(P(u,T.tlEnd+.1,T.tlEnd+.5));
      arms=mixP(IDLE,RESTR,k); lean=.02+.025*k; head=.15*Math.sin(Math.PI*P(u,T.tlEnd+.6,T.tlEnd+1.1));
    }
    if(still){const b=breathe(u,arms);arms=b.arms;lean+=b.lean}
    return Object.assign({x,sx,lean,head,grip,carry},legs,arms);
  };
  const handAt=(s,g)=>({x:s.af.w.x-g.x,y:s.af.w.y-g.y});
  const solveP=p=>solveRig(Object.assign({lean:.02,head:0},STAND,IDLE,p));
  S.handAt=handAt;
  S.units[0].from=(()=>{const p=S.pose(T.slideA);return handAt(solveP(p),p.grip)})();
  S.units[1].from=(()=>{const p=S.pose(T.swSlide);return handAt(solveP(p),p.grip)})();
  for(let i=2;i<S.units.length;i++){const ip=installPose(S.units[i].y);S.units[i].from=handAt(solveP(Object.assign({x:XS},ip.legs,ip.arms,{lean:ip.lean})),S.units[i].h>30?G2IN:G1IN)}
  S.units[0].slide=[T.slideA,T.slideB]; S.units[1].slide=[T.swSlide,T.swIn];
  for(let i=2;i<S.units.length;i++){const a=T.tl+(i-2)*T.step;S.units[i].slide=[a+.35*T.step,a+.7*T.step]}
  return S;
},
render(S,u){
  const T=S.T;
  const lv=(()=>{let v=0;for(const [a,val] of [[.75,1],[.81,.1],[.88,1],[.92,.3],[1.0,1]]) if(u>=a) v=val;return v})();
  S.dim.setAttribute('opacity',(.6*(1-lv)).toFixed(3));
  S.tube.setAttribute('fill',lv>.5?K.lampOn:'#B7BDC7');
  op(S.cone,lv);
  S.air.forEach((a,i)=>a.setAttribute('stroke-dashoffset',(-(u*38)-i*6).toFixed(1)));
  let fast=0; for(const [a,b] of [[T.out,T.arrive],[T.tl,T.tlEnd]]) fast+=clamp(u-a,0,b-a);
  S.clock.set(u*.02+fast*2.4);
  const fp=S.pose(u), s=S.fig.set(fp);
  S.units.forEach((un,i)=>{
    const [a,b]=un.slide, mode=fp.carry===i?'carry':u>=a?(u<b?'slide':'in'):'hidden';
    un.age=mode==='in'?u-b:-1;
    if(mode==='hidden'){un.g.style.display='none';return}
    un.g.style.display='';
    if(mode==='carry'){if(un.g.parentNode!==S.fig.slot)S.fig.slot.appendChild(un.g);const h=S.handAt(s,fp.grip);tr(un.g,h.x,h.y)}
    else{if(un.g.parentNode!==S.LBOX)S.LBOX.insertBefore(un.g,S.boot);const k=E.outCubic(P(u,a,b));tr(un.g,lerp(un.from.x,612,k),lerp(un.from.y,un.y,k))}
  });
  op(S.slotA,(.5+.3*Math.sin(u*6))*(1-P(u,3.3,3.6)));
  op(S.slotB,(.5+.3*Math.sin(u*6))*P(u,T.back,T.back+.3)*(1-P(u,T.swSlide,T.swIn)));
  const boot=[4.45,4.57,4.69], cols=[K.teal2,K.amb2,K.ind2], U=S.units;
  U[0].leds.forEach((l,i)=>{let on=u>=boot[i];if(i===0&&u>4.9)on=Math.sin(u*18)>-.3;l.setAttribute('fill',on?cols[i]:K.devLed)});
  U[0].bar.setAttribute('width',u<4.5?0:(28*(.3+.7*(.5+.5*Math.sin(u*3.1)))).toFixed(1));
  const q=P(u,4.45,4.95); op(S.boot,q>0&&q<1?1-q:0);
  S.boot.setAttribute('x',(608-q*10).toFixed(1)); S.boot.setAttribute('y',(366-q*10).toFixed(1));
  S.boot.setAttribute('width',(114+q*20).toFixed(1)); S.boot.setAttribute('height',(48+q*20).toFixed(1));
  for(let i=1;i<U.length;i++){
    const un=U[i], alive=un.age>.08;
    if(un.kind==='switch') un.leds.forEach((l,j)=>l.setAttribute('fill',alive&&Math.sin(u*(12+j*1.7)+j*2.1+j*j*.5)>-.15?K.teal2:K.devLed));
    else if(un.kind==='server'){un.leds.forEach((l,j)=>{let on=alive;if(j===0&&alive)on=Math.sin(u*(15+i)+i)>-.3;l.setAttribute('fill',on?cols[j]:K.devLed)});un.bar.setAttribute('width',alive?(28*(.3+.7*(.5+.5*Math.sin(u*2.7+i)))).toFixed(1):0)}
    else if(un.kind==='storage') un.leds.forEach((l,j)=>l.setAttribute('fill',alive&&Math.sin(u*(9+j*2.3)+j)>-.2?K.teal2:K.devLed));
    else if(un.kind==='ups'){un.leds[0].setAttribute('fill',alive?K.teal2:K.devLed);op(un.txt,alive?1:0)}
    else if(un.kind==='router') un.leds.forEach((l,j)=>l.setAttribute('fill',alive&&(j===0||Math.sin(u*6+j)>0)?(j?K.amb2:K.teal2):K.devLed));
  }
  S.cables.forEach((c,i)=>{const t0=i===0?c.t:U[c.unit].slide[1]+.05;drawTo(c.el,E.inOutCubic(P(u,t0,t0+.3)))});
}});

// =====================================================================
// Admissions: the paper stacks drain into the portal, and every ten students become a dot
// =====================================================================
scene('admissions',{dur:7.2,
build(root,{defs,id}){
  const S={};
  const v=S.v=view(250,142,36);
  isoStage(root,defs,id,v,0,0,5,5);
  // three stacks of paper forms
  S.sheets=[];
  [[3.5,1.5],[2.5,2.5],[1.5,3.5]].forEach(([cx,cy],si)=>{for(let k=0;k<12;k++){const b=new IsoBox(root,v,M.white,{stroke:'#D9D4CB',sw:.6});b.set(cx-.5,cy-.65,k*.09,1,1.3,.06);S.sheets.push({b,cx,cy,k,si,drop:.15+si*.1+k*.06,fly:1.8+((11-k)*3+si)*.075})}});
  S.sheets.sort((a,b)=>a.k-b.k||(a.cx+a.cy)-(b.cx+b.cy)).forEach(s=>s.b.g.parentNode.appendChild(s.b.g));
  S.none=pill(root,250,392,'0 PAPER FORMS',{color:K.teal,size:11.5,h:28});
  // the portal
  const pg=svg('g',{},root);
  card(pg,defs,id,478,96,204,248,{fill:K.dev});
  svg('rect',{x:490,y:108,width:180,height:224,rx:8,fill:'#20283A'},pg);
  S.scr=svg('g',{},pg);
  svg('rect',{x:490,y:108,width:180,height:224,rx:8,fill:K.scr},S.scr);
  svg('rect',{x:490,y:108,width:180,height:32,rx:8,fill:K.scrHd},S.scr); svg('rect',{x:490,y:128,width:180,height:12,fill:K.scrHd},S.scr);
  txt(S.scr,504,129,'ADMISSIONS PORTAL',{'font-size':LANG==='de'?8.6:9.6,'letter-spacing':1,fill:K.ink2,'font-weight':700});
  S.rows=[0,1,2,3].map(i=>{const g=svg('g',{},S.scr),y=154+i*42;svg('rect',{x:504,y,width:152,height:32,rx:7,fill:'#FFFFFF',stroke:K.scrLn},g);svg('circle',{cx:521,cy:y+16,r:7,fill:[K.ind2,K.amb2,K.rose,K.blue][i]},g);svg('rect',{x:536,y:y+10,width:74,height:5,rx:2.5,fill:K.scrBar},g);svg('rect',{x:536,y:y+19,width:48,height:4,rx:2,fill:K.scrLn},g);txt(g,642,y+21,'✓',{'text-anchor':'middle','font-size':14,'font-weight':800,fill:K.teal,'font-family':FONT_UI});return g});
  svg('rect',{x:568,y:344,width:24,height:26,fill:K.metal2},pg); svg('rect',{x:534,y:368,width:92,height:9,rx:4.5,fill:K.metal2},pg);
  S.open=pill(root,580,72,'OPEN',{color:K.teal,size:11,h:24});
  // 200 dots, one for every ten students
  S.dots=[];for(let r=0;r<8;r++)for(let c=0;c<25;c++){const x=134+c*23,y=462+r*22;S.dots.push({x,y,el:svg('circle',{cx:x,cy:y,r:6,fill:K.scrLn},root),fly:svg('circle',{r:6,fill:K.teal2,opacity:0},root)})}
  S.legendDot=svg('circle',{cx:134,cy:656,r:6,fill:K.teal2},root);
  txt(root,148,660,'1 dot = 10 students',{'font-size':12,'letter-spacing':.6,fill:K.mute});
  return S;
},
render(S,u){
  const PORTAL=1.5, D0=1.8, D1=4.6;
  S.sheets.forEach(s=>{
    const drop=E.outCubic(P(u,s.drop,s.drop+.3)), f=P(u,s.fly,s.fly+.55);
    if(f<=0){s.b.set(s.cx-.5,s.cy-.65,s.k*.09+(1-drop)*2,1,1.3,.06);op(s.b.g,drop);return}
    const a=ip(S.v,s.cx,s.cy,s.k*.09), e={x:500,y:220}, q=E.inOutCubic(f);
    const p={x:lerp(a.x,e.x,q),y:lerp(a.y,e.y,q)-Math.sin(Math.PI*q)*80};
    const dz=(a.y-p.y)/S.v.S, dxw=(p.x-a.x)/(ISO_C*S.v.S);
    s.b.set(s.cx-.5+dxw/2,s.cy-.65-dxw/2,s.k*.09+dz,1,1.3,.06); op(s.b.g,1-P(f,.75,1));
  });
  popAt(S.none,250,392,E.outBack(P(u,4.6,4.95)));
  const on=u>=PORTAL; op(S.scr,on?1:0);
  S.rows.forEach((g,i)=>op(g,E.outCubic(P(u,PORTAL+.2+i*.15,PORTAL+.5+i*.15))));
  popAt(S.open,580,72,E.outBack(P(u,PORTAL+.1,PORTAL+.4)));
  S.dots.forEach((d,i)=>{const t=D0+(D1-D0)*i/S.dots.length, k=P(u,t,t+.4);
    d.el.setAttribute('fill',k>=1?K.teal2:K.scrLn);
    if(k>0&&k<1){const q=E.inOutCubic(k),sx=580,sy=352,cx=(sx+d.x)/2,cy=Math.min(sy,d.y)-40;
      C(d.fly,{x:(1-q)*(1-q)*sx+2*q*(1-q)*cx+q*q*d.x,y:(1-q)*(1-q)*sy+2*q*(1-q)*cy+q*q*d.y});op(d.fly,1)} else op(d.fly,0)});
}});

// =====================================================================
// University-wide in one academic year: a hub with a straight road to every department
// =====================================================================
scene('campus',{dur:7.6,
build(root,{defs,id}){
  const S={}, v=S.v=view(410,392,34);
  const f=svg('filter',{id:id+'sh',x:'-30%',y:'-30%',width:'160%',height:'160%'},defs); svg('feGaussianBlur',{stdDeviation:16},f);
  const W=svg('g',{},root); S.world=W;
  const c0=ip(v,0,0,0), e0=isoR(v,6.3);
  svg('ellipse',{cx:c0.x,cy:c0.y+30,rx:e0.rx*.95,ry:e0.ry*.95,fill:'rgba(70,52,28,.2)',filter:`url(#${id}sh)`},W);
  isoCyl(W,v,0,0,-.45,6.3,.45,M.plate);
  // the year: a ring of twelve months around the campus
  const er=isoR(v,5.6);
  svg('ellipse',{cx:c0.x,cy:c0.y,rx:er.rx,ry:er.ry,fill:'none',stroke:K.line2,'stroke-width':2,'stroke-dasharray':'2 6'},W);
  for(let m=0;m<12;m++){const a=m*Math.PI/6-Math.PI/2;const x1=c0.x+Math.cos(a)*er.rx,y1=c0.y+Math.sin(a)*er.ry;svg('line',{x1,y1,x2:c0.x+Math.cos(a)*er.rx*.95,y2:c0.y+Math.sin(a)*er.ry*.95,stroke:K.line2,'stroke-width':2},W)}
  S.ring=drawPath(svg('path',{d:`M ${c0.x} ${c0.y+er.ry} A ${er.rx} ${er.ry} 0 1 1 ${c0.x+.01} ${c0.y+er.ry}`,fill:'none',stroke:K.teal2,'stroke-width':4,'stroke-linecap':'round'},W));
  S.yearTag=pill(root,c0.x,c0.y+er.ry+34,'ONE ACADEMIC YEAR',{color:K.teal,size:11,h:26});
  // five departments around the hub
  const DEP=[['ADMISSIONS',153,2.0,'form'],['RESULTS',225,2.3,'cap'],['FEES',297,1.7,'card'],['DOCUMENTS',9,2.1,'doc'],['PAYROLL',81,1.6,'print']];
  const R=3.95, LR=svg('g',{},W), LD=svg('g',{},W);
  S.deps=DEP.map(([name,deg,h,icon],i)=>{const a=deg*Math.PI/180, cx=R*Math.cos(a), cy=R*Math.sin(a);
    const r0={x:1.35*Math.cos(a),y:1.35*Math.sin(a)}, r1={x:(R-1.05)*Math.cos(a),y:(R-1.05)*Math.sin(a)};
    const p0=ip(v,r0.x,r0.y,0), p1=ip(v,r1.x,r1.y,0);
    const road=svg('line',{x1:p0.x,y1:p0.y,x2:p1.x,y2:p1.y,stroke:K.line2,'stroke-width':6,'stroke-linecap':'round'},LR);
    const lit=drawPath(svg('path',{d:`M ${p0.x} ${p0.y} L ${p1.x} ${p1.y}`,fill:'none',stroke:K.teal2,'stroke-width':3,'stroke-linecap':'round'},LR));
    const dots=[0,1].map(j=>svg('circle',{r:3.6,fill:j?K.ind2:K.teal2,stroke:'#FFFFFF','stroke-width':1},LD));
    return {name,a,cx,cy,h,icon,p0,p1,road,lit,dots,t:1.9+i*.7,depth:cx+cy}});
  // buildings and the hub, painted back to front
  const LB=svg('g',{},W);
  const order=[...S.deps].sort((a,b)=>a.depth-b.depth);
  const hubAt=order.findIndex(d=>d.depth>0);
  const drawHub=()=>{S.hub=isoCyl(LB,v,0,0,0,1.2,.75,M.teal);S.hubCap=isoCyl(LB,v,0,0,.75,.75,.28,M.white);};
  order.forEach((d,i)=>{if(i===hubAt)drawHub();
    d.box=new IsoBox(LB,v,M.cream);
    d.wins=[];const W0=d.cx-.75,D0=d.cy-.75;
    for(let r=0;r<Math.floor(d.h/.45);r++)for(let c=0;c<2;c++){
      const z0=.25+r*.45,z1=z0+.26;
      d.wins.push(isoPoly(LB,v,[[W0+.25+c*.55,D0+1.5],[W0+.6+c*.55,D0+1.5],[W0+.6+c*.55,D0+1.5],[W0+.25+c*.55,D0+1.5]],0,{fill:'#C9D1DC'}));
      d.wins[d.wins.length-1]._q=[[W0+.25+c*.55,D0+1.5,z0],[W0+.6+c*.55,D0+1.5,z0],[W0+.6+c*.55,D0+1.5,z1],[W0+.25+c*.55,D0+1.5,z1]];
      d.wins.push(isoPoly(LB,v,[[0,0]],0,{fill:'#BFC8D4'}));
      d.wins[d.wins.length-1]._q=[[W0+1.5,D0+.25+c*.55,z0],[W0+1.5,D0+.6+c*.55,z0],[W0+1.5,D0+.6+c*.55,z1],[W0+1.5,D0+.25+c*.55,z1]];
    }});
  if(hubAt<0) drawHub();
  S.hubTag=floatTag(root,'PLATFORM',{color:K.teal,size:11.5,h:26});
  S.deps.forEach((d,i)=>{d.badge=badge(root,16,K.teal,g=>ICON[d.icon](g,K.teal));d.tag=pill(root,0,0,d.name,{color:K.teal,size:10.5,h:24})});
  S.card=badge(root,13,K.amb,g=>ICON.card(g,K.amb),{fill:K.ambLL}); S.card.setAttribute('transform','scale(.001)');
  S.check=badge(root,15,K.teal,g=>ICON.check(g,K.teal),{fill:K.tealLL});
  return S;
},
render(S,u){
  const v=S.v, rise=E.outCubic(P(u,0,.6));
  S.world.setAttribute('transform',`translate(0 ${((1-rise)*30).toFixed(1)})`); op(S.world,rise);
  // buildings rise, then join the platform one by one
  S.deps.forEach((d,i)=>{
    const k=E.outBack(P(u,.5+i*.12,1.0+i*.12)), h=Math.max(.001,d.h*clamp(k,0,1.06));
    const joined=u>=d.t+.3;
    d.box.set(d.cx-.75,d.cy-.75,0,1.5,1.5,h).paint(joined?{top:'#9FDED4',left:M.cream.left,right:M.cream.right}:M.cream);
    d.wins.forEach((w,j)=>{const q=w._q.map(([x,y,z])=>ip(v,x,y,Math.min(z,h-.05)));w.setAttribute('points',pts(q));const lit=joined&&u>=d.t+.3+(j%6)*.04;w.setAttribute('fill',lit?'#7FD0C4':(j%2?'#BFC8D4':'#C9D1DC'));op(w,h>.3?1:0)});
    drawTo(d.lit,E.inOutCubic(P(u,d.t,d.t+.35)));
    d.dots.forEach((dt,j)=>{if(u<d.t+.4){op(dt,0);return}const ph=((u-d.t)*.6+j*.5)%1,q=j?1-ph:ph;C(dt,{x:lerp(d.p0.x,d.p1.x,q),y:lerp(d.p0.y,d.p1.y,q)});op(dt,Math.sin(Math.PI*ph))});
    const top=ip(v,d.cx,d.cy,h), bk=E.outBack(P(u,d.t+.3,d.t+.6));
    d.badge.setAttribute('transform',`translate(${top.x.toFixed(1)} ${(top.y-26).toFixed(1)}) scale(${Math.max(.001,bk).toFixed(3)})`); op(d.badge,bk);
    d.tag.setAttribute('transform',`translate(${top.x.toFixed(1)} ${(top.y-60).toFixed(1)}) scale(${Math.max(.001,bk).toFixed(3)})`); op(d.tag,bk);
  });
  const hk=E.outBack(P(u,1.5,1.9)); const ht=ip(v,0,0,1.03); S.hubTag.at(ht.x,ht.y,74,hk);
  // one academic year goes round
  drawTo(S.ring,E.inOutCubic(P(u,1.9,5.3)));
  const c0=ip(v,0,0,0), er=isoR(v,5.6);
  op(S.yearTag,E.outCubic(P(u,1.6,2.0)));
  const ck=E.outBack(P(u,5.35,5.7)); S.check.setAttribute('transform',`translate(${c0.x.toFixed(1)} ${(c0.y+er.ry).toFixed(1)}) scale(${Math.max(.001,ck).toFixed(3)})`); op(S.check,ck);
  // card payments reach the fees office
  const fees=S.deps[2], ft=ip(v,fees.cx,fees.cy,fees.h), hs=ip(v,0,0,1.1), ck2=E.inOutCubic(P(u,3.7,4.3));
  if(u<3.7){op(S.card,0)} else {const x=lerp(hs.x,ft.x+30,ck2), y=lerp(hs.y,ft.y-26,ck2)-Math.sin(Math.PI*ck2)*60;
    S.card.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${lerp(.6,1,ck2).toFixed(3)})`); op(S.card,1)}
}});

// =====================================================================
// The team: a unit of three engineers under one lead, drawn as a clean tree
// =====================================================================
scene('team',{dur:7.0,
build(root,{defs,id}){
  const S={}, v=S.v=view(410,112,38);
  isoStage(root,defs,id,v,0,0,10,10);
  // the tree: lead → bus → three drops, on the ground
  const LN=svg('g',{},root);
  const path=(list)=>drawPath(svg('path',{d:'M '+list.map(([x,y])=>{const p=ip(v,x,y,.02);return p.x.toFixed(1)+' '+p.y.toFixed(1)}).join(' L '),fill:'none',stroke:K.teal2,'stroke-width':3.5,'stroke-linecap':'round','stroke-linejoin':'round'},LN));
  const back=(list)=>svg('path',{d:'M '+list.map(([x,y])=>{const p=ip(v,x,y,.02);return p.x.toFixed(1)+' '+p.y.toFixed(1)}).join(' L '),fill:'none',stroke:K.line2,'stroke-width':7,'stroke-linecap':'round','stroke-linejoin':'round'},LN);
  const TRUNK=[[3.5,3.5],[5.25,5.25]], BUS_A=[[5.25,5.25],[7.25,3.25]], BUS_B=[[5.25,5.25],[3.25,7.25]];
  const KIDS=[{name:'Backend',icon:'code',col:K.ind,m:M.ind,c:[8.5,4.5],drop:[[7.25,3.25],[8.2,4.2]]},
              {name:'Frontend',icon:'ui',col:K.amb,m:M.amb,c:[6.5,6.5],drop:[[5.25,5.25],[6.2,6.2]]},
              {name:'Mobile',icon:'app',col:K.rose,m:M.rose,c:[4.5,8.5],drop:[[3.25,7.25],[4.2,8.2]]}];
  [TRUNK,BUS_A,BUS_B,...KIDS.map(k=>k.drop)].forEach(back);
  S.trunk=path(TRUNK); S.busA=path(BUS_A); S.busB=path(BUS_B);
  KIDS.forEach(k=>k.line=path(k.drop));
  S.pulses=KIDS.map((k,i)=>({k,el:svg('circle',{r:4.5,fill:K.teal2,stroke:'#FFFFFF','stroke-width':1.2},LN),back:svg('circle',{r:4,fill:k.col,stroke:'#FFFFFF','stroke-width':1.2},LN),route:[...TRUNK,...(i===0?BUS_A.slice(1):i===2?BUS_B.slice(1):[]),...k.drop.slice(1)]}));
  // pedestals, back to front
  S.lead=new IsoBox(root,v,M.teal); S.lead.set(2.7,2.7,0,1.6,1.6,.001);
  S.kids=KIDS.map(k=>Object.assign(k,{box:new IsoBox(root,v,k.m).set(k.c[0]-.8,k.c[1]-.8,0,1.6,1.6,.001)}));
  S.leadBadge=badge(root,20,K.teal,g=>ICON.person(g,K.teal));
  S.leadTag=pill(root,0,0,'UNIT LEAD',{color:K.teal,size:11,h:24});
  S.kids.forEach(k=>{k.badge=badge(root,18,k.col,g=>ICON[k.icon](g,k.col));k.tag=pill(root,0,0,k.name,{color:k.col,size:11,h:24});k.done=badge(root,11,K.teal,g=>svg('path',{d:'M -4.5 0 l 3 3 l 6 -6',fill:'none',stroke:K.teal,'stroke-width':2.4,'stroke-linecap':'round'},g),{fill:K.tealLL})});
  S.unit=pill(root,410,62,'SOFTWARE SYSTEMS & NETWORKS UNIT',{color:K.ink2,size:LANG==='de'?10:11,h:28});
  S.three=pill(root,410,640,'3 ENGINEERS',{color:K.ind,size:11.5,h:28});
  return S;
},
render(S,u){
  const v=S.v;
  popAt(S.unit,410,62,E.outBack(P(u,.1,.45)));
  const lk=E.outBack(P(u,.4,.9)); S.lead.set(2.7,2.7,0,1.6,1.6,Math.max(.001,1.1*clamp(lk,0,1.05)));
  const lt=ip(v,3.5,3.5,1.1*clamp(lk,0,1)), lb=E.outBack(P(u,.8,1.1));
  S.leadBadge.setAttribute('transform',`translate(${lt.x.toFixed(1)} ${(lt.y-30).toFixed(1)}) scale(${Math.max(.001,lb).toFixed(3)})`); op(S.leadBadge,lb);
  S.leadTag.setAttribute('transform',`translate(${lt.x.toFixed(1)} ${(lt.y-68).toFixed(1)}) scale(${Math.max(.001,lb).toFixed(3)})`); op(S.leadTag,lb);
  drawTo(S.trunk,E.inOutCubic(P(u,1.1,1.4))); drawTo(S.busA,E.inOutCubic(P(u,1.4,1.75))); drawTo(S.busB,E.inOutCubic(P(u,1.4,1.75)));
  S.kids.forEach((k,i)=>{const t=1.75+i*.12;
    drawTo(k.line,E.inOutCubic(P(u,t,t+.2)));
    const kk=E.outBack(P(u,t+.15,t+.55)); k.box.set(k.c[0]-.8,k.c[1]-.8,0,1.6,1.6,Math.max(.001,.7*clamp(kk,0,1.05)));
    const top=ip(v,k.c[0],k.c[1],.7*clamp(kk,0,1)), bk=E.outBack(P(u,t+.4,t+.7));
    k.badge.setAttribute('transform',`translate(${top.x.toFixed(1)} ${(top.y-28).toFixed(1)}) scale(${Math.max(.001,bk).toFixed(3)})`); op(k.badge,bk);
    k.tag.setAttribute('transform',`translate(${top.x.toFixed(1)} ${(top.y-64).toFixed(1)}) scale(${Math.max(.001,bk).toFixed(3)})`); op(k.tag,bk);
    const dk=E.outBack(P(u,4.0+i*.3,4.3+i*.3)); k.done.setAttribute('transform',`translate(${(top.x+24).toFixed(1)} ${(top.y-40).toFixed(1)}) scale(${Math.max(.001,dk).toFixed(3)})`); op(k.done,dk);
  });
  // work flows down the tree, results come back up
  S.pulses.forEach((p,i)=>{
    const route=p.route.map(([x,y])=>ip(v,x,y,.05));
    const ph=((u-2.8)*.45+i*.33)%1; if(u<2.8){op(p.el,0);op(p.back,0);return}
    C(p.el,polyAt(route,ph)); op(p.el,Math.sin(Math.PI*ph));
    if(u>4.2){const pb=((u-4.2)*.45+i*.33+.5)%1;C(p.back,polyAt(route,1-pb));op(p.back,Math.sin(Math.PI*pb))} else op(p.back,0);
  });
  popAt(S.three,410,640,E.outBack(P(u,2.6,2.95)));
}});
