const { tokenizer } = require("./tokenizer");
const { parse } = require("./parser");
const { evaluate } = require("./evaluate");
const { pipe } = require("./utils/functional");
const { parseProgram } = require("./parse-program");
const { transform } = require("./transform");

const tokenizeAndParse = pipe(
  tokenizer,
  parse
);

const parseAndEvaluate = pipe(
  tokenizeAndParse,
  transform,
  evaluate
);

const parseAndEvaluateProgram = pipe(
  tokenizer,
  parseProgram,
  evaluate
);

module.exports = {
  parseAndEvaluate,
  tokenizeAndParse,
  parseAndEvaluateProgram
};
