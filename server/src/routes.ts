import { Router, type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from './db.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'comet-secret-jwt-token-key-change-me'

// Middleware to authenticate requests based on the JWT token inside the cookie
export async function authenticateToken(req: Request, res: Response, next: any) {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string }
    ;(req as any).user = decoded
    next()
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden: Invalid token' })
  }
}

// 1. Register User
router.post('/api/register', async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const normalizedUsername = username.trim().toLowerCase()

  try {
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE username = ?', [normalizedUsername]) as any[]
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Username already taken' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [normalizedUsername, hashedPassword])

    return res.json({ ok: true })
  } catch (error: any) {
    console.error('Registration error:', error)
    return res.status(500).json({
      error: 'Internal server error during registration',
      details: error?.message || String(error)
    })
  }
})

// 2. Login User
router.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const normalizedUsername = username.trim().toLowerCase()

  try {
    // Find user
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [normalizedUsername]) as any[]
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    const user = users[0]

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // in production set to true
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return res.json({ ok: true, user: { id: user.id, username: user.username } })
  } catch (error: any) {
    console.error('Login error:', error)
    return res.status(500).json({
      error: 'Internal server error during login',
      details: error?.message || String(error)
    })
  }
})

// 3. Logout User
router.post('/api/logout', (req: Request, res: Response) => {
  res.clearCookie('token')
  return res.json({ ok: true })
})

// 4. Get Current User Session
router.get('/api/session', (req: Request, res: Response) => {
  const token = req.cookies?.token
  if (!token) {
    return res.json({ user: null })
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string }
    return res.json({ user: { id: decoded.id, username: decoded.username } })
  } catch (error) {
    return res.json({ user: null })
  }
})

// 5. Search Users
router.get('/api/users/search', authenticateToken, async (req: Request, res: Response) => {
  const queryStr = req.query.q as string
  const excludeUsername = req.query.exclude as string

  if (!queryStr) {
    return res.json({ users: [] })
  }

  try {
    const searchPattern = `%${queryStr.trim().toLowerCase()}%`
    const [users] = await pool.query(
      'SELECT username FROM users WHERE username LIKE ? AND username != ? LIMIT 15',
      [searchPattern, excludeUsername || '']
    ) as any[]

    const usernames = users.map((u: any) => u.username)
    return res.json({ users: usernames })
  } catch (error) {
    console.error('Search error:', error)
    return res.status(500).json({ error: 'Failed to search users' })
  }
})

// 6. Get Recent Chat Peers
router.get('/api/threads/recent', authenticateToken, async (req: Request, res: Response) => {
  const username = req.query.username as string

  if (!username) {
    return res.status(400).json({ error: 'Username is required' })
  }

  try {
    const [rows] = await pool.query(`
      SELECT peer, MAX(id) as max_id FROM (
        SELECT recipientUsername AS peer, id FROM messages WHERE senderUsername = ?
        UNION
        SELECT senderUsername AS peer, id FROM messages WHERE recipientUsername = ?
      ) AS combined
      GROUP BY peer
      ORDER BY max_id DESC;
    `, [username, username]) as any[]

    const peers = rows.map((r: any) => r.peer)
    return res.json({ peers })
  } catch (error) {
    console.error('Recent peers error:', error)
    return res.status(500).json({ error: 'Failed to fetch recent peers' })
  }
})

// 7. Get Messages Between Two Users
router.get('/api/messages', authenticateToken, async (req: Request, res: Response) => {
  const usernameA = req.query.a as string
  const usernameB = req.query.b as string

  if (!usernameA || !usernameB) {
    return res.status(400).json({ error: 'Both sender and recipient usernames are required' })
  }

  try {
    const threadId = [usernameA, usernameB].sort().join(':')
    const [messages] = await pool.query(
      'SELECT * FROM messages WHERE threadId = ? ORDER BY id ASC',
      [threadId]
    ) as any[]

    return res.json({ messages })
  } catch (error) {
    console.error('Get messages error:', error)
    return res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

// 8. Send / Save New Message
router.post('/api/messages', authenticateToken, async (req: Request, res: Response) => {
  const { senderUsername, recipientUsername, content } = req.body

  if (!senderUsername || !recipientUsername || !content) {
    return res.status(400).json({ error: 'Sender, recipient, and content are required' })
  }

  try {
    const threadId = [senderUsername, recipientUsername].sort().join(':')
    const createdAt = Date.now()

    const [result] = await pool.query(
      'INSERT INTO messages (threadId, senderUsername, recipientUsername, content, createdAt) VALUES (?, ?, ?, ?, ?)',
      [threadId, senderUsername, recipientUsername, content, createdAt]
    ) as any

    const messageId = result.insertId

    const savedMessage = {
      id: messageId,
      threadId,
      senderUsername,
      recipientUsername,
      content,
      createdAt
    }

    const io = req.app.get('io')
    if (io) {
      const senderRoom = senderUsername.trim().toLowerCase()
      const recipientRoom = recipientUsername.trim().toLowerCase()
      io.to(senderRoom).to(recipientRoom).emit('message', savedMessage)
    }

    return res.json({ message: savedMessage })
  } catch (error) {
    console.error('Send message error:', error)
    return res.status(500).json({ error: 'Failed to save message' })
  }
})

export default router
