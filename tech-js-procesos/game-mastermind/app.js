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
        
        welcomeMakerMsg(COMBINATION_LENGTH, VALID_COLORS);
        const secretCombination = getCombination(COMBINATION_LENGTH, VALID_COLORS, "Secret");
        welcomeBreakerMsg(COMBINATION_LENGTH, VALID_COLORS, MAX_ATTEMPTS);
        let proposedCombinations = [];
        let proposedCombinationsResults = [];
        let nAttempt = 0;
        let isBrokenSecretCode = false;
        let gameFinished = false;
        do {
            proposedCombinations[nAttempt] = getCombination(COMBINATION_LENGTH, VALID_COLORS, "Proposed");
            proposedCombinationsResults[nAttempt] = checkCombination(proposedCombinations[nAttempt], secretCombination);
            showBoard(proposedCombinations, proposedCombinationsResults, nAttempt);
            gameFinished = isBrokenSecretCode || MAX_ATTEMPTS === nAttempt+1;
            nAttempt++;
        } while (!gameFinished);
        exitMsg(isBrokenSecretCode);


        function welcomeMakerMsg(combinationLength, validColors) {
            console.writeln(`\n----- MASTERMIND -----\
            \n\nHi CodeMaker, please enter a Secret Combination with only ${combinationLength} colors.\
            \nThe valid colors are: [${validColors}]. You can not repeat any of them.\n`);
        }

        function getCombination(combinationLength, validColors, combinationType) {
            let combination = [];
            console.writeln(`Propose a combination:`);
            for (let i = 0; i < combinationLength; i++) {
                combination[i] = askColor(i, validColors, combinationType, combination);
            }
            return combination;

            function askColor(i, validColors, combinationType, combination) {
                let color = "";
                let isValid, isUnique;
                do {
                    color = console.readString(`- Enter ${combinationType} color ${i + 1}: `);
                    isValid = isValidColor(color, validColors);
                    isUnique = isUniqueColor(color, combination);
                    if (!isValid) {
                        console.writeln(`\nWrong color, they must be: [${validColors}]`);
                    } else if (!isUnique) {
                        console.writeln(`\nUpsss, you can not repeat any of them.`);
                    }
                } while (!isValid || !isUnique);
                return color;
            }

            function isValidColor(color, validColors) {
                let isValid = false;
                for (let validColor of validColors) {
                    if (validColor === color) {
                        isValid = true;
                    }
                }
                return isValid;
            }

            function isUniqueColor(color, combinationColors) {
                let isUnique = true;
                for (let combinationColor of combinationColors) {
                    if (combinationColor === color) {
                        isUnique = false;
                    }
                }
                return isUnique;
            }
        }

        function welcomeBreakerMsg(combinationLength, validColors, maxAttempts) {
            console.writeln(`\n\n\n\nHi CodeBreaker, please enter a Proposed Combination with only ${combinationLength} colors.\
            \nThe valid colors are: [${validColors}]. You can not repeat any of them and you have ${maxAttempts} attempts.\
            \nGood Luck!\n`);
        }
        
        function checkCombination(proposedCombination, secretCombination) {
            let whites = 0;
            let blacks = getBlacks(proposedCombination, secretCombination);
            if (blacks === secretCombination.length) {
                isBrokenSecretCode = true;
            } else {
                whites = getWhites(proposedCombination, secretCombination, blacks);
            }
            return `${blacks} blacks and ${whites} whites`;

            function getBlacks(proposedCombination, secretCombination) {
                let result = 0;
                for (let i = 0; i < proposedCombination.length; i++) {
                    if (proposedCombination[i] === secretCombination[i]) {
                        result++;
                    }
                }
                return result;
            }

            function getWhites(proposedCombination, secretCombination, blacks) {
                let result = 0;
                for (let i = 0; i < proposedCombination.length; i++) {
                    for (let j = 0; j < secretCombination.length; j++) {
                        if (proposedCombination[i] === secretCombination[j]) {
                            result++;
                        }
                    }
                }
                return result > 0 
                    ? result-blacks 
                    : result;
            }
        }

        function showBoard(proposeCombinations, proposedCombinationsResults, nAttempt) {
            let score = `\n- - - - - - - - - - - - - -\
            \n${nAttempt+1} attempt${nAttempt > 0 ? "s" : ""}:\
            \n****\n`;
            for (let i = 0; i < proposeCombinations.length; i++) {
                score += `${proposeCombinations[i]} --> ${proposedCombinationsResults[i]}\n`;
            }
            console.writeln(score);
        }

        function exitMsg(isBrokenSecretCode) {
            if (isBrokenSecretCode) {
                console.writeln(`*****************************************************\
                \n* Congratulations, you've broken the secret code!!! *\
                \n*****************************************************\n`);
            } else {
                console.writeln(`\nSorry, you lost.\n`);
            }
        }
    }

    function isResumed() {
        let answer;
        let result;
        let error = false;
        do {
            answer = console.readString(`Do you want to play again? (y/n) `);
            result = answer === "y";
            error = !result && answer !== "n";
            if (error) {
                console.writeln(`\nPlease, enter a valid response`);
            } else if (answer === "n") {
                console.writeln("\nBye! See you next time");
            }
        } while (error);
        return result;
    }
    
}