import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'comet-secret-jwt-token-key-change-me'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string }
    return NextResponse.json({ user: { id: decoded.id, username: decoded.username } })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}
