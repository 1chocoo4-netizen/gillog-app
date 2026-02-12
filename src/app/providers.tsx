'use client'

import { SessionProvider } from 'next-auth/react'
import { UserDataProvider } from '@/lib/UserDataProvider'
import { SurveyWrapper } from '@/components/survey/SurveyWrapper'
import { ConsentRequestModal } from '@/components/ConsentRequestModal'
import { DirectMessageModal } from '@/components/DirectMessageModal'
import { TermsConsentModal } from '@/components/TermsConsentModal'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserDataProvider>
        {children}
        <TermsConsentModal />
        <SurveyWrapper />
        <ConsentRequestModal />
        <DirectMessageModal />
      </UserDataProvider>
    </SessionProvider>
  )
}
