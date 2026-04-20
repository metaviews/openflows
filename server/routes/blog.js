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
} = require('../lib/blog')
const { loadManifest } = require('../lib/manifest')
const { getDraft, listDrafts, upsertDraft, updateDraftContent, promoteDraft, rejectDraft } = require('../lib/drafts')

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
    mediationTooling: 'Peng drafted the analysis with OpenRouter; image generated separately.',
    mediationUse: [
      'synthesized related Openflows Currency entries',
      'drafted longform structure and editorial framing',
      'helped specify the hero image prompt',
    ].join('\n'),
    mediationHumanRole: 'selected topic, reviewed claims, edited prose, approved publication',
    mediationLimits: 'analysis depends on available Openflows entries and reviewed public sources; verify time-sensitive claims before publication',
    body: '',
  }
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
