import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

import { ABOUT_DATA } from '@/features/about/constants/about.data'
import { MOTION_EASE, VIEWPORT_ONCE } from '@/shared/motion'

function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const target = match ? Number.parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : ''
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!match) return
    if (reduceMotion) {
      setDisplay(target)
      return
    }
    if (!inView) return

    const duration = 1100
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, match, reduceMotion, target])

  if (!match) return <span className="about-stats__value">{value}</span>

  return (
    <span className="about-stats__value" ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function AboutStats() {
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [indicator, setIndicator] = useState({ x: 0, h: 0 })
  const [active, setActive] = useState(0)

  const syncIndicator = useCallback((index: number) => {
    const track = trackRef.current
    const item = itemRefs.current[index]
    if (!track || !item) return

    const trackBox = track.getBoundingClientRect()
    const itemBox = item.getBoundingClientRect()
    setIndicator({
      x: itemBox.left - trackBox.left,
      h: itemBox.height,
    })
  }, [])

  useLayoutEffect(() => {
    syncIndicator(active)

    const track = trackRef.current
    if (!track) return

    const onResize = () => syncIndicator(active)
    const ro = new ResizeObserver(onResize)
    ro.observe(track)
    window.addEventListener('resize', onResize)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [active, syncIndicator])

  const activate = (index: number) => {
    setActive(index)
    requestAnimationFrame(() => {
      syncIndicator(index)
      // Follow flex width transition
      const start = performance.now()
      const tick = (now: number) => {
        syncIndicator(index)
        if (now - start < 480) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  }

  return (
    <section className="about-stats-wrap" aria-label="Career statistics">
      <motion.div
        ref={trackRef}
        className="about-stats"
        onMouseLeave={() => activate(0)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: MOTION_EASE }}
        data-testid="about-stats"
      >
        <span
          className="about-stats__indicator"
          style={{
            transform: `translate3d(${indicator.x}px, 0, 0)`,
            height: indicator.h ? `${indicator.h}px` : '100%',
          }}
          aria-hidden="true"
        />
        {ABOUT_DATA.stats.map((stat, index) => (
          <button
            key={stat.label}
            type="button"
            className={`about-stats__item${active === index ? ' is-active' : ''}`}
            ref={(node) => {
              itemRefs.current[index] = node
            }}
            onMouseEnter={() => activate(index)}
            onFocus={() => activate(index)}
            data-testid={`about-stat-${index}`}
          >
            <CountUp value={stat.value} />
            <span className="about-stats__label">{stat.label}</span>
          </button>
        ))}
      </motion.div>
    </section>
  )
}
