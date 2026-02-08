'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, LogOut, User, Mail, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { getCurrentUser, getUserEnergy, logout } from '@/lib/auth'
import type { User as UserType } from '@/lib/auth'

function ProfileContent() {
  const router = useRouter()
  const [energy, setEnergy] = useState(50)
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    setEnergy(getUserEnergy())
    setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      logout()
      router.push('/login')
    }
  }

  const genderLabel = (g: string) => {
    if (g === 'male') return '남성'
    if (g === 'female') return '여성'
    return '기타'
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 상단 HUD */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1">
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
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
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm mx-auto space-y-5"
          >
            {/* 아바타 + 이름 */}
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-white/50 text-sm">@{user.username}</p>
              </div>
            </div>

            {/* 내 정보 카드 */}
            <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-white font-semibold text-sm mb-3">내 정보</h3>

              <InfoRow icon={<User className="w-4 h-4" />} label="성별" value={genderLabel(user.gender)} />
              <InfoRow icon={<Calendar className="w-4 h-4" />} label="나이" value={`${user.age}세`} />
              <InfoRow icon={<Mail className="w-4 h-4" />} label="이메일" value={user.email} />
              <InfoRow icon={<Phone className="w-4 h-4" />} label="전화번호" value={user.phone} />
            </div>

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

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/checkin" icon="⚡" label="실행" />
          <TabItem href="/app" icon="🗺️" label="월드" />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
          <TabItem href="/profile" icon="👤" label="프로필" active />
        </div>
        <div className="h-safe-area-inset-bottom" />
      </nav>
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

function TabItem({
  href,
  icon,
  label,
  active = false
}: {
  href: string
  icon: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors
        ${active
          ? 'text-white'
          : 'text-white/40 hover:text-white/60'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-xs font-medium ${active ? 'text-white' : 'text-white/40'}`}>
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="tabIndicator"
          className="absolute bottom-1 w-1 h-1 bg-white rounded-full"
        />
      )}
    </Link>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  )
}
