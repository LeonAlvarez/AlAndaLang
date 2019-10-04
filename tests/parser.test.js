const { parse } = require("../src/parser");

describe(parse, () => {
  it("should return a token with the type of NumericLiteral for number tokens", () => {
    const tokens = [{ type: "Number", value: 23 }];

    const ast = { type: "NumericLiteral", value: 23 };

    expect(parse(tokens)).toEqual(ast);
  });

  it("should return a token with the type of StringLiteral for string tokens", () => {
    const tokens = [{ type: "String", value: "hello world" }];

    const ast = { type: "StringLiteral", value: "hello world" };

    expect(parse(tokens)).toEqual(ast);
  });

  it("should return a token with the type of NumericLiteral for number tokens", () => {
    const tokens = [{ type: "Name", value: "x" }];

    const ast = { type: "Identifier", name: "x" };

    expect(parse(tokens)).toEqual(ast);
  });

  it("should return an AST for a basic expression", () => {
    const tokens = [
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "sum" },
      { type: "Number", value: 3 },
      { type: "Number", value: 5 },
      { type: "Parenthesis", value: ")" }
    ];

    const ast = {
      type: "CallExpression",
      name: "sum",
      arguments: [
        { type: "NumericLiteral", value: 3 },
        { type: "NumericLiteral", value: 5 }
      ]
    };

    expect(parse(tokens)).toEqual(ast);
  });

  it("should return an AST for a nested expression", () => {
    const tokens = [
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "sum" },
      { type: "Number", value: 1 },
      { type: "Number", value: 3 },
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "sub" },
      { type: "Number", value: 7 },
      { type: "Number", value: 2 },
      { type: "Parenthesis", value: ")" },
      { type: "Parenthesis", value: ")" }
    ];

    const ast = {
      type: "CallExpression",
      name: "sum",
      arguments: [
        { type: "NumericLiteral", value: 1 },
        { type: "NumericLiteral", value: 3 },
        {
          type: "CallExpression",
          name: "sub",
          arguments: [
            { type: "NumericLiteral", value: 7 },
            { type: "NumericLiteral", value: 2 }
          ]
        }
      ]
    };

    expect(parse(tokens)).toEqual(ast);
  });
});
