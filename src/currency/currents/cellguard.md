---
layout: layouts/currency-item.njk
title: "CellGuard: Cellular Network Surveillance Detection"
date: 2026-04-19
currencyType: current
currencyId: cellguard
tags: [currency, mobile-security, cellular, ios, research]
permalink: /currency/currents/cellguard/
abstract: "Open-source iOS application and framework for detecting rogue base stations and analyzing cellular baseband traffic. Developed by SEEMOO Lab to expose surveillance infrastructure on mobile networks."
---

CellGuard is a security research suite developed by the SEEMOO Lab at TU Darmstadt, designed to audit cellular network security on iOS devices. It functions as a detection mechanism for rogue base stations (IMSI catchers/stingrays) by monitoring baseband communication protocols. The project bridges the gap between opaque cellular infrastructure and end-user visibility, allowing security researchers and privacy-conscious users to identify unauthorized network equipment attempting to intercept or manipulate mobile traffic.

Technical implementation relies on a combination of native and system-level components. The core iOS application is written in Swift, augmented by a Rust extension for high-performance packet handling. A system tweak (`CapturePacketsTweak`) intercepts binary QMI (Qualcomm Mobile Interface) and ARI packets at the baseband level, which are then processed by a daemon (`RotateKeysDaemon`) to manage inter-process communication tokens. Analysis of exported datasets is facilitated via Python scripts (`AnalyzeCells`). The project leverages the Apple Cell Location Database to correlate observed cell IDs with known infrastructure, enhancing the accuracy of rogue station identification.

### Linkage Check

*   **BaseTrace:** CellGuard utilizes the underlying BaseTrace framework for iOS baseband interface exploration.
*   **SEEMOO Lab:** Primary maintainer; associated with broader research into mobile network security and privacy.
*   **Publication:** "Catch You Cause I Can: Busting Rogue Base Stations using CellGuard and the Apple Cell Location Database" (2024).
*   **Ecosystem:** Part of the open-source mobile security toolkiting landscape, complementary to tools like NetGuard or Wireshark for cellular traffic.

### Mediation

```yaml
mediation:
  tooling: "OpenRouter / [model]"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"