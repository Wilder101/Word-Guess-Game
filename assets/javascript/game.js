/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {

    // Key-value pairs aka property-value pairs aka object's public (?) variables
    wins: 0,
    currentWord: [],            // current word to guess
    currentWordGuess: [],       // current word that has been guessed
    numGuessesRemain: 12,       // initialize at 12
    lettersGuessed: [],         // initialize empty
    wordDB: [
        "handlebars",
        "gasoline",
        "helmet",
        "gloves",
        "jacket",
        "sunglasses",
        "boots"
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

    // Game user input 
    submitInput: function(userInput) {

        // Add input to letters guessed if not already included in list & play
        if (!this.lettersGuessed.includes(userInput)) {
            this.lettersGuessed.push(userInput);

            // Display guesses
            this.displayGuesses();

            // Update number of guesses remaining
            this.updateNumGuessRemaining();

            // Show user's input in hangman word
            this.showCurrentWord(userInput);
        }
    },

    // Display guesses helper method
    displayGuesses: function() {

        // Local variables
        var showLetters = document.getElementById("display-guesses");
        var buildDisplayString = [];

        // Show all letter guesses (spaced with manual space, commas added by JS6 default)
        for (var i = 0; i < this.lettersGuessed.length; i++) {
            buildDisplayString.push(" " + this.lettersGuessed[i])
        }

        // Update UI with all letters guessed 
        showLetters.textContent = buildDisplayString;
    },

    // Update number of guesses remaining helper method
    updateNumGuessRemaining: function() {

        // Decrement remaining guesses
        this.numGuessesRemain--;

        // Display guess number remaining in UI
        var remainingGuesses = document.getElementById("display-num-rem");
        remainingGuesses.textContent = this.numGuessesRemain;
    },

    // Game methods 
    setCurrentWord: function() {

        // Get a new random word from word "database"
        // this.currentWord = this.wordDB[Math.floor(Math.random() * this.wordDB.length)];
        
        // Initialize current word
        this.currentWord = this.wordDB[0];  // TESTING with one word, not random yet

        // Initialize current word guess word
        for (var i = 0; i < this.currentWord.length; i++) {
            this.currentWordGuess.push("_");
        }
    },

    showWins: function() {
        var showWinsNumber = document.getElementById("display-wins");
        showWinsNumber.textContent = this.wins;
    },

    showCurrentWord: function(userInput) {

        // Display word
        var showWord = document.getElementById("display-word");
        var buildPrintWord = [];

        // use a loop for each character in currentWord and compare it to every lettersGuessed
        for (var i = 0; i < this.currentWord.length; i++) {

            // if (this.currentWord[i] === this.lettersGuessed.includes()) {
            //     buildPrintWord = buildPrintWord + this.currentWord[i];
            //     console.log(buildPrintWord);
            // }
            // else {
            //     buildPrintWord = buildPrintWord + " _";
            // }
            if (this.currentWord[i] === userInput) {
                this.currentWordGuess[i] = userInput;
            }
        }

        // // TESTING
        // if (this.currentWord.includes(userInput)) {
        //     buildPrintWord.push(userInput);
        // }

        showWord.textContent = this.currentWordGuess;
    }


};