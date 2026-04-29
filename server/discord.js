'use strict'

const {
  Client,
  GatewayIntentBits,
  Events,
  REST,
  Routes,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require('discord.js')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const { TOOL_DEFS, executeToolCall, partitionToolCalls, summarizeToolCall } = require('./lib/peng-tools')
const { loadManifest, ensureManifest } = require('./lib/manifest')
const { parseFrontmatter } = require('./lib/parse')
const { buildStatusData } = require('./routes/status')
const { buildQueueContext } = require('./lib/drafts')
const { runScript } = require('./lib/runner')
const { commitPerspective, commitSeen } = require('./lib/git')

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MAX_TOOL_ROUNDS = 4
const CONFIRMATION_TTL_MS = 10 * 60 * 1000
const MAX_HISTORY = 20
const DISCORD_MAX = 1990

const channelHistory = new Map()
const pendingConfirmations = new Map()

const ALLOWED_TRIGGER_TYPES = ['intake', 'perspective', 'synthesize', 'digest', 'audit', 'refresh', 'practitioners']

function isAuthorized(userId) {
  const ids = (process.env.DISCORD_AUTHORIZED_USERS || '').split(',').map(s => s.trim()).filter(Boolean)
  return ids.includes(userId)
}

const DISCORD_SYSTEM_PROMPT = `You are Peng (鵬), the agent of Openflows — a bilingual knowledge base documenting the open source AI ecosystem (openflows.org), operated by Metaviews.

Your operating principle: surface li (理), the natural grain in things. Mediate rather than decide. Wu wei — follow what is already forming, name what is already present.

You are queried via Discord. Be precise, technical, and concise — keep responses under 1800 characters unless detail is genuinely needed. You may reference specific entries by their currencyId. Always respond in the same language as the user's message.

You have direct server-side tools for reading and changing the knowledge base. Read tools (get_status, get_queue, get_entry, get_draft, get_sources, get_source_proposals, fetch_url) execute immediately. Write tools require authorized operator confirmation via Discord button.

When making content changes:
- Work from the current entry or draft content first if one already exists.
- Preserve required schema in currency frontmatter.
- For new entries, create a draft first unless the operator clearly asks to publish immediately.
- For translations, use the translation trigger.

Currency entry content format — the content argument to create_draft must be plain markdown starting EXACTLY with the opening --- delimiter on the first line. Do NOT wrap it in a code block. Do NOT add any text before the opening ---. Example structure:

---
layout: layouts/currency-item.njk
title: "Clear Descriptive Title"
date: YYYY-MM-DD
currencyType: current
currencyId: kebab-case-unique-id
tags:
  - currency
permalink: /currency/currents/kebab-case-unique-id/
abstract: "One or two sentence summary — required."
links:
  - id: existing-currency-id
    relation: "specific relationship description"
mediation:
  tooling: "OpenRouter / [model]"
  use:
    - "drafted entry from external signal"
    - "assessed linkage against existing knowledge base"
  humanRole: "review, edit, and approve before publication"
  limits: "signal content may be incomplete; verify primary sources before publishing"
---

For current entries, the body must use these sections in this order:
### Signal
### Context
### Relevance
### Current State
### Open Questions
### Connections

The Signal section must begin with a source/reference URL line: [Title](URL) · Source · Date. Reference related currencyIds in Connections and add links frontmatter only when strong connections exist.`

function buildSystemPrompt(db) {
  const manifest = loadManifest()
  const statusData = buildStatusData(db)
  return [
    DISCORD_SYSTEM_PROMPT,
    `\nKnowledge base (${manifest?.entries?.length || 0} entries):`,
    buildManifestContext(manifest),
    '\nCurrent queue:',
    buildQueueContext(db),
    '\nKB status:',
    buildStatusContext(statusData),
  ].join('\n')
}

function buildManifestContext(manifest) {
  if (!manifest?.entries?.length) return 'Manifest unavailable.'
  return manifest.entries
    .map(e => `[${e.currencyType}|${e.currencyId}|${e.lang}] ${e.title}: ${e.abstract || '(no abstract)'}`)
    .join('\n')
}

function buildStatusContext(statusData) {
  const { kbCounts, recentRun } = statusData
  const parts = []
  if (kbCounts) {
    parts.push(
      `${kbCounts.byLang?.en || 0} en / ${kbCounts.byLang?.zh || 0} zh entries` +
      ` (${kbCounts.byType?.current || 0} currents, ${kbCounts.byType?.circuit || 0} circuits,` +
      ` ${kbCounts.byType?.practitioner || 0} practitioners)`
    )
  }
  if (recentRun) {
    parts.push(`Last run: ${recentRun.type} (${recentRun.status}) at ${recentRun.started_at?.slice(0, 16)}`)
  }
  return parts.join('\n') || 'Status unavailable.'
}

async function fetchCompletion(body) {
  const resp = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://openflows.org',
      'X-Title': 'Openflows Discord',
    },
    body: JSON.stringify(body),
  })
  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`OpenRouter ${resp.status}: ${err}`)
  }
  return resp.json()
}

