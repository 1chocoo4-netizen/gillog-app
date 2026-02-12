'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { AuthGuard } from '@/components/AuthGuard'

function LessonContent() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-slate-900">
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </button>
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 flex items-center justify-center min-h-screen">
        <p className="text-white/30 text-sm">레슨 준비중</p>
      </div>
    </main>
  )
}

export default function LessonPage() {
  return (
    <AuthGuard>
      <LessonContent />
    </AuthGuard>
  )
}
