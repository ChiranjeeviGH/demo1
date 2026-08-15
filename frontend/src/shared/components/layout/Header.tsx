import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { NAV_LINKS } from '@/shared/constants/routes'
import { env } from '@/shared/config/env'
import { useMediaQuery } from '@/shared/hooks'

export function Header() {
  const isMobile = useMediaQuery('(max-width: 1100px)')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false)
    }
  }, [isMobile])

  return (
    <header className={`site-header${menuOpen ? ' is-open' : ''}`} data-testid="site-header">
      <NavLink
        to="/"
        className="site-header__brand"
        onClick={() => setMenuOpen(false)}
        data-testid="nav-brand-link"
      >
        {env.appName}
      </NavLink>

      {isMobile ? (
        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="mobile-menu-button"
        >
          <span />
          <span />
          <span />
        </button>
      ) : null}

      <nav
        id="primary-nav"
        className={`site-header__nav${menuOpen ? ' is-open' : ''}`}
        aria-label="Primary"
        data-testid="primary-nav"
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            end={link.to === '/'}
            onClick={() => setMenuOpen(false)}
            data-testid={`nav-link-${link.label.toLowerCase().replace(/[^a-z]+/g, '-')}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
