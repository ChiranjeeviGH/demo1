import { SanghaGallery } from '@/features/sangha/components/SanghaGallery'
import { SanghaHero } from '@/features/sangha/components/SanghaHero'
import { SanghaQuote } from '@/features/sangha/components/SanghaQuote'
import { SanghaStats } from '@/features/sangha/components/SanghaStats'
import { UpcomingEvents } from '@/features/sangha/components/UpcomingEvents'
import { ContactSection } from '@/shared/components'

export function SanghaContainer() {
  return (
    <>
      <SanghaHero />
      <SanghaStats />
      <UpcomingEvents />
      <SanghaQuote />
      <SanghaGallery />
      <ContactSection titleAccent="Make Something Great." />
    </>
  )
}
