'use client'

import { useState, useEffect, useCallback } from 'react'

interface Coach {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export default function AdminCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchCoaches = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/coaches')
      const text = await res.text()
      if (res.ok) {
        const data = JSON.parse(text)
        setCoaches(data.coaches)
        setError('')
      } else {
        try {
          const data = JSON.parse(text)
          setError(`목록 조회 실패: ${data.error}`)
        } catch {
          setError(`목록 조회 실패 (${res.status})`)
        }
      }
    } catch (err) {
      setError(`네트워크 오류: ${err}`)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCoaches()
  }, [fetchCoaches])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/coaches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || null }),
      })

      if (res.ok) {
        setEmail('')
        setName('')
        fetchCoaches()
      } else {
        const text = await res.text()
        try {
          const data = JSON.parse(text)
          setError(data.error || '등록 실패')
        } catch {
          setError(`등록 실패 (${res.status})`)
        }
      }
    } catch (err) {
      console.error('코치 등록 에러:', err)
      setError('네트워크 오류가 발생했습니다')
    }
    setSubmitting(false)
  }

  const handleDelete = async (coachEmail: string) => {
    if (!confirm(`${coachEmail}을(를) 삭제하시겠습니까?`)) return

    await fetch('/api/admin/coaches', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: coachEmail }),
    })

    fetchCoaches()
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-1">코치 관리</h1>
      <p className="text-gray-400 text-sm mb-6">기관/코치 로그인이 허용된 이메일을 관리합니다</p>

      {/* 이메일 추가 폼 */}
      <form onSubmit={handleAdd} className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
        <div className="flex gap-3 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray-400 mb-1">이메일 *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="coach@example.com"
              required
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs text-gray-400 mb-1">이름 (선택)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-500 transition-colors disabled:opacity-50"
          >
            {submitting ? '등록 중...' : '추가'}
          </button>
        </div>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </form>

      {/* 코치 목록 */}
      {loading ? (
        <p className="text-gray-500 text-sm">불러오는 중...</p>
      ) : coaches.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-1">등록된 코치가 없습니다</p>
          <p className="text-sm">위 폼에서 이메일을 추가하세요</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">이메일</th>
                <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">이름</th>
                <th className="text-left text-xs text-gray-400 font-medium px-4 py-3">등록일</th>
                <th className="text-right text-xs text-gray-400 font-medium px-4 py-3">작업</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((coach) => (
                <tr key={coach.id} className="border-b border-gray-700/50 last:border-0">
                  <td className="px-4 py-3 text-sm text-white">{coach.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{coach.name || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(coach.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(coach.email)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2 border-t border-gray-700 text-xs text-gray-500">
            총 {coaches.length}명
          </div>
        </div>
      )}
    </div>
  )
}
