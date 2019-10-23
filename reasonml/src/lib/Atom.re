type t('a) = {
  get: unit => 'a,
  set: 'a => unit,
  subscribe: (('a, 'a) => unit, unit) => unit,
};

let create = value => {
  let v = ref(value);
  let l = ref([]);

  let get = () => v^;
  let set = x => {
    let p = v^;
    v := x;
    switch (l^) {
    | [] => ()
    | _ => List.iter(f => f(v^, p), l^)
    };
  };
  let subscribe = f => {
    if (!List.exists(x => x === f, l^)) {
      l := [f, ...l^];
    };

    () => {
      l := List.filter(x => x !== f, l^);
    };
  };

  {get, set, subscribe};
};

let get = a => a.get();
let set = (x, a) => a.set(x);
let over = (f, a) => a.get()->f->(a.set);
let subscribe = (f, a) => a.subscribe(f);
let view = (f: 'a => 'b, a: t('a)) => f(a.get());
let lens = (l: Lens.t('a, 'b), a) => {
  let lget = () => a.get() |> l.get;
  let lset = (x: 'b) => over((xs: 'a) => l.set(x, xs), a);
  let onSub = (f, prev, next) => {
    let p = prev->(l.get);
    let n = next->(l.get);
    if (p != n) {
      f(p, n);
    };
  };
  let lsubscribe = f => f->onSub->(a.subscribe);

  {get: lget, set: lset, subscribe: lsubscribe};
};

module Log = {
  [@bs.val]
  external consoleRender: (string, string, 'a) => unit = "console.log";
  [@bs.val] external consoleGroup: string => unit = "console.group";
  [@bs.val] external consoleGroupEnd: unit => unit = "console.groupEnd";
  let logState = (msg, color: string, x: 'a) =>
    consoleRender("%c" ++ msg, {j|color:$color;font-weight:bold|j}, x);
  let make = (prev: 'a, next: 'a) => {
    let now = Js.Date.make()->Js.Date.toTimeString;
    consoleGroup("ATOM UPDATE" ++ now);
    logState("prev state", "#9E9E9E", prev);
    logState("next state", "#4CAF50", next);
    consoleGroupEnd();
  };
};

let log = (~logger=?, a) => {
  let sub = (next, prev) => {
    switch (logger) {
    | Some(logger) => logger(prev, next)
    | None => Log.make(prev, next)
    };
  };
  a.subscribe(sub);
};