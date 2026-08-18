"use strict";
(function(){
if(window.__wnAnswerGuideLoaded)return;window.__wnAnswerGuideLoaded=true;
if(!window.QB||!Array.isArray(QB))return;

var TS=["1","2","3","4","5"];
var banks={};
TS.forEach(function(t){
  banks[t]=QB.filter(function(q){return q.t===t});
  banks[t].forEach(function(q,i){if(!q.__code)q.__code="CH"+t+"-Q"+String(i+1).padStart(2,"0")});
});
var ALL=[];TS.forEach(function(t){ALL=ALL.concat(banks[t])});

var prep=document.getElementById("midtermPrep");
if(prep){var h2=prep.querySelector("h2");if(h2)h2.textContent="Midterm MCQ Prep";}
var drills=document.getElementById("drills"),wrap=drills&&drills.querySelector(".wrap");
if(!wrap)return;
var lede=wrap.querySelector(".lede");
if(lede)lede.innerHTML='Midterm practice for the announced <b>50-question multiple-choice exam</b>, with fixed chapter decks, three mocks, and a complete 150-question answer guide.';

var style=document.createElement("style");
style.textContent='\
.ag{border-color:color-mix(in srgb,var(--cy) 55%,var(--line));background:linear-gradient(135deg,color-mix(in srgb,var(--cy) 6%,var(--panel)),var(--panel))}\
.ag::before{background:var(--cy)}\
.agtools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:12px 0}\
.agsearch{flex:1;min-width:210px;border:1px solid var(--line2);background:var(--panel2);color:var(--ink);border-radius:7px;padding:9px 11px;font:12px var(--mono);outline:none}\
.agsearch:focus{border-color:var(--cy)}\
.agcount{font:700 11px var(--mono);color:var(--cy);margin-left:auto}\
.aglist{display:grid;gap:10px;margin-top:12px}\
.agcard{border:1px solid var(--line);background:var(--panel2);border-radius:10px;padding:14px 15px}\
.aghead{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:7px}\
.agcode{font:700 11px var(--mono);color:var(--cy);border:1px solid color-mix(in srgb,var(--cy) 55%,var(--line));border-radius:5px;padding:3px 7px}\
.agch{font:10px var(--mono);color:var(--faint);text-transform:uppercase}\
.agq{font-weight:700;font-size:15px;line-height:1.45;margin:5px 0 10px}\
.agans{border-left:3px solid var(--gr);background:color-mix(in srgb,var(--gr) 7%,var(--panel));padding:9px 11px;border-radius:0 7px 7px 0;margin:8px 0;color:var(--ink)}\
.agans b{color:var(--gr);font-family:var(--mono);font-size:11px;text-transform:uppercase}\
.agexp{color:var(--dim);font-size:13.5px;line-height:1.55;margin-top:9px}\
.agexp b{color:var(--ink)}\
.agmemory{margin-top:8px;padding-top:8px;border-top:1px dashed var(--line);color:var(--faint);font-size:12px;line-height:1.5}\
.agmemory b{color:var(--am);font-family:var(--mono);font-size:10px;text-transform:uppercase}\
.agempty{padding:20px;text-align:center;border:1px dashed var(--line2);border-radius:9px;color:var(--faint)}\
@media(max-width:620px){.agcount{width:100%;margin-left:0}.agsearch{min-width:100%}}';
document.head.appendChild(style);

var panel=document.createElement("div");
panel.className="panel ag";panel.id="answerGuide";
panel.innerHTML='<div class="ph"><span class="badge cy">STUDY GUIDE</span><h2>150 Answer Guide</h2><span class="badge cy right">RIGHT ANSWERS ONLY</span></div>'+ 
'<p class="sub2">Read the complete question bank as revision notes: <b>question → correct answer → explanation → memory cue</b>. Each memory cue is built from that exact question, not a repeated chapter template.</p>'+ 
'<div class="agtools"><button class="chip on" data-ag="all">ALL 150</button><button class="chip" data-ag="1">CH1 · 30</button><button class="chip" data-ag="2">CH2 · 30</button><button class="chip" data-ag="3">CH3 · 30</button><button class="chip" data-ag="4">CH4 · 30</button><button class="chip" data-ag="5">CH5 · 30</button><input class="agsearch" id="agSearch" type="search" placeholder="Search question, answer, or topic…"><span class="agcount" id="agCount">150 / 150</span></div>'+ 
'<div class="aglist" id="agList"></div>';

if(prep&&prep.parentNode===wrap){if(prep.nextSibling)wrap.insertBefore(panel,prep.nextSibling);else wrap.appendChild(panel);}else{var first=wrap.querySelector(".panel");if(first)wrap.insertBefore(panel,first);else wrap.appendChild(panel);}

var active="all",term="";
function esc(s){return String(s==null?"":s).replace(/[&<>\"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[c]})}
function explanation(q){
  var base=(q.w||"").trim();
  if(!base)base="This is the correct choice because it matches the concept tested by this question.";
  return base;
}
function keywords(text){
  var stop={which:1,what:1,when:1,where:1,why:1,how:1,does:1,from:1,with:1,that:1,this:1,these:1,those:1,about:1,most:1,best:1,correct:1,following:1,statement:1,means:1,main:1,primary:1,used:1,using:1,into:1,than:1,then:1,only:1,typically:1,network:1,wireless:1,question:1,would:1,should:1};
  var seen={},out=[];
  String(text).replace(/[^A-Za-z0-9.\-]+/g," ").split(/\s+/).forEach(function(raw){
    var w=raw.toLowerCase();
    if(!w||w.length<3||stop[w]||seen[w])return;
    seen[w]=1;out.push(raw);
  });
  return out.slice(0,7).join(" / ");
}
function shortReason(q){
  var s=explanation(q).replace(/\s+/g," ").trim();
  if(s.length>150)s=s.slice(0,147).replace(/\s+\S*$/,'')+'…';
  return s;
}
function memory(q){
  var answer=String(q.o&&q.o[q.a]||""),keys=keywords(q.q);
  return q.__code+" — see “"+keys+"” → remember “"+answer+"”. "+shortReason(q);
}
function render(){
  var src=active==="all"?ALL:banks[active]||[],t=term.toLowerCase();
  var rows=src.filter(function(q){if(!t)return true;return [q.__code,q.q,q.o&&q.o[q.a],q.w,memory(q),CHNAME&&CHNAME[q.t]].join(" ").toLowerCase().indexOf(t)>-1;});
  var h="";
  rows.forEach(function(q){
    h+='<article class="agcard">'+
      '<div class="aghead"><span class="agcode">'+esc(q.__code)+'</span><span class="agch">CH'+esc(q.t)+' · '+esc(CHNAME[q.t])+'</span></div>'+ 
      '<div class="agq">'+esc(q.q)+'</div>'+ 
      '<div class="agans"><b>✓ Correct answer</b><br>'+esc(q.o[q.a])+'</div>'+ 
      '<div class="agexp"><b>Why this is correct:</b> '+esc(explanation(q))+'</div>'+ 
      '<div class="agmemory"><b>Remember:</b> '+esc(memory(q))+'</div>'+ 
    '</article>';
  });
  document.getElementById("agList").innerHTML=h||'<div class="agempty">No questions match your search.</div>';
  document.getElementById("agCount").textContent=rows.length+' / '+src.length;
}

document.querySelectorAll("[data-ag]").forEach(function(b){b.onclick=function(){active=b.dataset.ag;document.querySelectorAll("[data-ag]").forEach(function(x){x.classList.toggle("on",x===b)});render();panel.scrollIntoView({behavior:"smooth",block:"start"});};});
document.getElementById("agSearch").addEventListener("input",function(){term=this.value.trim();render()});
render();
})();
