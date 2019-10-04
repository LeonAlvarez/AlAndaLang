const { readFileSync } = require("fs-extra");
const log = console.log;
const all = fn => (...list) => list.reduce(fn);
const list = (...a) => a;
const sum = all((a, b) => a + b);
const sub = all((a, b) => a - b);
const multiply = all((a, b) => a * b);
const divide = all((a, b) => a / b);
const modulo = all((a, b) => a % b);
const max = (...args) => Math.max(...args);
const slurp = file_path => readFileSync(file_path, "utf-8");

module.exports = {
  sum,
  sub,
  multiply,
  divide,
  modulo,
  max,
  list,
  log,
  slurp,
  "empty?": a => a.length === 0,
  count: a => (a === null ? 0 : a.length),
  apply: (f, ...a) => f(...a.slice(0, -1).concat(a[a.length - 1])),
  map: (f, a) => Array.from(a.map(x => f(x))),
  "nil?": a => a === null,
  "true?": a => a === true,
  "false?": a => a === false,
  "number?": a => typeof a === "number",
  "+": sum,
  "-": sub,
  "*": multiply,
  "/": divide,
  "%": modulo,
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
  js: (...js) => eval(js.join(" ")),
  if: (condition, yes, no) => (condition ? yes : no),
  pi: Math.PI
};
