import { motion } from 'framer-motion'

import { ABOUT_DATA } from '@/features/about/constants/about.data'
import { MOTION_EASE } from '@/shared/motion'

export function AboutHero() {
  const fullName = `${ABOUT_DATA.name.first} ${ABOUT_DATA.name.last}`

  return (
    <section className="about-hero">
      <motion.img
        className="about-hero__media"
        src={ABOUT_DATA.heroImage}
        alt=""
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: MOTION_EASE }}
      />
      <div className="about-hero__veil" aria-hidden="true" />
      <div className="section__inner about-intro">
        <motion.div
          className="about-intro__portrait-frame"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.2, ease: MOTION_EASE }}
        >
          <img className="about-intro__portrait" src={ABOUT_DATA.portrait} alt={fullName} />
        </motion.div>
        <div className="about-intro__copy">
          <h1>
            <motion.span
              className="accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: MOTION_EASE }}
            >
              {ABOUT_DATA.name.first}
            </motion.span>
            <motion.span
              className="about-intro__lastname"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: MOTION_EASE }}
            >
              {ABOUT_DATA.name.last}
            </motion.span>
          </h1>
          <motion.p
            className="about-intro__roles"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.54, ease: MOTION_EASE }}
          >
            {ABOUT_DATA.roles}
          </motion.p>
          {ABOUT_DATA.bio.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className="about-intro__bio"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.66 + index * 0.12, ease: MOTION_EASE }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
