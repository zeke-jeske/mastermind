import React from 'react'
import Row from './Row'
import Code from './Code'

const codePegColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

export default class Board extends React.Component {
  state = {
    rows: Array(10)
      .fill()
      .map(() => ({
        guess: Array(4).fill(null),
        response: Array(2).fill(null),
      })),
    code: ['red', 'yellow', 'orange', 'blue'],
    codeVisible: false,
    activeRow: 0,
  }

  switchPegColor = (rowNum, pegNum) => {
    this.setState(({ rows }) => {
      const row = rows[rowNum]
      let guess = [...row.guess]

      const oldColorIdx = codePegColors.indexOf(guess[pegNum])
      guess[pegNum] = codePegColors[(oldColorIdx + 1) % 6]

      let newRows = [...rows]
      newRows[rowNum] = { ...row, guess }

      return { rows: newRows }
    })
  }

  render() {
    const { rows, activeRow } = this.state

    console.log(this.state)

    return (
      <div
        style={{
          borderRadius: '1rem',
          border: '1px solid',
          color: 'white',
          margin: '1rem',
        }}
      >
        <Code code={this.state.code} hidden={!this.state.codeVisible} />
        <div
          style={{
            padding: '.5rem 1.5rem',
          }}
        >
          {[...rows].reverse().map((row, idx) => {
            const rowNum = 9 - idx

            return (
              <Row
                {...row}
                key={idx}
                noBorder={rowNum === 0}
                active={activeRow === rowNum}
                onPegClick={pegNum => this.switchPegColor(rowNum, pegNum)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
