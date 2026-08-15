import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

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
      <motion.video
        className="hero-media"
        poster="/media/hero-video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Daali Pictures cinematic hero film"
        initial={{ opacity: 0.85, scale: 1.03 }}
        animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0.85, scale: 1.03 }}
        transition={{ duration: 1.5, delay: 0.1, ease: MOTION_EASE }}
        style={reduceMotion ? undefined : { y: parallaxY }}
        data-testid="home-hero-media"
      >
        <source src="/media/hero-video-web.mp4" type="video/mp4" />
        <source src="/media/hero-video.webm" type="video/webm" />
      </motion.video>
      <div className="hero-ember" aria-hidden="true" />
    </section>
  )
}
