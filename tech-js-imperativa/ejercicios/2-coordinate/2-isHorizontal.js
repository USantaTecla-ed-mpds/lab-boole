const { Console } = require('console-mpds');
const console = new Console();

// 2-coordinate / 2-isHorizontal

console.writeln(`Coordenada origen -------------`);
const abscissa = console.readNumber('Dame la abcisa de la coordenada:');
const ordinate = console.readNumber('Dame la ordenada de la coordenada:');

console.writeln(`\nCoordenada destino -------------`);
const abscissa2 = console.readNumber('Dame la abcisa de la coordenada:');
const ordinate2 = console.readNumber('Dame la ordenada de la coordenada:');

console.writeln(abscissa2 !== abscissa && ordinate2 == ordinate 
  ? `\nLa coordenada origen (${abscissa},${ordinate}) y la coordenada destino (${abscissa2},${ordinate2}) sí es un movimiento horizontal`
  : `\nLa coordenada origen (${abscissa},${ordinate}) y la coordenada destino (${abscissa2},${ordinate2}) no es un movimiento horizontal`)