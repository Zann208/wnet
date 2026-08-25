"use strict";
(function(){
if(window.__wnRedoQuestionsLoaded)return;window.__wnRedoQuestionsLoaded=true;

var panel=document.getElementById("midtermPrep");
var body=document.getElementById("mtBody");
if(!panel||!body||typeof store==="undefined")return;

var style=document.createElement("style");
style.textContent='\
.mtredo{display:flex;gap:7px;flex-wrap:wrap;align-items:center;margin-top:10px;padding:10px 0 2px;border-top:1px solid var(--line)}\
.mtredo .hint{font:10px var(--mono);color:var(--faint);margin-right:auto}\
.mtredo .btn:disabled{opacity:.35;cursor:not-allowed}\
@media(max-width:620px){.mtredo{display:grid;grid-template-columns:1fr}.mtredo .hint{margin:0 0 2px}.mtredo .btn{width:100%}}';
document.head.appendChild(style);

var tools=document.createElement("div");
tools.className="mtredo";
tools.innerHTML='<span class="hint">Study decks can be answered again at any time.</span>'+ 
'<button class="btn" id="mtRedoCurrent" disabled>REDO CURRENT QUESTION</button>'+ 
'<button class="btn no2" id="mtResetStudy">RESET STUDY ANSWERS</button>';

var mocksHeading=[].slice.call(panel.querySelectorAll("h4")).filter(function(h){return /full midterm mocks/i.test(h.textContent)})[0];
if(mocksHeading)panel.insertBefore(tools,mocksHeading);else panel.insertBefore(tools,body);

var redoBtn=document.getElementById("mtRedoCurrent");
var resetBtn=document.getElementById("mtResetStudy");

function currentInfo(){
  var codeEl=body.querySelector(".mtcode");
  var head=body.querySelector(".mth span:first-child");
  var code=codeEl?codeEl.textContent.trim():"";
  var label=head?head.textContent.trim():"";
  var isMock=/MIDTERM MOCK/i.test(label);
  var answers=store.get("midtermStudyAnswers",{});
  return {code:code,label:label,isMock:isMock,answers:answers,answered:!!code&&answers[code]!==undefined};
}

function updateState(){
  var info=currentInfo();
  redoBtn.disabled=!info.answered||info.isMock;
  redoBtn.title=info.isMock?"Mock answers stay locked until submission.":(info.answered?"Clear this saved answer and try it again.":"Answer a study-deck question first.");
}

function reopenDeck(label,code){
  if(/^CH[1-5] DECK/i.test(label)){
    var ch=(label.match(/^CH([1-5])/i)||[])[1];
    var chip=[].slice.call(document.querySelectorAll("#mtChips .chip")).filter(function(x){return x.textContent.indexOf("CH"+ch+" ·")===0})[0];
    if(chip){chip.click();return;}
  }
  if(/^ALL 150/i.test(label)){
    var all=document.getElementById("mtAll");if(all){all.click();return;}
  }
  if(/^MISSED-QUESTION DECK/i.test(label)){
    var missed=document.getElementById("mtMissed");if(missed){missed.click();return;}
  }
  var ch2=(code.match(/^CH([1-5])-Q/i)||[])[1];
  if(ch2){
    var chip2=[].slice.call(document.querySelectorAll("#mtChips .chip")).filter(function(x){return x.textContent.indexOf("CH"+ch2+" ·")===0})[0];
    if(chip2)chip2.click();
  }
}

redoBtn.addEventListener("click",function(){
  var info=currentInfo();
  if(!info.answered||info.isMock)return;
  delete info.answers[info.code];
  store.set("midtermStudyAnswers",info.answers);
  reopenDeck(info.label,info.code);
});

resetBtn.addEventListener("click",function(){
  if(!window.confirm("Reset all saved chapter-deck answers so you can redo them from the beginning? Mock best scores will be kept."))return;
  store.set("midtermStudyAnswers",{});
  store.set("midtermMissed",[]);
  ["ch1","ch2","ch3","ch4","ch5","all","missed"].forEach(function(k){store.set("midtermDeckPos_"+k,0)});
  var n=document.getElementById("mtMissN");if(n)n.textContent="0";
  var first=document.querySelector("#mtChips .chip");
  if(first)first.click();
});

var observer=new MutationObserver(updateState);
observer.observe(body,{childList:true,subtree:true,attributes:true});
updateState();
})();
