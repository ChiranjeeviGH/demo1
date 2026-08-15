import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { MOTION_EASE } from '@/shared/motion'
import { useIntro } from '@/shared/motion/IntroContext'

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduceMotion = useReducedMotion()
  const { introComplete } = useIntro()
  const [muted, setMuted] = useState(true)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 56])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !muted
    video.muted = next
    if (!next) {
      video.volume = 1
      video.play().catch(() => undefined)
    }
    setMuted(next)
  }

  return (
    <section className="home-hero-block" ref={sectionRef}>
      <motion.video
        ref={videoRef}
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
        <source src="/media/hero-landscape.mp4" type="video/mp4" />
        <source src="/media/hero-landscape.webm" type="video/webm" />
      </motion.video>
      <div className="hero-ember" aria-hidden="true" />
      <motion.button
        type="button"
        className="hero-sound-toggle"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? 'Unmute hero film' : 'Mute hero film'}
        initial={{ opacity: 0, y: 10 }}
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.7, delay: 0.5, ease: MOTION_EASE }}
        data-testid="hero-sound-toggle"
      >
        {muted ? 'Sound Off' : 'Sound On'}
      </motion.button>
    </section>
  )
}
