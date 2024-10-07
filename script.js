let dino = document.getElementById('dino');
let cactus = document.getElementById('cactus');
let scoreElement = document.getElementById('score');
let highScoreElement = document.createElement('p'); // High Score element
highScoreElement.innerText = "High Score: 0";
document.body.appendChild(highScoreElement);

let isJumping = false;
let isGameOver = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
let gameSpeed = 10;
let cactusInterval;
let scoreInterval;

// Start the game
function startGame() {
    score = 0;
    gameSpeed = 10;
    isGameOver = false;

    moveCactus();
    increaseScore();
}

// Function to handle jumping
function jump() {
    if (isJumping || isGameOver) return;  // Prevent double jump or jumping after game over

    let position = 0;
    isJumping = true;

    // Jump up
    let upInterval = setInterval(() => {
        if (position >= 150) {  // Max jump height
            clearInterval(upInterval);

            // Dino falls back down
            let downInterval = setInterval(() => {
                if (position <= 0) {  // Back on the ground
                    clearInterval(downInterval);
                    isJumping = false;  // Allow jumping again
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

// Jump on spacebar for desktop
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        jump();
    }
});

// Jump on tap for mobile
document.addEventListener('touchstart', function() {
    jump();
});

// Move the cactus (obstacle) and handle collision
function moveCactus() {
    let cactusPosition = 600;

    cactusInterval = setInterval(() => {
        if (cactusPosition < -20) {
            cactusPosition = 600; // Reset cactus position
        }

        // ** Adjusted Collision Detection **
        // Dino's hitbox (50px width) & Cactus hitbox (30px width)
        if (cactusPosition > 50 && cactusPosition < 90 && parseInt(dino.style.bottom) < 40) {
            gameOver();
        }

        cactusPosition -= gameSpeed;
        cactus.style.left = cactusPosition + 'px';
    }, 20);
}

// Constantly increase the score
function increaseScore() {
    scoreInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(scoreInterval);
            return;
        }

        score++;
        scoreElement.innerText = score;

        // Gradually increase game speed
        if (score % 100 === 0) {
            gameSpeed += 1;
        }
    }, 100); // Score increases every 100 milliseconds
}

// End the game and check for high score
function gameOver() {
    clearInterval(cactusInterval);
    clearInterval(scoreInterval);
    isGameOver = true;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    alert('Game Over! Your score is: ' + score);
    window.location.reload();
}

startGame();  // Start the game immediately
