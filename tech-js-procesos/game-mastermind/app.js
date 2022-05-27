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
        const MAX_ATTEMPTS = 1;

        const secretCode = getCode('secret');
        console.writeln(`\nThe secret code is: [${secretCode}]\n`);

        let brokenSecretCode = false;
        let remainingAttempts = MAX_ATTEMPTS;

        do {
            let proposedCode = getCode('proposed');
            console.writeln(`\nThe proposed code is: [${proposedCode}]\n`);

            let codeMatch = compareCodes(proposedCode, secretCode);
            console.writeln(`\nThe result is: [${codeMatch}]\n`);

            if (codeMatch === [2, 2, 2, 2]) {
                brokenSecretCode = true;
            } else {
                remainingAttempts--;
                printMsg('remaining')
            }

        } while (!brokenSecretCode && remainingAttempts > 0);

        printMsg(brokenSecretCode
            ? 'win'
            : 'lose');


        function getCode(typeCode) {
            printMsg(typeCode);
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
                        printMsg(typeCode, false);
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

        function printMsg(type, validColor = true) {
            let player;
            switch (type) {
                case 'secret':
                    player = 'CodeMaker';
                    console.writeln(getCodeMsg(type, validColor, player));
                    break;

                case 'proposed':
                    player = 'CodeBreaker';
                    console.writeln(getCodeMsg(type, validColor, player))
                    break;

                case 'remaining':
                    console.writeln(`\nYou have ${remainingAttempts} attempts left.\n`);
                    break;

                case 'win':
                    console.writeln('\nCongratulations, you won!');
                    break;

                case 'lose':
                    console.writeln('\nSorry, you lost!');
                    break;
            }

            function getCodeMsg(typeCode, validColor = true, player) {
                let msg = '';
                if (validColor) {
                    msg = `\nHi ${player}, please enter a ${typeCode} code with only ${CODE_LENGTH} colors.\
                    \nYou can use 1 or ${CODE_LENGTH} of these colors: [${VALID_COLORS}]\n`;
                } else {
                    msg = `\nInvalid color, please enter one of these colors: [${VALID_COLORS}]`;
                }
                return msg;
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