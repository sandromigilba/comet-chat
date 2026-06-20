import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import pool from '../../../db/mysql'

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

export async function GET(request: Request) {
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
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
    return NextResponse.json({ peers })
  } catch (error: any) {
    console.error('Recent threads API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recent threads', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
