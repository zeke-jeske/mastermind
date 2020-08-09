import React from 'react'
import Board from 'components/Board'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const codePegColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const keyPegColors = ['red', 'white']

interface State {
  rows: Array<{
    guess: string[]
    response: string[]
  }>
  code: string[]
  activeRow: number
  gameOver: boolean
  playerWon: boolean
  showModal: boolean
}

export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)

    this.state = this.generateNewGameState()
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
      if (response.length === 4) this.endGame(true)
      else {
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
        if (!activeRow) this.endGame(false)
      }

      newState.rows = [...rows]

      newState.rows[activeRow] = {
        ...rows[activeRow],
        response,
      }

      return newState
    })
  }

  endGame = (playerWon: boolean) => {
    this.setState({
      gameOver: true,
      playerWon,
      showModal: true,
    })
  }

  generateNewGameState = () => {
    return {
      rows: Array(10)
        .fill(null)
        .map(() => ({
          guess: Array(4).fill(''),
          response: Array(4).fill(''),
        })),
      code: generateCode(),
      activeRow: 9,
      gameOver: false,
      playerWon: false,
      showModal: false,
    }
  }

  newGame = () => {
    this.setState(this.generateNewGameState())
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      activeRow: -1, // Make sure none of the pegs are still clickable
    })
  }

  render = () => {
    const { rows, code, gameOver, activeRow, showModal, playerWon } = this.state

    return (
      <div
        className='d-flex justify-content-center align-items-center bg-dark text-light'
        style={{ minHeight: '100vh' }}
      >
        <Board
          rows={rows}
          code={code}
          codeHidden={!gameOver}
          activeRow={activeRow}
          onPegClick={this.switchPegColor}
        />
        {!gameOver && (
          <Button
            variant='primary'
            className='m-4'
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
            }}
            onClick={this.check}
            disabled={rows[this.state.activeRow].guess.includes('')}
          >
            Check
          </Button>
        )}
        {gameOver && !showModal && (
          <Button
            variant='primary'
            className='m-4'
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
            }}
            onClick={this.newGame}
          >
            New game
          </Button>
        )}
        <Modal show={showModal} onHide={this.closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{playerWon ? 'You win!' : 'You lose.'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {playerWon
              ? 'Nice job! You guessed the code in only ' +
                (10 - activeRow) +
                (activeRow === 9 ? ' try.' : ' tries.')
              : 'Better luck next time!'}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={this.newGame}>
              New game
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function generateCode(): string[] {
  return Array(4)
    .fill('')
    .map(() => codePegColors[Math.floor(Math.random() * codePegColors.length)])
}
