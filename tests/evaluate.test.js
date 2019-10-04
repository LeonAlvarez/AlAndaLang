const { evaluate } = require("../src/evaluate");

describe(evaluate, () => {
  it("should return a primitive numeric value for NumericLiteral", () => {
    const ast = { type: "NumericLiteral", value: 33 };

    expect(evaluate(ast)).toBe(33);
  });

  it("should return a primitive string StringValue", () => {
    const ast = { type: "StringValue", value: "Hello world" };

    expect(evaluate(ast)).toBe("Hello world");
  });

  it("should be able to evaluate a single standard lib expression", () => {
    const ast = {
      type: "CallExpression",
      name: "sum",
      arguments: [
        { type: "NumericLiteral", value: 2 },
        { type: "NumericLiteral", value: 3 }
      ]
    };

    const result = evaluate(ast);

    expect(result).toBe(5);
  });

  it("should evaluate a nested expression", () => {
    const ast = {
      type: "CallExpression",
      name: "sum",
      arguments: [
        { type: "NumericLiteral", value: 2 },
        { type: "NumericLiteral", value: 3 },
        {
          type: "CallExpression",
          name: "sub",
          arguments: [
            { type: "NumericLiteral", value: 5 },
            { type: "NumericLiteral", value: 4 }
          ]
        }
      ]
    };

    const result = evaluate(ast);

    expect(result).toBe(6);
  });

  it("should lookup identifiers in the core standard library", () => {
    const ast = { type: "Identifier", name: "pi" };
    expect(evaluate(ast)).toBe(Math.PI);
  });

  it("should return highest number in a range", () => {
    const ast = {
      type: "CallExpression",
      name: "max",
      arguments: [
        { type: "NumericLiteral", value: 2 },
        { type: "NumericLiteral", value: 3 },
        { type: "NumericLiteral", value: 10 },
        { type: "NumericLiteral", value: 9 }
      ]
    };

    expect(evaluate(ast)).toBe(10);
  });
});
