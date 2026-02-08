'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MapArea } from '@/components/map/MapArea'
import { WorldKey } from '@/components/map/WorldTokens'
import { login, isLoggedIn } from '@/lib/auth'

export default function SignupPage() {
  const router = useRouter()
  const [selectedWorld] = useState<WorldKey>('cognition')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    gender: '' as 'male' | 'female' | 'other' | '',
    age: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/checkin')
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.username || !formData.password || !formData.name || !formData.gender || !formData.age || !formData.email || !formData.phone) {
      setError('모든 항목을 입력해주세요.')
      return
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (formData.password.length < 4) {
      setError('비밀번호는 4자 이상이어야 합니다.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          gender: formData.gender,
          age: parseInt(formData.age, 10),
          email: formData.email,
          phone: formData.phone,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '회원가입에 실패했습니다.')
        return
      }

      // 회원가입 성공 시 자동 로그인
      login({
        username: data.user.username,
        name: data.user.name,
        gender: data.user.gender,
        age: data.user.age,
        email: data.user.email,
        phone: data.user.phone,
      })
      router.push('/checkin')
    } catch {
      setError('서버 연결에 실패했습니다.')
    } finally {
      setLoading(false)
    }
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

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 아이디 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">아이디</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="아이디를 입력하세요"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">비밀번호</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label className="block text-white/70 text-sm mb-2">비밀번호 확인</label>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

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
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity mt-6 disabled:opacity-50"
              >
                {loading ? '가입 중...' : '가입하기'}
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
