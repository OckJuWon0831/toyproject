const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const gameStage = document.querySelector('.gameStage');

const carrot = '\src\img\carrot.png';
const bug = '\src\img\bug.png';
const MAX_HEIGHT = Math.floor(window.innerHeight / 2);
let TIME_SEC = 59;

function isGameOver() {
    // Game over conditions:
    // 1. when the player kills all the bugs => you win!
    
    // 2. when the player kills any carrot => you lose!
}

// // Until 10, generate random bug and carrot generating numbers
// function generateNumber() {
//     const bugNum = Math.floor(Math.random() * (max - min + 1) + min);

// }

function onTimer() {
  const intervalId = setInterval(() => {
    const timeShow = TIME_SEC % 60;
    TIME_SEC--;
    timer.innerHTML = `<span>${timeShow}</span>`;
    if (TIME_SEC < 0) {
      clearInterval(intervalId);
      window.location.reload();
      alert("Game over!");
    }}, 1000);
}

function gameStart(e) {
    gameBtn.classList.add('hidden');
    timer.classList.remove('hidden');
    onTimer();
    isGameOver();
}

gameBtn.addEventListener('click', gameStart);
