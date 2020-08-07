import React from 'react'
import Row from 'components/Row'
import Code from 'components/Code'

interface Row {
  guess: string[]
  response: string[]
}

interface Props {
  rows: Array<Row>
  activeRow: number
  code: string[]
  codeHidden: boolean
  onPegClick: (rowNum: number, pegNum: number) => void
}

export default function Board({
  rows,
  activeRow,
  code,
  codeHidden,
  onPegClick,
}: Props) {
  return (
    <div
      style={{
        borderRadius: '1rem',
        border: '1px solid',
        color: 'white',
        margin: '1rem',
      }}
    >
      <Code code={code} hidden={codeHidden} />
      <div
        style={{
          padding: '.5rem 1.5rem',
        }}
      >
        {rows.map((row: Row, key: number) => {
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
