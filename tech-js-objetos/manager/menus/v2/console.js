let { input } = require('console-input');

class Console {

  constructor() {
  }

  static write(value) {
    if (value !== undefined) {
      process.stdout.write(`${value}`);
    }
  }

  static writeln(value) {
    this.write(value);
    this.write(`\n`);
  }

  static readString(title) {
    this.write(title);
    return input(" ");
  }

  static readNumber(title) {
    let input;
    do {
      input = parseInt(this.readString(title));
      if (isNaN(input)) {
        console.log('FORMAT ERROR!!! Enter a number formatted value.');
      }
    } while (isNaN(input));
    return input;
  }

}

module.exports.Console = Console;