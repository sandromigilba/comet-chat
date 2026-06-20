import { NextResponse } from 'next/server'
import pool from '../../../db/mysql'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ exists: false })
  }

  try {
    const [rows] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username.trim().toLowerCase()]
    ) as any[]

    return NextResponse.json({ exists: rows.length > 0 })
  } catch (error) {
    console.error('Check user existence API error:', error)
    return NextResponse.json({ exists: false })
  }
}
