const {
  isOpeningParenthesis,
  isClosingParenthesis
} = require("./utils/identities");
const { specialForms } = require("./special-forms");
const { first, pop } = require("./utils/collections");

const getExpressions = tokens => {
  const token = pop(tokens);

  if (!isOpeningParenthesis(token.value)) {
    return token;
  }

  const expression = [];
  while (!isClosingParenthesis(first(tokens).value)) {
    expression.push(getExpressions(tokens));
  }

  pop(tokens);

  return expression;
};

const parse = tokens => {
  if (Array.isArray(tokens)) {
    const [name, ...expression_arguments] = tokens;

    return {
      type: "CallExpression",
      name: name.value,
      arguments: expression_arguments.map(parse)
    };
  }

  const token = tokens;

  if (token.type === "Name") {
    return {
      type: "Identifier",
      name: token.value
    };
  }

  if (token.type === "Number") {
    return {
      type: "NumericLiteral",
      value: token.value
    };
  }

  if (token.type === "String") {
    return {
      type: "StringLiteral",
      value: token.value
    };
  }
};

module.exports = { parse: tokens => parse(getExpressions(tokens)) };
