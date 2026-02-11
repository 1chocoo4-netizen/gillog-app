'use client'

import { motion } from 'framer-motion'

interface ConsentBlockerProps {
  userName?: string
  onRequestConsent?: () => void
}

export function ConsentBlocker({ userName, onRequestConsent }: ConsentBlockerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
    >
      <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-200 mb-2">데이터 열람 동의 필요</h2>
      <p className="text-sm text-gray-400 max-w-md mb-2">
        {userName ? `${userName}님의 ` : '해당 사용자의 '}
        실행 DNA 리포트를 조회하려면 본인의 데이터 공유 동의가 필요합니다.
      </p>
      <p className="text-xs text-gray-500 max-w-md mb-6">
        개인 원문(텍스트/사진)은 절대 노출되지 않으며, 통계 지표만 공유됩니다.
      </p>

      {onRequestConsent && (
        <button
          onClick={onRequestConsent}
          className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          동의 요청 보내기
        </button>
      )}

      <div className="mt-8 flex items-center gap-2 text-xs text-gray-600">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>GDPR / 개인정보보호법 준수</span>
      </div>
    </motion.div>
  )
}
