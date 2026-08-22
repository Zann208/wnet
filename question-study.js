"use strict";
(function(){
if(window.__wnQuestionStudyLoaded)return;window.__wnQuestionStudyLoaded=true;
if(!window.QB||!Array.isArray(QB))return;

var sectionLabels={
  t11:"1.1 · Layers, frames & modes",t12:"1.2 · APs, controllers & roaming",t13:"1.3 · Coverage & margin",
  t21:"2.1 · Standards bodies",t22:"2.2 · Wi-Fi standards & frames",t23:"2.3 · Cellular & IoT",
  t31:"3.1 · Connection lifecycle",t32:"3.2 · Authentication & access",t33:"3.3 · Mobility & continuity",
  t41:"4.1 · Requirements",t42:"4.2 · Link budget & capacity",t43:"4.3 · Channels & validation",
  t51:"5.1 · Threat landscape",t52:"5.2 · WPS / WEP / WPA2 / WPA3",t53:"5.3 · EAP / EDHOC / PANA",t54:"5.4 · Monitoring & response"
};

var style=document.createElement("style");
style.textContent='\
.aglearn{display:none!important}\
.qstudybtn{margin-top:10px;border:1px solid var(--cy);background:color-mix(in srgb,var(--cy) 5%,var(--panel));color:var(--cy);border-radius:7px;padding:8px 11px;font:700 10px var(--mono);letter-spacing:.35px;cursor:pointer}\
.qstudybtn:hover{background:color-mix(in srgb,var(--cy) 10%,var(--panel))}\
.qstudybox{display:none;margin-top:10px;border:1px solid var(--line2);border-radius:9px;background:var(--panel);overflow:hidden}\
.qstudybox.on{display:block}\
.qstudyhead{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:11px 12px;background:var(--panel2);border-bottom:1px solid var(--line)}\
.qstudyhead b{display:block;font-size:13.5px;color:var(--ink)}\
.qstudywhere{font:10px/1.45 var(--mono);color:var(--cy);margin-top:2px}\
.qstudybody{padding:11px 12px;color:var(--dim);font-size:13px;line-height:1.55}\
.qstudybody p{margin:0 0 8px}\
.qstudyformula{font:700 15px/1.55 var(--mono);color:var(--cy);background:var(--panel2);border:1px solid var(--line);border-radius:7px;padding:9px 10px;margin:8px 0}\
.qstudysteps{margin:7px 0 0 19px;padding:0}.qstudysteps li{margin:4px 0}\
.qstudyvars{display:grid;grid-template-columns:auto 1fr;gap:4px 10px;margin-top:8px}.qstudyvars b{font-family:var(--mono);color:var(--ink)}\
.qstudytrap{margin-top:9px;padding:8px 10px;border-left:3px solid var(--am);background:color-mix(in srgb,var(--am) 7%,var(--panel2));border-radius:0 6px 6px 0;color:var(--dim)}\
.qstudyactions{display:flex;gap:7px;flex-wrap:wrap;padding:0 12px 12px}\
.qstudygo{border:1px solid var(--line2);background:var(--panel2);color:var(--ink);border-radius:6px;padding:7px 9px;font:700 9.5px var(--mono);cursor:pointer}.qstudygo:hover{border-color:var(--cy);color:var(--cy)}\
.qstudygo.lab{border-color:color-mix(in srgb,var(--vi) 60%,var(--line));color:var(--vi)}\
.qstudy-focus{outline:2px solid var(--cy)!important;outline-offset:5px!important;border-radius:7px!important}\
@media(max-width:620px){.qstudyvars{grid-template-columns:1fr}.qstudyactions{display:grid}.qstudygo{width:100%}}';
document.head.appendChild(style);

function textOf(q){return [q.q,(q.o||[]).join(" "),q.w||""].join(" ").toLowerCase();}
function esc(s){return String(s==null?"":s).replace(/[&<>\"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;"}[c]});}
function has(s,re){return re.test(s);}

var calcLessons=[
  {
    id:"spectral", t:"2", re:/(600\s*mb|800\s*mb|b\/s\/hz|bit\/s\/hz|spectral efficiency|rate per hertz|η\s*=|r\s*\/\s*b)/i,
    title:"Spectral efficiency", section:"t22", eq:"EQ 2.1", lab:"Spectral efficiency",
    formula:"η = R / B",
    vars:[["η","spectral efficiency (bit/s/Hz)"],["R","achieved data rate"],["B","occupied bandwidth"]],
    steps:["Take the achieved rate R.","Take the channel bandwidth B.","Divide R by B.","If R is in Mb/s and B is in MHz, the 10⁶ factors cancel, so the answer is directly in bit/s/Hz.","For 600 Mb/s over 80 MHz: 600 ÷ 80 = 7.5 bit/s/Hz."],
    trap:"Do not invert the fraction. η is rate divided by bandwidth, not bandwidth divided by rate. A faster link can still have worse spectral efficiency if bandwidth grows faster than the rate."
  },
  {
    id:"shannon", t:"1", re:/(shannon|c\s*=\s*b|log₂|log2|capacity rises|20\s*mhz.*20\s*db|snr.*capacity)/i,
    title:"Shannon capacity", section:"t12", eq:"EQ 1.1", lab:"Shannon capacity",
    formula:"C = B · log₂(1 + SNR)",
    vars:[["C","theoretical channel capacity"],["B","bandwidth"],["SNR","signal-to-noise ratio in linear form"]],
    steps:["If SNR is given in dB, convert it first: SNRlinear = 10^(SNRdB/10).","Substitute B and the linear SNR into C = B·log₂(1+SNR).","Keep B in MHz if you want C in Mb/s.","Example: 20 dB = 100×, so 20 MHz·log₂(101) ≈ 133 Mb/s."],
    trap:"The formula uses linear SNR, not the dB number directly. Real throughput is lower because Shannon gives a theoretical ceiling."
  },
  {
    id:"margin", t:"1", re:/(pmin|coverage margin|margin is|pr\s*=\s*[−-]?\d+\s*dbm.*[−-]\d+\s*dbm|headroom)/i,
    title:"Coverage margin", section:"t13", eq:"EQ 1.2", lab:"Link budget + coverage margin",
    formula:"M = Pr − Pmin",
    vars:[["M","coverage margin in dB"],["Pr","received power in dBm"],["Pmin","minimum power the application needs in dBm"]],
    steps:["Write the two dBm values with their signs.","Subtract the minimum requirement from received power.","Be careful with two negatives: −60 − (−67) = −60 + 67 = 7 dB.","Positive margin means headroom; 0 dB is exactly the failure line."],
    trap:"The answer is a difference in dB, not dBm. Negative numbers make sign mistakes very common."
  },
  {
    id:"roaming", t:"3", re:/(scan\s*60|auth\s*40|reassoc\s*20|60\s*\+\s*40\s*\+\s*20\s*\+\s*30|150\s*ms|126\s*ms|improving.*scan.*40%)/i,
    title:"Connection / roaming time", section:"t33", eq:"EQ 3.2", lab:"Connection / roaming budget",
    formula:"Tsetup = Tscan + Tauth + Tassoc + Tip",
    vars:[["Tscan","time spent finding the next AP"],["Tauth","authentication time"],["Tassoc","association / reassociation time"],["Tip","IP-layer recovery/setup time"]],
    steps:["Add every stage; total delay is a sum.","Worked handoff: 60 + 40 + 20 + 30 = 150 ms.","If scanning improves by 40%, new scan time = 60 × 0.60 = 36 ms.","New total = 36 + 40 + 20 + 30 = 126 ms."],
    trap:"A 40% improvement means keep 60% of the original value. Do not subtract 40 milliseconds unless the question explicitly says 40 ms."
  },
  {
    id:"linkbudget", t:"4", re:/(pt\s*17|gt\s*3|gr\s*0|lp\s*76|lm\s*6|what is pr|link budget|pr\s*=\s*pt)/i,
    title:"Link budget", section:"t42", eq:"EQ 4.1", lab:"Link budget + coverage margin",
    formula:"Pr = Pt + Gt + Gr − Lp − Lm",
    vars:[["Pt","transmit power"],["Gt / Gr","transmit / receive antenna gains"],["Lp","path loss"],["Lm","miscellaneous loss / margin"],["Pr","received power"]],
    steps:["Start with transmit power.","Add antenna gains.","Subtract path loss and other losses.","Worked example: 17 + 3 + 0 − 76 − 6 = −62 dBm.","Then compare Pr with the required threshold to decide whether coverage margin is acceptable."],
    trap:"Gains add; losses subtract. Passing the link budget does not prove there is enough capacity for many users."
  },
  {
    id:"risk", t:"5", re:/(risk\s*=|threat.*vulnerability.*impact|segmentation reduces)/i,
    title:"Risk model", section:"t52", eq:"EQ 5.1", lab:"Risk model",
    formula:"Risk = Threat × Vulnerability × Impact",
    vars:[["Threat","how much hostile pressure exists"],["Vulnerability","how exploitable the system is"],["Impact","damage if compromise succeeds"]],
    steps:["Identify which factor the control changes.","Hardening such as WPA3/certificate validation lowers Vulnerability.","Segmentation/least privilege lowers Impact.","The existence of attackers (Threat) usually does not disappear because you changed one network control."],
    trap:"Segmentation does not stop the attacker from existing and may not fix the vulnerability; its main value is limiting the blast radius, so it lowers Impact."
  },
  {
    id:"header", t:"2", re:/(24[- ]byte|mac header|qos control.*bytes|fourth address.*bytes|4th address.*bytes|ht control.*bytes|header gains|header has both)/i,
    title:"802.11 MAC header arithmetic", section:"t22", heading:"The IEEE 802.11 data frame", lab:"802.11 frame header size",
    formula:"Base 24 + QoS 2 + Address 4 6 + HT control 4",
    vars:[["24 B","basic non-QoS, three-address MAC header"],["+2 B","QoS control"],["+6 B","fourth address"],["+4 B","optional HT control"]],
    steps:["Start from 24 bytes.","Add only the optional fields named in the question.","QoS only: 24+2=26.","Fourth address only: 24+6=30.","QoS + fourth address: 24+2+6=32.","If HT control is also present, add another 4 bytes."],
    trap:"The 4-byte FCS comes after the MAC header; do not include it unless the question asks for full frame overhead."
  },
  {
    id:"wepiv", t:"5", re:/(wep iv|iv space|2²⁴|16,?777,?216|24[- ]bit iv)/i,
    title:"WEP IV size and repetition", section:"t52", heading:"WEP — the cautionary tale", lab:"WEP IV collision",
    formula:"IV space = 2²⁴ = 16,777,216 values",
    vars:[["IV","public per-frame initialization vector"],["24 bits","WEP IV size"],["2²⁴","number of possible IV values"]],
    steps:["A 24-bit field has 2²⁴ possible values.","2²⁴ = 16,777,216.","Busy WLANs reuse values, so related RC4 keystreams appear.","That repetition is one of WEP's structural weaknesses."],
    trap:"The IV is not supposed to be secret. WEP failed because the IV space was too small and the IV/key construction was weak."
  }
];

var conceptRules=[
  {t:"1",re:/(infrastructure mode|ad hoc)/i,title:"Infrastructure vs ad hoc",section:"t11",heading:"Infrastructure vs Ad Hoc",focus:"Compare coordination, scalability, management/security and typical use."},
  {t:"1",re:/(frame catches|fcs|frame.*payload|advertised.*throughput|ipv4 need arp)/i,title:"Frames and local delivery",section:"t11",heading:"Frames — the envelopes of networking",focus:"Review frame parts, one-hop framing, ARP and why overhead reduces delivered throughput."},
  {t:"1",re:/(ssid|bssid|\bbss\b|\bess\b)/i,title:"SSID / BSS / BSSID / ESS",section:"t12",heading:"Names you must know",focus:"SSID is the visible name; BSSID identifies one AP radio; ESS joins many BSSs under one SSID."},
  {t:"1",re:/(fit|fat|lightweight|autonomous)/i,title:"AP management models",section:"t12",heading:"Three ways to manage APs",focus:"FAT/autonomous keeps the brain on each AP; FIT/lightweight relies on a controller."},
  {t:"1",re:/(capwap|controller.*control|keepalive)/i,title:"CAPWAP and controller control",section:"t12",heading:"CAPWAP",focus:"Separate control-plane management from optional data tunnelling; review keepalives, config and telemetry."},
  {t:"1",re:/(802\.11k|802\.11v|802\.11r|sticky client|roaming decision)/i,title:"Roaming assistance",section:"t12",heading:"Roaming",focus:"The client decides; k gives neighbours, v suggests, r accelerates transition."},
  {t:"1",re:/(poe|pse|powered device|802\.3af|802\.3at|802\.3bt)/i,title:"Power over Ethernet",section:"t12",heading:"PoE",focus:"Review PSE vs PD, af→at→bt and why insufficient power can disable AP features."},
  {t:"1",re:/(rrm|radio resource management)/i,title:"Radio Resource Management",section:"t12",heading:"Controllers and RRM",focus:"Measure → analyse → decide → apply → repeat; aggressive automation can destabilise channels/power."},
  {t:"1",re:/(overlap|macro|micro|pico|femto|cell scales)/i,title:"Cell size and overlap",section:"t13",heading:"Cell sizes",focus:"Too little overlap causes gaps; too much causes contention/sticky clients. Cell scale changes reuse and mobility."},

  {t:"2",re:/(ieee|ietf|itu|rule-makers|rfc|certification alliances?)/i,title:"Standards bodies and certification",section:"t21",focus:"IEEE = local links, IETF = Internet protocols/RFCs, ITU = spectrum/telecom coordination, alliances = testable product profiles."},
  {t:"2",re:/(802\.11n|802\.11ac|802\.11ax|802\.11be|wi.?fi 6e|wi.?fi 7|ofdma|mimo|multi-link|dense deployments)/i,title:"Wi-Fi generations",section:"t22",heading:"The generations",focus:"Know the main mechanism and design goal of n, ac, ax and be, especially OFDMA for dense systems."},
  {t:"2",re:/(to ds|from ds|duration\/id|sequence control|frame aggregation|address fields|four addresses)/i,title:"802.11 data-frame fields",section:"t22",heading:"The IEEE 802.11 data frame",focus:"Review direction bits, address roles, Duration/ID, Sequence Control, QoS and aggregation."},
  {t:"2",re:/(backward compatibility|security floor|legacy low-rate|transition cost)/i,title:"Certification and compatibility",section:"t22",heading:"Certification and compatibility",focus:"Legacy clients cost air time and can hold the security floor down; judge transition cost, not only peak rate."},
  {t:"2",re:/(3gpp|nb-iot|lte-m|iot standard|basement sensor|capability vs suitability|standard.*suitability)/i,title:"Cellular and IoT selection",section:"t23",focus:"Choose by the dominant requirement: density, battery, deep coverage, mobility or operator integration."},

  {t:"3",re:/(first stage|passive scanning|active scanning|associate.*service|associated.*no service|beacon interval)/i,title:"Connection lifecycle",section:"t31",heading:"Scanning",focus:"Scan → authenticate → associate → IP setup → data. Association alone does not prove usable service."},
  {t:"3",re:/(802\.1x|per-user login|psk painful|access methods|authentication vs authorization)/i,title:"Authentication and access methods",section:"t32",focus:"Separate identity proof from service authorization; compare PSK, 802.1X/EAP, PANA and SIM-based access."},
  {t:"3",re:/(pana|pac|paa|enforcement point|eap over udp)/i,title:"PANA",section:"t32",heading:"PANA",focus:"PaC is the client, PAA runs authentication, EP opens the traffic gate; PANA carries EAP over UDP/IP."},
  {t:"3",re:/(gratuitous arp|gateway.*mac|broadcast arp|arp request|ndp|icmpv6|stale arp)/i,title:"ARP, NDP and mobility",section:"t33",heading:"ARP",focus:"ARP resolves IPv4 next-hop MAC addresses; stale forwarding/ARP state can break service after movement; IPv6 uses NDP."},
  {t:"3",re:/(layer 3 mobility|local breakout|central anchoring|routed boundary)/i,title:"Layer 3 mobility",section:"t33",heading:"Layer 3 mobility",focus:"Crossing routed boundaries can change addresses; mobility mechanisms trade direct paths against continuity."},

  {t:"4",re:/(usable for design|requirement|service objective|hard constraints|environmental constraint)/i,title:"Requirements engineering",section:"t41",focus:"Turn vague goals into measurable targets; separate hard constraints from optimisation goals and site constraints."},
  {t:"4",re:/(concurrency|application mix|retry rate|capacity harder|usable air time|client class|asymmetric failure)/i,title:"Capacity planning",section:"t42",heading:"Capacity dimensioning",focus:"Coverage is not capacity. Plan for concurrent behaviour, application mix, retries, overhead and client capability."},
  {t:"4",re:/(1 · 6 · 11|1, 6 and 11|channel plan|interference management|co-channel)/i,title:"Channel reuse and interference",section:"t43",heading:"Channel reuse",focus:"Keep same-channel cells apart; layer channel assignment, power, antenna placement and admission policy."},
  {t:"4",re:/(validation|required.*predictive|post-deployment tuning|predictive models)/i,title:"Post-deployment validation",section:"t43",heading:"Post-deployment validation",focus:"Use measurements to confirm the built network meets service objectives; models miss crowds, noise and real traffic."},

  {t:"5",re:/(passive threat|traffic analysis|evil twin|deauthentication|arp spoofing|rogue ap)/i,title:"Wireless threat landscape",section:"t51",focus:"Passive attackers observe; active attackers inject/modify/suppress. Review evil twins, deauth abuse and ARP spoofing."},
  {t:"5",re:/(wps|wi-fi protected setup)/i,title:"WPS",section:"t52",heading:"WPS",focus:"WPS creates an alternate admission path; PIN and push-button modes change the threat model."},
  {t:"5",re:/(wep|rc4|crc-32|initialization vector|longer wep key)/i,title:"WEP",section:"t52",heading:"WEP",focus:"WEP failed structurally: RC4 + static shared key + 24-bit IV + non-cryptographic CRC-32 integrity."},
  {t:"5",re:/(aes-ccmp|ccmp|wpa2-personal|wpa2-enterprise|pmk comes|offline dictionary)/i,title:"WPA2 and AES-CCMP",section:"t52",heading:"WPA2 and AES-CCMP",focus:"Review confidentiality, MIC integrity, replay defence, session keys and Personal vs Enterprise authentication."},
  {t:"5",re:/(four-way handshake|anonce|snonce|gtk|ptk|nonce)/i,title:"Four-way handshake",section:"t52",heading:"The four-way handshake",focus:"PMK already exists; ANonce → SNonce+MIC → GTK+install+MIC → ACK+MIC derives/installs fresh session keys."},
  {t:"5",re:/(eap-tls|peap|eap-ttls|eap-fast|certificate menu|client certificate|server certificate)/i,title:"EAP methods",section:"t53",heading:"EAP",focus:"Choose an EAP method based on trust architecture; certificate validation is critical, especially for PEAP/TTLS."},
  {t:"5",re:/(edhoc|oscore|coap|mqtt)/i,title:"IoT security layers",section:"t53",heading:"EDHOC",focus:"EDHOC establishes compact authenticated keys; OSCORE protects CoAP end-to-end; WPA protects only the local radio hop."},
  {t:"5",re:/(segmentation|blast radius)/i,title:"Segmentation",section:"t53",heading:"Segmentation",focus:"Authenticated connectivity should not mean unrestricted reachability; segmentation limits blast radius and supports containment."},
  {t:"5",re:/(wids|wips|rogue-ap detection|baseline)/i,title:"Wireless monitoring",section:"t54",heading:"Detection",focus:"Correlate radio evidence with controller, wired and identity telemetry; define baselines before incidents."},
  {t:"5",re:/(span|port mirroring|capwap.*mirror)/i,title:"Port mirroring / SPAN",section:"t54",heading:"Port mirroring",focus:"Mirror switch traffic for diagnosis, but tunnelling may show CAPWAP instead of individual client packets."},
  {t:"5",re:/(response steps|containment|certificate management|evil-twin case|worked evil-twin)/i,title:"Response and recovery",section:"t54",heading:"Response",focus:"Isolate narrowly, revoke credentials, preserve evidence, restore service, and use segmentation to contain impact."}
];

function ruleFor(q){
  var s=textOf(q),i,r;
  for(i=0;i<calcLessons.length;i++){r=calcLessons[i];if(r.t===String(q.t)&&has(s,r.re)){r.calc=true;return r;}}
  for(i=0;i<conceptRules.length;i++){r=conceptRules[i];if(r.t===String(q.t)&&has(s,r.re))return r;}
  var fallback={"1":"t11","2":"t21","3":"t31","4":"t41","5":"t51"};
  return {title:"Chapter "+q.t+" concept",section:fallback[q.t],focus:q.w||"Review the matching chapter explanation."};
}

function findHeading(section,needle){
  var root=document.getElementById(section);if(!root)return null;
  if(!needle)return root;
  var n=needle.toLowerCase(),hs=root.querySelectorAll("h4,h3,.eq");
  for(var i=0;i<hs.length;i++)if(hs[i].textContent.toLowerCase().indexOf(n)>-1)return hs[i].closest(".topic-block")||hs[i];
  return root;
}
function findEq(section,eq){
  var root=document.getElementById(section);if(!root)return null;
  var es=root.querySelectorAll(".eq");
  for(var i=0;i<es.length;i++)if(es[i].textContent.indexOf(eq)>-1)return es[i];
  return root;
}
function findLab(title){
  var panels=document.querySelectorAll("#lab .panel");
  for(var i=0;i<panels.length;i++){var h=panels[i].querySelector("h2");if(h&&h.textContent.toLowerCase().indexOf(title.toLowerCase())>-1)return panels[i];}
  return null;
}
function targetFor(r){return r.eq?findEq(r.section,r.eq):findHeading(r.section,r.heading);}
function instantTo(el){
  if(!el)return;var root=document.documentElement,old=root.style.scrollBehavior;root.style.scrollBehavior="auto";
  var y=el.getBoundingClientRect().top+window.scrollY-78;window.scrollTo(0,Math.max(0,y));root.style.scrollBehavior=old;
  el.classList.add("qstudy-focus");setTimeout(function(){el.classList.remove("qstudy-focus")},1200);
}
function openNotes(r){
  if(typeof showTab==="function")showTab("notes");
  requestAnimationFrame(function(){requestAnimationFrame(function(){instantTo(targetFor(r));var b=document.getElementById("backToGuide");if(b)b.classList.add("on");});});
}
function openLab(r){
  if(!r.lab)return;if(typeof showTab==="function")showTab("lab");
  requestAnimationFrame(function(){requestAnimationFrame(function(){instantTo(findLab(r.lab));});});
}
function varsHtml(r){
  if(!r.vars)return "";var h='<div class="qstudyvars">';r.vars.forEach(function(v){h+='<b>'+esc(v[0])+'</b><span>'+esc(v[1])+'</span>';});return h+'</div>';
}
function stepsHtml(r){
  if(!r.steps)return "";var h='<ol class="qstudysteps">';r.steps.forEach(function(x){h+='<li>'+esc(x)+'</li>';});return h+'</ol>';
}
function lessonHtml(q,r){
  var where="CH"+q.t+" → "+(sectionLabels[r.section]||r.section)+(r.eq?" → "+r.eq:r.heading?" → "+r.heading:"");
  var body="";
  if(r.calc){
    body+='<p><b>What this question is testing:</b> '+esc(r.title)+'.</p>';
    body+='<div class="qstudyformula">'+esc(r.formula)+'</div>'+varsHtml(r)+stepsHtml(r);
    if(r.trap)body+='<div class="qstudytrap"><b>Common mistake:</b> '+esc(r.trap)+'</div>';
  }else{
    body+='<p><b>What to review:</b> '+esc(r.focus||q.w||"")+'</p>';
    if(q.w)body+='<p><b>For this question:</b> '+esc(q.w)+'</p>';
  }
  var actions='<div class="qstudyactions"><button class="qstudygo" data-study-notes>OPEN EXACT NOTES · '+esc((sectionLabels[r.section]||r.section).split(" · ")[0])+'</button>'+(r.lab?'<button class="qstudygo lab" data-study-lab>TRY IN RF LAB</button>':'')+'</div>';
  return '<div class="qstudybox"><div class="qstudyhead"><div><b>'+esc(r.title)+'</b><div class="qstudywhere">'+esc(where)+'</div></div></div><div class="qstudybody">'+body+'</div>'+actions+'</div>';
}

function qMap(){var m={};QB.forEach(function(q){if(q.__code)m[q.__code]=q;});return m;}
function wire(){
  var map=qMap();document.querySelectorAll("#agList .agcard").forEach(function(card){
    if(card.dataset.studyWired==="1")return;
    var code=card.querySelector(".agcode"),q=code&&map[code.textContent.trim()];if(!q)return;
    var r=ruleFor(q),btn=document.createElement("button");btn.className="qstudybtn";btn.textContent=r.calc?"SHOW HOW TO SOLVE":"STUDY THIS TOPIC";
    var holder=document.createElement("div");holder.innerHTML=lessonHtml(q,r);var box=holder.firstChild;
    var anchor=card.querySelector(".agmemory")||card.lastElementChild;anchor.insertAdjacentElement("afterend",btn);btn.insertAdjacentElement("afterend",box);
    btn.addEventListener("click",function(){box.classList.toggle("on");btn.textContent=box.classList.contains("on")?"HIDE STUDY HELP":(r.calc?"SHOW HOW TO SOLVE":"STUDY THIS TOPIC");});
    var nb=box.querySelector("[data-study-notes]");if(nb)nb.addEventListener("click",function(){openNotes(r);});
    var lb=box.querySelector("[data-study-lab]");if(lb)lb.addEventListener("click",function(){openLab(r);});
    card.dataset.studyWired="1";
  });
}

wire();
var ag=document.getElementById("agList");if(ag)new MutationObserver(function(){wire();}).observe(ag,{childList:true,subtree:true});
})();
