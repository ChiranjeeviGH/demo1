import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'

import { HOME_PRODUCTIONS } from '@/features/home/constants/home.data'
import { ROUTES } from '@/shared/constants/routes'
import { useMediaQuery } from '@/shared/hooks'
import { fadeUp, MotionLink } from '@/shared/motion'
import { scrollToY } from '@/shared/motion/useSmoothScroll'
import { SplitChars } from '@/shared/motion/SplitChars'

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

function SectionHeader() {
  return (
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
  )
}

/* ---------------- 3D orbital poster gallery (desktop) ---------------- */

type OrbitPosterProps = {
  item: (typeof HOME_PRODUCTIONS)[number]
  index: number
  count: number
  progress: MotionValue<number>
  radiusX: number
  radiusZ: number
  onSelect: () => void
}

function OrbitPoster({ item, index, count, progress, radiusX, radiusZ, onSelect }: OrbitPosterProps) {
  const angleAt = (p: number) => Math.PI / 2 + (index / count) * Math.PI * 2 - p * Math.PI * 2
  const depthAt = (p: number) => (Math.sin(angleAt(p)) + 1) / 2

  const x = useTransform(progress, (p) => Math.cos(angleAt(p)) * radiusX)
  const z = useTransform(progress, (p) => Math.sin(angleAt(p)) * radiusZ)
  const rotateY = useTransform(progress, (p) => 90 - (angleAt(p) * 180) / Math.PI)
  const opacity = useTransform(progress, (p) => 0.16 + 0.84 * depthAt(p))
  const scale = useTransform(progress, (p) => 0.8 + 0.2 * depthAt(p))
  const filter = useTransform(
    progress,
    (p) => `brightness(${(0.42 + 0.58 * depthAt(p)).toFixed(3)}) saturate(${depthAt(p).toFixed(3)})`,
  )
  const zIndex = useTransform(progress, (p) => Math.round(depthAt(p) * 100))

  return (
    <motion.button
      type="button"
      className="orbit-poster"
      style={{ x, z, rotateY, opacity, scale, filter, zIndex }}
      onClick={onSelect}
      aria-label={`Show ${item.title}`}
      data-testid={`orbit-poster-${item.id}`}
    >
      <img src={item.image} alt={`${item.title} poster`} draggable={false} />
    </motion.button>
  )
}

function OrbitCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const count = HOME_PRODUCTIONS.length
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const [active, setActive] = useState(0)
  const [vw, setVw] = useState(() => window.innerWidth)

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = ((Math.round(p * count) % count) + count) % count
    setActive((prev) => (prev === idx ? prev : idx))
  })

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = sectionRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      const target = top + (index / count) * (el.offsetHeight - window.innerHeight)
      scrollToY(target)
    },
    [count],
  )

  const radiusX = Math.min(vw * 0.32, 640)
  const radiusZ = Math.min(vw * 0.26, 470)
  const activeItem = HOME_PRODUCTIONS[active]

  return (
    <section
      className="section home-productions home-productions--orbit"
      aria-labelledby="home-productions-heading"
      ref={sectionRef}
      style={{ height: `${104 + count * 52}vh` }}
    >
      <div className="productions-orbit">
        <div className="section__inner productions-orbit__header">
          <SectionHeader />
        </div>

        <div className="productions-orbit__stage" data-testid="productions-orbit">
          {HOME_PRODUCTIONS.map((item, index) => (
            <OrbitPoster
              key={item.id}
              item={item}
              index={index}
              count={count}
              progress={scrollYProgress}
              radiusX={radiusX}
              radiusZ={radiusZ}
              onSelect={() => scrollToIndex(index)}
            />
          ))}
        </div>

        <div className="section__inner productions-orbit__footer">
          <span className="productions-orbit__hint" aria-hidden="true">
            Scroll to explore
          </span>
          <div className="productions-carousel__meta" key={activeItem.id} data-testid="carousel-meta">
            <span className="productions-carousel__status">{activeItem.status}</span>
            <h3>{activeItem.title}</h3>
            <p>
              {activeItem.year} • {activeItem.genre}
            </p>
          </div>
          <div className="productions-carousel__controls">
            <button
              type="button"
              className="productions-carousel__nav"
              onClick={() => scrollToIndex((active - 1 + count) % count)}
              aria-label="Previous production"
              data-testid="carousel-prev-btn"
            >
              ‹
            </button>
            <button
              type="button"
              className="productions-carousel__nav"
              onClick={() => scrollToIndex((active + 1) % count)}
              aria-label="Next production"
              data-testid="carousel-next-btn"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- classic flat carousel (mobile / reduced motion) ---------------- */

function ClassicCarousel() {
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
        <SectionHeader />

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

export function ProductionsCarousel() {
  const isSmall = useMediaQuery('(max-width: 960px)')
  const reduceMotion = useReducedMotion()

  if (isSmall || reduceMotion) {
    return <ClassicCarousel />
  }

  return <OrbitCarousel />
}
