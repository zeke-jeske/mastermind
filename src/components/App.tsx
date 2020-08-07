import React from 'react'
import Board from 'components/Board'
import Button from 'react-bootstrap/Button'

const codePegColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const keyPegColors = ['red', 'white']

interface State {
  rows: Array<{
    guess: string[]
    response: string[]
  }>
  code: string[]
  codeHidden: boolean
  activeRow: number
  gameDone: boolean
  playerWon: boolean
}

export default class App extends React.Component<{}, State> {
  state = {
    rows: Array(10)
      .fill(null)
      .map(() => ({
        guess: Array(4).fill(''),
        response: Array(4).fill(''),
      })),
    code: generateCode(),
    codeHidden: true,
    activeRow: 9,
    gameDone: false,
    playerWon: false,
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

  check = () => {
    this.setState(state => {
      const activeRow = state.activeRow
      const newState: any = {}
      const rows = state.rows
      const guess = [...rows[activeRow].guess]
      const code = [...state.code]
      let response: string[] = []

      guess.forEach((color, pegNum) => {
        // correct color and correct position
        if (color === code[pegNum]) {
          // make sure it's not counted twice
          guess[pegNum] = ''
          code[pegNum] = ''
          response.push(keyPegColors[0])
        }
      })

      // if the player won
      if (response.length === 4) {
        newState.gameDone = true
        newState.codeHidden = false
        newState.playerWon = true
      } else {
        guess.forEach((color, pegNum) => {
          // correct color, wrong place
          if (color !== '' && code.includes(color)) {
            code[code.indexOf(color)] = ''
            response.push(keyPegColors[1])
          }
        })

        response = response.concat(Array(4 - response.length).fill('')) // pad array to length 4

        newState.activeRow = activeRow - 1

        // player already made 10 guesses
        if (!activeRow) {
          newState.gameDone = true
          newState.codeHidden = false
        }
      }

      newState.rows = [...rows]

      newState.rows[activeRow] = {
        ...rows[activeRow],
        response,
      }

      return newState
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
          onClick={this.check}
          disabled={this.state.rows[this.state.activeRow].guess.includes('')}
        >
          Check
        </Button>
      </div>
    )
  }
}

function generateCode(): string[] {
  return Array(4)
    .fill('')
    .map(() => codePegColors[Math.floor(Math.random() * codePegColors.length)])
}
