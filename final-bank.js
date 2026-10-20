"use strict";
/* Final-exam question bank: all of Chapter 9 (QoS) plus extra Chapter 6-8 questions
   written from the handouts. Loaded after chapter678-questions.js and BEFORE
   chapter678-drill.js so the Drills tab and the FINAL tab both see these questions.
   The midterm panel already built its CH1-5 bank before this file runs, so it is untouched. */
(function(){
if(window.__wnFinalBankLoaded)return;window.__wnFinalBankLoaded=true;
if(typeof Q!=="function"||!Array.isArray(QB))return;

var start=QB.length;
/* E(chapter, question, correct answer, [three wrong answers], explanation) */
function E(t,q,right,wrong,why){Q(t,q,[right].concat(wrong),0,why)}

/* ---------- Chapter 6 extras: LPWAN ---------- */
E("6","A water meter sends a few bytes every several hours. Why does LPWAN suit it?",
  "Long sleep intervals and robust coverage matter more than wide channels or high bitrate",
  ["It needs interactive video","It needs low latency above all","It needs a continuous downlink"],
  "LPWAN engineering starts from the reporting model. Sparse, asynchronous messages reward long sleep and reach, not throughput.");
E("6","Why does protocol overhead matter so much for LPWAN devices?",
  "Payloads are tiny, so headers, acknowledgments, joins and retries can use a large share of airtime and energy",
  ["Overhead is free on unlicensed spectrum","Payloads are always large","Overhead only affects downlink"],
  "With only a few bytes per message, signalling can dominate. The real question is useful information per unit of battery energy and airtime.");
E("6","A cold-chain monitor and a river-level sensor are both LPWAN devices. What extra matters for the cold-chain monitor?",
  "Reliable and timely delivery of rare alarm messages",
  ["Higher peak throughput","Continuous streaming","Wider channels"],
  "The river sensor values endurance and reach. The cold-chain monitor also needs dependable exception reporting when the temperature leaves its band.");
E("6","What is the cost of a longer preamble in a duty-cycled LPWAN?",
  "More transmitter airtime and energy, in exchange for a better chance a sleeping receiver detects the packet",
  ["Lower receiver sensitivity","Shorter battery life only at the receiver","No cost at all"],
  "A longer preamble improves detection by a duty-cycled receiver but occupies more airtime and costs the transmitter more energy.");
E("6","Design A checks every 2 s with a 1.2 s preamble. If Design B checks every 1 s, what preamble is the worked example's illustration?",
  "About 0.6 s",
  ["About 2.4 s","About 1.2 s, unchanged","About 20 ms"],
  "Checking twice as often lets the preamble roughly halve to about 0.6 s. Receiver cost rises (2% duty vs 1%) while transmitter airtime falls.");
E("6","A remote station is designed for an eight-year battery, but winter link quality forces repeated retransmissions. What happens?",
  "Average power rises, so lifetime and the maintenance interval shrink",
  ["Lifetime is unaffected because L depends only on battery size","Lifetime doubles","Only downlink power changes"],
  "L = Ebattery / Pavg. Retries raise Pavg, so energy design is inseparable from radio design: coverage margin, interference, packet size and ack policy all matter.");
E("6","Which pairing of LPWAN technology and typical limitation is right?",
  "LTE-M: higher complexity than LoRaWAN. Sigfox: limited payload flexibility",
  ["LoRaWAN: operator dependency. NB-IoT: duty-cycle limits","Sigfox: licensed spectrum. LTE-M: no mobility","NB-IoT: unlicensed. LoRaWAN: SIM provisioning"],
  "Table 6.2: LoRaWAN duty-cycle constraints, Sigfox limited payload flexibility, NB-IoT operator dependency, LTE-M higher complexity than LoRaWAN.");
E("6","When MQTT runs over Wi-Fi, how do the messages reach the broker?",
  "Inside a TCP connection, carried in IP packets and 802.11 data frames",
  ["Directly in 802.11 management frames","Over UDP broadcast only","Through an LPWAN gateway preamble"],
  "Wi-Fi supplies the local IP access path. The device joins the WLAN, gets IP connectivity, opens TCP to the broker, and MQTT rides on top.");
E("6","How does ECHONET Lite differ from MQTT in its model?",
  "ECHONET Lite represents appliances as objects with properties to read, write and notify. MQTT is broker-mediated publish/subscribe",
  ["ECHONET Lite uses a broker and topics. MQTT uses objects","Both are physical-layer radio standards","ECHONET Lite only works over LoRaWAN"],
  "ECHONET Lite is oriented to device objects, properties and control operations in a home or building network. MQTT centres on a broker and topics.");
E("6","Which measure best secures ECHONET Lite appliances on a home WLAN?",
  "Place them on an IoT segment, restrict which controllers reach them, update firmware and avoid unrestricted remote access",
  ["Rely on Wi-Fi encryption alone","Expose the controller to the Internet for convenience","Disable discovery and never update firmware"],
  "Wi-Fi encryption keeps outsiders off the link but does not mean every authenticated client should control every appliance. Segment, restrict, update, monitor.");
E("6","A parking-sensor pilot of a few hundred devices goes citywide. Which step best limits packet loss and battery drain from commute-hour bursts?",
  "Stagger device reporting, place gateways carefully and keep downlink commands to a minimum",
  ["Make every uplink trigger an immediate downlink acknowledgment","Synchronise all sensors to report together","Assume pilot behaviour will scale unchanged"],
  "Synchronised bursts raise channel occupancy. Staggering, gateway placement and restrained downlink use keep the network scalable.");

/* ---------- Chapter 7 extras: broadband architecture ---------- */
E("7","Why does broadband upstream design converge on fiber even when the customer medium is copper, coax or radio?",
  "Only optical links economically carry the aggregated traffic of many users over metro and regional distances",
  ["Copper cannot carry any traffic","Fiber is slower but cheaper","Radio cannot be backhauled"],
  "Fiber gives high bandwidth, low attenuation and immunity to interference, so it forms the structural backbone across access, aggregation and core.");
E("7","What does a passive splitter do in a PON?",
  "Shares one feeder fiber among many subscribers without field power",
  ["Amplifies the optical signal","Routes packets by IP address","Encrypts the upstream traffic"],
  "PON uses passive splitters instead of powered distribution electronics. That cuts field power needs but adds split ratio, optical budget and upstream contention concerns.");
E("7","Choosing a 1:64 split over 1:32 mainly trades what?",
  "Capital efficiency against per-subscriber capacity margin and reach",
  ["Wavelength against polish type","Latency against AS_PATH length","Label space against VRF count"],
  "A higher split lowers per-subscriber outside-plant cost but adds optical loss and may reduce capacity available to each subscriber under load.");
E("7","A subscriber's ONT will not register. Which cause is part of the chapter's list of suspects?",
  "A contaminated connector at the optical outlet or ONT patch lead",
  ["An iBGP route reflector","A BGP community tag","The MPLS penultimate hop"],
  "Dirty ferrules, mismatched polish, damaged patch leads and bend loss all raise insertion loss. Inspect and clean before blaming the feeder or OLT.");
E("7","Which BGP message advertises or withdraws prefixes?",
  "UPDATE",
  ["OPEN","KEEPALIVE","NOTIFICATION"],
  "OPEN sets up the session, KEEPALIVE confirms it is alive, UPDATE advertises or withdraws reachability, NOTIFICATION reports errors and closes the session.");
E("7","What transport do BGP speakers use for their peer sessions?",
  "TCP",
  ["UDP","Raw MPLS labels","ICMP"],
  "BGP peers form sessions over TCP, which gives reliable ordered delivery, though BGP still keeps its own session state and routing tables.");
E("7","What is MED used for?",
  "Suggesting to a neighbouring AS which entry point it should prefer",
  ["Detecting loops between AS numbers","Tagging a route for filtering","Selecting the VRF at the egress PE"],
  "MED suggests a preferred entry point among multiple links when the neighbour's policy permits. AS_PATH detects loops. Communities tag routes.");
E("7","What does penultimate-hop popping do?",
  "The router just before the egress removes the outer transport label, reducing the egress router's work",
  ["The ingress adds a second inner label","The egress swaps the label twice","The core router encrypts the payload"],
  "It is a common MPLS optimisation. The egress then handles the exposed packet or the inner service label directly.");
E("7","Why is an MPLS label said to have local significance?",
  "It identifies forwarding treatment between neighbouring routers and is not a global address",
  ["It is the destination IP address","It is the AS number","It is globally unique across providers"],
  "Each hop swaps the label for a new locally meaningful one. The label indexes a forwarding table and does not replace IP routing.");
E("7","How is an RSVP-TE traffic-engineered LSP different from shortest-path forwarding?",
  "It is explicitly routed using constraints such as bandwidth, policy or links to avoid, but it is not an automatic quality guarantee",
  ["It always follows the lowest-cost path","It removes the need for IP routing","It guarantees better QoS for every packet"],
  "TE can raise utilisation and support service goals, but it creates state to monitor and recompute when links fail. It is a planning tool.");
E("7","Which statement correctly splits the jobs of BGP and MPLS in a provider VPN?",
  "BGP distributes reachability and VPN routes between PEs, and MPLS carries the packets across the core by label",
  ["MPLS distributes routes and BGP swaps labels","Both only operate inside the optical layer","BGP forwards by label and MPLS selects AS paths"],
  "BGP decides which route and service information is used and propagated. MPLS carries packets according to labels installed from that control-plane state.");

/* ---------- Chapter 8 extras: broadband design ---------- */
E("8","Why does demand forecasting start with segmentation?",
  "Apartments, suburbs, industrial parks and rural areas adopt broadband very differently",
  ["Every district adopts at the same rate","Segmentation removes busy-hour traffic","Segments only matter after launch"],
  "Income, business mix, competition and legacy service quality all shape penetration, so one aggregate guess misleads.");
E("8","A district's remote-work and video-call use was missed in the forecast. What is the likely effect?",
  "Upstream demand stresses aggregation links even though downstream headline speeds look adequate",
  ["Downstream links fail first","Nothing, since forecasts do not affect design","Only core routers are affected"],
  "Forecasting errors become concrete cost and performance problems. Uplink sizing follows busy-hour upstream behaviour.");
E("8","How does a business service tier differ from an entry residential tier in engineering terms?",
  "It may need reserved capacity, stronger monitoring and faster repair processes",
  ["It needs no monitoring","It shares the same contention assumptions","It only changes the marketing name"],
  "Tiers and SLAs are engineering commitments with different cost structures even when they share the same physical plant.");
E("8","Compared with a ring or dual-homed design, a simple tree topology typically has what weakness?",
  "A large failure domain if a feeder segment is cut",
  ["It cannot carry fiber","It needs more trenching than a ring","It has no cost advantage"],
  "A tree is cheap for access expansion, but a feeder cut affects many customers. Rings and dual-homing cost more yet shorten or shrink outages.");
E("8","MTBF is 4000 h and MTTR is 4 h. Which is closest to availability?",
  "99.90%",
  ["99.00%","99.99%","96.0%"],
  "A = 4000 / (4000 + 4) = 4000 / 4004 ≈ 0.9990.");
E("8","Which actions mainly raise MTBF?",
  "Fiber route diversity, quality construction, environmental hardening and equipment redundancy",
  ["Spares strategy and clearer documentation","Faster alarm correlation","Disciplined repair workflow"],
  "Those four make failure less likely. Spares, documentation, alarm correlation and repair workflow lower MTTR instead.");
E("8","A provider uses a ring-shaped metro physical topology but star-like service flows into central gateways. What does this illustrate?",
  "Logical topology can differ from physical topology",
  ["Physical and logical topology are identical","Rings cannot carry services","Logical topology defines the buried cable path"],
  "Tunnels, VLANs, virtual circuits and software overlays let the service view differ from the cable geometry.");
E("8","Why are high-density areas, business districts and anchor institutions common first targets in a phased rollout?",
  "They improve early take-up and reduce unit construction cost",
  ["They have no demand","They avoid all permits","They never need aggregation"],
  "Early phases should create technical momentum and commercial value, but the plan must include transitions so early choices do not become technical debt.");
E("8","Why does the chapter say not every network segment deserves the same protection?",
  "A rural spur and a metro path carrying hospitals, enterprises and mobile backhaul have very different outage costs",
  ["Redundancy is always too expensive","All failures are equally probable","Protection only applies to the core"],
  "Resilience design is selective: find the likely failures, the costly outages and where redundancy gives the most benefit per unit cost.");
E("8","What does the chapter say about the technically best design?",
  "It is not always the one that can be financed, built and sustained",
  ["It is always the full-fiber design","It ignores operating cost","It never needs staged upgrades"],
  "CAPEX, OPEX and upgrade path must be balanced, and a staged or hybrid build can be correct if it earns revenue to fund deeper upgrades.");

/* ---------- Chapter 9: QoS of broadband networks ---------- */
E("9","A service has high average throughput but feels poor. What is a likely reason?",
  "Delay varies unpredictably or loss forces repeated retransmissions",
  ["Throughput and delay are the same metric","Average throughput always predicts experience","QoS only measures speed"],
  "QoS metrics interact. Good average speed can coexist with delay spikes or loss that users actually notice.");
E("9","Which QoS metric depends on how packets compete for limited output capacity and is often the most variable delay component?",
  "Queuing delay",
  ["Propagation delay","Serialization delay","Availability"],
  "Propagation, transmission and processing are comparatively fixed. Queuing swings with load, which is why QoS engineering targets it.");
E("9","What is jitter?",
  "Variation in packet delay",
  ["The total path length","The loss ratio","The advertised access rate"],
  "Delay is the time to traverse the network. Jitter is how much that delay varies from packet to packet.");
E("9","Two paths have the same average delay but one has much higher jitter. What follows?",
  "The high-jitter path can feel much worse for voice and video, forcing larger buffers or causing glitches",
  ["Both give identical experience","The high-jitter path is better","Jitter only matters for file transfers"],
  "Real-time receivers can tolerate a modest fixed delay but not irregular arrival. QoS must stabilise delay, not just lower the mean.");
E("9","An online game uses little bandwidth yet is demanding. Which property is it highly sensitive to?",
  "Latency variation",
  ["Peak download rate","Total monthly volume","Number of subscribers on the node"],
  "Games and video calls care about delay and jitter far more than raw bandwidth.");
E("9","How does congestion-driven loss reduce effective throughput?",
  "Upper-layer protocols such as TCP shrink their sending window or retransmit",
  ["Loss increases the advertised rate","Loss has no effect on TCP","Loss only affects UDP"],
  "Dropped packets trigger rate reductions and retransmissions, so loss and throughput must be analysed together.");
E("9","Why may an uncongested speed test misrepresent busy-period performance?",
  "Sustained rate depends on overhead, contention, queue occupancy, retransmissions and loss recovery",
  ["Speed tests always include contention","Peak throughput equals sustained throughput","Busy periods change the physical distance"],
  "A moderate-speed network with low loss and stable latency can outperform a faster one with unstable queue behaviour.");
E("9","Eq 9.1 splits end-to-end delay into which four components?",
  "Processing, queuing, transmission and propagation",
  ["Marking, policing, shaping and scheduling","Jitter, loss, throughput and availability","Classification, marking, queuing and dropping"],
  "De2e = Dproc + Dqueue + Dtrans + Dprop. Each points to a different remedy.");
E("9","Which delay component grows most during congestion on a shared broadband bottleneck?",
  "Dqueue",
  ["Dprop","Dtrans","Dproc, but never anything else"],
  "Propagation and link rate stay the same. Waiting in queues is the controllable, load-dependent term.");
E("9","If propagation delay dominates the end-to-end delay, what is the right remedy?",
  "Shorten the route or physical distance",
  ["Add a priority queue","Increase the buffer size","Mark more traffic as real-time"],
  "QoS scheduling cannot shorten the speed-of-light path. If transmission dominates, raise link rate. If processing dominates, look at device architecture and feature load.");
E("9","What is the difference between classification and marking?",
  "Classification identifies packets by application, subscriber policy or contract. Marking encodes the intended treatment for downstream devices",
  ["Marking identifies applications and classification sets queue size","They are the same operation","Classification drops packets and marking forwards them"],
  "Classification turns a general stream into engineered service flows. Marking communicates handling so downstream systems apply consistent treatment.");
E("9","Why do providers validate or rewrite markings at the service edge?",
  "Otherwise subscribers could mark all traffic high priority",
  ["Markings are unreadable by routers","Edge devices cannot forward marked packets","Markings change the MAC address"],
  "Trust boundaries decide who may signal priority. Managed business equipment may be trusted, while unmanaged residential traffic is reclassified by provider policy.");
E("9","What is the main risk of strict priority scheduling?",
  "Starving lower classes if too much traffic is high priority",
  ["It cannot protect voice","It requires deep packet inspection","It increases serialization delay of the link"],
  "Strict priority protects small volumes of delay-sensitive traffic well, but overuse leaves lower classes with nothing.");
E("9","How does weighted fair queuing differ from strict priority?",
  "It reserves relative service shares for classes while still giving important traffic better treatment",
  ["It always serves one class completely first","It drops all bulk traffic","It removes the need for classification"],
  "Weighted approaches are a more balanced compromise. The right scheduler depends on traffic mix, service commitments and tolerance for complexity.");
E("9","What does bufferbloat describe?",
  "Large unmanaged buffers absorbing bursts but adding excessive delay under sustained load",
  ["Buffers that are too small to hold any packet","A routing loop","Loss caused by physical errors"],
  "Active queue management signals congestion or sheds load earlier so latency stays stable, often improving interactive use with little change in peak throughput.");
E("9","A household shares upstream among a video stream, a cloud backup and a voice call. Which fix helps most?",
  "A modest low-latency treatment for voice plus controlled queue occupancy for bulk data",
  ["Block the backup permanently","Give the backup strict priority","Increase buffer size without limits"],
  "QoS shapes contention rather than pretending it away: voice stays protected and the backup still completes.");
E("9","In Table 9.1, which class and typical treatment fit software updates?",
  "Background, with rate-limited service",
  ["Real-time, with priority scheduling","Transactional, with assured bandwidth","Bulk data, with strict priority"],
  "Real-time gets priority scheduling, Transactional gets assured bandwidth, Bulk data gets best effort or weighted sharing, Background is rate limited.");
E("9","Total packet loss looks low, yet subscribers complain about video meetings at busy times. What might queue telemetry show?",
  "Delay-sensitive traffic is misclassified or sharing a congested class with bulk uploads",
  ["The priority queue is perfect","Loss is irrelevant to quality","Subscribers are mistaken"],
  "Verification connects device statistics to customer-visible outcomes. Confirm the priority queue carries the intended traffic and lower classes remain usable.");
E("9","A real-time class grows to include large amounts of interactive video and hurts fairness. What is the sensible response?",
  "Refine classification, impose class limits or adopt better queue management",
  ["Remove all priority forever","Add more priority classes without limits","Ignore it, since priority never needs tuning"],
  "QoS policy is a continuing engineering process: revisit it using operational data, complaints, new application mixes and changing tiers.");
E("9","What does the chapter advise about the number of traffic classes?",
  "Use a small number of meaningful classes mapped consistently",
  ["Create as many classes as possible","Use one class per subscriber","Avoid classes altogether"],
  "Overly elaborate schemes are hard to validate and troubleshoot. Each class should represent a distinct operational intention.");
E("9","Which application tolerates the most delay and jitter?",
  "A cloud backup job",
  ["A voice call","Interactive video","A real-time control system"],
  "QoS is relative to the application class. Bulk transfers tolerate delay and jitter far more than real-time traffic.");

/* The correct answer was written first. Rotate options deterministically so it is not always option A. */
for(var i=start;i<QB.length;i++){
  var q=QB[i],correct=q.o[q.a],n=q.o.length,r=(i*5+2)%n,idx=[],k;
  for(k=0;k<n;k++)idx.push((k+r)%n);
  q.o=idx.map(function(j){return q.o[j]});q.a=q.o.indexOf(correct);
}

/* keep the home / drill counters honest */
var sQs=document.getElementById("sQs"),qBank=document.getElementById("qBank");
if(sQs)sQs.textContent=QB.length;if(qBank)qBank.textContent=QB.length;
})();
