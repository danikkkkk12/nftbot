const mainRocket = document.querySelector(".main-block-rocket");
const mainFrog = document.querySelector(".main-frog");
const progressBar = document.querySelector(".progress-bar");

mainFrog.style.position = "absolute";
mainFrog.style.top = "0";
mainFrog.style.left = "0";
mainFrog.style.width = "100%";
mainFrog.style.visibility = "hidden";
mainFrog.style.opacity = "0";
mainFrog.style.transition = "opacity 0.5s ease-in-out";

const peer = new RTCPeerConnection();
peer.createDataChannel("pingTest");

async function updatePing() {
  const start = performance.now();
  await fetch("https://danikkkkk12.github.io/nftbot/").catch(() => {});
  const networkPing = Math.round(performance.now() - start);
  const spanElement = document.querySelector(".main-network-status__span");

  if (spanElement) {
    spanElement.textContent = networkPing;
  } else {
    console.error("❌ Элемент .main-network-status__span не найден!");
  }
}
updatePing();
setInterval(updatePing, 2000);
function toggleSections() {
  if (mainRocket.style.visibility !== "hidden") {
    mainRocket.style.animation = "fadeOut 0.5s forwards";

    setTimeout(() => {
      mainRocket.style.visibility = "hidden";
      mainRocket.style.opacity = "0";
      mainFrog.style.visibility = "visible";
      mainFrog.style.opacity = "1";
      mainFrog.style.animation = "fadeIn 0.5s forwards";
      startGame(); 
    }, 500);
  } else {
    mainFrog.style.animation = "fadeOut 0.5s forwards";

    setTimeout(() => {
      mainFrog.style.visibility = "hidden";
      mainFrog.style.opacity = "0";
      mainRocket.style.visibility = "visible";
      mainRocket.style.opacity = "1";
      mainRocket.style.animation = "fadeIn 0.5s forwards";
      resetProgressBar(); 
    }, 500);
  }
}

function resetProgressBar() {
  progressBar.style.animation = "none";
  progressBar.offsetWidth; 
  progressBar.style.animation = "fillProgress 4s linear forwards";
}

progressBar.addEventListener("animationend", () => {
  if (mainRocket.style.visibility !== "hidden") {
    toggleSections();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const bars = document.querySelectorAll(".bar");
  const coefficientDisplay = document.getElementById("coefficient");
  const progressLine = document.querySelector(".line");
  const frogGif = document.querySelector(".main-frog-wrapper-container__icon");

  const LINE_WIDTH = 380;
  const FROG_Y_OFFSET = 0;
  const MAX_LIFT_HEIGHT = 120;
  const GAME_SPEED = 120;

  coefficientDisplay.style.opacity = "0";
  frogGif.style.opacity = "0";
  frogGif.style.display = "block";
  frogGif.style.position = "absolute";
  frogGif.style.left = "0px";
  frogGif.style.bottom = `${FROG_Y_OFFSET}px`;
  frogGif.style.transition =
    "left 0.3s linear, bottom 0.4s ease-out, transform 0.3s ease";
  frogGif.style.transform = "scale(0.7)";

  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.opacity = "1";
      bar.style.transform = "translateY(0)";
    }, (index + 1) * 300);
  });

  setTimeout(startGame, 2500);

  let currentCoefficient = 1.0;
  let gameInterval;
  let isGameActive = false;

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

    currentCoefficient = (parseFloat(currentCoefficient) + 0.01).toFixed(2);
    coefficientDisplay.innerText = `x${currentCoefficient}`;

    if (currentCoefficient >= 1.2 && currentCoefficient <= 1.4) {
      const progress = (currentCoefficient - 1.2) / 0.2;
      progressLine.style.width = `${progress * 100}%`;
      frogGif.style.left = `${progress * LINE_WIDTH}px`;
      frogGif.style.opacity = "1";
    } else if (currentCoefficient > 1.4) {
      progressLine.style.width = "100%";
      const liftProgress = (currentCoefficient - 1.4) / 0.25;
      const currentLiftHeight = Math.min(
        liftProgress * MAX_LIFT_HEIGHT,
        MAX_LIFT_HEIGHT
      );

      progressLine.style.transform = `rotate(-${liftProgress * 15}deg)`;
      frogGif.style.bottom = `${FROG_Y_OFFSET + currentLiftHeight}px`;
      frogGif.style.transform = `scale(${0.7 - liftProgress * 0.1})`;
    }

    if (currentCoefficient > 1.5 && Math.random() < 0.05) {
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

      setTimeout(toggleSections, 1000); 
    }, 800);
  }
});
