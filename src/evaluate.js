const context = require("./context");

const applyExpression = node => {
  const { name, arguments: args } = node;
  const func = context[name];

  if (typeof func !== "function") {
    throw new TypeError(`${name} is not a function`);
  }
  if (name == "js") {
    return func(...args.map(x => x.value || x.name));
  }

  return func(...args.map(evaluate));
};

const getIdentifier = node => {
  const { name } = node;
  if (context[name] === undefined) {
    throw new ReferenceError(`${name} is not defined`);
  }
  return context[name];
};

const evaluate = node => {
  if (node.type === "CallExpression") return applyExpression(node);
  if (node.type === "Identifier") return getIdentifier(node);
  if (node.value) return node.value;
};

module.exports = { evaluate };
