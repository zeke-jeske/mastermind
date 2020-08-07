import React from 'react'
import Row from 'components/Row'
import Code from 'components/Code'

export default function Board(props) {
  const { rows, activeRow, code, codeVisible, onPegClick } = props

  return (
    <div
      style={{
        borderRadius: '1rem',
        border: '1px solid',
        color: 'white',
        margin: '1rem',
      }}
    >
      <Code code={code} hidden={!codeVisible} />
      <div
        style={{
          padding: '.5rem 1.5rem',
        }}
      >
        {rows.map((row, key) => {
          return (
            <Row
              {...row}
              key={key}
              onPegClick={pegNum => onPegClick(key, pegNum)}
              active={activeRow === key}
            />
          )
        })}
      </div>
    </div>
  )
}
