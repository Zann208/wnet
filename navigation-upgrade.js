"use strict";
(function(){
if(window.__wnNavigationUpgradeLoaded)return;window.__wnNavigationUpgradeLoaded=true;

/* Reset stale persistent scroll positions from earlier visits.
   Keep scroll memory only for the current page session. */
try{if(window.store&&store.set)store.set("scrollMem",{});}catch(e){}
try{scrollMem={};}catch(e){}
try{saveScroll=function(){if(window.curTab||typeof curTab!=="undefined"){var id=(typeof curTab!=="undefined"?curTab:window.curTab);if(id)scrollMem[id]=window.scrollY;}};}catch(e){}
setTimeout(function(){window.scrollTo({top:0,left:0,behavior:"auto"});},0);

var drills=document.getElementById("drills");
if(!drills)return;

function panelByTitle(text){
  var ps=drills.querySelectorAll(".panel");
  for(var i=0;i<ps.length;i++){
    var h=ps[i].querySelector("h2");
    if(h&&h.textContent.trim().toLowerCase()===text.toLowerCase())return ps[i];
  }
  return null;
}
var flash=panelByTitle("Flashcards");if(flash)flash.id="drillFlashcards";
var quick=panelByTitle("Mock exam");if(quick)quick.id="drillQuickMock";
var prep=document.getElementById("midtermPrep");
var guide=document.getElementById("answerGuide");
var mocks=document.getElementById("mtMocks");if(mocks)mocks.id="drillMocks";

var css=document.createElement("style");
css.textContent='\
#drillJump{position:fixed;right:14px;top:50%;transform:translateY(-50%);z-index:55;width:116px;background:color-mix(in srgb,var(--panel) 95%,transparent);backdrop-filter:blur(10px);border:1px solid var(--line2);border-radius:12px;padding:8px;box-shadow:0 16px 40px rgba(0,0,0,.28);display:none}\
#drillJump.on{display:block}\
.djtitle{font:700 9px var(--mono);letter-spacing:1.2px;color:var(--faint);text-transform:uppercase;margin:1px 2px 6px}\
.djbtns{display:grid;grid-template-columns:1fr 1fr;gap:5px}\
.djbtn{border:1px solid var(--line);background:var(--panel2);color:var(--dim);border-radius:6px;padding:6px 4px;font:700 9.5px var(--mono);cursor:pointer;transition:.13s}\
.djbtn:hover{border-color:var(--cy);color:var(--cy)}\
.djbtn.wide{grid-column:1/-1}\
.djbtn.ch{color:var(--gr)}\
.djrange{border-top:1px solid var(--line);margin-top:7px;padding-top:7px}\
.djrange label{display:flex;justify-content:space-between;gap:4px;font:9px var(--mono);color:var(--faint);margin-bottom:4px}\
#djSlider{width:100%;accent-color:var(--cy);cursor:pointer}\
.djhint{font:8.5px var(--mono);color:var(--faint);text-align:center;margin-top:3px}\
@media(max-width:1180px){#drillJump{right:6px;width:104px}}\
@media(max-width:900px){#drillJump{top:auto;right:10px;left:10px;bottom:10px;transform:none;width:auto;padding:7px;border-radius:11px}.djtitle{display:none}.djbtns{display:flex;gap:5px;overflow-x:auto;padding-bottom:2px}.djbtn{flex:0 0 auto;padding:6px 8px}.djbtn.wide{grid-column:auto}.djrange{display:grid;grid-template-columns:auto 1fr auto;gap:7px;align-items:center;margin-top:5px;padding-top:5px}.djrange label{margin:0;white-space:nowrap}.djhint{margin:0;white-space:nowrap}}';
document.head.appendChild(css);

var nav=document.createElement("aside");
nav.id="drillJump";
nav.setAttribute("aria-label","Drills quick navigation");
nav.innerHTML='<div class="djtitle">Drill navigation</div><div class="djbtns">'+
'<button class="djbtn wide" data-jump="top">TOP</button>'+ 
'<button class="djbtn" data-jump="prep">PREP</button><button class="djbtn" data-jump="guide">GUIDE</button>'+ 
'<button class="djbtn ch" data-ch="1">CH1</button><button class="djbtn ch" data-ch="2">CH2</button>'+ 
'<button class="djbtn ch" data-ch="3">CH3</button><button class="djbtn ch" data-ch="4">CH4</button>'+ 
'<button class="djbtn ch wide" data-ch="5">CH5</button>'+ 
'<button class="djbtn" data-jump="mocks">MOCKS</button><button class="djbtn" data-jump="cards">CARDS</button>'+ 
'</div><div class="djrange"><label><span>GUIDE</span><span id="djPos">1 / 150</span></label><input id="djSlider" type="range" min="1" max="150" value="1" step="1"><div class="djhint">drag to jump</div></div>';
document.body.appendChild(nav);

function jumpTo(el){
  if(!el)return;
  var y=el.getBoundingClientRect().top+window.scrollY-72;
  window.scrollTo({top:Math.max(0,y),behavior:"smooth"});
}
function visibleCards(){return Array.from(document.querySelectorAll("#agList .agcard"));}
function syncSlider(reset){
  var s=document.getElementById("djSlider"),cards=visibleCards();if(!s)return;
  var n=Math.max(1,cards.length);s.max=String(n);
  if(reset||parseInt(s.value,10)>n)s.value="1";
  document.getElementById("djPos").textContent=s.value+" / "+n;
}
function selectGuideChapter(ch){
  var b=document.querySelector('[data-ag="'+ch+'"]');
  if(b)b.click();
  setTimeout(function(){syncSlider(true);jumpTo(document.getElementById("answerGuide"));},80);
}

nav.querySelectorAll("[data-jump]").forEach(function(b){
  b.addEventListener("click",function(){
    var k=b.dataset.jump;
    if(k==="top")jumpTo(drills);
    else if(k==="prep")jumpTo(document.getElementById("midtermPrep"));
    else if(k==="guide")jumpTo(document.getElementById("answerGuide"));
    else if(k==="mocks")jumpTo(document.getElementById("drillMocks")||document.getElementById("midtermPrep"));
    else if(k==="cards")jumpTo(document.getElementById("drillFlashcards"));
  });
});
nav.querySelectorAll("[data-ch]").forEach(function(b){b.addEventListener("click",function(){selectGuideChapter(b.dataset.ch);});});

var slider=document.getElementById("djSlider"),sliderTimer=0;
slider.addEventListener("input",function(){
  syncSlider(false);
  clearTimeout(sliderTimer);
  sliderTimer=setTimeout(function(){var cards=visibleCards(),i=parseInt(slider.value,10)-1;if(cards[i])jumpTo(cards[i]);},55);
});

/* If the answer-guide filter changes by its own buttons, keep the scrubber accurate. */
if(guide){
  guide.addEventListener("click",function(e){if(e.target&&e.target.matches&&e.target.matches("[data-ag]"))setTimeout(function(){syncSlider(true);},40);});
}

function activeTab(){var s=document.querySelector("section.tab.on");return s?s.id:"";}
function updateVisibility(){nav.classList.toggle("on",activeTab()==="drills");if(activeTab()==="drills")syncSlider(false);}
var mo=new MutationObserver(updateVisibility);
document.querySelectorAll("section.tab").forEach(function(s){mo.observe(s,{attributes:true,attributeFilter:["class"]});});
updateVisibility();

/* Keyboard convenience inside Drills: [ and ] move one visible guide card. */
document.addEventListener("keydown",function(e){
  if(activeTab()!=="drills"||e.target.matches("input,textarea,select"))return;
  if(e.key!=="["&&e.key!=="]")return;
  var n=parseInt(slider.value,10)+(e.key==="]"?1:-1),max=parseInt(slider.max,10);
  n=Math.max(1,Math.min(max,n));slider.value=String(n);syncSlider(false);var cards=visibleCards();if(cards[n-1])jumpTo(cards[n-1]);
});
})();
