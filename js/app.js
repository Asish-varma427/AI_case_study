/* ===== Edit these two lines with your details ===== */
const STUDENT={name:"U ASISH VARMA",reg:"24BAI0077"};

const $=id=>document.getElementById(id);
const DEF_I="283164705",DEF_G="123804765";
const MV=[["Up",-3],["Down",3],["Left",-1],["Right",1]];

/* ---------- puzzle helpers ---------- */
function nbrs(s){const i=s.indexOf("0"),r=i/3|0,c=i%3,o=[];
 for(const [n,d] of MV){
  if((n=="Up"&&r==0)||(n=="Down"&&r==2)||(n=="Left"&&c==0)||(n=="Right"&&c==2))continue;
  const a=s.split("");a[i]=a[i+d];a[i+d]="0";o.push(a.join(""));}
 return o;}
const manH=(s,g)=>{let t=0;for(let i=0;i<9;i++){if(s[i]=="0")continue;const j=g.indexOf(s[i]);t+=Math.abs((i/3|0)-(j/3|0))+Math.abs(i%3-j%3);}return t};
const misH=(s,g)=>{let t=0;for(let i=0;i<9;i++)if(s[i]!="0"&&s[i]!=g[i])t++;return t};
const inv=s=>{let c=0;for(let i=0;i<9;i++)for(let j=i+1;j<9;j++)if(s[i]!="0"&&s[j]!="0"&&s[i]>s[j])c++;return c};
const solvable=(a,g)=>inv(a)%2==inv(g)%2;

/* ---------- search engine (BFS, DFS, DLS, IDDLS, GBFS, A*) ---------- */
function core(kind,init,goal,o={}){
 if(kind=="iddls"){
  const t0=performance.now(),cap=o.cap||2e5;let T={gen:0,exp:0,maxD:0,maxF:0,seenN:0},r;
  for(let L=0;L<=(o.limit??30);L++){
   r=core("dls",init,goal,{...o,limit:L,cap:cap-T.exp});
   T.gen+=r.gen;T.exp+=r.exp;T.maxD=Math.max(T.maxD,r.maxD);T.maxF=Math.max(T.maxF,r.maxF);
   if(r.found||T.exp>=cap)break;}
  return {...r,...T,ms:performance.now()-t0,trunc:!r.found&&T.exp>=cap};}
 const t0=performance.now(),cap=o.cap||2e5,lim=o.limit,H=o.h=="mis"?misH:manH,tr=o.trace;
 const mk=(s,p,d)=>({s,p,d,h:H(s,goal)});
 const open=[mk(init,null,0)],seen=new Map(),expl=[];
 let qi=0,gen=1,exp=0,maxD=0,maxF=1,found=null;
 if(kind=="bfs")seen.set(init,0);
 while(open.length-qi>0&&exp<cap){
  let n;
  if(kind=="bfs")n=open[qi++];
  else if(kind=="dfs"||kind=="dls")n=open.pop();               // stack: LIFO
  else{const f=x=>kind=="gbfs"?x.h:x.d+x.h;let b=0;
   for(let i=1;i<open.length;i++)if(f(open[i])<f(open[b]))b=i;
   n=open.splice(b,1)[0];}
  if(kind=="dfs"||kind=="gbfs"||kind=="astar"){                // skip states already reached at equal or shallower depth
   if(seen.has(n.s)&&seen.get(n.s)<=n.d)continue;seen.set(n.s,n.d);}
  exp++;maxD=Math.max(maxD,n.d);expl.push(n.s);
  const kids=[];
  if(n.s!=goal&&(lim==null||n.d<lim)){
   for(const s of nbrs(n.s)){
    if(n.p&&n.p.s==s)continue;
    if(kind=="bfs"){if(seen.has(s))continue;seen.set(s,n.d+1);}
    kids.push(mk(s,n,n.d+1));}}
  gen+=kids.length;
  if(kind=="dfs"||kind=="dls"){for(let i=kids.length-1;i>=0;i--)open.push(kids[i]);} // first move ends on top
  else open.push(...kids);
  maxF=Math.max(maxF,open.length-qi);
  if(tr&&tr.length<3000){const F=x=>kind=="gbfs"?x.h:x.d+x.h,rest=open.slice(qi),
   fr=kind=="bfs"?rest.slice(0,8):(kind=="gbfs"||kind=="astar")?rest.slice().sort((a,b)=>F(a)-F(b)).slice(0,8):rest.slice(-8).reverse();
   tr.push({t:"s",s:n.s,d:n.d,h:n.h,f:F(n),par:n.p?n.p.s:null,kids:kids.map(k=>k.s),kf:kids.map(k=>F(k)),
   fr:fr.map(x=>x.s),frN:open.length-qi,ex:expl.slice(-8).reverse(),exN:exp,gen});}
  if(n.s==goal){found=n;break;}
 }
 let path=null;if(found){path=[];for(let x=found;x;x=x.p)path.unshift(x.s);}
 return {found:!!found,path,cost:found?found.d:null,gen,exp,maxD,maxF,seenN:seen.size,ms:performance.now()-t0,trunc:!found&&exp>=cap};
}
const memKB=r=>(r.maxF+r.seenN)*64/1024;
const memLbl=k=>k<50?"Low":k<500?"Medium":"High";

