import { ArrowUpRight } from 'lucide-react'
import styles from './Button.module.css'

export default function Button({
  href = '#',
  children,
  variant = 'solid',
  onClick,
  type = 'button',
}) {
  const className = `${styles.btn} ${styles[variant]}`
  const inner = (
    <>
      <span>{children}</span>
      <span className={styles.icon} aria-hidden="true">
        <ArrowUpRight size={16} strokeWidth={1.75} />
      </span>
    </>
  )

  if (onClick && href === '#') {
    return (
      <button type={type} className={className} onClick={onClick}>
        {inner}
      </button>
    )
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {inner}
    </a>
  )
}
