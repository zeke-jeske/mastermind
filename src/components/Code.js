import React from 'react'
import CodePeg from 'components/CodePeg'
import padArrayEnd from 'utilities/padArrayEnd'

export default function Code(props) {
  return (
    <div
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {padArrayEnd(props.code, 4, 0).map((color, key) => (
        <CodePeg color={color} key={key} hidden={props.hidden} />
      ))}
    </div>
  )
}
