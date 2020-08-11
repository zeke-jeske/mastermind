import React from 'react'
import Peg from 'components/Peg'

export default function KeyPeg({ color }: { color: string }) {
  return <Peg color={color} size={0.5} />
}
