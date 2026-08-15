import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { HOME_COPY } from '@/features/home/constants/home.data'

export function HomeMission() {
  const sectionRef = useRef<HTMLElement>(null)
  const measureRef = useRef<HTMLParagraphElement>(null)
  const words = useMemo(() => HOME_COPY.mission.trim().split(/\s+/), [])
  const [lines, setLines] = useState<string[][]>([])
  const [visible, setVisible] = useState(false)
  const [reveal, setReveal] = useState(false)

  const measureLines = useCallback(() => {
    const root = measureRef.current
    if (!root) return

    const wordEls = [...root.querySelectorAll<HTMLElement>('.mission__word')]
    const next: string[][] = []
    let currentTop = Number.NEGATIVE_INFINITY
    let current: string[] = []

    for (const el of wordEls) {
      const top = el.offsetTop
      if (top > currentTop + 2) {
        if (current.length) next.push(current)
        current = []
        currentTop = top
      }
      current.push(el.dataset.word ?? '')
    }

    if (current.length) next.push(current)
    setLines(next)
  }, [])

  useLayoutEffect(() => {
    measureLines()
    const root = measureRef.current
    if (!root) return

    const observer = new ResizeObserver(measureLines)
    observer.observe(root)
    return () => observer.disconnect()
  }, [measureLines])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || lines.length === 0 || reveal) return

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setReveal(true))
    })

    return () => cancelAnimationFrame(frame)
  }, [visible, lines.length, reveal])

  return (
    <section
      ref={sectionRef}
      className={`home-mission${reveal ? ' is-visible' : ''}`}
      aria-label="Mission"
    >
      <div className="mission">
        <p ref={measureRef} className="mission__measure" aria-hidden="true">
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="mission__word" data-word={word}>
              {word}
            </span>
          ))}
        </p>
        <p className="mission__copy">
          {lines.map((line, index) => (
            <span
              key={`line-${index}`}
              className="mission__line"
              style={{ '--line-index': index } as CSSProperties}
            >
              <span className="mission__line-inner">{line.join(' ')}</span>
            </span>
          ))}
          <span
            className="mission__line brand"
            style={{ '--line-index': lines.length } as CSSProperties}
          >
            <span className="mission__line-inner">{HOME_COPY.brand}</span>
          </span>
        </p>
      </div>
    </section>
  )
}
