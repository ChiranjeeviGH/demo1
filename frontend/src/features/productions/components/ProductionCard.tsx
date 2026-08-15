import type { Production } from '@/features/productions/constants/productions.data'
import { Tag } from '@/shared/components/ui'

type ProductionCardProps = {
  production: Production
}

export function ProductionCard({ production }: ProductionCardProps) {
  return (
    <article className="production-card">
      <div className="production-card__media">
        <img src={production.banner} alt={`${production.title} scene`} />
        <button type="button" className="production-card__play" aria-label={`Play ${production.title}`}>
          ▶
        </button>
      </div>
      <div className="production-card__info">
        <img
          className="production-card__poster"
          src={production.poster}
          alt={`${production.title} poster`}
        />
        <div className="production-card__details">
          <h2>{production.title}</h2>
          <p className="production-card__meta">
            {production.language} | {production.runtime} | {production.rating}
          </p>
          <div className="production-card__tags">
            {production.genres.map((genre) => (
              <Tag key={genre}>{genre}</Tag>
            ))}
          </div>
        </div>
        <p className="production-card__description">{production.description}</p>
      </div>
    </article>
  )
}
