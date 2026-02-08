import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { findFirst } from '@/lib/db'

interface UserRow {
  id: string
  username: string
  passwordHash: string
  email: string
  name: string
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const verify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex')
  return hash === verify
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: '아이디와 비밀번호를 입력해주세요.' }, { status: 400 })
    }

    const user = findFirst<UserRow>(
      'SELECT id, username, passwordHash, email, name FROM User WHERE username = ?',
      [username]
    )

    if (!user) {
      return NextResponse.json({ error: '존재하지 않는 아이디입니다.' }, { status: 401 })
    }

    if (!verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: '로그인 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
