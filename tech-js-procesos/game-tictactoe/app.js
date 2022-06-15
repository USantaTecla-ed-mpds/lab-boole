const { Console } = require("console-mpds");
const console = new Console();


playTicTacToe();

function playTicTacToe() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    const MAX_PLAYERS = 2;
    const MAX_TOKENS_PER_PLAYER = 3;
    const EMPTY_TOKEN = " ";
    let tokens = [
      [EMPTY_TOKEN, EMPTY_TOKEN, EMPTY_TOKEN],
      [EMPTY_TOKEN, EMPTY_TOKEN, EMPTY_TOKEN],
      [EMPTY_TOKEN, EMPTY_TOKEN, EMPTY_TOKEN]
    ];
    let turn = 0;
    let winner;
    do {
      writelnTokens(tokens);
      placeToken(tokens, turn);
      winner = isTicTacToe(tokens, turn);
      if (!winner) {
        turn = nextTurn(turn);
      }
    } while (!winner);
    writelnTokens(tokens);
    function writelnTokens(tokens) {
      const HORIZONTAL_SEPARATOR = `-------------`;
      const VERTICAL_SEPARATOR = `|`;
      let msg = ``;
      for (let row of tokens) {
        msg += `${HORIZONTAL_SEPARATOR}\n`;
        for (let token of row) {
          msg += `${VERTICAL_SEPARATOR} ${token} `;
        }
        msg += `${VERTICAL_SEPARATOR}\n`;
      }
      msg += HORIZONTAL_SEPARATOR;
      console.writeln(msg);
    }

    function placeToken(tokens, turn) {
      console.writeln(`Turno para ${getToken(turn)}`);
      let error;
      let originRow;
      let originColumn;
      const movement = getNumTokens(tokens) === MAX_PLAYERS * MAX_TOKENS_PER_PLAYER;
      if (movement) {
        do {
          originRow = read(`Fila origen`);
          originColumn = read(`Columna destino`);
          error = !isOccupied(tokens, originRow, originColumn, turn);
          if (error) {
            console.writeln(`No hay una ficha de la propiedad de ${getToken(turn)}`);
          }
        } while (error);
      }
      let targetRow;
      let targetColumn;
      do {
        targetRow = read(`Fila destino`);
        targetColumn = read(`Columna destino`);
        error = !isEmpty(tokens, targetRow, targetColumn);
        if (error) {
          console.writeln(`Indique una celda vacía`);
        }
      } while (error);
      if (movement) {
        tokens[originRow][originColumn] = EMPTY_TOKEN;
      }
      tokens[targetRow][targetColumn] = getToken(turn);
    }
    
    function getNumTokens(tokens) {
      let empties = 0;
      for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
          if (tokens[i][j] === TOKEN_EMPTY) {
            empties++;
          }
        }
      }
      return MAX_TOKENS_PER_PLAYER ** 2 - empties;
    }

    function read(title) {
      let position;
      let error;
      do {
        position = console.readNumber(`${title}: `);
        error = position < 1 || 3 < position;
        if (error) {
          console.writeln(`Por favor un numero entre 1 y ${MAX_TOKENS_PER_PLAYER} inclusives`)
        }
      } while (error);
      return position - 1;
    }

    function isEmpty(tokens, row, column) {
      return tokens[row][column] === EMPTY_TOKEN;
    }

    function getToken(turn) {
      const TOKEN_X = `X`;
      const TOKEN_Y = `Y`;
      return turn === 0 ? TOKEN_X : TOKEN_Y;
    }

    function nextTurn(turn) {
      return (turn + 1) % MAX_PLAYERS;
    }

    function isOccupied(tokens, row, column, turn) {
      return tokens[row][column] === getToken(turn);
    }

    function isTicTacToe(tokens, turn) {
      let countRows = [0, 0, 0];
      let countColumns = [0, 0, 0];
      let countDiagonal = 0;
      let countInverse = 0;
      for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
          if (tokens[i][j] === getToken(turn)) {
            countRows[i]++;
            countColumns[j]++;
            if (i - j === 0) {
              countDiagonal++;
            }
            if (i + j === MAX_TOKENS_PER_PLAYER - 1) {
              countInverse++;
            }
          }
        }
      }
      if (countDiagonal === MAX_TOKENS_PER_PLAYER || countInverse === MAX_TOKENS_PER_PLAYER) {
        return true;
      }
      for (let i = 0; i < countRows.length; i++) {
        if (countRows[i] === MAX_TOKENS_PER_PLAYER) {
          return true;
        }
        if (countColumns[i] === MAX_TOKENS_PER_PLAYER) {
          return true;
        }
      }
      return false;
    }

  }

  function isResumed() {
    let answer;
    let error;
    do {
      answer = console.readString(`¿Quieres jugar otra partida? (s/n)`);
      error = answer !== "s" && answer !== "n";
      if (error) {
        console.writeln(`\nPor favor, responda "si" o "no".`);
      }
    } while (error);
    return answer === "s";
  }
}