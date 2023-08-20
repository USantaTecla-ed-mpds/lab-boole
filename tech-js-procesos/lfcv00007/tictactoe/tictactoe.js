const { Console } = require('console-mpds');
const console = new Console();

startTicTacToe();

function startTicTacToe() {
    const MAX_TOKENS = 3;
    do {
        const gameMode = selectPlayersMode();
        playTicTacToe(gameMode);
    } while (isResumed() === true);

    function selectPlayersMode() {
        const modeCombinations = [
            [playAsHuman, playAsHuman],
            [playAsHuman, playAsComputer],
            [playAsComputer, playAsComputer],
        ];
        let userInput;
        do {
            userInput = console.readNumber(`Selecciona el modo de juego:\n 1 - Jugador VS Jugador\n 2 - Jugador VS Ordenador\n 3 - Ordenador VS Ordenador\n`);
        } while (userInput !== 1 && userInput !== 2 && userInput !== 3);
        console.writeln(`--- TIC TAC TOE ---`);
        return modeCombinations[userInput - 1];

        function playAsHuman(message) {
            const row = console.readNumber(`Fila ${message}:  `);
            const column = console.readNumber(`Columna ${message}:  `);
            return [row - 1, column - 1];
        }

        function playAsComputer() {
            return [parseInt(Math.random() * MAX_TOKENS), parseInt(Math.random() * MAX_TOKENS)];
        }
    }

    function playTicTacToe(players) {
        const TOKENS = ['X', 'Y'];
        const EMPTY_TOKEN = ' ';
        let gameBoard = [
            [EMPTY_TOKEN, EMPTY_TOKEN, EMPTY_TOKEN],
            [EMPTY_TOKEN, EMPTY_TOKEN, EMPTY_TOKEN],
            [EMPTY_TOKEN, EMPTY_TOKEN, EMPTY_TOKEN],
        ];
        let winner = false;
        let turn = 0;
        do {
            printBoard(gameBoard);
            placeToken(gameBoard, TOKENS[getActivePlayer(turn)], players[getActivePlayer(turn)]);
            if (isTicTacToe(gameBoard, turn)) {
                winner = true;
            } else {
                turn++;
            }
        } while (winner === false);
        printBoard(gameBoard);
        console.writeln(`Victoria para el jugador ${TOKENS[getActivePlayer(turn)]}!`)

        function printBoard(gameBoard) {
            console.writeln(`-------------`);
            for (let i = 0; i < gameBoard.length; i++) {
                for (let j = 0; j < gameBoard[i].length; j++) {
                    console.write(`| ${gameBoard[i][j]} `);
                }
                console.write(`|\n-------------\n`);
            }
        }

        function placeToken(gameBoard, token, player) {
            console.writeln(`Turno ${turn + 1} para: ${token}`);
            let destinationPosition, originPosition;
            let validInput = false;
            if (isAllPlayerTokensUsed(gameBoard, token) === true) {
                while (validInput == false) {
                    originPosition = player('origen');
                    if (isValidPosition(originPosition) && isValidToken(gameBoard, originPosition, token)) {
                        validInput = true;
                    }
                }
                setToken(gameBoard, originPosition[0], originPosition[1], EMPTY_TOKEN);
            }
            validInput = false;
            while (validInput === false) {
                destinationPosition = player('destino');
                if (isValidPosition(destinationPosition) && isPositionEmpty(gameBoard, destinationPosition, token)) {
                    validInput = true;
                }
            }
            setToken(gameBoard, destinationPosition[0], destinationPosition[1], token);

            function isValidPosition(position) {
                if (position[0] < 0 || position[0] > MAX_TOKENS) return false;
                if (position[1] < 0 || position[1] > MAX_TOKENS) return false;
                return true;
            }

            function isValidToken(gameBoard, originposition, token) {
                return gameBoard[originposition[0]][originposition[1]] === token ? true : false;
            }

            function isPositionEmpty(gameBoard, position) {
                return gameBoard[position[0]][position[1]] === EMPTY_TOKEN ? true : false;
            }

            function setToken(gameBoard, row, column, token) {
                gameBoard[row][column] = token;
            }
        }

        function isTicTacToe(tokens, turn) {
            let countRows = [0, 0, 0];
            let countColumns = [0, 0, 0];
            let countDiagonal = 0;
            let countInverse = 0;
            for (let i = 0; i < tokens.length; i++) {
                for (let j = 0; j < tokens[i].length; j++) {
                    if (tokens[i][j] === TOKENS[getActivePlayer(turn)]) {
                        countRows[i]++;
                        countColumns[j]++;
                        if (i - j === 0) {
                            countDiagonal++;
                        }
                        if (i + j === MAX_TOKENS - 1) {
                            countInverse++;
                        }
                    }
                }
            }
            if (countDiagonal === MAX_TOKENS || countInverse === MAX_TOKENS) {
                return true;
            }
            for (let i = 0; i < countRows.length; i++) {
                if (countRows[i] === MAX_TOKENS) {
                    return true;
                }
                if (countColumns[i] === MAX_TOKENS) {
                    return true;
                }
            }
            return false;
        }

        function getActivePlayer(turn) {
            return turn % 2 === 0 ? 0 : 1;
        }
    }

    function isAllPlayerTokensUsed(gameBoard, token) {
        let counter = 0;
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                if (gameBoard[i][j] === token) {
                    counter++;
                }
            }
        }
        return counter === 3 ? true : false;
    }

    function isResumed() {
        const userInput = console.readString(`¿Quieres jugar otra partida? (s/n) `);
        return userInput !== 's' && userInput !== 'n' ? true : userInput === 'n' ? false : true;
    }
}