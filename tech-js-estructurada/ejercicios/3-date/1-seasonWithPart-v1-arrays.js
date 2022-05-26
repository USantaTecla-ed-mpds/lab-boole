const { Console } = require("console-mpds");
const console = new Console();

// 3-date / 1-seasonWithPart / v1 - with arrays

const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = 12 * DAYS_IN_MONTH;
const OFFSET_DAYS = 21 + 2*DAYS_IN_MONTH; // 81

day = console.readNumber(`Escriba un día (1-30): `);
month = console.readNumber(`Escriba un mes (1-12): `);
year = console.readNumber(`Escriba un año (1-...): `);

let solarDayOfYear = DAYS_IN_MONTH * (month-1) + day - OFFSET_DAYS;
if (solarDayOfYear < 0)
    solarDayOfYear += DAYS_IN_YEAR;

const seasonPart = (solarDayOfYear % 90) / DAYS_IN_MONTH;
const idSeasonPart = seasonPart - (seasonPart % 1);

const season = solarDayOfYear / 90;
const idSeason = season - (season % 1);

const SEASON_PARTS = ["principios", "mediados", "finales"];
const SEASONS = ["pr1mavera", "verano", "otoño", "invierno"];

console.writeln(`El día ${day} del ${month} del año ${year} cae a ${SEASON_PARTS[idSeasonPart]} de ${SEASONS[idSeason]}.`);
