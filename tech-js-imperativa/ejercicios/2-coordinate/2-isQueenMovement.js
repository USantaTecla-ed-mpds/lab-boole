const { Console } = require('console-mpds');
const console = new Console();

// 2-coordinate / 2-isQueenMovement

console.writeln(`Coordenada origen -------------`);
const abscissaOrg = console.readNumber('Dame la abcisa de la coordenada:');
const ordinateOrg = console.readNumber('Dame la ordenada de la coordenada:');

console.writeln(`\nCoordenada destino -------------`);
const abscissaDest = console.readNumber('Dame la abcisa de la coordenada:');
const ordinateDest = console.readNumber('Dame la ordenada de la coordenada:');
const onAxisX = abscissaDest - abscissaOrg;
const onAxisY = ordinateDest - ordinateOrg;
const onAxis = onAxisX === 0 || onAxisY === 0 ? true : false;

const onAxisXAbs = onAxisX < 0 ? onAxisX *= -1 : onAxisX;
const onAxisYAbs = onAxisY < 0 ? onAxisY *= -1 : onAxisY;
const onDiagonal = onAxis === false && onAxisY < 0 ? onAxisY *=-1 : ''; 

console.writeln(`La coordenada origen [${abscissaOrg},${ordinateOrg}] y la coordenada destino [${abscissaDest},${ordinateDest}]\
 ${!(onAxis || onAxisXAbs === onAxisYAbs) ? 'no ':''}es un movimiento de la reina`);
