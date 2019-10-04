const { tokenizer } = require("../src/tokenizer");

describe(tokenizer, () => {
  it("should return an array", () => {
    expect(Array.isArray(tokenizer(""))).toBe(true);
  });

  it("should be able to tokenizer a pair of parentheses", () => {
    const input = "()";
    const result = [
      { type: "Parenthesis", value: "(" },
      { type: "Parenthesis", value: ")" }
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should ignore whitespace", () => {
    const input = "                  ";
    const result = [];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should tokenizer a single digit", () => {
    const input = "2";
    const result = [{ type: "Number", value: 2 }];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should handle single numbers in expressions", () => {
    const input = "(2 3)";

    const result = [
      { type: "Parenthesis", value: "(" },
      { type: "Number", value: 2 },
      { type: "Number", value: 3 },
      { type: "Parenthesis", value: ")" }
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should handle multiple digit numbers in expressions", () => {
    const input = "(2333)";

    const result = [
      { type: "Parenthesis", value: "(" },
      { type: "Number", value: 2333 },
      { type: "Parenthesis", value: ")" }
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should tokenizer a single letter", () => {
    const input = "(c)";
    const result = [
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "c" },
      { type: "Parenthesis", value: ")" }
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should handle single letters in expressions", () => {
    const input = "(a b)";

    const result = [
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "a" },
      { type: "Name", value: "b" },
      { type: "Parenthesis", value: ")" }
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it("should handle multiple letters name", () => {
    const input = "(testmultipleletter)";

    const result = [
      { type: "Parenthesis", value: "(" },
      { type: "Name", value: "testmultipleletter" },
      { type: "Parenthesis", value: ")" }
    ];

    expect(tokenizer(input)).toEqual(result);
  });
});