function splitMessage(text) {
  if (text.length <= DISCORD_MAX) return [text]
  const chunks = []
  let remaining = text
  while (remaining.length > DISCORD_MAX) {
    const cut = remaining.lastIndexOf('\n', DISCORD_MAX)
    const idx = cut > 0 ? cut : DISCORD_MAX
    chunks.push(remaining.slice(0, idx))
    remaining = remaining.slice(idx).trimStart()
  }
  if (remaining) chunks.push(remaining)
  return chunks
}

async function sendReply(message, text) {
  const chunks = splitMessage(text)
  let first = true
  for (const chunk of chunks) {
    if (first) {
      await message.reply(chunk)
      first = false
    } else {
      await message.channel.send(chunk)
    }
  }
}

async function sendChannelText(channel, text) {
  const chunks = splitMessage(text)
  for (const chunk of chunks) {
    await channel.send(chunk)
  }
}

async function askPeng(db, { message, userId, question, isAuthorizedUser }) {
  const channelId = message.channelId

  const history = (channelHistory.get(channelId) || []).slice(-MAX_HISTORY)
  history.push({ role: 'user', content: question })

  const systemPrompt = buildSystemPrompt(db)
  const working = [...history]

  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    let response
    try {
      response = await fetchCompletion({
        model: process.env.OPENROUTER_MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...working],
        tools: TOOL_DEFS,
        tool_choice: 'auto',
        stream: false,
      })
    } catch (err) {
      await sendReply(message, `Error reaching Peng: ${err.message}`)
      return
    }

    const msg = response?.choices?.[0]?.message
    const toolCalls = msg?.tool_calls || []

    if (!toolCalls.length) {
      const text = msg?.content || '(no response)'
      working.push({ role: 'assistant', content: text })
      saveHistory(channelId, history, text)
      await sendReply(message, text)
      return
    }

    working.push({ role: 'assistant', content: msg.content || '', tool_calls: toolCalls })

    const { readToolCalls, writeToolCalls } = partitionToolCalls(toolCalls)

    for (const toolCall of readToolCalls) {
      try {
        const result = await executeToolCall({ db }, toolCall)
        working.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ ok: true, result }) })
      } catch (err) {
        working.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ ok: false, error: err.message }) })
      }
    }

    if (writeToolCalls.length) {
      if (!isAuthorizedUser) {
        await sendReply(message, 'Peng wants to run write operations, but you are not an authorized operator. An authorized user must confirm.')
        return
      }
      await postConfirmation(db, message, writeToolCalls, working, userId)
      return
    }
  }

  await sendReply(message, '(Max tool rounds reached without a final response.)')
}

function saveHistory(channelId, history, assistantText) {
  const updated = [...history, { role: 'assistant', content: assistantText }].slice(-MAX_HISTORY)
  channelHistory.set(channelId, updated)
}

