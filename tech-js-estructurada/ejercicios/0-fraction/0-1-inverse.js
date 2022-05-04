const { Console } = require("console-mpds");
const console = new Console();


// 0-fraction/0-1-inverse

const numerator = console.readNumber(`Introduce el numerador de la fracción: `);
const denominator = console.readNumber(`Introduce el denominador de la fracción: `);

let dividend = numerator>=denominator ? numerator : denominator;
let divisor = numerator>=denominator ? denominator : numerator;
let remainder = dividend % divisor;

if (remainder === 0) {
    mcd = divisor;
} else {
    while (remainder !== 0) {
        dividend = divisor;
        divisor = remainder;
        remainder = dividend % divisor;
    }
    mcd = divisor;
}

console.writeln(`\nLa fracción ${numerator}/${denominator} \
reducida es ${numerator/mcd}/${denominator/mcd}, \
e invertida es la fracción ${denominator/mcd}/${numerator/mcd}`);
