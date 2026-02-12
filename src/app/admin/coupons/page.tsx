'use client'

import { useState, useEffect, useCallback } from 'react'

interface Redemption {
  userId: string
  redeemedAt: string
}

interface Coupon {
  id: string
  code: string
  description: string | null
  durationDays: number
  maxUses: number
  currentUses: number
  isActive: boolean
  expiresAt: string | null
  createdAt: string
  redemptions: Redemption[]
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 생성 폼
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')
  const [durationDays, setDurationDays] = useState(30)
  const [maxUses, setMaxUses] = useState(100)
  const [expiresAt, setExpiresAt] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 펼쳐보기
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const fetchCoupons = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/coupons')
      const data = await res.json()
      if (res.ok) {
        setCoupons(data)
      } else {
        setError(`쿠폰 목록을 불러올 수 없습니다 (${res.status}: ${data.error || 'Unknown error'})`)
      }
    } catch {
      setError('네트워크 오류')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoupons()
  }, [fetchCoupons])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim()) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          description: description.trim() || null,
          durationDays,
          maxUses,
          expiresAt: expiresAt || null,
        }),
      })

      if (res.ok) {
        setCode('')
        setDescription('')
        setDurationDays(30)
        setMaxUses(100)
        setExpiresAt('')
        fetchCoupons()
      } else {
        const data = await res.json()
        setError(data.error || '생성 실패')
      }
    } catch {
      setError('네트워크 오류')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleToggleActive(coupon: Coupon) {
    await fetch('/api/admin/coupons', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: coupon.id, isActive: !coupon.isActive }),
    })
    fetchCoupons()
  }

  async function handleDelete(id: string) {
    if (!confirm('정말 삭제하시겠습니까?')) return
    await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' })
    fetchCoupons()
  }

  if (loading) {
    return <div className="p-8 text-gray-500">로딩 중...</div>
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">쿠폰 관리</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      {/* 쿠폰 생성 폼 */}
      <form onSubmit={handleCreate} className="mb-8 p-5 bg-white border rounded-xl shadow-sm space-y-4">
        <h2 className="font-semibold text-lg">새 쿠폰 생성</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">쿠폰 코드 *</label>
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="예: WELCOME2026"
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="예: 신규 가입 이벤트"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">기간 (일)</label>
            <input
              type="number"
              value={durationDays}
              onChange={e => setDurationDays(Number(e.target.value))}
              min={1}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">최대 사용 수</label>
            <input
              type="number"
              value={maxUses}
              onChange={e => setMaxUses(Number(e.target.value))}
              min={1}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">만료일 (선택)</label>
            <input
              type="date"
              value={expiresAt}
              onChange={e => setExpiresAt(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
        >
          {submitting ? '생성 중...' : '쿠폰 생성'}
        </button>
      </form>

      {/* 쿠폰 목록 */}
      <h2 className="font-semibold text-lg mb-3">쿠폰 목록 ({coupons.length}개)</h2>
      <div className="space-y-3">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg">
                  {coupon.code}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {coupon.isActive ? '활성' : '비활성'}
                </span>
                {coupon.description && (
                  <span className="text-sm text-gray-500">{coupon.description}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {coupon.currentUses}/{coupon.maxUses} 사용
                </span>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-500">{coupon.durationDays}일</span>
                <button
                  onClick={() => handleToggleActive(coupon)}
                  className={`text-xs px-3 py-1 rounded-lg ${coupon.isActive ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}
                >
                  {coupon.isActive ? '비활성화' : '활성화'}
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-50 text-red-600"
                >
                  삭제
                </button>
                <button
                  onClick={() => setExpandedId(expandedId === coupon.id ? null : coupon.id)}
                  className="text-xs px-3 py-1 rounded-lg bg-blue-50 text-blue-600"
                >
                  {expandedId === coupon.id ? '접기' : '사용 내역'}
                </button>
              </div>
            </div>

            {/* 사용 내역 펼치기 */}
            {expandedId === coupon.id && (
              <div className="mt-3 pt-3 border-t">
                {coupon.redemptions.length === 0 ? (
                  <p className="text-sm text-gray-400">아직 사용 내역이 없습니다</p>
                ) : (
                  <div className="space-y-1">
                    {coupon.redemptions.map((r, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="font-mono text-xs">{r.userId.slice(0, 8)}...</span>
                        <span className="text-gray-400">{new Date(r.redeemedAt).toLocaleString('ko-KR')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {coupons.length === 0 && (
          <p className="text-gray-400 text-center py-8">등록된 쿠폰이 없습니다</p>
        )}
      </div>
    </div>
  )
}
