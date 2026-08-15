import { Fragment } from 'react'
import { motion } from 'framer-motion'

import { HOME_COPY, HOME_IMAGES, SANGHA_MOVIE_TICKER } from '@/features/home/constants/home.data'
import { ROUTES } from '@/shared/constants/routes'
import { fadeUp, MotionLink } from '@/shared/motion'
import { SplitChars } from '@/shared/motion/SplitChars'

function MovieTickerTrack() {
  return (
    <div className="movie-ticker__track">
      {SANGHA_MOVIE_TICKER.map((title, index) => (
        <Fragment key={`${title}-${index}`}>
          <span className="movie-ticker__label">{title}</span>
          <span className="movie-ticker__dot" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  )
}

export function SanghaCta() {
  const { sangha } = HOME_COPY

  return (
    <section className="section sangha-cta" aria-labelledby="sangha-cta-heading">
      <div className="section__inner sangha-cta__content">
        <h2 id="sangha-cta-heading">
          <SplitChars text={sangha.titleBefore} />{' '}
          <SplitChars text={sangha.titleAccent} className="accent" delay={0.12} />
        </h2>
        <motion.p {...fadeUp(0.2, 18, 0.7)}>{sangha.body}</motion.p>
        <MotionLink
          to={ROUTES.SANGHA}
          className="btn btn-primary"
          {...fadeUp(0.32, 16, 0.7)}
          data-testid="sangha-cta-btn"
        >
          {sangha.cta} <span aria-hidden="true">→</span>
        </MotionLink>
      </div>

      <div className="section__inner">
        <motion.img
          className="sangha-cta__image"
          src={HOME_IMAGES.library}
          alt="Community archive library"
          {...fadeUp(0.1, 24, 0.95)}
        />
      </div>

      <div className="movie-ticker" aria-label="Featured film titles">
        <div className="movie-ticker__viewport">
          <div className="movie-ticker__marquee">
            <MovieTickerTrack />
            <MovieTickerTrack />
          </div>
        </div>
      </div>
    </section>
  )
}
