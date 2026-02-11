'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, Mail, ClipboardCheck } from 'lucide-react'
import { useUserData } from '@/lib/UserDataProvider'
import { useSession, signOut } from 'next-auth/react'

interface SurveyResult {
  milestone: number
  careerScore: number
  communityScore: number
  nonCognitiveScore: number
  totalScore: number
  createdAt: string
}

const AREA_CONFIG = [
  { key: 'careerScore' as const, label: '진로', color: '#6366f1', icon: '🧭' },
  { key: 'communityScore' as const, label: '공동체', color: '#10b981', icon: '🤝' },
  { key: 'nonCognitiveScore' as const, label: '인성', color: '#f59e0b', icon: '💪' },
]

export function LevelBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const { levelData } = useUserData()
  const { data: session } = useSession()
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([])
  const [surveyLoading, setSurveyLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setSurveyLoading(true)
    fetch('/api/survey')
      .then(res => res.json())
      .then(data => setSurveyResults(data.results ?? []))
      .catch(() => {})
      .finally(() => setSurveyLoading(false))
  }, [isOpen])

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      signOut({ callbackUrl: '/login' })
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform overflow-hidden"
      >
        {session?.user?.image ? (
          <img src={session.user.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          (session?.user?.name || '?').charAt(0)
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[20%] z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10 max-h-[70vh] overflow-y-auto">
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* 프로필 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center overflow-hidden mb-3">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="프로필" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-white text-3xl font-bold">
                        {(session?.user?.name || '?').charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-white font-bold text-lg">{session?.user?.name || '사용자'}</p>
                  {session?.user?.email && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      <p className="text-white/40 text-sm">{session.user.email}</p>
                    </div>
                  )}
                </div>

                {/* 설문조사 결과 */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 mb-3">
                    <ClipboardCheck className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-white/80 text-xs font-semibold">설문조사 결과</span>
                  </div>

                  {surveyLoading ? (
                    <p className="text-white/30 text-xs text-center py-3">불러오는 중...</p>
                  ) : surveyResults.length === 0 ? (
                    <p className="text-white/30 text-xs text-center py-3">아직 설문 결과가 없습니다</p>
                  ) : (
                    <div className="space-y-4">
                      {surveyResults.map((result) => (
                        <div key={result.milestone} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-medium text-violet-300 bg-violet-500/15 px-1.5 py-0.5 rounded-full">
                              {result.milestone}회 달성
                            </span>
                            <span className="text-[10px] text-white/25">
                              {new Date(result.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                          </div>

                          {AREA_CONFIG.map((area) => (
                            <div key={area.key} className="space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] text-white/50">{area.icon} {area.label}</span>
                                <span className="text-[11px] text-white/70 font-medium">{result[area.key]}점</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: area.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result[area.key]}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center justify-between pt-1 border-t border-white/5">
                            <span className="text-[11px] text-white/50">종합</span>
                            <span className="text-xs font-bold text-white">{result.totalScore}점</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 로그아웃 */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 mt-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
