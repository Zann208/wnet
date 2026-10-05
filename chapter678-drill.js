"use strict";
/* Chapters 6-8 practice decks + answer guide for the Drills tab.
   The midterm panel stays CH1-5 (that is what the midterm covers). */
(function(){
if(window.__wnCh678DrillLoaded)return;window.__wnCh678DrillLoaded=true;
if(!window.QB||typeof store==="undefined")return;
var wrap=document.querySelector("#drills .wrap");if(!wrap)return;
var TS=["6","7","8"],BANK={};
TS.forEach(function(t){
  BANK[t]=QB.filter(function(q){return q.t===t});
  BANK[t].forEach(function(q,i){q.__c678="CH"+t+"-Q"+String(i+1).padStart(2,"0")});
});
var ALL=[];TS.forEach(function(t){ALL=ALL.concat(BANK[t])});
if(!ALL.length)return;

var css=document.createElement("style");css.textContent='\
#ch678Prep{border-color:color-mix(in srgb,var(--sk) 55%,var(--line))}#ch678Prep::before{background:var(--sk)}\
#ch678Prep .mtq{font-size:17px;font-weight:700;margin:8px 0}\
#ch678Prep .opt{display:block;width:100%;text-align:left;margin-top:7px;padding:10px 12px;border:1px solid var(--line2);border-radius:9px;background:var(--panel2);color:var(--ink);cursor:pointer;font:inherit}\
#ch678Prep .opt:hover{border-color:var(--cy)}#ch678Prep .opt.ok{border-color:var(--gr);background:color-mix(in srgb,var(--gr) 14%,var(--panel2))}#ch678Prep .opt.no{border-color:var(--rd);background:color-mix(in srgb,var(--rd) 14%,var(--panel2))}\
#ch678Prep .why{margin-top:10px;padding:10px 12px;border:1px solid var(--line2);border-radius:8px;background:var(--panel2);font-size:13.5px}\
#ch678Prep .code{display:inline-block;padding:4px 8px;border:1px solid var(--sk);border-radius:5px;color:var(--sk);font:700 11px var(--mono)}\
#ch678Prep .nav{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px}#ch678Prep .pos{font:700 11px var(--mono);color:var(--dim)}\
#ch678Prep .gl{max-height:480px;overflow:auto;margin-top:10px}#ch678Prep .gl p{margin-top:10px;font-size:13.5px}#ch678Prep .gl .a{color:var(--gr);font-weight:700}';
document.head.appendChild(css);

var p=document.createElement("div");p.className="panel";p.id="ch678Prep";
p.innerHTML='<div class="ph"><span class="badge sk">CH6–8</span><h2>Chapters 6–8 practice</h2><span class="badge sk right">'+ALL.length+' QUESTIONS</span></div>'+
'<p class="sub2">Numbered decks like the midterm panel: pick a chapter, answer, read the explanation, move with Previous / Next. Your position and misses are remembered.</p>'+
'<div class="row" id="c678Chips"></div>'+
'<div id="c678Body"></div>'+
'<details style="margin-top:12px"><summary>▸ answer guide for chapters 6–8</summary><div class="gl" id="c678Guide"></div></details>';
var mt=document.getElementById("midtermPrep"),anchor=mt?mt.nextSibling:wrap.querySelector(".panel");
wrap.insertBefore(p,anchor);

var cur="6",pos=store.get("c678Pos",{}),missed=store.get("c678Missed",[]),answered={};
function id(q){return q.__c678}
function deck(){return cur==="miss"?ALL.filter(function(q){return missed.indexOf(id(q))>-1}):cur==="all"?ALL:BANK[cur]}
function chips(){
  var h="";
  TS.forEach(function(t){h+='<button class="btn'+(cur===t?' on':'')+'" data-d="'+t+'">CH'+t+' · '+BANK[t].length+'</button>'});
  h+='<button class="btn'+(cur==="all"?' on':'')+'" data-d="all">ALL '+ALL.length+'</button><button class="btn no2'+(cur==="miss"?' on':'')+'" data-d="miss">MISSED '+missed.length+'</button>';
  document.getElementById("c678Chips").innerHTML=h;
}
function render(){
  chips();
  var d=deck(),body=document.getElementById("c678Body");
  if(!d.length){body.innerHTML='<div class="why">No questions here yet. '+(cur==="miss"?"Answer some first.":"")+'</div>';return}
  var i=Math.min(pos[cur]||0,d.length-1),q=d[i],ans=answered[id(q)];
  var h='<span class="code">'+id(q)+'</span><div class="mtq">'+q.q+'</div>';
  q.o.forEach(function(o,k){
    var cls="opt";if(ans!==undefined){if(k===q.a)cls+=" ok";else if(k===ans)cls+=" no"}
    h+='<button class="'+cls+'" data-o="'+k+'">'+String.fromCharCode(65+k)+'. '+o+'</button>';
  });
  if(ans!==undefined)h+='<div class="why"><b>'+(ans===q.a?"Correct. ":"Not quite. ")+'</b>'+q.w+'</div>';
  h+='<div class="nav"><button class="btn" id="c678Prev"'+(i===0?" disabled":"")+'>← previous</button><span class="pos">'+(i+1)+' / '+d.length+'</span><button class="btn" id="c678Next"'+(i===d.length-1?" disabled":"")+'>next →</button></div>';
  body.innerHTML=h;
  body.querySelectorAll(".opt").forEach(function(b){b.onclick=function(){
    if(answered[id(q)]!==undefined)return;
    var k=+b.dataset.o;answered[id(q)]=k;
    var m=missed.indexOf(id(q));
    if(k!==q.a&&m<0)missed.push(id(q));
    if(k===q.a&&m>-1&&cur==="miss")missed.splice(m,1);
    store.set("c678Missed",missed);render();
  }});
  document.getElementById("c678Prev").onclick=function(){pos[cur]=i-1;store.set("c678Pos",pos);render()};
  document.getElementById("c678Next").onclick=function(){pos[cur]=i+1;store.set("c678Pos",pos);render()};
}
document.getElementById("c678Chips").addEventListener("click",function(e){var b=e.target.closest("[data-d]");if(!b)return;cur=b.dataset.d;render()});
var g="";
ALL.forEach(function(q){
  g+='<p><b class="mono">'+id(q)+'</b> '+q.q+'<br>'+q.o.map(function(o,k){return (k===q.a?'<span class="a">':'<span>')+String.fromCharCode(65+k)+'. '+o+(k===q.a?' ✓':'')+'</span>'}).join('<br>')+'<br><em>'+q.w+'</em></p>';
});
document.getElementById("c678Guide").innerHTML=g;
render();
})();
