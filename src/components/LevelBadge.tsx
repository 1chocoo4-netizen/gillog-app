'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, Mail } from 'lucide-react'
import { useUserData } from '@/lib/UserDataProvider'
import { useSession, signOut } from 'next-auth/react'

export function LevelBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const { levelData } = useUserData()
  const { data: session } = useSession()

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
              <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10">
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

                {/* 로그아웃 */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
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
