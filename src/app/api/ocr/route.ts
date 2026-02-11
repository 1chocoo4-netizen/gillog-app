import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  try {
    const { imageBase64, mimeType } = await req.json()

    if (!imageBase64) {
      return NextResponse.json({ error: '이미지가 없습니다.' }, { status: 400 })
    }

    const requestBody = JSON.stringify({
      contents: [{
        parts: [
          { text: '이 이미지에 있는 텍스트를 모두 읽어서 그대로 텍스트로 변환해줘. 텍스트만 출력하고 다른 설명은 하지 마.' },
          { inline_data: { mime_type: mimeType, data: imageBase64 } },
        ],
      }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 16384,
      },
    })

    let response: Response | null = null
    for (let attempt = 0; attempt < 5; attempt++) {
      response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      })
      if (response.status !== 429) break
      const wait = 3000 * Math.pow(2, attempt)
      console.log(`Gemini OCR 429, retry ${attempt + 1}/5 (${wait/1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      console.error('Gemini OCR error:', await response?.text() || 'No response')
      return NextResponse.json({ error: '텍스트 추출에 실패했습니다.' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return NextResponse.json({ text })
  } catch (error) {
    console.error('OCR API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
