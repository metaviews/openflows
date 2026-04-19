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
} = require('discord.js')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const { TOOL_DEFS, executeToolCall, partitionToolCalls, summarizeToolCall } = require('./lib/peng-tools')
const { loadManifest } = require('./lib/manifest')
const { buildStatusData } = require('./routes/status')
const { buildQueueContext } = require('./lib/drafts')
const { runScript } = require('./lib/runner')

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MAX_TOOL_ROUNDS = 4
const CONFIRMATION_TTL_MS = 10 * 60 * 1000
const MAX_HISTORY = 20
const DISCORD_MAX = 1990

const channelHistory = new Map()
const pendingConfirmations = new Map()

const ALLOWED_TRIGGER_TYPES = ['intake', 'synthesize', 'digest', 'audit', 'refresh', 'practitioners']

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
tags: [currency]
permalink: /currency/currents/kebab-case-unique-id/
abstract: "One or two sentence summary — required."
---

Body prose here. Substantive, not thin. Include a linkage check — reference related currencyIds and add links frontmatter if strong connections exist. Add a mediation block when AI materially shaped the content.`

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
      try {
        const result = await runScript(db, type, [])
        const channelId = process.env.DISCORD_CHANNEL_ID
        if (channelId) {
          const channel = await client.channels.fetch(channelId).catch(() => null)
          if (channel) {
            await channel.send(`**${type}** run complete (${result.status}).${result.summary ? ' ' + result.summary : ''}`)
          }
        }
      } catch (err) {
        console.error(`[discord] trigger ${type} error:`, err.message)
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
    const { db, runId } = data
    if (!runId) return
    const drafts = db.prepare(
      `SELECT id, lang, type, title FROM drafts WHERE run_id = ? ORDER BY created_at LIMIT 15`
    ).all(runId)
    if (!drafts.length) {
      await channel.send('**Intake complete** — no new drafts this run.')
      return
    }
    const list = drafts.map(d => `• [${d.type}|${d.lang}] ${d.id}: ${d.title || '(untitled)'}`)
    await channel.send(`**Intake complete** — ${drafts.length} new draft(s):\n${list.join('\n')}`.slice(0, DISCORD_MAX))
    return
  }

  if (type === 'digest') {
    const digestPath = findLatestDigest()
    if (!digestPath) {
      await channel.send('**Perspective ready** — digest file not found.')
      return
    }
    const content = fs.readFileSync(digestPath, 'utf8').slice(0, 1800)
    await channel.send(`**Perspective ready**\n\n${content}`)
    return
  }

  if (type === 'error') {
    await channel.send(`**Run error** — ${data.type || 'unknown'}: ${data.error || 'unknown error'}`.slice(0, DISCORD_MAX))
  }
}

function findLatestDigest() {
  const dir = path.join(__dirname, '..', 'drafts')
  try {
    const files = fs.readdirSync(dir).filter(f => f.startsWith('digest-') && f.endsWith('.md'))
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

module.exports = { initDiscord }
