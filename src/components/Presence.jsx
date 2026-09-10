import { useReveal } from '../hooks/useReveal'
import DecorativePattern from './DecorativePattern'
import DistrictMap from './DistrictMap'
import { districtList } from '../data/districts'
import styles from './Presence.module.css'

export default function Presence() {
  const { ref, visible } = useReveal()
  const selectedDistrict = districtList.find((district) => district.id === 'mysuru') ?? districtList[0]

  return (
    <section id="presence" className={styles.section} ref={ref}>
      <DecorativePattern className={styles.pattern} size={280} opacity={0.12} />

      <div className={`${styles.inner} ${visible ? 'is-visible' : 'reveal'}`}>
        <div className={styles.headingBlock}>
          <h2>
            Our <em>Presence</em> Across Karnataka
          </h2>
          <p className={styles.intro}>
            Discover how SKDRDP is creating meaningful impact across districts through locally driven initiatives and community partnerships.
          </p>
        </div>

        <div className={styles.layout}>
          <article className={styles.card} aria-live="polite">
            <img
              className={styles.cardImage}
              src="/mysuru_card.png"
              alt="Mysuru district impact card"
            />
          </article>

          <DistrictMap
            districts={districtList}
            selectedId={selectedDistrict.id}
          />
        </div>
      </div>
    </section>
  )
}
