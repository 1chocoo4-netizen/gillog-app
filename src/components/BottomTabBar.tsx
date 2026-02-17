'use client'

import Link from 'next/link'

const TABS = [
  { href: '/checkin', icon: '⭐', label: '실행' },
  { href: '/coaching', icon: '💬', label: '코칭' },
  { href: '/app', icon: '🗺️', label: '월드' },
  { href: '/dashboard', icon: '📊', label: '리포트' },
]

export function BottomTabBar({ activeTab }: { activeTab?: string }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around py-2">
        {TABS.map(tab => {
          const active = activeTab === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-xl transition-colors min-w-[56px] ${
                active ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              <span className="text-[22px]">{tab.icon}</span>
              <span className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-white/50'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
