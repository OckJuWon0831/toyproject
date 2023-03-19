const gameBtn = document.querySelector('.gameBtn');
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');
const gameStage = document.querySelector('.gameStage');
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

function gameOver() {
  backgroundMusic.pause();
  gameWin.play();
  alert("Game over!")
  alert(`Score: ${SCORE_NUM}`);
  window.location.reload();
}

function claerAssets() {
  while ( gameStage.hasChildNodes() ){
    gameStage.removeChild( gameStage.firstChild );     
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
  if(x <= 90 && y <= 90) {
    if(childNodeKey === 'carrot') {
      gameStage.removeChild(childNode);
      carrotPullMusic.play();
      SCORE_NUM++;
      CARROT_NUM--;
      if(CARROT_NUM === 0) {
        claerAssets();
        generateAssets();
        console.log(CARROT_NUM);
      } 
    }
    else if(childNodeKey === 'bug') {
      gameStage.removeChild(childNode);
      bugPullMusic.play();
      SCORE_NUM--;
    }
  }
  score.innerHTML = score.innerHTML = `<span>${SCORE_NUM}</span>`;
  if(SCORE_NUM < 0) {
    score.innerHTML = score.innerHTML = `<span>You Lose!</span>`;
    gameOver();
  }
}
    
// For generating a number of bugs/carrots 
function generateRanNumber(min = 20, max = 30) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateAssets() {
  const images = [bug, carrot];
  // generating carrot
  for (let i = 0; i < generateRanNumber(); i++) { 
    const randomNumber = Math.floor(Math.random() * 2); // 0 or 1
    if(randomNumber === 1) CARROT_NUM++; 
    const x = Math.floor(Math.random() * document.documentElement.clientWidth);
    const y = document.documentElement.clientHeight - (Math.floor(Math.random() * document.documentElement.clientHeight))/2;
    const selectedImage = images[randomNumber];

    const img = document.createElement('img');
    img.src = selectedImage;
    img.setAttribute('alt', randomNumber === 0 ? 'bug' : 'carrot'); 
    img.style.position = 'absolute';
    img.style.left = `${x-90}px`;
    img.style.top = `${y-90}px`;
    img.style.width = `90px`;
    img.style.height = `90px`;
    gameStage.appendChild(img);
  }
}

function onTimer() {
  const intervalId = setInterval(() => {
    timer.innerHTML = `<span>${TIME_SEC}s</span>`;
    TIME_SEC--;
    if (TIME_SEC < 0) {
      clearInterval(intervalId);
      gameOver();
    }}, 1000);
}

function gameStart(e) {
    gameBtn.classList.add('hidden');
    timer.classList.remove('hidden');
    score.classList.remove('hidden');
    generateAssets();
}

gameBtn.addEventListener('click', (event) => {
  gameStart(event);
  backgroundMusic.play();
  onTimer();
});

gameStage.addEventListener('click', (event) => {
  clickAsset(event);
})

