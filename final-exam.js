"use strict";
/* FINAL tab: Wireless & Broadband Computer Networks final exam preparation.
   Thursday 22 October 2026, 12:00-15:00, Room 2-307. 60 multiple-choice questions,
   30 points, Chapters 6-9, closed book, calculator allowed. */
(function(){
if(window.__wnFinalExamLoaded)return;window.__wnFinalExamLoaded=true;
var sec=document.getElementById("final");if(!sec||!window.QB||typeof store==="undefined")return;
var wrap=sec.querySelector(".wrap");if(!wrap)return;

var EXAM_START=new Date("2026-10-22T12:00:00+07:00").getTime(),EXAM_END=new Date("2026-10-22T15:00:00+07:00").getTime();
var TS=["6","7","8","9"],NAMES={"6":"LPWAN","7":"Broadband architecture","8":"Broadband design","9":"QoS"},PER=15,MINUTES=180;
var BANK={},ALL=[];
function pad(n){return String(n).padStart(2,"0")}
TS.forEach(function(t){
  BANK[t]=QB.filter(function(q){return q.t===t});
  BANK[t].forEach(function(q,i){q.__fid="F"+t+"-"+pad(i+1)});
  ALL=ALL.concat(BANK[t]);
});
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}

var css=document.createElement("style");css.textContent='\
#final .fx{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:9px;margin-top:12px}\
#final .fx div{border:1px solid var(--line);border-radius:9px;background:var(--panel2);padding:10px 12px}\
#final .fx b{display:block;font:700 16px var(--mono);color:var(--cy)}#final .fx span{font:10px var(--mono);color:var(--faint);text-transform:uppercase;letter-spacing:.8px}\
#final .cd{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}#final .cd div{min-width:78px;text-align:center;border:1px solid var(--line2);border-radius:10px;padding:10px 12px;background:var(--panel2)}\
#final .cd b{display:block;font:800 26px var(--mono);color:var(--am)}#final .cd span{font:10px var(--mono);color:var(--faint);text-transform:uppercase}\
#final .cov{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:12px}\
#final .cov div{border:1px solid var(--line);border-radius:10px;background:var(--panel2);padding:12px}\
#final .cov b{display:block;font-size:14.5px}#final .cov small{display:block;color:var(--faint);font-size:12px;margin-top:2px}\
#final .cov .bar2{height:6px;border-radius:99px;background:var(--line);overflow:hidden;margin-top:9px}#final .cov .bar2 i{display:block;height:100%;background:var(--gr)}\
#final .cov .go{margin-top:9px;font-size:12px;padding:6px 10px}\
#final .calcs{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-top:12px}\
#final .calc{border:1px solid var(--line);border-radius:10px;background:var(--panel2);padding:12px}\
#final .calc h4{margin:0 0 8px;color:var(--cy)}\
#final .calc label{display:flex;justify-content:space-between;align-items:center;gap:8px;font:12px var(--mono);color:var(--dim);margin-top:6px}\
#final .calc input{width:96px;text-align:right}\
#final .calc .out{margin-top:10px;padding:9px 10px;border-radius:8px;border:1px solid var(--line2);font:700 13px var(--mono);color:var(--gr);background:var(--panel)}\
#final .mq{font-size:17px;font-weight:700;margin:8px 0}\
#final .opt{display:block;width:100%;text-align:left;margin-top:7px;padding:10px 12px;border:1px solid var(--line2);border-radius:9px;background:var(--panel2);color:var(--ink);cursor:pointer;font:inherit}\
#final .opt:hover:not(:disabled){border-color:var(--cy)}#final .opt.sel{border-color:var(--cy);background:color-mix(in srgb,var(--cy) 12%,var(--panel2))}\
#final .opt.ok{border-color:var(--gr);background:color-mix(in srgb,var(--gr) 14%,var(--panel2))}#final .opt.no{border-color:var(--rd);background:color-mix(in srgb,var(--rd) 14%,var(--panel2))}\
#final .why{margin-top:10px;padding:10px 12px;border:1px solid var(--line2);border-radius:8px;background:var(--panel2);font-size:13.5px}\
#final .fcode{display:inline-block;padding:4px 8px;border:1px solid var(--vi);border-radius:5px;color:var(--vi);font:700 11px var(--mono)}\
#final .fnav{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px}#final .fpos{font:700 11px var(--mono);color:var(--dim)}\
#final .fbar{height:7px;background:var(--panel2);border:1px solid var(--line);border-radius:99px;overflow:hidden;margin:12px 0}#final .fbar i{display:block;height:100%;background:var(--vi)}\
#final .fh{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font:11px var(--mono);color:var(--faint)}\
#final .fmap{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:12px}\
#final .fmap button{padding:6px 0;border:1px solid var(--line);border-radius:6px;background:var(--panel2);color:var(--dim);font:700 11px var(--mono);cursor:pointer}\
#final .fmap button.a{border-color:var(--cy);color:var(--cy)}#final .fmap button.cur{background:var(--cy);color:var(--bg)}\
#final .fmap button.ok{border-color:var(--gr);color:var(--gr)}#final .fmap button.no{border-color:var(--rd);color:var(--rd)}\
#final .timer{font:800 20px var(--mono);color:var(--am)}#final .timer.low{color:var(--rd)}\
#final .score{font:800 34px var(--mono);color:var(--gr);margin:6px 0}\
#final .rv{max-height:560px;overflow:auto;margin-top:10px}#final .rv p{margin-top:12px;font-size:13.5px}\
@media(max-width:620px){#final .fmap{grid-template-columns:repeat(6,1fr)}}';
document.head.appendChild(css);

/* ============ page skeleton ============ */
wrap.innerHTML=
'<h1><span class="pre">// FINAL EXAM</span>Chapters 6 to 9. One sitting.</h1>'+
'<p class="lede">Multiple choice, closed book, calculator allowed. Everything you need for the final in one place.</p>'+

'<div class="panel pa" id="finInfo"><div class="ph"><span class="badge am">ANNOUNCED</span><h2>Final exam announcement</h2><span class="badge am right">TERM 1/2569</span></div>'+
 '<div class="fx">'+
 '<div><b>Thu 22 Oct 2026</b><span>date</span></div><div><b>12:00 – 15:00</b><span>time · 3 hours</span></div><div><b>Room 2-307</b><span>where</span></div>'+
 '<div><b>60 MCQ</b><span>format</span></div><div><b>30 points</b><span>no more term paper</span></div><div><b>CH 6 · 7 · 8 · 9</b><span>chapters covered</span></div>'+
 '<div><b>Closed book</b><span>no notes</span></div><div><b>Calculator OK</b><span>not much calculation</span></div></div>'+
 '<div class="cd" id="finCd"></div>'+
 '<p class="sub2" style="margin-top:12px" id="finPace"></p></div>'+

'<div class="panel pg" id="finCov"><div class="ph"><h2>Where you stand</h2><span class="badge gr right" id="finCovTot"></span></div>'+
 '<p class="sub2">Section progress comes from the “mark done” boxes in CHAPTERS. Question counts are what this console can test you on. The real mix of questions per chapter is not announced, so the mock below uses an even 15 per chapter.</p>'+
 '<div class="cov" id="finCovGrid"></div></div>'+

'<div class="panel pv"><div class="ph"><h2>Numbers and formulas to have cold</h2><span class="badge right">calculator allowed</span></div>'+
 '<div class="tscroll"><table>'+
 '<tr><th>Eq</th><th>Formula</th><th>What to do with it</th></tr>'+
 '<tr><td class="mono ok">6.1</td><td class="mono">L = Ebattery / Pavg</td><td>Pavg = (1−d)·Isleep + d·Iactive. Lower duty cycle, longer life. 2400 mAh at 0.1% duty ≈ 6 years.</td></tr>'+
 '<tr><td class="mono ok">6.x</td><td class="mono">CAD duty = awake / interval</td><td>20 ms every 2 s = 1%. Every 1 s = 2%. Faster CAD allows a shorter preamble (1.2 s → about 0.6 s).</td></tr>'+
 '<tr><td class="mono ok">7.1</td><td class="mono">O = N·Raccess / Ruplink</td><td>400 × 100 Mb/s over 10 Gb/s = 4:1. Double N and O doubles.</td></tr>'+
 '<tr><td class="mono ok">7.x</td><td class="mono">splitter loss ≈ 10·log₁₀(N)</td><td>About +3 dB per doubling of the split. 1:32 ≈ 15 dB, 1:64 ≈ 18 dB. Budget = Tx − Rx,min minus all losses.</td></tr>'+
 '<tr><td class="mono ok">8.1</td><td class="mono">A = MTBF / (MTBF + MTTR)</td><td>2000 h and 8 h = 99.60%. MTTR 2 h = 99.90%. Parallel: 1−(1−A)². Series: A·A.</td></tr>'+
 '<tr><td class="mono ok">9.1</td><td class="mono">De2e = Dproc + Dqueue + Dtrans + Dprop</td><td>During congestion Dqueue is the term that grows. It is also the most controllable.</td></tr>'+
 '</table></div>'+
 '<div class="calcs" id="finCalcs"></div></div>'+

'<div class="panel pr"><div class="ph"><h2>High-yield contrasts</h2><span class="badge rd right">likely MCQ traps</span></div>'+
 '<div class="tscroll"><table>'+
 '<tr><th>Pair</th><th>Difference to remember</th></tr>'+
 '<tr><td><b>NB-IoT vs LTE-M</b></td><td>NB-IoT: low-rate, stationary, delay-tolerant, deep coverage. LTE-M: higher rate, lower latency, mobility.</td></tr>'+
 '<tr><td><b>LoRaWAN vs cellular LPWAN</b></td><td>Unlicensed, private gateways, duty-cycle limits and interference vs licensed, operator coverage, SIM management and operator dependency.</td></tr>'+
 '<tr><td><b>Preamble vs CAD</b></td><td>Preamble: lets a sleeping receiver notice a packet and align timing (costs transmitter airtime). CAD: brief receiver wake-up to sniff for a preamble (costs receiver energy).</td></tr>'+
 '<tr><td><b>MQTT vs ECHONET Lite</b></td><td>MQTT: broker with publish/subscribe topics over TCP. ECHONET Lite: appliance objects with properties for home energy control. Both ride on IP over Wi-Fi.</td></tr>'+
 '<tr><td><b>eBGP vs iBGP</b></td><td>eBGP between autonomous systems. iBGP inside one AS and needs a full mesh or route reflectors because it does not re-advertise iBGP-learned routes to iBGP peers.</td></tr>'+
 '<tr><td><b>BGP vs MPLS</b></td><td>BGP carries reachability, policy and VPN routes. MPLS forwards packets by label across the core. Push at ingress, swap in transit, pop at egress.</td></tr>'+
 '<tr><td><b>Outer vs inner label</b></td><td>Outer label reaches the egress PE across the core. Inner label picks the VRF or customer there. MPLS VPN is separation, not encryption.</td></tr>'+
 '<tr><td><b>APC vs UPC</b></td><td>APC angled polish cuts back reflection and is common in PON. Not interchangeable with UPC in design intent.</td></tr>'+
 '<tr><td><b>MTBF vs MTTR levers</b></td><td>Raise MTBF: route diversity, hardening, redundancy. Lower MTTR: spares, documentation, alarm correlation, repair workflow.</td></tr>'+
 '<tr><td><b>Physical vs logical topology</b></td><td>Cables, ducts and nodes vs VLANs, tunnels, VRFs and policy. One fiber can carry several logical services.</td></tr>'+
 '<tr><td><b>Strict priority vs WFQ</b></td><td>Strict priority protects small real-time volumes but can starve other classes. WFQ reserves relative shares for a fairer compromise.</td></tr>'+
 '<tr><td><b>Classification vs marking</b></td><td>Classification identifies the traffic. Marking encodes the treatment so downstream devices enforce it. Validate markings at the trust boundary.</td></tr>'+
 '<tr><td><b>Delay vs jitter</b></td><td>Delay is time to traverse the network. Jitter is its variation. Same average delay can feel very different.</td></tr>'+
 '</table></div></div>'+

'<div class="panel pa" id="finMock"><div class="ph"><span class="badge vi">MOCK</span><h2>Final practice exam</h2><span class="badge am right">best <b id="finBest">—</b></span></div>'+
 '<p class="sub2">Three fixed 60-question mocks (15 per chapter, shuffled) with a 3-hour timer, or work a chapter deck with instant feedback. Bank: <b id="finBank"></b> questions across CH6–CH9.</p>'+
 '<div class="row" id="finModes"></div><div id="finBody"></div></div>';

/* ============ countdown ============ */
function tick(){
  var now=Date.now(),el=document.getElementById("finCd"),pace=document.getElementById("finPace");if(!el)return;
  if(now>=EXAM_END){el.innerHTML='<div><b>DONE</b><span>exam over</span></div>';pace.textContent="The exam window has passed.";return}
  if(now>=EXAM_START){var r=Math.max(0,Math.floor((EXAM_END-now)/60000));el.innerHTML='<div><b>'+Math.floor(r/60)+'</b><span>hours left</span></div><div><b>'+pad(r%60)+'</b><span>min left</span></div>';pace.textContent="Exam in progress.";return}
  var ms=EXAM_START-now,d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4);
  el.innerHTML='<div><b>'+d+'</b><span>days</span></div><div><b>'+pad(h)+'</b><span>hours</span></div><div><b>'+pad(m)+'</b><span>minutes</span></div>';
  pace.textContent="Pace: 60 questions in 180 minutes is 3 minutes each. Do the easy ones first, flag the calculations, leave 15 minutes to review.";
}
tick();setInterval(tick,30000);

