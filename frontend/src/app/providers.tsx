import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'

import { IntroProvider } from '@/shared/motion/IntroContext'
import { Preloader } from '@/shared/components/Preloader'
import { PageTransition } from '@/shared/components/PageTransition'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <IntroProvider>
          {children}
          <Preloader />
          <PageTransition />
        </IntroProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
