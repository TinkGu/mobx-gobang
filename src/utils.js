export const times = (length, cb) => Array.from(
    { length },
    cb || ((v, i) => (i + 1))
)

export const timesPipe = (length, cb) => start =>
    times(length).reduce(
        arr => [...arr, cb(arr.length === 0 ? start : arr[arr.length - 1])],
        []
    )

export function findPiece(w, h) {
    const up = i => i - w
    const down = i => i + w
    const left = i => ((i - 1) % h === 0) ? null : i - 1
    const right = i => ((i + 1) % h === h - 1) ? null : i + 1
    const leftUp = i => left(up(i))
    const leftDown = i => left(down(i))
    const rightUp = i => right(up(i))
    const rightDown = i => right(down(i))
    const inner = i => (i >= 0 && i < w * h)

    return {
        up,
        down,
        left,
        right,
        leftUp,
        leftDown,
        rightUp,
        rightDown,
        inner,
    }
}

export function checkPass(board, start) {
    const find = board.findPiece
    const line = dirFn => timesPipe(4, dirFn)(start)
    const lines = [
        [...line(find.up), start, ...line(find.down)],
        [...line(find.left), start, ...line(find.right)],
        [...line(find.leftUp), start, ...line(find.rightDown)],
        [...line(find.rightUp), start, ...line(find.leftDown)],
    ]
    return lines.some(x => checkLinePass(getLineInfo(board, x)))
}

function getLineInfo(board, line) {
    return line.map(x => board.findPiece.inner(x) ? board.blocks[x] : null)
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
