import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import CodePeg from 'components/CodePeg'
import styles from './InstructionsModal.module.sass'

interface Props {
  onHide: () => void
  show: boolean
}

export default function InstructionsModal({ show, onHide }: Props) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Instructions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Objective</h5>
        <p>
          At the start of the game, the computer generates a code consisting of
          four colors. Your goal is to guess the secret code in as few tries as
          possible. If you can figure out the code in under 10 guesses, you win.
        </p>
        <h5>Colors</h5>
        <p>There are six possible colors to choose from:</p>
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
        <h5>Gameplay</h5>
        <p>
          To begin, choose four colors in the bottom row (see{' '}
          <strong>Controls</strong>) and click the Check button. After the
          computer checks your first guess (see <strong>Scoring</strong>), you
          can make another guess in the second row and click "Check" again. Try
          to figure out the code in as few guesses as possible.
        </p>
        <h5>Scoring</h5>
        <p>
          Each time you make a guess and click the Check button, he computer
          will score your guess in the following way:
        </p>
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
        <h5>Controls</h5>
        <p>
          To make a guess, you can just click or tap on the pegs to change their
          colors, or you can use the following keys:
        </p>
        <ul>
          <li className='mb-2'>
            <span className={styles.key}>r</span>/
            <span className={styles.key}>o</span>/
            <span className={styles.key}>y</span>/
            <span className={styles.key}>g</span>/
            <span className={styles.key}>b</span>/
            <span className={styles.key}>p</span>: Change the color of the
            current peg (<span className={styles.key}>r</span> corresponds to
            red, <span className={styles.key}>o</span> to orange, etc.)
          </li>
          <li className='mb-2'>
            <span className={styles.key}>&#9650;</span>/
            <span className={styles.key}>&#9660;</span>: Cycle through the
            colors
          </li>
          <li className='mb-2'>
            <span className={styles.key}>&#9668;</span>/
            <span className={styles.key}>&#9658;</span> or{' '}
            <span className={styles.key}>Backspace</span>/
            <span className={styles.key}>Space</span>: Move to the previous/next
            peg
          </li>
          <li className='mb-2'>
            <span className={styles.key}>Enter</span>: Check the current row
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
