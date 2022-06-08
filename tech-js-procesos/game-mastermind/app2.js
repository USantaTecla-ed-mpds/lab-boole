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
        const secretCombination = getSecretCombination(COMBINATION_LENGTH, VALID_COLORS);
        let nAttempt = 0;
        showAttempMsg(nAttempt);
        let proposedCombinations = [];
        let proposedResults = [];
        let isBrokensecretCombination = false;
        do {
            nAttempt++;
            proposedCombinations[nAttempt] = getProposedCombination(COMBINATION_LENGTH,VALID_COLORS);
            proposedResults[nAttempt] = getProposedResults(proposedCombinations[nAttempt],secretCombination);
            console.writeln(proposedResults[nAttempt]);
           
            
            showAttempMsg(nAttempt);
            showBoard(proposedCombinations[nAttempt], proposedResults[nAttempt]);
        } while (nAttempt < MAX_ATTEMPTS);

    }

    function showAttempMsg(nAttempt){
        console.writeln(`${nAttempt} intento (s):`)
    }

    function getSecretCombination(lenght, validColors){
        return 'rgby';
    }

    function getProposedCombination(lenght, validColors){
        return 'rgcm';
    }
    
    function getProposedResults(proposedCombination,secretCombination){
        let blacks = 0;
        let whites = 0;

        for (let i = 0; i < proposedCombination) {
            let match = false;
            for (let j = 0; !match && j < secretCombination.length; j++) {
                if (proposedCombination[i] === secretCombination[j]) {
                    match = true;
                    if(i === j){
                        blacks ++;
                    }else{
                        whites ++;
                    }
                }
            }    
        
        }    
        return [blacks,whites];
    }

    function showBoard(proposedCombination,result){
        const blanksIndex = 0;
        const whiteIndex = 1;
        console.writeln(`${proposedCombination} --> ${result[blanksIndex]} blanks and ${result[whiteIndex]} whites`);
    }

    function isResumed(){
        return false;
    }
}