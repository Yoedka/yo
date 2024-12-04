const gameArea = document.getElementById('gameArea');
const paddleLeft = document.getElementById('paddleLeft');
const paddleRight = document.getElementById('paddleRight');
const ball = document.getElementById('ball');

let paddleLeftY = 160; // Posisi awal paddle kiri
let paddleRightY = 160; // Posisi awal paddle kanan
let ballX = 392; // Posisi awal bola
let ballY = 192; // Posisi awal bola
let ballSpeedX = 4; // Kecepatan bola di sumbu X
let ballSpeedY = 2; // Kecepatan bola di sumbu Y

function update() {
    // Update posisi bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Deteksi tabrakan dengan dinding atas dan bawah
    if (ballY <= 0 || ballY >= 385) {
        ballSpeedY = -ballSpeedY; // Balik arah bola
    }

    // Deteksi tabrakan dengan paddle kiri
    if (ballX <= 10 && ballY >= paddleLeftY && ballY <= paddleLeftY + 80) {
        ballSpeedX = -ballSpeedX; // Balik arah bola
    }

    // Deteksi tabrakan dengan paddle kanan
    if (ballX >= 780 && ballY >= paddleRightY && ballY <= paddleRightY + 80) {
        ballSpeedX = -ballSpeedX; // Balik arah bola
    }

    // Reset bola jika keluar dari area permainan
    if (ballX < 0 || ballX > 800) {
        ballX = 392; // Reset posisi bola
        ballY = 192;
        ballSpeedX = 4; // Reset kecepatan bola
        ballSpeedY = 2;
    }

    // Update posisi bola di layar
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Update posisi paddle
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';

    requestAnimationFrame(update);
}

// Kontrol paddle
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && paddleRightY > 0) {
        paddleRightY -= 20; // Gerakkan paddle kanan ke atas
    } else if (event.key === 'ArrowDown'
