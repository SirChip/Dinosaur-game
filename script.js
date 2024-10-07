let dino = document.getElementById('dino');
let cactus = document.getElementById('cactus');
let scoreElement = document.getElementById('score');
let isJumping = false;
let score = 0;

// Function to handle jumping
function jump() {
    if (isJumping) return;  // Prevent double jump

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

// Jump on **spacebar** for desktop
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        jump();
    }
});

// Jump on **tap** for mobile
document.addEventListener('touchstart', function() {
    jump();
});

// Move the cactus (obstacle)
function moveCactus() {
    let cactusPosition = 600;
    let gameSpeed = 10;

    let cactusInterval = setInterval(() => {
        if (cactusPosition < -20) {
            cactusPosition = 600;  // Reset cactus position when it goes off screen
            score++;
            scoreElement.innerText = score;
        }

        // Check for collision
        if (cactusPosition > 50 && cactusPosition < 90 && !isJumping) {
            clearInterval(cactusInterval);
            alert('Game Over! Your score is: ' + score);
            window.location.reload();
        }

        cactusPosition -= gameSpeed;
        cactus.style.left = cactusPosition + 'px';
    }, 20);
}

moveCactus();
