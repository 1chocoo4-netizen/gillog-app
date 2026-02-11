'use client'

export function PrivacyBadge() {
  return (
    <div className="mt-12 border-t border-gray-800 pt-6 pb-4">
      <div className="flex items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-medium text-gray-400">프라이버시 보호</span>
        </div>
        <span className="text-gray-600">|</span>
        <span>개인 원문(텍스트/사진)은 절대 노출되지 않으며, 통계 지표만 표시됩니다.</span>
        <span className="text-gray-600">|</span>
        <span>본인 동의 없이 데이터가 공유되지 않습니다.</span>
      </div>
    </div>
  )
}
