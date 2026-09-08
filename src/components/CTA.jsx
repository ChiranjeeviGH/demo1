import Button from './Button'
import DecorativePattern from './DecorativePattern'
import styles from './CTA.module.css'

export default function CTA() {
  return (
    <section id="cta" className={styles.section}>
      <DecorativePattern className={styles.pattern} size={360} opacity={0.16} />
      <div className={styles.inner}>
        <h2>
          Together,
          <em>We Build</em>
          Stronger Communities
        </h2>
        <p>
          Partner with SKDRDP — as a volunteer, banker, collaborator, or
          neighbour — to keep rural families organised, banked, and heard.
        </p>
        <Button href="mailto:skdrdp@skdrdpindia.org" variant="solid">
          Join Our Journey
        </Button>
      </div>
    </section>
  )
}
