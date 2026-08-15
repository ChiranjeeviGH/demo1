import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/shared/utils/cn'
import { MOTION_EASE, VIEWPORT_ONCE } from '@/shared/motion'

type SectionHeadingProps = {
  before?: string
  accent: string
  after?: string
  className?: string
}

export function SectionHeading({ before, accent, after, className }: SectionHeadingProps) {
  return (
    <motion.h2
      className={cn('section-heading', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: MOTION_EASE }}
    >
      {before ? <span>{before} </span> : null}
      <motion.span
        className="accent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.6, delay: 0.12, ease: MOTION_EASE }}
      >
        {accent}
      </motion.span>
      {after ? <span> {after}</span> : null}
    </motion.h2>
  )
}

type TagProps = {
  children: ReactNode
  accent?: boolean
}

export function Tag({ children, accent = false }: TagProps) {
  return <span className={cn('tag', accent && 'tag-accent')}>{children}</span>
}

type StatItemProps = {
  value: string
  label: string
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="stat-item">
      <div className="stat-item__value">{value}</div>
      <div className="stat-item__label">{label}</div>
    </div>
  )
}
