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
let spiderPoints = 90;
let currentPoints = 0;

// Dice image
let diceImage = document.getElementById('diceImage');

// Player turn
let isSpiderTurn = true;

// Players sections
let spiderSection = document.getElementById('spiderSection');
let snakeSection = document.getElementById('snakeSection');

const setSpiderTurn = () => {
    currentPoints = 0;
    isSpiderTurn = true;
    snakeSection.classList.remove('border-primary');
    snakeSection.classList.add('border-dark');
    spiderSection.classList.remove('border-dark');
    spiderSection.classList.add('border-primary');
}

const setSnakeTurn = () => {
    currentPoints = 0;
    isSpiderTurn = false;
    spiderSection.classList.remove('border-primary');
    spiderSection.classList.add('border-dark');
    snakeSection.classList.remove('border-dark');
    snakeSection.classList.add('border-primary');
}

const endGame = (winner) => {
    alert(winner + ' WINNER !!');
    newGame();
}

const newGame = () => {
    currentPoints = 0;
    snakePoints = 0;
    spiderPoints = 0;
    spiderPointsText.innerText = '0 🕷 / 100 🕷';
    snakePointsText.innerText = '0 🐍 / 100 🐍';
    currentPointsText.innerText = 'Current : 0 🕷';
}

const randomNumberSix = () => {
    return Math.floor(Math.random() * 6) + 1;
}

const rollDice = () => {
    let randomNumber = randomNumberSix();
    switch (randomNumber) {
        case 1:
            isSpiderTurn ? setSnakeTurn() : setSpiderTurn();
            break;
        case 2:
            currentPoints += 2;
            break;
        case 3:
            currentPoints += 3;
            break;
        case 4:
            currentPoints += 4;
            break;
        case 5:
            currentPoints += 5;
            break;
        default: 
            currentPoints += 6;
            break;
    }
    diceImage.setAttribute('src', `images/${randomNumber}.png`);
    currentPointsText.innerText = `Current : ${currentPoints} ${isSpiderTurn ? '🕷' : '🐍'}`
}

const hold = () => {
    if (isSpiderTurn) {
        spiderPoints += currentPoints;
        if (spiderPoints >= 100) {
            endGame('SPIDER');
        }
        spiderPointsText.innerText = `${spiderPoints} 🕷 / 100 🕷`;
        currentPointsText.innerText = 'Current : 0 🐍';
        setSnakeTurn();
    } else {
        snakePoints += currentPoints;
        if (snakePoints >= 100) {
            endGame('SNAKE');
        }
        snakePointsText.innerText = `${snakePoints} 🐍 / 100 🐍`;
        currentPointsText.innerText = 'Current : 0 🕷';
        setSpiderTurn();
    }
}

const cleanHistory = () => {

}

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', hold);
cleanBtn.addEventListener('click', cleanHistory);
newGameBtn.addEventListener('click', newGame);