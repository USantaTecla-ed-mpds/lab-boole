const { Console } = require('console-mpds');
const console = new Console();

startMastermind();

function startMastermind() {
    const ALLOWED_COLORS = 'rgbycm';
    const COMBINATION_LENGTH = 4;
    do {
        const secretCombination = generateRandomCombination(ALLOWED_COLORS, COMBINATION_LENGTH);
        playMastermind(secretCombination, COMBINATION_LENGTH);
    } while(isResumed() === true);

    function generateRandomCombination(ALLOWED_COLORS, COMBINATION_LENGTH) {
        const secretCombination = [];
        let i = 0;
        while (i <= COMBINATION_LENGTH - 1) {
            let randomColor = ALLOWED_COLORS[Math.round(Math.random() * (ALLOWED_COLORS.length - 1))];
            if (isDuplicatedColor(secretCombination, randomColor) === false) {
                secretCombination[i] = randomColor;
                i++
            }
        }
        return secretCombination;

        function isDuplicatedColor(secretCombination, color) {
            for(let i = 0; i < secretCombination.length; i++) {
                if (secretCombination[i] === color) {
                    return true;
                }
            }
            return false;
        }
    }

    function playMastermind(secretCombination, COMBINATION_LENGTH) {
        const BLACKS_INDEX = 0;
        const WHITES_INDEX = 1;
        let blacksWhitesResults = [0, 0];
        let previousResultsMessages = [];
        let attempt = 0;
        let endOfgame = false;
        console.writeln(` ----- MASTERMIND ----- `);

        do {
            console.writeln(`\n ${attempt + 1} attempt(s): \n****`);
            printPreviousResults(previousResultsMessages);
            if(isEndOfGame(blacksWhitesResults[BLACKS_INDEX], attempt, COMBINATION_LENGTH) === true) {
                endOfgame = true;
            } else {
                const proposedCombination = proposeSecretCombination(ALLOWED_COLORS, COMBINATION_LENGTH);
                blacksWhitesResults = countBlacksAndWhites(secretCombination, proposedCombination);
                previousResultsMessages[attempt] = `${proposedCombination} --> ${blacksWhitesResults[BLACKS_INDEX]} blacks and ${blacksWhitesResults[WHITES_INDEX]} whites`;
                attempt++;
            }
        } while(endOfgame === false);

        printEndOfGameMessage(blacksWhitesResults, COMBINATION_LENGTH, secretCombination);

        function printPreviousResults(previousResults) {
            for (let i = 0; i < previousResults.length; i++) {
                console.writeln(previousResults[i]);
            } 
        }

        function isEndOfGame(blacks, attempt, COMBINATION_LENGTH) {
            const MAX_ATTEMPTS = 10;
            if (blacks === COMBINATION_LENGTH) return true;
            if (attempt === MAX_ATTEMPTS - 1) return true;
            return false;
        }

        function proposeSecretCombination(ALLOWED_COLORS, COMBINATION_LENGTH) {
            let isValid = false;
            let proposedCombination = '';
            do {
                proposedCombination = console.readString(`Propose a combination: `);
                if (isValidCombination(proposedCombination, ALLOWED_COLORS, COMBINATION_LENGTH) === true) {
                    isValid = true;
                }
            } while(isValid === false);
            return proposedCombination;

            function isValidCombination(proposedCombination, ALLOWED_COLORS, COMBINATION_LENGTH) {
                if (isValidLength(proposedCombination, COMBINATION_LENGTH) === false) {
                    console.writeln(`Wrong proposed combination length`);
                    return false;
                }
    
                if (hasValidColors(proposedCombination, ALLOWED_COLORS) === false) {
                    console.writeln(`Wrong colors, they must be: rgybmc`)
                    return false;
                }

                if (hasRepeatedColors(proposedCombination) === true) {
                    console.writeln(`Wrong colors, they must be: rgybmc without repeated`)
                    return false;
                }
    
                return true;
    
                function isValidLength(proposedCombination, COMBINATION_LENGTH) {
                    if (proposedCombination.length === COMBINATION_LENGTH) {
                        return true;
                    }
                    return false;
                }
    
                function hasValidColors(proposedCombination, ALLOWED_COLORS) {
                    for(let i = 0; i < proposedCombination.length; i++) {
                        if (isValidColor(ALLOWED_COLORS, proposedCombination[i]) === false) {
                            return false;
                        }
                    }
                    return true;
    
                    function isValidColor(ALLOWED_COLORS, color) {
                        let isValid = false;
                        for (let j = 0; isValid === false && j < ALLOWED_COLORS.length; j++) {
                            if (ALLOWED_COLORS[j] === color) {
                                isValid = true;
                            }
                        }
                        return isValid;
                    }
                }

                function hasRepeatedColors(proposedCombination) {
                    let repeatedColorCount = [];
                    for(let i = 0; i < proposedCombination.length; i++) {
                        let count = 0;
                        for (let j = 0; j < proposedCombination.length; j++) {
                            if (proposedCombination[i] === proposedCombination[j]) {
                                count++;
                                repeatedColorCount[i] = count;
                            }
                        }
                        if (repeatedColorCount[i] > 1) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }

        function countBlacksAndWhites(secretCombination, proposedCombination) {
            let blacks = 0;
            let whites = 0;
            for (let i = 0; i < secretCombination.length; i++) {
                for (let j = 0; j < proposedCombination.length; j++) {
                    if ( j === i && secretCombination[i] === proposedCombination[j]) {
                        blacks++;
                    } else if (secretCombination[i] === proposedCombination[j]) {
                        whites++;
                    }
                }
            }
            return [blacks, whites];
        }

        function printEndOfGameMessage(blacksWhitesResults, COMBINATION_LENGTH, secretCombination) {
            if (blacksWhitesResults[BLACKS_INDEX] === COMBINATION_LENGTH){
                console.writeln(`You've won!!! ;-)`);
            } else {
                console.writeln(`You've lost!!! :-( \n Secret combination: ${secretCombination}`);
            }
        }
    }

    function isResumed() {
        let userInput = '';
        let inputError = false;
        do {
            userInput = console.readString(`Do you want to continue? (y/n)?`);
            inputError = userInput !== 'y' && userInput !== 'n' ? true : false;
        } while(inputError === true);
        return userInput === 'y' ? true : false;
    }
}