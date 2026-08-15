import { AboutHero } from '@/features/about/components/AboutHero'
import { AboutSanghaCta } from '@/features/about/components/AboutSanghaCta'
import { AboutStats } from '@/features/about/components/AboutStats'
import { AwardsWall } from '@/features/about/components/AwardsWall'
import { BeyondCinema } from '@/features/about/components/BeyondCinema'
import { ContactSection } from '@/shared/components'

export function AboutContainer() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AwardsWall />
      <BeyondCinema />
      <AboutSanghaCta />
      <ContactSection />
    </>
  )
}
