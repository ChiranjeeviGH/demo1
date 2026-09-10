import styles from './Presence.module.css'

export default function DistrictImage({ district }) {
  return (
    <div className={styles.photo}>
      <img
        key={district.id}
        src={district.masterAsset ?? district.image}
        alt={`${district.name} district`}
      />
    </div>
  )
}
