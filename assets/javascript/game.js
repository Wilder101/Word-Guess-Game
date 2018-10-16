/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {

    // Key-value pairs aka property-value pairs aka object's public (?) variables
    wins: 0,
    currentWord: "",            // update as necessary
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

        // Add input to letters guessed if not already included in list
        if (!this.lettersGuessed.includes(userInput)) {
            this.lettersGuessed.push(userInput);
        }
    },

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

    // Game methods 
    setCurrentWord: function() {
        // Get a new random word from word "database"
        this.currentWord = this.wordDB[Math.floor(Math.random() * this.wordDB.length)];
    },

    showWins: function() {
        var showWinsNumber = document.getElementById("display-wins");
        showWinsNumber.textContent = this.wins;
    },

    showCurrentWord: function() {
        // display-word
        var showWord = document.getElementById("display-word");
        var buildPrintWord;

        // use a loop for each character in currentWord and compare it to every lettersGuessed
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.currentWord[i] === this.lettersGuessed.includes()) {
                buildPrintWord = buildPrintWord + this.currentWord[i];
                console.log(buildPrintWord);
            }
            else {
                buildPrintWord = buildPrintWord + " _";
            }
        }
        showWord.textContent = buildPrintWord;
    }


};