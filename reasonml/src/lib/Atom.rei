type t('a) = {
  get: unit => 'a,
  set: 'a => unit,
  subscribe: (('a, 'a) => unit, unit) => unit,
};

let create: 'a => t('a);
let get: t('a) => 'a;
let set: ('a, t('a)) => unit;
let over: ('a => 'a, t('a)) => unit;
let subscribe: (('a, 'a) => unit, t('a), unit) => unit;
let view: ('a => 'c, t('a)) => 'c;
let lens: (Lens.t('a, 'b), t('a)) => t('b);
let log: (~logger: ('a, 'a) => unit=?, t('a), unit) => unit;