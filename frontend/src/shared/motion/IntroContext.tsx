import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

type IntroContextValue = {
  introComplete: boolean
  setIntroComplete: () => void
}

const IntroContext = createContext<IntroContextValue>({
  introComplete: false,
  setIntroComplete: () => undefined,
})

export function IntroProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const [done, setDone] = useState(false)

  const setIntroComplete = useCallback(() => setDone(true), [])

  const value = useMemo<IntroContextValue>(
    () => ({
      introComplete: done || Boolean(reduceMotion),
      setIntroComplete,
    }),
    [done, reduceMotion, setIntroComplete],
  )

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
}

export function useIntro() {
  return useContext(IntroContext)
}
