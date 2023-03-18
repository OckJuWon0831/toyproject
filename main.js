const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
const gameStage = document.querySelector('.gameStage');

const carrot = 'src/img/carrot.png';
const bug = 'src/img/bug.png';
const MAX_HEIGHT = Math.floor(window.innerHeight / 2);
let TIME_SEC = 59;
let scoreNum = 0;
const backgroundMusic = new Audio('src/sound/bg.mp3');
const carrotPullMusic = new Audio('src/sound/carrot_pull.mp3');
const bugPullMusic = new Audio('src/sound/bug_pull.mp3');
const gameWin = new Audio('src/sound/game_win.mp3');

function isGameOver() {
    // Game over conditions:
    // 1. when the player kills all the bugs => you win!
    
    // 2. when the player kills any carrot => you lose!
}

// Target the carrot, when the click event is listened, it will be gone and update score
function clickAsset(event) {
  const childNode = event.target;
  const childNodeKey = event.srcElement.alt;
  const {left, bottom} = childNode.getBoundingClientRect();
  const x = event.clientX - left;
  const y = bottom - event.clientY;

  // Considering width and height of the asset, the target boundary is set
  if(x <= 90 && y <= 90) {
    if(childNodeKey === 'carrot') {
      gameStage.removeChild(childNode);
      carrotPullMusic.play();
      scoreNum++;
    }
    else if(childNodeKey === 'bug') {
      gameStage.removeChild(childNode);
      bugPullMusic.play();
      scoreNum--;
    }
  }
  score.innerHTML = score.innerHTML = `<span>${scoreNum}</span>`;
}
    
// For generating a number of bugs/carrots 
function generateRanNumber(min = 20, max = 30) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateAssets() {
  const images = [bug, carrot];
  for (let i = 0; i < generateRanNumber(); i++) { 
    const randomNumber = Math.floor(Math.random() * 2); // 0 or 1
    const x = Math.floor(Math.random() * document.documentElement.clientWidth);
    const y = (Math.floor(Math.random() * document.documentElement.clientHeight))/2;
    const selectedImage = images[randomNumber];

    const img = document.createElement('img');
    img.src = selectedImage;

    img.setAttribute('alt', randomNumber === 0 ? 'bug' : 'carrot'); 
    img.style.position = 'absolute';
    img.style.left = `${x}px`;
    img.style.bottom = `${y}px`;
    img.style.width = `90px`;
    img.style.height = `90px`;
    gameStage.appendChild(img);
  }

  gameStage.addEventListener('click', (event) => {
    clickAsset(event);
  })
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
