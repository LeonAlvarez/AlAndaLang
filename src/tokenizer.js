const {
  isNumber,
  isLetter,
  isParenthesis,
  isWhitespace,
  isQuote
} = require("./utils/identities");

const tokenizer = input => {
  let index = 0;
  const tokens = [];

  while (index < input.length) {
    const char = input[index];

    if (isWhitespace(char)) {
      index++;
      continue;
    }

    if (isParenthesis(char)) {
      tokens.push({
        type: "Parenthesis",
        value: char
      });
      index++;
      continue;
    }

    if (isNumber(char)) {
      let number = char;
      while (isNumber(input[++index])) {
        number += input[index];
      }
      tokens.push({
        type: "Number",
        value: parseInt(number)
      });
      continue;
    }

    if (isLetter(char)) {
      let name = char;

      while (isLetter(input[++index])) {
        name += input[index];
      }

      tokens.push({
        type: "Name",
        value: name
      });

      continue;
    }

    if (isQuote(char)) {
      let quote = "";
      while (!isQuote(input[++index])) {
        quote += input[index];
      }
      tokens.push({
        type: "String",
        value: quote
      });

      //prevent ending quote tokenize
      index++;
      continue;
    }

    throw new Error(`${char} Invalid, no tokenizer defined`);
  }

  return tokens;
};

module.exports = { tokenizer };
