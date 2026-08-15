import { useEffect, useRef } from 'react'

import stripSrc from '@/shared/assets/vertical_strip.png'

function useFilmReel(trackRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const image = new Image()
    let animation: Animation | null = null

    image.onload = () => {
      const stripWidth = track.getBoundingClientRect().width
      if (!stripWidth || !image.naturalWidth) return

      const tileHeight = (image.naturalHeight / image.naturalWidth) * stripWidth
      if (!tileHeight) return

      // One tile per ~14s — extremely slow, seamless linear reel
      animation = track.animate(
        [{ transform: 'translateY(0px)' }, { transform: `translateY(${-tileHeight}px)` }],
        { duration: tileHeight * 220, iterations: Infinity, easing: 'linear' },
      )
    }
    image.src = stripSrc

    return () => animation?.cancel()
  }, [trackRef])
}

function Strip({ side }: { side: 'left' | 'right' }) {
  const trackRef = useRef<HTMLDivElement>(null)
  useFilmReel(trackRef)

  return (
    <div className={`film-strip film-strip--${side}`} aria-hidden="true">
      <div ref={trackRef} className="film-strip__track" style={{ backgroundImage: `url(${stripSrc})` }} />
    </div>
  )
}

export function FilmStripFrame() {
  return (
    <>
      <Strip side="left" />
      <Strip side="right" />
    </>
  )
}