/* default the home page exam date to the announced day if the student has not set one */
try{
  var ed=document.getElementById("examDate");
  if(ed&&!ed.value){ed.value="2026-10-22";store.set("examDate","2026-10-22");ed.dispatchEvent(new Event("change"))}
}catch(e){}

/* ============ readiness by chapter ============ */
function coverage(){
  var done=store.get("done",[]),h="",totalDone=0,total=0;
  TS.forEach(function(t){
    var keys=Object.keys(TOPICS).filter(function(k){return TOPICS[k][2]===t}),n=keys.filter(function(k){return done.indexOf("t"+k)>-1}).length;
    totalDone+=n;total+=keys.length;
    var pct=keys.length?Math.round(n/keys.length*100):0,miss=(store.get("finalMissed",[])).filter(function(id){return id.charAt(1)===t}).length;
    h+='<div><b>CH'+t+' · '+NAMES[t]+'</b><small>'+n+'/'+keys.length+' sections done · '+BANK[t].length+' questions'+(miss?' · '+miss+' missed':'')+'</small><div class="bar2"><i style="width:'+pct+'%"></i></div>'+
       '<button class="btn go" data-fchap="'+t+'">Practise CH'+t+'</button></div>';
  });
  document.getElementById("finCovGrid").innerHTML=h;
  document.getElementById("finCovTot").textContent=totalDone+" / "+total+" SECTIONS";
}
document.getElementById("finCovGrid").addEventListener("click",function(e){var b=e.target.closest("[data-fchap]");if(!b)return;startDeck(b.dataset.fchap)});
sec.addEventListener("change",function(e){if(e.target.classList&&e.target.classList.contains("dn"))coverage()});
document.querySelectorAll(".dn").forEach(function(c){c.addEventListener("change",coverage)});

