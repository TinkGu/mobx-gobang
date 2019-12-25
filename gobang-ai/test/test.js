import {
    createBoard,
    checkPass,
    pos2index
} from '../src/index'
import positions from './positions'

const board = createBoard(10, 10)
const dirs = ['up', 'left', 'right', 'down', 'leftUp', 'leftDown', 'rightUp', 'rightDown']

describe('create a 10 x 10 board', () => {
    it('board size is 10', () => {
        expect(board.width).toBe(10)
        expect(board.height).toBe(10)
    })

    describe('find piece', () => {
        positions.forEach(x => {
            dirs.forEach(d => {
                const r = board.finder[d](x.index)
                const e = x[d]
                it(`${x.index} ${d}: should be ${e}, ( ${r} )`, () =>
                    expect(r).toBe(e))
            })
        })
    })
})

describe('convert position to index', () => {
    positions.forEach(p => {
        const r = pos2index(board, p)
        const e = p.index
        it(`{ x: ${p.x}, y: ${p.y} }, should be ${e}, ( ${r} )`, () =>
            expect(e).toBe(r))
    })
})

describe('checkPass', () => {
    const w = 'white'
    const b = 'black'
    const b1 = drawLine(board, [[0, w], [1, w], [11, w], [22, w], [15, b], [33, w], [44, w]])
    const b2 = drawLine(board, [[0, b], [4, w], [7, b], [45, b], [99, w], [18, b], [29, b]])

    expect(checkPass(b1, 0)).toBe(true)
    expect(checkPass(b2, 0)).toBe(false)
})

function drawLine(bd, line) {
    const blocks = [...bd.blocks]

    line.forEach(x => {
        const [index, color] = x
        blocks[index] = color
    })

    return {
        ...bd,
        blocks,
    }
}
