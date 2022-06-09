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
            proposedCombinations[nAttempt] = getProposedCombination();
            proposedResults[nAttempt] = getProposedResults(proposedCombinations[nAttempt],secretCombination);
            showAttempMsg(nAttempt + 1);
            showBoard(proposedCombinations[nAttempt], proposedResults[nAttempt]);
            nAttempt++;
        } while (nAttempt < MAX_ATTEMPTS);


        function getProposedCombination() {
            let proposedCombination = "";
            do {
                proposedCombination = console.readString("Propón una combinación:");
            } while (!isValidCombination(proposedCombination));
            return proposedCombination;

            function isValidCombination(proposedCombination) {
                if (proposedCombination.length !== COMBINATION_LENGTH) {
                    console.writeln(`La longitud de la combinación propuesta es incorrecta`);
                    return false
                }
                if (!isValidColor(proposedCombination)) {
                    console.writeln(`Colores incorrectos, deben ser: rgybmc`);
                    return false
                }
                return true;
            }

            function isValidColor(proposedCombination) {
                let numberOfValids = 0;
                for (const proposedColor of proposedCombination) {
                    for (let i = 0; i < VALID_COLORS.length; i++) {
                        if (proposedColor === VALID_COLORS[i]) {
                            numberOfValids++;
                        }
                    }
                }
                return numberOfValids === COMBINATION_LENGTH;
            }
        }
    }

    function showAttempMsg(nAttempt) {
        console.writeln(`\n${nAttempt} intento (s):`);
    }

    function getSecretCombination(length, validColors) {
        let combination = [];
        let index;
        for (let i = 0; i < length; i++) {
            index = parseInt(Math.random() * validColors.length);
            combination[i] = validColors[index];
        }
        return combination;
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

