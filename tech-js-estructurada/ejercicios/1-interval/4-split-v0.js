const { Console } = require("console-mpds");
const console = new Console();

// 1-interval/4-split-v0

let minInterval = console.readNumber(`Introduce el mínimo del intervalo: `);
let maxInterval;
let range;
let steps;
let newMax;
let result = '';

while (typeof range !== 'number' || range < 0) {
  maxInterval = console.readNumber(`Introduce el máximo del intervalo (superior o igual al mínimo): `);
  range = maxInterval - minInterval;

  if (range < 0) {
    console.writeln(`\n¡Error! El máximo debe ser superior o igual al mínimo`);
  }
}

while (!steps || steps < 0) {
  steps = console.readNumber(`Introduce una cantidad positiva de intervalos: `);

  if (steps <= 0) {
    console.writeln('\n¡Error! La cantidad de intervalos debe ser positiva');
  }
}

const size = range / steps;

for (let i=1; i<=steps; i++) {
    newMax = minInterval + size;
    result += `[${minInterval}, ${newMax}]`;

    if (newMax < maxInterval) {
        i + 1 < steps ? (result += ', ') : (result += ' y ');
        minInterval = newMax;
    }
}

console.writeln(`El intervalo [${minInterval}, ${maxInterval}] dividido en ${steps} intervalo${steps>1?'s':''} son: ${result}`);
