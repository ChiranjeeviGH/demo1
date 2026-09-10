import { activities } from '../data/activities'
import { useReveal } from '../hooks/useReveal'
import Button from './Button'
import styles from './Activities.module.css'

export default function Activities() {
  const { ref, visible } = useReveal()

  return (
    <section id="activities" className={styles.section} ref={ref}>
      <div className={styles.pattern} aria-hidden="true" />
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <h2>
          <em>Activities</em> Across SKDRDP
        </h2>
        <div className={styles.intro}>
          <p>
            From community development programmes to awareness campaigns and training initiatives,
            discover how SKDRDP continues to create impact across Karnataka every day.
          </p>
          <Button className={styles.explore} variant="solid" href="#activities">
            Explore All Activities
          </Button>
        </div>
        <div className={styles.row}>
          {activities.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt="" loading="lazy" />
              <span className={styles.date}>{item.date}</span>
              <div className={styles.copy}>
                <small>{item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
