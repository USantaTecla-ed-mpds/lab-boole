const { Console } = require("console-mpds");
const console = new Console();

// process oriented programming

playMastermind();

function playMastermind() {
  do {
    playGame();
  } while (isResumed());

  function playGame() {
    const COMBINATION_LENGTH = 4;
    const VALID_COLORS = ["r", "g", "b", "y", "c", "m"];
    const MAX_ATTEMPTS = 10;

    console.writeln(`\n----- MASTERMIND -----\n\n`);
    //const secretCombination = getSecretCombination(COMBINATION_LENGTH,VALID_COLORS);
    const secretCombination = "rrrr";
    let nAttempt = 0;
    showAttempMsg(nAttempt);
    let proposedCombinations = [];
    let proposedResults = [];
    let foundCombination = false;
    do {
      proposedCombinations[nAttempt] = getProposedCombination(
        VALID_COLORS,
        COMBINATION_LENGTH
      );
      proposedResults[nAttempt] = getProposedResults(
        proposedCombinations[nAttempt],
        secretCombination
      );
      foundCombination = isFoundCombination(
        proposedResults[nAttempt],
        COMBINATION_LENGTH
      );
      showAttempMsg(nAttempt + 1);
      showBoard(proposedCombinations, proposedResults);
      nAttempt++;
    } while (!foundCombination && nAttempt < MAX_ATTEMPTS);

    console.writeln(
      `${
        foundCombination === true
          ? "\nEnhorabuena has ganado!"
          : "\nLo siento has perdido!"
      }`
    );
    function getSecretCombination(length, validColors) {
      let combination = [];
      let index;
      for (let i = 0; i < length; i++) {
        index = parseInt(Math.random() * validColors.length);
        combination[i] = validColors[index];
      }
      return combination;
    }

    function showAttempMsg(nAttempt) {
      console.writeln(`\n${nAttempt} intento (s):`);
    }

    function getProposedCombination(validColors, combinationLength) {
      let proposedCombination = "";
      do {
        proposedCombination = console.readString("Propón una combinación:");
      } while (
        !isValidCombination(proposedCombination, validColors, combinationLength)
      );
      return proposedCombination;

      function isValidCombination(
        proposedCombination,
        validColors,
        combinationLength
      ) {
        let valid = true;
        if (proposedCombination.length !== combinationLength) {
          console.writeln(
            `La longitud de la combinación propuesta es incorrecta`
          );
          valid = false;
        } else if (!isValidColor(proposedCombination, validColors)) {
          console.writeln(`Colores incorrectos, deben ser: rgybmc`);
          valid = false;
        }
        return valid;
      }

      function isValidColor(proposedCombination, validColors) {
        let numberOfValids = 0;
        for (const proposedColor of proposedCombination) {
          for (let i = 0; i < validColors.length; i++) {
            if (proposedColor === validColors[i]) {
              numberOfValids++;
            }
          }
        }
        return numberOfValids === proposedCombination.length;
      }
    }

    function getProposedResults(proposedCombination, secretCombination) {
      let blacks = 0;
      let whites = 0;

      for (let i = 0; i < proposedCombination.length; i++) {
        let match = false;
        let foundBlack = false;
        let foundWhite = false;
        for (let j = 0; !match && j < secretCombination.length; j++) {
          match = false;
          if (proposedCombination[i] === secretCombination[j]) {
            if (i === j) {
              foundBlack = true;
              match = true;
            } else {
              foundWhite = true;
            }
          }
        }
        if (foundBlack) {
          blacks++;
        } else if (foundWhite) {
          whites++;
        }
      }
      return [blacks, whites];
    }

    function isFoundCombination(proposedResults, combinationLength) {
      return proposedResults[0] === combinationLength;
    }

    function showBoard(proposedCombination, result) {
      const blanksIndex = 0;
      const whiteIndex = 1;
      for (let i = 0; i< proposedCombination.length; i++) {
        console.writeln(`${proposedCombination[i]} --> ${result[i][blanksIndex]} negras y ${result[i][whiteIndex]} blancas`)
      }
     
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
