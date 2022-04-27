const { Console } = require('console-mpds');
const console = new Console();

// 1-interval / 2-scale
const minInterval = console.readNumber('Introduce el mínimo del intervalo: ');
const maxInterval = console.readNumber('Introduce el máximo del intervalo (superior o igual al mínimo): ');
const scale = console.readNumber('Introduce un valor de escala positivo: ');
const length = maxInterval - minInterval;
const midPoint = minInterval + length/2;
console.writeln(`El intervalo [${minInterval},${maxInterval}]
 con factor de escala ${scale} es el intervalo :
    [${midPoint- length/2*scale},${midPoint + length/2*scale}]`);