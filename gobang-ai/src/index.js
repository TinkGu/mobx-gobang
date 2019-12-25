import { times, timesPipe } from './utils'

export function createBoard(width, height) {
    return {
        width,
        height,
        blocks: createBlocks(width, height),
        finder: finder(width, height),
    }
}

function createBlocks(w, h) {
    return times(w * h).fill(false)
}


export function finder(w, h) {
    const inner = i => (i >= 0 && i < w * h)
    const up = i => i - w
    const down = i => i + w
    const left = i => (i % h === 0) ? NaN : i - 1
    const right = i => (i % h === h - 1) ? NaN : i + 1
    const leftUp = i => left(up(i))
    const leftDown = i => left(down(i))
    const rightUp = i => right(up(i))
    const rightDown = i => right(down(i))
    const innerOrNull = f => i => {
        const x = f(i)
        return inner(x) ? x : null
    }

    return {
        up: innerOrNull(up),
        down: innerOrNull(down),
        left: innerOrNull(left),
        right: innerOrNull(right),
        leftUp: innerOrNull(leftUp),
        leftDown: innerOrNull(leftDown),
        rightUp: innerOrNull(rightUp),
        rightDown: innerOrNull(rightDown),
        inner,
    }
}

export function checkPass(board, start) {
    const find = board.finder
    const line = dirFn => timesPipe(4, dirFn)(start)
    const lines = [
        [...line(find.up), start, ...line(find.down)],
        [...line(find.left), start, ...line(find.right)],
        [...line(find.leftUp), start, ...line(find.rightDown)],
        [...line(find.rightUp), start, ...line(find.leftDown)],
    ]
    return lines.some(x => checkLinePass(getLineInfo(board, x)))
}

export function pos2index(board, pos) {
    return (pos.y - 1) * board.width + pos.x - 1
}

function getLineInfo(board, line) {
    return line.map(x => board.finder.inner(x) ? board.blocks[x] : null)
}

const MATCH = 5
function checkLinePass(pieces) {
    let sameCount = 0
    let last = null

    pieces.forEach(x => {
        if (sameCount >= MATCH) {
            return
        }

        if (x === last) {
            sameCount += 1
        } else {
            sameCount = 1
        }

        last = x
    })

    return sameCount >= MATCH && last !== null
}
