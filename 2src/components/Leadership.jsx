import { founderProfile, leadershipMembers } from '../data/leadership'
import { useReveal } from '../hooks/useReveal'
import Button from './Button'
import DecorativePattern from './DecorativePattern'
import styles from './Leadership.module.css'

export default function Leadership() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className={styles.section} ref={ref}>
      <DecorativePattern className={styles.pattern} size={320} opacity={0.14} />
      <div className={`${styles.grid} ${visible ? 'is-visible' : 'reveal'}`}>
        <figure className={styles.portrait}>
          <img src={founderProfile.image} alt={founderProfile.name} />
          <figcaption>
            <strong>{founderProfile.name}</strong>
            <span>{founderProfile.role}</span>
          </figcaption>
        </figure>
        <div className={styles.copy}>
          <h2>
            <em>Leadership</em> Built on Trust and Service
          </h2>
          <p className={styles.body}>{founderProfile.bio}</p>
          <Button href="#about" variant="outline">
            Meet Our Leadership
          </Button>
          <ul className={styles.team}>
            {leadershipMembers.map((member) => (
              <li key={member.name}>
                <img src={member.image} alt="" />
                <p>{member.name}</p>
                <span>{member.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
