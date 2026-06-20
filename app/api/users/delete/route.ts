import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import pool from '../../../db/mysql'

const JWT_SECRET = process.env.JWT_SECRET || 'comet-secret-jwt-token-key-change-me'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string }

    // Delete user from database
    await pool.query('DELETE FROM users WHERE id = ?', [decoded.id])

    // Clear session cookie
    const response = NextResponse.json({ ok: true })
    response.cookies.set('token', '', { expires: new Date(0), path: '/' })
    return response
  } catch (error: any) {
    console.error('Delete account API error:', error)
    return NextResponse.json(
      { error: 'Internal server error during account deletion' },
      { status: 500 }
    )
  }
}
