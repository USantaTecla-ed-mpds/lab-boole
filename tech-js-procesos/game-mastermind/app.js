// game mastermind
// process oriented programming

const { Console } = require("console-mpds");
const console = new Console();

playMastermind();

function playMastermind() {
    do {
        playGame();
    } while (repeatGame());
    console.writeln('\nBye! See you next time');


    function playGame() {
        const CODE_LENGTH = 4;
        const VALID_COLORS = ['R', 'G', 'B', 'Y', 'C', 'M'];

        let secretCode = '';
        secretCode = getSecretCode(CODE_LENGTH);
        let secretCodeMsg = '';
        for (let color of secretCode) {
            secretCodeMsg += `${color} `;
        }
        console.writeln(`\nThe secret code is: [${secretCodeMsg}]\n`);
        
        do {
            console.writeln('Start decoding!');
            console.writeln('Start decoding!');
            console.writeln('Start decoding!');
            console.writeln('Start decoding!');
            isGameOver(true);
        } while (!isGameOver(true));


        function getSecretCode(length) {
            console.writeln(`\
            \nHi CodeMaker, please enter a Secret Code with only ${length} colors.\
            \nYou can use 1 or ${length} of these colors: [R]ed, [G]reen, [B]lue, [Y]ellow, [C]yan & [M]agenta.\n`);

            let secretCode = [];
            for (let i = 1; i <= length; i++) {
                let isValidColor = true;
                do {
                    isValidColor = validateColor(secretCode[i], VALID_COLORS);
                    if (!isValidColor) {
                        console.writeln('\nInvalid color, please enter one of these colors: R, G, B, Y, C or M.');
                    }
                } while (!isValidColor);
            }
            return secretCode;

            // functions
            function validateColor(color, validColors) {
                for (let validColor of validColors) {
                    if (color === validColor) {
                        return true;
                    }
                }
                return false;
            }
        }

        function isGameOver(bool) {
            return bool;
        }
    }


    function repeatGame() {
        let repeat;
        let validResponse;
        do {
            repeat = console.readString("Do you want to play again? (y/n)");
            validResponse = repeat === "y" || repeat === "n";
            if (validResponse) {
                return repeat === "y";
            } else {
                console.writeln("\nPlease, enter a valid response");
            }
        } while (!validResponse);
    }
}