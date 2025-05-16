const mainBalance = document.querySelector('.main-balance');
const mainConnectWallet = document.querySelector('.main-connect-wallet');
const mainRocket = document.querySelector('.main-block-rocket');
const mainFrog = document.querySelector('.main-frog');
const progressBar = document.querySelector('.progress-bar');

// Инициализация TON Connect
const tonConnect = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://danikkkkk12.github.io/nftbot/tonconnect-manifest.json',
  buttonRootId: 'ton-connect'
});

// Изначально скрываем секцию с жабкой правильно
mainFrog.style.position = 'absolute';
mainFrog.style.top = '0';
mainFrog.style.left = '0';
mainFrog.style.width = '100%';
mainFrog.style.visibility = 'hidden';
mainFrog.style.opacity = '0';
mainFrog.style.transition = 'opacity 0.5s ease-in-out';

// Функции переключения секций
function toggleSections() {
  if (mainRocket.style.visibility !== 'hidden') {
    // Показать жабу вместо ракеты
    mainRocket.style.animation = 'fadeOut 0.5s forwards';

    setTimeout(() => {
      mainRocket.style.visibility = 'hidden';
      mainRocket.style.opacity = '0';
      mainFrog.style.visibility = 'visible';
      mainFrog.style.opacity = '1';
      mainFrog.style.animation = 'fadeIn 0.5s forwards';
      startGame(); // Запуск игры
    }, 500);
  } else {
    // Возвращаем ракету
    mainFrog.style.animation = 'fadeOut 0.5s forwards';

    setTimeout(() => {
      mainFrog.style.visibility = 'hidden';
      mainFrog.style.opacity = '0';
      mainRocket.style.visibility = 'visible';
      mainRocket.style.opacity = '1';
      mainRocket.style.animation = 'fadeIn 0.5s forwards';
      resetProgressBar(); // Запуск ракеты
    }, 500);
  }
}

function resetProgressBar() {
  progressBar.style.animation = 'none';
  progressBar.offsetWidth; // Триггер рефлоу
  progressBar.style.animation = 'fillProgress 4s linear forwards';
}

// Обработчик завершения анимации прогресс-бара
progressBar.addEventListener('animationend', () => {
  if (mainRocket.style.visibility !== 'hidden') {
    toggleSections();
  }
});

// Функция для получения баланса
async function getBalance(address) {
  const response = await fetch(`https://toncenter.com/api/v2/getAddressInformation?address=${address}`);
  const data = await response.json();

  if (data.ok && data.result && data.result.balance !== undefined) {
    return data.result.balance;
  } else {
    throw new Error('Ошибка получения баланса');
  }
}

// Обновление баланса
async function updateBalance() {
  if (tonConnect.wallet && tonConnect.wallet.account) {
    try {
      const address = tonConnect.wallet.account.address;
      const balanceNano = await getBalance(address);
      const balanceTon = (balanceNano / 1e9).toFixed(2);

      mainBalance.innerHTML = `
        ${balanceTon} <img src="web/images/main/ton-icon.svg" alt="Token" class="main-balance__token">
      `;
    } catch (err) {
      console.error('Не удалось получить баланс:', err);
    }
  }
}

// Обработчик клика по балансу
mainBalance.addEventListener('click', async () => {
  try {
    const res = await fetch('/create-invoice');
    const data = await res.json();
    window.open(data.invoice_url, '_blank');
    setTimeout(updateBalance, 5000);
  } catch (err) {
    console.error('Ошибка создания инвойса:', err);
  }
});

// Игра с жабкой
document.addEventListener("DOMContentLoaded", function() {
  const bars = document.querySelectorAll(".bar");
  const coefficientDisplay = document.getElementById("coefficient");
  const progressLine = document.querySelector(".line");
  const frogGif = document.querySelector(".main-frog-wrapper-container__icon");

  // Константы
  const LINE_WIDTH = 380;
  const FROG_Y_OFFSET = 0;
  const MAX_LIFT_HEIGHT = 120;
  const GAME_SPEED = 120;

  // Инициализация
  coefficientDisplay.style.opacity = "0";
  frogGif.style.opacity = "0";
  frogGif.style.display = "block";
  frogGif.style.position = "absolute";
  frogGif.style.left = "0px";
  frogGif.style.bottom = `${FROG_Y_OFFSET}px`;
  frogGif.style.transition = "left 0.3s linear, bottom 0.4s ease-out, transform 0.3s ease";
  frogGif.style.transform = "scale(0.7)";

  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.opacity = "1";
      bar.style.transform = "translateY(0)";
    }, (index + 1) * 300);
  });

  setTimeout(startGame, 2500);

  let currentCoefficient = 1.00;
  let gameInterval;
  let isGameActive = false;

  function startGame() {
    currentCoefficient = 1.00;
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

    currentCoefficient = (parseFloat(currentCoefficient) + 0.01).toFixed(2);
    coefficientDisplay.innerText = `x${currentCoefficient}`;

    if (currentCoefficient >= 1.20 && currentCoefficient <= 1.40) {
      const progress = (currentCoefficient - 1.20) / 0.20;
      progressLine.style.width = `${progress * 100}%`;
      frogGif.style.left = `${progress * LINE_WIDTH}px`;
      frogGif.style.opacity = "1";
    } else if (currentCoefficient > 1.40) {
      progressLine.style.width = "100%";
      const liftProgress = (currentCoefficient - 1.40) / 0.25;
      const currentLiftHeight = Math.min(liftProgress * MAX_LIFT_HEIGHT, MAX_LIFT_HEIGHT);
      
      progressLine.style.transform = `rotate(-${liftProgress * 15}deg)`;
      frogGif.style.bottom = `${FROG_Y_OFFSET + currentLiftHeight}px`;
      frogGif.style.transform = `scale(${0.7 - liftProgress * 0.1})`;
    }

    if (currentCoefficient > 1.50 && Math.random() < 0.05) {
      stopGame();
    }
  }

  function stopGame() {
    isGameActive = false;
    clearInterval(gameInterval);
    coefficientDisplay.style.color = "#ff0000";

    setTimeout(() => {
      coefficientDisplay.style.opacity = "0";
      progressLine.style.opacity = "0";
      frogGif.style.opacity = "0";
      
      setTimeout(toggleSections, 1000); // Теперь процесс идёт циклически
    }, 800);
  }
});