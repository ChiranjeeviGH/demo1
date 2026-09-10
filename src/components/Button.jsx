import { ArrowUpRight } from 'lucide-react'
import styles from './Button.module.css'

export default function Button({
  href = '#',
  children,
  variant = 'solid',
  onClick,
  type = 'button',
  className = '',
}) {
  const buttonClassName = `${styles.btn} ${styles[variant]} ${className}`.trim()
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
      <button type={type} className={buttonClassName} onClick={onClick}>
        {inner}
      </button>
    )
  }

  return (
    <a href={href} className={buttonClassName} onClick={onClick}>
      {inner}
    </a>
  )
}