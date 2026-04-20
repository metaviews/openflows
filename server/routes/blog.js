'use strict'

const {
  listPublishedBlogPosts,
  readPublishedBlogPost,
  buildBlogMarkdown,
  fieldsFromMarkdown,
  validateBlogContent,
  savePublishedBlogPost,
  deletePublishedBlogPost,
  saveUploadedHeroImage,
  normalizeId,
  DEFAULT_BLOG_MEDIATION,
} = require('../lib/blog')
const { loadManifest } = require('../lib/manifest')
const { getDraft, listDrafts, upsertDraft, updateDraftContent, promoteDraft, rejectDraft } = require('../lib/drafts')
const { createClient } = require('../../scripts/lib/openrouter')

async function blogRoutes(fastify) {
  fastify.get('/blog-admin', async (req, reply) => {
    const status = req.query.status || 'pending'
    const drafts = listDrafts(fastify.db, { type: 'blog', status }).map(decorateDraft)
    const published = listPublishedBlogPosts()
    return reply.view('blog-admin.njk', {
      drafts,
      published,
      status,
      publicBaseUrl: 'https://openflows.org',
    })
  })

  fastify.get('/blog-admin/new', async (req, reply) => {
    return reply.view('blog-edit.njk', {
      mode: 'new',
      title: 'New Blog Draft',
      fields: defaultFields(),
      entriesJson: buildEntriesJson(),
    })
  })

  fastify.get('/blog-admin/drafts/:id/edit', async (req, reply) => {
    try {
      const draft = getDraft(fastify.db, { id: req.params.id, lang: 'en' })
      if (draft.type !== 'blog') return reply.code(404).send('Blog draft not found')
      return reply.view('blog-edit.njk', {
        mode: 'draft',
        title: `Draft: ${draft.title || draft.id}`,
        draft,
        fields: fieldsFromMarkdown(draft.content, draft.id),
        entriesJson: buildEntriesJson(),
      })
    } catch (err) {
      return reply.code(err.statusCode || 500).send(err.message)
    }
  })

  fastify.get('/blog-admin/posts/:id/edit', async (req, reply) => {
    try {
      const post = readPublishedBlogPost(req.params.id)
      return reply.view('blog-edit.njk', {
        mode: 'published',
        title: `Post: ${post.title}`,
        post,
        fields: fieldsFromMarkdown(post.content, post.id),
        entriesJson: buildEntriesJson(),
      })
    } catch (err) {
      return reply.code(err.statusCode || 500).send(err.message)
    }
  })

  fastify.post('/api/blog/drafts', async (req, reply) => {
    try {
      const content = buildBlogMarkdown(req.body || {})
      const id = normalizeId(req.body?.blogId || req.body?.title)
      const validation = validateBlogContent({ id, content, manifest: loadManifest() })
      if (!validation.ok) return reply.code(400).send(validation)
      const draft = upsertDraft(fastify.db, {
        id,
        lang: 'en',
        content,
        status: 'pending',
        sourceUrl: null,
      })
      return reply.send({ ok: true, id, draft, validation })
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/drafts/:id/save', async (req, reply) => {
    try {
      const content = buildBlogMarkdown({ ...(req.body || {}), blogId: req.params.id })
      const validation = validateBlogContent({ id: req.params.id, content, manifest: loadManifest() })
      if (!validation.ok) return reply.code(400).send(validation)
      const draft = updateDraftContent(fastify.db, { id: req.params.id, lang: 'en', content })
      return reply.send({ ok: true, id: req.params.id, draft, validation })
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/drafts/:id/validate', async (req, reply) => {
    try {
      const content = req.body?.content || (hasStructuredBody(req.body)
        ? buildBlogMarkdown({ ...(req.body || {}), blogId: req.params.id })
        : getDraft(fastify.db, { id: req.params.id, lang: 'en' }).content)
      const validation = validateBlogContent({ id: req.params.id, content, manifest: loadManifest() })
      return reply.send(validation)
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/drafts/:id/promote', async (req, reply) => {
    try {
      const result = await promoteDraft(fastify.db, { id: req.params.id, lang: 'en' })
      return reply.send(result)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/drafts/:id/reject', async (req, reply) => {
    try {
      const draft = rejectDraft(fastify.db, { id: req.params.id, lang: 'en' })
      return reply.send({ ok: true, draft })
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/posts/:id/save', async (req, reply) => {
    try {
      const content = buildBlogMarkdown({ ...(req.body || {}), blogId: req.params.id })
      const result = await savePublishedBlogPost({ id: req.params.id, content, manifest: loadManifest() })
      return reply.send(result)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/posts/:id/validate', async (req, reply) => {
    try {
      const content = req.body?.content || (hasStructuredBody(req.body)
        ? buildBlogMarkdown({ ...(req.body || {}), blogId: req.params.id })
        : readPublishedBlogPost(req.params.id).content)
      const validation = validateBlogContent({ id: req.params.id, content, manifest: loadManifest() })
      return reply.send(validation)
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/posts/:id/delete', async (req, reply) => {
    try {
      const result = await deletePublishedBlogPost({ id: req.params.id })
      return reply.send(result)
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/images/upload', async (req, reply) => {
    try {
      if (typeof req.file !== 'function') {
        return reply.code(503).send({ error: 'Blog image upload is unavailable until @fastify/multipart is installed in server dependencies.' })
      }
      const blogId = normalizeId(req.query.blogId || '')
      const part = await req.file()
      if (!part) return reply.code(400).send({ error: 'file required' })
      const result = await saveUploadedHeroImage(part, blogId)
      return reply.send(result)
    } catch (err) {
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })

  fastify.post('/api/blog/assist', async (req, reply) => {
    try {
      const manifest = loadManifest()
      const suggestions = await suggestBlogFields(req.body || {}, manifest)
      return reply.send({ ok: true, suggestions })
    } catch (err) {
      fastify.log.error(err)
      return reply.code(err.statusCode || 500).send({ error: err.message })
    }
  })
}

function defaultFields() {
  const today = new Date().toISOString().slice(0, 10)
  return {
    blogId: '',
    title: '',
    date: today,
    abstract: '',
    topics: '',
    linkedEntries: '',
    heroImage: '',
    heroImageAlt: '',
    heroImageCaption: '',
    imagePrompt: '',
    imageTooling: '',
    humanEditor: 'Jesse',
    mediationTooling: DEFAULT_BLOG_MEDIATION.tooling,
    mediationUse: DEFAULT_BLOG_MEDIATION.use.join('\n'),
    mediationHumanRole: DEFAULT_BLOG_MEDIATION.humanRole,
    mediationLimits: DEFAULT_BLOG_MEDIATION.limits,
    body: '',
  }
}

async function suggestBlogFields(input, manifest) {
  const body = String(input.body || '').trim()
  const current = {
    title: String(input.title || '').trim(),
    blogId: normalizeId(input.blogId || input.title || ''),
    abstract: String(input.abstract || '').trim(),
    topics: normalizeList(input.topics),
    linkedEntries: normalizeList(input.linkedEntries),
    heroImageAlt: String(input.heroImageAlt || '').trim(),
    body,
    assistPrompt: String(input.assistPrompt || '').trim(),
  }

  if (!current.title && !current.abstract && !current.body && !current.assistPrompt) {
    const err = new Error('Add a title, abstract, body, or assist prompt before generating suggestions.')
    err.statusCode = 400
    throw err
  }

  const entries = (manifest?.entries || [])
    .filter(entry => entry.lang !== 'zh')
    .map(entry => ({
      id: entry.currencyId,
      type: entry.currencyType,
      title: entry.title,
      abstract: entry.abstract || '',
    }))

  const systemPrompt = `You assist Openflows editors with longform blog drafts.

Return only valid JSON. Do not wrap it in markdown.

The blog is analytical, technical, civic, and grounded in the Openflows knowledge base. Avoid hype and broad unsupported claims. Treat AI as infrastructure, not authority.

Generate suggestions for blank or weak metadata. If body is empty, draft a substantive markdown body. If body is already present, do not rewrite it; return an empty string for body.

Use only linkedEntries that appear in the provided knowledge base entries. Topics must be kebab-case. linkedEntries must be currencyId strings.`

  const userPrompt = JSON.stringify({
    current,
    requiredJsonShape: {
      title: 'string, optional suggestion',
      abstract: 'string',
      topics: ['kebab-case-topic'],
      linkedEntries: ['existing-currency-id'],
      heroImageAlt: 'string',
      body: body ? '' : 'markdown body only when current.body is empty',
      notes: ['short editorial notes or cautions'],
    },
    knowledgeBaseEntries: entries,
  }, null, 2)

  const client = createClient({
    title: 'Openflows Blog Assist',
    referer: 'https://admin.openflows.org',
    temperature: 0.25,
  })
  const raw = await client.chat(systemPrompt, userPrompt)
  const parsed = parseJsonResponse(raw)
  const validIds = new Set(entries.map(entry => entry.id))
  const suggestions = {
    title: String(parsed.title || '').trim(),
    abstract: String(parsed.abstract || '').trim(),
    topics: normalizeList(parsed.topics).map(normalizeId).filter(Boolean).slice(0, 8),
    linkedEntries: normalizeList(parsed.linkedEntries).filter(id => validIds.has(id)).slice(0, 12),
    heroImageAlt: String(parsed.heroImageAlt || '').trim(),
    body: body ? '' : String(parsed.body || '').trim(),
    notes: normalizeList(parsed.notes).slice(0, 8),
  }

  if (!suggestions.topics.length && current.topics.length) suggestions.topics = current.topics
  if (!suggestions.linkedEntries.length && current.linkedEntries.length) suggestions.linkedEntries = current.linkedEntries.filter(id => validIds.has(id))
  return suggestions
}

function parseJsonResponse(raw) {
  const text = String(raw || '').trim()
  try {
    return JSON.parse(text)
  } catch {}
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced) {
    try {
      return JSON.parse(fenced[1].trim())
    } catch {}
  }
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(text.slice(start, end + 1))
    } catch {}
  }
  const err = new Error('OpenRouter returned a non-JSON blog suggestion response.')
  err.statusCode = 502
  throw err
}

function hasStructuredBody(body) {
  return Boolean(body && Object.keys(body).some(key => body[key] !== undefined && body[key] !== null && body[key] !== ''))
}

function buildEntriesJson() {
  const manifest = loadManifest()
  const entries = (manifest?.entries || [])
    .filter(entry => entry.lang !== 'zh')
    .map(entry => ({
      id: entry.currencyId,
      title: entry.title || entry.currencyId,
      type: entry.currencyType || '',
    }))
    .sort((a, b) => a.id.localeCompare(b.id))
  return JSON.stringify(entries)
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean)
  return String(value || '')
    .split(/[\n,]/)
    .map(item => String(item).trim())
    .filter(Boolean)
}

function decorateDraft(draft) {
  const updatedAt = draft.updated_at || draft.created_at
  const updatedMs = updatedAt ? Date.parse(updatedAt) : 0
  const ageMs = updatedMs ? Date.now() - updatedMs : Infinity
  return {
    ...draft,
    isNew: ageMs <= 24 * 60 * 60 * 1000,
    isStale: draft.status === 'pending' && ageMs >= 7 * 24 * 60 * 60 * 1000,
  }
}

module.exports = blogRoutes
