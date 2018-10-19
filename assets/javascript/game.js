/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {
// class Game {

    // Property-value pairs
    numKeyTriesConst: 12,           // to be a constant for number of key tries for user
    wins            : 0,            // number of wins user has achieved
    currentWord     : [],           // current word to guess
    // numGuessesRemain: numKeyTries,  // number of guesses remaining
    numGuessesRemain: 12,  // number of guesses remaining
    lettersGuessed  : [],           // array of letters guessed
    weHaveAWinner   : false,        // flag for a win
    weHaveALoser    : false,        // flag for a lose
    wordDB          : [
        "handlebars",               // Grab the handlebars & go!
        "gasoline",
        "helmet",
        "gloves",
        "jacket",
        "sunglasses",
        "goggles",
        "boots",
        "lever",
        "button",
        "switch",
        "mirror",
        "engine",
        "throttle"
    ],

    // // Game methods 
    // initializeGame: function() {
    //     // var computerChoices = ["r", "p", "s"];
    //     // var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    //     // Get a new word from word "database"
    //     this.currentWord = this.wordDB[Math.floor(Math.random() * this.wordDB.length)];

    //     // Reset user's letters guessed to contain nothing
    //     this.lettersGuessed = [];

    //     // Reset number of guesses remaining to 12
    //     this.numGuessesRemain = 12;
    // },

    // // Game methods 
    // setCurrentWord: function() {

    //     // Get a new random word from word "database"
    //     // this.currentWord = this.wordDB[Math.floor(Math.random() * this.wordDB.length)];

    //     // USE THIS FOR PRODUCTION ********************************************
    //     // // For each iteration, generate a new random number between 1 and 9.
    //     // var random = Math.floor(Math.random() * 9) + 1;
        
    //     // Initialize current word
    //     this.currentWord = this.wordDB[0];  // TESTING with one word, not random yet

    // },

    // Game method to set-up game for a round
    initializeGameSetUp: function() {

        // Get a new random word from word "database"
        // this.currentWord = this.wordDB[Math.floor(Math.random() * this.wordDB.length)];

        // USE THIS FOR PRODUCTION ********************************************
        // // For each iteration, generate a new random number between 1 and 9.
        // var random = Math.floor(Math.random() * 9) + 1;
        
        // Initialize current word & reset letters guessed
        this.currentWord = this.wordDB[0];  // TESTING with one word, not random yet
        this.lettersGuessed = [];
        this.numGuessesRemain = this.numKeyTriesConst;
        
        //alert("initialize called");

    },

    // Game user input 
    submitInput: function(userInput) {

        // Add input to letters guessed if not already included in list & play
        if (!this.lettersGuessed.includes(userInput)) {
            // INSERT LOGIC FOR GOOD INPUTS
            this.lettersGuessed.push(userInput);

            // Display guesses
            this.displayGuessedLetters();

            // Update number of guesses remaining
            this.updateNumGuessRemaining();

            // Show user's input in hangman word
            this.showCurrentWord();
        }
    },

    // // ORIGINAL SUBMIT FUNCTION
    // // Game user input 
    // submitInput: function(userInput) {

    //     // Add input to letters guessed if not already included in list & play
    //     if (!this.lettersGuessed.includes(userInput)) {
    //         this.lettersGuessed.push(userInput);

    //         // Display guesses
    //         this.displayGuesses();

    //         // Update number of guesses remaining
    //         this.updateNumGuessRemaining();

    //         // Show user's input in hangman word
    //         this.showCurrentWord();
    //     }
    // },

    // Display guessed letters
    displayGuessedLetters: function() {

        // Local variables
        var showLetters = document.getElementById("display-guesses");
        var buildDisplayString = [];

        // Show all letter guesses (commas added by JS6 default)
        for (var i = 0; i < this.lettersGuessed.length; i++) {
            buildDisplayString.push(this.lettersGuessed[i].toUpperCase());
        }

        // Use JS .join method to eliminate array/string default commas at print
        buildDisplayString = buildDisplayString.join(" ");
        
        // Update UI with all letters guessed 
        showLetters.textContent = buildDisplayString;
    },

    // Update number of guesses remaining
    updateNumGuessRemaining: function() {

        // Decrement remaining guesses
        this.numGuessesRemain--;

        // Display guess number remaining in UI
        var remainingGuesses = document.getElementById("display-num-rem");
        remainingGuesses.textContent = this.numGuessesRemain;
    },

    showCurrentWord: function() {

        // Display word in UI & declare guessed word local variable
        var showWord = document.getElementById("display-word");
        var buildPrintWord = [];

        // Use a loop for each character in currentWord and compare it to every lettersGuessed
        for (var i = 0; i < this.currentWord.length; i++) {

            // Local variable to hold current word character
            var currentWordChar = this.currentWord[i];
            if (this.lettersGuessed.includes(currentWordChar)) {
                buildPrintWord[i] = currentWordChar;
            }
            else {
                buildPrintWord[i] = "_ ";
            }
        }

        // IS THIS THE PLACE TO TEST TO SEE IF THE GUESSED LETTERS == THE WORD TO GUESS?
        // Perhaps: call a helper function to check both words, return T/F
        // if T (same words), then game win 
        // If F (not same word), then continue

        // Use JS .join method to eliminate array/string default commas at print
        buildPrintWord = buildPrintWord.join(" ");
        showWord.textContent = buildPrintWord;

        // if (this.checkWins()) {
        //     this.wins++;
        //     // update winner banner & image
        //     // call update winning situation
        //     this.winningSituation();
        // }


    }, 

    winOrLose: function() {

        if (this.checkWins()) {
            // this.wins++;
            // // update winner banner & image
            // // call update winning situation
            this.weHaveAWinner = true;              // EXPERIMENTAL
            this.wins++;
            this.showWinScore();
            this.winningSituation();
        }

        // CHECK FOR A LOSS SITUATION!!!

    },

    checkWins: function() {

        // var continueLoop = true;

        // Use a loop for each character in currentWord and compare it to every lettersGuessed
        for (var i = 0; i < this.currentWord.length; i++) {

            // Local variable to hold current word character
            var currentWordChar = this.currentWord[i];
            if (!this.lettersGuessed.includes(currentWordChar)) {
                return false;
            }
        }

        // Win situation if passed through loop!
        // alert("Should show win score");
        return true;
    },

    winningSituation: function() {

        // alert("Winning situation!");

        // update winner banner & image
        var showWinnerBannerText = document.getElementById("display-winning-catchphrase");
        showWinnerBannerText.textContent = "HERE IS THE MESSAGE: YOU WIN!";
            
        // // set-up next round
        // this.initializeGameSetUp();
        // this.numGuessesRemain = 12;
        // this.lettersGuessed = [];

    },

    showWinScore: function() {
        // Show wins in UI
        var showWinsNumber = document.getElementById("display-wins");
        showWinsNumber.textContent = this.wins;
    }


};