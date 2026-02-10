'use client'

import { SessionProvider } from 'next-auth/react'
import { UserDataProvider } from '@/lib/UserDataProvider'
import { SurveyWrapper } from '@/components/survey/SurveyWrapper'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserDataProvider>
        {children}
        <SurveyWrapper />
      </UserDataProvider>
    </SessionProvider>
  )
}
