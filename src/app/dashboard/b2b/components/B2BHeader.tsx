'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegisteredUser } from '@/lib/b2b/types'

type SearchStatus = 'idle' | 'searching' | 'found' | 'not_found' | 'consent_sent' | 'error'

interface SearchResult {
  userId: string
  name: string
  email: string
  consentStatus: 'none' | 'PENDING' | 'APPROVED' | 'DENIED' | 'REVOKED'
}

interface B2BHeaderProps {
  onSelectUser?: (user: RegisteredUser) => void
}

export function B2BHeader({ onSelectUser }: B2BHeaderProps) {
  // 등록하기 패널
  const [isRegOpen, setIsRegOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [result, setResult] = useState<SearchResult | null>(null)
  const regRef = useRef<HTMLDivElement>(null)

  // 리스트 패널
  const [isListOpen, setIsListOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const [users, setUsers] = useState<RegisteredUser[]>([])
  const [usersLoading, setUsersLoading] = useState(false)

  // 프리미엄 부여
  const [premiumModal, setPremiumModal] = useState<{ userId: string; name: string } | null>(null)
  const [premiumMonths, setPremiumMonths] = useState(1)
  const [premiumSubmitting, setPremiumSubmitting] = useState(false)
  const [premiumMsg, setPremiumMsg] = useState('')

  async function handleGrantPremium() {
    if (!premiumModal) return
    setPremiumSubmitting(true)
    setPremiumMsg('')
    try {
      const res = await fetch('/api/b2b/premium-grant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: premiumModal.userId, months: premiumMonths }),
      })
      const data = await res.json()
      if (res.ok) {
        setPremiumMsg(data.message)
        setTimeout(() => {
          setPremiumModal(null)
          setPremiumMsg('')
        }, 2000)
      } else {
        setPremiumMsg(data.error || '부여 실패')
      }
    } catch {
      setPremiumMsg('네트워크 오류')
    } finally {
      setPremiumSubmitting(false)
    }
  }

  // 실제 DB에서 동의한 사용자 목록 불러오기
  const fetchUsers = useCallback(async () => {
    setUsersLoading(true)
    try {
      const res = await fetch('/api/b2b/users')
      if (res.ok) {
        const data = await res.json()
        if (data.users) setUsers(data.users)
      }
    } catch {} finally {
      setUsersLoading(false)
    }
  }, [])

  // 리스트 열 때마다 새로고침
  useEffect(() => {
    if (isListOpen) fetchUsers()
  }, [isListOpen, fetchUsers])

  // 동의 요청 성공 시 리스트 새로고침
  useEffect(() => {
    if (status === 'consent_sent') fetchUsers()
  }, [status, fetchUsers])

  // 바깥 클릭 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (regRef.current && !regRef.current.contains(e.target as Node)) setIsRegOpen(false)
      if (listRef.current && !listRef.current.contains(e.target as Node)) setIsListOpen(false)
    }
    if (isRegOpen || isListOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isRegOpen, isListOpen])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('searching')
    setResult(null)
    try {
      const res = await fetch(`/api/b2b/consent/search?email=${encodeURIComponent(email.trim())}`)
      if (res.ok) {
        const data = await res.json()
        setResult(data.user)
        setStatus('found')
      } else if (res.status === 404) {
        setStatus('not_found')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  async function handleRequestConsent() {
    if (!result) return
    setStatus('searching')
    try {
      const res = await fetch('/api/b2b/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: result.userId, institutionId: 'demo-institution' }),
      })
      if (res.ok) {
        setResult({ ...result, consentStatus: 'PENDING' })
        setStatus('consent_sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  function handleReset() {
    setEmail('')
    setStatus('idle')
    setResult(null)
  }

  const consentLabel: Record<string, { text: string; color: string }> = {
    PENDING: { text: '대기 중', color: 'text-yellow-400' },
    APPROVED: { text: '동의 완료', color: 'text-emerald-400' },
    DENIED: { text: '거부', color: 'text-red-400' },
    REVOKED: { text: '철회', color: 'text-slate-400' },
  }

  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* 왼쪽: 로고 */}
        <div className="flex items-center gap-3">
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            길로그
          </span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-sm font-medium text-gray-300 hidden sm:inline">실행 DNA 리포트</span>
        </div>

        {/* 오른쪽: 리스트 + 등록하기 + ISO */}
        <div className="flex items-center gap-2">

          {/* ===== 리스트 아이콘 ===== */}
          <div className="relative" ref={listRef}>
            <button
              onClick={() => { setIsListOpen(!isListOpen); setIsRegOpen(false) }}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
                isListOpen ? 'bg-violet-500/20 text-violet-300' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
              title="등록된 사용자 목록"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-[10px] leading-none font-medium">리스트</span>
            </button>

            <AnimatePresence>
              {isListOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="fixed sm:absolute right-2 sm:right-0 left-2 sm:left-auto top-16 sm:top-full sm:mt-2 w-auto sm:w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-800">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      등록된 사용자 ({users.length}명)
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {usersLoading ? (
                      <div className="py-8 text-center text-sm text-gray-500">불러오는 중...</div>
                    ) : users.length === 0 ? (
                      <div className="py-8 text-center text-sm text-gray-500">등록된 사용자가 없습니다.<br /><span className="text-xs text-gray-600">등록하기에서 사용자를 추가하세요.</span></div>
                    ) : (
                      users.map((u) => (
                        <div key={u.userId} className="px-4 py-3 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {u.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-200 truncate">{u.name}</span>
                                <span className={`text-[10px] font-medium ${consentLabel[u.consentStatus]?.color || 'text-gray-500'}`}>
                                  {consentLabel[u.consentStatus]?.text || u.consentStatus}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 truncate">{u.email}</div>
                              <div className="text-[10px] text-gray-600 mt-0.5">실행 {u.executionCount.toLocaleString()}회</div>
                            </div>
                            {u.consentStatus === 'APPROVED' && (
                              <div className="flex gap-1.5 flex-shrink-0">
                                <button
                                  onClick={() => {
                                    onSelectUser?.(u)
                                    setIsListOpen(false)
                                  }}
                                  className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg transition-colors"
                                >
                                  조회
                                </button>
                                <button
                                  onClick={() => {
                                    setPremiumModal({ userId: u.userId, name: u.name })
                                    setPremiumMonths(1)
                                    setPremiumMsg('')
                                  }}
                                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-medium rounded-lg transition-colors"
                                >
                                  프리미엄
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===== 등록하기 아이콘 ===== */}
          <div className="relative" ref={regRef}>
            <button
              onClick={() => { setIsRegOpen(!isRegOpen); setIsListOpen(false); if (!isRegOpen) handleReset() }}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
                isRegOpen ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
              title="사용자 검색 및 동의 요청"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] leading-none font-medium">등록하기</span>
            </button>

            <AnimatePresence>
              {isRegOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="fixed sm:absolute right-2 sm:right-0 left-2 sm:left-auto top-16 sm:top-full sm:mt-2 w-auto sm:w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-800">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      사용자 검색 및 동의 요청
                    </div>
                    <p className="text-xs text-gray-500 mt-1">이메일로 사용자를 검색하고 동의를 요청합니다.</p>
                  </div>

                  <form onSubmit={handleSearch} className="px-4 py-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="이메일 주소 입력"
                          className="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                          autoFocus
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'searching' || !email.trim()}
                        className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        {status === 'searching' ? (
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        ) : '검색'}
                      </button>
                    </div>
                  </form>

                  <div className="px-4 pb-4">
                    {status === 'not_found' && (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-400">해당 이메일의 사용자를 찾을 수 없습니다.</p>
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="text-center py-4">
                        <p className="text-sm text-red-400">오류가 발생했습니다.</p>
                      </div>
                    )}
                    {(status === 'found' || status === 'consent_sent') && result && (
                      <div className="bg-gray-800/50 rounded-lg p-3 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                            {result.name?.charAt(0) || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-200 truncate">{result.name}</div>
                            <div className="text-xs text-gray-500 truncate">{result.email}</div>
                          </div>
                        </div>
                        {result.consentStatus !== 'none' && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500">동의 상태:</span>
                            <span className={`font-medium ${consentLabel[result.consentStatus]?.color || 'text-gray-400'}`}>
                              {consentLabel[result.consentStatus]?.text || result.consentStatus}
                            </span>
                          </div>
                        )}
                        {(result.consentStatus === 'none' || result.consentStatus === 'DENIED' || result.consentStatus === 'REVOKED') && (
                          <button onClick={handleRequestConsent} className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium rounded-lg transition-colors">
                            동의 요청 보내기
                          </button>
                        )}
                        {result.consentStatus === 'PENDING' && (
                          <p className="text-xs text-yellow-400/80 text-center py-1">동의 요청이 전송되었습니다.</p>
                        )}
                      </div>
                    )}
                    {status === 'consent_sent' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-indigo-300 text-center">
                        동의 요청이 성공적으로 전송되었습니다.
                      </motion.p>
                    )}
                  </div>

                  <div className="px-4 py-2.5 border-t border-gray-800 bg-gray-900/50">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      동의 없이 개인 데이터는 조회할 수 없습니다.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ISO 뱃지 */}
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ISO 30414
          </span>
        </div>
      </div>

      {/* 프리미엄 부여 모달 */}
      <AnimatePresence>
        {premiumModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPremiumModal(null)}
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[60] m-auto w-80 h-fit bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-5"
            >
              <h3 className="text-white font-semibold mb-1">프리미엄 부여</h3>
              <p className="text-sm text-gray-400 mb-4">{premiumModal.name}님에게 프리미엄을 부여합니다</p>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1, 3, 6, 12].map(m => (
                  <button
                    key={m}
                    onClick={() => setPremiumMonths(m)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                      premiumMonths === m
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {m}개월
                  </button>
                ))}
              </div>

              {premiumMsg && (
                <p className={`text-sm mb-3 ${premiumMsg.includes('실패') || premiumMsg.includes('오류') || premiumMsg.includes('않은') ? 'text-red-400' : 'text-green-400'}`}>
                  {premiumMsg}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setPremiumModal(null)}
                  className="flex-1 py-2 bg-gray-800 text-gray-400 rounded-lg text-sm hover:bg-gray-700"
                >
                  취소
                </button>
                <button
                  onClick={handleGrantPremium}
                  disabled={premiumSubmitting}
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                >
                  {premiumSubmitting ? '처리 중...' : '부여하기'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
