import React from 'react'

export default function Peg(props) {
  return (
    <button
      style={{
        height: props.size + 'rem',
        width: props.size + 'rem',
        borderRadius: '50%',
        border: props.hidden || !props.color ? '1px solid white' : 'none',
        margin: props.size / 3 + 'rem',
        color: 'inherit',
        padding: '2px',
        backgroundColor: (!props.hidden && props.color) || 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: props.clickable && 'pointer',
        outline: 'none',
      }}
      disabled={!props.clickable}
      onClick={props.onClick}
    >
      {props.hidden && (
        <p
          style={{
            lineHeight: 1,
            fontSize: props.size * 0.6 + 'rem',
            margin: 0,
          }}
        >
          ?
        </p>
      )}
    </button>
  )
}
