import { useReveal } from '../hooks/useReveal'
import {
  AtSign,
  Camera,
  Globe,
  Mail,
  MapPin,
  Phone,
  Play,
} from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  const { ref, visible } = useReveal({ threshold: 0.12 })

  return (
    <footer
      className={`${styles.footer} ${visible ? `${styles.on} motion-on` : ''}`}
      id="cta"
      ref={ref}
    >
      <div className={styles.band} aria-hidden="true" />
      <img
        className={styles.patternSide}
        src="/Vector_footer.png"
        alt=""
        aria-hidden="true"
      />

      <div className={styles.inner}>
        <p className={styles.statement}>
          <em>Together,</em>
          <span>We Build</span>
          <span>Stronger</span>
          <span>Communities</span>
        </p>

        <div className={styles.rule} aria-hidden="true">
          <span className={styles.diamond} />
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h2>Contacts</h2>
            <p className={styles.contact}>
              <MapPin size={15} strokeWidth={1.5} />
              <span>
                Shri Kshethra Dharmasthala Rural Development Project (R.)
                Dharmashri Building, Dharmasthala - 574216
              </span>
            </p>
            <a className={styles.contact} href="tel:+918256277215">
              <Phone size={15} strokeWidth={1.5} />
              <span>+91 8256 277 215</span>
            </a>
            <a className={styles.contact} href="mailto:skdrdp@skdrdpindia.org">
              <Mail size={15} strokeWidth={1.5} />
              <span>skdrdp@skdrdpindia.org</span>
            </a>
          </div>

          <div className={styles.col}>
            <h2>Quick Links</h2>
            <a href="#about">About</a>
            <a href="#impact">Our Work</a>
            <a href="#stories">Impact Stories</a>
            <a href="#activities">News</a>
            <a href="#cta">Contact</a>
            <a href="#cta">Reports</a>
          </div>

          <div className={styles.col}>
            <h2>Resources</h2>
            <a href="#cta">Annual Reports</a>
            <a href="#cta">Single Page Report</a>
            <a href="#awards">Awards</a>
            <a href="#cta">Certifications</a>
            <a href="#activities">Media Gallery</a>
          </div>

          <div className={styles.col}>
            <h2>Legal</h2>
            <a href="#cta">Privacy Policy</a>
            <a href="#cta">Terms</a>
            <a href="#cta">Accessibility</a>
            <a href="#cta">Compliance</a>
            <a href="#cta">Donation</a>
          </div>

          <div className={`${styles.col} ${styles.socialCol}`}>
            <h2>Social Media</h2>
            <div className={styles.social}>
              <a
                href="https://www.instagram.com/skdrdpofficial/"
                aria-label="Instagram"
                rel="noreferrer"
                target="_blank"
              >
                <Camera size={15} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.facebook.com/skdrdpOfficial"
                aria-label="Facebook"
                rel="noreferrer"
                target="_blank"
              >
                <Globe size={15} strokeWidth={1.5} />
              </a>
              <a
                href="https://twitter.com/skdrdpofficial"
                aria-label="X"
                rel="noreferrer"
                target="_blank"
              >
                <AtSign size={15} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCnYVxnsAAAkeedYVTMHm82g"
                aria-label="YouTube"
                rel="noreferrer"
                target="_blank"
              >
                <Play size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.band} ${styles.bandBottom}`} aria-hidden="true" />
    </footer>
  )
}
