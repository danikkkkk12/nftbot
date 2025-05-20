const mainBlockRocket = document.querySelector(".main-block-rocket");
const rocketContent = document.querySelector(".rocket-content");
const mainFrog = document.querySelector(".main-frog");
// const progressBar = document.querySelector(".progress-bar");

// Настройка элементов
rocketContent.style.transition = "opacity 0.5s ease-in-out";
mainFrog.style.position = "absolute";
mainFrog.style.top = "0";
mainFrog.style.left = "0";
mainFrog.style.width = "100%";
mainFrog.style.height = "100%";
mainFrog.style.visibility = "hidden";
mainFrog.style.opacity = "0";
mainFrog.style.transition = "opacity 0.5s ease-in-out";

let isGameRunning = false;

function showRocket() {
  mainFrog.style.opacity = "0";
  setTimeout(() => {
    mainFrog.style.visibility = "hidden";
    rocketContent.style.opacity = "1";
    resetProgressBar();
  }, 500);
}

function showFrog() {
  rocketContent.style.opacity = "0";
  setTimeout(() => {
    mainFrog.style.visibility = "visible";
    mainFrog.style.opacity = "1";
    // Запускаем игру через событие, чтобы frog-game.js мог обработать
    const startGameEvent = new Event('startGame');
    document.dispatchEvent(startGameEvent);
  }, 500);
}

function resetProgressBar() {
  progressBar.style.animation = "none";
  progressBar.offsetHeight; // Это вызывает перерисовку
  progressBar.style.animation = "progressAnimation 5s linear forwards";
}


// Обработчики событий
progressBar.addEventListener("animationend", () => {
  if (!isGameRunning) {
    isGameRunning = true;
    showFrog();
  }
});

document.addEventListener('gameCrash', () => {
  isGameRunning = false;
  setTimeout(() => {
    showRocket();
    setTimeout(() => {
      resetProgressBar();
    }, 600);
  }, 2000);
});

// Инициализация
document.addEventListener("DOMContentLoaded", function() {
  resetProgressBar();
});

// progressBar.addEventListener("animationend", () => {
//   toggleRocketSection();
// });