/* ============ calculators ============ */
var CALCS=[
 {n:"6.1 LPWAN battery life",f:[["mAh","battery (mAh)",2400],["Isl","sleep (µA)",5],["Iac","active (mA)",40],["d","duty (%)",0.1]],
  fn:function(v){var d=v.d/100,avg=(1-d)*v.Isl/1000+d*v.Iac,h=v.mAh/avg;return "Pavg = "+avg.toFixed(3)+" mA → L = "+Math.round(h).toLocaleString()+" h ≈ "+(h/8760).toFixed(1)+" years"}},
 {n:"6.x CAD duty fraction",f:[["aw","awake per check (ms)",20],["iv","check interval (s)",2]],
  fn:function(v){return "duty = "+(v.aw/(v.iv*1000)*100).toFixed(2)+" % of time awake for CAD"}},
 {n:"7.1 Oversubscription",f:[["N","subscribers",400],["R","access (Mb/s)",100],["U","uplink (Gb/s)",10]],
  fn:function(v){var O=v.N*v.R/1000/v.U;return "O = "+O.toFixed(2)+" : 1 · worst-case share "+(v.U*1000/v.N).toFixed(1)+" Mb/s each"}},
 {n:"7.x Splitter loss",f:[["S","split ratio 1:N",32]],
  fn:function(v){return "10·log₁₀("+v.S+") = "+(10*Math.log10(v.S)).toFixed(1)+" dB (ideal, real parts add a little)"}},
 {n:"8.1 Availability",f:[["B","MTBF (h)",2000],["R","MTTR (h)",8]],
  fn:function(v){var A=v.B/(v.B+v.R);return "A = "+(A*100).toFixed(3)+" % · downtime "+((1-A)*8760).toFixed(1)+" h/yr · two in parallel "+((1-(1-A)*(1-A))*100).toFixed(4)+" % · two in series "+(A*A*100).toFixed(3)+" %"}},
 {n:"9.1 End-to-end delay",f:[["p","Dproc (ms)",0.5],["q","Dqueue (ms)",12],["t","Dtrans (ms)",1.2],["g","Dprop (ms)",5]],
  fn:function(v){var T=v.p+v.q+v.t+v.g;return "De2e = "+T.toFixed(2)+" ms · queuing is "+(v.q/T*100).toFixed(0)+" % of it"}}
];
(function(){
  var h="";
  CALCS.forEach(function(c,i){
    h+='<div class="calc" data-c="'+i+'"><h4>'+c.n+'</h4>'+c.f.map(function(f){return '<label>'+f[1]+'<input class="fld" type="number" step="any" data-k="'+f[0]+'" value="'+f[2]+'"></label>'}).join("")+'<div class="out"></div></div>';
  });
  var box=document.getElementById("finCalcs");box.innerHTML=h;
  function run(card){
    var c=CALCS[+card.dataset.c],v={};
    card.querySelectorAll("input").forEach(function(i){v[i.dataset.k]=parseFloat(i.value)});
    var ok=Object.keys(v).every(function(k){return isFinite(v[k])&&v[k]>=0});
    card.querySelector(".out").textContent=ok?c.fn(v):"enter positive numbers";
  }
  box.querySelectorAll(".calc").forEach(function(card){card.addEventListener("input",function(){run(card)});run(card)});
})();

