"use strict";
(function(){
if(window.__wnTermsCleanupLoaded)return;window.__wnTermsCleanupLoaded=true;
var table=document.getElementById("acroT"),sec=document.getElementById("terms");
if(!table||!sec)return;

var style=document.createElement("style");
style.textContent='\
#acroT{table-layout:fixed}\
#acroT th:nth-child(1){width:150px!important}\
#acroT th:nth-child(2){width:300px!important}\
#acroT td{padding-top:10px;padding-bottom:10px;vertical-align:top}\
.term-label{display:none!important}\
.term-note{margin-top:6px;padding-top:6px;font-size:11px;line-height:1.35}\
.term-note b{display:inline;margin-right:5px}\
.term-stack{display:grid;gap:0}\
.term-line{padding:5px 0;border-bottom:1px solid var(--line)}\
.term-line:last-child{border-bottom:0}\
.term-line b{font-family:var(--mono);font-size:11.5px;color:var(--gr);font-weight:700}\
.term-line span{display:block;color:var(--dim);font-size:12.5px;line-height:1.4;margin-top:1px}\
.term-full{color:var(--ink)!important;font-weight:600}\
.term-clean-note{color:var(--faint);font-size:11.5px;line-height:1.4;margin-top:5px}\
@media(max-width:760px){#acroT{table-layout:auto}#acroT th:nth-child(1){min-width:130px}#acroT th:nth-child(2){min-width:230px}#acroT th:nth-child(3){min-width:300px}}';
document.head.appendChild(style);

var grouped={
"FAT / FIT AP":[
 ["FAT AP","Autonomous / standalone access point","Control, configuration, and management functions run on the AP itself."],
 ["FIT AP","Lightweight / controller-managed access point","The AP relies on a WLAN controller for configuration, policy, RRM, and coordination."]
],
"MSDU / MPDU":[
 ["MSDU","MAC Service Data Unit","Higher-layer payload handed down to the MAC."],
 ["MPDU","MAC Protocol Data Unit","The complete MAC frame transmitted over the wireless link."]
],
"LLC / SNAP":[
 ["LLC","Logical Link Control","Identifies and organizes upper-layer data above the MAC."],
 ["SNAP","Subnetwork Access Protocol","Extension used to identify the carried network-layer protocol." ]
],
"PoE / PSE / PD":[
 ["PoE","Power over Ethernet","Carries electrical power and data over Ethernet cabling."],
 ["PSE","Power Sourcing Equipment","The device supplying power, such as a PoE switch or injector."],
 ["PD","Powered Device","The device receiving PoE power, such as an access point."]
],
"802.3af / at / bt":[
 ["802.3af","PoE","Earlier PoE power level."],
 ["802.3at","PoE+","Higher power than 802.3af."],
 ["802.3bt","PoE++","Highest of these three power families; supports more demanding APs."]
],
"dBm / dBi":[
 ["dBm","Decibels relative to 1 milliwatt","Absolute power level, used for transmit and received signal power."],
 ["dBi","Decibels relative to an isotropic radiator","Antenna gain relative to an ideal isotropic antenna."]
],
"MIMO / MU-MIMO":[
 ["MIMO","Multiple-Input Multiple-Output","Uses multiple antennas / spatial streams to improve radio performance."],
 ["MU-MIMO","Multi-User Multiple-Input Multiple-Output","Allows multiple clients to be served simultaneously with separate spatial streams."]
],
"OFDM / OFDMA":[
 ["OFDM","Orthogonal Frequency-Division Multiplexing","Splits one channel into many orthogonal subcarriers."],
 ["OFDMA","Orthogonal Frequency-Division Multiple Access","Splits subcarriers into resource units that can be scheduled for different users."]
],
"802.11k / v / r":[
 ["802.11k","Radio Resource Measurement","Helps clients learn about neighboring APs and radio conditions."],
 ["802.11v","Wireless Network Management","Lets the network suggest a better AP or roaming target."],
 ["802.11r","Fast BSS Transition","Reduces authentication work during roaming between APs."]
],
"PMK / OKC":[
 ["PMK","Pairwise Master Key","Master key material used to derive session keys."],
 ["OKC","Opportunistic Key Caching","Reuses suitable cached key material to shorten roaming authentication."]
],
"WPA2 / WPA3":[
 ["WPA2","Wi-Fi Protected Access 2","Widely deployed Wi-Fi security generation, commonly using AES-CCMP."],
 ["WPA3","Wi-Fi Protected Access 3","Newer security generation with stronger authentication and modern protection requirements."]
],
"PaC / PAA / EP":[
 ["PaC","PANA Client","The client requesting network access."],
 ["PAA","PANA Authentication Agent","Coordinates the PANA authentication exchange."],
 ["EP","Enforcement Point","Allows or blocks traffic according to the authentication result."]
],
"NB-IoT / LTE-M":[
 ["NB-IoT","Narrowband Internet of Things","Low-power cellular option optimized for deep coverage and small data volumes."],
 ["LTE-M","Long-Term Evolution for Machines","Low-power cellular option with more mobility and throughput than NB-IoT."]
],
"Wi-Fi 6 / 6E / 7":[
 ["Wi-Fi 6","IEEE 802.11ax","Modern Wi-Fi generation focused strongly on efficiency in dense environments."],
 ["Wi-Fi 6E","802.11ax in the 6 GHz band","Extends Wi-Fi 6 operation into 6 GHz spectrum."],
 ["Wi-Fi 7","IEEE 802.11be","Newer generation adding features such as multi-link operation and higher peak capability."]
],
"ANonce / SNonce":[
 ["ANonce","Authenticator Nonce","Fresh random value supplied by the AP / authenticator during the four-way handshake."],
 ["SNonce","Supplicant Nonce","Fresh random value supplied by the client / supplicant during the four-way handshake."]
],
"PKI / CA":[
 ["PKI","Public Key Infrastructure","The overall system for issuing, validating, renewing, and revoking certificates."],
 ["CA","Certificate Authority","Trusted entity that signs and issues certificates inside a PKI."]
],
"LDAP / AD":[
 ["LDAP","Lightweight Directory Access Protocol","Protocol used to access directory information such as users and groups."],
 ["AD","Active Directory","Microsoft directory service commonly used to store enterprise identities and groups."]
],
"COSE / CBOR":[
 ["COSE","CBOR Object Signing and Encryption","Security structures for signing and encrypting CBOR data."],
 ["CBOR","Concise Binary Object Representation","Compact binary data format designed for efficient encoding."]
],
"WIDS / WIPS":[
 ["WIDS","Wireless Intrusion Detection System","Monitors wireless activity and raises alerts about suspicious behavior."],
 ["WIPS","Wireless Intrusion Prevention System","Adds prevention or containment actions on top of wireless detection."]
]
};

function makeStack(items,col){
 var d=document.createElement("div");d.className="term-stack";
 items.forEach(function(it){
   var line=document.createElement("div");line.className="term-line";
   if(col===0){var b=document.createElement("b");b.textContent=it[0];line.appendChild(b)}
   else if(col===1){var s=document.createElement("span");s.className="term-full";s.textContent=it[1];line.appendChild(s)}
   else{var s2=document.createElement("span");s2.textContent=it[2];line.appendChild(s2)}
   d.appendChild(line);
 });
 return d;
}

Array.from(table.querySelectorAll("tr")).slice(1).forEach(function(row){
 var cells=row.querySelectorAll("td");if(cells.length<3)return;
 var key=cells[0].textContent.replace(/labels, not acronyms/ig,"").trim();
 var items=grouped[key];
 if(items){
   cells[0].innerHTML="";cells[1].innerHTML="";cells[2].innerHTML="";
   cells[0].appendChild(makeStack(items,0));
   cells[1].appendChild(makeStack(items,1));
   cells[2].appendChild(makeStack(items,2));
   return;
 }
 var note=cells[2].querySelector(".term-note");
 if(note){
   var txt=note.textContent.replace(/^Remember\s*/i,"").trim();
   if(!txt||txt.length>150)note.remove();
 }
});

var p=sec.querySelector(".lede");
if(p)p.textContent="Clean, compact definitions for the five chapters. Combined terms are separated line by line so each concept can be read on its own.";
})();
