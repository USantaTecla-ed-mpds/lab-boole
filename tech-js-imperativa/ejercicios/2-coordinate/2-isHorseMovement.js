const { Console } = require('console-mpds');
const console = new Console();

// 2-coordinate / 2-isHorseMovement

console.writeln(`Coordenada origen -------------`);
const abscissaOrg = console.readNumber('Dame la abcisa de la coordenada:');
const ordinateOrg = console.readNumber('Dame la ordenada de la coordenada:');

console.writeln(`\nCoordenada destino -------------`);
const abscissaDest = console.readNumber('Dame la abcisa de la coordenada:');
const ordinateDest = console.readNumber('Dame la ordenada de la coordenada:');
const onAxisX = abscissaDest - abscissaOrg;
const onAxisY = ordinateDest - ordinateOrg;

const onAxisXAbs = onAxisX < 0 ? onAxisX * -1 : onAxisX;
const onAxisYAbs = onAxisY < 0 ? onAxisY * -1 : onAxisY;

console.writeln(`La coordenada origen [${abscissaOrg},${ordinateOrg}] y la coordenada destino [${abscissaDest},${ordinateDest}]\
 ${!(onAxisXAbs === 1 && onAxisYAbs === 2 || onAxisXAbs === 2 && onAxisYAbs === 1 ) ? 'no ':'si '}es un movimiento del caballo`);
