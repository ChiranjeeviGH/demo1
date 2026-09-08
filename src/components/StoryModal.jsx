import { useEffect } from 'react'
import { X } from 'lucide-react'
import styles from './StoryModal.module.css'

export default function StoryModal({ story, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="story-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close story">
          <X size={18} />
        </button>
        <h2 id="story-title">{story.title}</h2>
        <div className={styles.frame}>
          <iframe
            title={story.title}
            src={`${story.video}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
        <p>{story.body}</p>
      </div>
    </div>
  )
}
