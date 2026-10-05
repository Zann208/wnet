"use strict";
/* Chapter 6-8 calculators for the RF Lab tab. */
(function(){
if(window.__wnCh678LabLoaded)return;window.__wnCh678LabLoaded=true;
function el(id){return document.getElementById(id)}
function num(id){return parseFloat(el(id).value)}
function ready(ids){return ids.every(function(i){return el(i)})}
function fmt(x,d){return x.toFixed(d)}

/* ---- 6.1 LPWAN battery life ---- */
if(ready(["l6B","l6A","l6S","l6D","l6Work","l6Res"])){
  var l6=function(){
    var B=num("l6B"),A=num("l6A"),S=num("l6S")/1000,D=num("l6D")/100;
    el("vL6B").textContent=B+" mAh";el("vL6A").textContent=A+" mA";
    el("vL6S").textContent=num("l6S")+" µA";el("vL6D").textContent=fmt(D*100,2)+" %";
    var avg=(1-D)*S+D*A,hours=B/avg,years=hours/8760;
    el("l6Work").innerHTML=
      "<b>Pavg</b> (as current) = (1−d)·Isleep + d·Iactive<br>&nbsp;&nbsp;&nbsp;= "+fmt(1-D,4)+"×"+fmt(S,3)+" + "+fmt(D,4)+"×"+A+" = <b>"+fmt(avg,3)+" mA</b><br>"+
      "<b>L</b> = E / Pavg = "+B+" mAh / "+fmt(avg,3)+" mA = <b>"+Math.round(hours).toLocaleString()+" h</b> ≈ "+fmt(years,1)+" years";
    var r=el("l6Res"),sleepShare=(1-D)*S/avg*100;
    r.className=years>=8?"res r-ok":years>=3?"res r-mid":"res r-no";
    r.innerHTML=fmt(years,1)+" years<small>"+(sleepShare>50?"Sleep current is now most of the budget: lowering duty cycle further helps little.":"Active time is "+fmt(100-sleepShare,0)+"% of the energy: fewer or shorter transmissions pay off most.")+"</small>";
  };
  ["l6B","l6A","l6S","l6D"].forEach(function(i){el(i).addEventListener("input",l6)});l6();
}

/* ---- 7.1 oversubscription ---- */
if(ready(["o7N","o7R","o7U","o7Work","o7Res"])){
  var o7=function(){
    var N=num("o7N"),R=num("o7R"),U=num("o7U");
    el("vO7N").textContent=N;el("vO7R").textContent=R+" Mb/s";el("vO7U").textContent=U+" Gb/s";
    var sold=N*R/1000,O=sold/U,share=U*1000/N;
    el("o7Work").innerHTML=
      "<b>O</b> = N × Raccess / Ruplink<br>&nbsp;&nbsp;&nbsp;= "+N+" × "+R+" Mb/s / "+U+" Gb/s = "+fmt(sold,1)+" Gb/s / "+U+" Gb/s = <b>"+fmt(O,1)+" : 1</b><br>"+
      "if all are busy at once, each gets "+fmt(share,1)+" Mb/s ("+fmt(share/R*100,0)+"% of the sold rate)";
    var r=el("o7Res");
    r.className=O<=4?"res r-ok":O<=10?"res r-mid":"res r-no";
    r.innerHTML=fmt(O,1)+" : 1<small>"+(O<=1?"The uplink could carry everyone at full rate.":O<=4?"Reasonable for a best-effort tier if busy-hour behaviour is spread out.":O<=10?"Aggressive. Busy-hour congestion is likely, check the heavy tiers first.":"Very high. Upgrade the uplink, split the node or cap sales per node.")+"</small>";
  };
  ["o7N","o7R","o7U"].forEach(function(i){el(i).addEventListener("input",o7)});o7();
}

/* ---- 7.3 PON optical budget ---- */
if(ready(["p7T","p7X","p7L","p7N","p7C","p7P","p7Work","p7Res"])){
  var SPLITS=[8,16,32,64];
  var p7=function(){
    var T=num("p7T"),X=num("p7X"),L=num("p7L"),N=SPLITS[num("p7N")],C=num("p7C"),P=num("p7P");
    el("vP7T").textContent=T+" dBm";el("vP7X").textContent=X+" dBm";el("vP7L").textContent=L+" km";
    el("vP7N").textContent="1:"+N;el("vP7C").textContent=C;el("vP7P").textContent=P;
    var budget=T-X,fiber=0.35*L,split=10*Math.log10(N)+0.5,conn=0.3*C,spl=0.1*P,reserve=3;
    var total=fiber+split+conn+spl+reserve,margin=budget-total;
    el("p7Work").innerHTML=
      "budget = Tx − Rx,min = "+T+" − ("+X+") = <b>"+fmt(budget,1)+" dB</b><br>"+
      "loss = fiber "+fmt(fiber,1)+" + splitter "+fmt(split,1)+" + connectors "+fmt(conn,1)+" + splices "+fmt(spl,1)+" + reserve "+reserve+" = <b>"+fmt(total,1)+" dB</b><br>"+
      "margin = "+fmt(budget,1)+" − "+fmt(total,1)+" = <b>"+fmt(margin,1)+" dB</b>";
    var r=el("p7Res");
    r.className=margin>=2?"res r-ok":margin>=0?"res r-mid":"res r-no";
    r.innerHTML="MARGIN "+fmt(margin,1)+" dB<small>"+(margin>=2?"Within budget with room to spare.":margin>=0?"Barely inside. Aging, a dirty connector or one more splice could break it.":"Over budget. Shorten the route, lower the split, clean or remove connectors, or use stronger optics.")+"</small>";
  };
  ["p7T","p7X","p7L","p7N","p7C","p7P"].forEach(function(i){el(i).addEventListener("input",p7)});p7();
}

/* ---- 8.2 availability ---- */
if(ready(["a8B","a8R","a8Work","a8Res","a8Fast","a8Reset"])){
  var a8=function(){
    var B=num("a8B"),R=num("a8R");
    el("vA8B").textContent=B+" h";el("vA8R").textContent=R+" h";
    var A=B/(B+R),down=(1-A)*8760,par=1-(1-A)*(1-A);
    el("a8Work").innerHTML=
      "<b>A</b> = MTBF / (MTBF + MTTR) = "+B+" / ("+B+" + "+R+") = <b>"+fmt(A*100,3)+" %</b><br>"+
      "downtime ≈ (1 − A) × 8760 h = <b>"+fmt(down,1)+" h / year</b><br>"+
      "two such links in series: "+fmt(A*A*100,3)+" % · in parallel: "+fmt(par*100,4)+" %";
    var r=el("a8Res");
    r.className=A>=0.9995?"res r-ok":A>=0.995?"res r-mid":"res r-no";
    r.innerHTML=fmt(A*100,2)+" %<small>About "+fmt(down,1)+" hours of downtime per year. Series is worse than one link, parallel is far better.</small>";
  };
  ["a8B","a8R"].forEach(function(i){el(i).addEventListener("input",a8)});a8();
  el("a8Fast").addEventListener("click",function(){var e=el("a8R");e.value=Math.max(parseFloat(e.min),Math.round(parseFloat(e.value)/2));a8()});
  el("a8Reset").addEventListener("click",function(){el("a8B").value=2000;el("a8R").value=8;a8()});
}
})();
