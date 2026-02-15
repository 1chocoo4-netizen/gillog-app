'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, LogOut, Mail, ShieldOff } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { BottomTabBar } from '@/components/BottomTabBar'
import { useUserData } from '@/lib/UserDataProvider'
import { useSession, signOut } from 'next-auth/react'

interface ApprovedConsent {
  id: string
  institutionId: string
}

function ProfileContent() {
  const router = useRouter()
  const { energy } = useUserData()
  const { data: session } = useSession()
  const [consents, setConsents] = useState<ApprovedConsent[]>([])
  const [revoking, setRevoking] = useState(false)
  const [revokeSuccess, setRevokeSuccess] = useState(false)

  const fetchConsents = useCallback(async () => {
    try {
      const res = await fetch('/api/b2b/consent/my/approved')
      if (!res.ok) return
      const data = await res.json()
      if (data.consents) setConsents(data.consents)
    } catch {}
  }, [])

  useEffect(() => {
    if (session?.user) fetchConsents()
  }, [session?.user, fetchConsents])

  async function handleRevoke(consentId: string) {
    if (!confirm('데이터 공유 동의를 철회하시겠습니까?\n철회 후 기관에서 더 이상 리포트를 열람할 수 없습니다.')) return
    setRevoking(true)
    try {
      const res = await fetch('/api/b2b/consent', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consentId, status: 'REVOKED' }),
      })
      if (res.ok) {
        setConsents((prev) => prev.filter((c) => c.id !== consentId))
        setRevokeSuccess(true)
        setTimeout(() => setRevokeSuccess(false), 2000)
      }
    } catch {} finally {
      setRevoking(false)
    }
  }

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      signOut({ callbackUrl: '/login' })
    }
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 상단 HUD */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1">
                <div className="w-20 h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${energy}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-white/60 font-medium">{energy}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 프로필 콘텐츠 */}
      <div className="pt-20 pb-24 px-4">
        {session?.user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto space-y-5"
          >
            {/* 아바타 + 이름 */}
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center overflow-hidden">
                {session.user.image ? (
                  <img src={session.user.image} alt="프로필" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-3xl font-bold">
                    {(session.user.name || '?').charAt(0)}
                  </span>
                )}
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">{session.user.name || '사용자'}</h2>
                <p className="text-white/50 text-sm">{session.user.email || ''}</p>
              </div>
            </div>

            {/* 내 정보 카드 */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-white font-semibold text-sm mb-3">내 정보</h3>

              <InfoRow icon={<Mail className="w-4 h-4" />} label="이메일" value={session.user.email || '-'} />
            </div>

            {/* 동의 철회 */}
            <AnimatePresence>
              {revokeSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-2 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
                >
                  <span className="text-xs text-emerald-400">동의가 철회되었습니다.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {consents.length > 0 && (
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 space-y-3">
                <h3 className="text-white font-semibold text-sm">데이터 공유 관리</h3>
                <p className="text-white/40 text-xs">현재 기관에 실행 DNA 리포트를 공유 중입니다.</p>
                {consents.map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-3 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-sm text-white/70 min-w-0">
                      <span className="text-indigo-400 text-xs">공유 중</span>
                      <span className="truncate">{c.institutionId}</span>
                    </div>
                    <button
                      onClick={() => handleRevoke(c.id)}
                      disabled={revoking}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-white/60 hover:text-red-400 text-xs font-medium transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <ShieldOff className="w-3.5 h-3.5" />
                      동의 철회
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              로그아웃
            </button>
          </motion.div>
        )}
      </div>

      <BottomTabBar />
    </main>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-white text-sm">{value}</span>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  )
}
