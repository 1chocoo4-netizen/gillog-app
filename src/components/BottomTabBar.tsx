'use client'

import Link from 'next/link'

function TabItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-6 py-2 rounded-xl text-white/40 hover:text-white/60 transition-colors"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium text-white/40">{label}</span>
    </Link>
  )
}

export function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
      <div className="flex justify-around py-2">
        <TabItem href="/checkin" icon="⚡" label="실행" />
        <TabItem href="/coaching" icon="💬" label="코칭" />
        <TabItem href="/app" icon="🗺️" label="월드" />
        <TabItem href="/dashboard" icon="📊" label="리포트" />
      </div>
    </nav>
  )
}
