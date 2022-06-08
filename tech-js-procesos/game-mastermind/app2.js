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
    const MAX_ATTEMPTS = 5;

    console.writeln(`\n----- MASTERMIND -----\n\n`);
    const secretCombination = getSecretCombination(
      COMBINATION_LENGTH,
      VALID_COLORS
    );
    let nAttempt = 0;
    showAttempMsg(nAttempt);
    let proposedCombinations = [];
    let proposedResults = [];
    let isBrokensecretCombination = false;
    do {
      
      proposedCombinations[nAttempt] = getProposedCombination(
        COMBINATION_LENGTH,
        VALID_COLORS
      );
      proposedResults[nAttempt] = getProposedResults(
        proposedCombinations[nAttempt],
        secretCombination
      );
      
    showAttempMsg(nAttempt+1);
      showBoard(proposedCombinations[nAttempt], proposedResults[nAttempt]);
      nAttempt++;
    } while (nAttempt < MAX_ATTEMPTS);
  }

  function showAttempMsg(nAttempt) {
    console.writeln(`\n${nAttempt} intento (s):`);
  }

  function getSecretCombination(lenght, validColors) {
    return "rgby";
  }

  function getProposedCombination(combinationLenght, validColors) {
    let proposedCombination = "";
    let isValidCombination, isValidLength;
    do {
      proposedCombination = console.readString("Propón una combinación:");
      isValidCombination = isValidColor(validColors, proposedCombination);
      isValidLength = proposedCombination.length === combinationLenght;
      if (!isValidLength) {
        console.writeln(
          `La longitud de la combinación propuesta es incorrecta`
        );
      } else if (!isValidCombination) {
        console.writeln(`Colores incorrectos, deben ser: rgybmc`);
      }
    } while (!isValidLength || !isValidCombination);
    return proposedCombination;

      function isValidColor(validColors, proposedCombination) {
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
      for (let j = 0; !match && j < secretCombination.length; j++) {
        if (proposedCombination[i] === secretCombination[j]) {
          match = true;
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

  function showBoard(proposedCombination, result) {
    const blanksIndex = 0;
    const whiteIndex = 1;
    console.writeln(
      `${proposedCombination} --> ${result[blanksIndex]} blanks and ${result[whiteIndex]} whites`
    );
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
