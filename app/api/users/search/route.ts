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
  const queryStr = searchParams.get('q')
  const excludeUsername = searchParams.get('exclude')

  if (!queryStr) {
    return NextResponse.json({ users: [] })
  }

  try {
    const searchPattern = `%${queryStr.trim().toLowerCase()}%`
    const [users] = await pool.query(
      'SELECT username FROM users WHERE username LIKE ? AND username != ? LIMIT 15',
      [searchPattern, excludeUsername || '']
    ) as any[]

    const usernames = users.map((u: any) => u.username)
    return NextResponse.json({ users: usernames })
  } catch (error: any) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Failed to search users', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
