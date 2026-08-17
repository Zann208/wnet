"use strict";
(function(){
if(window.__wnMidtermLoaded)return;window.__wnMidtermLoaded=true;

var TS=["1","2","3","4","5"],counts={},CHBANK={};
function pad(n){return String(n).padStart(2,"0")}
TS.forEach(function(t){
  CHBANK[t]=QB.filter(function(q){return q.t===t});
  counts[t]=CHBANK[t].length;
  CHBANK[t].forEach(function(q,i){q.__no=i+1;q.__code="CH"+t+"-Q"+pad(i+1)});
});
var ALL=[];TS.forEach(function(t){ALL=ALL.concat(CHBANK[t])});

var drills=document.getElementById("drills"),wrap=drills&&drills.querySelector(".wrap");if(!wrap)return;
var lede=wrap.querySelector(".lede");if(lede)lede.innerHTML='Professor-style potential MCQ practice for the announced <b>50-question midterm</b>. Chapter banks stay fixed and numbered, so CH1-Q01 is always CH1-Q01.';
var qBank=document.getElementById("qBank"),sQs=document.getElementById("sQs");if(qBank)qBank.textContent=QB.length;if(sQs)sQs.textContent=QB.length;

var css=document.createElement("style");css.textContent='\
.mt{border-color:color-mix(in srgb,var(--gr) 55%,var(--line));background:linear-gradient(135deg,color-mix(in srgb,var(--gr) 8%,var(--panel)),var(--panel))}\
.mt::before{background:var(--gr)}\
.mtk{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px;margin:14px 0}\
.mtk div{border:1px solid var(--line);border-radius:9px;background:var(--panel2);padding:10px 12px}\
.mtk b{display:block;font:700 18px var(--mono);color:var(--gr)}\
.mtk span{font:10px var(--mono);color:var(--faint);text-transform:uppercase}\
.mtrow{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}\
.mtmocks{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}\
.mtmock{border:1px solid var(--line2);border-radius:10px;background:var(--panel2);padding:12px;text-align:left;color:var(--ink);cursor:pointer;font-family:inherit}\
.mtmock:hover{border-color:var(--am)}.mtmock b{display:block;font:700 14px var(--mono);color:var(--am)}.mtmock span{font-size:12px;color:var(--dim)}\
.mtp{height:7px;background:var(--panel2);border:1px solid var(--line);border-radius:99px;overflow:hidden;margin:12px 0}.mtp i{display:block;height:100%;background:var(--gr)}\
.mth{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font:11px var(--mono);color:var(--faint)}\
.mtcode{display:inline-block;margin-top:8px;padding:4px 8px;border:1px solid var(--cy);border-radius:5px;color:var(--cy);font:700 11px var(--mono);letter-spacing:.5px}\
.mtq{font-size:17px;font-weight:700;margin:8px 0}\
.mtn{margin-top:10px;padding:10px 12px;border:1px solid var(--line2);border-radius:8px;background:var(--panel2);font-size:13.5px}.mtn.ok{border-color:var(--gr)}.mtn.no{border-color:var(--rd)}\
.mtsel{border-color:var(--cy)!important}\
.mtbd{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:12px}.mtbd div{padding:8px;border:1px solid var(--line);border-radius:8px;text-align:center;font:11px var(--mono);color:var(--dim)}.mtbd b{display:block;font-size:15px;color:var(--ink)}\
.mtrv{max-height:520px;overflow:auto;margin-top:10px}\
.mtmap{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:10px}.mtmap div{border:1px solid var(--line);border-radius:8px;padding:8px;font:10px var(--mono);color:var(--dim)}.mtmap b{display:block;color:var(--ink);font-size:12px}\
@media(max-width:720px){.mtmocks{grid-template-columns:1fr}.mtmap{grid-template-columns:repeat(2,1fr)}}\
@media(max-width:620px){.mtbd{grid-template-columns:repeat(2,1fr)}}';document.head.appendChild(css);

var p=document.createElement("div");p.className="panel mt";p.id="midtermPrep";
p.innerHTML='<div class="ph"><span class="badge gr">MIDTERM</span><h2>Professor-Style MCQ Prep</h2><span class="badge gr right">'+QB.length+' POTENTIAL QUESTIONS</span></div>'+ 
'<p class="sub2"><b>Stable bank:</b> 30 numbered questions per chapter. <b>No random chapter reshuffle.</b> Three fixed 50-question mocks mix 10 questions from every chapter; Mock 1 + 2 + 3 together cover all 150 questions once.</p>'+ 
'<div class="mtk"><div><b>30 × 5</b><span>chapter questions</span></div><div><b>150</b><span>full bank</span></div><div><b>3 × 50</b><span>fixed mocks</span></div><div><b id="mtBest">—</b><span>best mock score</span></div></div>'+ 
'<div class="mtmap"><div><b>CH1-Q01 → Q30</b>Architecture</div><div><b>CH2-Q01 → Q30</b>Standards</div><div><b>CH3-Q01 → Q30</b>Connection</div><div><b>CH4-Q01 → Q30</b>Design</div><div><b>CH5-Q01 → Q30</b>Security</div></div>'+ 
'<h4>Chapter banks — fixed order</h4><div class="mtrow" id="mtChips"></div>'+ 
'<div class="mtrow"><button class="btn on" id="mtAll">ALL 150 — NUMBERED</button><button class="btn no2" id="mtMissed">RETRY MISSED <span id="mtMissN">0</span></button></div>'+ 
'<h4>Three full midterm mocks — fixed sets</h4><div class="mtmocks" id="mtMocks"></div>'+ 
'<div id="mtBody"><div class="box wild"><b>How to use it</b>Study each chapter in order first. Then take Mock 1, Mock 2, and Mock 3. Every mock question still shows its original source ID (for example <span class="mono">CH3-Q17</span>) so you always know where it came from.</div></div>';
var first=wrap.querySelector(".panel");if(first)wrap.insertBefore(p,first);else wrap.appendChild(p);

var bankOK=QB.length===150&&TS.every(function(t){return counts[t]===30});
function qid(q){return q.__code||q.t+'|'+q.q}
function miss(){return store.get("midtermMissed",[])}
function saveMiss(a){store.set("midtermMissed",a)}
function mockBest(){return store.get("midtermMockBest",{})}
function meta(){
  var bs=mockBest(),vals=[bs[1],bs[2],bs[3]].filter(function(x){return typeof x==="number"});
  document.getElementById("mtBest").textContent=vals.length?Math.max.apply(null,vals)+"/50":"—";
  document.getElementById("mtMissN").textContent=miss().length;
  document.querySelectorAll("[data-mock-best]").forEach(function(el){var n=el.dataset.mockBest,b=bs[n];el.textContent=typeof b==="number"?"best "+b+"/50":"not taken"});
}

function seededShuffle(a,seed){
  var out=a.slice(),s=seed>>>0,i,j,tmp;
  for(i=out.length-1;i>0;i--){s=(1664525*s+1013904223)>>>0;j=s%(i+1);tmp=out[i];out[i]=out[j];out[j]=tmp}
  return out;
}
function buildMock(n){
  var start=(n-1)*10,a=[];
  TS.forEach(function(t){a=a.concat(CHBANK[t].slice(start,start+10))});
  return seededShuffle(a,269430+n*1009);
}
var MOCKS={1:buildMock(1),2:buildMock(2),3:buildMock(3)};

var run=null;
function start(qs,label,exam,mockNo){
  run={qs:qs.slice(),label:label,exam:!!exam,mockNo:mockNo||0,i:0,answers:[],score:0,misses:[]};
  render();p.scrollIntoView({behavior:"smooth",block:"start"});
}
function render(){
  var q=run.qs[run.i],pct=Math.round(run.i/run.qs.length*100),h='<div class="mtp"><i style="width:'+pct+'%"></i></div>'+ 
  '<div class="mth"><span>'+run.label+' · Q'+(run.i+1)+'/'+run.qs.length+'</span><span>CH'+q.t+' · '+CHNAME[q.t]+'</span></div>'+ 
  '<span class="mtcode">'+q.__code+'</span><div class="mtq">'+q.q+'</div>';
  [0,1,2,3].forEach(function(o){h+='<button class="qopt" data-mt="'+o+'">'+q.o[o]+'</button>'});
  h+='<div id="mtAfter"></div>';document.getElementById("mtBody").innerHTML=h;
  document.querySelectorAll('[data-mt]').forEach(function(x){x.onclick=function(){answer(parseInt(x.dataset.mt,10),x)}});
}
function answer(c,el){
  if(run.answers[run.i]!==undefined)return;
  var q=run.qs[run.i],ok=c===q.a;run.answers[run.i]=c;
  if(!run.exam){if(ok)run.score++;else run.misses.push({q:q,c:c})}
  document.querySelectorAll('[data-mt]').forEach(function(x){
    x.disabled=true;
    if(!run.exam){var o=parseInt(x.dataset.mt,10);if(o===q.a)x.classList.add("right");else if(o===c)x.classList.add("wrong")}
  });
  if(run.exam)el.classList.add("mtsel");
  document.getElementById("mtAfter").innerHTML=run.exam?'<div class="mtn">Answer locked. Correctness is hidden until the result.</div>':'<div class="mtn '+(ok?'ok':'no')+'"><b>'+(ok?'✓ Correct':'✗ Correct: '+q.o[q.a])+'</b><br>'+q.w+'</div>';
  document.getElementById("mtAfter").innerHTML+='<div class="row"><button class="btn go" id="mtNext">'+(run.i===run.qs.length-1?(run.exam?'SUBMIT MOCK':'RESULT'):'NEXT →')+'</button></div>';
  document.getElementById("mtNext").onclick=function(){run.i++;run.i>=run.qs.length?finish():render()};
}
function finish(){
  if(run.exam){
    run.score=0;run.misses=[];
    run.qs.forEach(function(q,i){if(run.answers[i]===q.a)run.score++;else run.misses.push({q:q,c:run.answers[i]})});
    if(run.mockNo){var bs=mockBest(),old=typeof bs[run.mockNo]==="number"?bs[run.mockNo]:-1;if(run.score>old){bs[run.mockNo]=run.score;store.set("midtermMockBest",bs)}}
  }
  var ms=miss();
  run.misses.forEach(function(m){var k=qid(m.q);if(ms.indexOf(k)<0)ms.push(k)});
  if(!run.exam)run.qs.forEach(function(q,i){if(run.answers[i]===q.a){var k=qid(q),j=ms.indexOf(k);if(j>-1)ms.splice(j,1)}});
  saveMiss(ms);meta();
  var per={};TS.forEach(function(t){per[t]={n:0,ok:0}});run.qs.forEach(function(q,i){per[q.t].n++;if(run.answers[i]===q.a)per[q.t].ok++});
  var h='<div class="mtp"><i style="width:100%"></i></div><p class="meta" style="text-align:left">// RESULT</p><div class="big">'+run.score+' / '+run.qs.length+' <span style="font-size:19px;color:var(--dim)">'+Math.round(run.score/run.qs.length*100)+'%</span></div><div class="mtbd">';
  TS.forEach(function(t){if(per[t].n)h+='<div>CH'+t+'<b>'+per[t].ok+'/'+per[t].n+'</b>'+CHNAME[t]+'</div>'});
  h+='</div><div class="row">';if(run.misses.length)h+='<button class="btn no2" id="mtReview">REVIEW '+run.misses.length+' MISSES</button>';h+='<button class="btn go" id="mtAgain">RESTART SAME SET</button></div><div id="mtReviewBox"></div>';
  document.getElementById("mtBody").innerHTML=h;
  document.getElementById("mtAgain").onclick=function(){start(run.qs,run.label,run.exam,run.mockNo)};
  var r=document.getElementById("mtReview");if(r)r.onclick=review;
}
function review(){
  var h='<div class="mtrv">';
  run.misses.forEach(function(m,i){h+='<div class="mtn no"><b>'+(i+1)+'. '+m.q.__code+' · '+m.q.q+'</b><br><span style="color:var(--rd)">Your answer: '+(m.c===undefined?'No answer':m.q.o[m.c])+'</span><br><span style="color:var(--gr)">Correct: '+m.q.o[m.q.a]+'</span><br><span style="color:var(--dim)">'+m.q.w+'</span></div>'});
  document.getElementById("mtReviewBox").innerHTML=h+'</div>';
}

TS.forEach(function(t){
  var b=document.createElement("button");b.className="chip";b.textContent='CH'+t+' · Q01–Q30 · '+CHNAME[t];
  b.onclick=function(){start(CHBANK[t],"CH"+t+" FIXED BANK",false,0)};
  document.getElementById("mtChips").appendChild(b);
});
[1,2,3].forEach(function(n){
  var b=document.createElement("button");b.className="mtmock";b.innerHTML='<b>MOCK '+n+' · 50 QUESTIONS</b><span>10 from each chapter · <span data-mock-best="'+n+'">not taken</span></span>';
  b.onclick=function(){start(MOCKS[n],"MIDTERM MOCK "+n,true,n)};document.getElementById("mtMocks").appendChild(b);
});

document.getElementById("mtAll").onclick=function(){start(ALL,"ALL 150 · CH1→CH5",false,0)};
document.getElementById("mtMissed").onclick=function(){
  var ids=miss(),qs=ALL.filter(function(q){return ids.indexOf(qid(q))>-1});
  if(qs.length)start(qs,"MISSED-QUESTION RETRY",false,0);else document.getElementById("mtBody").innerHTML='<div class="mtn ok"><b>No saved misses.</b> Complete a chapter bank or mock first.</div>';
};
meta();
if(!bankOK)document.getElementById("mtBody").insertAdjacentHTML("afterbegin",'<div class="mtn no"><b>Bank warning:</b> expected 150 questions / 30 per chapter. Current: '+JSON.stringify(counts)+'</div>');
})();
