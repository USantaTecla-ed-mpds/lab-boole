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
    
    const secretCombination = generateSecretCombination(COMBINATION_LENGTH, COLORS);
    console.writeln(`\n----- MASTERMIND -----\n\n****`);
    let proposedCombinations = [];
    let proposedResults = [];
    let foundCombination = false;
    let nAttempt = 0;
    const MAX_ATTEMPTS = 10;

    do {
      proposedCombinations[nAttempt] = getProposedCombination(COMBINATION_LENGTH, COLORS);
      proposedResults[nAttempt] = getProposedResults(proposedCombinations[nAttempt], secretCombination);
      foundCombination = proposedResults[nAttempt][0] === COMBINATION_LENGTH;      
      showBoard(proposedCombinations, proposedResults, nAttempt);
      nAttempt++;
    } while (!foundCombination && nAttempt < MAX_ATTEMPTS);

    console.writeln(`${foundCombination === true
      ? "\nEnhorabuena has ganado!"
      : "\nLo siento has perdido!"}`);


    function generateSecretCombination(combinationLength, validColors) {
      let combination = [];
      let index;
      for (let i = 0; i < combinationLength; i++) {
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

    function getProposedCombination(combinationLength, validColors) {
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

    function getProposedResults(proposedCombination, secretCombination) {
      let blacks = 0;
      let whites = 0;
      for (let i = 0; i < proposedCombination.length; i++) {
        for (let j = 0; j < proposedCombination.length; j++) {
          if (i === j && proposedCombination[i] === secretCombination[j]) {
              blacks++;
          } else if (proposedCombination[i] === secretCombination[j]) {
              whites++
          }
        }
      }
      return [blacks, whites];
    }

    function showBoard(proposedCombination, result, nAttempt) {
      const indexBlacks = 0;
      const indexWhites = 1;
      let msg = `\n${nAttempt + 1} intento${nAttempt + 1 == 1 ? '' : 's'}:\
                 \n****\n`;
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
