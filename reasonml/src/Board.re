open ReactAtom;

[@react.component]
let make = (~turn: string) => {
  open State;
  let board = useAtomView0(Board.state);
  <div className="game-board">
    {ReasonReact.array(
       Array.init(Board.height, rowi =>
         <div key={string_of_int(rowi)} className="board-row">
           {ReasonReact.array(
              Array.init(
                Board.width,
                coli => {
                  let i = rowi * Board.width + coli;
                  let cls =
                    "board-block block-"
                    ++ (board[i] == "" ? "empty" : board[i]);
                  <div
                    key={string_of_int(i)}
                    className=cls
                    onClick={_ => Board.setPiece(i, turn)}
                  />;
                },
              ),
            )}
         </div>
       ),
     )}
  </div>;
};