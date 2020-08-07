import React from 'react'
import CodePeg from 'components/CodePeg'
import KeyPeg from 'components/KeyPeg'
import padArrayEnd from 'utilities/padArrayEnd'
import styles from './Row.module.sass'

interface Props {
  guess: string[]
  response: string[]
  active: boolean
  onPegClick: (pegNum: number) => void
}

export default function Row(props: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.codePegsContainer}>
        {props.guess.map((color: string, pegNum: number) => (
          <CodePeg
            color={color}
            key={pegNum}
            clickable={props.active}
            onClick={() => props.onPegClick(pegNum)}
          />
        ))}
      </div>
      <div className={styles.keyPegsContainer}>
        {padArrayEnd(props.response, 4, 0).map((color: string, key: number) => (
          <KeyPeg color={color} key={key} />
        ))}
      </div>
    </div>
  )
}
