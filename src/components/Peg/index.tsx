import React from 'react'
import styles from './Peg.module.sass'

const emptyFunction = () => {}

interface Props {
  color: string
  size: number
  hidden?: boolean
  clickable?: boolean
  active?: boolean
  onClick?: () => void
}

export default class Peg extends React.Component<Props, {}> {
  render() {
    const {
      color,
      size,
      hidden = false,
      clickable = false,
      active = false,
      onClick = emptyFunction,
    } = this.props

    return (
      <button
        className={[
          styles.peg,
          hidden ? styles.empty : styles[color],
          active && styles.active,
        ]
          .filter(a => a)
          .join(' ')}
        style={{
          height: size + 'rem',
          width: size + 'rem',
          margin: size / 3 + 'rem',
        }}
        disabled={!clickable}
        onClick={onClick}
        tabIndex={-1}
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
}
