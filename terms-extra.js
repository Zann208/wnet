"use strict";
(function(){
if(window.__wnTermsExtraLoaded)return;window.__wnTermsExtraLoaded=true;
var table=document.getElementById("acroT");if(!table)return;

var rows=[
 ["HT","High Throughput","802.11 term introduced with 802.11n for high-throughput features. In the MAC header, the optional HT Control field adds 4 bytes and carries extra control information used by HT-capable devices."],
 ["HT Control","High Throughput Control field","Optional 4-byte 802.11 MAC-header field used for high-throughput control/signalling. Header arithmetic: basic 24 B + QoS 2 B + Address 4 6 B + HT Control 4 B when present."],
 ["QoS Control","Quality of Service Control field","Optional 2-byte MAC-header field used in QoS data frames to carry traffic-priority/control information. It is why a basic 24-byte header becomes 26 bytes when QoS is present."],
 ["Address 4","Fourth MAC address field","Optional 6-byte address field used when both To DS and From DS are set, such as wireless distribution/bridging. Adding it changes a 24-byte header to 30 bytes before other optional fields."],
 ["WDS","Wireless Distribution System","802.11 arrangement that links APs over wireless rather than only through wired backhaul. Frames may need a fourth MAC address because both the radio-hop and original source/destination roles must be represented."],
 ["RU","Resource Unit","A scheduled group of OFDMA subcarriers assigned to a user. In 802.11ax, several users can receive different RUs inside the same channel at the same time."],
 ["EDCA","Enhanced Distributed Channel Access","802.11 QoS channel-access method that gives different traffic categories different contention parameters so voice/video can get faster access than background traffic."],
 ["ACK","Acknowledgment","Short control frame confirming that a unicast frame was received correctly. ACKs improve reliability but consume airtime, so they are part of the gap between PHY rate and real throughput."],
 ["MCS","Modulation and Coding Scheme","Index that represents the modulation, coding rate, spatial-stream conditions and resulting PHY rate a Wi-Fi link uses. Better signal allows a higher MCS; weaker signal forces a more robust lower MCS."],
 ["NSS","Number of Spatial Streams","How many independent spatial data streams are used by a MIMO link. More usable spatial streams can increase PHY rate when both AP and client support them."],
 ["A-MSDU","Aggregated MAC Service Data Unit","Aggregation method that combines multiple MSDUs inside one MPDU so several payloads share some MAC overhead."],
 ["A-MPDU","Aggregated MAC Protocol Data Unit","Aggregation method that combines multiple MPDUs into one larger transmission, reducing repeated contention and PHY overhead while retaining per-MPDU framing."],
 ["To DS / From DS","To Distribution System / From Distribution System","Two 802.11 frame-control bits that describe whether a frame is travelling toward or away from the distribution system. Their combination changes how the MAC address fields are interpreted."],
 ["R","Data Rate","In spectral efficiency η = R / B, R is the achieved data rate. Example: R = 600 Mb/s."],
 ["B","Bandwidth","In η = R / B or Shannon C = B·log₂(1+SNR), B is occupied channel bandwidth. Example: B = 80 MHz."],
 ["Pr","Received Power","Power arriving at the receiver, usually in dBm. In the link budget: Pr = Pt + Gt + Gr − Lp − Lm."],
 ["Pt","Transmit Power","Radio power launched by the transmitter, usually expressed in dBm and added in the link-budget calculation."],
 ["Gt / Gr","Transmit / Receive Antenna Gain","Antenna gains at the transmitter and receiver, expressed in dBi. Both add to the link budget."],
 ["Lp","Path Loss","Signal loss caused mainly by propagation distance and the environment. It is subtracted in the link budget."],
 ["Lm","Miscellaneous Loss / Margin","Additional loss allowance in a link budget, such as walls, body loss, cable loss or design/fade margin. It is subtracted from the received-power budget."],
 ["Pmin","Minimum Required Received Power","Lowest received power at which the chosen application/service is expected to work acceptably. Coverage margin is M = Pr − Pmin."],
 ["Tscan / Tauth / Tassoc / Tip","Scan / Authentication / Association / IP setup time","The four timing terms in Tsetup = Tscan + Tauth + Tassoc + Tip. Adding them gives total connection or roaming setup delay."],
 ["TLS","Transport Layer Security","Protocol that provides encrypted and authenticated transport for higher-layer applications. Examples in this course include RadSec, secure MQTT and the protected tunnel used by PEAP/EAP-TTLS."],
 ["DNS","Domain Name System","Maps domain names to IP addresses. DHCP commonly tells a client which DNS server to use after it joins the network."],
 ["TCP / UDP","Transmission Control Protocol / User Datagram Protocol","Two transport-layer protocols. TCP provides reliable ordered delivery; UDP is connectionless and lightweight. PANA carries EAP over UDP."],
 ["IPv4 / IPv6","Internet Protocol version 4 / version 6","Network-layer protocols used for addressing and routing. IPv4 uses ARP for local address resolution; IPv6 uses NDP instead."],
 ["ICMPv6","Internet Control Message Protocol version 6","Control protocol used by IPv6 for functions including Neighbor Discovery messages."],
 ["PHY rate","Physical-layer data rate","Raw radio transmission rate selected by the modulation/coding/spatial-stream configuration. It is higher than real application throughput because headers, contention, ACKs and retransmissions consume airtime."],
 ["Air time","Radio medium occupancy time","The amount of time a transmission occupies the shared wireless channel. Wi-Fi performance is often limited by airtime usage rather than headline bitrate."],
 ["Spatial reuse","Reuse of the same spectrum in separated cells","Design principle where geographically separated cells reuse the same channel/frequency while keeping interference acceptable, increasing total system capacity."],
 ["Local breakout","Local routing of client traffic","Mobility design where traffic exits near the access network instead of passing through a central anchor. It improves path efficiency but can make session continuity harder across routed boundaries."],
 ["Anchor","Mobility anchor","Central point that preserves session or addressing continuity while a client moves between routed areas. It simplifies continuity but can lengthen traffic paths."],
 ["Supplicant","802.1X client role","Client device that requests network access and runs the EAP method in an 802.1X authentication exchange."],
 ["Authenticator","802.1X network-access role","AP or switch that controls access to the network and relays EAP between the supplicant and the authentication server."],
 ["Authentication Server","Backend identity server","Server, commonly RADIUS, that checks the user's/device's credentials and returns an authentication/authorization result."],
 ["Replay counter","Monotonic anti-replay counter","Counter value used to detect and reject old/replayed protected messages, including key-handshake messages."],
 ["PMF","Protected Management Frames","802.11 protection for selected management frames, reducing spoofing/disruption attacks such as forged deauthentication or disassociation frames."],
 ["MLO","Multi-Link Operation","Wi-Fi 7 feature allowing a device to use or coordinate multiple links/bands as part of one connection, improving throughput, resilience and latency flexibility."],
 ["5G NR","5G New Radio","3GPP radio-access technology for 5G cellular networks, designed for high capacity, low latency and wide-area managed mobility."],
 ["LTE","Long-Term Evolution","3GPP cellular broadband technology preceding 5G NR and forming the basis for LTE-Advanced, LTE-M and related cellular services."],
 ["RFC","Request for Comments","Document series used by the IETF to publish Internet standards, protocol specifications and related technical guidance."],
 ["CBC-MAC","Cipher Block Chaining Message Authentication Code","Integrity mechanism used inside CCMP to create the MIC that detects deliberate modification of protected frames."],
 ["Counter Mode","Counter Mode encryption","AES mode used by CCMP for confidentiality. A changing counter/nonce produces a keystream-like sequence used to encrypt the payload."],
 ["MSK","Master Session Key","Key material produced by successful EAP authentication. In WPA2/WPA3-Enterprise, the PMK is derived from this result."],
 ["RadSec","RADIUS over TLS","RADIUS carried through TLS so communication between network devices and RADIUS infrastructure is protected with modern transport security."],
 ["PAC","Protected Access Credential","Credential used by EAP-FAST to establish a protected authentication tunnel without requiring the same certificate model as EAP-TLS."],
 ["COAP","Constrained Application Protocol","Lightweight REST-style application protocol for constrained IoT devices. OSCORE can protect CoAP messages end-to-end."],
 ["CBOR","Concise Binary Object Representation","Compact binary data encoding used in constrained-device protocols such as COSE and EDHOC."],
 ["COSE","CBOR Object Signing and Encryption","Security format for signing and encrypting CBOR-based data, used in constrained environments and by EDHOC."],
 ["OSCORE","Object Security for Constrained RESTful Environments","End-to-end message protection for CoAP so security can survive intermediaries such as proxies."],
 ["MITM","Man-in-the-Middle","Attack in which an adversary positions themselves between communicating parties to observe, relay or modify traffic while impersonating each side."],
 ["DoS / DDoS","Denial of Service / Distributed Denial of Service","Attacks that make a service unavailable by overwhelming resources. DDoS uses many distributed sources."],
 ["WLAN","Wireless Local Area Network","Local wireless network based on IEEE 802.11, typically built from APs, stations, SSIDs and a distribution system."],
 ["LAN","Local Area Network","Network covering a limited local area such as a home, office or campus building; Ethernet and Wi-Fi are common LAN technologies."]
];

function existingKeys(){var m={};Array.from(table.querySelectorAll("tr")).slice(1).forEach(function(r){var c=r.querySelector("td");if(c)m[c.textContent.trim().toLowerCase()]=1;});return m;}
var have=existingKeys();
rows.forEach(function(r){
  if(have[r[0].toLowerCase()])return;
  var tr=document.createElement("tr");
  tr.innerHTML='<td class="mono ok">'+r[0]+'</td><td>'+r[1]+'</td><td><span class="term-meaning">'+r[2]+'</span></td>';
  table.appendChild(tr);
});
})();
