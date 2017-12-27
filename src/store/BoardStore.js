import { action, observable } from 'mobx'
import { times, findPiece, checkPass } from '../utils'

export default class BoardStore {
    width = 8
    height = 8
    @observable blocks = createBlocks(this.width, this.height)

    static pos2index(board, pos) {
        return (pos.y - 1) * board.width + pos.x - 1
    }

    findPiece = findPiece(this.width, this.height)

    checkPass = start => checkPass(this, start)

    @action setPiece = (index, className) => {
        this.blocks[index] = className
    }

    @action reset = () => {
        this.blocks = createBlocks(this.width, this.height)
    }
}

function createBlocks(w, h) {
    return times(w * h).fill(false)
}
