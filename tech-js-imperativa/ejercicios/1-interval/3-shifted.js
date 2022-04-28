const { Console } = require('console-mpds');
const console = new Console();

// 1-interval / 3-shifted
const minInterval = console.readNumber('Introduce el mínimo del intervalo: ');
const maxInterval = console.readNumber('Introduce el máximo del intervalo (superior o igual al mínimo): ');
const displacement = console.readNumber('Introduce un valor de desplazamiento: ');

console.writeln(`El intervalo [${minInterval}, ${maxInterval}] con factor de desplazamiento ${displacement} es el intervalo: [${minInterval + displacement}, ${maxInterval + displacement}]`);