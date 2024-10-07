let dino = document.getElementById('dino');
let cactus = document.getElementById('cactus');
let scoreElement = document.getElementById('score');
let isJumping = false;
let isGameOver = false;
let score = 0;

// Dino jump mechanics
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' && !isJumping) {
        jump();
    }
});

function jump() {
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Dino coming back down
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
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

// Move the cactus (obstacle) with JavaScript
function moveCactus() {
    let cactusPosition = 600; // Start cactus off-screen
    let gameSpeed = 10;

    let cactusInterval = setInterval(() => {
        if (cactusPosition < -20) {
            // Cactus has gone off the left side of the screen
            cactusPosition = 600; // Reset cactus position
            score++;
            scoreElement.innerText = score;
            gameSpeed *= 1.02; // Gradually increase speed
        }

        // Check for collision (simple bounding box check)
        if (cactusPosition > 50 && cactusPosition < 90 && !isJumping) {
            clearInterval(cactusInterval);
            alert('Game Over! Your score is: ' + score);
            isGameOver = true;
            window.location.reload();
        }

        cactusPosition -= gameSpeed;
        cactus.style.left = cactusPosition + 'px';
    }, 20);
}

moveCactus();
