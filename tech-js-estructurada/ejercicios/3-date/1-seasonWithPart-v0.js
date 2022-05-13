const { Console } = require("console-mpds");
const console = new Console();

// 3-date / 1-seasonWithPart / v0

const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = DAYS_IN_MONTH * 12;
const OFFSET_DAYS = 9;

const day = console.readNumber(`Escriba un día (1-30): `);
const month = console.readNumber(`Escriba un mes (1-12): `);
const year = console.readNumber(`Escriba un año (1-...): `);

let dayOfYear = DAYS_IN_MONTH*month + (day+OFFSET_DAYS) - DAYS_IN_MONTH;
dayOfYear = dayOfYear>=DAYS_IN_YEAR ? dayOfYear - DAYS_IN_YEAR : dayOfYear;
const nSeason = ((dayOfYear/360 * 4));
const floorSeason = nSeason | 0;

let seasonTime;
if (nSeason-floorSeason < 1/3) {
    seasonTime = 'primeros';
} else {
    seasonTime = nSeason-floorSeason >= 2/3 ? 'finales' : 'mediados';
}

let seasonName;
if (floorSeason < 2) {
    seasonName = floorSeason === 0 ? 'invierno' : 'primavera';
} else {
    seasonName = floorSeason === 2 ? 'verano' : 'otoño';
}

console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonTime} de ${seasonName}.`);
