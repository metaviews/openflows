const test = require('node:test')
const assert = require('node:assert/strict')

const { inspectDraftContent, normalizeDraftContent } = require('../server/lib/draft-standard')

const VALID_CURRENT = `---
layout: layouts/currency-item.njk
title: "Example Current"
date: 2026-04-22
currencyType: current
currencyId: example-current
tags:
  - currency
permalink: /currency/currents/example-current/
abstract: "A concise example current used to validate draft standardization."
mediation:
  tooling: "test"
  use:
    - "validate draft schema"
  humanRole: "test"
  limits: "test fixture"
---

### Signal
[Example](https://example.com/project) · test · 2026-04-22
The signal introduces a test project.

### Context
The context explains where the signal fits.

### Relevance
The relevance explains why Openflows should track it.

### Current State
The current state is inspectable.

### Open Questions
- What should be checked next?

### Connections
No explicit currency link added yet.
`

test('draft normalizer strips model wrappers before validation', () => {
  const wrapped = '```markdown\n</think>\n' + VALID_CURRENT + '\n```'
  const normalized = normalizeDraftContent(wrapped)
  assert.equal(normalized.startsWith('---\nlayout:'), true)
  assert.equal(normalized.includes('</think>'), false)
  assert.equal(normalized.includes('```'), false)
})

test('current drafts must use the shared intake section structure', () => {
  const valid = inspectDraftContent({ id: 'example-current', lang: 'en', content: VALID_CURRENT })
  assert.equal(valid.valid, true)

  const missingSections = VALID_CURRENT.replace('### Signal', '### Overview')
  const invalid = inspectDraftContent({ id: 'example-current', lang: 'en', content: missingSections })
  assert.equal(invalid.valid, false)
  assert.match(invalid.issues.join('\n'), /missing section: ### Signal/)
})

test('draft validation rejects malformed schema consistently', () => {
  const malformed = `---
title: "Broken"
currencyType: "current"
currencyId: different-id
abstract: "Broken draft."
---

Body.`

  const result = inspectDraftContent({ id: 'broken-draft', lang: 'en', content: malformed })
  assert.equal(result.valid, false)
  assert.match(result.issues.join('\n'), /Layout must be layouts\/currency-item\.njk|Missing layout/)
  assert.match(result.issues.join('\n'), /currencyId mismatch/)
  assert.match(result.issues.join('\n'), /tags must include currency/)
})
