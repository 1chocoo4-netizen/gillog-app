'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapArea } from '@/components/map/MapArea'
import { WorldKey } from '@/components/map/WorldTokens'
import { isLoggedIn } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [selectedWorld] = useState<WorldKey>('cognition')

  useEffect(() => {
    // 이미 로그인되어 있으면 앱으로 이동
    if (isLoggedIn()) {
      router.push('/app')
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 간단히 이메일로 기존 사용자 확인 (실제로는 서버 인증 필요)
    const savedUser = localStorage.getItem('gillog-user')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      if (user.email === email) {
        router.push('/app')
        return
      }
    }
    alert('등록된 계정이 없습니다. 회원가입을 해주세요.')
  }

  return (
    <main className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* 배경 맵 */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <MapArea
          selectedWorld={selectedWorld}
          onNodeClick={() => {}}
          onNodeEnter={() => {}}
        />
      </div>

      {/* 상단 헤더 (레벨/게이지 없음) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-center px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>
        </div>
      </header>

      {/* 로그인 폼 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h1 className="text-2xl font-bold text-white text-center mb-6">로그인</h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
              >
                로그인
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/50 text-sm mb-3">아직 계정이 없으신가요?</p>
              <Link
                href="/signup"
                className="inline-block w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                회원가입
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
