const { Console } = require("console-mpds");
const console = new Console();

// process oriented programming
// game mastermind


playMastermind();

function playMastermind() {
    do {
        playGame();
    } while (repeatGame());


    function playGame() {
        const CODE_LENGTH = 4;
        const VALID_COLORS = ['R', 'G', 'B', 'Y', 'C', 'M'];
        const MAX_ATTEMPTS = 10;
        const MAKER = 'CodeMaker';
        const BREAKER = 'CodeBreaker';

        printMsg('welcome', MAKER, 'Secret');
        const secretCode = getCode('Secret');
        printMsg('secret-is', null, secretCode);

        let brokenSecretCode = false;
        let remainingAttempts = MAX_ATTEMPTS;
        const BREAK_CODE = [2,2,2,2];

        printMsg('welcome', BREAKER, 'Proposed');
        do {
            let proposedCode = getCode('proposed');
            printMsg('attempt-is', null, proposedCode);

            let codeMatch = compareCodes(proposedCode, secretCode);
            printMsg('result-is', null, codeMatch);

            if (isEqualCode(codeMatch, BREAK_CODE)) {
                brokenSecretCode = true;
            } else {
                remainingAttempts--;
                printMsg('remaining', null, remainingAttempts)
            }
        } while (!brokenSecretCode && remainingAttempts > 0);

        printMsg(brokenSecretCode
            ? 'win'
            : 'lose');


        function getCode(typeCode) {
            let code = [];
            for (let i = 0; i < CODE_LENGTH; i++) {
                code[i] = askColor(i, typeCode);
            }
            return code;

            function askColor(i, typeCode) {
                let color = '';
                let isValidColor = true;
                do {
                    color = console.readString(`- Enter ${typeCode} color ${i + 1}: `);
                    isValidColor = validateColor(color);
                    if (!isValidColor) {
                        printMsg('is-invalid');
                    }
                } while (!isValidColor);
                return color;
            }

            function validateColor(color) {
                for (let validColor of VALID_COLORS) {
                    if (color === validColor) {
                        return true;
                    }
                }
                return false;
            }
        }

        // 2 for correct color and position // 1 for correct color but wrong position // 0 for incorrect color and position
        function compareCodes(code1, code2) {
            let result = [];
            for (let i = 0; i < code1.length; i++) {
                let match = false;
                for (let j = 0; !match && j < code2.length; j++) {
                    if (code1[i] === code2[j]) {
                        result[i] = i === j ? 2 : 1;
                        match = true;
                    } else {
                        result[i] = 0;
                    }
                }
            }
            return result;
        }

        function isEqualCode(code1, code2) {
            for (var i = 0; i < code1.length; i++) {
                if (code1[i] !== code2[i]) {	
                    return false;
                }
            }
            return true;
        }

        function printMsg(type, player, data) {
            switch (type) {
                case 'welcome':
                    console.writeln(`\nHi ${player}, please enter a ${data} Code with only ${CODE_LENGTH} colors.\
                    \nYou can use 1 or ${CODE_LENGTH} of these colors: [${VALID_COLORS}]\n`);
                    break;

                case 'is-invalid':
                    console.writeln(`\nInvalid color, please enter one of these colors: [${VALID_COLORS}]`);
                    break;

                case 'secret-is':
                    console.writeln(`\n********************************\
                    \n* The Secret Code is [${data}] *\
                    \n********************************\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`);
                    break;

                case 'proposed-is':
                    console.writeln(`\nYour proposed code is [${data}]`);
                    break;

                case 'result-is':
                    console.writeln(`\n---> The result is: [${data}]\n`);
                    break;

                case 'remaining':
                    console.writeln(`-------------------------------\
                    \n\nYou have [${data}] attempts left to break the code.`);
                    break;

                case 'win':
                    console.writeln('\nCongratulations, you won!');
                    break;

                case 'lose':
                    console.writeln('\nSorry, you lost!');
                    break;
            }
        }
    }

    function repeatGame() {
        let repeat;
        let validResponse;
        do {
            repeat = console.readString("Do you want to play again? (y/n)");
            validResponse = repeat === "y" || repeat === "n";
            if (validResponse) {
                if (repeat === "n") {
                    console.writeln('\nBye! See you next time');
                }
                return repeat === "y";
            } else {
                console.writeln("\nPlease, enter a valid response");
            }
        } while (!validResponse);
    }
}