const { Console } = require("console-mpds");
const console = new Console();

playMastermind();

function playMastermind() {
  do {
    const game = initGame();
    game.play();
  } while (isResumed());
}

function initGame() {
  console.writeln(`\n----- MASTERMIND -----\n\n****`);
  let game = {
    COMBINATION_LENGTH: 4,
    COLORS: ["r", "g", "b", "y", "c", "m"],
    MAX_ATTEMPTS: 10,
    secretCombination: "",
    proposedCombinations: [],
    proposedResults: [],
    nAttempt: 0,
    combinationIsFound: false,

    play: function () {
      this.secretCombination = this.generateSecretCombination();
      do {
        this.setProposedCombination();
        this.setProposedResult();
        this.showBoard();
        this.setNextAttempt();
      } while (!this.isGameOver());
    },

    generateSecretCombination: function () {
      let secretCombination = [];
      let j;
      for (let i = 0; i < this.COMBINATION_LENGTH; i++) {
        do {
          j = parseInt(Math.random() * this.COLORS.length);
        } while (isRepeatedColor(this.COLORS[j], secretCombination));
        secretCombination[i] = this.COLORS[j];
      }
      return secretCombination;
    
      function isRepeatedColor(validColor, secretCombinationColors) {
        let isRepeated = false;
        for (let i = 0; i < secretCombinationColors.length; i++) {
          if (validColor === secretCombinationColors[i]) {
            isRepeated = true;
          }
        }
        return isRepeated;
      }
    },

    setProposedCombination: function () {
      let proposedCombination;
      do {
        proposedCombination = console.readString("Propón una combinación:");
      } while (!isValidCombination(proposedCombination, this.COMBINATION_LENGTH, this.COLORS));
      this.proposedCombinations[this.nAttempt] = proposedCombination;

      function isValidCombination(proposedCombination, combinationLength, validcolors) {
        let isValid = true;
        if (proposedCombination.length !== combinationLength) {
          isValid = false;
          console.writeln(`La longitud de la combinación propuesta es incorrecta`);
        } else if (!areValidColors(proposedCombination, validcolors)) {
          isValid = false;
          console.writeln(`Colores incorrectos, deben ser: rgybmc`);
        } else if (hasRepeatedColors(proposedCombination)) {
          isValid = false;
          console.writeln(`La combinación propuesta contiene colores repetidos`);
        }
        return isValid;

        function areValidColors(proposedCombination, validColors) {
          let nValidColors = 0;
          for (const proposedColor of proposedCombination) {
            for (let i = 0; i < validColors.length; i++) {
              if (proposedColor === validColors[i]) {
                nValidColors++;
              }
            }
          }
          return nValidColors === proposedCombination.length;
        }

        function hasRepeatedColors(proposedCombination) {
          let uniqueColors = [];
          for (let color of proposedCombination) {
            if (uniqueColors.indexOf(color) === -1) {
              uniqueColors[uniqueColors.length] = color;
            }
          }
          return uniqueColors.length < proposedCombination.length;
        }
      }
    },

    setProposedResult: function () {
      let proposedCombination = this.proposedCombinations[this.nAttempt];
      let blacks = 0;
      let whites = 0;
      for (let i = 0; i < proposedCombination.length; i++) {
        for (let j = 0; j < proposedCombination.length; j++) {
          if (i === j && proposedCombination[i] === this.secretCombination[j]) {
            blacks++;
          } else if (proposedCombination[i] === this.secretCombination[j]) {
            whites++;
          }
        }
      }
      this.proposedResults[this.nAttempt] = [blacks, whites]; // TODO: convert [blacks, whites] to object
      this.combinationIsFound = this.proposedResults[this.nAttempt][0] === this.COMBINATION_LENGTH;
    },

    showBoard: function () {
      const indexBlacks = 0;
      const indexWhites = 1;
      let msg = `\n${this.nAttempt + 1} intento${this.nAttempt + 1 == 1 ? '' : 's'}:\
                       \n****\n`;
      for (let i = 0; i < this.proposedCombinations.length; i++) {
        msg += `${this.proposedCombinations[i]} --> ${this.proposedResults[i][indexBlacks]} negras y ${this.proposedResults[i][indexWhites]} blancas\n`;
      }
      console.writeln(msg);
    },

    setNextAttempt: function () {
      this.nAttempt++;
    },

    isGameOver: function () {
      return this.combinationIsFound || this.nAttempt >= this.MAX_ATTEMPTS;
    }
  }
  return game;
}

function isResumed() {
  let answer;
  let error;
  do {
    answer = console.readString("Quieres jugar otra vez? (s/n)");
    error = answer !== "s" && answer !== "n";
    if (error) {
      console.writeln("\nPor favor, introduce una respuesta correcta.");
    } else if (answer === "n") {
      console.writeln("\nFin del juego, hasta pronto!");
    }
  } while (error);
  return answer === "s";
}
