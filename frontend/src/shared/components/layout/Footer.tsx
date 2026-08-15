import { motion } from 'framer-motion'

import { MOTION_EASE, VIEWPORT_ONCE } from '@/shared/motion'

export function Footer() {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, ease: MOTION_EASE }}
      data-testid="site-footer"
    >
      <div className="site-footer__links">
        <a href="#terms" data-testid="footer-link-terms">Terms</a>
        <a href="#privacy" data-testid="footer-link-privacy">Privacy</a>
        <a href="#cookies" data-testid="footer-link-cookies">Cookies</a>
        <a href="#support" data-testid="footer-link-support">Support</a>
      </div>
    </motion.footer>
  )
}
