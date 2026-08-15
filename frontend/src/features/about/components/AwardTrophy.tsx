import { useId } from 'react'

type AwardTrophyProps = {
  variant: 'cup' | 'figure'
}

export function AwardTrophy({ variant }: AwardTrophyProps) {
  const paintId = `award-paint-${useId().replace(/:/g, '')}`

  if (variant === 'figure') {
    return (
      <svg viewBox="0 0 64 96" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={paintId} x1="18%" y1="0%" x2="82%" y2="100%">
            <stop offset="0%" stopColor="#cfcfcf" />
            <stop offset="42%" stopColor="#8d8d8d" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="11" r="7.2" fill={`url(#${paintId})`} />
        <path
          fill={`url(#${paintId})`}
          d="M32 19.5c3.4 0 6.2 2.1 7.4 5.1 3.8 1.2 7.1 3.8 9.2 7.4-2.6-0.4-5.5-0.2-8.1 0.9 0.6 2.4 1 5 1 7.7 0 2.2-0.2 4.3-0.7 6.3 4.6 1.6 8.4 4.8 10.6 9.1H12.6c2.2-4.3 6-7.5 10.6-9.1-0.5-2-0.7-4.1-0.7-6.3 0-2.7 0.4-5.3 1-7.7-2.6-1.1-5.5-1.3-8.1-0.9 2.1-3.6 5.4-6.2 9.2-7.4 1.2-3 4-5.1 7.4-5.1Z"
        />
        <path
          fill={`url(#${paintId})`}
          d="M18 57.8h28l-2.4 16.6c-0.5 3.4-3.4 6-6.9 6H27.3c-3.5 0-6.4-2.6-6.9-6L18 57.8Z"
        />
        <rect x="24" y="81.2" width="16" height="4.2" rx="0.5" fill={`url(#${paintId})`} />
        <rect x="20" y="86.2" width="24" height="5.2" rx="0.6" fill="#1a1a1a" />
        <rect x="20" y="86.2" width="24" height="5.2" rx="0.6" fill={`url(#${paintId})`} opacity="0.55" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 96" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={paintId} x1="12%" y1="0%" x2="78%" y2="100%">
          <stop offset="0%" stopColor="#f8e7b0" />
          <stop offset="40%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#7c5e12" />
        </linearGradient>
      </defs>
      <polygon
        fill="#f3d67a"
        points="32,3 33.5,8 38.2,8.2 34.6,11.2 35.8,15.8 32,13.2 28.2,15.8 29.4,11.2 25.8,8.2 30.5,8"
      />
      <path fill={`url(#${paintId})`} d="M17 14h30v8c0 12.2-7.6 22-15 22s-15-9.8-15-22V14Z" />
      <path
        fill="none"
        stroke={`url(#${paintId})`}
        strokeWidth="3.1"
        d="M17 18c-8 1.4-12.2 7.2-12.2 14.8 0 9.4 5.8 15.2 13.8 16.2"
      />
      <path
        fill="none"
        stroke={`url(#${paintId})`}
        strokeWidth="3.1"
        d="M47 18c8 1.4 12.2 7.2 12.2 14.8 0 9.4-5.8 15.2-13.8 16.2"
      />
      <rect x="29.1" y="43" width="5.8" height="20" fill={`url(#${paintId})`} />
      <path fill={`url(#${paintId})`} d="M21 63h22l-3.4 9H24.4L21 63Z" />
      <rect x="16" y="83" width="32" height="5.2" rx="0.7" fill={`url(#${paintId})`} />
      <rect x="20.5" y="89.2" width="23" height="3.6" rx="0.5" fill="#b8922a" />
    </svg>
  )
}
