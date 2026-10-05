"use strict";
/* Glossary rows for Chapters 6-8 (same pattern as terms-extra.js). */
(function(){
if(window.__wnTermsCh678Loaded)return;window.__wnTermsCh678Loaded=true;
var table=document.getElementById("acroT");if(!table)return;
var rows=[
 ["LPWAN","Low-Power Wide-Area Network","Network type that favours long range, long battery life and low cost per device over throughput and latency. Typical traffic is small, infrequent and mostly uplink."],
 ["LoRaWAN","Long Range Wide Area Network","Unlicensed LPWAN with flexible private gateways. Main constraints are regulatory duty-cycle limits and shared-spectrum interference."],
 ["Sigfox","Sigfox","Unlicensed LPWAN with very low energy messaging and limited payload flexibility."],
 ["NB-IoT","Narrowband Internet of Things","Licensed cellular LPWAN for low-rate, stationary, delay-tolerant devices needing deep coverage and strong energy efficiency."],
 ["LTE-M","LTE for Machines","Licensed cellular LPWAN with somewhat higher rate, lower latency and mobility support than NB-IoT."],
 ["Duty cycle","Duty cycle","Fraction of time a radio is active. Lower duty cycle lowers average power and extends battery life; regulators may also cap it in unlicensed bands."],
 ["CAD","Channel Activity Detection","Brief wake-up test for a signal pattern so a low-power receiver can return to sleep when the channel is idle."],
 ["Preamble","Preamble","Known signal pattern at the start of a frame that lets a receiver detect the packet and align timing before the payload."],
 ["MQTT","Message Queuing Telemetry Transport","Lightweight publish/subscribe protocol where devices publish to topics on a broker and applications subscribe."],
 ["Broker","MQTT broker","Server that receives publications, applies authentication and authorization, and forwards messages to subscribers."],
 ["ECHONET Lite","ECHONET Lite","Application protocol for home automation and energy devices that models appliances as objects with readable and writable properties."],
 ["Gateway","LPWAN gateway / base station","Radio attachment point that relays many weak device transmissions to the network server."],
 ["Access","Access network","Part of a broadband network connecting users to the provider edge (fiber, cable, DSL, fixed wireless, PON)."],
 ["Aggregation","Aggregation / metro network","Consolidates traffic from many access segments and enforces subscriber policy."],
 ["Core","Core network","Large-scale transport, interconnection and reachability across regions or nations."],
 ["Oversubscription","Oversubscription ratio","O = N × Raccess / Ruplink. How much sold access capacity is shared on an uplink, relying on statistical multiplexing."],
 ["DWDM","Dense Wavelength Division Multiplexing","Carries many wavelengths on one fiber pair to multiply capacity without new cable."],
 ["PON","Passive Optical Network","Fiber access in which passive splitters share a feeder fiber among many subscribers."],
 ["OLT","Optical Line Terminal","Provider-side PON equipment in the central office or headend."],
 ["ONT / ONU","Optical Network Terminal / Unit","Customer-side PON device that converts optical signals to Ethernet or voice and marks the service demarcation."],
 ["FTTH","Fiber To The Home","Fiber extends all the way to the subscriber premises."],
 ["HFC","Hybrid Fiber-Coax","Fiber deep into the network with coaxial cable for the final distribution to homes."],
 ["DOCSIS","Data Over Cable Service Interface Specification","Standard for broadband over coaxial cable; the medium is shared among homes on a node."],
 ["APC / UPC","Angled / Ultra Physical Contact","Connector polish types. APC's angled end-face reduces back reflection and is common in PON; UPC is general purpose."],
 ["Optical budget","Optical loss budget","Transmitter power minus receiver sensitivity, which must exceed total path loss (fiber, splices, connectors, splitter) plus reserve margin."],
 ["BGP","Border Gateway Protocol","Interdomain path-vector routing protocol that exchanges policy-controlled reachability between autonomous systems over TCP."],
 ["AS","Autonomous System","Network under one routing policy, identified by an AS number."],
 ["eBGP / iBGP","External / Internal BGP","eBGP runs between ASes. iBGP runs inside an AS and does not re-advertise a route from one iBGP peer to another."],
 ["Route reflector","BGP route reflector","iBGP speaker that reflects routes to its clients so a full mesh of sessions is not needed."],
 ["AS_PATH","AS path attribute","List of ASes an advertisement has traversed; used for loop prevention and often for preference."],
 ["LOCAL_PREF","Local preference","BGP attribute shared inside an AS; higher value is preferred, making it a main policy lever."],
 ["MED","Multi-Exit Discriminator","BGP attribute suggesting to a neighbouring AS which entry point to prefer."],
 ["NLRI","Network Layer Reachability Information","The prefixes carried in a BGP UPDATE."],
 ["MPLS","Multiprotocol Label Switching","Forwarding architecture that attaches short, locally significant labels at the ingress to guide packets through a label-switched path."],
 ["FEC","Forwarding Equivalence Class","Group of packets that receive equivalent MPLS forwarding treatment."],
 ["LER / LSR","Label Edge Router / Label Switching Router","LER pushes and pops labels at the MPLS edge. LSR swaps labels inside the domain."],
 ["LSP","Label-Switched Path","Directional path followed by labeled packets through an MPLS domain."],
 ["PHP","Penultimate Hop Popping","The router before the egress removes the outer label to reduce the egress's work."],
 ["VRF","Virtual Routing and Forwarding","Separate routing table per VPN context on a provider-edge router."],
 ["PE / CE / P","Provider Edge / Customer Edge / Provider router","In a BGP/MPLS VPN, CE exchanges routes with PE; P routers forward by outer label and hold no customer routes."],
 ["RSVP-TE","Resource Reservation Protocol - Traffic Engineering","Signalling method for explicitly routed MPLS LSP tunnels with resource reservation."],
 ["SLA","Service-Level Agreement","Contract covering restoration targets, maintenance windows and escalation for a service tier."],
 ["MTBF","Mean Time Between Failures","Average operating time between failures. Higher is better for availability."],
 ["MTTR","Mean Time To Repair","Average time to restore service after a failure. Lower is better for availability."],
 ["Availability","Availability","A = MTBF / (MTBF + MTTR). Series elements multiply; parallel elements multiply unavailabilities."],
 ["CAPEX / OPEX","Capital / Operational expenditure","CAPEX is build cost (civil works, fiber, gear). OPEX is running cost (crews, leases, energy, support)."]
];
function existingKeys(){var m={};Array.from(table.querySelectorAll("tr")).slice(1).forEach(function(r){var c=r.querySelector("td");if(c)m[c.textContent.trim().toLowerCase()]=1;});return m;}
var have=existingKeys();
rows.forEach(function(r){
  if(have[r[0].toLowerCase()])return;
  var tr=document.createElement("tr");
  tr.innerHTML='<td class="mono ok">'+r[0]+'</td><td>'+r[1]+'</td><td><span class="term-meaning">'+r[2]+'</span></td>';
  table.appendChild(tr);
});
var lede=document.querySelector("#terms .lede");if(lede)lede.textContent="Every acronym in the eight chapters. Type to filter.";
})();
