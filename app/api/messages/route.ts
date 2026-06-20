import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import pool from '../../db/mysql'

const JWT_SECRET = process.env.JWT_SECRET || 'comet-secret-jwt-token-key-change-me'

async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    if (!token) return null
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string }
  } catch {
    return null
  }
}

// 1. GET: Retrieve messages
export async function GET(request: Request) {
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const usernameA = searchParams.get('a')
  const usernameB = searchParams.get('b')

  if (!usernameA || !usernameB) {
    return NextResponse.json(
      { error: 'Both sender and recipient usernames are required' },
      { status: 400 }
    )
  }

  try {
    const threadId = [usernameA, usernameB].sort().join(':')
    const [messages] = await pool.query(
      'SELECT * FROM messages WHERE threadId = ? ORDER BY id ASC',
      [threadId]
    ) as any[]

    return NextResponse.json({ messages })
  } catch (error: any) {
    console.error('Get messages API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}

// 2. POST: Send/Save message
export async function POST(request: Request) {
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { senderUsername, recipientUsername, content } = await request.json()

    if (!senderUsername || !recipientUsername || !content) {
      return NextResponse.json(
        { error: 'Sender, recipient, and content are required' },
        { status: 400 }
      )
    }

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

    return NextResponse.json({ message: savedMessage })
  } catch (error: any) {
    console.error('Send message API error:', error)
    return NextResponse.json(
      { error: 'Failed to save message', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
