import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { findFirst, insert } from '@/lib/db'

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex')
  return `${salt}:${hash}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, password, name, gender, age, email, phone } = body

    if (!username || !password || !name || !gender || !age || !email || !phone) {
      return NextResponse.json({ error: '모든 항목을 입력해주세요.' }, { status: 400 })
    }

    // 중복 username 체크
    const existing = findFirst<{ id: string }>('SELECT id FROM User WHERE username = ?', [username])
    if (existing) {
      return NextResponse.json({ error: '이미 사용 중인 아이디입니다.' }, { status: 409 })
    }

    // 중복 email 체크
    const existingEmail = findFirst<{ id: string }>('SELECT id FROM User WHERE email = ?', [email])
    if (existingEmail) {
      return NextResponse.json({ error: '이미 사용 중인 이메일입니다.' }, { status: 409 })
    }

    const passwordHash = hashPassword(password)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    insert('User', {
      id,
      username,
      passwordHash,
      email,
      name,
      role: 'student',
      xp: 0,
      level: 1,
      streakDays: 0,
      createdAt: now,
      updatedAt: now,
    })

    return NextResponse.json({
      user: { id, username, name, gender, age, email, phone },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: '회원가입 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