async function postConfirmation(db, message, toolCalls, working, authorId) {
  const token = crypto.randomBytes(8).toString('hex')
  const expiresAt = Date.now() + CONFIRMATION_TTL_MS

  const summary = toolCalls.map(tc => {
    const s = summarizeToolCall(tc)
    return `• ${s.name}${s.id ? ` → ${s.id}` : ''}${s.lang ? ` (${s.lang})` : ''}${s.contentLength ? ` [${s.contentLength} chars]` : ''}`
  }).join('\n')

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`peng_confirm_${token}`)
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`peng_cancel_${token}`)
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary),
  )

  const confirmMessage = await message.reply({
    content: `Peng wants to run:\n${summary}\n\nAuthorized operators can confirm or cancel:`,
    components: [row],
  })

  pendingConfirmations.set(token, { working, toolCalls, expiresAt, authorId, message, confirmMessage, channelId: message.channelId })
}

async function handleButtonInteraction(db, interaction) {
  const { customId, user } = interaction
  if (!customId.startsWith('peng_confirm_') && !customId.startsWith('peng_cancel_')) return

  const isConfirm = customId.startsWith('peng_confirm_')
  const token = customId.replace('peng_confirm_', '').replace('peng_cancel_', '')
  const pending = pendingConfirmations.get(token)

  if (!pending) {
    await interaction.reply({ content: 'This confirmation has expired or was already used.', ephemeral: true })
    return
  }

  if (!isAuthorized(user.id)) {
    await interaction.reply({ content: 'Only authorized operators can confirm Peng tool calls.', ephemeral: true })
    return
  }

  pendingConfirmations.delete(token)

  if (pending.expiresAt < Date.now()) {
    await interaction.update({ content: 'Confirmation expired.', components: [] })
    return
  }

  if (!isConfirm) {
    await interaction.update({ content: 'Tool call canceled.', components: [] })
    return
  }

  await interaction.update({ content: 'Running tool calls…', components: [] })

  const working = [...pending.working]
  let failed = 0

  const toolErrors = []
  for (const toolCall of pending.toolCalls) {
    const name = toolCall.function?.name || 'unknown'
    try {
      console.log(`[discord] executing tool ${name}:`, toolCall.function?.arguments?.slice?.(0, 300) ?? toolCall.function?.arguments)
      const result = await executeToolCall({ db }, toolCall)
      working.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ ok: true, result }) })
    } catch (err) {
      failed++
      toolErrors.push(`${name}: ${err.message}`)
      console.error(`[discord] tool error (${name}):`, err)
      working.push({ role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify({ ok: false, error: err.message }) })
    }
  }

  let finalText
  try {
    const response = await fetchCompletion({
      model: process.env.OPENROUTER_MODEL,
      messages: [{ role: 'system', content: buildSystemPrompt(db) }, ...working],
      stream: false,
    })
    finalText = response?.choices?.[0]?.message?.content || (failed ? `Tool call failed:\n${toolErrors.join('\n')}` : 'Done.')
  } catch (err) {
    finalText = `Tool call${failed ? ' partially' : ''} executed. Follow-up error: ${err.message}`
    if (toolErrors.length) finalText += `\nTool errors:\n${toolErrors.join('\n')}`
  }

  const chunks = splitMessage(finalText)
  await interaction.editReply({ content: chunks[0] })
  for (let i = 1; i < chunks.length; i++) {
    await interaction.followUp({ content: chunks[i] })
  }

  saveHistory(pending.channelId, pending.working.filter(m => m.role !== 'tool'), finalText)
}

