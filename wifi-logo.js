"use strict";
(function(){
  var host=document.querySelector("#logoBtn .bmark");
  if(!host)return;
  var svg=host.querySelector("svg");
  if(!svg)return;

  svg.setAttribute("class","wifi-logo");
  svg.setAttribute("width","16");
  svg.setAttribute("height","16");
  svg.setAttribute("viewBox","0 0 16 16");
  svg.innerHTML='\
    <path class="wifi-arc wifi-arc-3" d="M1.7 6.1a9.1 9.1 0 0 1 12.6 0" fill="none" stroke="#22d3ee" stroke-width="1.35" stroke-linecap="round"/>\
    <path class="wifi-arc wifi-arc-2" d="M3.2 8.8a6.7 6.7 0 0 1 9.6 0" fill="none" stroke="#a78bfa" stroke-width="1.35" stroke-linecap="round"/>\
    <path class="wifi-arc wifi-arc-1" d="M5.1 11.3a3.9 3.9 0 0 1 5.8 0" fill="none" stroke="#a78bfa" stroke-width="1.35" stroke-linecap="round"/>\
    <circle class="wifi-dot" cx="8" cy="13.2" r="1.7" fill="#22d3ee"/>';

  var style=document.createElement("style");
  style.textContent='\
    .wifi-logo{overflow:visible}\
    .wifi-logo .wifi-arc{opacity:1;transition:opacity .22s ease,transform .22s ease;transform-origin:8px 13px}\
    .wifi-logo .wifi-dot{transform-origin:8px 13.2px;animation:wifiDotPulse 1.7s ease-in-out infinite}\
    .wifi-logo .wifi-arc.off{opacity:.10;transform:scale(.92)}\
    @keyframes wifiDotPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.72;transform:scale(.88)}}\
    @media(prefers-reduced-motion:reduce){.wifi-logo .wifi-arc{transition:none}.wifi-logo .wifi-dot{animation:none}}';
  document.head.appendChild(style);

  var arcs=[
    svg.querySelector(".wifi-arc-1"),
    svg.querySelector(".wifi-arc-2"),
    svg.querySelector(".wifi-arc-3")
  ];
  var levels=[3,2,1,0,1,2];
  var step=0;
  function paint(level){
    arcs.forEach(function(arc,i){arc.classList.toggle("off",i>=level)});
  }
  paint(3);
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  window.setInterval(function(){step=(step+1)%levels.length;paint(levels[step])},420);
})();
