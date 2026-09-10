import styles from './Presence.module.css'

export default function DistrictMap({ districts, selectedId }) {
  return (
    <div className={styles.mapCard}>
      <img
        className={styles.mapAsset}
        src="/karnataka_map.png"
        alt="Karnataka map showing the selected district"
      />
      <div className={styles.hotspots} aria-label="District map">
        {districts.map((district) => (
          <div
            key={district.id}
            className={`${styles.hotspot} ${selectedId === district.id ? styles.hotspotActive : ''}`}
            style={{ left: `${district.x}%`, top: `${district.y}%` }}
          >
            {selectedId === district.id && (
              <span className={styles.activeMarker} aria-hidden="true">
                <span className={styles.markerDot} />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