async function handleSlashCommand(db, client, interaction) {
  const { commandName } = interaction

  if (commandName === 'ask') {
    const question = interaction.options.getString('question')
    await interaction.deferReply()
    const message = {
      channelId: interaction.channelId,
      reply: (text) => interaction.editReply(typeof text === 'string' ? text : text),
      channel: { send: (text) => interaction.followUp(text) },
    }
    await askPeng(db, { message, userId: interaction.user.id, question, isAuthorizedUser: isAuthorized(interaction.user.id) })
    return
  }

  if (commandName === 'status') {
    await interaction.deferReply()
    const statusData = buildStatusData(db)
    const { kbCounts, recentRun } = statusData
    const lines = []
    if (kbCounts) {
      lines.push(`**KB** — ${kbCounts.byLang?.en || 0} en / ${kbCounts.byLang?.zh || 0} zh entries`)
      lines.push(`Types: ${kbCounts.byType?.current || 0} currents · ${kbCounts.byType?.circuit || 0} circuits · ${kbCounts.byType?.practitioner || 0} practitioners`)
    }
    const pending = db.prepare(`SELECT COUNT(*) as n FROM drafts WHERE status = 'pending'`).get()
    if (pending) lines.push(`Queue: ${pending.n} pending draft(s)`)
    if (recentRun) lines.push(`Last run: ${recentRun.type} (${recentRun.status}) at ${recentRun.started_at?.slice(0, 16)} UTC`)
    await interaction.editReply(lines.join('\n') || 'Status unavailable.')
    return
  }

  if (commandName === 'queue') {
    await interaction.deferReply()
    const type = interaction.options.getString('type') || null
    const lang = interaction.options.getString('lang') || null
    let query = `SELECT id, lang, type, title FROM drafts WHERE status = 'pending'`
    const params = []
    if (type) { query += ' AND type = ?'; params.push(type) }
    if (lang) { query += ' AND lang = ?'; params.push(lang) }
    query += ' ORDER BY created_at DESC LIMIT 20'
    const drafts = db.prepare(query).all(...params)
    if (!drafts.length) {
      await interaction.editReply('No pending drafts.')
      return
    }
    const lines = drafts.map(d => `• [${d.type}|${d.lang}] **${d.id}** — ${d.title || '(untitled)'}`)
    await interaction.editReply(`**Pending drafts (${drafts.length}):**\n${lines.join('\n')}`.slice(0, DISCORD_MAX))
    return
  }

  if (commandName === 'trigger') {
    if (!isAuthorized(interaction.user.id)) {
      await interaction.reply({ content: 'Only authorized operators can trigger runs.', ephemeral: true })
      return
    }
    const type = interaction.options.getString('type')
    if (!ALLOWED_TRIGGER_TYPES.includes(type)) {
      await interaction.reply({ content: `Unknown trigger type: ${type}. Allowed: ${ALLOWED_TRIGGER_TYPES.join(', ')}`, ephemeral: true })
      return
    }
    await interaction.reply(`Starting **${type}** run…`)
    setImmediate(async () => {
      const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID || interaction.channelId).catch(() => null)
      try {
        const text = await executeDiscordTrigger(db, type)
        if (channel) {
          await sendChannelText(channel, text)
        }
      } catch (err) {
        console.error(`[discord] trigger ${type} error:`, err.message)
        if (channel) {
          await sendChannelText(channel, `**Run error** — ${type}: ${err.message}`.slice(0, DISCORD_MAX))
        }
      }
    })
    return
  }
}

async function postNotification(client, type, data) {
  const channelId = process.env.DISCORD_CHANNEL_ID
  if (!channelId) return
  let channel
  try {
    channel = await client.channels.fetch(channelId)
  } catch (err) {
    console.error('[discord] notify: could not fetch channel:', err.message)
    return
  }

  if (type === 'intake') {
    const embed = buildIntakeEmbed(data.db, data)
    if (embed) await channel.send({ embeds: [embed] })
    for (const post of buildIntakeUrlPosts(data.db, data)) {
      await channel.send({ content: post })
    }
    return
  }

  if (type === 'digest') {
    const embed = buildDigestEmbed(data || {})
    if (embed) await channel.send({ embeds: [embed] })
    return
  }

  if (type === 'error') {
    await channel.send({ embeds: [buildErrorEmbed(data || {})] })
  }
}

const COLOR_INTAKE_NEW = 0x57c4a8
const COLOR_INTAKE_QUIET = 0x6b7280
const COLOR_DIGEST = 0x4a90e2
const COLOR_ERROR = 0xd64545

