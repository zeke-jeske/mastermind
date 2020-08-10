import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CodePeg from 'components/CodePeg'

interface Props {
  onHide: () => void
  show: boolean
}

export default function RulesModal({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          At the start of the game, the computer generates a code consisting of
          four colors. There are six possible colors to choose from:
        </p>
        <ol>
          <li className='d-flex align-items-center'>
            <CodePeg color='red' /> Red
          </li>
          <li className='d-flex align-items-center'>
            <CodePeg color='orange' /> Orange
          </li>
          <li className='d-flex align-items-center'>
            <CodePeg color='yellow' /> Yellow
          </li>
          <li className='d-flex align-items-center'>
            <CodePeg color='green' /> Green
          </li>
          <li className='d-flex align-items-center'>
            <CodePeg color='blue' /> Blue
          </li>
          <li className='d-flex align-items-center'>
            <CodePeg color='purple' /> Purple
          </li>
        </ol>
        <p>
          Your goal is to guess the secret code. To begin, click one of the pegs
          in the bottom row to choose a color and do the same for the rest of
          the bottom row. When you're happy with your guess, click the "Check"
          button.
        </p>
        <p>The computer will score your guess in the following way:</p>
        <ul>
          <li>
            For each peg that is the right color <em>and</em> the right
            position, you get a red point.
          </li>
          <li>
            For each peg that is the right color but not the right position, you
            get a white point.
          </li>
        </ul>
        <p>
          After the computer checks your first guess, you can make another guess
          in the second row and click "Check" again. Try to figure out the code
          in as few guesses as possible. If you can guess the code in under ten
          tries, you win.
        </p>
        <p>Good luck!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
