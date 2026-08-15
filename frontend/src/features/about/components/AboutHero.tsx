import { useRef, type MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

import { ABOUT_DATA } from '@/features/about/constants/about.data'
import { MOTION_EASE } from '@/shared/motion'
import { useIntro } from '@/shared/motion/IntroContext'
import { SplitChars } from '@/shared/motion/SplitChars'

const TILT_SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

export function AboutHero() {
  const { introComplete } = useIntro()
  const reduceMotion = useReducedMotion()
  const frameRef = useRef<HTMLDivElement>(null)
  const fullName = `${ABOUT_DATA.name.first} ${ABOUT_DATA.name.last}`

  const tiltEnabled =
    !reduceMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5.5, -5.5]), TILT_SPRING)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), TILT_SPRING)
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), TILT_SPRING)
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), TILT_SPRING)
  const lightX = useSpring(useTransform(mx, [-0.5, 0.5], ['-34%', '34%']), TILT_SPRING)
  const lightY = useSpring(useTransform(my, [-0.5, 0.5], ['-26%', '26%']), TILT_SPRING)

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!tiltEnabled) return
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section className="about-hero" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.img
        className="about-hero__media"
        src={ABOUT_DATA.heroImage}
        alt=""
        initial={{ opacity: 0, scale: 1.04 }}
        animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.5, delay: 0.1, ease: MOTION_EASE }}
      />
      <div className="about-hero__veil" aria-hidden="true" />
      <div className="section__inner about-intro">
        <motion.div
          className="about-intro__portrait-wrap"
          initial={{ opacity: 0, y: 24 }}
          animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.95, delay: 0.35, ease: MOTION_EASE }}
        >
          <div className="about-intro__glow" aria-hidden="true" />
          <div className="about-intro__portrait-frame" ref={frameRef} data-testid="about-portrait-frame">
            <motion.div
              className="portrait-tilt"
              style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
            >
              <motion.img
                className="about-intro__portrait"
                src={ABOUT_DATA.portrait}
                alt={fullName}
                style={tiltEnabled ? { x: imgX, y: imgY, scale: 1.08 } : undefined}
              />
              <div className="portrait-highlight" aria-hidden="true">
                <motion.div style={tiltEnabled ? { x: lightX, y: lightY } : undefined} />
              </div>
            </motion.div>
            <span className="portrait-corner portrait-corner--tl" aria-hidden="true" />
            <span className="portrait-corner portrait-corner--tr" aria-hidden="true" />
            <span className="portrait-corner portrait-corner--bl" aria-hidden="true" />
            <span className="portrait-corner portrait-corner--br" aria-hidden="true" />
          </div>
        </motion.div>
        <div className="about-intro__copy">
          <h1>
            <SplitChars
              text={ABOUT_DATA.name.first}
              className="accent"
              mode="load"
              play={introComplete}
              delay={0.45}
            />
            <span className="about-intro__lastname">
              <SplitChars
                text={ABOUT_DATA.name.last}
                mode="load"
                play={introComplete}
                delay={0.58}
              />
            </span>
          </h1>
          <motion.p
            className="about-intro__roles"
            initial={{ opacity: 0, y: 16 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.72, ease: MOTION_EASE }}
          >
            {ABOUT_DATA.roles}
          </motion.p>
          {ABOUT_DATA.bio.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className="about-intro__bio"
              initial={{ opacity: 0, y: 16 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.65, delay: 0.84 + index * 0.12, ease: MOTION_EASE }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