/* ============ mock exam and chapter decks ============ */
function seeded(a,seed){var o=a.slice(),s=seed>>>0,i,j,t;for(i=o.length-1;i>0;i--){s=(1664525*s+1013904223)>>>0;j=s%(i+1);t=o[i];o[i]=o[j];o[j]=t}return o}
function buildMock(n){
  var pick=[];
  TS.forEach(function(t,k){pick=pick.concat(seeded(BANK[t],269430+n*7919+k*101).slice(0,Math.min(PER,BANK[t].length)))});
  return seeded(pick,9000+n*313);
}
var MOCKS={1:buildMock(1),2:buildMock(2),3:buildMock(3)};
function missed(){return store.get("finalMissed",[])}
function noteMiss(q,wrong){
  var m=missed(),i=m.indexOf(q.__fid);
  if(wrong&&i<0)m.push(q.__fid);if(!wrong&&i>-1)m.splice(i,1);
  store.set("finalMissed",m);
}
function best(){return store.get("finalBest",{})}
function meta(){
  var b=best(),v=[1,2,3].map(function(n){return b[n]}).filter(function(x){return typeof x==="number"});
  document.getElementById("finBest").textContent=v.length?Math.max.apply(null,v)+"/60":"—";
  document.getElementById("finBank").textContent=ALL.length;
}

