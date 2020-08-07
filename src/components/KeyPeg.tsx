import React from 'react'
import Peg from 'components/Peg'
import emptyFunction from 'utilities/emptyFunction'

interface Props {
  hidden: boolean
  color: string
}

export default function KeyPeg(props: Props) {
  return (
    <Peg
      {...{ ...props, size: 0.5, clickable: false, onClick: emptyFunction }}
    />
  )
}
