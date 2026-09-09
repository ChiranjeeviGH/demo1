import styles from './Presence.module.css'

export default function DistrictMap() {
  return (
    <div className={styles.mapCard}>
      <img
        className={styles.mapAsset}
        src="/Frame 177.png"
        alt="Karnataka map showing the selected district"
      />
    </div>
  )
}
