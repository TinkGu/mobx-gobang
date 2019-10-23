// [@bs.deriving jsConverter]
// type turn = [ | `Black | `White];

module Game = {
  type t = {
    turn: string,
    isOver: bool,
  };

  let state = Atom.create({turn: "black", isOver: false});

  let reset = () => state.set({turn: "black", isOver: false});

  let nextTurn = () => {
    Atom.over(
      x => {...x, turn: x.turn === "black" ? "white" : "black"},
      state,
    );
  };

  let over = () => {
    Atom.over(x => {...x, isOver: true}, state);
  };
};

module FindPiece = {
  let up = (w, _, i) => i - w;
  let down = (w, _, i) => i + w;
  let left = (_, h, i) => (i - 1) mod h == 0 ? (-1) : i - 1;
  let right = (_, h, i) => (i + 1) mod h == h - 1 ? (-1) : i + 1;
  let leftUp = (w, h, i) => up(w, h, i) |> left(w, h);
  let leftDown = (w, h, i) => down(w, h, i) |> left(w, h);
  let rightUp = (w, h, i) => up(w, h, i) |> right(w, h);
  let rightDown = (w, h, i) => down(w, h, i) |> right(w, h);
  let inner = (w, h, i) => i >= 0 && i < w * h;
};

module Checker = {
  let limit = 5;

  let rec samePeakLen = (l: list(string), last, cur: int, peak) => {
    switch (l) {
    | [] => peak
    | [x, ...xs] =>
      x == last && x != ""
        ? samePeakLen(xs, x, cur + 1, max(cur + 1, peak))
        : samePeakLen(xs, x, 1, peak)
    };
  };

  let checkLinePass = pieces => samePeakLen(pieces, "", 0, 1) >= limit;

  let dirs =
    FindPiece.[
      (up, down),
      (left, right),
      (leftUp, rightDown),
      (rightUp, leftDown),
    ];

  let dotsHof = (board, w, h, oi) => {
    let rec genDots = (size, res, i, dirf) => {
      switch (size) {
      | 0 => res
      | _ =>
        let next = dirf(w, h, i);
        FindPiece.inner(w, h, next)
          ? genDots(size - 1, [board[next]] @ res, next, dirf)
          : genDots(0, res, next, dirf);
      };
    };
    dirf => genDots(limit, [], oi, dirf);
  };
  let checkPass = (board: array(string), w, h, i) => {
    let dots = dotsHof(board, w, h, i);
    List.exists(
      ((d1, d2)) => checkLinePass(dots(d1) @ [board[i]] @ dots(d2)),
      dirs,
    );
  };
};

module Board = {
  type t = {
    x: int,
    y: int,
  };

  let width = 8;
  let height = 8;

  let state = Atom.create(Array.make(width * height, ""));

  let reset = () => state.set(Array.make(width * height, ""));

  let pos2index = (pos: t) => (pos.y - 1) * width + pos.x - 1;

  let setPiece = (i, turn) =>
    switch (Atom.view(xs => xs[i], state)) {
    | "" =>
      let next = Array.mapi((xi, xx) => xi == i ? turn : xx, state.get());
      Atom.set(next, state);
      Checker.checkPass(next, width, height, i)
        ? Game.over() : Game.nextTurn();
    | _ => ()
    };
};