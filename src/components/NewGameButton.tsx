import React from 'react'
import Button from 'react-bootstrap/Button'

export default function NewGameButton({ onClick }: { onClick: () => void }) {
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
    >
      New Game
    </Button>
  )
}
