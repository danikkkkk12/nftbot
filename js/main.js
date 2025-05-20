const mainRocket = document.querySelector(".main-block-rocket");
const mainFrog = document.querySelector(".main-frog");
// const progressBar = document.querySelector(".progress-bar");


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

function toggleRocketSection() {
  // Только для ракеты и прогресс-бара — переключаем видимость
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


