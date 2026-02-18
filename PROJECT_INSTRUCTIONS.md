PROJECT: Openflows (openflows.org)

Purpose
- Openflows is cognitive infrastructure: it connects embodied human presence, digital systems, and AI into a continuous circulation of understanding across virtual and physical contexts.
- Openflows is complementary to Metaviews: Metaviews interprets the big picture; Openflows is the central nervous system that enables collective cognition (technical + methodological).
- The project should balance three registers in tone and structure:
  1) Technical and architectural
  2) Civic and participatory
  3) Biological and embodied
- Maintain a subtle “flow / balance / circulation” undercurrent (Taoist-adjacent), without needing to explicitly label it.

Domains
- openflows.org is canonical.
- openflows.ca and openflows.net currently point/redirect to openflows.org.
- Do not create domain-specific sections or identity splits yet.

Core site architecture (minimal; avoid bloat)
- Keep the initial site structure minimal and legible:
  - / (orientation)
  - /system (system description)
  - /methods (operational methods/protocol)
  - /currency (living layer)
- Navigation should remain sparse: System / Methods / Currency.

Currency section model (living layer)
- “Currency” is the living layer: what is moving through the system as it changes.
- Currency contains three internal entry types:
  - Currents = movement (provisional, exploratory, tensions/questions/early patterning)
  - Circuits = completion (closed loops, integration, durable shifts, what-changed and why it holds)
  - Operators = exceptional humans whose practice materially shapes open intelligence trajectories
- Currents, Circuits, and Operators should feel meaningfully different in intent and structure.
- Avoid over-relying on the old “signals” convention; prefer Currency → Currents/Circuits/Operators.

Matrix-building linkage rule (required)
- Every new Currency entry must trigger a linkage pass across the other types:
  - New Current: evaluate links to relevant Circuits and Operators.
  - New Circuit: evaluate links to relevant Currents and Operators.
  - New Operator: evaluate links to relevant Currents and Circuits.
- Add explicit `links` in front matter whenever a meaningful relation exists.
- If no strong relation exists yet, include a short in-body note: “No explicit currency link added yet.”
- Operators are intentionally selective: add only exceptional people with durable field-shaping impact, not routine contributors.

AI framing + literacy requirement
- Treat AI as infrastructure, not authority and not “the brain.”
- Openflows must promote AI literacy as a condition of agency. This is done through practice, not lectures.
- Embed literacy structurally by making mediation visible when AI is used:
  - Include an optional “Mediation note” block on Currency entries when relevant.
  - The mediation note should record: what tool/system, what it was used for, what humans changed/overrode, and key limits.
- Prefer open / local / inspectable AI approaches as aligned with agency and plural interpretation; connect conceptually to open-source AI counterweights to corporate models (without turning the site into product marketing or hype).

Editorial stance and style constraints
- Avoid “what we are not” framing (no negative-definition sections).
- Avoid hype, grand promises, and sales language; write descriptively and architecturally.
- Don’t build a blog feed vibe. Currency entries are artifacts of circulation, not posts.
- Keep pages dense and purposeful; fewer pages, more coherence.

Implementation preferences (Eleventy)
- Use Markdown (.md) for Currents/Circuits entries with YAML front matter.
- Use Markdown (.md) for Currents/Circuits/Operators entries with YAML front matter.
- Use Nunjucks (.njk) for layouts and index/list pages.
- Differentiate Currents vs Circuits via a single front matter field:
  - currencyType: "current" | "circuit" | "operator"
- Use tags/collections to list items on /currency and on /currency/currents, /currency/circuits, and /currency/operators.
- Keep schema consistent across all three types.

