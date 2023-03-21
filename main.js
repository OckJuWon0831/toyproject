'use strict';

const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
const gameHelper = document.querySelector('.gameHelper');
const gameStage = document.querySelector('.gameStage');
const gamePause = document.querySelector('.gamePause');
const startIcon = document.querySelector('.fa-play');
const pauseIcon = document.querySelector('.fa-pause');
const carrot = 'src/img/carrot.png';
const bug = 'src/img/bug.png';
const backgroundMusic = new Audio('src/sound/bg.mp3');
const carrotPullMusic = new Audio('src/sound/carrot_pull.mp3');
const bugPullMusic = new Audio('src/sound/bug_pull.mp3');
const gameWin = new Audio('src/sound/game_win.mp3');
const MAX_HEIGHT = Math.floor(window.innerHeight / 2);
let TIME_SEC = 59;
let SCORE_NUM = 0;
let CARROT_NUM = 0;
let IS_GAME_ON;

function gameOver() {
  backgroundMusic.pause();
  gameWin.play();
  alert("Game over!")
  if(SCORE_NUM < 0) {
    alert(`You lose...`);
  } 
  else if(SCORE_NUM > 100) {
    alert(`★★ You Win !!! ★★`); 
    alert(`Score: ${SCORE_NUM}`);
  }
  else alert(`Score: ${SCORE_NUM}`);
  window.location.reload();
}

function claerAssets() {
  while (gameStage.hasChildNodes()){
    gameStage.removeChild( gameStage.firstChild );     
  }  
}

function updateScore() {
  score.innerHTML = score.innerHTML = `<span>Score: ${SCORE_NUM}</span>`;
  if(SCORE_NUM < 0) {
    score.innerHTML = `<span>You Lose!</span>`;
    gameOver();
  }
}

// Target the carrot, when the click event is listened, it will be gone and update score
function clickAsset(event) {
  const childNode = event.target;
  const childNodeKey = event.srcElement.alt;
  const {left, bottom} = childNode.getBoundingClientRect();
  const x = event.clientX - left;
  const y = bottom - event.clientY;

  // Considering width and height of the asset, the target boundary is set
  if(x <= 100 && y <= 100) {
    if(childNodeKey === 'carrot') {
      gameStage.removeChild(childNode);
      carrotPullMusic.play();
      SCORE_NUM++;
      CARROT_NUM--;
      if(CARROT_NUM === 0) {
        claerAssets();
        generateAssets();
      } 
    }
    else if(childNodeKey === 'bug') {
      gameStage.removeChild(childNode);
      bugPullMusic.play();
      SCORE_NUM--;
    }
  }
  updateScore();
}
    
// For generating a total number of bugs/carrots 
function generateRanNumber(min = 20, max = 30) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateAssets() {
  const images = [bug, carrot];
  for (let i = 0; i < generateRanNumber(); i++) { 
    const randomNumber = Math.floor(Math.random() * 2); // Bug or Carrot
    if(randomNumber === 1) CARROT_NUM++; 
    const x = Math.floor(Math.random() * document.documentElement.clientWidth);
    const y = document.documentElement.clientHeight - (Math.floor(Math.random() * document.documentElement.clientHeight))/2;
    const selectedImage = images[randomNumber];
    const img = document.createElement('img');
    img.src = selectedImage;
    img.setAttribute('alt', randomNumber === 0 ? 'bug' : 'carrot'); 
    img.style.position = 'absolute';
    img.style.left = `${x-45}px`;
    img.style.top = `${y-80}px`;
    img.style.width = `90px`;
    img.style.height = `90px`;
    gameStage.appendChild(img);
  }
}

function onTimer() {
  const intervalId = setInterval(() => {
    if(IS_GAME_ON === true) {
    timer.innerHTML = `<span>${TIME_SEC}s</span>`;
    TIME_SEC--;
    if (TIME_SEC < 0) {
      clearInterval(intervalId);
      gameOver();
    }}}, 1000);
}

function gameStart() {
    IS_GAME_ON = true;
    gameBtn.classList.add('hidden');
    gameHelper.classList.remove('hidden');
    generateAssets();
}

gameBtn.addEventListener('click', () => {
  gameStart();
  backgroundMusic.play();
  onTimer();
});

gameStage.addEventListener('click', (event) => {
  clickAsset(event);
})

gamePause.addEventListener('click', () => {
  if(IS_GAME_ON === false) {
    IS_GAME_ON = true;
    backgroundMusic.play();
    gamePause.removeChild(pauseIcon);
    gamePause.appendChild(startIcon);
  }
  else {
    IS_GAME_ON = false;
    backgroundMusic.pause();
    gamePause.removeChild(startIcon);
    gamePause.appendChild(pauseIcon);
  }
  gameStage.classList.toggle('hidden');
})
