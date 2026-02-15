import { auth } from '@/lib/auth-config'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export async function POST() {
  const session = await auth()
  if (!session?.user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'No API key configured' }), { status: 500 })
  }

  return Response.json({ apiKey: GEMINI_API_KEY })
}
