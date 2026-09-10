import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const hero = '/section-hero/hero-bg.png'
import Button from './Button'
import styles from './Hero.module.css'

const slides = [
  {
    image: hero,
    alt: 'Heritage architecture in Karnataka at dusk',
    title: 'Rooted in Service. Empowering Rural India Since 1982.',
    body: 'Inspiring communities, strengthening livelihoods, and creating opportunities for a better tomorrow.',
  },
  {
    image: '/image 11.png',
    alt: 'Women in a community gathering',
    title: 'Women at the centre of every sangha.',
    body: 'Self-help groups that put savings, credit, and livelihood in the hands of rural families.',
  },
  {
    image: '/image 10 (1).png',
    alt: 'Farmland at sunrise',
    title: 'Livelihoods that last beyond a single season.',
    body: 'Farmer groups, insurance, and last-mile banking so a village does not have to leave itself to be heard.',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className={styles.hero} id="top" aria-label="Introduction">
      {slides.map((item, i) => (
        <div
          key={item.alt}
          className={`${styles.media} ${i === index ? styles.mediaOn : ''}`}
        >
          <img src={item.image} alt={i === index ? item.alt : ''} />
        </div>
      ))}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${styles.pills} ${styles.a1}`}>
          <span>Trusted NGO</span>
          <span>40+ Years of Impact</span>
        </div>
        <h1 className={styles.a2}>{slide.title}</h1>
        <p className={`${styles.lead} ${styles.a3}`}>{slide.body}</p>
        <div className={styles.a4}>
          <Button href="#impact-stats" variant="solid">
            Explore Our Impact
          </Button>
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={18} />
        </button>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={next} aria-label="Next slide">
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}
