"use strict";
(function(){
if(window.__courseCodePrivacyLoaded)return;window.__courseCodePrivacyLoaded=true;
var codes=["261434","CPE434","269430","269202","269497","261305"];
function cleanString(s){
  var out=String(s||"");
  codes.forEach(function(c){out=out.replace(new RegExp("\\s*[·:/-]*\\s*"+c+"\\b","g"),"");});
  return out.replace(/\s{2,}/g," ").replace(/\s+([·|])/g," $1").trim();
}
function clean(root){
  root=root||document;
  if(root.title)root.title=cleanString(root.title);
  var walker=root.createTreeWalker(root.body||root.documentElement,NodeFilter.SHOW_TEXT);
  var n;while((n=walker.nextNode())){
    var p=n.parentElement;if(!p||/^(SCRIPT|STYLE|PRE|CODE|TEXTAREA)$/i.test(p.tagName))continue;
    var v=n.nodeValue;if(!v)continue;
    var nv=cleanString(v);if(nv!==v)n.nodeValue=nv;
  }
  root.querySelectorAll('[title],[aria-label],[content]').forEach(function(el){
    ["title","aria-label","content"].forEach(function(a){if(el.hasAttribute(a))el.setAttribute(a,cleanString(el.getAttribute(a)));});
  });
}
function run(){clean(document);}
run();
new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
