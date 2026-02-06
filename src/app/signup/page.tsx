'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MapArea } from '@/components/map/MapArea'
import { WorldKey } from '@/components/map/WorldTokens'
import { login, isLoggedIn, User } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const [selectedWorld] = useState<WorldKey>('cognition')

  const [formData, setFormData] = useState({
    name: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    age: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/app')
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.gender || !formData.age || !formData.email || !formData.phone) {
      alert('모든 항목을 입력해주세요.')
      return
    }

    const user: User = {
      name: formData.name,
      gender: formData.gender as 'male' | 'female' | 'other',
      age: parseInt(formData.age, 10),
      email: formData.email,
      phone: formData.phone
    }

    login(user)
    router.push('/app')
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

      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/login" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* 회원가입 폼 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h1 className="text-2xl font-bold text-white text-center mb-6">회원가입</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 이름 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력하세요"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* 성별 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">성별</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none"
                >
                  <option value="" className="bg-slate-800">선택하세요</option>
                  <option value="male" className="bg-slate-800">남성</option>
                  <option value="female" className="bg-slate-800">여성</option>
                  <option value="other" className="bg-slate-800">기타</option>
                </select>
              </div>

              {/* 나이 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">나이</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="나이를 입력하세요"
                  min="1"
                  max="120"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력하세요"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* 전화번호 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">전화번호</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity mt-6"
              >
                가입하기
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-white/50 text-sm">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="text-violet-400 hover:underline">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
