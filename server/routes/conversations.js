'use strict'

async function conversationRoutes(fastify) {
  fastify.get('/conversations', async (req, reply) => {
    const conversations = fastify.db.prepare(`
      SELECT id, messages, created_at, updated_at
      FROM conversations
      ORDER BY created_at DESC
      LIMIT ?
    `).all(Math.min(parseInt(req.query.limit) || 20, 100))
      .map(summarizeConversation)

    if (req.headers['hx-request']) {
      return reply.view('partials/conversations.njk', { conversations })
    }
    return reply.send({ conversations })
  })

  fastify.get('/conversations/:id', async (req, reply) => {
    const row = fastify.db.prepare('SELECT * FROM conversations WHERE id = ?').get(req.params.id)
    if (!row) return reply.code(404).send({ error: 'Conversation not found' })
    return reply.send({ conversation: { ...summarizeConversation(row), messages: parseMessages(row.messages) } })
  })
}

function summarizeConversation(row) {
  const messages = parseMessages(row.messages)
  const firstUser = messages.find(message => message.role === 'user')
  return {
    id: row.id,
    title: String(firstUser?.content || 'Conversation').slice(0, 90),
    turns: messages.length,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

function parseMessages(raw) {
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

module.exports = conversationRoutes
