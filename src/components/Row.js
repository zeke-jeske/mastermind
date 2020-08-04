import React from 'react'
import CodePeg from './CodePeg'
import KeyPeg from './KeyPeg'
import padArrayEnd from '../utilities/padArrayEnd'

export default function Row(props) {
  return (
    <div
      style={{
        borderBottom: !props.noBorder && '1px solid',
        display: 'flex',
        alignItems: 'center',
        padding: '.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        {props.guess.map((color, pegNum) => (
          <CodePeg
            color={color}
            key={pegNum}
            clickable={props.active}
            onClick={() => props.onPegClick(pegNum)}
          />
        ))}
      </div>
      <div
        style={{
          marginLeft: '1rem',
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          gridTemplateRows: 'auto auto',
        }}
      >
        {padArrayEnd(props.response, 4, 0).map((color, key) => (
          <KeyPeg color={color} key={key} />
        ))}
      </div>
    </div>
  )
}
