import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

import { MOTION_EASE } from '@/shared/motion'
import { useIntro } from '@/shared/motion/IntroContext'
import { isSoundEnabled, playCurtainSound, setSoundEnabled } from '@/shared/audio/curtainSound'

const LETTERS = ['D', 'A', 'A', 'L', 'I']

// Theatrical ease: curtains hesitate, sweep open, settle
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const

export function Preloader() {
  const reduceMotion = useReducedMotion()
  const { setIntroComplete } = useIntro()
  const [parting, setParting] = useState(false)
  const [gone, setGone] = useState(false)
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled())

  useEffect(() => {
    if (reduceMotion) {
      setIntroComplete()
      setGone(true)
      return
    }

    document.documentElement.style.overflow = 'hidden'

    const timers = [
      setTimeout(() => {
        setParting(true)
        setIntroComplete()
        playCurtainSound()
      }, 1500),
      setTimeout(() => {
        setGone(true)
        document.documentElement.style.overflow = ''
      }, 2750),
    ]

    return () => {
      timers.forEach(clearTimeout)
      document.documentElement.style.overflow = ''
    }
  }, [reduceMotion, setIntroComplete])

  if (gone) return null

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    setSoundEnabled(next)
  }

  return (
    <div className="preloader" data-testid="preloader">
      <motion.div
        className="preloader__curtain preloader__curtain--left"
        initial={false}
        animate={parting ? { x: '-101%' } : { x: '0%' }}
        transition={{ duration: 1.15, ease: CURTAIN_EASE }}
      >
        <img src="/media/curtain.jpg" alt="" draggable={false} />
      </motion.div>
      <motion.div
        className="preloader__curtain preloader__curtain--right"
        initial={false}
        animate={parting ? { x: '101%' } : { x: '0%' }}
        transition={{ duration: 1.15, ease: CURTAIN_EASE }}
      >
        <img src="/media/curtain.jpg" alt="" draggable={false} />
      </motion.div>

      <motion.div
        className="preloader__logo"
        aria-hidden="true"
        animate={parting ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: MOTION_EASE }}
      >
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
      </motion.div>

      <button
        type="button"
        className="preloader__sound-btn"
        onClick={toggleSound}
        aria-pressed={soundOn}
        data-testid="curtain-sound-toggle"
      >
        {soundOn ? 'Sound On' : 'Sound Off'}
      </button>
    </div>
  )
}