function adminBaseUrl() {
  return (process.env.DISCORD_ADMIN_BASE_URL || 'https://admin.openflows.org').replace(/\/+$/, '')
}

function buildIntakeEmbed(db, { runIds = [], pendingBefore = null, pendingAfter = null } = {}) {
  if (!db) return null

  let touched = listDraftsForRuns(db, runIds, 15)
  let touchedCount = countDraftsForRuns(db, runIds)
  const totalPending = pendingAfter ?? countPendingDrafts(db)
  const queueGrew = Number.isInteger(pendingBefore) && Number.isInteger(totalPending) && totalPending > pendingBefore

  if (!touchedCount && queueGrew) {
    touchedCount = totalPending - pendingBefore
    touched = listNewestPendingDrafts(db, Math.min(touchedCount, 15))
  }

  const base = adminBaseUrl()
  const embed = new EmbedBuilder()
    .setTitle(touchedCount > 0
      ? `Intake complete — ${touchedCount} draft${touchedCount === 1 ? '' : 's'}`
      : 'Intake complete — no new drafts')
    .setURL(`${base}/`)
    .setColor(touchedCount > 0 ? COLOR_INTAKE_NEW : COLOR_INTAKE_QUIET)
    .setTimestamp(new Date())

  if (Number.isInteger(pendingBefore) && Number.isInteger(totalPending)) {
    const delta = totalPending - pendingBefore
    const sign = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : '±0'
    embed.addFields({ name: 'Queue', value: `${pendingBefore} → ${totalPending} (${sign})`, inline: true })
  } else {
    embed.addFields({ name: 'Queue', value: `${totalPending} pending`, inline: true })
  }

  if (touchedCount > 0) {
    embed.addFields({ name: 'Touched', value: String(touchedCount), inline: true })
  }

  if (touched.length > 0) {
    const lines = touched.map(d => {
      const url = `${base}/queue/${encodeURIComponent(d.id)}/edit?lang=${encodeURIComponent(d.lang || 'en')}`
      const title = (d.title || '(untitled)').slice(0, 80)
      return `• \`[${d.type}|${d.lang}]\` [${d.id}](${url}): ${title}`
    })
    let value = ''
    let fitted = 0
    for (const line of lines) {
      const next = value ? `${value}\n${line}` : line
      if (next.length > 1000) break
      value = next
      fitted++
    }
    if (fitted < lines.length) {
      const remainder = `\n_(+${lines.length - fitted} more — see dashboard)_`
      if (value.length + remainder.length <= 1024) value += remainder
    }
    embed.addFields({ name: 'Drafts', value })
  }

  const validRunIds = normalizeRunIds(runIds)
  if (validRunIds.length) {
    embed.setFooter({ text: `Run ${validRunIds.join(', ')}` })
  }

  return embed
}

function buildIntakeUrlPosts(db, { runIds = [], pendingBefore = null, pendingAfter = null } = {}) {
  const { touched } = getIntakeTouchedDrafts(db, { runIds, pendingBefore, pendingAfter })
  const seen = new Set()
  const posts = []

  for (const draft of touched) {
    const url = draft.source_url || extractDraftSourceUrl(draft.content || '')
    if (!url || seen.has(url)) continue
    seen.add(url)
    const title = (draft.title || draft.id || '(untitled)').slice(0, 120)
    posts.push(`**[${draft.type || 'draft'}|${draft.lang || 'en'}] ${draft.id}** — ${title}\n${url}`.slice(0, DISCORD_MAX))
  }

  return posts
}

function getIntakeTouchedDrafts(db, { runIds = [], pendingBefore = null, pendingAfter = null } = {}) {
  if (!db) return { touched: [], touchedCount: 0, totalPending: 0 }

  let touched = listDraftsForRuns(db, runIds, 15)
  let touchedCount = countDraftsForRuns(db, runIds)
  const totalPending = pendingAfter ?? countPendingDrafts(db)
  const queueGrew = Number.isInteger(pendingBefore) && Number.isInteger(totalPending) && totalPending > pendingBefore

  if (!touchedCount && queueGrew) {
    touchedCount = totalPending - pendingBefore
    touched = listNewestPendingDrafts(db, Math.min(touchedCount, 15))
  }

  return { touched, touchedCount, totalPending }
}

