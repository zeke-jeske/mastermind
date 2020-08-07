import React from 'react'
import styles from './Peg.module.sass'

interface Props {
  color: string
  size: number
  hidden?: boolean
  clickable?: boolean
  onClick?: () => void
}

export default function Peg({
  color,
  size,
  hidden,
  clickable,
  onClick,
}: Props) {
  return (
    <button
      className={[styles.peg, (hidden || !color) && styles.border]
        .filter(a => a)
        .join(' ')}
      style={{
        height: size + 'rem',
        width: size + 'rem',
        margin: size / 3 + 'rem',
        backgroundColor: (!hidden && color) || 'transparent',
      }}
      disabled={!clickable}
      onClick={onClick}
    >
      {hidden && (
        <p
          className={styles.questionMark}
          style={{ fontSize: size * 0.6 + 'rem' }}
        >
          ?
        </p>
      )}
    </button>
  )
}
