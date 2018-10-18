/* Word Guess Game by WBM, 10/15/18, game.js file */

var game = {

    // Key-value pairs aka property-value pairs aka object's public (?) variables
    const: numKeyTries = 12,
    wins: 0,
    currentWord: [],                    // current word to guess
    numGuessesRemain: numKeyTries,      // initialize at numKeyTries
    lettersGuessed: [],                 // initialize empty
    wordDB: [
        "handlebars",                   // Grab the handlebars & go!
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

        // Show all letter guesses (commas added by JS6 default)
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

        if (this.checkWins()) {
            this.wins++;
            // update winner banner & image
            // call update winning situation
            this.winningSituation();
        }

        // CHECK FOR A LOSS SITUATION!!!
    }, 

    checkWins: function() {

        var continueLoop = true;
        // Use a loop for each character in currentWord and compare it to every lettersGuessed
        for (var i = 0; i < this.currentWord.length && continueLoop; i++) {

            // Local variable to hold current word character
            var currentWordChar = this.currentWord[i];
            if (this.lettersGuessed.includes(currentWordChar)) {
                continueLoop = true;
            }
            else {
                return false;   // Not a win; no need to set continueLoop = false
            }
        }

        // Win situation if passed through loop!
        return true;
    },

    winningSituation: function() {
        // update winner banner & image
        var showWinnerBannerText = document.getElementById("display-winning-catchphrase");
        showWinnerBannerText.textContent = "HERE IS THE MESSAGE: YOU WIN!";
            
        // set-up next round
        this.setCurrentWord();
        this.numGuessesRemain = numKeyTries;
        this.lettersGuessed = [];

    },

    showWinScore: function() {

        // Show wins in UI
        var showWinsNumber = document.getElementById("display-wins");
        showWinsNumber.textContent = this.wins;
    }


};