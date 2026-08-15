import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '@/features/sangha/styles/sangha.css'
import '@/features/sangha/styles/sangha.overrides.css'

import { MOTION_EASE, fadeUp } from '@/shared/motion'
import { useIntro } from '@/shared/motion/IntroContext'
import { SplitChars } from '@/shared/motion/SplitChars'

const stats = [
  { value: '850+', label: 'Volunteers' },
  { value: '43', label: 'Events Conducted' },
  { value: '12', label: 'Cities' },
  { value: '4200+', label: 'Lives Impacted' },
]

const events = [
  {
    title: 'BLOOD DONATION CAMP',
    date: '15 August 2026',
    place: 'Bangalore',
    description:
      'A community-led blood donation drive that brings citizens, youth volunteers and local partners together to support urgent medical needs and strengthen public health awareness.',
    image: '/media/event-1.png',
  },
  {
    title: 'SWACHH KARNATAKA DRIVE',
    date: '15 August 2026',
    place: 'Mysore',
    description:
      'A city-wide cleaning and awareness campaign focused on cleaner streets, greener public spaces and a stronger sense of civic responsibility across neighborhoods.',
    image: '/media/event-2.png',
  },
  {
    title: 'SCHOOL RENOVATION',
    date: '20 April 2026',
    place: 'Hubli',
    description:
      'Working with educators, volunteers and donors to restore classrooms, libraries and playgrounds so children can learn in safe, inspiring environments.',
    image: '/media/event-3.png',
  },
]

const galleryItems = [
  { image: '/media/gallery-1.png' },
  { image: '/media/gallery-2.png' },
  { image: '/media/gallery-3.png' },
  { image: '/media/gallery-1.png' },
  { image: '/media/gallery-2.png' },
  { image: '/media/gallery-3.png' },
  { image: '/media/gallery-1.png' },
  { image: '/media/gallery-2.png' },
  { image: '/media/gallery-3.png' },
]

