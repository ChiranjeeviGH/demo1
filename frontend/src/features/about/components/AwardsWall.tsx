import { motion } from 'framer-motion'

import { ABOUT_DATA } from '@/features/about/constants/about.data'
import { SectionHeading } from '@/shared/components/ui'
import { MOTION_EASE, VIEWPORT_ONCE } from '@/shared/motion'

export function AwardsWall() {
  return (
    <section className="section awards-wall">
      <div className="section__inner">
        <SectionHeading accent="Awards" after="Wall" className="awards-wall__heading" />
        <div className="awards-wall__grid" data-testid="awards-wall">
          {ABOUT_DATA.awards.map((award, index) => (
            <motion.article
              key={`${award.year}-${award.org}-${award.status}-${index}`}
              className="award-item"
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.65, delay: index * 0.09, ease: MOTION_EASE }}
              data-testid={`award-item-${index}`}
            >
              <div className="award-item__icon">
                <img
                  className="award-item__image"
                  src={award.image}
                  alt={`${award.org} trophy`}
                />
              </div>
              <p className="award-item__meta">
                {award.year} {award.org}
              </p>
              <h3 className="award-item__category">{award.category}</h3>
              <p className="award-item__status">{award.status}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
