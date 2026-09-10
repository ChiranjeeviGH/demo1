import { stats } from '../data/stats'
import { useCountUp } from '../hooks/useCountUp'
import { useReveal } from '../hooks/useReveal'
import styles from './Stats.module.css'

function formatValue(n) {
  return n.toLocaleString('en-IN')
}

function Stat({ item, active }) {
  if (item.details) {
    return (
      <article className={`${styles.item} ${styles.highlight}`}>
        <div className={styles.detailGrid}>
          {item.details.map((detail) => (
            <div className={styles.detail} key={detail.label}>
              <p className={styles.detailValue}>{detail.value}</p>
              <p className={styles.detailLabel}>{detail.label}</p>
            </div>
          ))}
        </div>
      </article>
    )
  }

  const value = useCountUp(item.value, active)
  return (
    <article className={`${styles.item} ${styles.metric} ${item.highlight ? styles.highlight : ''}`}>
      <p className={styles.value}>
        <span>{formatValue(value)}</span>
        <span>{item.suffix}</span>
      </p>
      <p className={styles.label}>{item.label}</p>
    </article>
  )
}

export default function Stats() {
  const { ref, visible } = useReveal()

  return (
    <section
      id="impact-stats"
      className={`${styles.wrap} ${visible ? styles.on : ''}`}
      ref={ref}
      aria-label="Impact statistics"
    >
      <div className={styles.inner}>
        {stats.map((item) => (
          <Stat key={item.label} item={item} active={visible} />
        ))}
      </div>
    </section>
  )
}
