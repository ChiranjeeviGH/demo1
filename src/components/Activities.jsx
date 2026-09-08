import { activities } from '../data/activities'
import { useReveal } from '../hooks/useReveal'
import styles from './Activities.module.css'

export default function Activities() {
  const { ref, visible } = useReveal()

  return (
    <section id="activities" className={styles.section} ref={ref}>
      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <h2>
          <em>Activities</em> Across SKDRDP
        </h2>
        <div className={styles.row}>
          {activities.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt="" loading="lazy" />
              <span>{item.tag}</span>
              <div className={styles.copy}>
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
