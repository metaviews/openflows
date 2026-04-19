---
layout: layouts/currency-item.njk
title: "HyperFrames: HTML-Native Video Rendering Framework"
date: 2026-04-19
currencyType: current
currencyId: hyperframes-html-video-rendering
tags: [currency, video-rendering, html, ai-agents, open-source]
permalink: /currency/currents/hyperframes-html-video-rendering/
abstract: "Open-source framework for declarative video composition via HTML data attributes, optimized for deterministic rendering and AI agent orchestration."
---

HyperFrames is a video rendering engine that treats media composition as standard HTML structures. Instead of proprietary domain-specific languages or GUI-based timelines, compositions are defined using DOM elements annotated with data attributes for timing, layering, and asset sourcing. The framework relies on Node.js (>=22) and FFmpeg to convert these declarative HTML states into deterministic MP4 outputs.

The architecture prioritizes programmatic control. By exposing the rendering pipeline through a CLI and a browser-based preview server, HyperFrames enables automation in CI/CD pipelines. The "Frame Adapter" pattern allows integration with external animation runtimes such as GSAP, Lottie, or Three.js, ensuring compatibility with existing web development stacks.

Integration with AI coding agents is a core design principle. Through the "Skills" system, agents can ingest context to generate valid compositions via natural language prompts. This reduces the friction between intent and implementation, allowing models to manipulate video assets without requiring explicit knowledge of encoding parameters. The system supports slash commands in environments like Claude Code and Cursor to scaffold projects and iterate on compositions interactively.

### Linkage Check

- **Repository:** https://github.com/heygen-com/hyperframes
- **Package Manager:** https://www.npmjs.com/package/hyperframes
- **Documentation:** https://hyperframes.heygen.com/introduction
- **Component Catalog:** https://hyperframes.heygen.com/catalog/blocks/data-chart
- **License:** Apache 2.0

### Mediation

mediation:
  tooling: "OpenRouter / [model]"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"