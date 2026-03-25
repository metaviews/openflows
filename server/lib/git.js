'use strict'

const path = require('path')
const fs = require('fs')
const { simpleGit } = require('simple-git')

const ROOT = path.join(__dirname, '..', '..')

function makeGit() {
  return simpleGit(ROOT, {
    config: [
      `user.name=${process.env.GIT_USER_NAME || 'Peng (Openflows Agent)'}`,
      `user.email=${process.env.GIT_USER_EMAIL || 'peng@openflows.org'}`,
    ],
  })
}

// Map currencyType + lang to the destination src/ directory.
function destDir(currencyType, lang) {
  const typeMap = { current: 'currents', circuit: 'circuits', practitioner: 'practitioners' }
  const dir = typeMap[currencyType]
  if (!dir) throw new Error(`Unknown currencyType: ${currencyType}`)
  return lang === 'zh'
    ? path.join(ROOT, 'src', 'currency', 'zh', dir)
    : path.join(ROOT, 'src', 'currency', dir)
}

// Write a draft to src/, commit, and push.
// Returns the relative path of the promoted file.
async function promoteEntry({ id, lang, content, currencyType }) {
  const dir = destDir(currencyType, lang)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

  const destPath = path.join(dir, `${id}.md`)
  fs.writeFileSync(destPath, content, 'utf8')

  const relPath = path.relative(ROOT, destPath).replace(/\\/g, '/')
  const git = makeGit()

  await git.pull(['--rebase', 'origin', 'main'])
  await git.add(relPath)
  const date = new Date().toISOString().slice(0, 10)
  await git.commit(`promote: ${id} (${lang}) — ${date}`)
  await git.push('origin', 'main')

  return { path: relPath }
}

// Commit any changes in src/perspective/ (digest auto-publish).
async function commitPerspective() {
  const git = makeGit()
  await git.pull(['--rebase', 'origin', 'main'])
  await git.add('src/perspective/')
  const diff = await git.diff(['--staged', '--name-only'])
  if (!diff.trim()) return { committed: false }
  const date = new Date().toISOString().slice(0, 10)
  await git.commit(`peng: perspective ${date}`)
  await git.push('origin', 'main')
  return { committed: true }
}

// Commit drafts/seen.json after intake (deduplication memory).
async function commitSeen() {
  const git = makeGit()
  await git.pull(['--rebase', 'origin', 'main'])
  await git.add('drafts/seen.json')
  const diff = await git.diff(['--staged', '--name-only'])
  if (!diff.trim()) return { committed: false }
  const date = new Date().toISOString().slice(0, 10)
  await git.commit(`peng: update seen.json ${date}`)
  await git.push('origin', 'main')
  return { committed: true }
}

// Commit an edited entry back to src/.
async function commitEdit({ relPath, id, lang }) {
  const git = makeGit()
  await git.pull(['--rebase', 'origin', 'main'])
  await git.add(relPath)
  const diff = await git.diff(['--staged', '--name-only'])
  if (!diff.trim()) return { committed: false }
  const date = new Date().toISOString().slice(0, 10)
  await git.commit(`edit: ${id} (${lang}) — ${date}`)
  await git.push('origin', 'main')
  return { committed: true }
}

// Remove an entry from src/ and commit.
async function removeEntry({ relPath, id, lang }) {
  const git = makeGit()
  await git.pull(['--rebase', 'origin', 'main'])
  await git.rm(relPath)
  const date = new Date().toISOString().slice(0, 10)
  await git.commit(`remove: ${id} (${lang}) — ${date}`)
  await git.push('origin', 'main')
  return { committed: true }
}

module.exports = { promoteEntry, commitPerspective, commitSeen, commitEdit, removeEntry }
