let useAtomView = (viewer: 'a => 'b, atom: Atom.t('a)) => {
  let (_, forceUpdate) = React.useReducer((x, _) => x + 1, 0);
  let state = Atom.view(viewer, atom);

  React.useLayoutEffect0(() => {
    let a = Lens.create(viewer, (_, x) => x)->Atom.lens(atom);
    let unsubscribe = Atom.subscribe((_, _) => forceUpdate(), a);
    Some(unsubscribe);
  });
  state;
};

let useAtomView0 = atom => useAtomView(x => x, atom);