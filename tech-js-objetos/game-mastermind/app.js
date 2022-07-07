const { Console } = require("console-mpds");
const console = new Console();
let masterMind = initMasterMain();
masterMind.start();

function initMasterMain() {
    return {
        continueDialog: initYesNoDialog('Quieres jugar de nuevo?'),
        start() {
            do {
                const game = initGame();
                game.play();
                this.continueDialog.read();
            } while (this.continueDialog.isAfirmative());
        }
    }
}
function initGame() {
    let gameSettings = {
        getColors() {
            return'rgbycm';
        },

        getMaxAttemps() {
            return 10;
        },

        getCombinationLength() {
            return 4;
        },

        getRandomColor() {
            return this.getColors()[parseInt(Math.random() * this.getColors().length)];
        },

        checkRepeatedColors(color, arrayColors) {
            for (let i = 0; i < arrayColors.length; i++) {
                if (arrayColors[i] === color) {
                    return true;
                }
            }
            return false;
        },
        
        containsColor(color) {
            for (let i = 0; i < this.getColors().length; i++) {
                if (this.getColors()[i] === color) {

                    return true;
                }
            }
            return false;
        },

        isGameOver(proposedAttemps) {
            return proposedAttemps === this.getMaxAttemps();
        }
    }

    return {
        play: function () {
            console.writeln(`----- MASTERMIND -----`);
            const board = initBoard(gameSettings);
            board.setSecretCombination();
            let proposedCombination = initProposedCombination(gameSettings);
            do {
                proposedCombination.read();
                board.addCombination(proposedCombination.getProposedCombination());
                board.getResults();
                board.show();
            } while (!gameSettings.isGameOver(board.getProposedAttemps()) && !board.isWinner())
            if (board.isWinner()) {
                console.writeln(`Enhorabuena, has ganado!!!!`);
            } else {
                console.writeln(`Lo siento, has perdido!!!!`);
            }
        }
    }
}

function initBoard(gameSettings) {
    let proposedCombinations = [];
    let results = [];
    return {
        secretCombination: initSecretCombination(gameSettings),
        setSecretCombination() {
            this.secretCombination.setSecretCombination();
        },
        show() {
            for (let i = 0; i < proposedCombinations.length; i++) {
                console.writeln(`\n${i + 1} intentos(s):`);
                console.writeln(`${proposedCombinations[i]}---->${results[i][0]} blacks + ${results[i][1]} whites`);
            }
        },

        addCombination(combination) {
            proposedCombinations.push(combination);
        },

        showCombination: function (combination) {
            console.writeln(combination)
        },

        getProposedAttemps() {
            return proposedCombinations.length;
        },

        getResults() {
            results.push(this.secretCombination.getResults(proposedCombinations[this.getProposedAttemps() - 1]));
        },

        isWinner() {
            return results[results.length - 1][0] === gameSettings.getCombinationLength();
        }
    }
}

function initSecretCombination(gameSettings) {
    let secretCombination;
    return {
        setSecretCombination: function () {
            let arrayColors = [];
            let color;
            for (let i = 0; i < gameSettings.getCombinationLength(); i++) {
                do {
                    color = gameSettings.getRandomColor();
                } while (gameSettings.checkRepeatedColors(color, arrayColors));
                arrayColors[i] = color;
            }
            secretCombination = arrayColors;
        },
        getResults(combination) {
            let blacks = 0;
            let whites = 0;
            for (let i = 0; i < combination.length; i++) {
                for (let j = 0; j < secretCombination.length; j++) {
                    if (combination[i] === secretCombination[j]) {
                        if (i === j) {
                            blacks++;
                        } else {
                            whites++;
                        }
                    }
                }
            }
            return [blacks, whites];

        }
    }
}

function initProposedCombination(gameSettings) {
    let proposedCombination;
    return {
        read: function () {
            let combination;
            do {
                combination = console.readString(`Propón una combinación: `);
            } while (!this.isValidCombination(combination));
            this.setProposedCombination(combination);
        },

        setProposedCombination(combination) {
            proposedCombination = combination;
        },

        getProposedCombination() {
            return proposedCombination;
        },

        isValidCombination: function (combination) {
            let isValid = true;
            if (combination.length !== gameSettings.getCombinationLength()) {
                isValid = false;
                console.writeln(`La longitud de la combinación propuesta es incorrecta`);
            } else if (!this.isValidColors(combination)) {
                isValid = false;
                console.writeln(`Colores incorrectos, deben ser: rgybmc`);
            } else if (this.checkRepeatedColors(combination)) {
                isValid = false;
                console.writeln(`La combinación propuesta contiene colores repetidos`);
            }
            return isValid;
        },

        isValidColors(combination) {
            let valid = true;
            for (let i = 0; valid && i < combination.length; i++) {
                valid = gameSettings.containsColor(combination[i])
            }
            return valid;
        },
        checkRepeatedColors(combination) {
            let repeated = false;
            for (let i = 0; !repeated && i < combination.length; i++) {
                for (let j = i + 1; !repeated && j < combination.length; j++) {
                    repeated = combination[j] === combination[i];
                }
            }
            return repeated;
        }
    }
}

function initYesNoDialog(dialogText) {
    return {
        dialogText: dialogText,
        answer: '',
        read: function () {
            let error = false;
            do {
                this.answer = console.readString(`${this.dialogText} ("si/no"):`);
                error = !this.isAfirmative() && !this.isNegative();
                if (error) {
                    console.writeln(`Has introducido una respuesta incorrecta ${this.answer}`);
                }
            } while (error);
        },

        isAfirmative: function () {
            return this.answer === 'si';
        },

        isNegative: function () {
            return this.answer === 'no';
        }
    }
}


