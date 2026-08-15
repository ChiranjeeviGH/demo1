import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { ABOUT_DATA } from '@/features/about/constants/about.data'

type BeyondItem = (typeof ABOUT_DATA.beyond)[number]

type BeyondCinemaModalProps = {
  item: BeyondItem
  onClose: () => void
}

const CLOSE_MS = 280

export function BeyondCinemaModal({ item, onClose }: BeyondCinemaModalProps) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  const requestClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    setVisible(false)
  }, [closing])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!closing) return
    const timeout = window.setTimeout(onClose, CLOSE_MS)
    return () => window.clearTimeout(timeout)
  }, [closing, onClose])

  useEffect(() => {
    const { overflow, paddingRight } = document.body.style
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`
    }

    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [requestClose])

  return createPortal(
    <div
      className={`beyond-modal${visible ? ' is-open' : ''}${closing ? ' is-closing' : ''}`}
      role="presentation"
      onClick={requestClose}
    >
      <div className="beyond-modal__backdrop" aria-hidden="true" />

      <div
        className="beyond-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="beyond-modal__title">
          <span className="accent">Beyond</span> Cinema
        </h2>

        <div className="beyond-modal__panel">
          <div className="beyond-modal__media">
            <img src={item.image} alt="" />
            <button ref={closeRef} type="button" className="beyond-modal__back" onClick={requestClose}>
              <span aria-hidden="true">←</span>
              Back
            </button>
          </div>

          <div className="beyond-modal__body">
            <div className="beyond-modal__info">
              <h3>{item.detail.headline}</h3>
              <p>{item.detail.body}</p>
              <h4>Highlights</h4>
              <ul>
                {item.detail.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <blockquote className="beyond-modal__quote">
              <span className="beyond-modal__quote-mark" aria-hidden="true">
                “
              </span>
              <p>{item.detail.quote}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
