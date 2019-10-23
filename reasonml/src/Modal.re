let displayOn = ReactDOMRe.Style.make(~display="block", ());
let displayOff = ReactDOMRe.Style.make(~display="none", ());

[@react.component]
let make = (~show=false, ~children) => {
  let style = show ? displayOn : displayOff;

  <div className="modal-bg" style> children </div>;
};

module NextTurnTip = {
  [@react.component]
  let make = (~turn="black") => {
    <p className="modal-tip"> {React.string({j|$turn now|j})} </p>;
  };
};

module ReplayTip = {
  [@react.component]
  let make = (~turn="black", ~onReplay) => {
    <div>
      <p className="modal-tip"> {React.string({j|$turn win|j})} </p>
      <p className="replay-tip" onClick=onReplay>
        {React.string("Replay")}
      </p>
    </div>;
  };
};