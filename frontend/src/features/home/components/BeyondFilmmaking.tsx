import { motion } from 'framer-motion'

import { HOME_COPY, HOME_IMAGES } from '@/features/home/constants/home.data'
import { SectionHeading } from '@/shared/components/ui'
import { fadeUp } from '@/shared/motion'

const BEYOND_SECTION_HREF = 'https://www.youtube.com/'

export function BeyondFilmmaking() {
  return (
    <section className="section beyond-filmmaking">
      <div className="section__inner">
        <SectionHeading before="Beyond" accent="Filmmaking" className="beyond-filmmaking__heading" />
        <a
          href={BEYOND_SECTION_HREF}
          className="beyond-grid"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Beyond Filmmaking — opens in a new tab"
          data-testid="beyond-filmmaking-grid"
        >
          {HOME_COPY.beyond.map((item, index) => (
            <motion.article
              key={item.id}
              className={`beyond-card${index === 0 ? ' beyond-card--wide' : ''}`}
              {...fadeUp(index * 0.1, 25, 0.75)}
              data-testid={`beyond-card-${item.id}`}
            >
              <div className="beyond-card__icon" aria-hidden="true">
                <img src={HOME_IMAGES.socials.youtube} alt="" />
              </div>
              <span className="beyond-card__id">{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </a>
      </div>
    </section>
  )
}
