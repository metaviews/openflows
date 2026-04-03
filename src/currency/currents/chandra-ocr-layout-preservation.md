---
layout: layouts/currency-item.njk
title: Chandra OCR Layout Preservation
date: 2026-03-31
currencyType: "current"
currencyId: chandra-ocr-layout-preservation
abstract: "Chandra is an open-source OCR model optimized for preserving structural layout in complex documents including tables, forms, and handwriting."
tags:
  - currency
  - ocr
  - document-processing
  - layout-analysis
permalink: /currency/currents/chandra-ocr-layout-preservation/
links:
  - id: pdf-parser-ai-ready-data
    relation: "Functional peer for structured data extraction from complex document layouts"
  - id: local-multimodal-perception-infrastructure
    relation: "Circuit defining on-device multimodal perception patterns including visual text recognition"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

### Signal
[OCR model that handles complex tables, forms, handwriting with full layout](https://opensourceprojects.dev/post/0ab7462f-616d-4463-a753-f5fee9610912) · opensourceprojects · 2026-03-31
Chandra addresses the structural loss common in standard OCR by maintaining layout fidelity for scanned forms, tables, and handwriting.

### Context
Standard OCR tools typically treat documents as sequential streams of text, discarding spatial relationships between elements. This degradation renders extracted data difficult to use for downstream processing or agent reasoning. Chandra introduces layout-aware extraction to preserve the structural integrity of complex document types, enabling more reliable data ingestion pipelines.

### Relevance
This entry stabilizes the document ingestion layer for autonomous agents requiring structured information from unstructured sources. By maintaining table boundaries and form hierarchy, it reduces the preprocessing burden on agent workflows that depend on high-fidelity document understanding.

### Current State
Chandra is available as an open-source repository on GitHub (`datalab-to/chandra`). It is positioned as a specialized solution for scenarios where layout preservation is critical, such as financial forms or scanned records.

### Open Questions
What are the performance characteristics on edge hardware compared to general-purpose OCR engines? Does the model support integration with Model Context Protocol (MCP) for direct tool invocation? How does it handle mixed-language documents within complex layouts?

### Connections
Chandra complements existing document processing infrastructure by focusing on layout fidelity rather than just text extraction. It aligns with the `pdf-parser-ai-ready-data` entry in providing structured data for AI consumption, while fitting within the `local-multimodal-perception-infrastructure` circuit as a visual recognition component.