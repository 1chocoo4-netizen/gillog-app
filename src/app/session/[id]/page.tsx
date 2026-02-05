import { AvatarPanel } from '@/components/coaching/AvatarPanel'
import { ChatInterface } from '@/components/coaching/ChatInterface'

interface SessionPageProps {
  params: Promise<{ id: string }>
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col">
      {/* 헤더 */}
      <header className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <a href="/app" className="text-white hover:text-gray-300">
          ← 나가기
        </a>
        <h1 className="text-white font-semibold">코칭 세션</h1>
        <span className="text-gray-400 text-sm">#{id}</span>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* 아바타 패널 (WebRTC 확장 대비) */}
        <div className="lg:w-1/2 p-4">
          <AvatarPanel />
        </div>

        {/* 채팅/텍스트 코칭 인터페이스 */}
        <div className="lg:w-1/2 flex flex-col bg-gray-800">
          <ChatInterface sessionId={id} />
        </div>
      </div>
    </main>
  )
}
