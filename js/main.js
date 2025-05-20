const mainRocket = document.querySelector(".main-block-rocket");
const mainFrog = document.querySelector(".main-frog");
// const progressBar = document.querySelector(".progress-bar");

function toggleRocketSection() {
  if (mainRocket.style.visibility !== "hidden") {
    mainRocket.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
      mainRocket.style.visibility = "hidden";
      mainRocket.style.opacity = "0";
      resetProgressBar();
    }, 500);
  } else {
    mainRocket.style.visibility = "visible";
    mainRocket.style.opacity = "1";
    mainRocket.style.animation = "fadeIn 0.5s forwards";
    resetProgressBar();
  }
}

function resetProgressBar() {
  progressBar.style.animation = "none";
  progressBar.offsetWidth; 
  progressBar.style.animation = "fillProgress 4s linear forwards";
}

// progressBar.addEventListener("animationend", () => {
//   toggleRocketSection();
// });


