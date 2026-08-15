import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { HOME_IMAGES } from '@/features/home/constants/home.data'
import { MOTION_EASE } from '@/shared/motion'
import { useIntro } from '@/shared/motion/IntroContext'

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { introComplete } = useIntro()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 56])

  return (
    <section className="home-hero-block" ref={sectionRef}>
      <motion.img
        className="hero-media"
        src={HOME_IMAGES.hero}
        alt="Daali Pictures cinematic hero"
        initial={{ opacity: 0.85, scale: 1.03 }}
        animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0.85, scale: 1.03 }}
        transition={{ duration: 1.5, delay: 0.1, ease: MOTION_EASE }}
        style={reduceMotion ? undefined : { y: parallaxY }}
        data-testid="home-hero-media"
      />
      <div className="hero-ember" aria-hidden="true" />
    </section>
  )
}
