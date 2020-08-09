import React from 'react'
import Button from 'react-bootstrap/Button'

interface Props {
  onClick: () => void
  activeRow: number
  rows: Array<{ guess: string[] }>
}

export default function CheckButton({ onClick, activeRow, rows }: Props) {
  return (
    <Button
      variant='primary'
      className='m-4'
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
      onClick={onClick}
      disabled={rows[activeRow].guess.includes('empty')}
    >
      Check
    </Button>
  )
}