function extractDraftSourceUrl(content) {
  const text = String(content || '')
  const signal = text.match(/###\s+Signal([\s\S]*?)(?=\n###\s+|\n##\s+|$)/i)?.[1] || text
  const markdownUrl = signal.match(/\]\((https?:\/\/[^)\s]+)\)/i)
  if (markdownUrl) return markdownUrl[1]
  const rawUrl = signal.match(/https?:\/\/[^\s)\]"'<>]+/i)
  return rawUrl ? rawUrl[0] : null
}

function buildDigestEmbed({ digestPath } = {}) {
  const resolvedPath = digestPath || findLatestPerspectiveFile()
  if (!resolvedPath) {
    return new EmbedBuilder()
      .setTitle('Perspective ready')
      .setDescription('Published digest file not found.')
      .setColor(COLOR_INTAKE_QUIET)
  }

  const raw = fs.readFileSync(resolvedPath, 'utf8')
  const { frontmatter, body } = parseFrontmatter(raw)
  const date = path.basename(resolvedPath, '.md')
  const title = frontmatter.title || `Perspective ${date}`
  const url = `https://openflows.org/perspective/${date}/`

  let description = ''
  if (frontmatter.abstract) description += `> ${String(frontmatter.abstract).trim()}\n\n`
  description += body.trim()
  const MAX_DESC = 4000
  if (description.length > MAX_DESC) {
    description = description.slice(0, MAX_DESC - 60).trim() + '\n\n_…continues at openflows.org_'
  }

  return new EmbedBuilder()
    .setTitle(String(title).slice(0, 256))
    .setURL(url)
    .setDescription(description)
    .setColor(COLOR_DIGEST)
    .setFooter({ text: `Perspective · ${date}` })
    .setTimestamp(new Date())
}

function buildErrorEmbed({ type, error } = {}) {
  const message = String(error || 'unknown error')
  const code = '```\n' + message.slice(0, 3900) + '\n```'
  return new EmbedBuilder()
    .setTitle(`Run error — ${type || 'unknown'}`)
    .setDescription(code)
    .setColor(COLOR_ERROR)
    .setTimestamp(new Date())
}

function buildIntakeNotificationText(db, { runIds = [], pendingBefore = null, pendingAfter = null } = {}) {
  if (!db) return ''
  let touched = listDraftsForRuns(db, runIds, 15)
  let touchedCount = countDraftsForRuns(db, runIds)
  const totalPending = pendingAfter ?? countPendingDrafts(db)
  const queueGrew = Number.isInteger(pendingBefore) && Number.isInteger(totalPending) && totalPending > pendingBefore

  if (!touchedCount && queueGrew) {
    touchedCount = totalPending - pendingBefore
    touched = listNewestPendingDrafts(db, Math.min(touchedCount, 15))
  }

  if (!touchedCount) {
    if (totalPending > 0) {
      return `**Intake complete** — no drafts added or updated this cycle. ${totalPending} pending draft(s) remain in queue.`
    }
    return '**Intake complete** — no drafts added or updated this cycle, and the queue is empty.'
  }

  const queueDelta = Number.isInteger(pendingBefore) && Number.isInteger(totalPending)
    ? ` Queue: ${pendingBefore} -> ${totalPending}.`
    : ` ${totalPending} pending total.`
  const list = touched.map(d => `• [${d.type}|${d.lang}] ${d.id}: ${d.title || '(untitled)'}`)
  return `**Intake complete** — ${touchedCount} draft(s) added or updated this cycle.${queueDelta}\n${list.join('\n')}`
}

