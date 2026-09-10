import DistrictImage from './DistrictImage'
import DistrictStats from './DistrictStats'
import styles from './Presence.module.css'

export default function DistrictInfoPanel({ district }) {
  return (
    <div className={styles.cardDynamicInner}>
      <div className={styles.details}>
        <span className={styles.kicker}>District</span>
        <h3>{district.name}</h3>
        <p className={styles.description}>{district.description}</p>
        <DistrictStats stats={district.stats} />
        <a className={styles.events} href="#activities">
          View Events <span aria-hidden="true">→</span>
        </a>
      </div>
      <DistrictImage district={district} />
    </div>
  )
}
