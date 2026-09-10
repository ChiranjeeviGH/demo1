import { ArrowUpRight } from 'lucide-react'
import { impactAreas } from '../data/impactAreas'
import { useReveal } from '../hooks/useReveal'
import Button from './Button'
import styles from './ImpactAreas.module.css'

export default function ImpactAreas() {
  const { ref, visible } = useReveal()

  return (
    <section id="impact" className={styles.section} ref={ref}>
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <header>
          <h2>
            Driving Change Across Every
            <br className={styles.headingBreak} />
            Stage of <em>Rural Development</em>
          </h2>
          <p>
            Our initiatives span financial inclusion, agriculture, healthcare,
            education, women&apos;s empowerment, and social welfare, creating
            sustainable impact across Karnataka.
          </p>
          <Button href="#activities" className={styles.programmesButton}>
            View All Programmes
          </Button>
        </header>
        <div className={styles.masonry}>
          {impactAreas.map((area) => (
            <article
              key={area.id}
              className={`${styles.card} ${styles[area.size]} ${styles[`card${area.id}`]}`}
            >
              <img src={area.image} alt="" loading="lazy" />
              <div className={styles.shade} />
              <div className={styles.meta}>
                <span>40+ Years of Impact</span>
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
