// Элементы
const bars = document.querySelectorAll(".bar");
const coefficientDisplay = document.getElementById("coefficient");
const progressLine = document.querySelector(".line");
const frogGif = document.querySelector(".main-frog-wrapper-container__icon");

// Константы
const LINE_WIDTH = 380;
const FROG_Y_OFFSET = 0;
const MAX_LIFT_HEIGHT = 120;
const GAME_SPEED = 200;
const OFFSET_FROG = 18;

// Инициализация
coefficientDisplay.style.opacity = "0";
frogGif.style.opacity = "0";
frogGif.style.display = "block";
frogGif.style.position = "absolute";
frogGif.style.left = "0px";
frogGif.style.bottom = `${FROG_Y_OFFSET}px`;
frogGif.style.transition = "left 0.3s linear, bottom 0.4s ease-out, transform 0.3s ease";
frogGif.style.transform = "scale(0.7)";

// Анимация появления полосок
bars.forEach(function (bar, index) {
  setTimeout(function () {
    bar.style.opacity = "1";
    bar.style.transform = "translateY(0)";
  }, (index + 1) * 300);
});

// Переменные игры вне цикла
let currentCoefficient = 1.0;
let gameInterval;
let isGameActive = false;

setTimeout(startGame, 2500);

function startGame() {
  currentCoefficient = 1.0;
  coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;
  coefficientDisplay.style.color = "#ffffff";
  coefficientDisplay.style.opacity = "1";

  progressLine.style.width = "0%";
  progressLine.style.transform = "rotate(0deg)";
  progressLine.style.opacity = "1";

  frogGif.style.opacity = "0";
  frogGif.style.left = "0px";
  frogGif.style.bottom = `${FROG_Y_OFFSET}px`;
  frogGif.style.transform = "scale(0.7)";

  isGameActive = true;
  gameInterval = setInterval(updateGameState, GAME_SPEED);
}

function updateGameState() {
  if (!isGameActive) return;

  // Увеличиваем коэффициент с нормальным числом, а не строкой
  currentCoefficient = parseFloat(currentCoefficient) + 0.005;
  coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;

  if (currentCoefficient >= 1.2 && currentCoefficient <= 1.4) {
    const progress = (currentCoefficient - 1.2) / 0.2;
    progressLine.style.width = "100%";
    progressLine.style.transform = "rotate(0deg)";

    frogGif.style.left = `${progress * LINE_WIDTH}px`;
    frogGif.style.bottom = `${FROG_Y_OFFSET}px`;
    frogGif.style.opacity = "1";
    frogGif.style.transform = "scale(0.7)";
  } else if (currentCoefficient > 1.4) {
  const liftProgress = Math.min((currentCoefficient - 1.4) / 0.25, 1);
  const currentLiftHeight = liftProgress * MAX_LIFT_HEIGHT;

  progressLine.style.width = "100%";
  progressLine.style.transform = `rotate(-${liftProgress * 15}deg)`;

  frogGif.style.left = `${LINE_WIDTH}px`;

  // Смещаем жабу ниже линии
  const newBottom = progressLine.offsetTop + currentLiftHeight - OFFSET_FROG;
  frogGif.style.bottom = `${Math.min(newBottom, progressLine.offsetTop + MAX_LIFT_HEIGHT - OFFSET_FROG)}px`;

  frogGif.style.transform = `scale(${0.7 - liftProgress * 0.1})`;
  frogGif.style.opacity = "1";
}

  if (currentCoefficient > 1.5 && Math.random() < 0.05) {
    stopGame();
  }
}

function stopGame() {
  isGameActive = false;
  clearInterval(gameInterval);
  coefficientDisplay.style.color = "#ff0000";

  setTimeout(function () {
    coefficientDisplay.style.opacity = "0";
    progressLine.style.opacity = "0";
    frogGif.style.opacity = "0";
    setTimeout(startGame, 3000);
  }, 800);
}
