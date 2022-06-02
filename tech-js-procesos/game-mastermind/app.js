const { Console } = require("console-mpds");
const console = new Console();

// process oriented programming

playMastermind();

function playMastermind() {
    const MAX_ATTEMPTS = 10;
    const VALID_COLORS = ["r", "g", "b", "y", "c", "m"];
    const COMBINATION_LENGTH = 4;

    do {
        playGame();
    } while (isResumed());

    function playGame() {
        const getMaxAttempts = () => MAX_ATTEMPTS;
        const getValidColors = () => VALID_COLORS;
        const getCombinationLength = () => COMBINATION_LENGTH;

        welcomeMakerMsg();
        const secretCombination = ['r', 'g', 'b', 'y'];//generateSecretCombination(combinationLength, validColors);
        // print ****
        welcomeBreakerMsg();
        let proposedCombinations = [];
        let proposedResults = [];
        let nAttempt = 0;
        let isBrokenSecretCode = false;
        do {
            proposedCombinations[nAttempt] = getProposedCombination();
            proposedResults[nAttempt] = getProposedResults(proposedCombinations[nAttempt], secretCombination);
            showBoard(proposedCombinations, proposedResults, nAttempt);
            nAttempt++;
        } while (!isBrokenSecretCode && nAttempt < getMaxAttempts());
        exitMsg();

        function welcomeMakerMsg() {
            console.writeln(`\n----- MASTERMIND -----\
            \n\nHi CodeMaker, please enter a Secret Combination with only ${getCombinationLength()} colors.\
            \nThe valid colors are: [${getValidColors()}]. You can not repeat any of them.\n`);
        }

        function generateSecretCombination() {
            const combinationLength = getCombinationLength();
            const validColors = getValidColors();
            let combination = [];
            let index;
            for (let i = 0; i < combinationLength; i++) {
                do {
                    index = parseInt(Math.random() * validColors.length);
                } while (!isUniqueColor(validColors[index], combination));
                combination[i] = validColors[index];
            }
            return combination;
        }

        function getProposedCombination() {
            let combination = [];
            console.writeln(`Propose a combination:`);
            for (let i = 0; i < getCombinationLength(); i++) {
                combination[i] = askColor(i, combination);
            }
            return combination;

            function askColor(i, combination) {
                let color = "";
                let isValid, isUnique;
                do {
                    color = console.readString(`- Enter proposed color ${i + 1}: `);
                    isValid = isValidColor(color);
                    isUnique = isUniqueColor(color, combination);
                    if (!isValid) {
                        console.writeln(`\nWrong color, they must be: [${getValidColors()}]`);
                    } else if (!isUnique) {
                        console.writeln(`\nUpsss, you can not repeat any of them.`);
                    }
                } while (!isValid || !isUnique);
                return color;
            }

            function isValidColor(color) {
                let isValid = false;
                for (let validColor of getValidColors()) {
                    if (validColor === color) {
                        isValid = true;
                    }
                }
                return isValid;
            }
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

        function welcomeBreakerMsg() {
            console.writeln(`\n\n\n\nHi CodeBreaker, please enter a Proposed Combination with only ${getCombinationLength()} colors.\
            \nThe valid colors are: [${getValidColors()}]. You can not repeat any of them and you have ${getMaxAttempts()} attempts.\n`);
        }
        
        function getProposedResults(proposedCombination, secretCombination) {
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

        function showBoard(proposedCombinations, proposedResults, nAttempt) {
            let score = `\n- - - - - - - - - - - - - -\
            \n\n${nAttempt+1} attempt${nAttempt > 0 ? "s" : ""}:\
            \n****\n\n`;
            for (let i = 0; i < proposedCombinations.length; i++) {
                score += `${proposedCombinations[i]} --> ${proposedResults[i]}\n`;
            }
            console.writeln(score);
        }

        function exitMsg() {
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
            answer = console.readString(`- Do you want to play again? (y/n) `);
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