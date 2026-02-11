'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

export default function CoachVerifyPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [checking, setChecking] = useState(true)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    fetch('/api/coach-verify')
      .then((res) => res.json())
      .then((data) => {
        if (data.allowed) {
          router.push('/dashboard/b2b')
        } else {
          setDenied(true)
          setChecking(false)
        }
      })
      .catch(() => {
        setDenied(true)
        setChecking(false)
      })
  }, [status, router])

  if (status === 'loading' || checking) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">코치 인증 확인 중...</p>
        </div>
      </main>
    )
  }

  if (denied) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 max-w-sm w-full text-center">
          <div className="text-4xl mb-4">🚫</div>
          <h1 className="text-xl font-bold text-white mb-2">등록되지 않은 이메일입니다</h1>
          <p className="text-white/50 text-sm mb-2">
            현재 로그인: <span className="text-white/70">{session?.user?.email}</span>
          </p>
          <p className="text-white/40 text-xs mb-6">
            기관/코치 접속은 관리자가 사전 등록한 이메일만 가능합니다.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/login')}
              className="w-full py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition-colors text-sm"
            >
              로그인으로 돌아가기
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full py-3 rounded-xl bg-slate-700 text-white/70 font-medium hover:bg-slate-600 transition-colors text-sm"
            >
              다른 계정으로 로그인
            </button>
          </div>
        </div>
      </main>
    )
  }

  return null
}
