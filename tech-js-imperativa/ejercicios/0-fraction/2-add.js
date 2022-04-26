const { Console } = require('console-mpds');
const console = new Console();

// 0-fraction / 2-add

console.writeln(`Primera fraccion -------------`);
const numerator = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator = console.readNumber(`Introduce el denominator de la fracción:`);


console.writeln(`\nSegunda fraccion -------------`);
const numerator2 = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator2 = console.readNumber(`Introduce el denominator de la fracción:`);

const sumNumerators = numerator * denominator2 + numerator2 * denominator;
const sumDenominators = denominator * denominator2;

console.writeln(`\nLa suma de la fracción ${numerator}/${denominator} y la fracción ${numerator2}/${denominator2} es la fracción ${sumNumerators}/${sumDenominators}`);