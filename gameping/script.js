const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const gameArea = document.getElementById('gameArea');
const startButton = document.getElementById('startButton');

let ballDirectionX = 2; // Kecepatan bola di sumbu X
let ballDirectionY = 2; // Kecepatan bola di sumbu Y
let paddleSpeed = 20; // Kecepatan paddle
let paddlePosition = gameArea.offsetWidth / 2 - paddle.offsetWidth / 2; // Posisi awal paddle
let gameInterval; // Variabel untuk menyimpan interval permainan

function moveBall() {
    let ballRect = ball.getBoundingClientRect();
    let paddleRect = paddle.getBoundingClientRect();
    let gameAreaRect = gameArea.getBoundingClientRect();

    // Gerakan bola
    ball.style.left = (ball.offsetLeft + ballDirectionX) + 'px';
    ball.style.top = (ball.offsetTop + ballDirectionY) + 'px';

    // Deteksi tabrakan dengan dinding
    if (ball.offsetLeft <= 0 || ball.offsetLeft + ballRect.width >= gameAreaRect.width) {
        ballDirectionX = -ballDirectionX; // Balik arah
    }
    if (ball.offsetTop <= 0) {
        ballDirectionY = -ballDirectionY; // Balik arah
    }

    // Deteksi tabrakan dengan paddle
    if (ball.offsetTop + ballRect.height >= paddleRect.top && 
        ball.offsetLeft + ballRect.width >= paddleRect.left && 
        ball.offsetLeft <= paddleRect.right) {
        ballDirectionY = -ballDirectionY; // Balik arah
    }

    // Jika bola jatuh di bawah
    if (ball.offsetTop + ballRect.height >= gameAreaRect.height) {
        alert("Game Over!");
        clearInterval(gameInterval); // Hentikan permainan
        ball.style.display = 'none'; // Sembunyikan bola
        startButton.style.display = 'block'; // Tampilkan tombol mulai
    }
}

function movePaddle(event) {
    if (event.key === 'ArrowLeft' && paddlePosition > 0) {
        paddlePosition -= paddleSpeed;
    } else if (event.key === 'ArrowRight' && paddlePosition < (gameArea.offsetWidth - paddle.offsetWidth)) {
        paddlePosition += paddleSpeed;
    }
    paddle.style.left = paddlePosition +
