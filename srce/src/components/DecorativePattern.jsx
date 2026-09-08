export default function DecorativePattern({
  className = '',
  opacity = 0.18,
  size = 220,
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g stroke="currentColor" strokeWidth="0.9">
        <circle cx="100" cy="100" r="22" />
        <circle cx="100" cy="100" r="44" />
        <circle cx="100" cy="100" r="66" />
        <circle cx="100" cy="34" r="12" />
        <circle cx="100" cy="166" r="12" />
        <circle cx="34" cy="100" r="12" />
        <circle cx="166" cy="100" r="12" />
        <circle cx="54" cy="54" r="12" />
        <circle cx="146" cy="54" r="12" />
        <circle cx="54" cy="146" r="12" />
        <circle cx="146" cy="146" r="12" />
        <path d="M100 8v14M100 178v14M8 100h14M178 100h14M24 24l16 16M160 24l-16 16M24 176l16-16M160 176l-16-16" />
      </g>
    </svg>
  )
}
