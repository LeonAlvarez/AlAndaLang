const LETTER = /[a-zA-Z+\/%\*-=<>\?]/;
const WHITESPACE = /\s+/;

const OPERATORS = ["+", "-", "*", "/", "%"];

const isLetter = char => LETTER.test(char);

const isNumber = num => {
  if (typeof num === "number") {
    return num - num === 0;
  }
  if (typeof num === "string" && num.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};

// WhiteSpace codes => https://en.wikipedia.org/wiki/Whitespace_character
const isWhitespace = char => {
  const char_code = char.charCodeAt(0);
  if (
    (char_code < 9 || char_code > 13) &&
    char_code !== 32 &&
    char_code !== 133 &&
    char_code !== 160 &&
    char_code !== 5760 &&
    char_code !== 6158 &&
    (char_code < 8192 || char_code > 8205) &&
    char_code !== 8232 &&
    char_code !== 8233 &&
    char_code !== 8239 &&
    char_code !== 8287 &&
    char_code !== 8288 &&
    char_code !== 12288 &&
    char_code !== 65279
  ) {
    return false;
  }
  return true;
};

const isOperator = char => OPERATORS.includes(character);

const isColon = char => char === ":";

const isSemiColon = char => char === ";";

const isOpeningParenthesis = char => char === "(";

const isClosingParenthesis = char => char === ")";

const isParenthesis = char =>
  isOpeningParenthesis(char) || isClosingParenthesis(char);

const isQuote = char => char === '"';

module.exports = {
  isLetter,
  isNumber,
  isWhitespace,
  isOperator,
  isColon,
  isOpeningParenthesis,
  isClosingParenthesis,
  isParenthesis,
  isQuote,
  isSemiColon
};
