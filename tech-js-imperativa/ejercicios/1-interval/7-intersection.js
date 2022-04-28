const { Console } = require('console-mpds');
const console = new Console();

// 1-interval / 7-intersection
console.writeln('Primer intervalo: ');
const minInterval = console.readNumber('Introduce el mínimo del intervalo: ');
const maxInterval = console.readNumber('Introduce el máximo del intervalo (superior o igual al mínimo): ');

console.writeln('Segundo intervalo: ')
const minInterval2 = console.readNumber('Introduce el mínimo del intervalo: ');
const maxInterval2 = console.readNumber('Introduce el máximo del intervalo (superior o igual al mínimo): ');

const intersectionMin = minInterval > minInterval2 ? minInterval : minInterval2;
const intersectionMax = maxInterval < maxInterval2 ? maxInterval : maxInterval2;

console.writeln(`El intervalo [${minInterval}, ${maxInterval}] intersección con el intervalo [${minInterval2}, ${maxInterval2}] es el intervalo [${intersectionMin}, ${intersectionMax}]`);