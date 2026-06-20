import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../../db/mysql'

const JWT_SECRET = process.env.JWT_SECRET || 'comet-secret-jwt-token-key-change-me'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    const normalizedUsername = username.trim().toLowerCase()

    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [normalizedUsername]) as any[]
    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    const user = users[0]

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' })

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return NextResponse.json({ ok: true, user: { id: user.id, username: user.username } })
  } catch (error: any) {
    console.error('Login API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error during login',
        details: error?.message || String(error)
      },
      { status: 500 }
    )
  }
}
