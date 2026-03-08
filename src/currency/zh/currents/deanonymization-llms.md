---
layout: layouts/currency-item.njk
title: "大型语言模型驱动的大规模在线去匿名化"
lang: zh
date: 2026-02-24
currencyType: "current"
currencyId: deanonymization-llms
abstract: "2026 年的一项研究信号，显示基于大语言模型的流水线能够大规模地从非结构化文本中重识别伪名用户。"
tags:
  - currency
permalink: /zh/currency/currents/deanonymization-llms/
links:
  - id: pseudonymity-collapse-response
    relation: "consolidates into"
  - id: signal-org
    relation: "tightens threat assumptions around pseudonymous communication in"
mediation:
  tooling: "OpenRouter / qwen/qwen3.5-flash-02-23"
  use:
    - "翻译原始英文条目"
    - "依照音译词汇表保留双语术语"
    - "保留术语的双语对应以维持理（li）的准确性"
  humanRole: "审阅、修订并在发布前确认"
  limits: "翻译为起点；语言能力和文化判断须由人工完成"
---

信号
论文《大型语言模型驱动的大规模在线去匿名化》（Large-scale online deanonymization with LLMs）指出，基于大语言模型的流水线仅凭纯文本即可跨数据集匹配在线伪名身份，其在精确率与召回率方面的表现优于经典基线。

背景
核心转变在于方法论。早期的去匿名化方法往往依赖结构化数据和手工工程特征；本项工作直接在非结构化内容上运用模型辅助的特征提取、候选检索与验证。

相关性
对于 Openflows（开流）而言，这是一条高重要性的隐私与管治流（current）。若伪名痕迹能大规模关联，沟通安全、公民组织与平台信任模型便需要更强的默认保护。

现状
新近发布的研究信号（2026 年 2 月 18 日提交），具有直接的威胁模型意涵。

开放问题
哪些实际防御措施能在不损害可用性的前提下最大程度地减少跨平台关联能力？平台应如何更新针对依赖伪名用户的隐私指引？哪些评估标准能区分合法的身份解析与滥用的去匿名化工具？

连接
连接至 `pseudonymity-collapse-response` 作为意涵回路（implications circuit）。
连接至 `signal-org` 作为直接受影响的通信基础设施。

**译注**
此处“流”（liú）对应 Openflows 语境中的 "Current(s)"，指在生态中移动的独立信号；不同于作为类别的“流通”（lǐu tōng, Currency）。"伪名"（pseudonymous）在安全语境下特指非真实身份但可关联的标识，区别于完全不可追溯的“匿名”（anonymous），此处强调去匿名化攻击是对前者的穿透。回路（circuit -> 回路）在连接部分作为结构概念保留，指代影响闭环。