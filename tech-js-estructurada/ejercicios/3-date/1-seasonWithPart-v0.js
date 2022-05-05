const { Console } = require("console-mpds");
const console = new Console();


// 3-date / 1-seasonWithPart / v0

const day = console.readNumber(`Escriba un día (1-30): `);
const month = console.readNumber(`Escriba un mes (1-12): `);
const year = console.readNumber(`Escriba un año (1-...): `);

const JANUARY = month === 1;
const FEBRUARY = month === 2;
const MARCH = month === 3;
const APRIL = month === 4;
const MAY = month === 5;
const JUNE = month === 6;
const JULY = month === 7;
const AUGUST = month === 8;
const SEPTEMBER = month === 9;
const OCTOBER = month === 10;
const NOVEMBER = month === 11;
const DECEMBER = month === 12;

const isWinterMid = JANUARY && day>=21 || FEBRUARY && day<21;
const isWinterLate = FEBRUARY && day>=21 || MARCH && day<21;
const isSpringEarly = MARCH && day>=21 || APRIL && day<21;
const isSpringMid = APRIL && day>=21 || MAY && day<21;
const isSpringLate = MAY && day>=21 || JUNE && day<21;
const isSummerEarly = JUNE && day>=21 || JULY && day<21;
const isSummerMid = JULY && day>=21 || AUGUST && day<21;
const isSummerLate = AUGUST && day>=21 || SEPTEMBER && day<21;
const isAutumnEarly = SEPTEMBER && day>=21 || OCTOBER && day<21;
const isAutumnMid = OCTOBER && day>=21 || NOVEMBER && day<21;
const isAutumnLate = NOVEMBER && day>=21 || DECEMBER && day<21;


let seasonMoment = 'primeros';

if (isWinterMid || isSpringMid || isSummerMid || isAutumnMid) {
    seasonMoment = 'mediados';
}
if (isWinterLate || isSpringLate || isSummerLate || isAutumnLate) {
    seasonMoment = 'finales';
}


let seasonName = 'invierno';

if (isSpringEarly || isSpringMid || isSpringLate ) {
    seasonName = `primavera`;
}
if (isSummerEarly || isSummerMid || isSummerLate ) {
    seasonName = `verano`;
}
if (isAutumnEarly || isAutumnMid || isAutumnLate ) {
    seasonName = `otoño`;
}


console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonMoment} de ${seasonName}.`);