/* ---------- drawing ---------- */
function mini(s,hl){return `<span class="mini${hl?" hl":""}">${[...s].map(c=>`<i class="${c=="0"?"z":""}">${c=="0"?"":c}</i>`).join("")}</span>`}
function setBoard(el,s,g){
 if(!el.children.length)for(let n=1;n<9;n++){const d=document.createElement("div");d.className="t";d.dataset.n=n;d.textContent=n;el.appendChild(d);}
 for(const d of el.children){const i=s.indexOf(d.dataset.n);d.classList.toggle("ok",!!g&&g[i]==d.dataset.n);d.style.left=`calc(var(--w)/3*${i%3})`;d.style.top=`calc(var(--w)/3*${i/3|0})`;}
}
function buildGrid(id,p,val){
 const g=$(id);g.innerHTML="";
 for(let i=0;i<9;i++){const e=document.createElement("input");e.id=p+i;e.maxLength=1;e.className="form-control cell text-center";e.setAttribute("aria-label",`${p=="i"?"Initial":"Goal"} row ${(i/3|0)+1} column ${i%3+1}`);
  e.value=val[i]=="0"?"":val[i];e.addEventListener("input",()=>{frames=[];res=null;stop();refreshStatic();});g.appendChild(e);}
}
function readBoard(p){
 let s="";for(let i=0;i<9;i++){let v=$(p+i).value.trim();s+=(v==""||v=="_"||v=="0")?"0":v;}
 return [..."012345678"].every(c=>s.split(c).length==2)?s:null;
}
function setGrid(p,s){for(let i=0;i<9;i++)$(p+i).value=s[i]=="0"?"":s[i];}
function refreshStatic(){
 const i=readBoard("i"),g=readBoard("g");
 if(!i||!g){$("msg").textContent="Each state must use the digits 1 to 8 once, with one blank.";return false}
 $("msg").textContent=solvable(i,g)?"":"These states cannot reach each other (parity differs). Change a state or generate a random puzzle.";
 setBoard($("ib"),i);setBoard($("gb"),g);setBoard($("cur"),i,g);meter(i,g);return solvable(i,g);
}

function meter(s,g){let n=0;for(let i=0;i<9;i++)if(s[i]!="0"&&s[i]==g[i])n++;$("gm").textContent=n;$("gmb").style.width=n/8*100+"%";}
const INF=()=>["gbfs","astar"].includes($("alg").value);
const NAMES={dfs:"DFS",bfs:"BFS",dls:"DLS",iddls:"IDDLS",gbfs:"GBFS",astar:"A*"};
const FRONT={dfs:"stack, top first",dls:"stack, top first",bfs:"FIFO queue, front first",iddls:"stack, top first",gbfs:"priority list",astar:"priority list"};
function algUI(){const k=$("alg").value;$("hrow").classList.toggle("d-none",!(k=="gbfs"||k=="astar"));
 $("lrow").classList.toggle("d-none",!(k=="dfs"||k=="dls"||k=="iddls"));$("algtag").textContent=NAMES[k];}
