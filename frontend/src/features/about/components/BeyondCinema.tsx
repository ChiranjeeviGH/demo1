import { useState } from 'react'
import { motion } from 'framer-motion'

import { BeyondCinemaModal } from '@/features/about/components/BeyondCinemaModal'
import { ABOUT_DATA } from '@/features/about/constants/about.data'
import { SectionHeading } from '@/shared/components/ui'
import { fadeUp } from '@/shared/motion'

type BeyondItem = (typeof ABOUT_DATA.beyond)[number]

export function BeyondCinema() {
  const [activeItem, setActiveItem] = useState<BeyondItem | null>(null)

  return (
    <section className="section beyond-cinema">
      <div className="section__inner">
        <SectionHeading accent="Beyond" after="Cinema" className="beyond-cinema__heading" />
        <div className="beyond-cinema__grid" data-testid="beyond-cinema-grid">
          {ABOUT_DATA.beyond.map((item, index) => (
            <motion.article
              key={item.title}
              className={`beyond-cinema__card beyond-cinema__card--${item.area}`}
              {...fadeUp(index * 0.1, 26, 0.75)}
              data-testid={`beyond-cinema-card-${item.area}`}
            >
              <img src={item.image} alt="" />
              <div className="beyond-cinema__content">
                <h3>{item.title}</h3>
                <button
                  type="button"
                  className="beyond-cinema__details"
                  onClick={() => setActiveItem(item)}
                  data-testid={`beyond-cinema-details-${item.area}`}
                >
                  View Details
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {activeItem ? <BeyondCinemaModal item={activeItem} onClose={() => setActiveItem(null)} /> : null}
    </section>
  )
}
