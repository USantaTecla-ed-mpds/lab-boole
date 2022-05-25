// game mastermind
// process oriented programming

const { Console } = require("console-mpds");
const console = new Console();

playMastermind();

function playMastermind() {
    do {
        console.writeln('playGame called');
        playGame();
    } while (repeatGame());
    console.writeln('Bye! See you next time');


    function playGame() {
        console.writeln(' --- playGame executed ---');
        console.writeln('Lets play a game of mastermind');
        console.writeln('Lets play a game of mastermind');
        console.writeln('Lets play a game of mastermind');

        console.writeln(`\n --------- End Game --------- \n`);
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