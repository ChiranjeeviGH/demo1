import { Fragment, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { MOTION_EASE } from '@/shared/motion'

type SplitCharsProps = {
  text: string
  className?: string
  delay?: number
  charDelay?: number
  duration?: number
  mode?: 'load' | 'view'
  play?: boolean
}

export function SplitChars({
  text,
  className,
  delay = 0,
  charDelay = 0.032,
  duration = 0.65,
  mode = 'view',
  play = true,
}: SplitCharsProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  // Deterministic reveal: a passive scroll check that fires once the
  // heading nears the viewport (or was jumped past). Works with Lenis
  // and never leaves text hidden behind an IntersectionObserver miss.
  useEffect(() => {
    if (mode !== 'view' || inView) return
    const el = rootRef.current
    if (!el) return

    let raf = 0
    const check = () => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.88) {
        setInView(true)
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(check)
    }

    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [mode, inView])

  const words = text.split(' ')
  let charIndex = 0
  const shown = mode === 'load' ? play : inView

  return (
    <span ref={rootRef} className={className} role="text" aria-label={text} style={{ display: 'inline' }}>
      {words.map((word, wordIndex) => (
        <Fragment key={`${word}-${wordIndex}`}>
          <span aria-hidden="true" className="split-word">
            {Array.from(word).map((char) => {
              const index = charIndex++
              return (
                <span key={index} className="split-mask">
                  <motion.span
                    className="split-char"
                    initial={{ y: '115%' }}
                    animate={shown ? { y: '0%' } : { y: '115%' }}
                    transition={{
                      duration,
                      delay: shown ? delay + index * charDelay : 0,
                      ease: MOTION_EASE,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              )
            })}
          </span>
          {wordIndex < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}
