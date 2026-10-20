# WNET — Wireless Networks Study Console

Offline, single-file study console for **Wireless & Broadband Computer Networks** at Chiang Mai University (chapters 1 to 9) with a final-exam prep tab for chapters 6 to 9.

**→ [Live](https://zann208.github.io/wnet/)** · part of [my semester consoles](https://zann208.github.io/study)

One HTML file. No framework, no build step, no dependencies, no network calls.

## What's inside

| Section | What it does |
|---|---|
| **Map** | All nine chapters on one page so you can see how the pieces fit together |
| **Chapters** | 30 sections rewritten in plain words — short form and long form for each idea |
| **RF Lab** | Live calculators for the core equations (link budget, Shannon, roaming, risk, LPWAN battery life, oversubscription, PON optical budget, availability), plus IV-collision and classification drills |
| **Drills** | 258 flashcards across all nine chapters and a 239-question bank for the mock exams |
| **Final** | Final-exam prep for chapters 6 to 9: exam details and live countdown, readiness by chapter, formula calculators, high-yield contrasts, and three timed 60-question mocks with review |
| **Cheatsheet / Terms** | Every formula and number in one place, plus the acronym glossary |

Covers layers and frame formats, APs and controllers, coverage margin and cell sizing, the IEEE/IETF/ITU standards and Wi-Fi generations, scanning/authentication/association and roaming, requirements, link budget, capacity, channel reuse and validation, then the threat landscape, WEP/WPA2/WPA3 and EAP, segmentation, monitoring and incident response.

Chapters 6 to 9 add LPWAN design (duty cycling, preamble and CAD, LoRaWAN, Sigfox, NB-IoT, LTE-M, scalability), broadband architecture (access, aggregation and core, oversubscription, BGP, MPLS, FTTH/PON optical budgets, hybrids) broadband design (forecasting, SLAs, topology, availability, phased rollout, operational readiness) and chapter 9, QoS of broadband networks (delay, jitter, loss, throughput, classification and marking, scheduling and queue management, verification and policy trade-offs).

## Tech

Vanilla HTML · CSS custom properties for theming · plain JavaScript · localStorage for progress. Light and dark themes, full keyboard navigation, works offline.

```bash
git clone https://github.com/Zann208/wnet.git && open wnet/index.html
```

## Note on content

The explanations are my own restatement of the course material, written for comprehension. Lecture handouts and figures belong to the course instructor and are not redistributed here.

---
[Study Console](https://zann208.github.io/study/)
