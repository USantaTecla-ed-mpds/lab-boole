const { Console } = require("console-mpds");
const console = new Console();

// 3-date / 1-seasonWithPart / v0

const DAYS_IN_MONTH = 30;
let day = 0;
do {
    day = console.readNumber(`Escriba un día (1-30): `);
} while (0 >= day || day > DAYS_IN_MONTH);

let month = 0;
do {
    month = console.readNumber(`Escriba un mes (1-12): `);
} while (0 >= month || month > 12);

let year = 0;
do {
    year = console.readNumber(`Escriba un año (1-...): `);
} while (1 > year);

const DAYS_IN_YEAR = DAYS_IN_MONTH * 12;
const OFFSET_DAYS = 80;
const dayOfYear = DAYS_IN_MONTH * (month-1) + day;
let offsetDayOfYear = dayOfYear - (OFFSET_DAYS % DAYS_IN_YEAR);
if (offsetDayOfYear <= 0) {
    offsetDayOfYear += DAYS_IN_YEAR;
}

const SEASON_PARTS = ["principios", "mediados", "finales"];
let seasonPart = offsetDayOfYear % 90;
if (seasonPart === 0) {
    seasonPart = 90;
}
let isSeasonPart;
let message = `El día ${day} del ${month} del año ${year} cae a `;

for (let i = 0; i < SEASON_PARTS.length; i++) {
    isSeasonPart = i*DAYS_IN_MONTH < seasonPart && seasonPart <= (i+1)*DAYS_IN_MONTH;
    if (isSeasonPart) {
        message += `${SEASON_PARTS[i]} `;
    }
}

const SEASONS = ["primavera", "verano", "otoño", "invierno"];
const seasonNumber = offsetDayOfYear / 90;
let isSeason;

for (let i = 0; i < SEASONS.length; i++) {
    isSeason = i < seasonNumber && seasonNumber <= i + 1;
    if (isSeason) {
        message += `de ${SEASONS[i]}.`;
    }
}

console.writeln(message);
