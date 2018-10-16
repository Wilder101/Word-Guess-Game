/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {

    // Key-value pairs aka property-value pairs aka object's public (?) variables
    wins: 0,
    currentWord: [],            // current word to guess
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
            this.showCurrentWord();
        }
    },

    // Display guesses helper method
    displayGuesses: function() {

        // Local variables
        var showLetters = document.getElementById("display-guesses");
        var buildDisplayString = [];

        // Show all letter guesses (spaced with manual space, commas added by JS6 default)
        for (var i = 0; i < this.lettersGuessed.length; i++) {
            buildDisplayString.push(this.lettersGuessed[i].toUpperCase());
        }

        // Use JS .join method to eliminate array/string default commas at print
        buildDisplayString = buildDisplayString.join(" ");
        
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

    },

    showWins: function() {
        var showWinsNumber = document.getElementById("display-wins");
        showWinsNumber.textContent = this.wins;
    },

    showCurrentWord: function() {

        // Display word in UI
        var showWord = document.getElementById("display-word");
        var buildPrintWord = [];

        // Use a loop for each character in currentWord and compare it to every lettersGuessed
        for (var i = 0; i < this.currentWord.length; i++) {

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
    }




};