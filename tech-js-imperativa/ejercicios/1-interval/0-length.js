const { Console } = require('console-mpds');
const console = new Console();

// 1-interval / 0-length

const minInterval = console.readNumber('Introduce el mínimo del intervalo: ');
const maxInterval = console.readNumber('Introduce el máximo del intervalo (superior o igual al mínimo): ')  ;
const lengthInterval = (minInterval > maxInterval) ? -1 : maxInterval - minInterval;

console.writeln(lengthInterval === -1 
    ? `Error: El valor del máximo intervalo debe de ser superior o igual a ${minInterval}` 
    : `La longitud del intervalo [${minInterval}, ${maxInterval}] es ${lengthInterval}`);