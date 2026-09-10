import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { stories } from '../data/stories'
import { useReveal } from '../hooks/useReveal'
import Button from './Button'
import StoryModal from './StoryModal'
import styles from './Stories.module.css'

export default function Stories() {
  const story = stories[0]
  const { ref, visible } = useReveal()
  const [open, setOpen] = useState(false)

  return (
    <section
      id="stories"
      className={`${styles.section} ${visible ? `${styles.on} motion-on` : ''}`}
      ref={ref}
    >
      <div className={styles.patternRight} aria-hidden="true" />
      <div className={styles.inner}>
          <h2 className="heading-reveal">
            <em>Stories</em> That Inspire Change
          </h2>
        <div className={styles.intro}>
          <p>
            Behind every initiative is a story of resilience, opportunity and transformation.
            Discover how SKDRDP programmes are creating lasting change across rural communities.
          </p>
          <Button className={styles.allStories} variant="solid" href="#stories">
            View All Testimonials
          </Button>
        </div>
        <div className={styles.layout}>
          <div className={styles.mediaCol}>
            <div className={`${styles.media} image-reveal`}>
              <img src={story.image} alt="" loading="lazy" />
              <button
                type="button"
                className={styles.play}
                aria-label="Play featured story"
                onClick={() => setOpen(true)}
              >
                <Play size={28} fill="currentColor" />
              </button>
            </div>
            <div className={styles.pattern} aria-hidden="true" />
          </div>
          <div>
            <p className={styles.kicker}>{story.label}</p>
            <h3>
              A New Beginning
              <em>for a Farming Family</em>
            </h3>
            <p className={styles.body}>{story.body}</p>
            <div className={styles.pagination} aria-label="Story navigation">
              <button type="button" className={styles.pageButton} aria-label="Previous story" disabled>
                <ChevronLeft size={18} />
              </button>
              <span>01/03</span>
              <button type="button" className={styles.pageButton} aria-label="Next story">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && <StoryModal story={story} onClose={() => setOpen(false)} />}
    </section>
  )
}
