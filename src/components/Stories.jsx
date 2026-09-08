import { useState } from 'react'
import { Play } from 'lucide-react'
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
    <section id="stories" className={styles.section} ref={ref}>
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <h2>
          <em>Stories</em> That Inspire Change
        </h2>
        <div className={styles.layout}>
          <div className={styles.media}>
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
          <div>
            <p className={styles.kicker}>{story.label}</p>
            <h3>
              A New Beginning
              <em>for a Farming Family</em>
            </h3>
            <p className={styles.body}>{story.body}</p>
            <Button href="#" variant="outline" onClick={() => setOpen(true)}>
              Read Their Story
            </Button>
          </div>
        </div>
      </div>
      {open && <StoryModal story={story} onClose={() => setOpen(false)} />}
    </section>
  )
}
