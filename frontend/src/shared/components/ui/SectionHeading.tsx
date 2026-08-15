import type { ReactNode } from 'react'

import { cn } from '@/shared/utils/cn'
import { SplitChars } from '@/shared/motion/SplitChars'

type SectionHeadingProps = {
  before?: string
  accent: string
  after?: string
  className?: string
}

export function SectionHeading({ before, accent, after, className }: SectionHeadingProps) {
  return (
    <h2 className={cn('section-heading', className)}>
      {before ? (
        <>
          <SplitChars text={before} />{' '}
        </>
      ) : null}
      <SplitChars text={accent} className="accent" delay={0.1} />
      {after ? (
        <>
          {' '}
          <SplitChars text={after} delay={0.18} />
        </>
      ) : null}
    </h2>
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