$("alg").onchange=()=>{frames=[];res=null;stop();algUI();refreshStatic();};
$("hs").onchange=$("alg").onchange;
/* ---------- solver page state ---------- */
let frames=[],res=null,idx=0,play=false,tm=null,off=0;
function solve(){
 if(!refreshStatic())return false;
 const i=readBoard("i"),g=readBoard("g"),tr=[];
 const k=$("alg").value,lm=(k=="dfs"||k=="dls"||k=="iddls")?(+$("lim").value||30):undefined;
 res=core(k,i,g,{limit:lm,h:$("hs").value,trace:tr,cap:50000});off=tr.length;
 frames=tr.concat(res.found?res.path.map((s,k)=>({t:"p",s,k,n:res.path.length-1})):[]);
 idx=0;$("scrub").max=frames.length-1;
 const kb=memKB(res);
 $("sum").innerHTML=`<div class="row g-2">${[
  ["Solution",res.found?"Found":"Not found"],["Total moves",res.found?res.cost:"-"],["Nodes generated",res.gen],["Nodes expanded",res.exp],
  ["Maximum search depth",res.maxD],["Execution time",res.ms.toFixed(2)+" ms"],["Path cost",res.found?res.cost:"-"],["Memory (approx.)",kb.toFixed(1)+" KB ("+memLbl(kb)+")"]
 ].map(([a,b])=>`<div class="col-6 col-md-3"><div class="stat">${a}<b>${b}</b></div></div>`).join("")}</div>`+
 (res.exp>3000?`<p class="mt-2 mb-0">The animation shows the first 3,000 expansions, then the final path. The summary counts every expansion.</p>`:"")+
 (!res.found?`<p class="mt-2 mb-0 text-danger">No solution found (depth cap or expansion cap reached). Raise the cap and run again.</p>`:"")+(res.found?`<p class="mt-2 mb-0 text-success">${NAMES[k]} solved it in ${res.cost} moves${res.cost==OPT(i,g)?" (optimal)":" (optimal is "+OPT(i,g)+")"}.</p>`:"");
 $("path").innerHTML=res.found?res.path.map((s,k)=>`<span data-k="${k}" class="d-inline-block text-center me-1 pk" role="button" tabindex="0"><div>Step ${k}</div>${mini(s)}</span>${k<res.path.length-1?`<span class="arr">→</span>`:""}`).join(""):"No solution path.";
 draw();return true;
}
function draw(){
 const f=frames[idx];
 if(!f){return}
 $("scrub").value=idx;setBoard($("cur"),f.s,readBoard("g"));meter(f.s,readBoard("g"));
 const st=$("stepinfo"),mv=$("mvinfo"),inf=$("info");
 document.querySelectorAll("#path [data-k]").forEach(e=>e.firstChild.style.fontWeight=(f.t=="p"&&+e.dataset.k==f.k)?"800":"400");
 document.querySelectorAll("#path .pk").forEach(e=>e.classList.toggle("cur",f.t=="p"&&+e.dataset.k==f.k));
 if(f.t=="s"){
  st.textContent=`Search step ${idx+1} of ${frames.length}`;mv.textContent=`Expanding the next node from the ${NAMES[$("alg").value]} frontier`;
  inf.innerHTML=`<div class="row g-2 mb-2">
   <div class="col-6 col-md-3"><div class="stat">Current node ${mini(f.s)}</div></div>
   <div class="col-6 col-md-3"><div class="stat">Parent ${f.par?mini(f.par):"<b>none</b>"}</div></div>
   <div class="col-4 col-md-2"><div class="stat">Depth<b>${f.d}</b></div></div>
   <div class="col-4 col-md-2"><div class="stat">Path cost g(n)<b>${f.d}</b></div></div>
   <div class="col-4 col-md-2"><div class="stat">Frontier size<b>${f.frN}</b></div></div>${INF()?`<div class="col-4 col-md-2"><div class="stat">Heuristic h(n)<b>${f.h}</b></div></div><div class="col-4 col-md-2"><div class="stat">Cost g(n)<b>${f.d}</b></div></div><div class="col-4 col-md-2"><div class="stat">f(n) = ${$("alg").value=="gbfs"?"h(n)":"g(n)+h(n)"}<b>${f.f}</b></div></div>`:""}
   <div class="col-6 col-md-3"><div class="stat">Nodes generated<b>${f.gen}</b></div></div>
   <div class="col-6 col-md-3"><div class="stat">Nodes expanded<b>${f.exN}</b></div></div></div>
   <div class="mb-2"><b>Generated successors</b> ${f.kids.length?f.kids.map((k,x)=>INF()?`<span class="d-inline-block text-center">${mini(k)}<div class="kf">f=${f.kf[x]}</div></span>`:mini(k)).join(""):"none (goal reached or depth cap hit)"}</div>
   <div class="mb-2"><b>Frontier / open list (${FRONT[$("alg").value]}${INF()?", lowest f first":""}, showing up to 8 of ${f.frN})</b><br>${f.fr.map(k=>mini(k)).join("")||"empty"}</div>
   <div><b>Explored / closed list (latest first, showing up to 8 of ${f.exN})</b><br>${f.ex.map(k=>mini(k)).join("")}</div>`;
 }else{
  st.textContent=`Solution path, step ${f.k} of ${f.n}`;
  if(f.k==0)mv.textContent="Initial state";
  else{const p=frames[idx-1].t=="p"?frames[idx-1].s:null;
   const d=p?f.s.indexOf("0")-p.indexOf("0"):0;mv.textContent=p?`Blank moves ${MV.find(m=>m[1]==d)[0]}`:"";}
  if(f.k==f.n)mv.textContent+=" (goal reached)";
 }
}
function speed(){return 1100-$("spd").value*100}
function tick(){clearTimeout(tm);if(!play)return;
 if(idx<frames.length-1){idx++;draw();tm=setTimeout(tick,speed());}else play=false;}
