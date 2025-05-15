document.addEventListener("DOMContentLoaded", function() {
  // Элементы
  const bars = document.querySelectorAll(".bar");
  const coefficientDisplay = document.getElementById("coefficient");
  const progressLine = document.querySelector(".line");
  const frogGif = document.querySelector(".main-frog-wrapper-container__icon");

  // Константы
  const LINE_WIDTH = 380; // Ширина полоски в пикселях
  const FROG_Y_OFFSET = 0; // Насколько выше линии находится гифка (в пикселях)
  const MAX_LIFT_HEIGHT = 120; // Максимальная высота подъема (в пикселях)
  const GAME_SPEED = 120; // Интервал обновления (мс)

  // Инициализация
  coefficientDisplay.style.opacity = "0";
  frogGif.style.opacity = "0";
  frogGif.style.display = "block";
  frogGif.style.position = "absolute";
  frogGif.style.left = "0px";
  frogGif.style.bottom = `${FROG_Y_OFFSET}px`;
  frogGif.style.transition = "left 0.3s linear, bottom 0.4s ease-out, transform 0.3s ease";
  frogGif.style.transform = "scale(0.7)";

  // Анимация появления серых полосок
  bars.forEach(function(bar, index) {
    setTimeout(function() {
      bar.style.opacity = "1";
      bar.style.transform = "translateY(0)";
    }, (index + 1) * 300);
  });

  setTimeout(startGame, 2500);

  // Переменные игры
  let currentCoefficient = 1.00;
  let gameInterval;
  let isGameActive = false;

  function startGame() {
    currentCoefficient = 1.00;
    coefficientDisplay.innerText = `x${currentCoefficient.toFixed(2)}`;
    coefficientDisplay.style.color = "#ffffff";
    coefficientDisplay.style.opacity = "1";

    // Сброс анимации
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

    // Обновление коэффициента
    currentCoefficient = (parseFloat(currentCoefficient) + 0.01).toFixed(2);
    coefficientDisplay.innerText = `x${currentCoefficient}`;

    // Фаза роста полоски (1.20-1.40)
    if (currentCoefficient >= 1.20 && currentCoefficient <= 1.40) {
      const progress = (currentCoefficient - 1.20) / 0.20;
      progressLine.style.width = `${progress * 100}%`;
      
      // Движение гифки
      frogGif.style.left = `${progress * LINE_WIDTH}px`;
      frogGif.style.opacity = "1";
    } 
    // Фаза подъема (1.40+)
    else if (currentCoefficient > 1.40) {
      progressLine.style.width = "100%";
      const liftProgress = (currentCoefficient - 1.40) / 0.25;
      const currentLiftHeight = Math.min(liftProgress * MAX_LIFT_HEIGHT, MAX_LIFT_HEIGHT);
      
      // Анимация подъема
      progressLine.style.transform = `rotate(-${liftProgress * 15}deg)`;
      frogGif.style.bottom = `${FROG_Y_OFFSET + currentLiftHeight}px`;
      
      // Эффект перспективы
      frogGif.style.transform = `scale(${0.7 - liftProgress * 0.1})`;
    }

    // Проверка на остановку (5% шанс после x1.50)
    if (currentCoefficient > 1.50 && Math.random() < 0.05) {
      stopGame();
    }
  }

  function stopGame() {
    isGameActive = false;
    clearInterval(gameInterval);
    coefficientDisplay.style.color = "#ff0000";

    setTimeout(function() {
      coefficientDisplay.style.opacity = "0";
      progressLine.style.opacity = "0";
      frogGif.style.opacity = "0";
      setTimeout(startGame, 3000); // Перезапуск через 3 секунды
    }, 800); // Задержка перед исчезновением
  }
});
