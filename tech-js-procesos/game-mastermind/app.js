const { Console } = require("console-mpds");
const console = new Console();


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

        showWelcomeMsg();
        const secretCombination = generateSecretCombination();
        const getSecretCombination = () => secretCombination;
        showBreakerMsg();
        
        let proposedCombinations = [];
        let proposedResults = [];
        let nAttempt = 0;
        let isBrokenSecretCode = false;

        do {
            proposedCombinations[nAttempt] = getProposedCombination();
            proposedResults[nAttempt] = getProposedResults(proposedCombinations[nAttempt]);
            showBoard(proposedCombinations, proposedResults, nAttempt);
            nAttempt++;
        } while (!isBrokenSecretCode && nAttempt < getMaxAttempts());

        showExitMsg(isBrokenSecretCode);


        function showWelcomeMsg() {
            console.writeln(`\n----- MASTERMIND -----\
            \n\nHi! I'm the computer.\nI'm going to think for a secret combination of ${getCombinationLength()} unique colors.`);
        }

        function generateSecretCombination() {
            const validColors = getValidColors();
            let secretCombination = [];
            let idx;
            for (let i = 0; i < getCombinationLength(); i++) {
                do {
                    idx = parseInt(Math.random() * validColors.length);
                } while (isRepeatedColor(validColors[idx], secretCombination));
                secretCombination[i] = validColors[idx];
            }
            console.writeln('****');
            console.writeln(secretCombination); // TODO: remove. only for debug
            return secretCombination;
        }

        function getProposedCombination() {
            let combination, wrongColors;
            do {
                combination = console.readString(`Propose a combination:`);
                if (combination.length !== getCombinationLength()) {
                    console.writeln(`- Wrong proposed combination length!`);
                } else {
                    wrongColors = false;
                    let idx = 0;
                    do {
                        wrongColors = isWrongColor(combination[idx]);
                        idx++;
                    } while (!wrongColors && idx < combination.length);
    
                    if (wrongColors) {
                        console.writeln(`- Wrong colors, they must be: [${getValidColors()}]`);
                    }
                }
            } while (wrongColors || combination.length !== getCombinationLength());

            return combination;

            function isWrongColor(color) {
                let isWrong = true;
                for (let validColor of getValidColors()) {
                    if (validColor === color) {
                        isWrong = false;
                    }
                }
                return isWrong;
            }
        }

        function isRepeatedColor(color, combinationColors) {
            let isRepeated = false;
            for (let combinationColor of combinationColors) {
                if (combinationColor === color) {
                    isRepeated = true;
                }
            }
            return isRepeated;
        }

        function showBreakerMsg() {
            console.writeln(`\n\nHi CodeBreaker, you have ${getMaxAttempts()} attempts to break the secret combination.\
            \nThe valid colors are: [${getValidColors()}]. You can't repeat any of them.\n`);
        }
        
        function getProposedResults(proposedCombination) {
            const secretCombination = getSecretCombination();
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
                return result > 0 ? result-blacks : result;
            }
        }

        function showBoard(proposedCombinations, proposedResults, nAttempt) {
            let score = `\n- - - - - - - - - - - - - -\
            \n\n${nAttempt+1} attempt${nAttempt > 0 ? "s" : ""}:\
            \n****\n`;
            for (let i = 0; i < proposedCombinations.length; i++) {
                score += `${proposedCombinations[i]} --> ${proposedResults[i]}\n`;
            }
            console.writeln(score);
        }

        function showExitMsg(isBrokenSecretCode) {
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
        let answer, result;
        let error = false;
        do {
            answer = console.readString(`- Do you want to play again? (y/n) `);
            result = answer === "y";
            error = !result && answer !== "n";
            if (error) {
                console.writeln(`\nPlease, enter a valid response`);
            } else if (answer === "n") {
                console.writeln("Bye! See you next time");
            }
        } while (error);
        return result;
    }
}