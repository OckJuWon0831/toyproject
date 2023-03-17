const gameBtn = document.querySelector('.gameBtn');
const GAME_TIME = 60000; // 60seconds for game

function isGameOver() {
    // Game over conditions:
    // 1. when the player kills all the bugs => you win!
    
    // 2. when the player kills any carrot => you lose!

    // 3. when timeout => you lose!
    setTimeout(() => {
        alert("Game over!");
        window.location.reload();
    }, GAME_TIME); 
}

function gameStart(e) {
    // Game start!
    gameBtn.classList.add('hidden');
    isGameOver();
}

gameBtn.addEventListener('click', gameStart);