var run=null,timer=null;
function modes(){
  var b=best(),h="";
  [1,2,3].forEach(function(n){h+='<button class="btn go" data-m="mock'+n+'">MOCK '+n+' · 60 Q · 3 h'+(typeof b[n]==="number"?' · best '+b[n]:'')+'</button>'});
  TS.forEach(function(t){h+='<button class="btn" data-m="deck'+t+'">CH'+t+' deck · '+BANK[t].length+'</button>'});
  h+='<button class="btn" data-m="deckall">ALL '+ALL.length+'</button><button class="btn no2" data-m="miss">MISSED '+missed().length+'</button>';
  document.getElementById("finModes").innerHTML=h;
}
document.getElementById("finModes").addEventListener("click",function(e){
  var b=e.target.closest("[data-m]");if(!b)return;var m=b.dataset.m;
  if(m.indexOf("mock")===0){var n=+m.slice(4);startMock(MOCKS[n],"MOCK "+n,n)}
  else startDeck(m==="miss"?"miss":m==="deckall"?"all":m.slice(4));
});

function startDeck(key){
  var qs=key==="miss"?ALL.filter(function(q){return missed().indexOf(q.__fid)>-1}):key==="all"?ALL:BANK[key];
  var body=document.getElementById("finBody");
  stopTimer();
  if(!qs.length){run=null;body.innerHTML='<div class="why">No questions here yet. Answer some in a deck first.</div>';document.getElementById("finMock").scrollIntoView();return}
  var pos=store.get("finalPos",{}),i=pos[key]||0;if(i>=qs.length)i=0;
  run={kind:"deck",key:key,qs:qs,i:i,ans:{}};
  renderDeck();document.getElementById("finMock").scrollIntoView();
}
function renderDeck(){
  var q=run.qs[run.i],a=run.ans[q.__fid],pct=Math.round((run.i+1)/run.qs.length*100);
  var h='<div class="fbar"><i style="width:'+pct+'%"></i></div><div class="fh"><span>'+(run.key==="miss"?"MISSED":run.key==="all"?"ALL":"CH"+run.key)+' · '+(run.i+1)+'/'+run.qs.length+'</span><span>CH'+q.t+' · '+NAMES[q.t]+'</span></div>'+
  '<span class="fcode">'+q.__fid+'</span><div class="mq">'+q.q+'</div>';
  q.o.forEach(function(o,k){
    var c="opt";if(a!==undefined){if(k===q.a)c+=" ok";else if(k===a)c+=" no"}
    h+='<button class="'+c+'" data-o="'+k+'"'+(a!==undefined?" disabled":"")+'>'+String.fromCharCode(65+k)+'. '+o+'</button>';
  });
  if(a!==undefined)h+='<div class="why"><b>'+(a===q.a?"Correct. ":"Not quite. ")+'</b>'+q.w+'</div>';
  h+='<div class="fnav"><button class="btn" id="fPrev"'+(run.i===0?" disabled":"")+'>← previous</button><span class="fpos">'+q.__fid+'</span><button class="btn go" id="fNext"'+(run.i===run.qs.length-1?" disabled":"")+'>next →</button></div>';
  var body=document.getElementById("finBody");body.innerHTML=h;
  body.querySelectorAll("[data-o]").forEach(function(b){b.onclick=function(){var k=+b.dataset.o;run.ans[q.__fid]=k;noteMiss(q,k!==q.a);modes();coverage();renderDeck()}});
  document.getElementById("fPrev").onclick=function(){go(-1)};
  document.getElementById("fNext").onclick=function(){go(1)};
}
function go(d){
  run.i+=d;var pos=store.get("finalPos",{});pos[run.key]=run.i;store.set("finalPos",pos);renderDeck();
}

