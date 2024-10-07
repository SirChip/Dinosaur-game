let dino = document.getElementById('dino');
let cactus = document.getElementById('cactus');
let scoreElement = document.getElementById('score');
let isJumping = false;
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

// Score updates based on cactus position reset
function updateScore() {
    setInterval(() => {
        // Increment score if the cactus reaches the start (loops back)
        if (parseInt(window.getComputedStyle(cactus).getPropertyValue('right')) >= 590) {
            score++;
            scoreElement.innerText = score;
        }
    }, 100);
}

updateScore();
