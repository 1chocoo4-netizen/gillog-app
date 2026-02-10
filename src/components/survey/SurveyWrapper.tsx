'use client'

import { AnimatePresence } from 'framer-motion'
import { useUserData } from '@/lib/UserDataProvider'
import { SurveyModal } from './SurveyModal'

export function SurveyWrapper() {
  const { showSurvey, pendingMilestone, completeMilestone } = useUserData()

  return (
    <AnimatePresence>
      {showSurvey && pendingMilestone && (
        <SurveyModal onComplete={completeMilestone} milestone={pendingMilestone} />
      )}
    </AnimatePresence>
  )
}
