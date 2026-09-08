import { Trophy } from 'lucide-react'
import { awards } from '../data/awards'
import { useReveal } from '../hooks/useReveal'
import styles from './Awards.module.css'

export default function Awards() {
  const { ref, visible } = useReveal()
  const loop = [...awards, ...awards]

  return (
    <section id="awards" className={styles.section} ref={ref} aria-label="Awards and recognition">
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <h2>
          <em>Recognized</em> for Excellence and Impact
        </h2>
        <p>
          Partnerships, certifications, and community programmes that have been
          tested in Karnataka’s villages for more than four decades.
        </p>
      </div>
      <div className={styles.scroller} tabIndex={0}>
        <ul>
          {loop.map((award, i) => (
            <li key={`${award.title}-${i}`}>
              <Trophy size={22} strokeWidth={1.4} aria-hidden="true" />
              <div>
                <strong>{award.org}</strong>
                <span>
                  {award.title} · {award.year}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
