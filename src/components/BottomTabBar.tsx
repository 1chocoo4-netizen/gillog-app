'use client'

import Link from 'next/link'

function TabItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-xl text-white/40 hover:text-white/60 transition-colors min-w-[56px]"
    >
      <span className="text-[22px]">{icon}</span>
      <span className="text-[11px] font-semibold text-white/50">{label}</span>
    </Link>
  )
}

export function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
      <div className="flex justify-around py-2">
        <TabItem href="/checkin" icon="⭐" label="실행" />
        <TabItem href="/coaching" icon="💬" label="코칭" />
        <TabItem href="/app" icon="🗺️" label="월드" />
        <TabItem href="/dashboard" icon="📊" label="리포트" />
      </div>
    </nav>
  )
}
