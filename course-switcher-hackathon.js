"use strict";
(function(){
if(window.__wnHackathonSwitcherLoaded)return;window.__wnHackathonSwitcherLoaded=true;

function addHackathon(){
  var pop=document.getElementById("csPop");
  if(!pop||pop.querySelector('[data-gdc-console]'))return;

  var header=pop.querySelector(".cshd span:last-child");
  if(header)header.textContent="6";

  var item=document.createElement("a");
  item.className="csi";
  item.href="https://zann208.github.io/study/google-dc-hackathon/";
  item.setAttribute("role","menuitem");
  item.setAttribute("data-gdc-console","true");
  item.innerHTML='<span class="csmk c6">GDC</span>'+ 
    '<span class="cstx"><b>Google Data Center Hackathon</b><span>Hardware Hackathon · 2026</span></span>'+ 
    '<span class="cssoon">OPEN ↗</span>';

  var footer=pop.querySelector(".csft");
  if(footer)pop.insertBefore(item,footer);else pop.appendChild(item);

  if(!document.getElementById("gdcSwitcherStyle")){
    var style=document.createElement("style");
    style.id="gdcSwitcherStyle";
    style.textContent='.csmk.c6{background:color-mix(in srgb,#4285f4 12%,transparent);border-color:#4285f4;color:#79a7ff}.csi[data-gdc-console]{border-top:1px solid var(--line);margin-top:4px;padding-top:12px}.csi[data-gdc-console] .cstx span{color:var(--gr)}';
    document.head.appendChild(style);
  }
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",addHackathon);else addHackathon();
setTimeout(addHackathon,250);
})();
