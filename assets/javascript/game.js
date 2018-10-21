/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {
// class Game {

    // Property-value pairs
    numKeyTriesConst: 12,           // to be a constant for number of key tries for user
    wins            : 0,            // number of wins user has achieved
    // numGuessesRemain: numKeyTries,  // number of guesses remaining
    numGuessesRemain: 12,           // number of guesses remaining
    lettersGuessed  : [],           // array of letters guessed
    // weHaveAWinner   : false,        // flag for a win
    // weHaveALoser    : false,        // flag for a lose
    currentWord     : [],           // current word to guess
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
        // this.weHaveAWinner = false;
        // this.weHaveALoser = false;

        // Initialize display
        this.showCurrentWord();
        $("#display-wins").text(this.wins);
        $("#display-num-rem").text(this.numGuessesRemain);
        $("#display-guesses").text(this.displayGuessedLetters());

    },

    // Game user input 
    submitInput: function(userInput) {

        // Add input to letters guessed if not already included in list & play
        if (!this.lettersGuessed.includes(userInput)) {
            
            // Make all inputs to be lower case for easy of play
            userInput = userInput.toLowerCase();

            // Add input to letters guessed
            this.lettersGuessed.push(userInput);

            // Display guesses
            this.displayGuessedLetters();

            // Update number of guesses remaining
            this.updateNumGuessRemaining();

            // Show user's input in hangman word
            this.showCurrentWord();
        }
    },

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

        // Use JS .join method to eliminate array/string default commas at print
        buildPrintWord = buildPrintWord.join(" ");
        showWord.textContent = buildPrintWord;

    }, 

    winOrLose: function() {

        if (this.checkWins()) {
            // // update winner banner & image
            // // call update winning situation
            // this.weHaveAWinner = true;              // EXPERIMENTAL
            this.wins++;
            
            // Update displays
            // $("#display-wins").text(this.wins);
            $("#display-catchphrase").text("YOU WIN! \"" + this.currentWord + "\" is correct.");

            // Reset game for next round
            this.initializeGameSetUp();
            
        }

        // CHECK FOR A LOSS SITUATION!!!
        if (this.checkForLoss()) {

            // this.weHaveALoser = true;             // EXPERIMENTAL

            // Update displays
            // $("#display-wins").text(this.wins);
            $("#display-catchphrase").text("YOU LOST! The word was \"" + this.currentWord + ".\" Try a new word.");

            // Reset game for next round
            this.initializeGameSetUp();
        }

    },

    checkWins: function() {

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

    checkForLoss: function() {

        if (this.numGuessesRemain === 0) {
            return true;
        }
        else {
            return false;
        }
    },

    // NO LONGER CALLED, PLACED IN winOrLose()
    winningSituation: function() {

        // alert("Winning situation!");

        // update winner banner & image
        var showWinnerBannerText = document.getElementById("display-catchphrase");
        showWinnerBannerText.textContent = "HERE IS THE MESSAGE: YOU WIN!";
            
        // // set-up next round
        // this.initializeGameSetUp();
        // this.numGuessesRemain = 12;
        // this.lettersGuessed = [];

    },

    // NO LONGER CALLED, PLACED IN winOrLose()
    showWinScore: function() {
        
        // Show wins in UI
        var showWinsNumber = document.getElementById("display-wins");
        showWinsNumber.textContent = this.wins;
    }


};