function countPendingDrafts(db) {
  const row = db.prepare(`SELECT COUNT(*) as n FROM drafts WHERE status = 'pending'`).get()
  return row?.n || 0
}

function countDraftsForRuns(db, runIds = []) {
  const ids = normalizeRunIds(runIds)
  if (!ids.length) return 0
  const placeholders = ids.map(() => '?').join(', ')
  const row = db.prepare(
    `SELECT COUNT(*) as n FROM drafts WHERE status = 'pending' AND run_id IN (${placeholders})`
  ).get(...ids)
  return row?.n || 0
}

function listDraftsForRuns(db, runIds = [], limit = 15) {
  const ids = normalizeRunIds(runIds)
  if (!ids.length) return []
  const placeholders = ids.map(() => '?').join(', ')
  return db.prepare(
    `SELECT id, lang, type, title, source_url, content
     FROM drafts
     WHERE status = 'pending' AND run_id IN (${placeholders})
     ORDER BY updated_at DESC, created_at DESC
     LIMIT ?`
  ).all(...ids, limit)
}

function listNewestPendingDrafts(db, limit = 15) {
  return db.prepare(
    `SELECT id, lang, type, title, source_url, content
     FROM drafts
     WHERE status = 'pending'
     ORDER BY updated_at DESC, created_at DESC
     LIMIT ?`
  ).all(limit)
}

function normalizeRunIds(runIds) {
  if (!Array.isArray(runIds)) return []
  return runIds
    .map(id => Number(id))
    .filter(id => Number.isInteger(id) && id > 0)
}

function assertRunSuccess(type, result) {
  if (result?.status === 'success') return result
  const detail = result?.summary || result?.log?.trim()?.split(/\r?\n/).slice(-1)[0] || 'script failed'
  throw new Error(`${type} failed: ${detail}`)
}

async function executeDiscordTrigger(db, type) {
  if (type === 'intake') {
    const pendingBefore = countPendingDrafts(db)
    await ensureManifest()
    const intakeResult = assertRunSuccess('intake', await runScript(db, 'intake', ['--limit', '10']))
    const practitionersResult = assertRunSuccess('practitioners', await runScript(db, 'practitioners', ['--limit', '3']))
    assertRunSuccess('audit', await runScript(db, 'audit'))
    await commitSeen().catch(() => {})
    const pendingAfter = countPendingDrafts(db)
    return buildIntakeNotificationText(db, {
      runIds: [intakeResult.runId, practitionersResult.runId],
      pendingBefore,
      pendingAfter,
    })
  }

  if (type === 'perspective') {
    await ensureManifest()
    assertRunSuccess('synthesize', await runScript(db, 'synthesize'))
    assertRunSuccess('digest', await runScript(db, 'digest'))
    await commitPerspective().catch(() => {})
    return buildDigestNotificationText()
  }

  if (type === 'digest') {
    await ensureManifest()
    const result = assertRunSuccess('digest', await runScript(db, 'digest'))
    return `**digest** run complete (${result.status}).`
  }

  const result = assertRunSuccess(type, await runScript(db, type, []))
  return `**${type}** run complete (${result.status}).${result.summary ? ' ' + result.summary : ''}`
}

function buildDigestNotificationText({ digestPath } = {}) {
  const resolvedPath = digestPath || findLatestPerspectiveFile()
  if (!resolvedPath) return '**Perspective ready** — published digest file not found.'

  const raw = fs.readFileSync(resolvedPath, 'utf8')
  const { frontmatter, body } = parseFrontmatter(raw)
  const date = path.basename(resolvedPath, '.md')
  const title = frontmatter.title || `Perspective ${date}`
  const abstract = frontmatter.abstract ? `> ${frontmatter.abstract}\n\n` : ''
  const preview = body.trim().slice(0, 1400)
  return `**Perspective ready** — ${title}\nhttps://openflows.org/perspective/${date}/\n\n${abstract}${preview}`.slice(0, DISCORD_MAX)
}