function stopTimer(){if(timer){clearInterval(timer);timer=null}}
function startMock(qs,label,n){
  stopTimer();
  run={kind:"mock",label:label,n:n,qs:qs,i:0,ans:{},end:Date.now()+MINUTES*60000,done:false};
  timer=setInterval(function(){updateTimer();if(Date.now()>=run.end)finishMock()},1000);
  renderMock();document.getElementById("finMock").scrollIntoView();
}
function updateTimer(){
  var el=document.getElementById("fTimer");if(!el||!run)return;
  var s=Math.max(0,Math.floor((run.end-Date.now())/1000));
  el.textContent=pad(Math.floor(s/3600))+":"+pad(Math.floor(s%3600/60))+":"+pad(s%60);
  el.classList.toggle("low",s<900);
}
function renderMock(){
  var q=run.qs[run.i],a=run.ans[run.i],answered=Object.keys(run.ans).length;
  var h='<div class="fh"><span>'+run.label+' · question '+(run.i+1)+' of '+run.qs.length+' · answered '+answered+'</span><span class="timer" id="fTimer"></span></div><div class="fbar"><i style="width:'+Math.round(answered/run.qs.length*100)+'%"></i></div>'+
  '<span class="fcode">CH'+q.t+' · '+NAMES[q.t]+'</span><div class="mq">'+(run.i+1)+'. '+q.q+'</div>';
  q.o.forEach(function(o,k){h+='<button class="opt'+(a===k?" sel":"")+'" data-o="'+k+'">'+String.fromCharCode(65+k)+'. '+o+'</button>'});
  h+='<div class="fnav"><button class="btn" id="fPrev"'+(run.i===0?" disabled":"")+'>← previous</button><span class="fpos">answers stay changeable until you submit</span>'+
     '<button class="btn go" id="fNext">'+(run.i===run.qs.length-1?"SUBMIT":"next →")+'</button></div><div class="fmap">';
  run.qs.forEach(function(_,k){h+='<button data-j="'+k+'" class="'+(k===run.i?"cur ":"")+(run.ans[k]!==undefined?"a":"")+'">'+(k+1)+'</button>'});
  h+='</div><div class="row" style="margin-top:12px"><button class="btn no2" id="fSubmit">SUBMIT NOW</button></div>';
  var body=document.getElementById("finBody");body.innerHTML=h;updateTimer();
  body.querySelectorAll("[data-o]").forEach(function(b){b.onclick=function(){run.ans[run.i]=+b.dataset.o;renderMock()}});
  body.querySelectorAll("[data-j]").forEach(function(b){b.onclick=function(){run.i=+b.dataset.j;renderMock()}});
  document.getElementById("fPrev").onclick=function(){run.i--;renderMock()};
  document.getElementById("fNext").onclick=function(){if(run.i===run.qs.length-1)confirmSubmit();else{run.i++;renderMock()}};
  document.getElementById("fSubmit").onclick=confirmSubmit;
}
function confirmSubmit(){
  var left=run.qs.length-Object.keys(run.ans).length;
  if(left>0&&!window.confirm(left+" question(s) unanswered. Submit anyway?"))return;
  finishMock();
}
function finishMock(){
  if(!run||run.done)return;run.done=true;stopTimer();
  var score=0,per={},wrong=[],used=Math.round((MINUTES*60000-Math.max(0,run.end-Date.now()))/60000);
  TS.forEach(function(t){per[t]={ok:0,n:0}});
  run.qs.forEach(function(q,i){
    var ok=run.ans[i]===q.a;per[q.t].n++;if(ok){score++;per[q.t].ok++}else wrong.push({q:q,i:i});
    noteMiss(q,!ok);
  });
  var b=best();if(typeof b[run.n]!=="number"||score>b[run.n]){b[run.n]=score;store.set("finalBest",b)}
  meta();modes();coverage();
  var pts=(score/run.qs.length*30).toFixed(1);
  var h='<div class="score">'+score+' / '+run.qs.length+'</div><p>That is about <b>'+pts+' of 30 points</b> at 0.5 point per question · time used '+used+' min.</p>'+
  '<div class="fx">'+TS.map(function(t){return '<div><b>'+per[t].ok+'/'+per[t].n+'</b><span>CH'+t+' · '+NAMES[t]+'</span></div>'}).join("")+'</div>';
  if(wrong.length){
    h+='<h4>Review: '+wrong.length+' to fix</h4><div class="rv">'+wrong.map(function(w){
      var a=run.ans[w.i];
      return '<p><b class="mono">Q'+(w.i+1)+' · CH'+w.q.t+'</b> '+w.q.q+'<br><span class="no">Your answer: '+(a===undefined?"(blank)":esc(w.q.o[a]))+'</span><br><span class="ok">Correct: '+esc(w.q.o[w.q.a])+'</span><br><em>'+w.q.w+'</em></p>';
    }).join("")+'</div>';
  }else h+='<div class="why"><b>Clean sheet.</b> Take another mock, or tighten your weakest chapter above.</div>';
  h+='<div class="row" style="margin-top:12px"><button class="btn go" id="fAgain">RETAKE THIS MOCK</button><button class="btn no2" id="fMiss">DRILL MISSED</button></div>';
  document.getElementById("finBody").innerHTML=h;
  document.getElementById("fAgain").onclick=function(){startMock(MOCKS[run.n],run.label,run.n)};
  document.getElementById("fMiss").onclick=function(){startDeck("miss")};
}

meta();modes();coverage();
document.getElementById("finBody").innerHTML='<div class="why">Pick a mock to sit the whole paper, or a chapter deck for instant feedback with explanations.</div>';
})();
