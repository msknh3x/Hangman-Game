// 1. Words categorized by 3 difficulty levels
const wordBank = {
    easy: ["hi", "sun", "hello", "bye", "paper"],
    medium: ["hangman", "girl", "computer", "javascript", "programming"],
    hard: ["muskan irfan", "cloud computing", "artificial intelligence", "machine learning", "neural networks"]
};

// 2. Lives assigned to each difficulty level
const levelLives = {
    easy: 6,
    medium: 5,
    hard: 4,
};

let currentLevel   =  "easy";
let secretWord     =   ""; 
let guessedLetters =   [];
let remainedLives  =    8;

const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const livesCount = document.getElementById("lives-count");
const currentLevelDisplay = document.getElementById("current-level");
const message = document.getElementById("message");
const resetButtons = document.getElementById("reset-btn");
const levelButtons = document.querySelectorAll(".level-btn"); 

function initGame(){

    // pick random word 
    const word = wordBank[currentLevel];
    const randomIndex = Math.floor(Math.random() * word.length);
    secretWord = word[randomIndex];

    // reset state
    guessedLetters = [];
    remainingLives = levelLives[currentLevel];

    // update text on screen
    livesCount.textContent = remainingLives;
    currentLevelDisplay.textContent = currentLevel.toLowerCase();
    message.textContent = "";

    //render word blanks and keyboard
    displayWord();
    createKeyboard();
}

function displayWord() {
    const displayed = secretWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

    wordDisplay.textContent = displayed;
}

function createKeyboard() {
    keyboard.innerHTML = ""; // Clear existing buttons
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    alphabet.split("").forEach(letter => {
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.classList.add("letter-btn");

        // When clicked, handle the guess
        btn.addEventListener("click", () => handleGuess(letter, btn));

        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, button) {
    button.disabled = true; // Disable clicked button
    guessedLetters.push(letter);

    if (secretWord.includes(letter)) {
        displayWord();
    } else {
        remainingLives--;
        livesCount.textContent = remainingLives;
    }

    checkGameStatus();
}

function checkGameStatus() {
    // Check WIN: Every letter in secretWord is in guessedLetters
    const isWon = secretWord.split("").every(letter => guessedLetters.includes(letter));

    if (isWon) {
        message.textContent = "🎉 Congratulations! You Won!";
        message.style.color = "green";
        disableAllKeyboardButtons();
    } 
    // Check LOSS: No lives left
    else if (remainingLives <= 0) {
        message.textContent = `💀 Game Over! The word was: ${secretWord}`;
        message.style.color = "red";
        disableAllKeyboardButtons();
    }
}

function disableAllKeyboardButtons() {
    const allButtons = keyboard.querySelectorAll("button");
    allButtons.forEach(btn => btn.disabled = true);
}

// Level selection buttons
levelButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Remove 'active' class from all buttons, add to clicked one
        levelButtons.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        // Change currentLevel and restart game
        currentLevel = e.target.dataset.level;
        initGame();
    });
});

// Play Again button
resetBtn.addEventListener("click", initGame);

// START THE GAME ON PAGE LOAD
initGame();