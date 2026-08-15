import { motion } from 'framer-motion'

import { ContactForm } from '@/shared/components/ContactForm'
import { fadeUp } from '@/shared/motion'
import { SplitChars } from '@/shared/motion/SplitChars'
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
        <div className="contact-section__copy">
          <h2 className="contact-section__title">
            <span className="contact-section__title-line">
              <SplitChars text="Let’s" /> <SplitChars text="Make" className="accent" delay={0.08} />
            </span>
            <span className="contact-section__title-line">
              <SplitChars text="Something" delay={0.16} />{' '}
              <SplitChars text="Great." className="accent" delay={0.26} />
            </span>
          </h2>
          {subtitle ? (
            <motion.p className="contact-section__subtitle" {...fadeUp(0.3, 16, 0.7)}>
              {subtitle}
            </motion.p>
          ) : null}
          <motion.div className="socials" aria-label="Social links" {...fadeUp(0.4, 14, 0.7)}>
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
          </motion.div>
        </div>
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
