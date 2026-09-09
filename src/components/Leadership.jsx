import styles from './Leadership.module.css'

export default function Leadership() {
  return (
    <section id="about" className={styles.section}>
      <img
        className={styles.figmaExport}
        src="/leadership-figma.png"
        alt="Leadership built on trust and service, featuring Dr. D. Veerendra Heggade and the SKDRDP team"
      />
      <a
        className={styles.leadershipCta}
        href="#about"
        aria-label="View more Leadership"
      />
    </section>
  )
}