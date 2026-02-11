import { NextRequest, NextResponse } from 'next/server'
import { Storage } from '@google-cloud/storage'
import { auth } from '@/lib/auth'

export const maxDuration = 30

const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID?.trim(),
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL?.trim(),
    private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

const BUCKET_NAME = (process.env.GCS_BUCKET_NAME || '').trim()

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  if (!BUCKET_NAME || !process.env.GCS_CLIENT_EMAIL) {
    return NextResponse.json({ error: '스토리지가 설정되지 않았습니다.' }, { status: 500 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
    }

    // 이미지 파일만 허용
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: '이미지 파일만 업로드 가능합니다.' }, { status: 400 })
    }

    // 10MB 제한
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: '파일 크기는 10MB 이하만 가능합니다.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `gillog/${session.user.id}/${Date.now()}-${Math.random().toString(36).substr(2, 6)}.${ext}`

    const bucket = storage.bucket(BUCKET_NAME)
    const blob = bucket.file(fileName)

    await blob.save(buffer, {
      contentType: file.type,
    })

    // 비공개 버킷 → Signed URL (10년 유효, V2)
    const [signedUrl] = await blob.getSignedUrl({
      version: 'v2',
      action: 'read',
      expires: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000,
    })

    return NextResponse.json({ url: signedUrl })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Upload error:', msg)
    return NextResponse.json({ error: `업로드 실패: ${msg.slice(0, 100)}` }, { status: 500 })
  }
}
