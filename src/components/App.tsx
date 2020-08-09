import React from 'react'
import Board from 'components/Board'
import GameEndModal from 'components/GameEndModal'
import CheckButton from 'components/CheckButton'
import NewGameButton from 'components/NewGameButton'

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

    this.state = generateNewGameState()
  }

  switchPegColor = (rowNum: number, pegNum: number) => {
    this.setState(state => {
      // must copy each layer separately so as not to mutate state
      let rows = [...state.rows]
      let guess = [...rows[rowNum].guess]

      guess[pegNum] =
        codePegColors[(codePegColors.indexOf(guess[pegNum]) + 1) % 6]

      rows[rowNum] = { ...rows[rowNum], guess }

      return { rows }
    })
  }

  check = () => {
    this.setState(({ activeRow, rows, code }) => {
      const newState: any = {}
      const guess = [...rows[activeRow].guess]
      const c = [...code] // copy code so that it is not modified
      let response: string[] = []

      guess.forEach((color, pegNum) => {
        // correct color and correct position
        if (color === c[pegNum]) {
          // make sure it's not counted twice
          guess[pegNum] = ''
          c[pegNum] = ''
          response.push(keyPegColors[0])
        }
      })

      // if the player won
      if (response.length === 4) this.endGame(true)
      else {
        guess.forEach((color, pegNum) => {
          // correct color, wrong place
          if (color && c.includes(color)) {
            c[c.indexOf(color)] = ''
            response.push(keyPegColors[1])
          }
        })

        // pad array to length 4
        response = response.concat(Array(4 - response.length).fill('empty'))

        if (!activeRow) this.endGame(false)
        else newState.activeRow = activeRow - 1
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

  newGame = () => {
    this.setState(generateNewGameState())
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
          <CheckButton {...{ onClick: this.check, activeRow, rows }} />
        )}
        {gameOver && !showModal && <NewGameButton onClick={this.check} />}
        <GameEndModal
          playerWon={playerWon}
          show={showModal}
          onHide={this.closeModal}
          onNewGame={this.newGame}
          activeRow={activeRow}
        />
      </div>
    )
  }
}

function generateNewGameState() {
  return {
    rows: Array(10)
      .fill(null)
      .map(() => ({
        guess: Array(4).fill('empty'),
        response: Array(4).fill('empty'),
      })),
    code: Array(4)
      .fill('')
      .map(
        () => codePegColors[Math.floor(Math.random() * codePegColors.length)],
      ),
    activeRow: 9,
    gameOver: false,
    playerWon: false,
    showModal: false,
  }
}
