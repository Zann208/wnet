"use strict";
(function(){
if(window.__wnTermsUpgradeLoaded)return;window.__wnTermsUpgradeLoaded=true;
var sec=document.getElementById("terms"),table=document.getElementById("acroT");
if(!sec||!table)return;

var title=sec.querySelector("h1");
if(title)title.innerHTML='<span class="pre">// GLOSSARY</span>Short form → full form → practical meaning';
var lede=sec.querySelector(".lede");
if(lede)lede.textContent="Compact definitions for the five chapters. Full forms are written explicitly, with an exam-use note only where the distinction matters.";

var st=document.createElement("style");
st.textContent='\
#acroT td{line-height:1.42}\
#acroT td:nth-child(2){color:var(--ink)}\
.term-meaning{color:var(--dim)}\
.term-note{margin-top:5px;padding-top:5px;border-top:1px dashed var(--line);font-size:11.5px;color:var(--faint);line-height:1.42}\
.term-note b{font-family:var(--mono);font-size:9.5px;letter-spacing:.7px;text-transform:uppercase;color:var(--am);margin-right:4px}\
.term-label{display:inline-block;margin-left:5px;font-family:var(--mono);font-size:8.5px;letter-spacing:.6px;text-transform:uppercase;color:var(--cy);border:1px solid color-mix(in srgb,var(--cy) 45%,var(--line));border-radius:4px;padding:1px 4px;vertical-align:1px}\
@media(max-width:700px){#acroT th:nth-child(2){min-width:220px}#acroT th:nth-child(3){min-width:310px}}';
document.head.appendChild(st);

var U={
"AP":{f:"Access Point",m:"A wireless infrastructure device that provides radio access to a WLAN and bridges or tunnels client traffic onward.",n:"AP is the infrastructure device; STA is the client."},
"STA":{f:"Station",m:"Any 802.11 client device participating in the WLAN, such as a laptop, phone, or sensor.",n:"In frame diagrams, STA means the client side, not the AP."},
"SSID":{f:"Service Set Identifier",m:"The human-readable WLAN name advertised to users, such as CMU-WiFi.",n:"SSID = network name. BSSID = MAC address of one AP radio."},
"BSS":{f:"Basic Service Set",m:"One AP radio together with the stations associated to it.",n:"One BSS normally maps to one BSSID."},
"BSSID":{f:"Basic Service Set Identifier",m:"The MAC address that identifies one specific AP radio / BSS.",n:"Many BSSIDs can advertise the same SSID across a campus."},
"ESS":{f:"Extended Service Set",m:"Multiple BSSs joined by a distribution system and presented as one logical WLAN, usually with one SSID.",n:"ESS is the structure that allows roaming between APs."},
"DS":{f:"Distribution System",m:"The infrastructure that interconnects APs and carries traffic between wireless cells and the rest of the network.",n:"The 802.11 To DS / From DS bits describe frame direction relative to this system."},
"MAC":{f:"Medium Access Control",m:"The data-link sublayer that controls frame addressing and access to the shared radio medium.",n:"Do not confuse the MAC sublayer with a MAC address; context decides which meaning is intended."},
"PHY":{f:"Physical Layer",m:"The radio layer: channels, spectrum, modulation, coding, antennas, transmit power, and received signal.",n:"PHY rate is not the same as delivered application throughput."},
"FCS":{f:"Frame Check Sequence",m:"A CRC value in the frame trailer used to detect accidental corruption during transmission.",n:"FCS detects errors; it is not cryptographic integrity protection."},
"MSDU / MPDU":{f:"MAC Service Data Unit / MAC Protocol Data Unit",m:"MSDU is the higher-layer payload handed to the MAC; MPDU is the actual MAC frame transmitted over the link.",n:"Aggregation may combine multiple MSDUs or MPDUs to reduce overhead."},
"LLC / SNAP":{f:"Logical Link Control / Subnetwork Access Protocol",m:"Encapsulation above the 802.11 MAC that identifies which higher-layer protocol is carried in the payload.",n:"Think of it as the bridge between the 802 link layer and protocols such as IPv4 or IPv6."},
"ARP":{f:"Address Resolution Protocol",m:"Maps an IPv4 next-hop address to a local MAC address so an Ethernet / Wi-Fi frame can be sent.",n:"ARP is IPv4. IPv6 uses NDP instead."},
"NDP":{f:"Neighbor Discovery Protocol",m:"IPv6 neighbor and router discovery carried with ICMPv6; it performs roles that ARP performs in IPv4.",n:"Remember: NDP = IPv6 neighbor discovery."},
"DHCP":{f:"Dynamic Host Configuration Protocol",m:"Automatically provides IP configuration such as address, prefix / mask, default gateway, and DNS information.",n:"Association to Wi-Fi does not guarantee service until IP configuration also succeeds."},
"VLAN":{f:"Virtual Local Area Network",m:"A logical Layer-2 broadcast domain used to separate users, services, or security zones on shared infrastructure.",n:"During roaming, the client may need to remain in the same VLAN to preserve IP continuity."},
"CAPWAP":{f:"Control And Provisioning of Wireless Access Points",m:"Protocol between a lightweight AP and WLAN controller for configuration, status, keepalives, radio measurements, and optionally tunneled user data.",n:"Control is central; user data may still be locally switched."},
"RRM":{f:"Radio Resource Management",m:"Automated WLAN control that adjusts channel assignment, transmit power, and sometimes load balancing using measured radio conditions.",n:"Aggressive changes can destabilize a WLAN, so real RRM uses thresholds and hysteresis."},
"FAT / FIT AP":{f:"Fat Access Point / Fit Access Point",m:"Fat AP = autonomous AP with control and management functions running locally. Fit AP = lightweight AP whose configuration and policy are coordinated by a WLAN controller.",n:"FAT and FIT are industry labels, not initialisms that expand into separate words. FAT ≈ autonomous; FIT ≈ controller-managed."},
"PoE / PSE / PD":{f:"Power over Ethernet / Power Sourcing Equipment / Powered Device",m:"PoE carries electrical power over Ethernet cabling. The PSE supplies the power; the PD receives it.",n:"For an AP: the switch or injector is the PSE, and the AP is the PD."},
"802.3af / at / bt":{f:"IEEE 802.3af PoE / 802.3at PoE+ / 802.3bt PoE++",m:"Successive Ethernet power standards that provide increasing power budgets to devices such as modern APs.",n:"Too little PoE can make an AP disable radios, spatial streams, or other features."},
"RSSI":{f:"Received Signal Strength Indicator",m:"Measurement of received radio signal strength, commonly displayed in dBm on Wi-Fi systems.",n:"A less-negative value is stronger: −55 dBm is stronger than −75 dBm."},
"SNR":{f:"Signal-to-Noise Ratio",m:"Difference between received signal level and the background noise level, expressed in dB.",n:"RSSI says how strong the signal is; SNR says how clearly it stands above noise."},
"dBm / dBi":{f:"Decibels relative to 1 milliwatt / Decibels relative to an isotropic radiator",m:"dBm is an absolute power level; dBi expresses antenna gain relative to an ideal isotropic antenna.",n:"Link budgets add gains and subtract losses, but dBm and dBi describe different quantities."},
"MIMO / MU-MIMO":{f:"Multiple-Input Multiple-Output / Multi-User Multiple-Input Multiple-Output",m:"MIMO uses multiple antennas / spatial streams. MU-MIMO allows an AP to serve multiple clients simultaneously with separate spatial streams.",n:"MIMO improves spatial use; MU-MIMO extends that idea across multiple users."},
"OFDM / OFDMA":{f:"Orthogonal Frequency-Division Multiplexing / Orthogonal Frequency-Division Multiple Access",m:"OFDM divides a channel into many orthogonal subcarriers. OFDMA divides those subcarriers into resource units that can be assigned to different users.",n:"OFDM = one transmission uses the subcarriers; OFDMA = multiple users can share them in scheduled resource units."},
"QoS":{f:"Quality of Service",m:"Traffic classification and prioritization used to give delay-sensitive applications such as voice and video preferential treatment.",n:"QoS changes priority and access behavior; it does not create extra radio capacity."},
"DFS":{f:"Dynamic Frequency Selection",m:"A 5 GHz mechanism that requires Wi-Fi devices to detect protected radar activity and vacate affected channels.",n:"DFS channels offer more spectrum but may force channel changes when radar is detected."},
"802.11k / v / r":{f:"802.11k Radio Resource Measurement / 802.11v Wireless Network Management / 802.11r Fast BSS Transition",m:"k provides neighbor / measurement information; v lets the network suggest better APs; r reduces authentication work during roaming.",n:"k = know neighbors · v = advise movement · r = reduce reauthentication time."},
"PMK / OKC":{f:"Pairwise Master Key / Opportunistic Key Caching",m:"PMK is master key material used to derive session keys. OKC reuses suitable cached key material across APs to shorten roaming authentication.",n:"PMK is a key foundation; OKC is a roaming optimization."},
"WPA2 / WPA3":{f:"Wi-Fi Protected Access 2 / Wi-Fi Protected Access 3",m:"Successive Wi-Fi security generations. WPA2 commonly uses AES-CCMP; WPA3 strengthens authentication and modern security requirements.",n:"Security generation and authentication mode are separate questions: Personal and Enterprise are different deployment models."},
"PSK":{f:"Pre-Shared Key",m:"A secret configured in advance and shared by devices, commonly used in WPA2-Personal networks.",n:"Easy for small networks, but one shared secret scales poorly and provides weak per-user accountability."},
"EAP":{f:"Extensible Authentication Protocol",m:"An authentication framework that supports many methods such as EAP-TLS, PEAP, EAP-TTLS, and EAP-FAST.",n:"EAP is the framework; EAP-TLS / PEAP are specific methods inside it."},
"802.1X":{f:"IEEE 802.1X Port-Based Network Access Control",m:"Access-control framework that uses a supplicant, authenticator, and authentication server, commonly carrying EAP for enterprise WLAN login.",n:"802.1X controls access at the link; EAP carries the authentication method."},
"PANA":{f:"Protocol for Carrying Authentication for Network Access",m:"IETF protocol that transports EAP over UDP/IP for network-access authentication.",n:"802.1X carries EAP over the link; PANA carries EAP over IP."},
"PaC / PAA / EP":{f:"PANA Client / PANA Authentication Agent / Enforcement Point",m:"PaC is the client requesting access; PAA coordinates authentication; EP enforces the resulting access decision.",n:"PaC = asks · PAA = authenticates / coordinates · EP = opens or blocks traffic."},
"AAA":{f:"Authentication, Authorization, and Accounting",m:"Backend functions that verify identity, decide permitted access, and record usage / session information.",n:"Authentication = who are you? Authorization = what may you access? Accounting = what happened?"},
"IEEE":{f:"Institute of Electrical and Electronics Engineers",m:"Standards organization responsible for the IEEE 802 family, including 802.11 Wi-Fi and 802.3 Ethernet.",n:"IEEE mainly defines link / LAN technologies in this course."},
"IETF":{f:"Internet Engineering Task Force",m:"Open standards organization that develops Internet protocols and publishes specifications as RFCs.",n:"Examples in this course include PANA and many IP-layer protocols."},
"ITU":{f:"International Telecommunication Union",m:"United Nations specialized agency involved in global telecommunications coordination, including spectrum and radio recommendations.",n:"Think global telecom / spectrum coordination rather than Wi-Fi certification."},
"3GPP":{f:"3rd Generation Partnership Project",m:"Standards partnership that develops cellular technologies including LTE, LTE-Advanced, NB-IoT, LTE-M, and 5G NR.",n:"3GPP = cellular standards family, not Wi-Fi."},
"NB-IoT / LTE-M":{f:"Narrowband Internet of Things / Long-Term Evolution for Machines",m:"Low-power cellular technologies intended for IoT devices that prioritize coverage, battery life, and modest data rates.",n:"Choose them when long battery life and wide-area operator coverage matter more than high throughput."},
"LPWAN":{f:"Low-Power Wide-Area Network",m:"A class of long-range, low-data-rate networking technologies designed for power-constrained IoT devices.",n:"LPWAN describes a technology class, not one single protocol."},
"MQTT":{f:"Message Queuing Telemetry Transport",m:"Lightweight publish/subscribe application protocol widely used for IoT messaging through a broker.",n:"MQTT sits above IP networking; association and IP connectivity must already work."},
"Wi-Fi 6 / 6E / 7":{f:"Wi-Fi 6 = IEEE 802.11ax / Wi-Fi 6E = 802.11ax extended into 6 GHz / Wi-Fi 7 = IEEE 802.11be",m:"Commercial generation names for modern Wi-Fi capabilities and spectrum use.",n:"6E is not a new PHY generation; it extends Wi-Fi 6 operation into the 6 GHz band."},
"η (eta)":{f:"Spectral Efficiency",m:"How efficiently bandwidth is used: η = data rate R divided by bandwidth B, commonly expressed in bit/s/Hz.",n:"A wider channel can raise peak rate while still reducing spectral efficiency."},
"Margin (M)":{f:"Coverage Margin",m:"Headroom between received power and the minimum required level: M = Pr − Pmin.",n:"Positive margin means the signal exceeds the requirement; more margin improves resilience to fading and variation."},
"Link budget":{f:"Received-Power Budget / Link Budget",m:"Accounting method that starts with transmit power, adds antenna gains, and subtracts path and miscellaneous losses to estimate received power.",n:"Typical form: Pr = Pt + Gt + Gr − Lp − Lm."},
"Sticky client":{f:"Sticky Client",m:"A client that remains associated with a distant AP even when a better AP is available.",n:"Roaming decisions are ultimately made by the client, which is why excessive overlap can create sticky behavior."},
"Hidden node":{f:"Hidden-Node Problem",m:"Two clients can both hear the AP but cannot hear each other, so they may transmit simultaneously and collide at the AP.",n:"The problem is caused by incomplete mutual visibility, not simply weak AP signal."},
"Gratuitous ARP":{f:"Gratuitous Address Resolution Protocol announcement",m:"An unsolicited ARP message used to announce or refresh the mapping between an IPv4 address and a MAC address.",n:"Useful after movement or failover to update forwarding / neighbor state quickly."},
"Proxy ARP":{f:"Proxy Address Resolution Protocol",m:"A network device answers an ARP request on behalf of another host instead of allowing the original host to answer directly.",n:"On WLANs it can reduce broadcast airtime, but the infrastructure must maintain correct mappings."},
"WEP":{f:"Wired Equivalent Privacy",m:"Obsolete Wi-Fi security protocol based on RC4, a static shared key, a 24-bit IV, and CRC-32 integrity checking.",n:"Its short IV and weak design allow key recovery; increasing key length alone does not fix WEP."},
"RC4":{f:"Rivest Cipher 4",m:"Legacy stream cipher used by WEP to generate a keystream that is XORed with plaintext.",n:"RC4 itself is not the only WEP problem; WEP's IV and key-use design are also fundamentally weak."},
"IV":{f:"Initialization Vector",m:"Per-message / per-frame value combined with key material to ensure encryption does not reuse the same cryptographic state.",n:"An IV is normally public; uniqueness matters more than secrecy."},
"XOR":{f:"Exclusive OR",m:"Bitwise operation that outputs 1 when two input bits differ; stream ciphers combine plaintext and keystream using XOR.",n:"Applying the same keystream with XOR twice can expose relationships between plaintexts."},
"CRC-32":{f:"32-bit Cyclic Redundancy Check",m:"Checksum designed to detect accidental transmission errors, not intentional modification by an attacker.",n:"CRC = error detection. MIC / cryptographic authentication = tamper detection."},
"TKIP":{f:"Temporal Key Integrity Protocol",m:"Transitional WPA mechanism designed to improve security on legacy RC4 hardware through per-packet key mixing and additional integrity protection.",n:"TKIP is transitional / legacy; modern WLANs use AES-based protection instead."},
"AES":{f:"Advanced Encryption Standard",m:"Modern symmetric block cipher used as the cryptographic primitive underneath Wi-Fi protection modes such as CCMP.",n:"AES is the cipher; CCMP defines how AES is used to protect Wi-Fi frames."},
"CCMP":{f:"Counter Mode with Cipher Block Chaining Message Authentication Code Protocol",m:"AES-based WPA2 protection providing confidentiality, integrity / authenticity, and replay protection for wireless frames.",n:"CCMP combines counter-mode encryption with CBC-MAC authentication."},
"MIC":{f:"Message Integrity Code",m:"Cryptographic value used to verify that a protected message came from someone holding the correct key and was not modified.",n:"MIC is security integrity; FCS / CRC is only transmission-error detection."},
"PMK":{f:"Pairwise Master Key",m:"Master key material created from a PSK or enterprise EAP authentication and used as the basis for deriving session keys.",n:"PMK is not sent in plaintext over the air during the four-way handshake."},
"PTK":{f:"Pairwise Transient Key",m:"Per-session key material derived from the PMK, AP / client nonces, and MAC addresses for unicast protection.",n:"Pairwise = between one client and the AP; transient = session-specific."},
"GTK":{f:"Group Temporal Key",m:"Key used to protect broadcast and multicast traffic shared within the WLAN group.",n:"PTK protects unicast client traffic; GTK protects group traffic."},
"MSK":{f:"Master Session Key",m:"Key material produced by successful EAP authentication and used to derive or transport the PMK in enterprise Wi-Fi.",n:"EAP success can produce MSK → PMK → PTK / GTK-related session protection."},
"ANonce / SNonce":{f:"Authenticator Nonce / Supplicant Nonce",m:"Fresh random values from the AP / authenticator and client / supplicant used when deriving the PTK during the four-way handshake.",n:"A = authenticator (AP side); S = supplicant (client side)."},
"Nonce":{f:"Number Used Once",m:"A value intended to be unique for a cryptographic exchange so repeated sessions do not derive identical results.",n:"Nonce uniqueness helps prevent key / message reuse attacks."},
"WPS":{f:"Wi-Fi Protected Setup",m:"Consumer onboarding mechanism using push-button or PIN methods to simplify joining a protected WLAN.",n:"The historical PIN method introduced serious attack risk; enterprise environments generally avoid WPS."},
"RADIUS":{f:"Remote Authentication Dial-In User Service",m:"AAA protocol commonly used between an AP / controller and an enterprise authentication server.",n:"The AP / controller is usually the RADIUS client; the identity server validates credentials."},
"RadSec":{f:"RADIUS over Transport Layer Security (TLS)",m:"RADIUS transported inside TLS to provide stronger transport confidentiality and server authentication than traditional shared-secret protection alone.",n:"RadSec protects the RADIUS transport path; it is not an EAP method."},
"EAPOL":{f:"Extensible Authentication Protocol over LANs",m:"Link-layer transport used by IEEE 802.1X to carry EAP messages between a supplicant and authenticator.",n:"EAPOL operates before ordinary network access is granted."},
"EAP-TLS":{f:"Extensible Authentication Protocol – Transport Layer Security",m:"Certificate-based EAP method where both client and server authenticate with certificates.",n:"Strong security, but certificate issuance and lifecycle management create operational overhead."},
"PEAP":{f:"Protected Extensible Authentication Protocol",m:"EAP method that authenticates the server with a certificate, builds a TLS tunnel, then performs an inner authentication method such as a password exchange.",n:"If the client fails to validate the server certificate, an evil twin may capture credentials."},
"EAP-TTLS":{f:"Extensible Authentication Protocol – Tunneled Transport Layer Security",m:"Tunneled EAP method using a server certificate and allowing flexible inner authentication methods inside the protected tunnel.",n:"TTLS and PEAP are both tunneled methods; their supported inner methods differ."},
"EAP-FAST":{f:"Extensible Authentication Protocol – Flexible Authentication via Secure Tunneling",m:"Tunneled EAP method that can use a Protected Access Credential (PAC) to establish trust.",n:"Its operational concern is secure PAC provisioning and lifecycle management."},
"PAC":{f:"Protected Access Credential",m:"Credential used by EAP-FAST to help establish a protected authentication tunnel.",n:"PAC belongs to EAP-FAST; do not confuse it with PANA's PaC client role."},
"PKI / CA":{f:"Public Key Infrastructure / Certificate Authority",m:"PKI is the system for issuing, distributing, validating, renewing, and revoking certificates; the CA is the trusted entity that signs them.",n:"Certificate security depends on lifecycle management, not only on having certificates."},
"LDAP / AD":{f:"Lightweight Directory Access Protocol / Active Directory",m:"Directory technologies used to store and organize identities, groups, and policy-related account information.",n:"RADIUS may consult LDAP / AD, but they are not themselves the Wi-Fi authentication transport."},
"MDM":{f:"Mobile Device Management",m:"Administrative platform used to configure and manage endpoint devices, including Wi-Fi profiles, certificates, and trust anchors.",n:"MDM reduces user configuration mistakes in enterprise 802.1X deployments."},
"MFA":{f:"Multi-Factor Authentication",m:"Authentication requiring evidence from more than one factor category, such as password plus possession or biometric proof.",n:"Two passwords are still one factor type; true MFA uses different factor categories."},
"EDHOC":{f:"Ephemeral Diffie-Hellman Over COSE",m:"Compact authenticated key-exchange protocol designed for constrained IoT environments.",n:"EDHOC establishes keys; OSCORE can then use keys to protect constrained application messages."},
"COSE / CBOR":{f:"CBOR Object Signing and Encryption / Concise Binary Object Representation",m:"CBOR is a compact binary data format; COSE defines signing and encryption structures for CBOR-based data.",n:"They are designed to keep encoding overhead small on constrained devices."},
"OSCORE":{f:"Object Security for Constrained RESTful Environments",m:"End-to-end application-layer protection for CoAP messages, including deployments that pass through intermediaries / proxies.",n:"OSCORE protects message objects rather than only the transport hop."},
"CoAP":{f:"Constrained Application Protocol",m:"Lightweight REST-style application protocol designed for constrained IoT nodes and low-power networks.",n:"Think HTTP-like request / response semantics with lower overhead for constrained environments."},
"WIDS / WIPS":{f:"Wireless Intrusion Detection System / Wireless Intrusion Prevention System",m:"WIDS monitors and alerts on suspicious wireless activity; WIPS adds active or automated prevention / containment capabilities.",n:"Detection = observe / alert. Prevention = enforcement response."},
"SPAN":{f:"Switched Port Analyzer",m:"Switch port-mirroring feature that copies selected traffic to an analyzer or capture port.",n:"SPAN provides visibility for packet capture; it does not itself block an attack."},
"DAI":{f:"Dynamic ARP Inspection",m:"Layer-2 switch security feature that validates ARP messages against trusted bindings, commonly learned through DHCP snooping.",n:"DAI helps stop ARP spoofing; it does not replace Wi-Fi encryption."},
"Evil twin":{f:"Evil Twin Access Point",m:"Rogue AP that imitates a legitimate WLAN, often by advertising a familiar SSID, to trick clients into connecting.",n:"Server-certificate validation is critical against credential-harvesting evil twins in enterprise WLANs."},
"Blast radius":{f:"Blast Radius",m:"The scope of systems, users, or data that can be affected when one account, device, or segment is compromised.",n:"Segmentation reduces impact by limiting how far a compromise can spread."}
};

var rows=Array.from(table.querySelectorAll("tr")).slice(1);
rows.forEach(function(row){
  var cells=row.querySelectorAll("td");if(cells.length<3)return;
  var key=cells[0].textContent.trim(),u=U[key];if(!u)return;
  cells[1].textContent=u.f;
  cells[2].innerHTML='<div class="term-meaning"></div>'+(u.n?'<div class="term-note"><b>Remember</b></div>':'');
  cells[2].querySelector(".term-meaning").textContent=u.m;
  if(u.n)cells[2].querySelector(".term-note").append(document.createTextNode(u.n));
});

var fat=Array.from(table.querySelectorAll("tr")).find(function(r){var c=r.querySelector("td");return c&&c.textContent.trim()==="FAT / FIT AP"});
if(fat){var c=fat.querySelector("td");if(c)c.insertAdjacentHTML("beforeend",'<span class="term-label">labels, not acronyms</span>');}
})();
