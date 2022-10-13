import chalk from "chalk";

class Logger {
  static log = (args: string) => this.info(args);

  static info = (args: string) => {
    console.log(
      chalk.blue(`[INFO]`),
      chalk.blueBright(args)
    );
  }

  static warn = (args: string) => {
    console.log(
      chalk.yellow(`[WARN]`),
      chalk.yellowBright(args)
    );
  }

  static error = (args: string) => {
    console.log(
      chalk.red(`[ERR]`),
      chalk.redBright(args)
    );
  }
}

export default Logger;
