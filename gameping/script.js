const gameArea = document.getElementById('gameArea');
const paddleLeft = document.getElementById('paddleLeft');
const paddleRight = document.getElementById('paddleRight');
const ball = document.getElementById('ball');
const startButton = document.getElementById('startButton');

let paddleLeftY = 160; // Posisi awal paddle kiri
let paddleRightY = 160; // Posisi awal paddle kanan
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

// Fungsi untuk memulai permainan
function startGame() {
    gameArea.style.display = 'block'; // Tampilkan area permainan
    startButton.style.display = 'none'; // Sembunyikan tombol mulai
    gameRunning = true; // Set status permainan menjadi berjalan
    update(); // Mulai pembaruan permainan
}

// Event listener untuk tombol mulai
startButton.addEventListener('click', startGame);

// Kontrol paddle dengan sentuhan
gameArea.addEventListener('touchmove', (event) => {
    const touchY = event.touches[0].clientY - gameArea.getBoundingClientRect().top;

    // Pindahkan paddle kiri atau kanan berdasarkan posisi sentuh
    if (touchY < gameArea.clientHeight / 2) {
        paddleLeftY = touchY - 40; // Pusatkan paddle kiri pada sentuhan
    } else {
        paddleRightY = touchY - 40; // Pusatkan paddle kanan pada sentuhan
    }

    // Pastikan paddle tetap dalam batas
    paddleLeftY = Math.max(0, Math.min(gameArea.clientHeight - 80, paddleLeftY));
    paddleRightY = Math.max(0, Math.min(gameArea.clientHeight - 80, paddleRightY));
});
