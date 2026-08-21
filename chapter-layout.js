"use strict";
(function(){
if(window.__wnChapterLayoutLoaded)return;window.__wnChapterLayoutLoaded=true;
var notes=document.getElementById("notes");if(!notes)return;

var css=document.createElement("style");
css.textContent='\
/* Strong chapter hierarchy: chapter section -> overview/topic cards */\
#notes .wrap{max-width:980px!important}\
#notes article.item{background:transparent!important;border:0!important;border-radius:0!important;padding:0!important;margin:30px 0 42px!important;box-shadow:none!important;overflow:visible!important}\
#notes article.item>.ph{background:var(--panel);border:1px solid var(--line2);border-left:4px solid var(--cy);border-radius:12px;padding:15px 17px!important;margin:0 0 14px!important;box-shadow:0 8px 24px rgba(0,0,0,.08)}\
#notes article.item.c2>.ph{border-left-color:var(--vi)}\
#notes article.item.c3>.ph{border-left-color:var(--gr)}\
#notes article.item.c4>.ph{border-left-color:var(--am)}\
#notes article.item.c5>.ph{border-left-color:var(--rd)}\
#notes article.item>.ph h3{font-size:21px!important;line-height:1.3!important;margin:0!important;padding:0!important;color:var(--ink)}\
#notes article.item>.ph .tag{margin-left:auto;color:var(--faint)}\
#notes .topic-stack{display:grid!important;gap:18px!important;margin:0!important}\
#notes .topic-block{background:var(--panel)!important;border:1px solid var(--line2)!important;border-radius:12px!important;padding:0!important;overflow:hidden!important;box-shadow:0 8px 22px rgba(0,0,0,.09)!important;position:relative!important}\
#notes .topic-block::before{display:none!important}\
#notes .topic-label{margin:0!important;padding:9px 15px!important;background:color-mix(in srgb,var(--gr) 10%,var(--panel2))!important;border-bottom:1px solid var(--line)!important;font:800 9px var(--mono)!important;letter-spacing:1.25px!important;color:var(--gr)!important;text-transform:uppercase!important}\
#notes .topic-block>h4{margin:0!important;padding:12px 15px!important;background:var(--panel2)!important;border-bottom:1px solid var(--line)!important;color:var(--ink)!important;font:750 16px var(--sans)!important;letter-spacing:0!important;text-transform:none!important;line-height:1.35!important}\
#notes .topic-block>h4::before{content:"TOPIC"!important;display:inline-block!important;margin-right:9px!important;padding:2px 6px!important;border:1px solid color-mix(in srgb,var(--cy) 55%,var(--line))!important;border-radius:4px!important;color:var(--cy)!important;font:800 8.5px var(--mono)!important;letter-spacing:.9px!important;vertical-align:2px!important;background:color-mix(in srgb,var(--cy) 6%,transparent)!important}\
#notes .topic-block>*:not(h4):not(.topic-label){margin-left:16px!important;margin-right:16px!important}\
#notes .topic-block>*:last-child{margin-bottom:16px!important}\
#notes .topic-block p{max-width:76ch!important;line-height:1.76!important;margin-top:11px!important;color:var(--dim)!important}\
#notes .topic-block p b{color:var(--ink)!important}\
#notes .topic-block .tldr{margin-top:14px!important;padding:11px 13px!important;background:color-mix(in srgb,var(--cy) 5%,var(--panel2))!important;border:1px solid color-mix(in srgb,var(--cy) 22%,var(--line))!important;border-left:3px solid var(--cy)!important;border-radius:8px!important;font-size:14.5px!important;line-height:1.58!important;color:var(--ink)!important}\
#notes .topic-block .box{margin-top:12px!important;padding:12px 14px!important;border-radius:8px!important;line-height:1.62!important}\
#notes .topic-block .eq{margin-top:13px!important;border-radius:8px!important}\
#notes .topic-block .tscroll{margin-top:13px!important;border:1px solid var(--line)!important;border-radius:8px!important;overflow:auto!important;background:var(--panel2)!important}\
#notes .topic-block .tscroll table{margin:0!important;background:transparent!important}\
#notes .topic-block .tscroll th{position:static!important;background:color-mix(in srgb,var(--panel2) 82%,var(--panel))!important}\
#notes .topic-block details{margin-top:12px!important;background:var(--panel2)!important;border:1px solid var(--line)!important;border-radius:8px!important;overflow:hidden!important}\
#notes .topic-block details summary{padding:10px 12px!important;font-size:12.5px!important;line-height:1.45!important}\
#notes .topic-block details .dbody{padding:4px 12px 12px!important}\
#notes .topic-block .pipe{margin-top:13px!important}\
#notes .topic-block .sub2{margin-top:10px!important}\
#notes article.item>.foot{background:var(--panel)!important;border:1px solid var(--line)!important;border-radius:9px!important;margin-top:12px!important;padding:10px 12px!important}\
#notes article.item+.item{margin-top:44px!important}\
#notes .topic-block.chapter-focus,#notes .chapter-anchor.chapter-focus{outline:2px solid var(--cy)!important;outline-offset:4px!important}\
@media(max-width:720px){#notes article.item{margin:22px 0 32px!important}#notes article.item>.ph{padding:12px 13px!important;border-radius:10px}#notes article.item>.ph h3{font-size:18px!important}#notes .topic-stack{gap:13px!important}#notes .topic-block{border-radius:10px!important}#notes .topic-block>h4{padding:11px 12px!important;font-size:14.5px!important}#notes .topic-block>*:not(h4):not(.topic-label){margin-left:12px!important;margin-right:12px!important}#notes .topic-label{padding:8px 12px!important}}';
document.head.appendChild(css);

function isHeader(el){return el&&el.nodeType===1&&el.tagName==="H4"}
function meaningful(nodes){return nodes.some(function(n){return n.nodeType===1||String(n.textContent||"").trim()})}

Array.from(notes.querySelectorAll("article.item")).forEach(function(article){
 if(article.dataset.topicLayout==="1")return;
 article.dataset.topicLayout="1";
 var ph=article.querySelector(":scope > .ph");
 var foot=article.querySelector(":scope > .foot");
 var children=Array.from(article.childNodes).filter(function(n){return n!==ph&&n!==foot});
 if(!children.length)return;

 var stack=document.createElement("div");stack.className="topic-stack";
 var current=[],hasTitle=false,blockNo=0;
 function flush(){
   if(!meaningful(current)){current=[];hasTitle=false;return;}
   blockNo++;
   var block=document.createElement("section");block.className="topic-block";
   if(!hasTitle){
     block.classList.add("topic-overview");
     var lab=document.createElement("div");lab.className="topic-label";lab.textContent="SECTION OVERVIEW";block.appendChild(lab);
   }
   current.forEach(function(n){block.appendChild(n)});
   block.id=(article.id||"section")+"-topic-"+blockNo;
   stack.appendChild(block);
   current=[];hasTitle=false;
 }
 children.forEach(function(node){
   if(isHeader(node)){flush();hasTitle=true;current=[node];}
   else current.push(node);
 });
 flush();

 if(ph&&ph.nextSibling)article.insertBefore(stack,ph.nextSibling);else article.insertBefore(stack,article.firstChild);
 if(foot)article.appendChild(foot);
});

var lede=notes.querySelector(".lede");
if(lede)lede.textContent="Each section is separated into an overview and individual topic cards. The technical content is unchanged; only the reading structure has been reorganized.";
})();
