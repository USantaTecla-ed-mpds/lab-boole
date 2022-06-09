const { Console } = require("console-mpds");
const console = new Console();


playMastermind();

function playMastermind() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    const COMBINATION_LENGTH = 4;
    const COLORS = ["r", "g", "b", "y", "c", "m"];
    const MAX_ATTEMPTS = 10;
    
    console.writeln(`\n----- MASTERMIND -----\n`);
    const secretCombination = generateSecretCombination(COMBINATION_LENGTH, COLORS);
    let proposedCombinations = [];
    let proposedResults = [];
    let foundCombination = false;
    let nAttempt = 0;

    do {
      proposedCombinations[nAttempt] = getProposedCombination(COLORS, COMBINATION_LENGTH);
      proposedResults[nAttempt] = getProposedResults(proposedCombinations[nAttempt], secretCombination);
      foundCombination = isFoundCombination(proposedResults[nAttempt][0], COMBINATION_LENGTH);      
      showBoard(proposedCombinations, proposedResults, nAttempt);
      nAttempt++;
    } while (!foundCombination && nAttempt < MAX_ATTEMPTS);

    console.writeln(`${foundCombination === true
      ? "\nEnhorabuena has ganado!"
      : "\nLo siento has perdido!"}`);


    function generateSecretCombination(length, validColors) {
      let combination = [];
      let index;
      for (let i = 0; i < length; i++) {
        do {
          index = parseInt(Math.random() * validColors.length);
        } while (isRepeatedColor(validColors[index], combination));
        combination[i] = validColors[index];
      }
      return combination;

      function isRepeatedColor(color, combinationColors) {
        let isRepeated = false;
        for (let i = 0; i < combinationColors.length; i++) {
          if (color === combinationColors[i]) {
            isRepeated = true;
          }
        }
        return isRepeated;
      }
    }

    function getProposedCombination(validColors, combinationLength) {
      let proposedCombination;
      do {
        proposedCombination = console.readString("Propón una combinación:");
      } while (!isValidCombination(proposedCombination, validColors, combinationLength));
      return proposedCombination;

      function isValidCombination(proposedCombination, validColors, combinationLength) {
        let isValid = true;
        if (proposedCombination.length !== combinationLength) {
          isValid = false;
          console.writeln(`La longitud de la combinación propuesta es incorrecta`);
        } else if (!areValidColors(proposedCombination, validColors)) {
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
          let repeatedColors = false;
          for (let i = 0; i < proposedCombination.length; i++) {
            for (let j = 0; j < proposedCombination.length; j++) {
              if (i !== j && proposedCombination[i] === proposedCombination[j]) {
                repeatedColors = true;
              }
            }
          }
          return repeatedColors;
        }
      }
    }

    function getProposedResults(proposedCombination, secretCombination) {
      let blacks = 0;
      let whites = 0;
      for (let i = 0; i < proposedCombination.length; i++) {
        let match = false;
        let j = 0;
        do {
          match = false;
          if (proposedCombination[i] === secretCombination[j]) {
            if (i === j) {
              blacks++;
              match = true;
            } else {
              whites++
            }
          }
          j++;
        } while (!match && j < secretCombination.length);
      }
      return [blacks, whites];
    }

    function isFoundCombination(blacks, combinationLength) {
      return blacks === combinationLength;
    }

    function showBoard(proposedCombination, result, nAttempt) {
      const indexBlacks = 0;
      const indexWhites = 1;
      let msg = `\n${nAttempt + 1} intento${nAttempt + 1 == 1 ? '' : 's'}:\n`;
      for (let i = 0; i < proposedCombination.length; i++) {
        msg += `${proposedCombination[i]} --> ${result[i][indexBlacks]} negras y ${result[i][indexWhites]} blancas\n`;
      }
      console.writeln(msg);
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
