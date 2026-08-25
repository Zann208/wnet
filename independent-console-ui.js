"use strict";
(function(){
if(window.__independentConsoleUILoaded)return;window.__independentConsoleUILoaded=true;

var codes=["261434","CPE434","269430","269202","269497","261305"];
var replacements=[
  [/Chiang Mai University\s*[·|-]?\s*/gi,""],
  [/Computer Engineering coursework/gi,"technical study"],
  [/university coursework/gi,"technical study"],
  [/Semester consoles/gi,"Study consoles"],
  [/semester overview/gi,"console overview"],
  [/All courses/gi,"All consoles"],
  [/Switch course/gi,"Switch console"],
  [/course switcher/gi,"console switcher"],
  [/Course console/gi,"Study console"],
  [/course console/gi,"study console"],
  [/course-specific/gi,"topic-focused"],
  [/course materials?/gi,"study resources"],
  [/course's own material/gi,"my independent notes and references"],
  [/course concepts/gi,"technical concepts"],
  [/course slides/gi,"external references"],
  [/coursework/gi,"study work"],
  [/professor-style/gi,"exam-style"],
  [/lecture decks/gi,"modules"],
  [/lectures/gi,"modules"],
  [/lecture/gi,"module"],
  [/laboratory work/gi,"hands-on practice"],
  [/laboratory exercises/gi,"hands-on exercises"],
  [/laboratory/gi,"hands-on"],
  [/labs/gi,"practice sets"],
  [/\blab\b/gi,"practice"],
  [/assignments/gi,"projects"],
  [/assignment/gi,"project"],
  [/handouts/gi,"notes"],
  [/worksheets/gi,"practice sheets"],
  [/worksheet/gi,"practice sheet"],
  [/This course/gi,"This console"],
  [/current course/gi,"current console"],
  [/SEM\s*1\s*[·|-]\s*2026/gi,"2026"],
  [/Term\s*1\/2569/gi,""]
];

function stripCodes(s,inCode){
  var out=String(s==null?"":s);
  codes.forEach(function(code){
    if(inCode && code==="261434") out=out.replace(new RegExp("\\b"+code+"\\b","g"),"demo-pass");
    else out=out.replace(new RegExp("\\s*[·:/-]*\\s*"+code+"\\b","g"),"");
  });
  return out;
}
function cleanText(s,inCode){
  var out=stripCodes(s,inCode);
  replacements.forEach(function(r){out=out.replace(r[0],r[1]);});
  return out.replace(/\s{2,}/g," ").replace(/\s+([·|])/g," $1").trim();
}
function clean(root){
  root=root||document;
  try{root.title=cleanText(root.title||"");}catch(e){}
  var base=root.body||root.documentElement;if(!base)return;
  var walker=root.createTreeWalker(base,NodeFilter.SHOW_TEXT),nodes=[],n;
  while((n=walker.nextNode()))nodes.push(n);
  nodes.forEach(function(node){
    var p=node.parentElement;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/i.test(p.tagName))return;
    var v=node.nodeValue;if(!v)return;
    var nv=cleanText(v,/^(PRE|CODE)$/i.test(p.tagName));
    if(nv!==v)node.nodeValue=nv;
  });
  root.querySelectorAll('[title],[aria-label]').forEach(function(el){
    ["title","aria-label"].forEach(function(a){if(el.hasAttribute(a))el.setAttribute(a,cleanText(el.getAttribute(a),false));});
  });
}

function addGDC(root){
  root=root||document;
  var pop=root.getElementById("csPop");if(!pop||pop.querySelector('[data-gdc-console]'))return;
  var a=root.createElement("a");
  a.href="https://zann208.github.io/study/google-dc-hackathon/";
  a.setAttribute("role","menuitem");a.setAttribute("data-gdc-console","true");
  if(pop.querySelector('.csi')){
    a.className='csi';
    a.innerHTML='<span class="csmk" style="color:#79a7ff;border-color:#4285f4;background:rgba(66,133,244,.10)">GDC</span><span class="cstx"><b>Google Data Center Hackathon</b><span>Hardware preparation · 2026</span></span><span class="cssoon">OPEN ↗</span>';
    var ft=pop.querySelector('.csft');if(ft)pop.insertBefore(a,ft);else pop.appendChild(a);
    var count=pop.querySelector('.cshd span:last-child');if(count)count.textContent='6';
  }else if(pop.querySelector('.csrow')){
    a.className='csrow';
    a.innerHTML='<span class="csmk" style="color:#4285f4">GDC</span><span style="flex:1"><b>Google Data Center Hackathon</b><span>Hardware preparation · 2026</span></span><span class="csgo">OPEN ↗</span>';
    var foot=pop.querySelector('.csfoot');if(foot)pop.insertBefore(a,foot);else pop.appendChild(a);
  }
}

function addCredit(root){
  root=root||document;if(root.getElementById('independentConsoleCredit'))return;
  var footer=root.querySelector('.footer, footer');
  if(!footer)return;
  var s=root.createElement('span');s.id='independentConsoleCredit';
  s.textContent=' · Independent study console by Zann. External references and source concepts remain with their original authors.';
  s.style.opacity='.72';footer.appendChild(s);
}

function run(){addGDC(document);clean(document);addCredit(document);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
setTimeout(run,120);setTimeout(run,700);
new MutationObserver(function(){addGDC(document);clean(document);}).observe(document.documentElement,{childList:true,subtree:true});
})();
