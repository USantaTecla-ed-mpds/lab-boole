const { Console } = require('console-mpds');
const console = new Console();

// 2-coordinate / 0-onAxes

const abscisa = console.readNumber('Dame la abcisa de la coordenada:');
const ordinate = console.readNumber('Dame la ordenada de la coordenada:');

const onAxis = ordinate === 0 || abscisa === 0;
const onAxisX = ordinate === 0;
const onAxisY = abscisa === 0;

console.writeln(`La coordenada (${abscisa}, ${ordinate}) ${!onAxis ? 'NO ' : ''}está en ${onAxis ? (onAxisX ? 'el eje de abscisas' : '') + (onAxisX && onAxisY ? ' y en ' : '') + (onAxisY ? 'el eje de ordenadas' : '') : 'ningun eje'}`);


// Opcion 2:
// const msgX = onAxisX ? 'el eje de abscisas' : '';
// const msgXY = onAxisX && onAxisY ? ' y en ' : '';
// const msgY = onAxisY ? 'el eje de ordenadas' : '';
// console.writeln(`La coordenada (${abscisa}, ${ordinate}) ${!onAxis ? 'NO ' : ''}está en ${onAxis ? msgX + msgXY + msgY : 'ningun eje'}`);