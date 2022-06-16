const { Console } = require("console-mpds");
const console = new Console();


playTicTacToe();

function playTicTacToe() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    const GAME_MODE = askGameMode();
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
      showBoard(tokens);
      getPlaceTokenFunction(GAME_MODE, turn)(tokens, turn);
      winner = isTicTacToe(tokens, turn);
      if (!winner) {
        turn = nextTurn(turn);
      }
    } while (!winner);
    
    showBoard(tokens);
    console.writeln(`Victoria para las fichas ${getActiveToken(turn)}`);


    function askGameMode() {
      const GAME_MODE_NAMES = ["Jugador contra Jugador", "Jugador contra Computador", "Computador contra Computador"];
      let msg = (`\n----- TIC TAC TOE -----\ \n\nMODOS DE JUEGO`);
      for (let i = 0; i < GAME_MODE_NAMES.length; i++) {
        msg += `\n${i}. ${GAME_MODE_NAMES[i-1]}`;
      }
      console.writeln(msg);
      return console.readNumber(`Elige un modo de juego (1, 2 o 3): `) - 1;
    }

    function showBoard(tokens) {
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

    function getPlaceTokenFunction(gameModeId, turn) {
      const PLACE_TOKEN_FUNCTIONS = [placeTokenPlayer, placeTokenComputer];
      return PLACE_TOKEN_FUNCTIONS[getPlaceTokenFunctionIndex(gameModeId, turn)];

      function getPlaceTokenFunctionIndex(gameModeId, turn) {
        const PLAYER = 0;
        const COMPUTER = 1;
        const INDEX_BY_MODE_AND_PLAYER = [[PLAYER, PLAYER], [PLAYER, COMPUTER], [COMPUTER, COMPUTER]];
        return INDEX_BY_MODE_AND_PLAYER[gameModeId][turn];
      }

      function placeTokenPlayer(tokens, turn) {
        console.writeln(`Turno para las fichas ${getActiveToken(turn)}`);
        let wrongToken;
        let originRow;
        let originColumn;
        const allTokensPlaced = getPlacedTokens(tokens) === MAX_PLAYERS * MAX_TOKENS_PER_PLAYER;

        if (allTokensPlaced) {
          console.writeln(`No tienes más fichas. Elige que ficha quieres mover.`);
          do {
            originRow = read(`Fila origen`);
            originColumn = read(`Columna origen`);
            wrongToken = !isTokenOfActiveTurn(tokens, originRow, originColumn, turn);
            if (wrongToken) {
              console.writeln(`En esta celda no hay fichas de ${getActiveToken(turn)}`);
            }
          } while (wrongToken);
        }

        let fullCell;
        let targetRow;
        let targetColumn;
        do {
          targetRow = read(`Fila destino`);
          targetColumn = read(`Columna destino`);
          fullCell = isFullCell(tokens, targetRow, targetColumn);
          if (fullCell) {
            console.writeln(`Indique una celda vacía`);
          }
        } while (fullCell);
        
        if (allTokensPlaced) {
          tokens[originRow][originColumn] = EMPTY_TOKEN;
        }
        tokens[targetRow][targetColumn] = getActiveToken(turn);
      }

      function placeTokenComputer(tokens, turn) {
        console.writeln(`Turno de la computadora`);
        let wrongToken;
        let originRow;
        let originColumn;
        const allTokensPlaced = getPlacedTokens(tokens) === MAX_PLAYERS * MAX_TOKENS_PER_PLAYER;

        if (allTokensPlaced) {
          do {
            originRow = generateRandomPosition();
            originColumn = generateRandomPosition();
          } while (wrongToken);
        }

        let fullCell;
        let targetRow;
        let targetColumn;
        do {
          targetRow = generateRandomPosition();
          targetColumn = generateRandomPosition();
          fullCell = isFullCell(tokens, targetRow, targetColumn);
        } while (fullCell);
        
        if (allTokensPlaced) {
          tokens[originRow][originColumn] = EMPTY_TOKEN;
        }
        tokens[targetRow][targetColumn] = getActiveToken(turn);

        function generateRandomPosition() {
          return parseInt(Math.random() * MAX_TOKENS_PER_PLAYER);
        }
      }
    }
    
    function getPlacedTokens(tokens) {
      let empties = 0;
      for (let row of tokens) {
        for (let token of row) {
          if (token === EMPTY_TOKEN) {
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

    function isFullCell(tokens, row, column) {
      return tokens[row][column] !== EMPTY_TOKEN;
    }

    function getActiveToken(turn) {
      const TOKEN_X = `X`;
      const TOKEN_Y = `Y`;
      return turn === 0 ? TOKEN_X : TOKEN_Y;
    }

    function nextTurn(turn) {
      return (turn + 1) % MAX_PLAYERS;
    }

    function isTokenOfActiveTurn(tokens, row, column, turn) {
      return tokens[row][column] === getActiveToken(turn);
    }

    function isTicTacToe(tokens, turn) {
      let tokensInRow = [0, 0, 0];
      let tokensInColumn = [0, 0, 0];
      let tokensInDiagonal = 0;
      let tokensInDiagonalInverse = 0;
      for (let i = 0; i < tokens.length; i++) {
        for (let j = 0; j < tokens[i].length; j++) {
          if (tokens[i][j] === getActiveToken(turn)) {
            tokensInRow[i]++;
            tokensInColumn[j]++;
            if (i - j === 0) {
              tokensInDiagonal++;
            }
            if (i + j === MAX_TOKENS_PER_PLAYER - 1) {
              tokensInDiagonalInverse++;
            }
          }
        }
      }
      if (tokensInDiagonal === MAX_TOKENS_PER_PLAYER || tokensInDiagonalInverse === MAX_TOKENS_PER_PLAYER) {
        return true;
      }
      for (let i = 0; i < tokensInRow.length; i++) {
        if (tokensInRow[i] === MAX_TOKENS_PER_PLAYER) {
          return true;
        }
        if (tokensInColumn[i] === MAX_TOKENS_PER_PLAYER) {
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