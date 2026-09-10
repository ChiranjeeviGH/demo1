import { founderProfile, leadershipMembers } from '../data/leadership'
import { useReveal } from '../hooks/useReveal'
import Button from './Button'
import styles from './Leadership.module.css'

export default function Leadership() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={`${styles.grid} ${visible ? 'is-visible' : 'reveal'}`}>
        <figure className={styles.portrait}>
          <div className={styles.patternTop} aria-hidden="true" />
          <img src={founderProfile.image} alt={founderProfile.name} className={styles.portraitImage} />
          <div className={styles.patternBottom} aria-hidden="true" />
          <figcaption className={styles.nameTag}>
            <img src={founderProfile.nameplate} alt={founderProfile.name} className={styles.nameplate} />
          </figcaption>
        </figure>
        <div className={styles.copy}>
          <h2>
            <em>Leadership</em> Built on Trust and Service
          </h2>
          <p className={styles.body}>{founderProfile.bio}</p>
          <Button href="#about" variant="solid">
            View More Leadership
          </Button>
          <div className={styles.teamBlock}>
            <h3 className={styles.teamHeading}>Team Members</h3>
            <ul className={styles.team}>
              {leadershipMembers.map((member) => (
                <li key={member.name}>
                  <img src={member.image} alt="" />
                  <p>{member.name}</p>
                  <span>{member.role}</span>
                </li>
              ))}
            </ul>
            <div className={styles.patternCorner} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
