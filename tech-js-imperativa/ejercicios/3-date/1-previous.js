const { Console } = require('console-mpds');
const console = new Console();

// 3-date / 1-previous

const day = console.readNumber('Dame el día: ');
const month = console.readNumber('Dame el mes: ');
const year = console.readNumber('Dame el año: ');

console.writeln(`La fecha ${day}/${month}/${year} y la anterior es ${day === 1 && month === 1 ? `$30/12/${year-1}` : day === 1 ? `30/${month-1}/${year}` : `${day-1}/${month}/${year}`}`);