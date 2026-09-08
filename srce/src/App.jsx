import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Leadership from './components/Leadership'
import Presence from './components/Presence'
import ImpactAreas from './components/ImpactAreas'
import Awards from './components/Awards'
import Stories from './components/Stories'
import Activities from './components/Activities'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Leadership />
        <Presence />
        <ImpactAreas />
        <Awards />
        <Stories />
        <Activities />
      </main>
      <Footer />
    </>
  )
}
