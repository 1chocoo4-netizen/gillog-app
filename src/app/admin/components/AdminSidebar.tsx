'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin', label: '대시보드', icon: '📊' },
  { href: '/admin/growth', label: '성장 분석', icon: '📈' },
  { href: '/admin/export', label: '데이터 내보내기', icon: '📥' },
  { href: '/admin/coaches', label: '코치 관리', icon: '👥' },
  { href: '/admin/coupons', label: '쿠폰 관리', icon: '🎟️' },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-lg font-bold text-white">길로그 Admin</h1>
        <p className="text-xs text-gray-400 mt-1">연구 데이터 관리</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← 학생 앱으로 돌아가기
        </Link>
      </div>
    </aside>
  )
}
