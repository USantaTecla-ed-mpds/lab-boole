const { Console } = require('console-mpds');
const console = new Console();

// 0-fraction / 0-inverse

const numerator = console.readNumber('Introduce el numerador de la fracción: ');
const denominator = console.readNumber('Introduce el denominator de la fracción: ');

console.writeln(`La fracción ${numerator}/${denominator} invertida es ${denominator}/${numerator}`);