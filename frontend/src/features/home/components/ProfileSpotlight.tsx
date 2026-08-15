import { motion } from 'framer-motion'

import { HOME_COPY, HOME_IMAGES } from '@/features/home/constants/home.data'
import { Tag } from '@/shared/components/ui'
import { fadeUp } from '@/shared/motion'
import { SplitChars } from '@/shared/motion/SplitChars'

export function ProfileSpotlight() {
  const { profile } = HOME_COPY

  return (
    <section className="section profile-spotlight">
      <div className="section__inner profile-spotlight__grid">
        <motion.div
          className="profile-spotlight__media"
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="profile-spotlight__image"
            src={HOME_IMAGES.portrait}
            alt={`${profile.firstName} ${profile.lastName}`}
          />
        </motion.div>
        <div className="profile-spotlight__copy">
          <h2 className="profile-spotlight__name">
            <SplitChars text={profile.firstName} className="accent" />
            <span className="profile-spotlight__lastname">
              <SplitChars text={profile.lastName} delay={0.12} />
            </span>
          </h2>
          <motion.p className="profile-spotlight__roles" {...fadeUp(0.15, 20, 0.7)}>
            {profile.roles}
          </motion.p>
          <motion.div className="profile-spotlight__tags" {...fadeUp(0.25, 20, 0.7)}>
            {profile.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </motion.div>
          {profile.bio.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              className="profile-spotlight__bio"
              {...fadeUp(0.35 + index * 0.1, 20, 0.7)}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
