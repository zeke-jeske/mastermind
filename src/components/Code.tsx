import React from 'react'
import CodePeg from 'components/CodePeg'
import emptyFunction from 'utilities/emptyFunction'

interface Props {
  code: string[]
  hidden: boolean
}

export default function Code({ code, hidden }: Props) {
  return (
    <div
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {code.map((color: string, key: number) => {
        const codePegProps = {
          color,
          key,
          hidden,
          clickable: false,
          onClick: emptyFunction,
        }
        return <CodePeg {...codePegProps} />
      })}
    </div>
  )
}