export function SanghaPage() {
  const { introComplete } = useIntro()
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [registeredEvent, setRegisteredEvent] = useState<any>(null)
  const [registerError, setRegisterError] = useState(false)

  useEffect(() => {
    setRegisteredEvent(null)
    setRegisterError(false)
  }, [selectedEvent])

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedEvent) return

    const data = new FormData(event.currentTarget)
    setRegisterError(false)

    try {
      const response = await fetch('/api/sangha/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: selectedEvent.title,
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setRegisteredEvent(selectedEvent.title)
    } catch {
      setRegisterError(true)
    }
  }

  return (
    <div className="sangha-page">
      <main className="sangha-main">
        <section
          className="sangha-hero"
          style={{ backgroundImage: "url('/media/sangha-hero.png')" }}
        >
          <div className="hero-inner">
            <h1>
              <SplitChars
                text="DAALI'S ABHIMANI"
                mode="load"
                play={introComplete}
                delay={0.4}
              />{' '}
              <SplitChars
                text="SANGHA"
                className="hero-accent"
                mode="load"
                play={introComplete}
                delay={0.62}
              />
            </h1>
            <motion.p
              className="hero-caption"
              initial={{ opacity: 0, y: 18 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.75, delay: 0.78, ease: MOTION_EASE }}
            >
              Stories don't end when the credits roll.
            </motion.p>
            <motion.p
              className="hero-subtext"
              initial={{ opacity: 0, y: 18 }}
              animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.75, delay: 0.9, ease: MOTION_EASE }}
            >
              Join us in creating meaningful civic impact through community service,
              environmental initiatives, education, and health care.
            </motion.p>
          </div>
        </section>

        <section className="stats" aria-label="Sangha stats">
          <div className="stats-grid" data-testid="sangha-stats">
            {stats.map((stat, index) => (
              <motion.div
                className="stat"
                key={stat.label}
                {...fadeUp(index * 0.08, 22, 0.7)}
                data-testid={`sangha-stat-${index}`}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="upcoming">
          <h2>
            <SplitChars text="UPCOMING" className="split-plain" />{' '}
            <SplitChars text="EVENTS" delay={0.14} />
          </h2>

          <div className="event-list">
            {events.map((event, index) => (
              <motion.article
                className={`event-card ${index % 2 === 1 ? 'reverse' : ''}`}
                key={event.title}
                {...fadeUp(0.05, 28, 0.8)}
                data-testid={`event-card-${index}`}
              >
                <div className="event-image-wrap">
                  <img src={event.image} alt={event.title} />
                </div>

                <div className="event-copy">
                  <h3>{event.title}</h3>
                  <div className="meta-row">
                    <span className="meta-icon">◌</span>
                    <span>{event.date}</span>
                    <span className="meta-separator">•</span>
                    <span>{event.place}</span>
                  </div>
                  <p>{event.description}</p>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setSelectedEvent(event)}
                    data-testid={`event-register-btn-${index}`}
                  >
                    REGISTER NOW
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="cta-block" aria-label="Sangha message">
          <h2>
            <SplitChars text="CINEMA" className="split-plain" />{' '}
            <SplitChars text="INSPIRES." delay={0.1} />
            <br />
            <SplitChars text="ACTION CHANGES" className="split-plain" delay={0.2} />{' '}
            <SplitChars text="LIVES." delay={0.36} />
          </h2>
          <motion.p {...fadeUp(0.3, 18, 0.75)}>
            Daali's Abhimani Sangha believes that stories have the power to inspire change,
            but real change happens when people come together. Through health camps, environmental drives, education initiatives, and social service activities, we aim to build stronger communities across Karnataka.
          </motion.p>
        </section>

        <section className="gallery-section" aria-label="Sangha gallery">
          <div className="gallery-grid" data-testid="sangha-gallery">
            {galleryItems.map((item, index) => (
              <motion.div
                className={`gallery-tile tile-${index % 3 + 1}`}
                key={`${item.image}-${index}`}
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: (index % 3) * 0.09, ease: MOTION_EASE }}
                data-testid={`gallery-tile-${index}`}
              >
                <img src={item.image} alt="Community activity" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {selectedEvent && (
        <div
          className="event-modal"
          onClick={() => setSelectedEvent(null)}
          data-testid="event-modal"
        >
          <div
            className="event-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-back"
              onClick={() => setSelectedEvent(null)}
              data-testid="event-modal-back"
            >
              ← Back
            </button>

            <div className="modal-layout">
              <div className="modal-info">
                <h3>{selectedEvent.title}</h3>
                <div className="modal-meta-row">
                  <span className="meta-icon">◌</span>
                  <span>{selectedEvent.date}</span>
                  <span className="meta-separator">•</span>
                  <span>{selectedEvent.place}</span>
                </div>
                <p>{selectedEvent.description}</p>
                <div className="modal-photo-wrap">
                  <img src={selectedEvent.image} alt={selectedEvent.title} />
                </div>
              </div>

              <div className="modal-form-wrap">
                <p className="form-title">Fill the form to register for the event</p>

                {registeredEvent === selectedEvent.title ? (
                  <div className="success-state" aria-live="polite" data-testid="event-register-success">
                    <div className="success-badge">✓</div>
                    <h4>Successfully Registered</h4>
                    <p>
                      Thank you for registering for <strong>{selectedEvent.title}</strong>.
                    </p>
                  </div>
                ) : (
                  <form className="modal-form" onSubmit={handleRegister} data-testid="event-register-form">
                    <div className="input-row two-col">
                      <label>
                        <span>Your Name</span>
                        <input type="text" name="name" placeholder="Full name" required data-testid="event-register-name" />
                      </label>
                      <label>
                        <span>Email Address</span>
                        <input type="email" name="email" placeholder="you@email.com" required data-testid="event-register-email" />
                      </label>
                    </div>

                    <div className="input-row">
                      <label>
                        <span>Subject</span>
                        <input type="text" name="subject" placeholder="Select a topic" data-testid="event-register-subject" />
                      </label>
                    </div>

                    {registerError ? (
                      <p className="form-error" data-testid="event-register-error">
                        Something went wrong. Please try again.
                      </p>
                    ) : null}

                    <button type="submit" className="register-btn" data-testid="event-register-submit">
                      Register
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
