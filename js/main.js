const mainBlockRocket = document.querySelector(".main-block-rocket");
const rocketContent = document.querySelector(".rocket-content");
const mainFrog = document.querySelector(".main-frog");
const progressBar = document.querySelector(".progress-bar");

import { startGame, stopGame, getIsGameActive } from "./frog-game.js";
rocketContent.style.transition = "opacity 0.5s ease-in-out";
mainFrog.style.position = "absolute";
mainFrog.style.top = "0";
mainFrog.style.left = "0";
mainFrog.style.width = "100%";
mainFrog.style.height = "100%";
mainFrog.style.visibility = "hidden";
mainFrog.style.opacity = "0";
mainFrog.style.transition = "opacity 0.5s ease-in-out";

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
    startGame();
  }, 500);
}
function resetProgressBar() {
  progressBar.style.animation = "none";
  progressBar.offsetHeight; 
  progressBar.style.animation = "progressAnimation 5s linear forwards";
}

progressBar.addEventListener("animationend", () => {
  if (!getIsGameActive()) {
    showFrog();
  }
});
document.addEventListener("gameCrash", () => {
  setTimeout(() => {
    showRocket();
    setTimeout(() => {
      resetProgressBar();
    }, 600);
  }, 2000);
});


resetProgressBar();

