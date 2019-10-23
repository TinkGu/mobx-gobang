open Modal;

let onReplay = _ => {
  State.Game.reset();
  State.Board.reset();
};

[@react.component]
let make = () => {
  let (showTip, toggleTip) = React.useState(() => false);
  let game: State.Game.t = ReactAtom.useAtomView0(State.Game.state);

  React.useEffect2(
    () => {
      toggleTip(_ => true);
      if (game.isOver) {
        None;
      } else {
        let timer = Js.Global.setTimeout(() => toggleTip(_ => false), 1500);
        Some(() => Js.Global.clearTimeout(timer));
      };
    },
    (game.turn, game.isOver),
  );

  <div className="game">
    <Modal show=showTip>
      {switch (game.isOver) {
       | false => <NextTurnTip turn={game.turn} />
       | true => <ReplayTip turn={game.turn} onReplay />
       }}
    </Modal>
    <Board turn={game.turn} />
  </div>;
};