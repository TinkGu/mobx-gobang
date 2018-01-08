import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { autorun } from 'mobx'
import Board from './components/Board'
import Modal, { ReplayTip, NextTurnTip } from './components/Modal'
import Store from './store/GameStore'

const store = new Store()

@observer
export default class App extends Component {
    state = {
        showTip: false,
    }

    componentWillMount() {
        autorun(() => {
            (store.turn || store.isOver) && this.setState({ showTip: true })
            if (store.isOver) {
                return
            }

            setTimeout(() => {
                this.setState({ showTip: false })
            }, 1500)
        })
    }

    render() {
        return (
            <div className="game">
                <Modal show={this.state.showTip}>
                    {store.isOver
                        ? <ReplayTip turn={store.turn} onReplay={() => store.reset()} />
                        : <NextTurnTip turn={store.turn} />
                    }
                </Modal>
                <Board
                    turn={store.turn}
                    boardStore={store.board}
                    setPiece={(index, turn) => {
                        store.board.setPiece(index, turn)
                        if (store.board.checkPass(index)) {
                            store.over()
                        } else {
                            store.nextTurn()
                        }
                    }}
                />
            </div>
        )
    }
}
