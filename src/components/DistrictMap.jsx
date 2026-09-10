import styles from './Presence.module.css'

export default function DistrictMap({ districts, selectedId }) {
  return (
    <div className={styles.mapCard}>
      <img
        className={styles.mapAsset}
        src="/karnataka_map.png"
        alt="Karnataka map showing the selected district"
      />
    </div>
  )
}
