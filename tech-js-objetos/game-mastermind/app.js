const { Console } = require("console-mpds");
const console = new Console();

const mastermind = initMastermind();
mastermind.start();

function initMastermind() {
  return {
    continueDialog: initYesNoDialog("Quieres jugar de nuevo?"),
    start() {
      do {
        const game = initGame();
        game.play();
        this.continueDialog.read();
      } while (this.continueDialog.isAfirmative());
    },
  };
}
function initGame() {
  let gameSettings = {
    getColors() {
      return "rgbycm";
    },

    getMaxAttemps() {
      return 10;
    },

    getCombinationLength() {
      return 4;
    },

    getRandomColor() {
      return this.getColors()[
        parseInt(Math.random() * this.getColors().length)
      ];
    },
  };

  return {
    play() {
      console.writeln(`----- MASTERMIND -----`);
      const result = initResult(gameSettings);
      const board = initBoard(gameSettings);
      board.secretCombination.setSecretCombination();
      let proposedCombination = initProposedCombination(gameSettings);
      do {
        proposedCombination.read();
        board.addCombination(proposedCombination.getProposedCombination());
        board.getResults();
        board.show();
      } while (!board.isLooser() && !result.isWinner());
      if (result.isWinner()) {
        console.writeln(`Enhorabuena, has ganado!!!!`);
      } else {
        console.writeln(`Lo siento, has perdido!!!!`);
      }
    },
  };
}

function initBoard(gameSettings) {
  let proposedCombinations = [];
  let results = [];
  return {
    secretCombination: initSecretCombination(gameSettings),
    show() {
      let msg;
      for (let i = 0; i < proposedCombinations.length; i++) {
        msg = `\n${i + 1} intento(s):\
                       \n****\n`;
        msg += `${proposedCombinations[i]} --> ${results[i].blacks} negras y ${results[i].whites} blancas\n`;
      }
      console.writeln(msg);
    },

    addCombination(combination) {
      proposedCombinations.push(combination);
    },

    isLooser() {
      return proposedCombinations.length === gameSettings.getMaxAttemps();
    },

    getResults() {
      results.push(this.secretCombination.getResults(proposedCombinations[proposedCombinations.length - 1]));
    },
  };
}

function initSecretCombination(gameSettings) {
  let secretCombination;
  return {
    setSecretCombination() {
      let arrayColors = [];
      let color;
      for (let i = 0; i < gameSettings.getCombinationLength(); i++) {
        do {
          color = gameSettings.getRandomColor();
        } while (this.checkRepeatedColors(color, arrayColors));
        arrayColors[i] = color;
      }
      secretCombination = arrayColors;
    },

    getResults(combination) {
      const result = initResult();
      for (let i = 0; i < combination.length; i++) {
        for (let j = 0; j < secretCombination.length; j++) {
          if (combination[i] === secretCombination[j]) {
            if (i === j) {
              result.blacks++;
            } else {
              result.whites++;
            }
          }
        }
      }
      return result;
    },

    checkRepeatedColors(color, arrayColors) {
      for (let i = 0; i < arrayColors.length; i++) {
        if (arrayColors[i] === color) {
          return true;
        }
      }
      return false;
    },
  };
}

function initProposedCombination(gameSettings) {
  let proposedCombination;
  return {
    read() {
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

    isValidCombination(combination) {
      let isValid = true;
      if (combination.length !== gameSettings.getCombinationLength()) {
        isValid = false;
        console.writeln(
          `La longitud de la combinación propuesta es incorrecta`
        );
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
        valid = this.checkContainsColor(combination[i]);
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
    },

    checkContainsColor(color) {
      for (let i = 0; i < gameSettings.getColors().length; i++) {
        if (gameSettings.getColors()[i] === color) {
          return true;
        }
      }
      return false;
    },
  };
}

function initResult(gameSettings) {
  return {
    blacks: 0,
    whites: 0,

    isWinner() {
      return this.blacks === gameSettings.getCombinationLength();
    },
  };
}

function initYesNoDialog(dialogText) {
  return {
    dialogText: dialogText,
    answer: "",
    read() {
      let error = false;
      do {
        this.answer = console.readString(`${this.dialogText} ("si/no"):`);
        error = !this.isAfirmative() && !this.isNegative();
        if (error) {
          console.writeln(
            `Has introducido una respuesta incorrecta ${this.answer}`
          );
        }
      } while (error);
    },

    isAfirmative() {
      return this.answer === "si";
    },

    isNegative() {
      return this.answer === "no";
    },
  };
}
