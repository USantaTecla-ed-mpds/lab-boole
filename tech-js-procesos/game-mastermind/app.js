/ game mastermind
// process oriented programming

const { Console } = require("console-mpds");
const console = new Console();

playMastermind();

function playMastermind() {
    do {
        playGame();
    } while (repeatGame());
    console.writeln('Bye! See you next time');


    function playGame() {
        const CODE_LENGTH = 4;
        const VALID_COLORS = ['R', 'G', 'B', 'Y', 'C', 'M'];
        console.writeln('VALID COLORS: ' + VALID_COLORS.join(', '));

        const secretCode = getSecretCode(CODE_LENGTH);
        console.writeln(`The secret code is: ${secretCode}`);
        
        do {
            console.writeln('Start decoding!');
            console.writeln('Start decoding!');
            console.writeln('Start decoding!');
            console.writeln('Start decoding!');
            isGameOver(true);
        } while (!isGameOver(true));


        function getSecretCode(length) {
            console.writeln(`Hi CodeMaker, please enter a Secret Code with only ${length} colors.
You can use 1 or ${length} of these colors: [R]ed, [G]reen, [B]lue, [Y]ellow, [C]yan & [M]agenta.`);
            let secretCode = [];

            for (let i = 1; i <= length; i++) {
                let isValidColor = true;
                do {
                    secretCode[i] = console.readString(`- Enter the color ${i}: `);
                    isValidColor = validateColor(secretCode[i], VALID_COLORS);
                } while (!isValidColor);
            }
            return secretCode;

            // functions
            function validateColor(color, validColors) {
                console.writeln(` ---- validate color: ${color}`);
                console.writeln(` ---- validColors: ${validColors}`);

                for (let validColor of validColors) {
                    if (color === validColor) {
                        return true;
                    } else {
                        console.writeln(color === validColor);
                        console.writeln(` --- color: ${color}`);
                        console.writeln(` --- validColor: ${validColor}`);
                        console.writeln(`Invalid color, please enter one of these valid colors: R, G, B, Y, C or M \n`);
                        return false;
                    }
                }
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