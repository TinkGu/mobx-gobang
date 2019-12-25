const pos = (up, left, right, down,
    leftUp, leftDown, rightUp, rightDown) => ({
    up, left, right, down, leftUp, leftDown, rightUp, rightDown
})

export default [
    {
        index: 1,
        x: 2,
        y: 1,
        ...pos(null, 0, 2, 11, null, 10, null, 12),
    },
    {
        index: 14,
        x: 5,
        y: 2,
        ...pos(4, 13, 15, 24, 3, 23, 5, 25),
    },
    {
        index: 39,
        x: 10,
        y: 4,
        ...pos(29, 38, null, 49, 28, 48, null, null),
    },
    {
        index: 97,
        x: 8,
        y: 10,
        ...pos(87, 96, 98, null, 86, null, 88, null),
    }
]
