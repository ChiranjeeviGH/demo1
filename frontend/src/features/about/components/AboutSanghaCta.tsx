import { Link } from 'react-router-dom'

import { ABOUT_DATA } from '@/features/about/constants/about.data'
import { ROUTES } from '@/shared/constants/routes'

export function AboutSanghaCta() {
  const { sangha } = ABOUT_DATA

  return (
    <section className="section about-sangha">
      <div className="section__inner about-sangha__content">
        <h2>
          {sangha.titleBefore} <span className="accent">{sangha.titleAccent}</span>
        </h2>
        <p>{sangha.body}</p>
        <Link to={ROUTES.SANGHA} className="btn btn-primary about-sangha__btn">
          {sangha.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="section__inner">
        <div className="about-sangha__image-wrap">
          <img className="about-sangha__image" src={ABOUT_DATA.library} alt="Community library archive" />
        </div>
      </div>
    </section>
  )
}
