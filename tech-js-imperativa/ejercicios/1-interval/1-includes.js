const { Console } = require('console-mpds');
const console = new Console();

// 1-interval / 1-includes

const minInterval = console.readNumber('Introduce el mínimo del intervalo: ');
const maxInterval = console.readNumber('Introduce el máximo del intervalo (superior o igual al mínimo): ');
const point = console.readNumber('Introduce un punto: ');

console.writeln(point >= minInterval && point <= maxInterval 
    ? `El intervalo [${minInterval},${maxInterval}] sí incluye el punto ${point}` 
    : `El intervalo [${minInterval},${maxInterval}] no incluye el punto ${point}`);