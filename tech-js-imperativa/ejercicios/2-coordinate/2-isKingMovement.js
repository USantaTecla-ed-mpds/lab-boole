const { Console } = require('console-mpds');
const console = new Console();

// 2-coordinate / 2-isKingMovement

console.writeln(`Coordenada origen -------------`);
const abscissaOrg = console.readNumber('Dame la abcisa de la coordenada:');
const ordinateOrg = console.readNumber('Dame la ordenada de la coordenada:');

console.writeln(`\nCoordenada destino -------------`);
const abscissaDest = console.readNumber('Dame la abcisa de la coordenada:');
const ordinateDest = console.readNumber('Dame la ordenada de la coordenada:');
const onAxisX = abscissaDest - abscissaOrg;
const onAxisY = ordinateDest - ordinateOrg;

console.writeln(`La coordenada origen [${abscissaOrg},${ordinateOrg}] y la coordenada destino [${abscissaDest},${ordinateDest}]\
 ${!(-1 <= onAxisX && onAxisX <=1 && -1 <= onAxisY && onAxisY <=1) ? 'no ':''}es un movimiento del rey`);
