import React from 'react'
import Row from 'components/Row'
import Code from 'components/Code'
import styles from './Board.module.sass'

interface Row {
  guess: string[]
  response: string[]
}

interface Props {
  rows: Array<Row>
  activeRow: number
  activePeg: number
  code: string[]
  codeHidden: boolean
  onPegClick: (pegNum: number) => void
  onKeyDown: (key: string) => void
  boardRef: React.RefObject<HTMLDivElement | null>
}

export default class Board extends React.Component<Props> {
  handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    this.props.onKeyDown(event.key)
  }

  render() {
    const {
      rows,
      activeRow,
      activePeg,
      code,
      codeHidden,
      onPegClick,
      boardRef,
    } = this.props

    return (
      <div
        className={styles.board}
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
        ref={boardRef}
      >
        <Code code={code} hidden={codeHidden} />
        <div className={styles.rowsContainer}>
          {rows.map((row: Row, rowNum: number) => {
            const active = activeRow === rowNum

            return (
              <Row
                {...row}
                key={rowNum}
                onPegClick={onPegClick}
                active={active}
                activePeg={activePeg}
              />
            )
          })}
        </div>
      </div>
    )
  }
}
