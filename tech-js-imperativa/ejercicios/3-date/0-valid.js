const { Console } = require('console-mpds');
const console = new Console();

// 3-date / 0-valid

const day = console.readNumber('Dame el día: ');
const month = console.readNumber('Dame el mes: ');
const year = console.readNumber('Dame el año: ');

console.writeln(`La fecha ${day}/${month}/${year} ${day > 30 || month > 12 ? 'NO' : 'SÍ'} es válida`);