const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

const tap = (value, fn) => {
  fn(value);
  return value;
};
const log = value => tap(value, console.log);

module.exports = {
  pipe,
  tap,
  log
};
