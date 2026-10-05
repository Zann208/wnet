"use strict";
/* Chapters 6-8 question bank. Loaded after midterm-ui.js on purpose: the midterm panel
   checks that the base bank is exactly 150 questions (30 per chapter 1-5), so these
   are appended afterwards and only feed the general mock exam. */
(function(){
if(window.__wnCh678QuestionsLoaded)return;window.__wnCh678QuestionsLoaded=true;
if(typeof Q!=="function"||!Array.isArray(QB))return;

/* ---------- Chapter 6: LPWAN ---------- */
Q("6","What do LPWAN designs deliberately trade away?",["Peak throughput and low latency","Battery life","Coverage range","Cost efficiency"],0,"LPWANs optimise coverage, energy efficiency and cost per device, so peak speed and low latency are the things given up.");
Q("6","Using L = Ebattery / Pavg, what is the only way to extend life for a fixed battery?",["Lower the average power","Raise the transmit power","Send more acknowledgments","Increase the duty cycle"],0,"With Ebattery fixed, life grows only when Pavg falls.");
Q("6","A sensor has 2400 mAh, 5 µA sleep current and 40 mA active current, active 0.1% of the time. About how long does it last?",["About 6 years","About 8 months","About 60 years","About 2 weeks"],0,"Pavg ≈ 0.999×0.005 + 0.001×40 ≈ 0.045 mA, so 2400/0.045 ≈ 53,000 h ≈ 6 years.");
Q("6","Why does the typical LPWAN traffic pattern favour uplink?",["Devices mostly report and downlink needs the receiver awake and uses scarce airtime","Uplink always has more bandwidth","Downlink is illegal in unlicensed bands","Sensors never receive anything"],0,"Devices are reporters. Downlink windows cost energy and airtime and depend on when the device is awake.");
Q("6","What is the preamble mainly for in a duty-cycled LPWAN receiver?",["Letting a sleeping receiver detect a packet and align timing","Encrypting the payload","Counting subscribers","Selecting the gateway"],0,"The preamble is a known pattern that lets an intermittent receiver notice an arriving frame and prepare for the payload.");
Q("6","CAD every 2 s with a 20 ms awake window uses what fraction of time? And every 1 s?",["1% and 2%","2% and 1%","0.1% and 0.2%","10% and 20%"],0,"20/2000 = 1% and 20/1000 = 2%. Checking twice as often doubles receiver listening cost.");
Q("6","If CAD checks become less frequent, what is the likely consequence?",["Saves receiver energy but may need a longer preamble or risk missed packets","Preamble can always be shortened","Transmitter airtime drops","Downlink becomes instant"],0,"Less frequent checks save receiver power, but the sender must keep the preamble longer so a sleeping receiver still catches it.");
Q("6","Which pairing is correct?",["NB-IoT: stationary, delay-tolerant, deep coverage. LTE-M: higher rate and mobility","NB-IoT: highest mobility. LTE-M: lowest rate","Both are unlicensed","LTE-M is a private-gateway technology"],0,"NB-IoT suits low-rate stationary use. LTE-M gives somewhat higher rate, lower latency and mobility support.");
Q("6","What is the main risk of an unlicensed LPWAN such as LoRaWAN?",["Interference uncertainty and regulatory duty-cycle limits","Dependence on SIM provisioning","Mandatory operator tariffs","No ability to place your own gateways"],0,"Shared spectrum gives unpredictable interference, and duty-cycle limits restrict transmissions and ACKs.");
Q("6","Why might a logistics firm tracking vehicles nationwide choose cellular LPWAN?",["Managed coverage and mobility without building its own gateways","It needs duty-cycle limits","It wants unlicensed spectrum","Cellular modules are always cheaper"],0,"Operator coverage, mobility and subscriber management suit geographically dispersed, moving assets.");
Q("6","In MQTT, which component receives publications and forwards them to subscribers?",["Broker","Gateway","Preamble","ONT"],0,"Devices publish to topics on a broker, and applications subscribe to the topics they need.");
Q("6","Why can a pilot with a few hundred LPWAN devices fail at tens of thousands?",["Collisions, retries, gateway and backend load, and synchronised reporting grow with scale","Batteries get larger","Coverage radius shrinks to zero","Uplink becomes downlink"],0,"Contention and retransmissions rise, which also raises average power and shortens battery life.");

/* ---------- Chapter 7: broadband architecture ---------- */
Q("7","Which layer consolidates traffic from many access segments and enforces subscriber policy?",["Aggregation","Core","Customer premises","Physical layer only"],0,"Aggregation consolidates and applies subscriber policy. The core provides large-scale transport and interconnection.");
Q("7","400 subscribers each sold 100 Mb/s share a 10 Gb/s uplink. What is the oversubscription ratio?",["4:1","40:1","1:4","0.25:1"],0,"O = (400 × 100 Mb/s) / 10 Gb/s = 40 Gb/s / 10 Gb/s = 4.");
Q("7","Doubling subscribers without upgrading the uplink does what to O?",["Doubles it","Halves it","Leaves it unchanged","Makes it zero"],0,"O is proportional to N for a fixed uplink and access rate.");
Q("7","Why can iBGP require a full mesh?",["An iBGP speaker does not re-advertise a route learned from one iBGP peer to another","iBGP uses UDP","iBGP forbids TCP","Every iBGP route has an empty AS_PATH"],0,"Because of that rule, every iBGP speaker needs a session with all others unless route reflectors are used.");
Q("7","What do route reflectors trade for fewer sessions?",["Placement and policy can influence which paths clients see and select","They remove the need for AS numbers","They convert iBGP into eBGP","They encrypt all routes"],0,"Fewer sessions come with dependence on reflector placement and policy.");
Q("7","Which attribute does a BGP router use to reject a route that has looped?",["AS_PATH","MED","ORIGIN","Community"],0,"A router that sees its own AS number in AS_PATH rejects the advertisement.");
Q("7","Inside an AS, a route with higher LOCAL_PREF but a longer AS_PATH competes with a shorter one with lower LOCAL_PREF. Which is usually preferred?",["The higher LOCAL_PREF one","The shorter AS_PATH one","Whichever arrived last","Neither, both are dropped"],0,"Strong local policy such as LOCAL_PREF is considered before AS_PATH length.");
Q("7","In an MPLS path, what does a transit LSR normally do?",["Swap the top label for a locally significant outgoing label","Push the first label","Run full BGP policy","Perform longest-prefix lookup on every packet"],0,"Ingress pushes, transit swaps, egress (or the penultimate hop) pops.");
Q("7","In a BGP/MPLS VPN, what does the inner label select?",["The VRF or customer attachment at the egress PE","The transport path in the core","The BGP AS number","The optical wavelength"],0,"The outer label crosses the core to the right PE. The inner label picks the VPN context there, so P routers hold no customer routes.");
Q("7","Does an MPLS VPN by itself keep payloads confidential from the provider?",["No, confidentiality needs an extra mechanism such as IPsec","Yes, labels encrypt the payload","Yes, but only with RSVP-TE","Only on fiber links"],0,"MPLS VPN gives routing and traffic separation, not payload encryption.");
Q("7","A 1:32 splitter is replaced by a 1:64 splitter. Roughly how much extra optical loss does the change add?",["About 3 dB","About 30 dB","About 0.3 dB","None, splitters are lossless"],0,"Each doubling of the split costs about 3 dB (10·log₁₀2).");
Q("7","Why are APC connectors widely used in PON?",["The angled end-face reduces back reflection","They are cheaper than all others","They carry electrical power","They are interchangeable with UPC in design intent"],0,"Back reflection can degrade optical performance in PON, and APC's angled polish reduces it.");

/* ---------- Chapter 8: broadband design ---------- */
Q("8","What is the first stage of the broadband design flow?",["Demand forecast","Resilience design","Implementation plan","Capacity allocation"],0,"Flow: forecast → topology → capacity → resilience → implementation.");
Q("8","Why forecast busy-hour traffic rather than the daily average?",["The busy hour drives uplink sizing, aggregation planning and oversubscription risk","Average traffic is always larger","Busy-hour traffic is cheaper to carry","SLAs ignore the busy hour"],0,"Capacity must be there when many users act at once.");
Q("8","MTBF is 2000 h and MTTR is 8 h. Which is closest to availability?",["99.60%","98.0%","99.99%","96.0%"],0,"A = 2000 / (2000 + 8) = 0.996.");
Q("8","With the same MTBF of 2000 h, cutting MTTR from 8 h to 2 h gives about what availability?",["99.90%","99.60%","99.0%","100%"],0,"A = 2000/2002 ≈ 0.9990, roughly a fourfold drop in downtime.");
Q("8","Two links of 99% availability are placed in parallel (either one is enough). Availability is about?",["99.99%","98.01%","99.00%","100%"],0,"A = 1 − (1 − 0.99)² = 0.9999.");
Q("8","The same two links are placed in series (both required). Availability is about?",["98.01%","99.99%","99.5%","99.0%"],0,"Series availabilities multiply: 0.99 × 0.99 = 0.9801.");
Q("8","Which action mainly lowers MTTR?",["Prepositioned spares and accurate documentation","Longer fiber routes","More subscribers per node","Higher split ratio"],0,"MTTR improves with spares, documentation, fast alarm correlation and disciplined repair workflow.");
Q("8","Which statement about logical vs physical topology is correct?",["The same fiber can carry different logical services with different addressing, QoS and policy","They are always identical","Logical topology only exists on copper","Physical topology defines subscriber authentication"],0,"VLANs, MPLS and tunnels allow many logical services over one physical plant.");
Q("8","What is a main cost of a phased rollout?",["Temporary inequity in coverage and possible technical debt from interim designs","Higher initial capital than full rollout","No revenue until the end","Impossible to forecast"],0,"Phasing lowers initial cost but needs a transition plan and communication.");
Q("8","Why are service tiers called engineering commitments?",["They set capacity, monitoring and repair expectations that the design must support","They are only price labels","They are optional for business customers","They affect only marketing"],0,"A tier or SLA changes reserved capacity, contention assumptions, monitoring and repair speed.");
Q("8","Which pairing of design choice and main cost is correct?",["Redundant aggregation links: more equipment and leasing cost","Full fiber rollout: lowest initial capital","Incremental hybrid: lowest architectural complexity","Centralised policy: no scaling concern"],0,"Redundancy raises availability but adds equipment and leasing cost.");
Q("8","Why does operational readiness belong to the design?",["Without inventory, monitoring, spares and procedures, MTTR grows regardless of the architecture","It only matters for marketing","It replaces the need for topology","It affects only wireless networks"],0,"Design intent becomes reliable service only if the network can be operated and repaired quickly.");

/* shuffle answer positions so the correct option is not always first */
(function(){
  var firstNew=QB.length-36;
  for(var i=firstNew;i<QB.length;i++){
    var q=QB[i];if(!q||q.t<"6")continue;
    var correct=q.o[q.a],rot=(i*7+3)%q.o.length,idx=q.o.map(function(_,k){return k});
    var order=idx.slice(rot).concat(idx.slice(0,rot)),opts=order.map(function(k){return q.o[k]});
    q.o=opts;q.a=opts.indexOf(correct);
  }
})();

var bank=document.getElementById("qBank"),sQs=document.getElementById("sQs");
if(bank)bank.textContent=QB.length;
if(sQs)sQs.textContent=QB.length;
})();
