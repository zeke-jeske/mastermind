import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface Props {
  playerWon: boolean
  show: boolean
  onHide: () => void
  onNewGame: () => void
  activeRow: number
}

export default function GameEndModal({
  playerWon,
  show,
  onHide,
  onNewGame,
  activeRow,
}: Props) {
  const numGuesses = 10 - activeRow

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{playerWon ? 'You win!' : 'You lose.'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {playerWon
          ? 'Nice job! You guessed the code in only ' +
            numGuesses +
            (numGuesses === 1 ? ' try.' : ' tries.')
          : 'Better luck next time!'}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={onNewGame}>
          New game
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
