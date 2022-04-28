const { Console } = require('console-mpds');
const console = new Console();

// 2-coordinate / 1-quadrant

const abscissa = console.readNumber('Dame la abcisa de la coordenada:');
const ordinate = console.readNumber('Dame la ordenada de la coordenada:');

console.writeln(abscissa > 0 && ordinate > 0 
  ? `La coordenada (${abscissa},${ordinate}) esta en el 1er cuadrante`
  : ordinate < 0 && abscissa < 0  
  ? `La coordenada (${abscissa},${ordinate}) esta en el 3er cuadrante`
  : abscissa < 0 
  ? `La coordenada (${abscissa},${ordinate}) esta en el 2do cuadrante`
  : `La coordenada (${abscissa},${ordinate}) esta en el 4to cuadrante`)