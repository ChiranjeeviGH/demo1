import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { MOTION_EASE } from '@/shared/motion'
import { useIntro } from '@/shared/motion/IntroContext'

const LETTERS = ['D', 'A', 'A', 'L', 'I']

export function Preloader() {
  const reduceMotion = useReducedMotion()
  const { setIntroComplete } = useIntro()
  const [covered, setCovered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setIntroComplete()
      setGone(true)
      return
    }

    document.documentElement.style.overflow = 'hidden'

    const timers = [
      setTimeout(() => setCovered(true), 2000),
      setTimeout(() => {
        setLeaving(true)
        setIntroComplete()
      }, 2150),
      setTimeout(() => {
        setGone(true)
        document.documentElement.style.overflow = ''
      }, 2950),
    ]

    return () => {
      timers.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [reduceMotion, setIntroComplete])

  if (gone) return null

  return (
    <div
      className="preloader"
      style={{ background: covered ? 'transparent' : '#0a0a0a' }}
      data-testid="preloader"
    >
      <div className="preloader__logo" style={{ opacity: covered ? 0 : 1 }} aria-hidden="true">
        {LETTERS.map((char, index) => (
          <span key={index} className="preloader__char-mask">
            <motion.span
              className="preloader__char"
              initial={{ y: '115%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.7, delay: 0.25 + index * 0.07, ease: MOTION_EASE }}
            >
              {char}
            </motion.span>
          </span>
        ))}
        <span className="preloader__char-mask">
          <motion.span
            className="preloader__char preloader__dot"
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, delay: 0.25 + LETTERS.length * 0.07, ease: MOTION_EASE }}
          >
            .
          </motion.span>
        </span>
      </div>

      <motion.div
        className="preloader__panel preloader__panel--red"
        initial={{ y: '100%' }}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={
          leaving
            ? { duration: 0.7, delay: 0.09, ease: MOTION_EASE }
            : { duration: 0.5, delay: 1.35, ease: [0.65, 0, 0.35, 1] }
        }
      />
      <motion.div
        className="preloader__panel preloader__panel--dark"
        initial={{ y: '100%' }}
        animate={{ y: leaving ? '-100%' : '0%' }}
        transition={
          leaving
            ? { duration: 0.7, delay: 0, ease: MOTION_EASE }
            : { duration: 0.5, delay: 1.47, ease: [0.65, 0, 0.35, 1] }
        }
      />
    </div>
  )
}
