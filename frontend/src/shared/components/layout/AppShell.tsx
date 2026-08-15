import type { ReactNode } from 'react'

import { FilmStripFrame } from '@/shared/components/layout/FilmStripFrame'
import { Footer } from '@/shared/components/layout/Footer'
import { Header } from '@/shared/components/layout/Header'
import { useSmoothScroll } from '@/shared/motion/useSmoothScroll'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  useSmoothScroll()

  return (
    <div className="app-shell">
      <FilmStripFrame />
      <Header />
      <main className="app-shell__main">{children}</main>
      <Footer />
    </div>
  )
}
