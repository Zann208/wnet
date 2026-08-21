"use strict";
(function(){
if(window.__wnChapterLayoutLoaded)return;window.__wnChapterLayoutLoaded=true;
var notes=document.getElementById("notes");if(!notes)return;

var css=document.createElement("style");
css.textContent='\
/* Real chapter body layout: section -> topic blocks */\
#notes article.item{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:22px 24px;margin:20px 0 26px;box-shadow:none;overflow:visible}\
#notes article.item>.ph{margin-bottom:10px;padding-bottom:12px;border-bottom:1px solid var(--line)}\
#notes article.item>.ph h3{margin:0!important;padding:0!important;font-size:20px;line-height:1.35}\
#notes article.item>.ph .tag{margin-left:auto}\
#notes .topic-stack{display:grid;gap:14px;margin-top:14px}\
#notes .topic-block{background:color-mix(in srgb,var(--panel2) 72%,var(--panel));border:1px solid var(--line);border-radius:11px;padding:16px 17px;position:relative}\
#notes .topic-block::before{content:"";position:absolute;left:-1px;top:13px;bottom:13px;width:2px;background:color-mix(in srgb,var(--cy) 70%,transparent);border-radius:2px}\
#notes .topic-block.topic-overview::before{background:var(--gr)}\
#notes .topic-label{font:700 9px var(--mono);letter-spacing:1.15px;text-transform:uppercase;color:var(--gr);margin-bottom:7px}\
#notes .topic-block>h4{margin:0 0 10px!important;padding:0!important;color:var(--ink)!important;font:700 15px var(--sans)!important;letter-spacing:0!important;text-transform:none!important;line-height:1.4}\
#notes .topic-block>h4::before{content:"TOPIC";display:inline-block;margin-right:8px;color:var(--cy);font:700 9px var(--mono);letter-spacing:1px;vertical-align:2px}\
#notes .topic-block p{max-width:74ch!important;line-height:1.72!important;margin:9px 0 0!important;color:var(--dim)}\
#notes .topic-block p b{color:var(--ink)}\
#notes .topic-block .tldr{margin:0!important;padding:11px 13px!important;border-radius:8px;background:color-mix(in srgb,var(--gr) 6%,var(--panel));border:1px solid color-mix(in srgb,var(--gr) 25%,var(--line));line-height:1.58;color:var(--ink)}\
#notes .topic-block .box{margin:11px 0 0!important;padding:12px 14px!important;border-radius:8px;line-height:1.58}\
#notes .topic-block .eq{margin:12px 0 0!important;border-radius:9px}\
#notes .topic-block .tscroll{margin:11px 0 0!important;border:1px solid var(--line);border-radius:8px;overflow:auto;background:var(--panel)}\
#notes .topic-block .tscroll table{margin:0!important}\
#notes .topic-block .tscroll th{position:static!important;background:var(--panel2)}\
#notes .topic-block details{margin:11px 0 0!important;background:var(--panel);border:1px solid var(--line);border-radius:8px;overflow:hidden}\
#notes .topic-block details summary{padding:10px 12px!important;font-size:13px;line-height:1.45}\
#notes .topic-block details .dbody{padding:2px 12px 12px!important}\
#notes .topic-block .pipe{margin-top:11px}\
#notes .topic-block .sub2{margin-top:9px!important}\
#notes article.item>.foot{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}\
#notes article.item+.item{margin-top:28px}\
#notes .topic-block:target{outline:2px solid var(--cy)}\
@media(max-width:720px){#notes article.item{padding:16px 14px;margin:16px 0 22px;border-radius:11px}#notes .topic-stack{gap:10px}#notes .topic-block{padding:13px 12px;border-radius:9px}#notes .topic-block>h4{font-size:14px!important}#notes article.item>.ph{align-items:flex-start}#notes article.item>.ph .tag{width:100%;margin-left:0}}';
document.head.appendChild(css);

function isFoot(el){return el&&el.classList&&el.classList.contains("foot")}
function isHeader(el){return el&&el.tagName==="H4"}
function meaningful(nodes){return nodes.some(function(n){return n.nodeType===1||String(n.textContent||"").trim()})}

Array.from(notes.querySelectorAll("article.item")).forEach(function(article){
 if(article.dataset.topicLayout==="1")return;
 article.dataset.topicLayout="1";
 var ph=article.querySelector(":scope > .ph");
 var foot=article.querySelector(":scope > .foot");
 var children=Array.from(article.childNodes).filter(function(n){return n!==ph&&n!==foot});
 if(!children.length)return;

 var stack=document.createElement("div");stack.className="topic-stack";
 var current=[],currentTitle=null,blockNo=0;

 function flush(){
   if(!meaningful(current)) {current=[];currentTitle=null;return;}
   blockNo++;
   var block=document.createElement("section");block.className="topic-block";
   if(!currentTitle){
     block.classList.add("topic-overview");
     var lab=document.createElement("div");lab.className="topic-label";lab.textContent="SECTION OVERVIEW";block.appendChild(lab);
   }
   current.forEach(function(n){block.appendChild(n)});
   var sectionId=article.id||"section";
   block.id=sectionId+"-topic-"+blockNo;
   stack.appendChild(block);
   current=[];currentTitle=null;
 }

 children.forEach(function(node){
   if(node.nodeType===1&&isHeader(node)){
     flush();currentTitle=node.textContent.trim();current=[node];
   }else current.push(node);
 });
 flush();

 if(ph&&ph.nextSibling)article.insertBefore(stack,ph.nextSibling);else article.insertBefore(stack,article.firstChild);
 if(foot)article.appendChild(foot);
});

/* Make section headings visually independent from the topic cards. */
var lede=notes.querySelector(".lede");
if(lede)lede.textContent="Each course section is divided into separate topic blocks. The technical detail is unchanged; the layout is grouped so you can read one concept at a time.";
})();
