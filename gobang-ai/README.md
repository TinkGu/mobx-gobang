# gobang-ai

[![build status](https://travis-ci.org/TinkGu/gobang-ai.svg)](https://travis-ci.org/TinkGu/gobang-ai)

> describe algo for gobang

**Note**: This is not the best solution, just to learn.

# Install

```
npm i gobang-ai -S
```

# NOTE

**ALL INDEX START FROM 0**

# API

## createBoard

> create a board

```typescript
interface Board {
    width: number,
    height: number,
    blocks: any[], // initial value is `false`
    finder: finder,
}

interface createBoard {
    (width: number, height: number): Board
}
```

## finder

> create find functions in all directions

```typescript
// find piece in another direction
interface DirFunc {
    (i: number): number
}

interface finder {
    (width: number, height: number): {
        up: DirFunc,
        down: DirFunc,
        left: DirFunc,
        right: DirFunc,
        leftUp: DirFunc,
        rightUp: DirFunc,
        leftDown: DirFunc,
        rightDown: DirFunc,
        // if a piece in this board, return true
        inner: (i: number) => boolean
    }
}
```

## pos2index

> convert position object to index number

```typescript

interface Pos {
    x: number,
    y: number,
}

interface pos2index {
    (board: Board, pos: Pos): number
}
```

## checkPass

> check 5 pieces in one line

```typescript
interface checkPass {
    (board: Board, start: number): boolean
}
```
