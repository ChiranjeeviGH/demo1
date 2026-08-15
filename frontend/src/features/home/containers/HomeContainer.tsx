import { BeyondFilmmaking } from '@/features/home/components/BeyondFilmmaking'
import { HomeHero } from '@/features/home/components/HomeHero'
import { HomeMission } from '@/features/home/components/HomeMission'
import { ProductionsCarousel } from '@/features/home/components/ProductionsCarousel'
import { ProfileSpotlight } from '@/features/home/components/ProfileSpotlight'
import { SanghaCta } from '@/features/home/components/SanghaCta'
import { ContactSection } from '@/shared/components'

export function HomeContainer() {
  return (
    <>
      <HomeHero />
      <HomeMission />
      <ProductionsCarousel />
      <ProfileSpotlight />
      <BeyondFilmmaking />
      <SanghaCta />
      <ContactSection />
    </>
  )
}
