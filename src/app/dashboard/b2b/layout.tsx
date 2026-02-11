import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '실행 DNA 리포트 | 길로그 B2B',
  description: 'ISO 30414 기반 8개 실행 역량 지표 분석',
}

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {children}
    </div>
  )
}
