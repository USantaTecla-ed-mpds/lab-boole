const { Console } = require('console-mpds');
const console = new Console();

// 0-fraction / 4-multiply

console.writeln(`Primera fracción -------------`);
const numerator = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator = console.readNumber(`Introduce el denominador de la fracción:`);


console.writeln(`\nSegunda fracción -------------`);
const numerator2 = console.readNumber(`Introduce el numerador de la fracción:`);
const denominator2 = console.readNumber(`Introduce el denominador de la fracción:`);

console.writeln(`\nLa multiplicación de la fracción ${numerator}/${denominator} y la fracción ${numerator2}/${denominator2} es la fracción ${numerator*numerator2}/${denominator*denominator2}`);