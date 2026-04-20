'use strict'

const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')
const { parseFrontmatter } = require('./parse')
const { validateBlogMarkdown } = require('./validation')
const { commitBlogPostEdit, removeBlogPost } = require('./git')

const ROOT = path.join(__dirname, '..', '..')
const BLOG_DIR = path.join(ROOT, 'src', 'blog')
const BLOG_IMAGE_DIR = path.join(ROOT, 'src', 'assets', 'img', 'blog')
const BLOG_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/
const ALLOWED_IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const DEFAULT_BLOG_MEDIATION = {
  tooling: 'Peng assisted with blog drafting and metadata generation through OpenRouter; image generation may be performed separately.',
  use: [
    'synthesized related Openflows Currency entries',
    'suggested editorial metadata and longform structure',
    'supported human review without publishing autonomously',
  ],
  humanRole: 'selected topic, reviewed claims, edited prose, approved publication',
  limits: 'analysis depends on available Openflows entries and reviewed public sources; verify time-sensitive claims before publication',
}

function normalizeId(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function assertBlogId(id) {
  if (!BLOG_ID_PATTERN.test(String(id || ''))) {
    const err = new Error('blogId must be kebab-case')
    err.statusCode = 400
    throw err
  }
}

function blogFilePath(id) {
  assertBlogId(id)
  const filePath = path.join(BLOG_DIR, `${id}.md`)
  const resolved = path.resolve(filePath)
  const base = path.resolve(BLOG_DIR)
  if (!resolved.startsWith(base + path.sep)) {
    const err = new Error('invalid blog path')
    err.statusCode = 400
    throw err
  }
  return resolved
}

function listPublishedBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const id = path.basename(name, '.md')
      const filePath = path.join(BLOG_DIR, name)
      const content = fs.readFileSync(filePath, 'utf8')
      const { frontmatter, body } = parseFrontmatter(content)
      const stat = fs.statSync(filePath)
      return {
        id: frontmatter.blogId || id,
        title: frontmatter.title || id,
        abstract: frontmatter.abstract || '',
        date: frontmatter.date || stat.mtime.toISOString(),
        topics: Array.isArray(frontmatter.topics) ? frontmatter.topics : [],
        linkedEntries: Array.isArray(frontmatter.linkedEntries) ? frontmatter.linkedEntries : [],
        heroImage: frontmatter.heroImage || '',
        permalink: frontmatter.permalink || `/blog/${id}/`,
        relPath: path.relative(ROOT, filePath).replace(/\\/g, '/'),
        content,
        body,
        frontmatter,
      }
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
}

function readPublishedBlogPost(id) {
  const filePath = blogFilePath(id)
  if (!fs.existsSync(filePath)) {
    const err = new Error(`Blog post not found: ${id}`)
    err.statusCode = 404
    throw err
  }
  const content = fs.readFileSync(filePath, 'utf8')
  const { frontmatter, body } = parseFrontmatter(content)
  return {
    id: frontmatter.blogId || id,
    title: frontmatter.title || id,
    relPath: path.relative(ROOT, filePath).replace(/\\/g, '/'),
    filePath,
    content,
    frontmatter,
    body,
  }
}

function buildBlogMarkdown(input = {}) {
  const blogId = normalizeId(input.blogId || input.id || input.title)
  const topics = normalizeList(input.topics)
  const linkedEntries = normalizeList(input.linkedEntries)
  const mediationUse = normalizeList(input.mediationUse || DEFAULT_BLOG_MEDIATION.use)
  const body = String(input.body || '').trim()

  const frontmatter = {
    layout: 'layouts/blog-item.njk',
    title: String(input.title || '').trim(),
    date: String(input.date || new Date().toISOString().slice(0, 10)).trim(),
    permalink: `/blog/${blogId}/`,
    blogId,
    abstract: String(input.abstract || '').trim(),
    topics,
    linkedEntries,
    heroImage: String(input.heroImage || '').trim(),
    heroImageAlt: String(input.heroImageAlt || '').trim(),
    humanEditor: String(input.humanEditor || '').trim(),
    mediation: {
      tooling: String(input.mediationTooling || DEFAULT_BLOG_MEDIATION.tooling).trim(),
      use: mediationUse,
      humanRole: String(input.mediationHumanRole || DEFAULT_BLOG_MEDIATION.humanRole).trim(),
      limits: String(input.mediationLimits || DEFAULT_BLOG_MEDIATION.limits).trim(),
    },
  }

  const caption = String(input.heroImageCaption || '').trim()
  if (caption) frontmatter.heroImageCaption = caption
  const imagePrompt = String(input.imagePrompt || '').trim()
  const imageTooling = String(input.imageTooling || '').trim()
  if (imagePrompt) frontmatter.imagePrompt = imagePrompt
  if (imageTooling) frontmatter.imageTooling = imageTooling

  return `---\n${yaml.dump(frontmatter, { lineWidth: 100, noRefs: true })}---\n\n${body}\n`
}

