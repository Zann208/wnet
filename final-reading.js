"use strict";
/* FINAL tab: "Final prep reading". Plain-language explanations of Chapters 6-9, with the
   reason each idea matters, the usual MCQ trap, worked numbers and a last-24-hours plan.
   Written from the four lecture handouts. Inserted before the mock-exam panel. */
(function(){
if(window.__wnFinalReadingLoaded)return;window.__wnFinalReadingLoaded=true;
var sec=document.getElementById("final");if(!sec||typeof store==="undefined")return;
var anchor=document.getElementById("finMock");if(!anchor)return;

var CH=[
{t:"6",name:"LPWAN",color:"sk",
 one:"LPWANs give up speed and low latency to get range, battery life and low cost per device. Every design choice follows from a tiny sensor that wakes, sends a few bytes and sleeps.",
 items:[
 ["Why LPWAN trades speed for reach","A water meter sending 12 bytes an hour does not need megabits. It needs to survive for years in a basement. So the radio is built for long range and long sleep, and it accepts slow, delayed, mostly one-way traffic.","Judge an LPWAN by fleet efficiency (years unattended, cost per device), never by peak throughput.","Options that say LPWAN maximises throughput or latency are wrong. The tradeoff is coverage and battery over throughput and low latency."],
 ["Traffic shape: uplink-heavy, small, sparse","Devices are reporters. A sensor wakes, measures, transmits and sleeps. Downlink means keeping the receiver awake and using scarce airtime, so it is rationed.","Because payloads are tiny, headers, acks, join procedures and retries can eat a large share of the airtime and energy. The question is useful information per unit of battery and airtime.","Periodic meters and alarm devices differ: alarms are silent for long periods and then need reliable, timely delivery. Tie this to the cold-chain example."],
 ["Preamble and CAD: how a sleeping receiver still hears you","A receiver cannot stay awake. CAD is a short wake-up to sniff for a signal. The preamble is a known pattern long enough that a receiver doing periodic CAD will catch it, then align timing before the payload.","Check more often (shorter CAD interval) and the preamble can be shorter, so the transmitter uses less airtime but the receiver burns more energy. Check less often and you save receiver energy but need a longer preamble or risk missed packets. The two are tuned together.","Know who pays: longer preamble costs the transmitter. More frequent CAD costs the receiver."],
 ["Energy: L = E / Pavg","Battery energy is fixed, so the only lever is average power. Pavg is a weighted mix of sleep power and active power, so duty cycle dominates. Retransmissions raise Pavg and shorten life, which is why coverage margin and interference are energy problems too.","A device built for eight years can fail in winter if poor links force retries.","Lower Pavg means longer life. Raising transmit power or acks usually shortens it."],
 ["LoRaWAN, Sigfox, NB-IoT, LTE-M","Unlicensed (LoRaWAN, Sigfox): you can deploy your own gateways, but spectrum is shared, so interference is unpredictable and regulators cap duty cycle. Licensed cellular (NB-IoT, LTE-M): managed coverage, mobility and SIM-based administration, but you depend on the operator, tariffs and module certification.","NB-IoT is for low-rate, stationary, delay-tolerant devices with deep coverage. LTE-M gives somewhat higher rate, lower latency and mobility. A fixed gas meter in a basement is NB-IoT. A moving asset tracker is LTE-M.","Do not swap the strengths. Table 6.2: LoRaWAN duty-cycle limits, Sigfox limited payload flexibility, NB-IoT operator dependency, LTE-M higher complexity than LoRaWAN."],
 ["Architecture: device, gateway, network server, application","Gateways turn many weak sporadic transmissions into stable upstream transport. The network server handles identity, deduplication, security and queueing. Service quality is end to end: a packet that reaches the gateway can still be lost to bad backend design.","This is why LPWAN is described as a pipeline rather than a standalone radio problem.",""],
 ["MQTT and ECHONET Lite over Wi-Fi","Wi-Fi only provides the IP path. MQTT rides in TCP and is broker-based publish/subscribe: devices publish to topics, applications subscribe. ECHONET Lite models appliances as objects with properties you read, write or get notified about.","Compared with LPWAN, Wi-Fi gives more throughput and lower delay but uses more energy and needs denser infrastructure. For battery devices, sleep scheduling and keep-alive intervals matter.","Wi-Fi encryption does not mean every client should control every appliance. Segment the IoT network, restrict controllers, update firmware, avoid unrestricted remote access."],
 ["Scalability: why pilots lie","A pilot of 50 devices hides contention. At 50,000, collisions, retries, gateway load and synchronised reporting grow. Capacity depends on how often devices speak and how long each transmission occupies the channel, not just coverage radius.","Fixes: stagger reporting, place gateways carefully, minimise acks and chatty control, and reserve downlink for high-value functions. An ack for every uplink can collapse under load.","The parking-sensor example: commute-hour bursts raise packet loss and shrink battery life."]
 ],
 work:[
 ["Battery life (Eq 6.1)","2400 mAh, sleep 5 µA, active 40 mA, duty 0.1%.<br>Pavg = 0.999 × 0.005 + 0.001 × 40 = 0.004995 + 0.04 = <b>0.045 mA</b>.<br>L = 2400 / 0.045 ≈ 53,300 h ≈ <b>6.1 years</b>.<br>At 1% duty: Pavg ≈ 0.405 mA, L ≈ 5,900 h ≈ <b>0.7 years</b>. Ten times the duty cycle is roughly nine times shorter life, because active current dominates."],
 ["CAD cost","Awake fraction = awake time / interval. 20 ms every 2 s = 20/2000 = <b>1%</b>. 20 ms every 1 s = 20/1000 = <b>2%</b>. Doubling check rate doubles receiver listening cost, which is what lets the preamble shrink from about 1.2 s to about 0.6 s."]
 ]},

{t:"7",name:"Broadband architecture",color:"pk",
 one:"A broadband network is a hierarchy that funnels many users onto shared fiber. Sharing never disappears, it only moves, and BGP, MPLS and optics are three coordinated layers of one system.",
 items:[
 ["Access, aggregation, core","Access connects users to the provider edge (fiber, cable, DSL, fixed wireless, PON). Aggregation consolidates many access segments and enforces subscriber policy. The core provides large-scale transport, interconnection and reachability across regions.","Whatever the last-mile medium, upstream converges on fiber because only optics carries aggregated traffic across metro and regional distances.","Aggregation = consolidate and apply subscriber policy. Core = big transport and interconnect. Do not swap them."],
 ["Oversubscription: O = N · Raccess / Ruplink","You sell more access capacity than the shared uplink can carry at once, betting that users are not all busy together. O is that ratio.","A fat fiber does not remove sharing, it moves the bottleneck and changes its timescale. Doubling subscribers without upgrading the uplink doubles O.","Read O as a risk number: higher O means busy-hour congestion risk, not a guaranteed fault."],
 ["FTTH and PON","A passive splitter shares one feeder fiber among many subscribers with no powered field equipment. The OLT is the provider side, the ONT/ONU is the customer side and the service demarcation. Upstream is shared by time division.","Higher split ratio lowers cost per subscriber but adds optical loss and may cut per-subscriber capacity. Few powered parts means fewer failures, but faults move to connectors, bends, splitter paths and registration.","A dirty connector at the wall outlet or ONT patch lead is a classic cause of one subscriber's outage."],
 ["Connectors and polish","SC is push-pull and common in access gear. LC is small for dense panels. ST and FC are older or specialised. APC has an angled end-face that cuts back reflection and is common in PON. UPC is general purpose and not interchangeable with APC in design intent.","Small physical mistakes at the connector interface cause large service effects, so inspection and cleaning are part of service assurance.",""],
 ["Optical budget","Budget = transmitter power minus receiver sensitivity. Total loss = fiber + splices + connectors + splitter + reserve margin (2 to 4 dB for aging, repairs and temperature). Margin = budget minus total loss, and it must stay positive.","Each doubling of the split costs about 3 dB, because 10·log10(2) ≈ 3.","1:32 is about 15 dB ideal and 1:64 about 18 dB. Real parts add a little."],
 ["BGP: policy, not shortest path","BGP carries reachability between autonomous systems and is a policy system. Peers talk over TCP: OPEN sets up, KEEPALIVE confirms, UPDATE advertises or withdraws, NOTIFICATION reports errors. AS_PATH records the ASes crossed and rejects loops when a router sees its own AS.","LOCAL_PREF is the strongest local policy lever inside an AS (higher preferred). A shorter AS_PATH is often preferred after that. MED suggests an entry point to a neighbour. NEXT_HOP ties selection to reachable forwarding. Communities are policy tags.","A higher LOCAL_PREF beats a shorter AS_PATH. The preferred path is not always the shortest."],
 ["eBGP vs iBGP and route reflectors","eBGP runs between ASes. iBGP runs inside one AS and distributes external routes. An iBGP speaker does not re-advertise a route learned from one iBGP peer to another, so a full mesh is needed unless you use route reflectors.","Route reflectors cut sessions, but their placement and policy can influence which paths clients see.","iBGP full-mesh question: the reason is the no-readvertise rule, not UDP or empty AS_PATH."],
 ["BGP failure and safeguards","On withdrawal peers redo selection and policy, so a few intermediate path changes can occur before things settle. That is convergence, and it takes time. Bad control gives route flapping, and bad advertisements give route leaks or hijacks.","Safeguards: prefix and AS-path filters, maximum-prefix limits, protected sessions, community handling, monitoring origin changes, route-origin validation.",""],
 ["MPLS: push, swap, pop","The ingress LER classifies a packet into a FEC and pushes a label. Transit LSRs read only the top label and swap it for a new locally significant one. The egress LER pops it. Penultimate-hop popping removes the outer label one hop early.","A label is a forwarding index with local significance, not an address, and it does not replace IP routing. An LSP is directional.","Transit routers swap, they do not run full BGP policy or do longest-prefix lookup per packet."],
 ["MPLS VPN and traffic engineering","BGP distributes VPN routes between PEs and MPLS carries packets across the core. The outer label reaches the correct egress PE. The inner label selects the VRF or customer there. P routers forward on the outer label and hold no customer routes.","RSVP-TE builds explicitly routed LSPs using constraints (bandwidth, policy, links to avoid). It improves utilisation but creates state to monitor and is not an automatic QoS guarantee.","MPLS VPN gives separation, not encryption. Confidentiality against the provider needs something like IPsec."],
 ["Hybrid and fiber-centric choices","Fiber-centric designs have a long upgrade horizon: you change optics and terminal equipment without replacing buried cable. Hybrids (HFC, fiber to the cabinet) reuse legacy last-mile and let fiber run deep.","Users perceive the weakest segment. A fiber feeder does not rescue a shared or distance-limited final hop.","Table 7.3: FTTH/PON civil works cost, DOCSIS shared-medium contention, DSL distance sensitivity, fixed wireless spectrum and propagation limits."]
 ],
 work:[
 ["Oversubscription (Eq 7.1)","400 subscribers at 100 Mb/s share a 10 Gb/s uplink.<br>Sold = 400 × 100 Mb/s = 40,000 Mb/s = 40 Gb/s.<br>O = 40 / 10 = <b>4 : 1</b>. If everyone is busy, each gets 10,000 / 400 = <b>25 Mb/s</b>, a quarter of the sold rate. Double N to 800 and O becomes 8 : 1."],
 ["PON optical budget (illustrative numbers)","Budget 28 dB. Losses: fiber 4 + splices 0.5 + connectors 1 + 1:32 splitter 17 + reserve 3 = 25.5 dB. Margin = 28 − 25.5 = <b>+2.5 dB</b>, inside the budget.<br>Switch to 1:64: add about 3 dB, loss 28.5 dB, margin = <b>−0.5 dB</b>, over budget. Fix by shortening the route, lowering the split, cleaning connectors or removing a splice."]
 ]},

{t:"8",name:"Broadband design",color:"or",
 one:"Design turns forecasts into a network you can finance, build and run. The flow is forecast, topology, capacity, resilience, implementation, and operations decide whether the design holds up.",
 items:[
 ["Start with demand, not equipment","Forecasting segments the market (apartments, suburbs, industrial parks, rural) because adoption differs by income, business mix, competition and legacy service. It must model busy hour, not daily average, because the busy hour drives uplink sizing and oversubscription risk.","Over-forecast strands capital in unused feeder and oversized gear. Under-forecast creates bottlenecks and costly expansion.","Missed remote-work demand stresses upstream aggregation even when headline downstream speeds look fine."],
 ["Service tiers are engineering commitments","An entry residential tier can lean on statistical sharing. A business tier with uptime and response guarantees may need reserved capacity, stronger monitoring and faster repair, even on the same physical plant.","Marketing that exceeds the engineering model eventually gives dissatisfaction, regulatory exposure or overload.","Tiers are not just sales labels."],
 ["Availability: A = MTBF / (MTBF + MTTR)","You can raise availability by failing less often (MTBF) or repairing faster (MTTR). MTBF levers: route diversity, quality construction, hardening, equipment redundancy. MTTR levers: spares, documentation, alarm correlation, repair workflow.","A cost-effective resilience program often combines moderate redundancy with strong operations instead of expensive duplication alone. This justifies investing in faster repair.","Do not mix up the two lists. Spares and documentation lower MTTR, they do not raise MTBF."],
 ["Physical vs logical topology","Physical topology is geography: ducts, poles, rivers, permits, node placement. A tree is cheap but has a large failure domain if a feeder is cut. A ring or dual-homing costs more but shortens outages.","Logical topology is the service view: VLANs, tunnels, VRFs, policy. Two customers can share one fiber yet belong to different logical services with different addressing and QoS.","An efficient physical topology can still give poor service if the logical design is weak (poor isolation, central bottleneck, no QoS separation, too complex to troubleshoot)."],
 ["Selective resilience","Not every segment deserves the same protection. A rural spur and a metro path carrying hospitals, enterprises and mobile backhaul have very different outage costs.","The task is to find probable failures, costly outages and where redundancy gives the most benefit per unit cost.",""],
 ["Cost and phased rollout","CAPEX is civil works, fiber, active gear, sites, power and CPE. OPEX is crews, leases, energy, software, spares and support. Outside plant is expensive to rebuild while electronics are cheap to upgrade, which is why fiber-heavy can win despite the sticker price.","Phased rollout starts with dense zones and strategic corridors for lower initial cost and early revenue, but later areas may feel treated unfairly and interim choices can become technical debt.","Table 8.1: full fiber highest capacity vs highest CAPEX. Hybrid faster deployment vs complexity. Redundant aggregation availability vs equipment and leasing cost. Centralised policy easier operations vs scaling bottleneck."],
 ["Operational readiness","Design ends when the network can be run confidently. Inventory, monitoring that correlates optical, transport and customer-impact alarms, field procedures (cleaning, labelling, testing, escalation), spares and documentation.","Without them MTTR grows regardless of how elegant the architecture is. Two providers with the same architecture can look very different to customers.",""]
 ],
 work:[
 ["Availability (Eq 8.1)","MTBF 2000 h, MTTR 8 h: A = 2000 / 2008 = <b>99.60%</b>, about 35 h of downtime a year.<br>Cut MTTR to 2 h: A = 2000 / 2002 = <b>99.90%</b>, about 8.8 h a year. Downtime falls roughly fourfold with no new hardware."],
 ["Parallel and series","Two 99% links, either one enough (parallel): A = 1 − (0.01)² = <b>99.99%</b>.<br>Both required (series): A = 0.99 × 0.99 = <b>98.01%</b>.<br>Rule: parallel multiplies the unavailabilities, series multiplies the availabilities."]
 ]},

{t:"9",name:"QoS",color:"vi",
 one:"QoS gives predictable performance to applications that need different things from a shared network. Measure delay, jitter, loss and throughput together, then classify, mark, schedule, manage queues and verify.",
 items:[
 ["Metrics are relative to the application","A cloud backup tolerates delay and jitter. A voice call does not. Streamed video can tolerate some loss if it can buffer. A real-time control system cannot. The network is not fast or slow in the abstract, it is more or less suitable for a workload.","Metrics turn \"it feels bad\" into targets operators can measure.","High average throughput with poor experience is possible when delay swings or loss forces retransmission."],
 ["Delay vs jitter","Delay is the time to cross the network. Jitter is how much that delay varies. A receiver can absorb a modest fixed delay but irregular arrival forces a bigger buffer or causes glitches.","Two paths with the same average delay can feel very different. QoS must stabilise delay, not only lower the mean.","Online games use little bandwidth but are very sensitive to latency variation."],
 ["Loss and throughput interact","Congestion makes queues overflow, packets drop, and TCP shrinks its window and retransmits. So loss lowers effective throughput, and heavy throughput demand causes loss. Analyse them together.","A speed test measures peak rate on an uncongested line. Sustained rate depends on overhead, contention, queue occupancy, retransmissions and loss recovery.","Moderate speed with low loss and stable latency can beat a faster line with unstable queues."],
 ["Eq 9.1: where the delay comes from","De2e = Dproc + Dqueue + Dtrans + Dprop. Propagation is distance, transmission is link rate, processing is device load and queuing is waiting behind other packets.","The split tells you the remedy: long route, shorten it. Slow link, raise the rate. Overloaded device, fix the device. Queuing is the most variable and most controllable term, so QoS targets it.","During congestion the term that grows is Dqueue. Scheduling cannot shorten the speed-of-light path."],
 ["Classify, then mark, and the trust boundary","Classification identifies traffic (port, deep inspection, subscriber, access line, trusted markings). Marking writes the intended treatment so downstream devices apply it consistently.","If you accept every end-user marking, subscribers mark everything high priority. Providers validate or rewrite at the service edge: trust managed business gear, reclassify unmanaged residential traffic.","Classification identifies, marking encodes. Do not swap them."],
 ["Scheduling and queue management","Strict priority serves the top class first: great for small volumes of voice, but it can starve lower classes. Weighted fair queuing reserves relative shares and is more balanced. Deficit round robin cycles queues with a byte allowance for fairness across packet sizes.","Big unmanaged buffers absorb bursts but add delay under sustained load: bufferbloat. Active queue management signals congestion or drops early so latency stays stable, which helps interactive use even if peak throughput barely changes.","Evening household: voice, video and a backup share upstream. A small low-latency treatment for voice plus controlled queue occupancy for bulk fixes it without stopping the backup."],
 ["Traffic classes (Table 9.1)","Real-time (voice, interactive video): low delay and jitter, priority scheduling. Transactional (web, control): fast responsiveness, assured bandwidth. Bulk data (backups, transfers): throughput efficiency, best effort or weighted sharing. Background (updates): low impact, rate-limited.","Use a small number of meaningful classes mapped consistently. Each class should represent a distinct operational intention. The table is a starting framework, not a universal template.","Software updates are Background and rate-limited, not priority."],
 ["Verify and tune","A policy that looks right in a config is not proven. Measure class-specific drops, queue occupancy, latency variation and representative applications, using synthetic tests, flow telemetry and user-experience indicators.","Confirm the priority queue carries the intended traffic and that lower classes stay usable. Low total loss with bad video meetings often means misclassification or delay-sensitive traffic sharing a congested class with bulk uploads.","Too much high-priority traffic starves others and dilutes priority. Too little leaves real-time traffic exposed. The fix is to refine classification, add limits or improve queue management, not to drop priority."]
 ],
 work:[
 ["End-to-end delay (Eq 9.1)","Dproc 0.5 ms + Dqueue 12 ms + Dtrans 1.2 ms + Dprop 5 ms = <b>18.7 ms</b>. Queuing is 12 / 18.7 = <b>64%</b> of the total, so queue management is the lever. If Dprop were 80% of the total you would shorten the route instead."]
 ]}
];

/* Decoder: [term, stands for, what it plainly means] */
var DEC={
"6":[
["LPWAN","Low-Power Wide-Area Network","A network for tiny battery devices (meters, soil sensors, trackers) that must reach kilometres and last years. \"Low power\" = battery life, \"wide area\" = long range."],
["IoT","Internet of Things","Everyday devices with a sensor and a radio that report data over a network."],
["Uplink / downlink","Device to network / network to device","Uplink is the sensor reporting. Downlink is a command or acknowledgment coming back. LPWANs favour uplink."],
["Duty cycle","Fraction of time the radio is active","0.1% duty cycle = radio on for 1 ms in every second. Lower duty cycle, longer battery. Regulators may also cap it."],
["Pavg","Average power","The long-run power draw mixing sleep and active time. Battery life L = E / Pavg."],
["mAh","Milliamp-hours","Battery capacity. Divide by current in mA to get hours."],
["Payload","The useful data in a packet","The few bytes of actual reading, as opposed to headers and overhead."],
["Airtime","Time a transmission occupies the channel","Long transmissions use more energy and block others, so LPWANs keep messages short."],
["Preamble","Opening pattern of a frame","A known signal at the start of a packet so a sleeping receiver can notice it and align timing."],
["CAD","Channel Activity Detection","A very short wake-up where the receiver checks whether a packet is starting, then sleeps again if not."],
["Licensed / unlicensed spectrum","Paid-for operator frequencies / free shared frequencies","Licensed (cellular): little interference, operator control. Unlicensed (LoRaWAN, Sigfox): free to use but shared, so interference and duty-cycle rules."],
["LoRaWAN","Long Range Wide Area Network","Unlicensed LPWAN where you can install your own gateways. Limit: duty-cycle rules and interference."],
["Sigfox","Company and network name","Unlicensed LPWAN with very low energy messaging and small, fixed payloads."],
["NB-IoT","Narrowband Internet of Things","Cellular LPWAN for low-rate, fixed, delay-tolerant devices with deep coverage (a gas meter in a basement)."],
["LTE-M","LTE for Machines","Cellular LPWAN with higher rate, lower latency and mobility (a tracker on a moving vehicle)."],
["Gateway / base station","Radio attachment point","Receives weak transmissions from many devices and relays them upstream."],
["Network server","Core platform of the LPWAN","Handles device identity, removes duplicate messages, applies security and forwards to applications."],
["MQTT","Message Queuing Telemetry Transport","Lightweight publish/subscribe messaging. Devices publish to named topics, applications subscribe."],
["Broker","MQTT message hub","The server that receives published messages and forwards them to subscribers."],
["ECHONET Lite","Home-energy and appliance protocol","Treats appliances as objects with properties you can read, write or be notified about."]
],
"7":[
["Access network","Last-mile connection","Connects customers to the provider edge: fiber, cable, DSL, fixed wireless, PON."],
["Aggregation network","Metro layer","Combines traffic from many access segments and applies subscriber policy."],
["Core network","Backbone","Large-scale transport and interconnection across regions or countries."],
["Oversubscription","Selling more than the uplink can carry at once","O = N x Raccess / Ruplink. Works because users are rarely all busy together."],
["FTTH","Fiber To The Home","Fiber all the way to the customer's premises."],
["PON","Passive Optical Network","Fiber access where unpowered splitters share one feeder fiber among many homes."],
["OLT","Optical Line Terminal","Provider-side PON equipment in the central office."],
["ONT / ONU","Optical Network Terminal / Unit","The box in the customer's home that turns light into Ethernet or voice. Marks where the provider's service ends."],
["Splitter / split ratio","Passive optical divider; 1:N","1:32 shares one fiber among 32 homes. Every doubling costs about 3 dB of signal."],
["Optical budget","Allowed total signal loss","Transmitter power minus receiver sensitivity. Total losses (fiber, splices, connectors, splitter, reserve) must stay below it."],
["dB","Decibel","A ratio unit for power. Losses add up in dB, so budgets are simple addition."],
["DWDM","Dense Wavelength Division Multiplexing","Many colours of light on one fiber, multiplying capacity without new cable."],
["HFC","Hybrid Fiber-Coax","Fiber deep into the network, coaxial cable for the last stretch to homes."],
["DOCSIS","Data Over Cable Service Interface Specification","The standard for broadband over coaxial cable. The medium is shared among homes on a node."],
["DSL","Digital Subscriber Line","Broadband over old copper phone lines. Speed drops with distance."],
["APC / UPC","Angled / Ultra Physical Contact","Connector polish types. APC's angled face reflects less light and is common in PON."],
["SC / LC / ST / FC","Connector body styles","SC push-pull, LC small and dense, ST and FC older or specialised."],
["BGP","Border Gateway Protocol","The routing protocol between networks. It carries reachability and policy, not just shortest paths."],
["AS","Autonomous System","One organization's network under a single routing policy, identified by an AS number."],
["eBGP / iBGP","External / Internal BGP","eBGP between different ASes. iBGP inside one AS."],
["Route reflector","iBGP helper","Passes routes to its clients so you do not need a session between every pair of routers."],
["AS_PATH","List of ASes crossed","Used to stop loops and often to compare paths."],
["LOCAL_PREF","Local preference","A number set inside your AS. Higher is preferred, and it outranks a shorter AS_PATH."],
["MED","Multi-Exit Discriminator","A hint to a neighbour about which entry point into your AS to use."],
["NEXT_HOP","Next router toward the prefix","Ties a BGP route to a reachable forwarding path."],
["Community","Policy tag on a route","Marks routes so they can be filtered or treated in groups."],
["NLRI / prefix","Network Layer Reachability Information","The address ranges a BGP UPDATE advertises or withdraws."],
["IGP (OSPF, IS-IS)","Interior Gateway Protocol","Routing inside one AS. BGP handles between ASes."],
["MPLS","Multiprotocol Label Switching","Forwarding by short labels instead of looking up the full IP address at every router."],
["Label","Short forwarding tag","Local identifier swapped at each hop. Not an address."],
["FEC","Forwarding Equivalence Class","A group of packets that get the same MPLS treatment."],
["LER / LSR","Label Edge Router / Label Switching Router","LER pushes and pops labels at the edge. LSR swaps inside."],
["LSP","Label-Switched Path","The one-way route labeled packets follow."],
["PHP","Penultimate Hop Popping","The router before the last one removes the outer label to save the egress work."],
["VPN / VRF","Virtual Private Network / Virtual Routing and Forwarding","Separate customer networks over shared infrastructure. A VRF is one customer's routing table on a PE."],
["PE / CE / P","Provider Edge / Customer Edge / Provider router","CE is the customer router, PE the provider edge it connects to, P the core routers in between."],
["RSVP-TE","Resource Reservation Protocol - Traffic Engineering","Builds explicitly routed MPLS tunnels with reserved resources."],
["Traffic engineering","Steering traffic onto chosen paths","Uses spare capacity instead of piling everything on the shortest path."]
],
"8":[
["Demand forecast","Estimate of subscribers and traffic","The first design step. Must model the busy hour, not the daily average."],
["Busy hour","Peak-traffic period","The time many users act at once. It sizes uplinks and sets oversubscription risk."],
["Service tier","Package level","Residential, premium or business, each with different capacity, latency and support promises."],
["SLA","Service-Level Agreement","A contract promising restoration times, maintenance windows and escalation."],
["MTBF","Mean Time Between Failures","Average working time between breakdowns. Higher is better."],
["MTTR","Mean Time To Repair","Average time to restore service. Lower is better."],
["Availability","Fraction of time the service works","A = MTBF / (MTBF + MTTR). 99.9% is about 8.8 hours of downtime a year."],
["Tree / star / ring / mesh","Topology shapes","Tree: cheap, big failure domain. Ring and dual-homed: cost more but survive a cut. Mesh: most paths."],
["Failure domain","Everything hurt by one fault","A cut feeder in a tree takes down all its branches."],
["Dual-homing","Connected to two upstream points","If one link or node fails, traffic uses the other."],
["Physical / logical topology","Cables and ducts / services and policy","One fiber can carry several logical services (VLANs, tunnels, VRFs)."],
["VLAN","Virtual LAN","A logical separation of traffic on shared switches."],
["CAPEX / OPEX","Capital / Operational expenditure","CAPEX is the build (civil works, fiber, gear). OPEX is running it (crews, leases, energy, support)."],
["Phased rollout","Build in stages","Dense or strategic areas first, for lower initial cost and early revenue."],
["Technical debt","Cost of quick temporary choices","An interim design that makes later upgrades harder."],
["Stranded capital","Money in unused assets","What over-forecasting leaves you with."],
["CPE","Customer-Premises Equipment","The gateway, ONT or router at the customer's home or office."],
["Operational readiness","Able to run it day to day","Inventory, monitoring, field procedures, spares and documentation."]
],
"9":[
["QoS","Quality of Service","Making a shared network give each type of application the performance it needs."],
["Delay (latency)","Time to cross the network","Matters most for voice, video and games."],
["Jitter","Variation in delay","Packets arriving at uneven intervals. Causes glitches in calls even when average delay is fine."],
["Packet loss","Packets that never arrive","Causes retransmission, and TCP slows down after loss."],
["Throughput","Data actually delivered per second","Effective rate under real conditions, not the advertised peak."],
["Dproc","Processing delay","Time a device spends deciding where to forward a packet."],
["Dqueue","Queuing delay","Time spent waiting behind other packets. Grows during congestion and is the most controllable term."],
["Dtrans","Transmission (serialization) delay","Time to push the packet onto the link. Depends on link rate."],
["Dprop","Propagation delay","Time for the signal to travel the distance. Fixed by route length."],
["Best effort","No special treatment","All traffic treated alike, first come first served."],
["Classification","Identifying what a packet is","By application, subscriber policy or contract, so it gets the right treatment."],
["Marking","Tagging the treatment","Writing the intended handling into a packet field for downstream devices to enforce."],
["Trust boundary","Where markings are accepted or rewritten","Stops subscribers from marking everything high priority."],
["Scheduling","Choosing which queued packet goes next","Done when several classes wait for the same output link."],
["Strict priority","Highest class always first","Great for small voice volumes, but can starve lower classes."],
["WFQ","Weighted Fair Queuing","Each class gets a guaranteed share of the link."],
["DRR","Deficit Round Robin","Cycles through queues with a byte allowance so sharing stays fair across packet sizes."],
["AQM","Active Queue Management","Signals congestion or drops packets early so queues stay short and latency stable."],
["Bufferbloat","Oversized buffers adding delay","Big unmanaged buffers absorb bursts but make everything wait."],
["Shaping / policing","Smoothing / limiting traffic rate","Shaping delays excess traffic. Policing drops or remarks it."],
["Synthetic test / telemetry","Probe traffic / collected statistics","Used to verify a policy works under load: per-class drops, queue occupancy, latency variation."]
]
};

var css=document.createElement("style");css.textContent='\
#finRead .dec{margin-top:12px;border:1px solid var(--line2);border-radius:9px;background:var(--panel);overflow:hidden}\
#finRead .dec>summary{cursor:pointer;padding:10px 13px;font:700 11px var(--mono);letter-spacing:1px;text-transform:uppercase;color:var(--gr)}\
#finRead .dec table{margin:0}#finRead .dec td:first-child{white-space:nowrap;font:700 12.5px var(--mono);color:var(--cy)}\
#finRead .dec td:nth-child(2){color:var(--dim);font-size:13px}\
#finRead .decf{width:100%;margin-top:10px}\
#finRead details.rc{border:1px solid var(--line);border-radius:10px;background:var(--panel2);margin-top:10px}\
#finRead details.rc>summary{cursor:pointer;list-style:none;padding:12px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-weight:700}\
#finRead details.rc>summary::-webkit-details-marker{display:none}\
#finRead details.rc>summary::before{content:"▸";color:var(--faint);font-size:13px}\
#finRead details.rc[open]>summary::before{content:"▾"}\
#finRead .rcb{padding:2px 16px 16px}\
#finRead .rone{font-size:15px;font-weight:600;border-left:2px solid var(--cy);background:var(--panel);padding:10px 12px;border-radius:0 8px 8px 0;margin-top:6px}\
#finRead .ri{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}\
#finRead .ri h5{font-size:15px;font-weight:700;margin-bottom:6px}\
#finRead .ri p{font-size:14px;margin-top:5px}\
#finRead .ri .lb{font:700 10px var(--mono);letter-spacing:1px;text-transform:uppercase;margin-right:6px;padding:2px 6px;border-radius:4px;border:1px solid var(--line2);color:var(--faint)}\
#finRead .ri .lb.w{color:var(--cy);border-color:var(--cy)}#finRead .ri .lb.t{color:var(--am);border-color:var(--am)}\
#finRead .rw{margin-top:14px;border:1px solid var(--line2);border-radius:9px;background:var(--panel);padding:11px 13px;font-size:13.5px}\
#finRead .rw b.h{display:block;font:700 11px var(--mono);letter-spacing:1px;text-transform:uppercase;color:var(--gr);margin-bottom:5px}\
#finRead .rdone{margin-left:auto;font:600 12px var(--mono);color:var(--dim);font-weight:600;display:flex;align-items:center;gap:6px}\
#finRead .plan td:first-child{white-space:nowrap}';
document.head.appendChild(css);

function readSet(){return store.get("finalRead",[])}
var h='<div class="ph"><span class="badge vi">READ</span><h2>Final prep reading</h2><span class="badge vi right" id="finReadN"></span></div>'+
'<p class="sub2">Each chapter below gives the one big idea, then every key concept in three parts: <b>What it means</b> in plain words, <b>Why it matters</b>, and the <b>Exam trap</b>. Worked numbers show every step. Tick a chapter when you have read it. Every chapter starts with a <b>decoder</b> that spells out each acronym and term.</p>'+
'<input class="fld decf" id="finDecF" placeholder="Look up any term or acronym (LPWAN, CAD, MED, jitter...)">';
CH.forEach(function(c,ci){
  h+='<details class="rc"'+(ci===0?' open':'')+' data-ch="'+c.t+'"><summary><span class="badge '+c.color+'">CH'+c.t+'</span>'+c.name+
     '<label class="rdone" onclick="event.stopPropagation()"><input type="checkbox" data-rd="'+c.t+'"> read</label></summary><div class="rcb">'+
     '<div class="rone">'+c.one+'</div>'+
     '<details class="dec" open><summary>Decoder: what the words actually mean ('+DEC[c.t].length+' terms)</summary><div class="tscroll"><table>'+
     '<tr><th>Term</th><th>Stands for</th><th>In plain words</th></tr>'+
     DEC[c.t].map(function(r){return '<tr><td>'+r[0]+'</td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>'}).join("")+
     '</table></div></details>';
  c.items.forEach(function(it){
    h+='<div class="ri"><h5>'+it[0]+'</h5><p><span class="lb w">What it means</span>'+it[1]+'</p>'+
       (it[2]?'<p><span class="lb">Why it matters</span>'+it[2]+'</p>':'')+
       (it[3]?'<p><span class="lb t">Exam trap</span>'+it[3]+'</p>':'')+'</div>';
  });
  c.work.forEach(function(w){h+='<div class="rw"><b class="h">Worked: '+w[0]+'</b>'+w[1]+'</div>'});
  h+='</div></details>';
});

h+='<h4>Last 24 hours: suggested plan</h4><div class="tscroll"><table class="plan">'+
'<tr><th>When</th><th>Do this</th><th>Why</th></tr>'+
'<tr><td class="mono">Wed day</td><td>Read this section once through. Then CH6 and CH7 decks to the end, reading each explanation.</td><td>Chapters 6 and 7 hold the most distinct vocabulary (LPWAN options, BGP, MPLS, PON).</td></tr>'+
'<tr><td class="mono">Wed evening</td><td>CH8 and CH9 decks. Run the six calculators until each answer feels obvious.</td><td>The calculation questions are few but easy marks.</td></tr>'+
'<tr><td class="mono">Wed night</td><td>Sit Mock 1 under the timer, then drill MISSED. Stop at a sensible hour.</td><td>Review turns misses into the traps listed above. Sleep beats a fourth mock.</td></tr>'+
'<tr><td class="mono">Thu morning</td><td>Skim the contrasts table and the formula sheet. Drill MISSED again. No new material.</td><td>Recall of contrasts is what a closed-book MCQ paper tests.</td></tr>'+
'<tr><td class="mono">Thu 12:00</td><td>Room 2-307. Bring a calculator. Answer easy items first, flag calculations, keep 15 minutes to review.</td><td>60 questions in 180 minutes is 3 minutes each.</td></tr>'+
'</table></div>';

var p=document.createElement("div");p.className="panel pv";p.id="finRead";p.innerHTML=h;
anchor.parentNode.insertBefore(p,anchor);

document.getElementById("finDecF").addEventListener("input",function(e){
  var q=e.target.value.trim().toLowerCase();
  p.querySelectorAll("details.rc").forEach(function(rc){
    var hits=0;
    rc.querySelectorAll(".dec tr").forEach(function(tr,i){
      if(i===0)return;
      var show=!q||tr.textContent.toLowerCase().indexOf(q)>-1;
      tr.style.display=show?"":"none";if(show)hits++;
    });
    if(q){rc.open=hits>0;rc.style.display=hits>0?"":"none";var d=rc.querySelector(".dec");if(d)d.open=true}
    else rc.style.display="";
  });
});
function sync(){
  var s=readSet();
  p.querySelectorAll("[data-rd]").forEach(function(c){c.checked=s.indexOf(c.dataset.rd)>-1});
  document.getElementById("finReadN").textContent=s.length+" / "+CH.length+" READ";
}
p.addEventListener("change",function(e){
  var c=e.target.closest("[data-rd]");if(!c)return;
  var s=readSet(),i=s.indexOf(c.dataset.rd);
  if(c.checked&&i<0)s.push(c.dataset.rd);if(!c.checked&&i>-1)s.splice(i,1);
  store.set("finalRead",s);sync();
});
sync();
})();
