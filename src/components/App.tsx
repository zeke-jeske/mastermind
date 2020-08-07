import React from 'react'
import Board from 'components/Board'
import Button from 'react-bootstrap/Button'

const codePegColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']

interface State {
  rows: Array<{
    guess: string[]
    response: string[]
  }>
  code: string[]
  codeHidden: boolean
  activeRow: number
}

export default class App extends React.Component<{}, State> {
  state = {
    rows: Array(10)
      .fill(null)
      .map(() => ({
        guess: Array(4).fill(null),
        response: Array(2).fill(null),
      })),
    code: ['red', 'yellow', 'orange', 'blue'],
    codeHidden: true,
    activeRow: 9,
  }

  switchPegColor = (rowNum: number, pegNum: number) => {
    this.setState(prevState => {
      // must copy each layer separately so as not to mutate prevState
      let rows = [...prevState.rows]
      let row = { ...rows[rowNum] }
      let guess = [...row.guess]

      // indexOf returns -1 if color is not yet set, which becomes 0 (red)
      const oldPegColorIndex = codePegColors.indexOf(guess[pegNum])
      guess[pegNum] =
        codePegColors[(oldPegColorIndex + 1) % codePegColors.length]

      row.guess = guess
      rows[rowNum] = row

      return { rows }
    })
  }

  render() {
    return (
      <div
        className='d-flex justify-content-center align-items-center bg-dark text-light'
        style={{ minHeight: '100vh' }}
      >
        <Board
          rows={this.state.rows}
          code={this.state.code}
          codeHidden={this.state.codeHidden}
          activeRow={this.state.activeRow}
          onPegClick={this.switchPegColor}
        />
        <Button
          variant='primary'
          className='m-4'
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
          }}
        >
          Check
        </Button>
      </div>
    )
  }
}
