const gameArea = document.getElementById('gameArea');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const startButton = document.getElementById('startButton');

let paddleY = 160; // Posisi awal paddle
let ballX = 392; // Posisi awal bola
let ballY = 192; // Posisi awal bola
let ballSpeedX = 4; // Kecepatan bola di sumbu X
let ballSpeedY = 2; // Kecepatan bola di sumbu Y
let gameRunning = false; // Status permainan

function update() {
    // Update posisi bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Deteksi tabrakan dengan dinding atas dan bawah
    if (ballY <= 0 || ballY >= 385) {
        ballSpeedY = -ballSpeedY; // Balik arah bola
    }

    // Deteksi tabrakan dengan paddle
    if (ballX <= 10 && ballY >= paddleY && ballY <= paddleY + 80) {
        ballSpeedX = -ballSpeedX; // Balik arah bola
    }

    // Update posisi bola di layar
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Jika bola keluar dari area permainan
    if (ballX < 0 || ballX > 800) {
        resetGame();
    }
}

function resetGame() {
    ballX = 392; // Reset posisi bola
    ballY = 192; // Reset posisi bola
    ballSpeedX = 4; // Reset kecepatan bola
   
