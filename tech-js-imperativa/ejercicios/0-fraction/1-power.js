const { Console } = require('console-mpds');
const console = new Console();

// 0-fraction / 1-power

const numerator = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator = console.readNumber(`Introduce el denominator de la fracción:`);
const exponent = console.readNumber(`Introduce el exponente:`);

console.writeln(`\nLa fracción ${numerator}/${denominator} elevada a ${exponent} es la fracción ${numerator**exponent}/${denominator**exponent}`);
