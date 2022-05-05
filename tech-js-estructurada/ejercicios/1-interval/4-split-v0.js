const { Console } = require("console-mpds");
const console = new Console();


// 1-interval/4-split-v0
let minInterval;
let maxInterval;
let amount;
let msg;
while(maxInterval < minInterval || maxInterval === undefined){
    if(maxInterval < minInterval){
        console.writeln(`Error!!! El máximo debe ser superior o igual al máximo`);
    }
    minInterval = console.readNumber(`Introduce el mínimo del intervalo: `);
    maxInterval = console.readNumber(`Introduce el máximo del intervalo (superior\
 o igual al mínimo): `);
}

while(amount <=0 || amount === undefined){
    if(amount <= 0){
        console.writeln('Error!!! La cantidad debe ser positiva');
    }
    amount = console.readNumber(`Introduce una cantidad positiva de intervalos: `);
}
msg = `El intervalo [${minInterval},${maxInterval}] dividido en ${amount}\
 intervalos son )`;
const length = (maxInterval - minInterval)/amount;
let newMaxInterval;
for(i=1;i<=amount;i++){
    newMaxInterval = minInterval + length;
    msg += `[${minInterval},${newMaxInterval}]`;
    if(newMaxInterval < maxInterval){
        i+1 < amount ? msg +=', ' : msg+=' y ';
        minInterval = newMaxInterval;
    }
}
console.writeln(msg);