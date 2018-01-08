import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { times } from '../utils'

@observer
export default class Board extends Component {
    render() {
        const { boardStore, setPiece, turn } = this.props
        const rows = times(boardStore.height).map(rowIndex => {
            const blocks = times(boardStore.width).map(colIndex => {
                const index = (rowIndex - 1) * boardStore.width + colIndex - 1
                const classString = `board-block ${boardStore.blocks[index] || 'block-empty'}`
                return (
                    <div
                        key={index}
                        className={classString}
                        onClick={() => setPiece(index, `block-${turn}`)}
                    />
                )
            })

            return <div className="board-row" key={rowIndex}>{blocks}</div>
        })

        return <div className="game-board">{rows}</div>
    }
}
