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

// Fungsi untuk memulai permainan
function startGame() {
    gameRunning = true;
    ballX = 392; // Reset posisi bola
    ballY = 192; // Reset posisi bola
    ballSpeedX = 4; // Reset kecepatan bola
    ballSpeedY = 2; // Reset kecepatan bola
    gameArea.style.display = 'block'; // Tampilkan area permainan
    startButton.style.display = 'none'; // Sembunyikan tombol mulai
    update(); // Mulai pembaruan
}

// Fungsi untuk memperbarui posisi bola dan paddle
function update() {
    if (!gameRunning) return; // Jika permainan tidak berjalan, keluar dari fungsi

    // Update posisi bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Deteksi tabrakan dengan dinding atas dan bawah
    if (ballY <= 0 || ballY >= 385) {
        ballSpeedY = -ballSpeedY; // Balik arah bola
    }

   
