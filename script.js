// Jonathan Viault 

// Buttons
let newGameBtn = document.getElementById('newGameBtn');
let rollBtn = document.getElementById('rollBtn');
let holdBtn = document.getElementById('holdBtn');
let cleanBtn = document.getElementById('cleanBtn');
// PointsText
let snakePointsText = document.getElementById('snake-points');
let spiderPointsText = document.getElementById('spider-points');
let currentPointsText = document.getElementById('current-points');

// Points
let snakePoints = 0;
let spiderPoints = 0;
let currentPoints = 0;

// Roll number
let rollNumber = 0;

// Dice image
let diceImage = document.getElementById('diceImage');

// Player turn
let isSpiderTurn = true;

// Players sections
let spiderSection = document.getElementById('spiderSection');
let snakeSection = document.getElementById('snakeSection');

// History zone
let historyZone = document.querySelector('.history-zone');

const cleanHistory = () => {
    while (historyZone.firstChild) {
        historyZone.removeChild(historyZone.firstChild);
    }
}

// Fill the history zone
const historyFill = (randomNumber) => {
    let newP = document.createElement('p');
    let player = isSpiderTurn ? '🕷 Spider' : '🐍 Snake';
    newP.innerText = `${player} turn : Roll n° ${rollNumber} - Result = ${randomNumber} - Current = ${currentPoints}`;
    newP.classList.add('mr-3');
    historyZone.append(newP);
    // If 1 is rolled -> add a new line with current player
    if (randomNumber === 1) {
        let newP = document.createElement('p');
        let player = isSpiderTurn ? '🐍 🐍' : '🕷 🕷';
        newP.innerText = `${player} TURN ${player}`;
        newP.classList.add('mr-3');
        historyZone.append(newP); 
    }
}

// Set spider turn and change border colors
const setSpiderTurn = () => {
    currentPoints = 0;
    isSpiderTurn = true;
    snakeSection.classList.remove('border-primary');
    snakeSection.classList.add('border-dark');
    spiderSection.classList.remove('border-dark');
    spiderSection.classList.add('border-primary');
}

// Set snake turn and change border colors
const setSnakeTurn = () => {
    currentPoints = 0;
    isSpiderTurn = false;
    spiderSection.classList.remove('border-primary');
    spiderSection.classList.add('border-dark');
    snakeSection.classList.remove('border-dark');
    snakeSection.classList.add('border-primary');
}

// Show the winner and restart game
const endGame = (winner) => {
    alert(winner + ' WINNER !!');
    newGame();
}

// Restart game
const newGame = () => {
    currentPoints = 0;
    snakePoints = 0;
    spiderPoints = 0;
    spiderPointsText.innerText = '0 🕷 / 100 🕷';
    snakePointsText.innerText = '0 🐍 / 100 🐍';
    currentPointsText.innerText = 'Current : 0 🕷';
}

// Get a random number between 1 and 6
const randomNumberSix = () => {
    return Math.floor(Math.random() * 6) + 1;
}

// Do actions depending on roll. Update dice image and current points text.
const rollDice = () => {
    let randomNumber = randomNumberSix();
    rollNumber++;
    if (randomNumber === 1) {
        currentPoints = 0;
        historyFill(randomNumber);
        isSpiderTurn ? setSnakeTurn() : setSpiderTurn();
        rollNumber = 0;
    } else {
        currentPoints += randomNumber;
        historyFill(randomNumber);
    }
    diceImage.setAttribute('src', `images/${randomNumber}.png`);
    currentPointsText.innerText = `Current : ${currentPoints} ${isSpiderTurn ? '🕷' : '🐍'}`
}

// Add points to global, change player turn and update points text
const hold = () => {
    rollNumber = 0;
    if (isSpiderTurn) {
        spiderPoints += currentPoints;
        if (spiderPoints >= 100) {
            endGame('SPIDER');
        } else {
            spiderPointsText.innerText = `${spiderPoints} 🕷 / 100 🕷`;
            currentPointsText.innerText = 'Current : 0 🐍';
            setSnakeTurn();
        }
    } else {
        snakePoints += currentPoints;
        if (snakePoints >= 100) {
            endGame('SNAKE');
        } else {
            snakePointsText.innerText = `${snakePoints} 🐍 / 100 🐍`;
            currentPointsText.innerText = 'Current : 0 🕷';
            setSpiderTurn();
        }
    }
}

// Events for buttons
rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
cleanBtn.addEventListener('click', cleanHistory);
newGameBtn.addEventListener('click', newGame);