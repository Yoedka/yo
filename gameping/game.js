// Mendapatkan elemen canvas dan tombol
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const levelDisplay = document.getElementById('levelDisplay');
const scoreDisplay = document.getElementById('scoreDisplay');
const leaderboardList = document.getElementById('leaderboardList');

let paddleWidth = 100, paddleHeight = 10;
let ballRadius = 10;
let paddleX;
let ballX, ballY, ballDX, ballDY;
let leftPressed = false, rightPressed = false;
let score = 0;
let level = 1;
let gameInterval;
let leaderboard = [];

// Menginisialisasi permainan
function initGame() {
  paddleX = (canvas.width - paddleWidth) / 2;
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballDX = (Math.random() > 0.5 ? 2 : -2);
  ballDY = -2;
  score = 0;
  updateDisplay();
}

// Mengupdate tampilan skor dan level
function updateDisplay() {
  scoreDisplay.innerHTML = `Score: ${score}`;
  levelDisplay.innerHTML = `Level: ${level}`;
}

// Menggambar paddle dan bola
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Menggambar paddle
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  
  // Menggambar bola
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();

  // Gerakan bola
  ballX += ballDX;
  ballY += ballDY;

  // Deteksi tabrakan bola dengan dinding
  if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
  }
  if (ballY + ballDY < ballRadius) {
    ballDY = -ballDY;
  } else if (ballY + ballDY > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballDY = -ballDY;
      score += 10;
      if (score % 50 === 0) {
        level++;
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 1000 / (10 + level)); // Meningkatkan kecepatan
      }
    } else {
      gameOver();
    }
  }

  // Gerakkan paddle
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

// Menangani tombol tekan
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// Menyimpan skor ke leaderboard
function gameOver() {
  const playerName = prompt("Game Over! Masukkan nama Anda:");
  if (playerName) {
    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
  }
  clearInterval(gameInterval);
  initGame();
}

// Mengupdate leaderboard
function updateLeaderboard() {
  leaderboardList.innerHTML = '';
  leaderboard.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
    leaderboardList.appendChild(li);
  });
}

// Memulai permainan
function startGame() {
  initGame();
  gameInterval = setInterval(gameLoop, 1000 / level);
  startBtn.style.display = 'none';
}

// Game loop
function gameLoop() {
  draw();
}

// Mengambil leaderboard dari localStorage
function loadLeaderboard() {
  const storedLeaderboard = localStorage.getItem('leaderboard');
  if (storedLeaderboard) {
    leaderboard = JSON.parse(storedLeaderboard);
  }
  updateLeaderboard();
}

// Event Listeners
startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

// Memuat leaderboard ketika pertama kali dibuka
loadLeaderboard();
  
