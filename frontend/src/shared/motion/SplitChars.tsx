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

  // Replay on every pass: chars rise when the heading enters the viewport
  // and reset once it fully leaves, so scrolling up and down replays
  // the transition each time.
  useEffect(() => {
    if (mode !== 'view') return
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mode])

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
