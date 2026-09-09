import { impactAreas } from '../data/impactAreas'
import { useReveal } from '../hooks/useReveal'
import styles from './ImpactAreas.module.css'

export default function ImpactAreas() {
  const { ref, visible } = useReveal()

  return (
    <section id="impact" className={styles.section} ref={ref}>
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <header className={styles.header}>
          <div className={styles.headingWrap}>
            <h2>
              Driving Change Across Every
              <br />
              Stage of <em>Rural Development</em>
            </h2>
            <p>
              Our initiatives span financial inclusion, agriculture, healthcare,
              education, women&apos;s empowerment, and social welfare, creating
              sustainable impact across Karnataka.
            </p>
          </div>

          <a href="#programmes" className={styles.primaryCta}>
            View All Programmes
            <span aria-hidden="true">→</span>
          </a>
        </header>

        <div className={styles.grid}>
          {impactAreas.map((area) => (
            <article key={area.id} className={`${styles.card} ${styles[area.size]}`}>
              <img className={styles.cardAsset} src={area.image} alt={area.title} loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
