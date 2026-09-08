import { founderProfile, leadershipMembers } from '../data/leadership'
import { useReveal } from '../hooks/useReveal'
import Button from './Button'
import styles from './Leadership.module.css'

export default function Leadership() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="about"
      ref={ref}
      className={styles.section}
    >

      {/* =================================================
          FIGMA DECORATIONS
      ================================================= */}

      {/* Top-left horizontal ornament */}
      <img
        src="/assets/leadership-horizontal-ornament.png"
        className={styles.ornamentTop}
        alt=""
        aria-hidden="true"
      />

      {/* Bottom-left horizontal ornament */}
      <img
        src="/assets/leadership-horizontal-ornament.png"
        className={styles.ornamentBottomLeft}
        alt=""
        aria-hidden="true"
      />

      {/* Right-side lattice ornament */}
      <img
        src="/assets/leadership-lattice-ornament.png"
        className={styles.ornamentRight}
        alt=""
        aria-hidden="true"
      />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className={`${styles.grid} ${
          visible ? 'is-visible' : 'reveal'
        }`}
      >

        {/* Founder */}
        <figure className={styles.portrait}>

          <img
            src={founderProfile.image}
            alt={founderProfile.name}
          />

          <figcaption>

            <strong>
              {founderProfile.name}
            </strong>

            <span>
              {founderProfile.role}
            </span>

          </figcaption>

        </figure>


        {/* Right content */}
        <div className={styles.copy}>

          <h2>
            <em>Leadership</em> Built on Trust
            <br />
            and Service
          </h2>


          <p className={styles.body}>
            {founderProfile.bio}
          </p>


          <Button
            href="#about"
            variant="primary"
          >
            Meet Our Leadership
          </Button>


          <div className={styles.teamHeading}>
            Team Members
          </div>


          <ul className={styles.team}>

            {leadershipMembers.map((member) => (

              <li
                key={member.name}
                className={styles.member}
              >

                <div className={styles.memberImage}>

                  <img
                    src={member.image}
                    alt={member.name}
                  />

                </div>


                <p>
                  {member.name}
                </p>


                <span>
                  {member.role}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </section>
  )
}