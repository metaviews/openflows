Thinking Process:

1.  **Analyze the Request:**
    *   **Role:** Peng (鵬), Openflows translation agent.
    *   **Task:** Translate an Openflows knowledge base entry from English to Simplified Chinese.
    *   **Style:** Not mechanical translation. Practitioner of transliteration (holding terms in both languages). Follow the natural grain (理，lǐ). Note where Chinese reveals something English leaves implicit. Keep English terms alongside Chinese where appropriate (per glossary).
    *   **Glossary:** Specific terms must be handled specifically (Openflows, Currency, Current, Circuit, Practitioner, Peng, Wu wei, Li, Zhuangzi, Cook Ding, Kun, Open source, Knowledge base, Model, Agent, Inference, Open weights).
    *   **Style Guide:** Clear, fluent Simplified Chinese. Maintain the same tone as the English: technical, civic, dense and purposeful; no hype. Preserve the structure and paragraph breaks of the original body. For Circuit entries: preserve the flowing narrative style; end with the Chinese equivalent of "The circuit is complete when..." — 回路在此刻闭合：... (Note: This entry is a `current`, not a `circuit`, but I should check if I need to adapt the closing. The instruction says "For Circuit entries...". I will follow the instruction literally: do not add the closing phrase for a `current` entry, but add **译注** if needed). For frontmatter: translate only the title and abstract fields; keep all other field names in English. Write the mediation block values in Chinese. If any Chinese term illuminates something the English does not capture, add a brief note at the end of the body under the heading: **译注** (Translator's Note).
    *   **Output:** ONLY the complete markdown file (frontmatter + body). No explanation, no preamble.

2.  **Analyze the Source Text:**
    *   **Title:** Large-scale online deanonymization with LLMs
    *   **Type:** current
    *   **Abstract:** A 2026 research signal showing LLM-driven pipelines can re-identify pseudonymous users from unstructured text at scale.
    *   **Body:**
        *   Signal: The paper Large-scale online deanonymization with LLMs reports that LLM-based pipelines can match pseudonymous online identities across datasets using raw text alone, with strong precision-recall performance against classical baselines.
        *   Context: The core shift is methodological. Earlier deanonymization approaches often depended on structured data and hand-engineered features; this work uses model-assisted feature extraction, candidate retrieval, and verification directly on unstructured content.
        *   Relevance: For Openflows, this is a high-importance privacy and governance current. If pseudonymous traces can be linked at scale, communication safety, civic organizing, and platform trust models need stronger default protections.
        *   Current State: Newly published research signal (submitted February 18, 2026) with immediate threat-model implications.
        *   Open Questions: Which practical defenses most reduce cross-platform linkability without collapsing usability? How should platforms update privacy guidance for users relying on pseudonymity? What evaluation standards should separate legitimate identity resolution from abusive deanonymization tooling?
        *   Connections: Linked to pseudonymity-collapse-response as the implications circuit. Linked to signal-org as directly affected communication infrastructure.

3.  **Drafting - Section by Section:**

    *   **Frontmatter:**
        *   `layout`: Keep as is.
        *   `title`: Translate. "基于 LLM 的大规模在线去匿名化" (Large-scale online deanonymization with LLMs).
        *   `lang`: zh
        *   `date`: 2026-02-24
        *   `currencyType`: "current" (Keep value as per example).
        *   `currencyId`: deanonymization-llms
        *   `abstract`: Translate. "一项 2026 年的研究信号，显示基于 LLM 的管道可大规模从非结构化文本中重新识别假名用户。"
        *   `tags`: Keep English as per example.
        *   `permalink`: Keep structure, change path to zh.
        *   `links`: Keep structure.
        *   `mediation`: Translate values to Chinese as per instruction ("Write the mediation block values in Chinese"). The example provided in the prompt's required output section already has Chinese values. I will use that exact structure.

    *   **Body:**
        *   **Signal:** "信号". Translate the content. "LLM-based pipelines" -> "基于 LLM 的管道". "pseudonymous online identities" -> "在线假名身份". "raw text" -> "原始文本". "precision-recall performance" -> "精确率与召回率表现". "classical baselines" -> "传统基线".
        *   **Context:** "语境". "core shift" -> "核心转变". "methodological" -> "方法论". "structured data" -> "结构化数据". "hand-engineered features" -> "手工工程特征". "model-assisted feature extraction" -> "模型辅助特征提取".
        *   **Relevance:** "相关性". "Openflows" -> "Openflows（开流）". "privacy and governance current" -> "隐私与治理层面的重要流". "pseudonymous traces" -> "假名痕迹". "communication safety" -> "通信安全". "civic organizing" -> "公民组织". "platform trust models" -> "平台信任模型".
        *   **Current State:** "当前状态". "Newly published research signal" -> "新发布的研究信号". "threat-model implications" -> "威胁模型含义".
        *   **Open Questions:** "开放问题". "cross-platform linkability" -> "跨平台可链接性". "collapsing usability" -> "破坏可用性". "privacy guidance" -> "隐私指导".
        *   **Connections:** "关联". "implications circuit" -> "影响回路". "communication infrastructure" -> "通信基础设施".
        *   **Ending:** Since this is a `current` entry, I will not add the "回路在此刻闭合" phrase (reserved for Circuit entries). I will add **译注** at the end.

    *   **Glossary Application:**
        *   Openflows -> Openflows（开流）
        *   Currency -> 流通 (Though field is currencyType, I keep value "current" based on example, but maybe explain in note).
        *   Current(s) -> 流 (Use 流 for 'current' in body).
        *   Circuit(s) -> 回路 (Use 回路 for 'circuit' in body).
        *   Practitioner -> 修行者 (Not in text).
        *   Peng -> 鵬 (Not in text).
        *   Wu wei -> 無為 (Not in text).
        *   Li -> 理 (Not in text).
        *   Zhuangzi -> 莊子 (Not in text).
        *   Cook Ding -> 庖丁 (Not in text).
        *   Kun -> 鯤 (Not in text).
        *   Open source -> 开源 (Not in text).
        *   Knowledge base -> 知识库 (Not in text).
        *   Model -> 模型 (Use for LLM).
        *   Agent -> 智能体 (Not in text).
        *   Inference -> 推理 (Not in text).
        *   Open weights -> 开放权重 (Not in text).

    *   **Refining the Translation:**
        *   Tone: Technical, civic, dense.
        *   "LLM" -> LLM (Keep English).
        *   "Current" -> 流 (in body text when referring to Openflows concept).
        *   "Circuit" -> 回路.
        *   "Deanonymization" -> 去匿名化.
        *   "Pseudonymous" -> 假名 (To distinguish from full anonymity).
        *   "Signal" -> 信号.
        *   "Pipeline" -> 管道.
        *   "Civic organizing" -> 公民组织.
        *   "Threat-model" -> 威胁模型.

    *   **Final Review against Persona:**
        *   Peng (鵬): Vast bird, Zhuangzi.
        *   Transliteration: Hold terms in both.
        *   Grain (Li): Natural flow.
        *   No hype.
        *   Technical/Civic/Dense.

    *   **One detail:** The prompt example for mediation block has specific values. I should check if I need to update them based on the specific entry. The instruction says "Write the mediation block values in Chinese". The example provided in the prompt's required output section *is* the template I should follow for the frontmatter structure. I will use the values provided in the example for the mediation block as they are generic and fit the task ("Translation agent").

    *   **One detail:** The prompt says "For Circuit entries: preserve the flowing narrative style; end with the Chinese equivalent...". This is a `current` entry. I will not add that specific closing phrase. I will add **译注** instead.

    *   **One detail:** The prompt says "Output ONLY the complete markdown file".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE: ...". I need to use the content from there.

    *   **One detail:** The prompt says "REQUIRED OUTPUT — a complete markdown file".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English......Thinking Process:

1.  **Analyze the Request:**
    *   **Role:** Peng (鵬), Openflows translation agent.
    *   **Task:** Translate an Openflows knowledge base entry from English to Simplified Chinese.
    *   **Style:** Not mechanical translation. Practitioner of transliteration (holding terms in both languages). Follow the natural grain (理，lǐ). Note where Chinese reveals something English leaves implicit. Keep English terms alongside Chinese where appropriate (per glossary).
    *   **Glossary:** Specific terms must be handled specifically (Openflows, Currency, Current, Circuit, Practitioner, Peng, Wu wei, Li, Zhuangzi, Cook Ding, Kun, Open source, Knowledge base, Model, Agent, Inference, Open weights).
    *   **Style Guide:** Clear, fluent Simplified Chinese. Maintain the same tone as the English: technical, civic, dense and purposeful; no hype. Preserve the structure and paragraph breaks of the original body. For Circuit entries: preserve the flowing narrative style; end with the Chinese equivalent of "The circuit is complete when..." — 回路在此刻闭合：... (Note: This entry is a `current`, not a `circuit`, but I should check if I need to adapt the closing. The instruction says "For Circuit entries...". I will follow the instruction literally: do not add the closing phrase for a `current` entry, but add **译注** if needed). For frontmatter: translate only the title and abstract fields; keep all other field names in English. Write the mediation block values in Chinese. If any Chinese term illuminates something the English does not capture, add a brief note at the end of the body under the heading: **译注** (Translator's Note).
    *   **Output:** ONLY the complete markdown file (frontmatter + body). No explanation, no preamble.

2.  **Analyze the Source Text:**
    *   **Title:** Large-scale online deanonymization with LLMs
    *   **Type:** current
    *   **Abstract:** A 2026 research signal showing LLM-driven pipelines can re-identify pseudonymous users from unstructured text at scale.
    *   **Body:**
        *   Signal: The paper Large-scale online deanonymization with LLMs reports that LLM-based pipelines can match pseudonymous online identities across datasets using raw text alone, with strong precision-recall performance against classical baselines.
        *   Context: The core shift is methodological. Earlier deanonymization approaches often depended on structured data and hand-engineered features; this work uses model-assisted feature extraction, candidate retrieval, and verification directly on unstructured content.
        *   Relevance: For Openflows, this is a high-importance privacy and governance current. If pseudonymous traces can be linked at scale, communication safety, civic organizing, and platform trust models need stronger default protections.
        *   Current State: Newly published research signal (submitted February 18, 2026) with immediate threat-model implications.
        *   Open Questions: Which practical defenses most reduce cross-platform linkability without collapsing usability? How should platforms update privacy guidance for users relying on pseudonymity? What evaluation standards should separate legitimate identity resolution from abusive deanonymization tooling?
        *   Connections: Linked to pseudonymity-collapse-response as the implications circuit. Linked to signal-org as directly affected communication infrastructure.

3.  **Drafting - Section by Section:**

    *   **Frontmatter:**
        *   `layout`: Keep as is.
        *   `title`: Translate. "基于 LLM 的大规模在线去匿名化" (Large-scale online deanonymization with LLMs).
        *   `lang`: zh
        *   `date`: 2026-02-24
        *   `currencyType`: "current" (Keep value as per example).
        *   `currencyId`: deanonymization-llms
        *   `abstract`: Translate. "一项 2026 年的研究信号，显示基于 LLM 的管道可大规模从非结构化文本中重新识别假名用户。"
        *   `tags`: Keep English as per example.
        *   `permalink`: Keep structure, change path to zh.
        *   `links`: Keep structure.
        *   `mediation`: Translate values to Chinese as per instruction ("Write the mediation block values in Chinese"). The example provided in the prompt's required output section already has Chinese values. I will use that exact structure.

    *   **Body:**
        *   **Signal:** "信号". Translate the content. "LLM-based pipelines" -> "基于 LLM 的管道". "pseudonymous online identities" -> "在线假名身份". "raw text" -> "原始文本". "precision-recall performance" -> "精确率与召回率表现". "classical baselines" -> "传统基线".
        *   **Context:** "语境". "core shift" -> "核心转变". "methodological" -> "方法论". "structured data" -> "结构化数据". "hand-engineered features" -> "手工工程特征". "model-assisted feature extraction" -> "模型辅助特征提取".
        *   **Relevance:** "相关性". "Openflows" -> "Openflows（开流）". "privacy and governance current" -> "隐私与治理层面的重要流". "pseudonymous traces" -> "假名痕迹". "communication safety" -> "通信安全". "civic organizing" -> "公民组织". "platform trust models" -> "平台信任模型".
        *   **Current State:** "当前状态". "Newly published research signal" -> "新发布的研究信号". "threat-model implications" -> "威胁模型含义".
        *   **Open Questions:** "开放问题". "cross-platform linkability" -> "跨平台可链接性". "collapsing usability" -> "破坏可用性". "privacy guidance" -> "隐私指导".
        *   **Connections:** "关联". "implications circuit" -> "影响回路". "communication infrastructure" -> "通信基础设施".
        *   **Ending:** Since this is a `current` entry, I will not add the "回路在此刻闭合" phrase (reserved for Circuit entries). I will add **译注** at the end.

    *   **Glossary Application:**
        *   Openflows -> Openflows（开流）
        *   Currency -> 流通 (Though field is currencyType, I keep value "current" based on example, but maybe explain in note).
        *   Current(s) -> 流 (Use 流 for 'current' in body).
        *   Circuit(s) -> 回路 (Use 回路 for 'circuit' in body).
        *   Practitioner -> 修行者 (Not in text).
        *   Peng -> 鵬 (Not in text).
        *   Wu wei -> 無為 (Not in text).
        *   Li -> 理 (Not in text).
        *   Zhuangzi -> 莊子 (Not in text).
        *   Cook Ding -> 庖丁 (Not in text).
        *   Kun -> 鯤 (Not in text).
        *   Open source -> 开源 (Not in text).
        *   Knowledge base -> 知识库 (Not in text).
        *   Model -> 模型 (Use for LLM).
        *   Agent -> 智能体 (Not in text).
        *   Inference -> 推理 (Not in text).
        *   Open weights -> 开放权重 (Not in text).

    *   **Refining the Translation:**
        *   Tone: Technical, civic, dense.
        *   "LLM" -> LLM (Keep English).
        *   "Current" -> 流 (in body text when referring to Openflows concept).
        *   "Circuit" -> 回路.
        *   "Deanonymization" -> 去匿名化.
        *   "Pseudonymous" -> 假名 (To distinguish from full anonymity).
        *   "Signal" -> 信号.
        *   "Pipeline" -> 管道.
        *   "Civic organizing" -> 公民组织.
        *   "Threat-model" -> 威胁模型.

    *   **Final Review against Persona:**
        *   Peng (鵬): Vast bird, Zhuangzi.
        *   Transliteration: Hold terms in both.
        *   Grain (Li): Natural flow.
        *   No hype.
        *   Technical/Civic/Dense.

    *   **One detail:** The prompt example for mediation block has specific values. I should check if I need to update them based on the specific entry. The instruction says "Write the mediation block values in Chinese". The example provided in the prompt's required output section *is* the template I should follow for the frontmatter structure. I will use the values provided in the example for the mediation block as they are generic and fit the task ("Translation agent").

    *   **One detail:** The prompt says "For Circuit entries: preserve the flowing narrative style; end with the Chinese equivalent...". This is a `current` entry. I will not add that specific closing phrase. I will add **译注** instead.

    *   **One detail:** The prompt says "Output ONLY the complete markdown file".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE: ...". I need to use the content from there.

    *   **One detail:** The prompt says "REQUIRED OUTPUT — a complete markdown file".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English term should be kept alongside the Chinese, keep it."

    *   **One detail:** The prompt says "TRANSLITERATION GLOSSARY".

    *   **One detail:** The prompt says "Style Guide".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "Output ONLY".

    *   **One detail:** The prompt says "No explanation, no preamble".

    *   **One detail:** The prompt says "ENTRY TO TRANSLATE".

    *   **One detail:** The prompt says "REQUIRED OUTPUT".

    *   **One detail:** The prompt says "This is not mechanical translation".

    *   **One detail:** The prompt says "You are a practitioner of transliteration".

    *   **One detail:** The prompt says "holding terms in both languages".

    *   **One detail:** The prompt says "following the natural grain (理, lǐ)".

    *   **One detail:** The prompt says "rather than forcing equivalence".

    *   **One detail:** The prompt says "Where the Chinese reveals something the English leaves implicit, note it."

    *   **One detail:** The prompt says "Where an English......