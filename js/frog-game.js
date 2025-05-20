// Элементы
const bars = document.querySelectorAll(".bar");
const coefficientDisplay = document.getElementById("coefficient");
const progressLine = document.querySelector(".line");
const frogGif = document.querySelector(".main-frog-wrapper-container__icon");
const historyTrack = document.getElementById("history-track");
const selectBetBtns = document.querySelectorAll(".select-bet__btn");
const stopBtns = document.querySelectorAll(".stop-btn");
const balancePole = document.querySelector(".main-balance");
const fieldBet = document.querySelectorAll(".select-bet-count__number");
import { fieldValues, balance } from "./balance.js";

// Константы
const LINE_WIDTH = 380;
const BASE_GAME_SPEED = 200;
const maxHistoryItems = 7; // Сколько коэффициентов видно одновременно

// Инициализация
coefficientDisplay.style.opacity = "0";
frogGif.style.opacity = "0";
if (frogGif) frogGif.style.display = "block";

// Анимация появления полосок
if (bars) {
  bars.forEach(function (bar, index) {
    setTimeout(function () {
      bar.style.opacity = "1";
      bar.style.transform = "translateY(0)";
    }, (index + 1) * 300);
  });
}

// Переменные игры
let currentCoefficient = 1.0;
let gameInterval;
let isGameActive = false;
let seriesQueue = [];
let seriesIndex = 0;

export function getIsGameActive() {
  return isGameActive;
}

function generateCrashCoefficient() {
  if (seriesIndex >= seriesQueue.length) {
    seriesQueue = [];
    const seriesTypeRoll = Math.random();

    if (seriesTypeRoll < 0.6) {
      const length = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < length; i++) {
        const coef = 1 + Math.random() * 1.5 * Math.pow(Math.random(), 2);
        seriesQueue.push(parseFloat(coef.toFixed(2)));
      }
    } else {
      const length = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < length; i++) {
        let coef =
          Math.random() < 0.3
            ? 3.5 + Math.random() * 11.5
            : 2.0 + Math.random() * 2.0;
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

// Игровой процесс
function startGame() {
  currentCoefficient = 1.0;
  coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;
  coefficientDisplay.style.color = "#ffffff";
  coefficientDisplay.style.opacity = "1";

  if (progressLine) {
    progressLine.style.width = "0%";
    progressLine.style.transform = "rotate(0deg)";
    progressLine.style.opacity = "1";
    progressLine.style.backgroundImage =
      "linear-gradient(135deg, #6a0dad, #b366ff)";
  }

  if (frogGif) {
    frogGif.style.opacity = "0";
    frogGif.style.left = "0px";
    frogGif.style.transform = "translateX(-50%) scale(0.7)";
    frogGif.style.display = "block";
  }

  isGameActive = true;
  const crashAt = generateCrashCoefficient();
  gameInterval = setInterval(() => updateGameState(crashAt), BASE_GAME_SPEED);
}

function updateGameState(crashAt) {
  if (!isGameActive) return;

  const speed = getSpeedByCoefficient(currentCoefficient);
  currentCoefficient = parseFloat((currentCoefficient + speed).toFixed(2));
  coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;

  if (progressLine && frogGif) {
    if (currentCoefficient >= 1.2 && currentCoefficient <= 1.4) {
      const progress = (currentCoefficient - 1.2) / 0.2;
      progressLine.style.width = `${progress * 100}%`;
      frogGif.style.left = `${progress * 100}%`;
      frogGif.style.opacity = "1";
    } else if (currentCoefficient > 1.4) {
      const liftProgress = Math.min((currentCoefficient - 1.4) / 0.25, 1);
      progressLine.style.width = "100%";
      progressLine.style.transform = `rotate(-${liftProgress * 15}deg)`;
      frogGif.style.left = `${100 + liftProgress * 25}%`;
      frogGif.style.transform = `translateX(-50%) scale(${
        0.7 - liftProgress * 0.1
      })`;
    } else {
      progressLine.style.width = "0%";
      frogGif.style.opacity = "0";
    }
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
  if (progressLine) {
    progressLine.style.backgroundImage =
      "linear-gradient(135deg, #ff0000, #ff6b6b)";
  }

  addToHistory(currentCoefficient, true);

  setTimeout(() => {
    coefficientDisplay.classList.remove("crash-glow");
    coefficientDisplay.style.opacity = "0";
    progressLine.style.opacity = "0";
    frogGif.style.opacity = "0";

    setTimeout(startGame, 3000);
  }, 2000);
}

// Добавление коэффициента в историю (вставка слева)
function addToHistory(coef, isCrash) {
  const div = document.createElement("div");
  div.classList.add("main-coefficients__coefficient");
  div.classList.add(isCrash ? "lose" : "win");
  div.textContent = `${coef.toFixed(2)}x`;
  div.style.transition = "transform 0.3s ease";

  // Вставка слева
  historyTrack.insertBefore(div, historyTrack.firstChild);

  const items = historyTrack.querySelectorAll(
    ".main-coefficients__coefficient"
  );

  // Сдвиг всех вправо
  items.forEach((item, index) => {
    item.style.transform = `translateX(${index * 100}%)`;
  });

  // Удаление самого правого, если их больше 6
  if (items.length > maxHistoryItems) {
    const last = items[items.length - 1];
    last.classList.add("fade-out");
    setTimeout(() => {
      if (last.parentNode) last.parentNode.removeChild(last);
    }, 300);
  }
}

startGame();

stopBtns.forEach((stopBtn, index) => {
  stopBtn.addEventListener("click", () => {
    const field = fieldBet[index];
    const betValue = parseFloat(field.dataset.bet);

    if (!betValue || betValue <= 0) return;

    if (isGameActive) {
      const gain = betValue * currentCoefficient;
      balance.value += gain;

      balancePole.innerHTML = `
        ${balance.value.toFixed(2)} +
        <img
          src="web/images/main/ton-icon.svg"
          alt="Token"
          class="main-balance__token"
        />
      `;
    }

    field.textContent = "0";
    field.dataset.bet = "0";
  });
});

setInterval(() => {
  stopBtns.forEach((stopBtn, index) => {
    const selectBtn = selectBetBtns[index];
    if (isGameActive) {
      selectBtn.style.display = "none";
      stopBtn.style.display = "block";
    } else {
      selectBtn.style.display = "block";
      stopBtn.style.display = "none";
    }
  });
}, 500);

export { isGameActive, startGame, stopGame };