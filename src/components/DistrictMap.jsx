import styles from './Presence.module.css'

export default function DistrictMap({ districts, selectedId, onHover, onSelect }) {
  return (
    <div className={styles.mapCard}>
      <img
        className={styles.mapAsset}
        src="/Frame 177.png"
        alt="Karnataka map showing the selected district"
      />
      <div className={styles.hotspots} aria-label="Select a district">
        {districts.map((district) => (
          <button
            key={district.id}
            type="button"
            className={`${styles.hotspot} ${selectedId === district.id ? styles.hotspotActive : ''}`}
            style={{ left: `${district.x}%`, top: `${district.y}%` }}
            aria-label={`Show ${district.name}`}
            aria-pressed={selectedId === district.id}
            onMouseEnter={() => onHover(district.id)}
            onFocus={() => onHover(district.id)}
            onClick={() => onSelect(district.id)}
          >
            {selectedId === district.id && district.id !== 'mysuru' && (
              <span className={styles.activeMarker} aria-hidden="true">
                <span className={styles.markerDot} />
                <span className={styles.markerLabel}>📍 {district.name.toUpperCase()}</span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
