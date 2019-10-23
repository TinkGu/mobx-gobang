let compose = (f, g, x) => f(g(x));
let pipe = (f, g, x) => g(f(x));

module Infix = {
  let (<||) = compose;
  let (||>) = pipe;
};

include Infix;