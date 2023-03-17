const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
const gameStage = document.querySelector('.gameStage');

const carrot = 'src/img/carrot.png';
const bug = 'src/img/bug.png';
const MAX_HEIGHT = Math.floor(window.innerHeight / 2);
let TIME_SEC = 59;
const backgroundMusic = new Audio('src/sound/bg.mp3');
const gameWin = new Audio('src/sound/game_win.mp3');

function isGameOver() {
    // Game over conditions:
    // 1. when the player kills all the bugs => you win!
    
    // 2. when the player kills any carrot => you lose!
}

// For generating a number of bugs/carrots 
function generateRanNumber(min = 20, max = 30) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateAssets() {
  const images = [bug, carrot];
  for (let i = 0; i < generateRanNumber(); i++) { 
    const randomNumber = Math.floor(Math.random() * 2); 
    const x = Math.floor(Math.random() * document.documentElement.clientWidth);
    const y = (Math.floor(Math.random() * document.documentElement.clientHeight))/2;
    const selectedImage = images[randomNumber];

    const img = document.createElement('img');
    img.src = selectedImage;
    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.bottom = `${y}px`;
    img.style.width = `100px`;
    img.style.height = `100px`;
    document.body.appendChild(img);
  }
}

function gameEndSound() {
  backgroundMusic.pause();
  gameWin.play();
}

function onTimer() {
  const intervalId = setInterval(() => {
    timer.innerHTML = `<span>${TIME_SEC}s</span>`;
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
    score.classList.remove('hidden');
    generateAssets();
    // isGameOver();
}

gameBtn.addEventListener('click', (event) => {
  gameStart();
  backgroundMusic.play();
  onTimer();
});
