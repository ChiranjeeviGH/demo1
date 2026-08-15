import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'

import { MOTION_EASE } from '@/shared/motion'

const EASE_IN = [0.65, 0, 0.35, 1] as const

export function PageTransition() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  const red = useAnimationControls()
  const dark = useAnimationControls()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (reduceMotion) return

    let cancelled = false

    const run = async () => {
      await Promise.all([
        red.start({ y: '0%', transition: { duration: 0.42, ease: EASE_IN } }),
        dark.start({ y: '0%', transition: { duration: 0.42, ease: EASE_IN, delay: 0.09 } }),
      ])
      if (cancelled) return
      await Promise.all([
        dark.start({ y: '-100%', transition: { duration: 0.55, ease: MOTION_EASE } }),
        red.start({ y: '-100%', transition: { duration: 0.55, ease: MOTION_EASE, delay: 0.08 } }),
      ])
      if (cancelled) return
      red.set({ y: '100%' })
      dark.set({ y: '100%' })
    }

    run()
    return () => {
      cancelled = true
    }
  }, [pathname, reduceMotion, red, dark])

  return (
    <div className="page-transition" aria-hidden="true" data-testid="page-transition">
      <motion.div
        className="page-transition__panel page-transition__panel--red"
        initial={{ y: '100%' }}
        animate={red}
      />
      <motion.div
        className="page-transition__panel page-transition__panel--dark"
        initial={{ y: '100%' }}
        animate={dark}
      />
    </div>
  )
}
