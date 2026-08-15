import type { CSSProperties } from 'react'

import { SANGHA_DATA } from '@/features/sangha/constants/sangha.data'

export function SanghaHero() {
  return (
    <section
      className="hero-banner sangha-hero"
      style={{ '--hero-image': `url('${SANGHA_DATA.heroImage}')` } as CSSProperties}
    >
      <div className="hero-banner__content">
        <h1>
          {SANGHA_DATA.title} <span className="accent">{SANGHA_DATA.titleAccent}</span>
        </h1>
        <p>{SANGHA_DATA.subtitle}</p>
      </div>
    </section>
  )
}
