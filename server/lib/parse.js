'use strict'

const yaml = require('js-yaml')

// Parse YAML frontmatter from a markdown string.
// Returns { frontmatter, body } — frontmatter is an object, body is the markdown after the closing ---.
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: content }
  try {
    const frontmatter = yaml.load(match[1]) || {}
    return { frontmatter, body: match[2] }
  } catch {
    return { frontmatter: {}, body: content }
  }
}

module.exports = { parseFrontmatter }