function fieldsFromMarkdown(content, fallbackId = '') {
  const { frontmatter, body } = parseFrontmatter(content || '')
  return {
    blogId: frontmatter.blogId || fallbackId,
    title: frontmatter.title || '',
    date: normalizeDate(frontmatter.date),
    abstract: frontmatter.abstract || '',
    topics: (frontmatter.topics || []).join('\n'),
    linkedEntries: (frontmatter.linkedEntries || []).join('\n'),
    heroImage: frontmatter.heroImage || '',
    heroImageAlt: frontmatter.heroImageAlt || '',
    heroImageCaption: frontmatter.heroImageCaption || '',
    imagePrompt: frontmatter.imagePrompt || '',
    imageTooling: frontmatter.imageTooling || '',
    humanEditor: frontmatter.humanEditor || '',
    mediationTooling: frontmatter.mediation?.tooling || '',
    mediationUse: (frontmatter.mediation?.use || []).join('\n'),
    mediationHumanRole: frontmatter.mediation?.humanRole || '',
    mediationLimits: frontmatter.mediation?.limits || '',
    body: String(body || '').trim(),
  }
}

function normalizeDate(value) {
  if (!value) return ''
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value).slice(0, 10)
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean)
  return String(value || '')
    .split(/[\n,]/)
    .map(item => String(item).trim())
    .filter(Boolean)
}

function validateBlogContent({ id, content, manifest }) {
  return validateBlogMarkdown({ id, content, manifest })
}

async function savePublishedBlogPost({ id, content, manifest }) {
  assertBlogId(id)
  const existing = readPublishedBlogPost(id)
  const validation = validateBlogContent({ id, content, manifest })
  if (!validation.ok) {
    const err = new Error(`invalid blog post: ${validation.issues.map(issue => issue.message).join('; ')}`)
    err.statusCode = 400
    throw err
  }
  if (validation.frontmatter.blogId !== id) {
    const err = new Error(`blogId mismatch (${validation.frontmatter.blogId} != ${id})`)
    err.statusCode = 400
    throw err
  }
  fs.writeFileSync(existing.filePath, content, 'utf8')
  const result = await commitBlogPostEdit({
    relPath: existing.relPath,
    id,
    heroImage: validation.frontmatter.heroImage,
  })
  return { ok: true, id, path: existing.relPath, committed: result.committed }
}

async function deletePublishedBlogPost({ id }) {
  const existing = readPublishedBlogPost(id)
  const result = await removeBlogPost({ relPath: existing.relPath, id })
  return { ok: true, id, path: existing.relPath, committed: result.committed }
}

async function saveUploadedHeroImage(part, blogId) {
  const id = normalizeId(blogId)
  assertBlogId(id)
  const original = String(part.filename || '')
  const ext = path.extname(original).toLowerCase()
  if (!ALLOWED_IMAGE_EXT.has(ext)) {
    const err = new Error('Unsupported image type. Use jpg, png, or webp.')
    err.statusCode = 400
    throw err
  }

  fs.mkdirSync(BLOG_IMAGE_DIR, { recursive: true })
  const destPath = path.join(BLOG_IMAGE_DIR, `${id}${ext}`)
  const resolved = path.resolve(destPath)
  const base = path.resolve(BLOG_IMAGE_DIR)
  if (!resolved.startsWith(base + path.sep)) {
    const err = new Error('invalid image path')
    err.statusCode = 400
    throw err
  }

  let size = 0
  const chunks = []
  for await (const chunk of part.file) {
    size += chunk.length
    if (size > MAX_IMAGE_BYTES) {
      const err = new Error('Image exceeds 5 MB limit.')
      err.statusCode = 413
      throw err
    }
    chunks.push(chunk)
  }
  fs.writeFileSync(resolved, Buffer.concat(chunks))
  return {
    ok: true,
    path: `/assets/img/blog/${id}${ext}`,
    bytes: size,
  }
}

module.exports = {
  ROOT,
  BLOG_DIR,
  BLOG_IMAGE_DIR,
  normalizeId,
  assertBlogId,
  blogFilePath,
  listPublishedBlogPosts,
  readPublishedBlogPost,
  buildBlogMarkdown,
  fieldsFromMarkdown,
  validateBlogContent,
  savePublishedBlogPost,
  deletePublishedBlogPost,
  saveUploadedHeroImage,
  DEFAULT_BLOG_MEDIATION,
}
