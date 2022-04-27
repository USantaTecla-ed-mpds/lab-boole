const { Console } = require('console-mpds');
const console = new Console();

// 4-time / 0-add

console.writeln('Primera duracion -------------');
const hours = console.readNumber('Dame las horas: ');
const minutes = console.readNumber('Dame los minutos: ');
const seconds = console.readNumber('Dame los segundos: ');

console.writeln('\nSegunda duracion -------------');
const hours2 = console.readNumber('Dame las horas: ');
const minutes2 = console.readNumber('Dame los minutos: ');
const seconds2 = console.readNumber('Dame los segundos: ');

const sumSeconds = seconds + seconds2;
const sumMinutes = minutes + minutes2;

const extraMinutes = sumSeconds < 60 ? 0 : (sumSeconds < 120 ? 1 : 2);
const extraHours = sumMinutes < 60 ? 0 : (sumMinutes < 120 ? 1 : 2);

const totalSeconds = extraMinutes ? sumSeconds % 60 : sumSeconds;
const totalMinutes = (extraHours ? sumMinutes % 60 : sumMinutes) + extraMinutes;
const totalHours = hours + hours2 + extraHours;

const printSeconds = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds;
const printMinutes = totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;

console.writeln(`La suma es ${totalHours}:${printMinutes}:${printSeconds}`);