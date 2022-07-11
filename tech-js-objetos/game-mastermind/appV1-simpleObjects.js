const { Console } = require("console-mpds");
const console = new Console();

playMastermind();

function playMastermind() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    let game = initGame();
    do {
      setProposedCombination(game);
      setProposedResult(game);
      showBoard(game);
      setNextAttempt(game);
    } while (!isGameOver);

    console.writeln(`${game.combinationIsFound === true
      ? "\nEnhorabuena has ganado!"
      : "\nLo siento has perdido!"}`);
    
    function initGame() {
      console.writeln(`\n----- MASTERMIND -----\n\n****`);
      return {
        COMBINATION_LENGTH: 4,
        COLORS: ["r", "g", "b", "y", "c", "m"],
        MAX_ATTEMPTS: 10,
        SECRET_COMBINATION: generateSecretCombination(this.COMBINATION_LENGTH, this.COLORS),
        proposedCombinations: [],
        proposedResults: [],
        nAttempt: 0,
        combinationIsFound: false,
      }

      function generateSecretCombination(combinationLength, validColors) {
        let secretCombination = [];
        let j;
        for (let i = 0; i < combinationLength; i++) {
          do {
            j = parseInt(Math.random() * validColors.length);
          } while (isRepeatedColor(validColors[j], secretCombination));
          secretCombination[i] = validColors[j];
        }
        return secretCombination;
  
        function isRepeatedColor(color, colorsArray) {
          let isRepeated = false;
          for (let i = 0; i < colorsArray.length; i++) {
            if (color === colorsArray[i]) {
              isRepeated = true;
            }
          }
          return isRepeated;
        }
      }
    }  


    function setProposedCombination(game) {
      let proposedCombination;
      do {
        proposedCombination = console.readString("Propón una combinación:");
      } while (!isValidCombination(proposedCombination, game));
      game.proposedCombinations[game.nAttempt] = proposedCombination;


      function isValidCombination(proposedCombination, game) {
        let isValid = true;
        if (proposedCombination.length !== game.COMBINATION_LENGTH) {
          isValid = false;
          console.writeln(`La longitud de la combinación propuesta es incorrecta`);
        } else if (!areValidColors(proposedCombination, game.COLORS)) {
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
    }

    function setProposedResult(game) {
      let proposedCombination = game.proposedCombinations[game.nAttempt];
      let blacks = 0;
      let whites = 0;
      for (let i = 0; i < proposedCombination.length; i++) {
        for (let j = 0; j < proposedCombination.length; j++) {
          if (i === j && proposedCombination[i] === game.SECRET_COMBINATION[j]) {
              blacks++;
          } else if (proposedCombination[i] === game.SECRET_COMBINATION[j]) {
              whites++
          }
        }
      }
      game.proposedResults[game.nAttempt] = [blacks, whites]; // TODO: convert [blacks, whites] to object
      game.combinationIsFound = game.proposedResults[game.nAttempt][0] === game.COMBINATION_LENGTH;
    }    

    function showBoard(game) {
      const indexBlacks = 0;
      const indexWhites = 1;
      let msg = `\n${game.nAttempt + 1} intento${game.nAttempt + 1 == 1 ? '' : 's'}:\
                 \n****\n`;
      for (let i = 0; i < game.proposedCombinations.length; i++) {
        msg += `${game.proposedCombinations[i]} --> ${game.proposedResults[i][indexBlacks]} negras y \
                ${game.proposedResults[i][indexWhites]} blancas\n`;
      }
      console.writeln(msg);
    }

    function setNextAttempt(game) {
      game.nAttempt++;
    }

    function isGameOver(game) {
      return game.combinationIsFound || game.nAttempt >= game.MAX_ATTEMPTS;
    }
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
}