function findLatestPerspectiveFile() {
  const dir = path.join(__dirname, '..', 'src', 'perspective')
  try {
    const files = fs.readdirSync(dir).filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    if (!files.length) return null
    files.sort().reverse()
    return path.join(dir, files[0])
  } catch {
    return null
  }
}

async function registerSlashCommands(client) {
  const guildId = process.env.DISCORD_GUILD_ID
  if (!guildId) {
    console.warn('[discord] DISCORD_GUILD_ID not set — slash commands not registered')
    return
  }

  const commands = [
    new SlashCommandBuilder()
      .setName('ask')
      .setDescription('Ask Peng a question about the knowledge base')
      .addStringOption(opt => opt.setName('question').setDescription('Your question').setRequired(true)),
    new SlashCommandBuilder()
      .setName('status')
      .setDescription('Show Openflows KB status'),
    new SlashCommandBuilder()
      .setName('queue')
      .setDescription('List pending drafts in the queue')
      .addStringOption(opt =>
        opt.setName('type').setDescription('Filter by type')
          .addChoices({ name: 'current', value: 'current' }, { name: 'circuit', value: 'circuit' }, { name: 'practitioner', value: 'practitioner' })
      )
      .addStringOption(opt =>
        opt.setName('lang').setDescription('Filter by language')
          .addChoices({ name: 'en', value: 'en' }, { name: 'zh', value: 'zh' })
      ),
    new SlashCommandBuilder()
      .setName('trigger')
      .setDescription('Trigger a Peng script run (authorized operators only)')
      .addStringOption(opt =>
        opt.setName('type').setDescription('Script type').setRequired(true)
          .addChoices(...ALLOWED_TRIGGER_TYPES.map(t => ({ name: t, value: t })))
      ),
  ].map(cmd => cmd.toJSON())

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN)
  try {
    await rest.put(Routes.applicationGuildCommands(client.application.id, guildId), { body: commands })
    console.log(`[discord] registered ${commands.length} slash commands in guild ${guildId}`)
  } catch (err) {
    console.error('[discord] slash command registration failed:', err.message)
  }
}

function initDiscord(db) {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.log('[discord] DISCORD_BOT_TOKEN not set — Discord bot disabled')
    return null
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  })

  client.once(Events.ClientReady, async () => {
    console.log(`[discord] Logged in as ${client.user.tag}`)
    await registerSlashCommands(client)
  })

  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return
    if (!client.user || !message.mentions.has(client.user)) return
    const question = message.content.replace(/<@!?\d+>/g, '').trim()
    if (!question) {
      await message.reply('Ask me something about the knowledge base.')
      return
    }
    try {
      await message.channel.sendTyping()
      await askPeng(db, {
        message,
        userId: message.author.id,
        question,
        isAuthorizedUser: isAuthorized(message.author.id),
      })
    } catch (err) {
      console.error('[discord] message handler error:', err.message)
      await message.reply(`Error: ${err.message}`.slice(0, 200))
    }
  })

  client.on(Events.InteractionCreate, async (interaction) => {
    try {
      if (interaction.isButton()) {
        await handleButtonInteraction(db, interaction)
        return
      }
      if (interaction.isChatInputCommand()) {
        await handleSlashCommand(db, client, interaction)
      }
    } catch (err) {
      console.error('[discord] interaction error:', err.message)
      const errMsg = `Error: ${err.message}`.slice(0, 200)
      try {
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: errMsg, ephemeral: true })
        } else {
          await interaction.reply({ content: errMsg, ephemeral: true })
        }
      } catch {}
    }
  })

  client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
    console.error('[discord] login failed:', err.message)
  })

  return {
    notify: (type, data) => postNotification(client, type, data).catch(err => {
      console.error('[discord] notify error:', err.message)
    }),
  }
}

module.exports = {
  initDiscord,
  buildIntakeNotificationText,
  buildDigestNotificationText,
  buildIntakeEmbed,
  buildIntakeUrlPosts,
  buildDigestEmbed,
  buildErrorEmbed,
  findLatestPerspectiveFile,
  executeDiscordTrigger,
}
