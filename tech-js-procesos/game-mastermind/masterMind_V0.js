const { Console } = require("console-mpds");
const console = new Console();
playMasterMain();

function playMasterMain() {
  do {
    playGame();
  } while (repeatGame());
  console.writeln('Bye! See you next time');
}

function playGame(){
  const POSSIBLE_COLORS = ["🔴", "🟢", "🟡", "⚪", "🟠"];
  const MAX_ROUNDS = 5;
  const MAX_TOKENS = 4;
  let codeFound = false;
  let board = [];
  let boardResults = [];
  const secretCode = getSecretCode();
  for (let i=0;!codeFound && i<MAX_ROUNDS; i++){
    board[i] = getProposedCode();
    boardResults[i]=[];
    codeFound = getRoundResult(board[i],i);
    drawBoard();
    let msg;
    if(codeFound){
      msg =`Congratulation, you have found the secret code in ${i} tries.`;
    }
    else{
      msg = `Oh, you loose!!!! Try again`;
    }
    console.writeln(msg);
  }

function getSecretCode(){
  console.writeln(`Hi CodeMaker, please enter a Secret Code.`);
  showMenu();
  const secretCode = getCode();
  return secretCode;
}

function getProposedCode(){
  console.writeln(`Hi CodeBreaker, please enter a Secret Code.`);
  showMenu();
  const proposedCode = getCode();
  return proposedCode;
}

function getCode(){
  let code=[];
  for (let i=0; i<MAX_TOKENS ; i++){
    //let correctColor;
    code[i] = askColor(i);
   }
   return code;   
}
function getRoundResult(proposedCode, round){
  const NO_MATCH = 0;
  const MATCH = 1;
  const PLACED = 2;
  const resultCode = ['◾','◻️','✅','☑️'];
  let totalPlaced = 0;
  for (let i=0 ; i< MAX_TOKENS ; i++){
    if(proposedCode[i] == secretCode[i]){
        boardResults[round][i] = resultCode[PLACED];
        totalPlaced ++;
   }else{
      let match = false;
      for (let j=0;!match && j<MAX_TOKENS;j++){
        if (proposedCode[i] == secretCode[j]){
          match = true;
        }
      }
      boardResults[round][i] = match ? resultCode[MATCH] : resultCode[NO_MATCH];
   }
  
 }
  return totalPlaced == 4 ? true : false;
}

function drawBoard(){
  console.writeln('********** BOARD *****       ***RESULTS*****');
  for(let i=0; i<MAX_ROUNDS;i++){
    let row = "";
    const TOKEN_EMPTY ='X';
    if(i<board.length){
      for(let color of board[i]){
        row += `-- ${POSSIBLE_COLORS[color]} `;
      }
      row += '-------------------- || ';
      for (let result of boardResults[i]){
        row += `-- ${result} `;
      }
    }else{
      for(j=0; j< MAX_TOKENS; j++){
        row += `--  ${TOKEN_EMPTY} `;
      }
    }
    //row +=' --'
      console.writeln(row);
    
  }
}

function showMenu(){
  console.writeln(`Choice one color:
  1: ${POSSIBLE_COLORS[0]}
  2: ${POSSIBLE_COLORS[1]}
  3: ${POSSIBLE_COLORS[2]}
  4: ${POSSIBLE_COLORS[3]}`);
}

function askColor(boardCol){
  let choice;
  do{
      choice = console.readNumber(`Choise a color for column number ${boardCol + 1} (1-4): `);
  }while(choice < 1 && POSSIBLE_COLORS.length + 1 < choice);
  return choice;
}
}

function repeatGame() {
  let repeat;
  let validResponse;
  do {
      repeat = console.readString("Do you want to play again? (y/n)");
      validResponse = repeat === "y" || repeat === "n";
      if (validResponse) {
          return repeat === "y";
      } else {
          console.writeln("\nPlease, enter a valid response");
      }
  } while (!validResponse);
}