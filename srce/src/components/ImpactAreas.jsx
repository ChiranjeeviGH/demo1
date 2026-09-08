import { ArrowUpRight } from 'lucide-react'
import { impactAreas } from '../data/impactAreas'
import { useReveal } from '../hooks/useReveal'
import styles from './ImpactAreas.module.css'

export default function ImpactAreas() {
  const { ref, visible } = useReveal()

  return (
    <section id="impact" className={styles.section} ref={ref}>
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <header>
          <h2>
            <em>Driving Change</em> Across Every Stage of Rural Development
          </h2>
          <p>
            Credit, care, skills, and village infrastructure — organised through
            self-help groups at every stage of rural life.
          </p>
        </header>
        <div className={styles.masonry}>
          {impactAreas.map((area) => (
            <article key={area.id} className={`${styles.card} ${styles[area.size]}`}>
              <img src={area.image} alt="" loading="lazy" />
              <div className={styles.shade} />
              <div className={styles.meta}>
                <span>{area.id}</span>
                <h3>
                  {area.title}
                  <ArrowUpRight className={styles.arrow} size={18} />
                </h3>
                <p>{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
