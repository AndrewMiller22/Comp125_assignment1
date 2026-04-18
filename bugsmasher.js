const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const resetSpeedBtn = document.getElementById("resetSpeedBtn");

let score = 0;
let speed = 1500;
const initialSpeed = 1500;

let timeLeft = 30;
let gameRunning = true;

const bug = {
  x: 100,
  y: 100,
  radius: 20
};

let moveTimer;
let countdownTimer;

function drawBug() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameRunning) {
    ctx.font = "36px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
    return;
  }

  // bug body
  ctx.beginPath();
  ctx.arc(bug.x, bug.y, bug.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();

  // bug head
  ctx.beginPath();
  ctx.arc(bug.x, bug.y - 18, 10, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  // bug spots
  ctx.beginPath();
  ctx.arc(bug.x - 7, bug.y - 5, 3, 0, Math.PI * 2);
  ctx.arc(bug.x + 7, bug.y + 5, 3, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function moveBug() {
  if (!gameRunning) return;

  bug.x = Math.random() * (canvas.width - 60) + 30;
  bug.y = Math.random() * (canvas.height - 60) + 30;
  drawBug();
}

function startBugMovement() {
  clearInterval(moveTimer);
  moveTimer = setInterval(moveBug, speed);
}

function updateScore() {
  scoreDisplay.textContent = "Score: " + score;
}

function updateTimer() {
  timerDisplay.textContent = "Time Left: " + timeLeft + "s";
}

function startCountdown() {
  clearInterval(countdownTimer);
  countdownTimer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimer();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameRunning = false;
  clearInterval(moveTimer);
  clearInterval(countdownTimer);
  drawBug();
}

function resetGame() {
  score = 0;
  speed = initialSpeed;
  timeLeft = 30;
  gameRunning = true;

  updateScore();
  updateTimer();
  moveBug();
  startBugMovement();
  startCountdown();
}

function smashBug(clientX, clientY) {
  if (!gameRunning) return;

  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  const dx = x - bug.x;
  const dy = y - bug.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= bug.radius + 10) {
    score++;
    updateScore();

    if (speed > 400) {
      speed -= 100;
    }

    moveBug();
    startBugMovement();
  }
}

// mouse
canvas.addEventListener("click", function (event) {
  smashBug(event.clientX, event.clientY);
});

// pointer
canvas.addEventListener("pointerdown", function (event) {
  smashBug(event.clientX, event.clientY);
});

// touch
canvas.addEventListener("touchstart", function (event) {
  event.preventDefault();
  const touch = event.touches[0];
  smashBug(touch.clientX, touch.clientY);
});

// keyboard
document.addEventListener("keydown", function (event) {
  if (event.key === " " && gameRunning) {
    score++;
    updateScore();
    moveBug();
  }
});

resetScoreBtn.addEventListener("click", function () {
  resetGame();
});

resetSpeedBtn.addEventListener("click", function () {
  speed = initialSpeed;
  startBugMovement();
});

// start game
updateScore();
updateTimer();
moveBug();
startBugMovement();
startCountdown();
