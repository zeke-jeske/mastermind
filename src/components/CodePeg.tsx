import React from 'react'
import Peg from 'components/Peg'

interface Props {
  hidden?: boolean
  color: string
  clickable?: boolean
  onClick?: () => void
  active?: boolean
}

export default function CodePeg(props: Props) {
  return <Peg {...{ ...props, size: 1.5 }} />
}
