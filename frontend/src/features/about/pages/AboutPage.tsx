import type { CSSProperties } from 'react'

import { AboutContainer } from '@/features/about/containers/AboutContainer'
import { ABOUT_DATA } from '@/features/about/constants/about.data'
import '@/features/about/styles/about.css'

export function AboutPage() {
  return (
    <div
      className="about-page"
      style={{ '--about-contact-image': `url('${ABOUT_DATA.heroImage}')` } as CSSProperties}
    >
      <div className="about-grain" aria-hidden="true" />
      <AboutContainer />
    </div>
  )
}
