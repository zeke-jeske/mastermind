import React from 'react'
import Board from 'components/Board'
import GameEndModal from 'components/GameEndModal'
import CheckButton from 'components/CheckButton'
import NewGameButton from 'components/NewGameButton'
import InstructionsButton from 'components/InstructionsButton'
import InstructionsModal from 'components/InstructionsModal'

const codePegColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const keyPegColors = ['red', 'white']

interface State {
  rows: Array<{
    guess: string[]
    response: string[]
  }>
  code: string[]
  activeRow: number
  activePeg: number
  gameOver: boolean
  playerWon: boolean
  showGameOverModal: boolean
  showInstructionsModal: boolean
}

export default class App extends React.Component<{}, State> {
  boardRef: React.RefObject<HTMLDivElement>

  constructor(props: {}) {
    super(props)

    this.state = generateNewGameState()
    this.boardRef = React.createRef()
  }

  componentDidMount() {
    this.focusBoard()
  }

  switchPegColor = (reverse: boolean = false) => {
    this.setState(({ activeRow, activePeg, rows }) => {
      const newState: any = {}
      const guess = [...rows[activeRow].guess]
      const oldColor = codePegColors.indexOf(guess[activePeg])
      let newColor

      if (reverse) {
        if (oldColor === -1) newColor = 5
        else newColor = oldColor + 5
      } else newColor = oldColor + 1

      guess[activePeg] = codePegColors[newColor % 6]
      newState.rows = [...rows]
      newState.rows[activeRow] = { ...rows[activeRow], guess }

      return newState
    })
  }

  check = () => {
    this.setState(({ activeRow, rows, code }) => {
      const state: any = {}
      const guess = [...rows[activeRow].guess]

      if (!guess.includes('empty')) {
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
          else state.activeRow = activeRow - 1
        }

        state.rows = [...rows]
        state.rows[activeRow] = {
          ...rows[activeRow],
          response,
        }
      }

      return state
    })
    this.focusBoard()
  }

  endGame = (playerWon: boolean) => {
    this.setState({
      gameOver: true,
      playerWon,
      showGameOverModal: true,
    })
  }

  newGame = () => {
    this.setState(generateNewGameState())
  }

  closeGameOverModal = () => {
    this.setState({
      showGameOverModal: false,
      activeRow: -1, // Make sure none of the pegs are still clickable
    })
    this.focusBoard()
  }

  closeInstructionsModal = () => {
    this.setState({ showInstructionsModal: false })
    this.focusBoard()
  }

  focusBoard = () => {
    this.boardRef.current && this.boardRef.current.focus()
  }

  showInstructionsModal = () => {
    this.setState({ showInstructionsModal: true })
  }

  handleKeyDown = (key: string) => {
    if (key === 'Enter') this.check()
    else if (key === ' ' || key === 'ArrowDown') this.switchPegColor()
    else if (key === 'ArrowUp') this.switchPegColor(true)
    else if (key === 'ArrowRight')
      this.setState(state => ({
        activePeg: (state.activePeg + 1) % 4,
      }))
    else if (key === 'ArrowLeft')
      this.setState(state => ({
        activePeg: (state.activePeg + 3) % 4,
      }))
    else {
      for (let i = 0; i < 6; i++) {
        const color = codePegColors[i]

        if (color.charAt(0) === key) {
          this.setState(state => {
            const activeRow = state.activeRow
            let rows = [...state.rows]
            let guess = [...rows[activeRow].guess]

            guess[state.activePeg] = color

            rows[activeRow] = { ...rows[activeRow], guess }
            return { rows }
          })
          break
        }
      }
    }
  }

  handlePegClick = (pegNum: number) => {
    this.setState({ activePeg: pegNum })
    this.switchPegColor()
  }

  render = () => {
    const {
      rows,
      code,
      gameOver,
      activeRow,
      activePeg,
      showGameOverModal,
      showInstructionsModal,
      playerWon,
    } = this.state

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
          activePeg={activePeg}
          onKeyDown={this.handleKeyDown}
          onPegClick={this.handlePegClick}
          boardRef={this.boardRef}
        />
        {!gameOver && (
          <InstructionsButton onClick={this.showInstructionsModal} />
        )}
        {!gameOver && (
          <CheckButton {...{ onClick: this.check, activeRow, rows }} />
        )}
        {gameOver && !showGameOverModal && (
          <NewGameButton onClick={this.newGame} />
        )}
        <GameEndModal
          playerWon={playerWon}
          show={showGameOverModal}
          onHide={this.closeGameOverModal}
          onNewGame={this.newGame}
          activeRow={activeRow}
        />
        <InstructionsModal
          show={showInstructionsModal}
          onHide={this.closeInstructionsModal}
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
      .map(() => codePegColors[Math.floor(Math.random() * 6)]),
    activeRow: 9,
    activePeg: 0,
    gameOver: false,
    playerWon: false,
    showGameOverModal: false,
    showInstructionsModal: false,
  }
}
