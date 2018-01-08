import { observable, action } from 'mobx'
import BoardStore from './BoardStore'

export default class GameStore {
    @observable isOver = false
    @observable turn = 'black'
    board = new BoardStore()

    @action reset = () => {
        this.isOver = false
        this.turn = 'black'
        this.board.reset()
    }

    @action nextTurn = () => {
        this.turn = this.turn === 'black' ? 'white' : 'black'
    }

    @action over = () => {
        this.isOver = true
    }
}
