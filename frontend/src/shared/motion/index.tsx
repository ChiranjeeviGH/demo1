import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const

export const VIEWPORT_ONCE = { once: false, amount: 0.2 } as const

export const fadeUp = (delay = 0, y = 26, duration = 0.8) =>
  ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration, delay, ease: MOTION_EASE },
  }) as const

export const fadeSide = (x: number, delay = 0, duration = 0.8) =>
  ({
    initial: { opacity: 0, x, y: 0 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration, delay, ease: MOTION_EASE },
  }) as const

export const MotionLink = motion.create(Link)
