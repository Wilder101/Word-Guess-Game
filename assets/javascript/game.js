/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {
// class Game {

    // Property-value pairs
    numKeyTriesConst: 12,           // to be a constant for number of key tries for user
    numGuessesRemain: 12,           // number of guesses remaining
    wins            : 0,            // number of wins user has achieved
    lettersGuessed  : [],           // array of letters guessed
    currentWord     : [],           // current word to guess
    wordDB          : [
        "handlebars",               // Grab the handlebars & go!
        "gasoline",
        "helmet",
        "gloves",
        "jacket",
        "leather",
        "sunglasses",
        "goggles",
        "boots",
        "lever",
        "button",
        "switch",
        "mirrors",
        "engine",
        "throttle"
    ],

    // Game method to set-up game for a round
    initializeGameSetUp: function() {

        // Get a new random word from word "database"
        var random = Math.floor(Math.random() * this.wordDB.length) + 1;
        this.currentWord = this.wordDB[random];

        // Reset letters guessed and remaining guesses count
        this.lettersGuessed = [];
        this.numGuessesRemain = this.numKeyTriesConst;

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

    // Show the current word in the UI
    showCurrentWord: function() {

        // Declare local variables
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

    // Check for a win or lose situation
    winOrLose: function() {

        if (this.checkWins()) {
            
            this.wins++;
            
            // Update display
            $("#display-catchphrase").text("YOU WIN! The word \"" + this.currentWord + "\" was correct.");

            // Reset game for next round
            this.initializeGameSetUp();
        }

        // CHECK FOR A LOSS SITUATION!!!
        else if (this.checkForLoss()) {

            // Update display
            $("#display-catchphrase").text("YOU LOST! The word was \"" + this.currentWord + ".\" Try a new word.");

            // Reset game for next round
            this.initializeGameSetUp();
        }
    },

    // Check wins
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
        return true;
    },

    // Check for loss
    checkForLoss: function() {

        if (this.numGuessesRemain === 0) {
            return true;
        }
        else {
            return false;
        }
    }
};