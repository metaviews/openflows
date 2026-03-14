# Peng Proposal Queue

Generated: 2026-03-12
Pending: **5** drafts — 5 English · 0 Chinese

To promote an entry:
1. Move from `drafts/{id}.md` → `src/currency/{type}/{id}.md`
2. Run `node scripts/translate.js --id {id}` to produce the Chinese draft
3. Review `drafts/zh/{id}.md`, then move to `src/currency/zh/{type}/{id}.md`

## Currents (流)

Promote to: `src/currency/currents/`

| ID | Title | Drafted | Lang |
|---|---|---|---|
| unsloth-fine-tuning | Unsloth Fine-Tuning Framework | 2026-03-12 | en |
| dorabot | Dorabot | 2026-03-12 | en |
| cherry-studio | Cherry Studio | 2026-03-12 | en |
| vllm | vllm | 2026-03-12 | en |
| openclaw-chinese-translation | OpenClaw Chinese Translation | 2026-03-12 | en |

**Abstracts:**

- **unsloth-fine-tuning** (en): Unsloth provides an optimized inference and fine-tuning library for large language models, reducing VRAM consumption and training time through kernel-level optimizations and quantization support.
- **dorabot** (en): A macOS application providing a persistent IDE workspace for autonomous agents with integrated memory, scheduling, and communication channel automation.
- **cherry-studio** (en): A unified desktop interface for LLM access and autonomous agent execution that aggregates 300+ assistants and integrates with open agent frameworks.
- **vllm** (en): A high-throughput, memory-efficient inference and serving engine for large language models that utilizes PagedAttention and continuous batching to optimize GPU utilization across diverse hardware architectures.
- **openclaw-chinese-translation** (en): A localized fork of the OpenClaw agent framework providing full Chinese interface support, automated synchronization with upstream, and multi-platform deployment for Chinese-speaking users.

