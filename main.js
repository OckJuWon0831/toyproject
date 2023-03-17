const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const gameStage = document.querySelector('.gameStage');

const carrot = '\src\img\carrot.png';
const bug = '\src\img\bug.png';
const MAX_HEIGHT = Math.floor(window.innerHeight / 2);
let TIME_SEC = 9;
const backgroundMusic = new Audio('src/sound/bg.mp3');
const gameWin = new Audio('src/sound/game_win.mp3');

function isGameOver() {
    // Game over conditions:
    // 1. when the player kills all the bugs => you win!
    
    // 2. when the player kills any carrot => you lose!
}

// // Until 10, generate random bug and carrot generating numbers
// function generateNumber() {
//     const bugNum = Math.floor(Math.random() * (max - min + 1) + min);

// }

function gameEndSound() {
  backgroundMusic.pause();
  gameWin.play();
}

function onTimer() {
  const intervalId = setInterval(() => {
    timer.innerHTML = `<span>${TIME_SEC}</span>`;
    TIME_SEC--;
    if (TIME_SEC < 0) {
      clearInterval(intervalId);
      gameEndSound();
      alert("Game over!");
      window.location.reload();
    }}, 1000);
}

function gameStart(e) {
    gameBtn.classList.add('hidden');
    timer.classList.remove('hidden');
    
    // isGameOver();
}

gameBtn.addEventListener('click', (event) => {
  gameStart();
  backgroundMusic.play();
  onTimer();
});