function stop(){play=false;clearTimeout(tm)}
$("run").onclick=()=>{stop();if(!solve())return;play=true;tm=setTimeout(tick,speed());draw()};
$("pause").onclick=stop;
$("resume").onclick=()=>{if(!frames.length&&!solve())return;if(!play){play=true;tick();}};
$("next").onclick=()=>{stop();if(!frames.length&&!solve())return;if(idx<frames.length-1){idx++;draw();}};
$("prev").onclick=()=>{stop();if(idx>0){idx--;draw();}};
$("reset").onclick=()=>{stop();idx=0;if(frames.length)draw();else refreshStatic();
 $("stepinfo").textContent="Press Run to start";$("mvinfo").textContent="";setBoard($("cur"),readBoard("i")||DEF_I);};
$("rnd").onclick=()=>{
 stop();frames=[];res=null;
 const g=readBoard("g")||DEF_G;let s=g,prev="";
 for(let k=0;k<40;k++){const o=nbrs(s).filter(x=>x!=prev);prev=s;s=o[Math.random()*o.length|0];}
 if(s==g)s=nbrs(g)[0];
 setGrid("i",s);refreshStatic();};
$("ex").onclick=()=>{stop();frames=[];res=null;setGrid("i",DEF_I);setGrid("g",DEF_G);refreshStatic();};

$("scrub").oninput=()=>{stop();if(!frames.length)return;idx=+$("scrub").value;draw();};
$("path").onclick=e=>{const s=e.target.closest("[data-k]");if(s&&frames.length){stop();idx=off+ +s.dataset.k;draw();}};
$("shuf").onclick=()=>$("rnd").click();
addEventListener("keydown",e=>{if(location.hash!="#solver"||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)&&e.target.type!="range")return;
 if(e.code=="Space"){e.preventDefault();play?stop():$("resume").click();}
 else if(e.key=="ArrowRight"){e.preventDefault();$("next").click();}
 else if(e.key=="ArrowLeft"){e.preventDefault();$("prev").click();}
 else if(e.key=="r"||e.key=="R")$("reset").click();});
const OPT=(i,g)=>core("astar",i,g,{h:"man",cap:50000}).cost;
/* ---------- comparison ---------- */
$("cmp").onclick=()=>{
 if(!refreshStatic())return;
 const i=readBoard("i"),g=readBoard("g"),h=$("ch").value;
 const rows=[["BFS","bfs",{}],["DFS","dfs",{limit:+$("lim").value||30}],["DLS","dls",{limit:+$("cl").value||12}],["IDDLS","iddls",{limit:30}],
  ["GBFS","gbfs",{h}],["A*","astar",{h}]];
 const R=rows.map(([n,k,o])=>[n,core(k,i,g,{...o,cap:50000})]);
 const mx=Math.max(...R.map(x=>x[1].exp)),best=Math.min(...R.filter(x=>x[1].found).map(x=>x[1].cost)),fast=Math.min(...R.filter(x=>x[1].found).map(x=>x[1].exp));
 $("ct").tBodies[0].innerHTML=R.map(([n,r])=>{const kb=memKB(r);
  return `<tr><td><b>${n}</b></td><td>${r.found?"Yes":r.trunc?"No (stopped at cap)":"No"}</td><td>${r.gen}</td><td class="barc"><span class="bar" style="width:${Math.max(3,r.exp/mx*100)}%"></span><span class="bv">${r.exp}${r.found&&r.exp==fast?' <em class="tag">fewest</em>':""}</span></td><td>${r.found?r.cost:"-"}${r.found&&r.cost==best?' <em class="tag">shortest</em>':""}</td><td>${r.ms.toFixed(1)} ms</td><td>${memLbl(kb)} (${kb.toFixed(0)} KB)</td></tr>`;}).join("");
};

