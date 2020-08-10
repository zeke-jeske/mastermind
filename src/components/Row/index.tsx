import React from 'react'
import CodePeg from 'components/CodePeg'
import KeyPeg from 'components/KeyPeg'
import styles from './Row.module.sass'

interface Props {
  guess: string[]
  response: string[]
  active: boolean
  activePeg: number
  onPegClick: (pegNum: number) => void
}

export default function Row({
  guess,
  active,
  activePeg,
  onPegClick,
  response,
}: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.codePegsContainer}>
        {guess.map((color: string, pegNum: number) => (
          <CodePeg
            color={color}
            key={pegNum}
            clickable={active}
            onClick={() => onPegClick(pegNum)}
            hidden={false}
            active={active && pegNum === activePeg}
          />
        ))}
      </div>
      <div className={styles.keyPegsContainer}>
        {response.map((color: string, key: number) => (
          <KeyPeg color={color} key={key} hidden={false} />
        ))}
      </div>
    </div>
  )
}
