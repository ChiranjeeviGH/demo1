import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'

import { PRODUCTIONS } from '@/features/productions/constants/productions.data'
import { MOTION_EASE, VIEWPORT_ONCE } from '@/shared/motion'

export function ProductionsContainer() {
  const [playing, setPlaying] = useState<number | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const closeModal = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      } catch (e) {
        /* ignore */
      }
    }
    setPlaying(null)
  }

  return (
    <section className="productions-section">
      <motion.div
        className="page-heading"
        id="home"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: MOTION_EASE }}
      >
        <h1>
          <span>OUR</span> PRODUCTIONS
        </h1>
      </motion.div>

      <div className="productions-list">
        {PRODUCTIONS.map((item, index) => (
          <motion.article
            className="production"
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.08, ease: MOTION_EASE }}
            data-testid={`production-card-${item.id}`}
          >
            <div className="production-image-wrap">
              <img src={item.banner} alt={`${item.title} production`} className="production-image" />
              <div className="image-overlay" />
              <button
                className="play-button"
                onClick={() => setPlaying(index)}
                aria-label={`Play ${item.title}`}
                data-testid={`play-btn-${item.id}`}
              >
                <span />
              </button>
            </div>

            <div className="production-info">
              <img src={item.poster} alt="" className="poster" />

              <div className="production-copy">
                <h3>{item.title}</h3>

                <div className="meta">
                  <span>{item.language}</span>
                  <i />
                  <span>{item.runtime}</span>
                  <i />
                  <span>{item.rating}</span>
                </div>

                <div className="genre-tags">
                  {item.genres.map((genre) => (
                    <span className="genre-tag" key={genre}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p className="production-description">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {playing !== null && (
        <div className="modal" onClick={closeModal} data-testid="production-modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close"
              data-testid="production-modal-close"
            >
              ×
            </button>

            <video
              ref={videoRef}
              src={encodeURI(PRODUCTIONS[playing].video)}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="modal-video"
            />

            <div className="modal-caption">
              <span>NOW VIEWING</span>
              <h3>{PRODUCTIONS[playing].title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
