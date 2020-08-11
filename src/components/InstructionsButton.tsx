import React from 'react'
import Button from 'react-bootstrap/Button'

export default function InstructionsButton({
  onClick,
}: {
  onClick: () => void
}) {
  return (
    <Button
      variant='info'
      className='m-4'
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
      }}
      onClick={onClick}
    >
      Instructions
    </Button>
  )
}
