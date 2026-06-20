import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool, { runMigrations } from '../../db/mysql'

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

    // Ensure database tables exist
    await runMigrations()

    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT id FROM users WHERE username = ?', [normalizedUsername]) as any[]
    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [normalizedUsername, hashedPassword])

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Registration API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error during registration',
        details: error?.message || String(error)
      },
      { status: 500 }
    )
  }
}
