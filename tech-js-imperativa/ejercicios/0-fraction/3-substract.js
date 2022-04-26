const { Console } = require('console-mpds');
const console = new Console();

// 0-fraction / 3-substract

console.writeln(`Primera fracción -------------`);
const numerator = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator = console.readNumber(`Introduce el denominador de la fracción:`);


console.writeln(`\nSegunda fracción -------------`);
const numerator2 = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator2 = console.readNumber(`Introduce el denominador de la fracción:`);

const sumNumerators = numerator * denominator2 - numerator2 * denominator;
const sumDenominators = denominator * denominator2;

console.writeln(`\nLa suma de la fracción ${numerator}/${denominator} y la fracción ${numerator2}/${denominator2} es la fracción ${sumNumerators}/${sumDenominators}`);

