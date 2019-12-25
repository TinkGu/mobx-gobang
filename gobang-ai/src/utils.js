export const times = (length, cb) => Array.from(
    { length },
    cb || ((v, i) => (i + 1))
)

export const timesPipe = (length, cb) => start =>
    times(length).reduce(
        arr => [...arr, cb(arr.length === 0 ? start : arr[arr.length - 1])],
        []
    )
