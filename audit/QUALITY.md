# Peng Quality Audit

Generated: 2026-03-13
Entries scanned: **87** (English only)
Passing: **82** (94%)
Flagged: **5** entries · **10** errors · **5** warnings

---

## Flagged Entries

### Currents (流)

| Entry | Issues |
|---|---|
| [`cherry-studio`](src/currency/currents/cherry-studio.md) | 🔴 Missing abstract<br>🟡 No cross-reference links<br>🔴 Missing currencyId |
| [`dorabot`](src/currency/currents/dorabot.md) | 🔴 Missing abstract<br>🟡 No cross-reference links<br>🔴 Missing currencyId |
| [`openclaw-chinese-translation`](src/currency/currents/openclaw-chinese-translation.md) | 🔴 Missing abstract<br>🟡 No cross-reference links<br>🔴 Missing currencyId |
| [`unsloth-fine-tuning`](src/currency/currents/unsloth-fine-tuning.md) | 🔴 Missing abstract<br>🟡 No cross-reference links<br>🔴 Missing currencyId |
| [`vllm`](src/currency/currents/vllm.md) | 🔴 Missing abstract<br>🟡 No cross-reference links<br>🔴 Missing currencyId |

---

## Quality Criteria

| Check | Currents | Circuits | Practitioners |
|---|---|---|---|
| Abstract present | ≥ 80 chars | ≥ 80 chars | ≥ 80 chars |
| Body word count | ≥ 60 words | ≥ 40 words | ≥ 40 words |
| Cross-reference links | ≥ 1 | ≥ 1 | — |
| Mediation block | — | Required | — |
| Required sections | Signal, Context, Relevance | — | — |
| Stub text | Flagged | Flagged | Flagged |

🔴 Error — significant gap, enrichment recommended before promoting to Conversation cycle
🟡 Warning — minor gap, acceptable but improvable

---
*Audit by Peng (鵬). Run `node scripts/enrich.js --id {id}` to enrich flagged entries.*
