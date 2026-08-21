"use strict";
(function(){
if(window.__wnChapterUpgradeLoaded)return;window.__wnChapterUpgradeLoaded=true;
var notes=document.getElementById("notes");if(!notes)return;

var css=document.createElement("style");
css.textContent='\
/* Chapter readability — preserve content, improve visual hierarchy */\
#notes .wrap{max-width:920px}\
#notes>.wrap>h1{margin-bottom:4px}\
#notes .lede{max-width:760px;line-height:1.65}\
#notes .panel{margin-top:24px;padding:24px 26px;border-radius:14px}\
#notes .panel::before{width:52px}\
#notes .panel h2{font-size:21px;line-height:1.3}\
#notes .panel h3{font-size:18px;line-height:1.35;margin-top:26px;padding-top:3px}\
#notes .panel h4{font-size:11px;margin:27px 0 10px;color:var(--cy);letter-spacing:1.15px}\
#notes .panel p,#notes .panel>ul,#notes .panel>.pts,#notes details .dbody p{max-width:76ch;line-height:1.72}\
#notes .panel p{margin-top:11px}\
#notes .pts{display:grid;gap:8px;margin-top:11px}\
#notes .pts li{padding-left:2px}\
#notes .tldr,#notes .box{margin-top:16px;padding:14px 16px;line-height:1.58}\
#notes .tscroll{margin-top:13px;border:1px solid var(--line);border-radius:9px;overflow:auto}\
#notes .tscroll table{margin:0}\
#notes .tscroll th{background:var(--panel2);position:sticky;top:0;z-index:1}\
#notes details{margin-top:12px;border:1px solid var(--line);border-radius:9px;background:color-mix(in srgb,var(--panel2) 55%,transparent);overflow:hidden}\
#notes details summary{padding:11px 13px;cursor:pointer;color:var(--ink);font-weight:650}\
#notes details .dbody{padding:2px 14px 14px}\
#notes code{white-space:normal}\
.chapter-anchor{scroll-margin-top:78px}\
.chapter-anchor.chapter-focus{outline:2px solid color-mix(in srgb,var(--cy) 60%,transparent);outline-offset:7px;border-radius:5px}\
#chapterIndex{position:relative;top:auto;z-index:1;margin:16px 0 22px;padding:10px 11px;background:var(--panel);border:1px solid var(--line2);border-radius:11px;box-shadow:none}\
.chiTitle{font:700 9px var(--mono);letter-spacing:1.1px;text-transform:uppercase;color:var(--faint);margin:0 3px 7px}\
.chiRows{display:grid;gap:5px}\
.chiRow{display:flex;gap:5px;align-items:center;overflow-x:auto;scrollbar-width:none}.chiRow::-webkit-scrollbar{display:none}\
.chiChapter{flex:0 0 43px;border:0;background:transparent;color:var(--gr);font:800 10px var(--mono);text-align:left;padding:5px 4px}\
.chiBtn{flex:0 0 auto;border:1px solid var(--line);background:var(--panel2);color:var(--dim);border-radius:6px;padding:5px 8px;font:700 9.5px var(--mono);cursor:pointer}.chiBtn:hover{border-color:var(--cy);color:var(--cy)}\
.aglearn{margin-top:10px;border:1px solid var(--cy);background:transparent;color:var(--cy);border-radius:7px;padding:7px 10px;font:700 10px var(--mono);letter-spacing:.45px;cursor:pointer}.aglearn:hover{background:color-mix(in srgb,var(--cy) 8%,transparent)}\
#backToGuide{position:fixed;right:16px;bottom:18px;z-index:58;display:none;border:1px solid var(--cy);background:color-mix(in srgb,var(--panel) 96%,transparent);backdrop-filter:blur(10px);color:var(--cy);border-radius:8px;padding:8px 11px;font:700 10px var(--mono);cursor:pointer;box-shadow:0 10px 30px rgba(0,0,0,.28)}\
#backToGuide.on{display:block}\
@media(max-width:760px){#notes .panel{padding:19px 17px;margin-top:18px}#chapterIndex{margin:14px 0 18px;padding:8px}.chiTitle{display:none}.chiRows{gap:3px}.chiRow{gap:4px}.chiChapter{flex-basis:38px}.chiBtn{padding:5px 7px}#backToGuide{right:10px;bottom:76px}}';
document.head.appendChild(css);

var chapterNames={"1":"Architecture","2":"Standards","3":"Connection","4":"Design","5":"Security"};
var sectionNames={
 "1.1":"Layers, frames & modes","1.2":"APs, controllers & roaming","1.3":"Coverage & margin",
 "2.1":"Standards bodies","2.2":"Wi-Fi standards & frames","2.3":"Cellular & IoT",
 "3.1":"Connection lifecycle","3.2":"Authentication & access","3.3":"Mobility & continuity",
 "4.1":"Requirements","4.2":"Link budget & capacity","4.3":"Channels & validation",
 "5.1":"Threat landscape","5.2":"WEP / WPA2 / WPA3","5.3":"EAP / EDHOC / PANA","5.4":"Monitoring & response"
};

function norm(s){return String(s||"").toLowerCase().replace(/[^a-z0-9.]+/g," ").replace(/\s+/g," ").trim()}
function instant(el){
 if(!el)return;var root=document.documentElement,old=root.style.scrollBehavior;root.style.scrollBehavior="auto";
 var y=el.getBoundingClientRect().top+window.scrollY-72;window.scrollTo(0,Math.max(0,y));root.style.scrollBehavior=old;
}
function candidates(){return Array.from(notes.querySelectorAll("h2,h3,h4,.ph"));}
function findSection(sec){
 var c=candidates(),exact=c.find(function(el){return norm(el.textContent).indexOf(sec.toLowerCase())===0||norm(el.textContent).indexOf(" "+sec.toLowerCase()+" ")>-1});
 if(exact)return exact;
 var words=norm(sectionNames[sec]).split(" ").filter(function(x){return x.length>2}),best=null,bestScore=-1;
 c.forEach(function(el){var t=norm(el.textContent),score=0;words.forEach(function(w){if(t.indexOf(w)>-1)score++});if(score>bestScore){bestScore=score;best=el}});
 return bestScore>0?best:null;
}
var targets={};Object.keys(sectionNames).forEach(function(sec){var el=findSection(sec);if(el){el.classList.add("chapter-anchor");el.dataset.courseSection=sec;targets[sec]=el;}});

var idx=document.createElement("div");idx.id="chapterIndex";idx.innerHTML='<div class="chiTitle">Chapter quick navigation</div><div class="chiRows"></div>';
var rows=idx.querySelector(".chiRows");
["1","2","3","4","5"].forEach(function(ch){
 var row=document.createElement("div");row.className="chiRow";
 var lab=document.createElement("button");lab.className="chiChapter";lab.textContent="CH"+ch;lab.title=chapterNames[ch];row.appendChild(lab);
 Object.keys(sectionNames).filter(function(k){return k.charAt(0)===ch}).forEach(function(sec){
   var b=document.createElement("button");b.className="chiBtn";b.textContent=sec+" · "+sectionNames[sec];
   b.onclick=function(){var t=targets[sec];if(t)instant(t)};row.appendChild(b);
 });
 rows.appendChild(row);
});
var notesWrap=notes.querySelector(".wrap"),notesLede=notesWrap&&notesWrap.querySelector(".lede");
if(notesWrap){if(notesLede&&notesLede.nextSibling)notesWrap.insertBefore(idx,notesLede.nextSibling);else notesWrap.insertBefore(idx,notesWrap.firstChild);}

function topicFor(q){
 var ch=String(q.t),s=norm((q.q||"")+" "+((q.o&&q.o[q.a])||"")+" "+(q.w||""));
 if(ch==="1"){
   if(/coverage|margin|cell|overlap|dead zone|sticky|received power|pmin|rssi|snr/.test(s))return "1.3";
   if(/controller|capwap|fat|fit|lightweight|autonomous|rrm|poe|pse|powered device|access point|roaming support/.test(s))return "1.2";
   return "1.1";
 }
 if(ch==="2"){
   if(/3gpp|cellular|nb iot|lte m|lpwan|iot|suitability|capability/.test(s))return "2.3";
   if(/802 11|wi fi 6|wi fi 7|ax|ac|mimo|ofdma|ofdm|frame header|spectral efficiency|qos|dfs/.test(s))return "2.2";
   return "2.1";
 }
 if(ch==="3"){
   if(/roam|mobility|continuity|arp|layer 2|layer 3|l2|l3|vlan|forwarding|anchor|breakout/.test(s))return "3.3";
   if(/authorization|authentication|802 1x|eap|pana|aaa|psk|radius|credential|supplicant|authenticator/.test(s))return "3.2";
   return "3.1";
 }
 if(ch==="4"){
   if(/channel|interference|reuse|validation|validate|measurement|survey after|co channel/.test(s))return "4.3";
   if(/link budget|capacity|airtime|rssi|snr|antenna|transmit power|received power|margin|concurrency/.test(s))return "4.2";
   return "4.1";
 }
 if(ch==="5"){
   if(/monitor|wids|wips|response|segment|segmentation|dai|span|certificate management|blast radius/.test(s))return "5.4";
   if(/eap|edhoc|pana|peap|ttls|eap fast|oscore|coap|cose|cbor|tls/.test(s))return "5.3";
   if(/wep|wpa|wps|rc4|ccmp|aes|pmk|ptk|gtk|nonce|four way|handshake|mic|tkip/.test(s))return "5.2";
   return "5.1";
 }
 return ch+".1";
}
function qmap(){var m={};(window.QB||[]).forEach(function(q){if(q.__code)m[q.__code]=q});return m;}
var back=document.createElement("button");back.id="backToGuide";back.textContent="← BACK TO ANSWER GUIDE";document.body.appendChild(back);
back.onclick=function(){if(typeof showTab==="function")showTab("drills");back.classList.remove("on")};

function wireGuide(){
 var map=qmap();document.querySelectorAll("#agList .agcard").forEach(function(card){
   if(card.querySelector(".aglearn"))return;
   var codeEl=card.querySelector(".agcode"),q=codeEl&&map[codeEl.textContent.trim()];if(!q)return;
   var sec=topicFor(q),btn=document.createElement("button");btn.className="aglearn";btn.textContent="LEARN MORE · "+sec+" →";
   btn.title="Open "+sec+" · "+sectionNames[sec];
   btn.onclick=function(){
     if(typeof showTab==="function")showTab("notes");
     requestAnimationFrame(function(){
       var t=targets[sec]||findSection(sec);if(!t)return;instant(t);t.classList.add("chapter-focus");setTimeout(function(){t.classList.remove("chapter-focus")},900);back.classList.add("on");
     });
   };
   var mem=card.querySelector(".agmemory")||card.lastElementChild;mem.insertAdjacentElement("afterend",btn);
 });
}
wireGuide();
var ag=document.getElementById("agList");if(ag)new MutationObserver(function(){wireGuide()}).observe(ag,{childList:true,subtree:true});

var obs=new MutationObserver(function(){if(!notes.classList.contains("on"))back.classList.remove("on")});obs.observe(notes,{attributes:true,attributeFilter:["class"]});
})();
