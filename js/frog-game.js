// Элементы
const bars = document.querySelectorAll(".bar");
const coefficientDisplay = document.getElementById("coefficient");
const progressLine = document.querySelector(".line");
const frogGif = document.querySelector(".main-frog-wrapper-container__icon");
const historySlider = document.getElementById("history-slider");

// Константы
const LINE_WIDTH = 380;
const BASE_GAME_SPEED = 200; // базовая задержка в миллисекундах
const maxHistoryItems = 30;
const scrollSpeed = 1; // пикселей за тик

// Инициализация
coefficientDisplay.style.opacity = "0";
frogGif.style.opacity = "0";
frogGif.style.display = "block"; // если изначально display: none

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

// Генерация "серии" коэффициентов с балансом
let seriesQueue = [];
let seriesIndex = 0;

function generateCrashCoefficient() {
  if (seriesIndex >= seriesQueue.length) {
    seriesQueue = [];
    const seriesTypeRoll = Math.random();

    if (seriesTypeRoll < 0.6) {
      // Плохая серия — чаще краши 1.0-2.5
      const length = Math.floor(Math.random() * 3) + 2; // 2-4 краша
      for (let i = 0; i < length; i++) {
        const coef = 1 + Math.random() * 1.5 * Math.pow(Math.random(), 2);
        seriesQueue.push(parseFloat(coef.toFixed(2)));
      }
    } else {
      // Хорошая серия — 2.0+
      const length = Math.floor(Math.random() * 5) + 1; // 1-5 коэфов
      for (let i = 0; i < length; i++) {
        let coef;
        if (Math.random() < 0.3) {
          coef = 3.5 + Math.random() * 11.5;
        } else {
          coef = 2.0 + Math.random() * 2.0;
        }
        seriesQueue.push(parseFloat(coef.toFixed(2)));
      }
    }
    seriesIndex = 0;
  }
  return seriesQueue[seriesIndex++];
}

function getSpeedByCoefficient(coef) {
  if (coef < 2) return 0.01;
  if (coef < 3) return 0.02;
  if (coef < 5) return 0.04;
  return 0.06;
}

setTimeout(startGame, 2500);

function startGame() {
  currentCoefficient = 1.0;
  coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;
  coefficientDisplay.style.color = "#ffffff";
  coefficientDisplay.style.opacity = "1";

  progressLine.style.width = "0%";
  progressLine.style.transform = "rotate(0deg)";
  progressLine.style.opacity = "1";
  progressLine.style.backgroundImage = "linear-gradient(135deg, #6a0dad, #b366ff)"; // фиолетовый градиент

  frogGif.style.opacity = "0";
  frogGif.style.left = "0px";
  frogGif.style.transform = "translateX(-50%) scale(0.7)";
  frogGif.style.display = "block";

  isGameActive = true;

  const crashAt = generateCrashCoefficient();

  gameInterval = setInterval(() => updateGameState(crashAt), BASE_GAME_SPEED);
}

function updateGameState(crashAt) {
  if (!isGameActive) return;

  const speed = getSpeedByCoefficient(currentCoefficient);
  currentCoefficient = parseFloat((currentCoefficient + speed).toFixed(2));
  coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;

  if (currentCoefficient >= 1.2 && currentCoefficient <= 1.4) {
    const progress = (currentCoefficient - 1.2) / 0.2;
    progressLine.style.width = `${progress * 100}%`;
    progressLine.style.transform = "rotate(0deg)";

    frogGif.style.left = `${progress * 100}%`;
    frogGif.style.opacity = "1";
    frogGif.style.transform = "translateX(-50%) scale(0.7)";
  } else if (currentCoefficient > 1.4) {
    const liftProgress = Math.min((currentCoefficient - 1.4) / 0.25, 1);
    const extraDistance = 80;

    progressLine.style.width = "100%";
    progressLine.style.transform = `rotate(-${liftProgress * 15}deg)`;

    frogGif.style.left = `${100 + ((liftProgress * extraDistance) / LINE_WIDTH) * 100}%`;
    frogGif.style.opacity = "1";
    frogGif.style.transform = `translateX(-50%) scale(${0.7 - liftProgress * 0.1})`;
  } else {
    // Для currentCoefficient < 1.2 можно скрыть лягушку и прогресс
    progressLine.style.width = "0%";
    frogGif.style.opacity = "0";
  }

  if (currentCoefficient >= crashAt) {
    stopGame();
  }
}

function stopGame() {
  isGameActive = false;
  clearInterval(gameInterval);

  coefficientDisplay.classList.add("crash-glow");
  coefficientDisplay.style.color = "#ff0000";
  progressLine.style.backgroundImage = "linear-gradient(135deg, #ff0000, #ff6b6b)";

  addToHistory(currentCoefficient, true);

  setTimeout(() => {
    coefficientDisplay.classList.remove("crash-glow");
    coefficientDisplay.style.opacity = "0";
    progressLine.style.opacity = "0";
    frogGif.style.opacity = "0";
    progressLine.style.backgroundImage = "linear-gradient(135deg, #6a0dad, #b366ff)";

    setTimeout(startGame, 3000);
  }, 2000);
}

function addToHistory(coef, isCrash) {
  const div = document.createElement("div");
  div.classList.add("main-coefficients__coefficient");
  div.classList.add(isCrash ? "lose" : "win");
  div.textContent = `${coef.toFixed(2)}x`;
  historySlider.appendChild(div);

  if (historySlider.children.length > maxHistoryItems) {
    historySlider.removeChild(historySlider.children[0]);
  }
}

let scrollPosition = 0;

function autoScrollHistory() {
  if (historySlider.scrollWidth <= historySlider.clientWidth) {
    scrollPosition = 0;
  } else {
    scrollPosition += scrollSpeed;
    if (scrollPosition > historySlider.scrollWidth - historySlider.clientWidth) {
      scrollPosition = 0;
    }
  }
  historySlider.scrollLeft = scrollPosition;
  requestAnimationFrame(autoScrollHistory);
}

requestAnimationFrame(autoScrollHistory);


