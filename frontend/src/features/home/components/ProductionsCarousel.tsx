import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { motion } from 'framer-motion'

import { ROUTES } from '@/shared/constants/routes'
import { useMediaQuery } from '@/shared/hooks'
import { fadeUp, MotionLink } from '@/shared/motion'
import { SplitChars } from '@/shared/motion/SplitChars'
import { HOME_PRODUCTIONS } from '@/features/home/constants/home.data'

function getCircularOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex
  const half = Math.floor(length / 2)

  if (offset > half) {
    offset -= length
  } else if (offset < -half) {
    offset += length
  }

  return offset
}

export function ProductionsCarousel() {
  const featuredIndex = HOME_PRODUCTIONS.findIndex((item) => item.featured)
  const [activeIndex, setActiveIndex] = useState(featuredIndex >= 0 ? featuredIndex : 2)
  const isCompact = useMediaQuery('(max-width: 720px)')
  const isTablet = useMediaQuery('(max-width: 960px)')
  const dragStartX = useRef<number | null>(null)
  const didDrag = useRef(false)
  const active = HOME_PRODUCTIONS[activeIndex]
  const total = HOME_PRODUCTIONS.length

  const goTo = useCallback(
    (nextIndex: number) => {
      setActiveIndex(((nextIndex % total) + total) % total)
    },
    [total],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX
    didDrag.current = false
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) {
      return
    }

    const delta = event.clientX - dragStartX.current
    dragStartX.current = null

    if (Math.abs(delta) < 40) {
      return
    }

    didDrag.current = true

    if (delta > 0) {
      goPrev()
    } else {
      goNext()
    }
  }

  const spacing = isCompact ? 34 : isTablet ? 44 : 52
  const scaleStep = isCompact ? 0.2 : 0.12
  const visibleRange = isCompact ? 1 : isTablet ? 2 : 3

  return (
    <section className="section home-productions" aria-labelledby="home-productions-heading">
      <div className="section__inner">
        <div className="home-productions__header">
          <h2 id="home-productions-heading" className="home-productions__title">
            <SplitChars text="Our" className="accent" /> <SplitChars text="Productions" delay={0.08} />
          </h2>
          <MotionLink
            to={ROUTES.PRODUCTIONS}
            className="btn btn-outline home-productions__view-all-btn"
            {...fadeUp(0.2, 16, 0.6)}
            data-testid="productions-view-all-btn"
          >
            View All
          </MotionLink>
        </div>

        <motion.div className="productions-carousel-shell" {...fadeUp(0.12, 30, 0.85)}>
          <div
            className="productions-carousel"
            role="list"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              dragStartX.current = null
            }}
            data-testid="productions-carousel"
          >
            {HOME_PRODUCTIONS.map((item, index) => {
              const offset = getCircularOffset(index, activeIndex, total)
              const absOffset = Math.abs(offset)
              const isActive = offset === 0
              const hidden = absOffset > visibleRange

              const style = {
                transform: `translate3d(calc(-50% + ${offset * spacing}%), -50%, 0) scale(${Math.max(0.55, 1 - absOffset * scaleStep)})`,
                opacity: hidden ? 0 : Math.max(0.35, 1 - absOffset * 0.22),
                zIndex: 20 - absOffset,
                filter: isActive ? 'none' : 'grayscale(1) brightness(0.55)',
                pointerEvents: hidden ? 'none' : 'auto',
              } satisfies CSSProperties

              return (
                <button
                  key={item.id}
                  type="button"
                  role="listitem"
                  className={`productions-carousel__item${isActive ? ' is-active' : ''}`}
                  style={style}
                  onClick={() => {
                    if (didDrag.current) {
                      didDrag.current = false
                      return
                    }
                    goTo(index)
                  }}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  tabIndex={hidden ? -1 : 0}
                  data-testid={`carousel-item-${item.id}`}
                >
                  <img src={item.image} alt={`${item.title} poster`} draggable={false} />
                </button>
              )
            })}
          </div>

          <div className="productions-carousel__controls">
            <button
              type="button"
              className="productions-carousel__nav"
              onClick={goPrev}
              aria-label="Previous production"
              data-testid="carousel-prev-btn"
            >
              ‹
            </button>
            <button
              type="button"
              className="productions-carousel__nav"
              onClick={goNext}
              aria-label="Next production"
              data-testid="carousel-next-btn"
            >
              ›
            </button>
          </div>
        </motion.div>

        <div className="productions-carousel__meta" key={active.id} data-testid="carousel-meta">
          <span className="productions-carousel__status">{active.status}</span>
          <h3>{active.title}</h3>
          <p>
            {active.year} • {active.genre}
          </p>
        </div>
      </div>
    </section>
  )
}
