import { motion } from 'framer-motion'

import { ContactForm } from '@/shared/components/ContactForm'
import { fadeSide } from '@/shared/motion'
import socialInstagram from '@/shared/assets/social-instagram.png'
import socialX from '@/shared/assets/social-x.png'
import socialYoutube from '@/shared/assets/social-youtube.png'

type ContactSectionProps = {
  subtitle?: string
  submitLabel?: string
  nameLabel?: string
  showPhone?: boolean
  showSubject?: boolean
}

const SOCIAL_LINKS = [
  { href: 'https://instagram.com', label: 'Instagram', icon: socialInstagram },
  { href: 'https://x.com', label: 'X', icon: socialX },
  { href: 'https://youtube.com', label: 'YouTube', icon: socialYoutube },
] as const

export function ContactSection({
  subtitle = 'Have a story? A collaboration? A vision? Let’s talk.',
  submitLabel = 'Send Message',
  nameLabel,
  showPhone,
  showSubject,
}: ContactSectionProps) {
  return (
    <section className="section contact-section">
      <div className="section__inner contact-grid">
        <motion.div className="contact-section__copy" {...fadeSide(-20, 0, 0.8)}>
          <h2 className="contact-section__title">
            <span className="contact-section__title-line">
              Let’s <span className="accent">Make</span>
            </span>
            <span className="contact-section__title-line">
              Something <span className="accent">Great.</span>
            </span>
          </h2>
          {subtitle ? <p className="contact-section__subtitle">{subtitle}</p> : null}
          <div className="socials" aria-label="Social links">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                data-testid={`social-link-${social.label.toLowerCase()}`}
              >
                <img src={social.icon} alt="" width={20} height={20} />
              </a>
            ))}
          </div>
        </motion.div>
        <ContactForm
          submitLabel={submitLabel}
          nameLabel={nameLabel}
          showPhone={showPhone}
          showSubject={showSubject}
        />
      </div>
    </section>
  )
}