/* ---------- algorithm information ---------- */
const INFO=[
 ["Breadth First Search (BFS)","Expands the shallowest unexpanded node first.","Keeps the frontier in a FIFO queue, so every node at depth d is expanded before any node at depth d+1.","Finds the shortest solution when every move costs the same.","Stores every generated state, so memory grows fast.","O(b^d)","O(b^d)","Yes","Yes (unit step cost)"],
 ["Depth First Search (DFS)  Implemented in this project","Expands the deepest node first and backtracks when it hits a dead end.","Keeps the frontier in a LIFO stack. A visited set stops repeated states, and a depth cap stops endless descent.","Needs little memory and can find a goal quickly when it dives the right way.","Solutions are often far longer than necessary, and it can waste effort deep in the wrong branch.","O(b^m)","O(b*m) in tree form","No in general. Yes in a finite space with a visited set.","No"],
 ["Depth Limited Search (DLS)","DFS that never expands a node deeper than a fixed limit l.","Same stack as DFS. Nodes at depth l are treated as leaves.","Fixed small memory and no infinite descent.","Misses solutions deeper than l, and a large l can still be slow.","O(b^l)","O(b*l)","No (if the goal is deeper than l)","No"],
 ["Iterative Deepening DLS (IDDLS)","Runs DLS with limit 0, 1, 2 and so on until a goal appears.","Each round is a fresh DLS. Shallow levels are repeated, but the deepest level dominates the cost.","Combines BFS completeness and optimality with DFS-level memory.","Repeats work from earlier rounds.","O(b^d)","O(b*d)","Yes","Yes (unit step cost)"],
 ["Greedy Best First Search (GBFS)","Expands the node that looks closest to the goal, using f(n) = h(n).","Keeps an open list ordered by the heuristic only and ignores the cost already paid.","Often very fast and expands few nodes.","Can follow misleading heuristic values and return a long path.","O(b^m) worst case","O(b^m) worst case","Yes with a visited set in a finite space","No"],
 ["A* Search","Expands the node with the lowest f(n) = g(n) + h(n).","Balances the cost so far g(n) against the estimated cost to go h(n).","Optimal with an admissible heuristic, and usually expands far fewer nodes than BFS.","Stores all generated nodes, so memory can be large.","Exponential in the heuristic error","O(b^d)","Yes","Yes (Misplaced Tiles and Manhattan Distance are admissible)"]];
$("ai").innerHTML=INFO.map(a=>`<div class="col-md-6"><div class="card h-100"><div class="card-body"><h2 class="h5">${a[0]}</h2><p>${a[1]}</p><dl class="small mb-0">
 <dt>Working principle</dt><dd>${a[2]}</dd><dt>Advantages</dt><dd>${a[3]}</dd><dt>Limitations</dt><dd>${a[4]}</dd>
 <dt>Time complexity</dt><dd>${a[5]}</dd><dt>Space complexity</dt><dd>${a[6]}</dd><dt>Completeness</dt><dd>${a[7]}</dd><dt>Optimality</dt><dd>${a[8]}</dd></dl></div></div></div>`).join("");

/* ---------- navigation and startup ---------- */
function route(){const h=(location.hash||"#home").slice(1);
 document.querySelectorAll(".pg").forEach(p=>p.classList.toggle("on",p.id==h));
 document.querySelectorAll(".nav-link").forEach(a=>a.classList.toggle("on",a.getAttribute("href")=="#"+h));}
addEventListener("hashchange",route);
$("sn").textContent=STUDENT.name;$("sr").textContent=STUDENT.reg;
buildGrid("ig","i",DEF_I);buildGrid("gg","g",DEF_G);
setBoard($("hb"),DEF_I,DEF_G);algUI();refreshStatic();route();
// home board demo: slide the blank around gently
{let s=DEF_I,pv="";setInterval(()=>{if(location.hash&&location.hash!="#home")return;const o=nbrs(s).filter(x=>x!=pv);pv=s;s=o[Math.random()*o.length|0];setBoard($("hb"),s,DEF_G);},1400);}
