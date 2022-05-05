const { Console } = require("console-mpds");
const console = new Console();


// 3-date / 1-seasonWithPart / v0

const DAYS_IN_MONTH = 30;
const CUT_DAY = 21;

const day = console.readNumber(`Escriba un día (1-30): `);
const month = console.readNumber(`Escriba un mes (1-12): `);
const year = console.readNumber(`Escriba un año (1-...): `);

const dayOfYear = month*DAYS_IN_MONTH - (DAYS_IN_MONTH-day);

const isWinterMid   = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*0  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*1;
const isWinterLate  = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*1  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*2;
const isSpringEarly = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*2  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*3;
const isSpringMid   = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*3  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*4;
const isSpringLate  = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*4  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*5;
const isSummerEarly = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*5  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*6;
const isSummerMid   = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*6  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*7;
const isSummerLate  = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*7  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*8;
const isAutumnEarly = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*8  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*9;
const isAutumnMid   = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*9  &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*10;
const isAutumnLate  = dayOfYear >= CUT_DAY + DAYS_IN_MONTH*10 &&  dayOfYear < CUT_DAY + DAYS_IN_MONTH*11;

let seasonMoment = 'primeros';

switch(dayOfYear) {
    case isWinterMid:
    case isSpringMid:
    case isSummerMid:
    case isAutumnMid:
        seasonMoment = 'mediados';
        break;

    case isWinterLate:
    case isSpringLate:
    case isSummerLate:
    case isAutumnLate:
        seasonMoment = 'últimos';
        break;
}

let seasonName = 'invierno';

switch(dayOfYear) {
    case isSpringEarly:
    case isSpringMid:
    case isSpringLate:
        seasonName = 'primavera';
        break;

    case isSummerEarly:
    case isSummerMid:
    case isSummerLate:
        seasonName = 'verano';
        break;

    case isAutumnEarly:
    case isAutumnMid:
    case isAutumnLate:
        seasonName = 'otoño';
        break;
}

console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonMoment} de ${seasonName}.`);
