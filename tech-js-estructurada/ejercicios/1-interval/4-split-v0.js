const { Console } = require("console-mpds");
const console = new Console();

// 1-interval/4-split-v0

let minInterval;
let maxInterval;
let isValidInterval = false;
do {
  minInterval = console.readNumber(`Introduce el mínimo del intervalo: `);
  maxInterval = console.readNumber(`Introduce el máximo del intervalo (superior o igual al mínimo): `);
  isValidInterval = maxInterval >= minInterval;
  if (!isValidInterval) {
    console.writeln(`\n¡Error! El máximo debe ser superior o igual al mínimo`);
  }
} while (!isValidInterval);

let steps;
let isValidSteps = false;
do {
  steps = console.readNumber(`Introduce una cantidad positiva de intervalos: `);
  isValidSteps = steps > 0;
  if (!isValidSteps) {
    console.writeln('\n¡Error! La cantidad de intervalos debe ser positiva');
  }
} while (!isValidSteps);

let result = '';
const size = (maxInterval-minInterval) / steps;
for (let i = 0; i < steps; i++) {
    result += `[${minInterval + i*size}, ${minInterval + (i+1)*size}]`;
    result += `${i < steps-2 ? ', ' : (i < steps-1 ? ' y ' : '.')}`;
}

console.writeln(`El intervalo [${minInterval}, ${maxInterval}] dividido en ${steps} intervalo${steps>1?'s':''} son: ${result}`);
