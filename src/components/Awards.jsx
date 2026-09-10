import { useState } from 'react'
import { awards } from '../data/awards'
import { useReveal } from '../hooks/useReveal'
import styles from './Awards.module.css'

export default function Awards() {
  const { ref, visible } = useReveal()
  const [activeFilter, setActiveFilter] = useState('All Awards')
  const filters = [
    'All Awards',
    'Finance & Governance',
    'Social Welfare',
    'Rural Development',
    'Education',
    'Sustainability',
  ]
  const loop = [...awards, ...awards]

  return (
    <section
      id="awards"
      className={`${styles.section} ${visible ? `${styles.on} motion-on` : ''}`}
      ref={ref}
      aria-label="Awards and recognition"
    >
      <div className={`${styles.pattern} ${styles.patternLeft}`} aria-hidden="true" />
      <div className={`${styles.pattern} ${styles.patternRight}`} aria-hidden="true" />
      <div className={`${styles.pattern} ${styles.patternBottom}`} aria-hidden="true" />
      <div className={styles.inner}>
          <h2 className="heading-reveal">
            <em>Recognized</em> for Excellence and Impact
          </h2>
        <p>
          Our work has been acknowledged through national and international awards,
          certifications, and partnerships that reinforce our commitment to
          transparency and social impact.
        </p>
        <div className={styles.filters} role="tablist" aria-label="Award categories">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? styles.filterActive : ''}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.scroller} tabIndex={0}>
        <ul>
          {loop.map((award, i) => (
            <li key={`${award.title}-${i}`} aria-label={`${award.org}: ${award.title}`}>
              <img
                src="/ChatGPT Image Jul 13, 2026, 03_07_40 PM 1.png"
                alt=""
                aria-hidden="true"
              />
              <strong>Best NGO in Social</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
