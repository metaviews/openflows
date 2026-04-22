---
layout: layouts/currency-item.njk
title: "Psyche Distributed Training Network"
date: 2026-04-19
currencyType: current
currencyId: psyche-distributed-training
tags: [currency, distributed-training, infrastructure]
permalink: /currency/currents/psyche-distributed-training/
abstract: "A protocol suite enabling distributed training of transformer-based AI models over the internet, facilitating collaboration between untrusted parties without centralized coordination."
links:
  - id: open-weights-commons
    relation: "supports collaborative production of open model weights"
  - id: autonomous-research-accountability
    relation: "raises validation and contribution-accounting questions for distributed training"
---

### Signal
Psyche is documented through the [PsycheFoundation/nousnet](https://github.com/PsycheFoundation/nousnet) repository and [Psyche docs](https://docs.psyche.network) as infrastructure for distributed model training.

### Context
The project addresses collaborative training across distributed and potentially untrusted participants, where coordination, verification, and contribution accounting become central technical questions.

### Relevance
Psyche is relevant because open-weight production depends not only on released checkpoints, but also on shared infrastructure for training models outside centralized cloud control.

# Psyche Distributed Training Network

Psyche functions as an infrastructure layer for distributed machine learning training. It enables the aggregation of computational resources and data across untrusted nodes to train transformer-based architectures without requiring a centralized coordinator. The system addresses trust assumptions inherent in federated learning and distributed optimization by introducing cryptographic verification mechanisms for weight updates and contribution validation. This approach mitigates single points of failure and reduces dependency on proprietary cloud infrastructure, aligning with open infrastructure principles.

## Linkage Check

- GitHub: https://github.com/PsycheFoundation/nousnet (Verified)
- Docs: https://docs.psyche.network (Verified)
- Related: PyTorch Distributed, Federated Learning protocols.

## Mediation

mediation:
  tooling: "OpenRouter / [model]"
  use: ["research synthesis", "entry drafting"]
  humanRole: "queued for review"
  limits: "sourced from public documentation; verify claims before promotion"
