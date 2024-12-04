const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Menyesuaikan ukuran canvas dengan ukuran layar
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Parameter untuk paddle dan bola
let paddleWidth = 10, paddleHeight = 100;
let paddleY = (canvas.height - paddleHeight) / 2;
let ballRadius = 8;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
const paddleSpeed = 6;
let gameStarted = false;
let score = 0;  // Skor pemain
let level = 1;  // Level permainan

// Tombol Start Game
const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);  // Menambahkan event listener ke tombol start

// Fungsi untuk menggambar bola
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.closePath();
}

// Fungsi untuk menggambar paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(0, paddleY, paddleWidth, paddleHeight); // Paddle hanya ada di sisi kiri
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.closePath();
}

// Fungsi untuk menggambar garis tengah
function drawCenterLine() {
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.closePath();
}

// Fungsi untuk memperbarui posisi bola
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Deteksi tabrakan dengan dinding atas/bawah
  if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Deteksi tabrakan dengan paddle kiri (hanya satu paddle)
  if (ballX - ballRadius <= paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    increaseScore();  // Menambah skor setiap kali bola mengenai paddle
  }

  // Deteksi bola keluar dari layar
  if (ballX - ballRadius <= 0) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 4;  // Reset kecepatan bola
    ballSpeedY = 4;
    level = 1;  // Reset level kembali ke 1
    paddleWidth = 10;
    paddleHeight = 100;
  }
}

// Fungsi untuk menggambar skor dan level
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('Level: ' + level, canvas.width - 100, 30);
}

// Fungsi untuk meningkatkan level permainan
function increaseLevel() {
  if (score >= 10 * level) {  // Setiap 10 poin, naik ke level berikutnya
    level++;
    ballSpeedX += 1;  // Meningkatkan kecepatan bola
    ballSpeedY += 1;
    paddleWidth = 10 + level * 2;  // Mengurangi ukuran paddle seiring bertambahnya level
    paddleHeight = 100 - level * 10;
  }
}

// Fungsi untuk meningkatkan skor
function increaseScore() {
  score++;
  increaseLevel();  // Periksa apakah level harus dinaikkan
}

// Fungsi utama untuk menggambar seluruh elemen permainan
function draw() {
  if (!gameStarted) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("Click 'Start Game' to begin!", canvas.width / 4, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawCenterLine();
  drawScore();

  updateBall();

  requestAnimationFrame(draw);
}

// Fungsi untuk memulai permainan
function startGame() {
  gameStarted = true;
  score = 0;  // Reset skor
  level = 1;  // Reset level
  ballSpeedX = 4;  // Set kecepatan bola di level pertama
  ballSpeedY = 4;
  startBtn.style.display = 'none';  // Sembunyikan tombol setelah permainan dimulai
  draw();  // Mulai menggambar permainan
}

// Event listener untuk kontrol keyboard (paddle naik/turun)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && paddleY > 0) {
    paddleY -= paddleSpeed;
  } else if (e.key === 'ArrowDown' && paddleY + paddleHeight < canvas.height) {
    paddleY += paddleSpeed;
  }
});

// Event listener untuk kontrol sentuhan layar
let touchStartY = 0;
let touchMoveY = 0;

// Ketika sentuhan dimulai
canvas.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;  // Menyimpan posisi awal sentuhan
});

// Ketika jari digeser di layar
canvas.addEventListener('touchmove', (e) => {
  touchMoveY = e.touches[0].clientY;  // Mendapatkan posisi sentuhan yang sedang bergerak
  let touchDeltaY = touchMoveY - touchStartY;

  // Menggerakkan paddle berdasarkan sentuhan
  if (touchDeltaY < 0 && paddleY > 0) {
    paddleY -= paddleSpeed; // Geser paddle ke atas
  } else if (touchDeltaY > 0 && paddleY + paddleHeight < canvas.height) {
    paddleY += paddleSpeed; // Geser paddle ke bawah
  }

  touchStartY = touchMoveY;  // Memperbarui posisi sentuhan untuk pergerakan selanjutnya
});

// Mulai permainan
draw();
