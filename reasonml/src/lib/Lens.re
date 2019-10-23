/*
 *
 * Lens is a kind of functional reference – an abstraction that allows
 * you to operate on part(s) of a value in a purely-functional setting.
 *
 * Read more here: https://en.wikibooks.org/wiki/Haskell/Lenses_and_functional_references
 */

type t('a, 'b) = {
  get: 'a => 'b,
  set: ('b, 'a) => 'a,
};

let create = (getter, setter) => {get: getter, set: setter};
let make = create;

let modify = (l, f, a) => {
  let v = l.get(a);
  l.set(f(v), a);
};
let over = modify;

let compose = (l0, l1) =>
  Function.{get: l1.get ||> l0.get, set: l0.set ||> over(l1)};