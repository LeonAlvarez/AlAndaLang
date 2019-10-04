const { prompt } = require("inquirer");
const chalk = require("chalk");
const { pipe } = require("./utils/functional");

const { parseAndEvaluate } = require("./parse-and-evaluate");

const askQuestions = () => {
  const questions = [
    { name: "COMMAND", type: "input", message: chalk.blue(">") }
  ];

  return prompt(questions);
};

const repl = async () => {
  try {
    const answers = await askQuestions();
    const { COMMAND } = answers;

    if (COMMAND.trim()) {
      console.log(chalk.yellow(parseAndEvaluate(COMMAND)));
    }
  } catch (error) {
    console.error(error);
  }

  repl();
};

if (require.main === module) {
}

const main = () => {
  // prettier-
  const AlA = chalk.bgGreen("Al");
  const nda = chalk.bgWhite("Anda");
  const lang = chalk.bgGreen("lang");
  console.log(
    chalk.green(`Biembenío al REPL de ${chalk.black(AlA + nda + lang)}`)
  );
  repl();
};

module.exports = { repl, main };
