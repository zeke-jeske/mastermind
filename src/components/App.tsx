import React from 'react'
import Board from 'components/Board'
import Button from 'react-bootstrap/Button'

export default function App() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-dark text-light' style={{minHeight: '100vh'}}>
      <Board />
      <Button
        variant='primary'
        className='m-4'
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
        }}
      >
        Check
      </Button>
    </div>
  )
}
