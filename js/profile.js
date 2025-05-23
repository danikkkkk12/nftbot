const inventoryBtn = document.querySelector(".user-page-inv__btn--inv");
// const inventorySection = document.querySelector(".user-page-inventory");
// const startPlayingBtn = document.querySelector(
//   ".user-page-inventory__empty-btn"
// );
const userName = document.querySelector(".user-page-profile__name");
const userId = document.querySelector(".user-page-profile__id");
import { renderInventory } from "./buy-gift.js";

// Функция получения Telegram ID
function getTelegramId() {
  const urlParams = new URLSearchParams(window.location.search);
  const telegramId = urlParams.get("tgId");

  if (telegramId) return telegramId;

  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
  }

  return null;
}

// Функция подключения профиля
async function connectProfile(telegramId) {
  if (!telegramId) {
    console.log("Telegram ID не найден");
    return null;
  }

  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok) throw new Error("Ошибка сети");

    const users = await response.json();
    const user = users.find((user) => user.telegramId == telegramId);

    if (!user) {
      console.log("Пользователь с таким Telegram ID не найден");
      return null;
    }

    if (userName) userName.textContent = user.username || "Без имени";
    if (userId) userId.textContent = `User ID: ${user.telegramId}`;
    // if (userAvatar)
    //   userAvatar.setAttribute("src", user.avatar || "web/images/profile/user-avatar.jpg");

    return user;
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    return null;
  }
}

// Обработчик иконки замка

// Инициализация Swiper для истории игр
if (document.querySelector(".user-page-game-history__swiper")) {
  new Swiper(".user-page-game-history__swiper", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    mousewheel: true,
  });
}

// Подключаем профиль при загрузке

// const telegramId = getTelegramId();
// if (telegramId) {
//   connectProfile(telegramId);
// } else {
//   console.log("Не удалось получить Telegram ID");
//   // Устанавливаем дефолтные значения
//   if (userName) userName.textContent = "Гость";
//   if (userId) userId.textContent = "User ID: 0000";
// }

// Получаем элементы DOM

const userBetHistoryContainer = document.querySelector(
  ".user-page-game-history__swiper"
);
// const noHistoryMessage = document.querySelector(
//   ".user-page-game-history__untitle"
// );
// const startGameButton = document.querySelector(".user-page-game-history__btn");

// Инициализация истории ставок
// function initBetHistory() {
//   if (!localStorage.getItem("betHistory")) {
//     localStorage.setItem("betHistory", JSON.stringify([]) || []);
//   }

//   const history = JSON.parse(localStorage.getItem("betHistory"));

//   if (history.length > 0) {
//     // noHistoryMessage.style.display = "none";
//     // startGameButton.style.display = "none";

//     userBetHistoryContainer.innerHTML = `
//       <div class="swiper-wrapper user-page-game-history__swiper-wrapper">
//         ${history
//           .map(
//             (bet) => `
//           <div class="user-page-game-history__card swiper-slide">
//             <div class="user-page-game-history__price">
//               ${bet.amount.toFixed(2)}
//               <img
//                 src="web/images/inventory/ton.svg"
//                 alt="diamond"
//                 class="user-page-game-history__diamond"
//               />
//             </div>
//             <div class="user-page-game-history__data">
//               Telegram Wallet <span>${bet.date}</span>.
//             </div>
//             <div class="user-page-game-history__coefficient ${bet.status}">
//               ${bet.result}
//             </div>
//           </div>
//         `
//           )
//           .join("")}
//       </div>
//     `;

//     new Swiper(".user-page-game-history__swiper", {
//       direction: "vertical",
//       slidesPerView: "auto",
//       freeMode: true,
//       mousewheel: true,
//     });
//   }
// }

// Функция для форматирования даты
function getCurrentDateFormatted() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Функция для добавления новой ставки в историю
// function addNewBetToHistory(amount) {
//   const history = JSON.parse(localStorage.getItem("betHistory"));
//   history.unshift({
//     amount,
//     result: `-${amount.toFixed(2)} TON`,
//     status: "pending",
//     date: getCurrentDateFormatted(),
//   });
//   localStorage.setItem("betHistory", JSON.stringify(history));
//   initBetHistory();
// }

// Функция для обновления результата ставки
// function updateBetResult(isWin, coefficient) {
//   const history = JSON.parse(localStorage.getItem("betHistory"));
//   if (history.length > 0 && history[0].status === "pending") {
//     const betAmount = history[0].amount;
//     history[0].status = isWin ? "win" : "lose";
//     history[0].result = isWin
//       ? `+${(betAmount * coefficient).toFixed(2)} TON (x${coefficient.toFixed(
//           2
//         )})`
//       : `-${betAmount.toFixed(2)} TON`;
//     localStorage.setItem("betHistory", JSON.stringify(history));
//     initBetHistory();
//   }
// }

// Слушаем события из других модулей
window.addEventListener("newBet", (e) => {
  addNewBetToHistory(e.detail.amount);
});

// window.addEventListener("betResult", (e) => {
//   updateBetResult(e.detail.isWin, e.detail.coefficient);
// });

const gameHistoryWrapper = document.querySelector(
  ".user-page-game-history__swiper-wrapper"
);

function createHistoryCard({ isWin, coefficient, totalBet, date }) {
  if (!totalBet || totalBet <= 0) return null;

  const card = document.createElement("div");
  card.className = "user-page-game-history__card swiper-slide";

  const resultAmount = totalBet * coefficient;
  const formattedDate = new Date(date).toLocaleString();

  card.innerHTML = `
    <div class="user-page-game-history__price">
      ${totalBet.toFixed(2)}
      <img
        src="web/images/inventory/ton.svg"
        alt="diamond"
        class="user-page-game-history__diamond"
      />
    </div>
    <div class="user-page-game-history__data">
      Telegram Wallet ${formattedDate}
    </div>
    <div
      class="user-page-game-history__coefficient ${isWin ? "win" : "lose"}"
      data-status="${isWin ? "win" : "lose"}"
    >
      ${isWin ? "+" : "-"}${resultAmount.toFixed(
    2
  )} TON (x${coefficient.toFixed(2)})
    </div>
  `;

  return card;
}

function saveBetToHistory(entry) {
  if (!entry || !entry.totalBet || entry.totalBet <= 0) return;

  const history = JSON.parse(localStorage.getItem("frogGameHistory")) || [];
  history.push(entry);
  localStorage.setItem("frogGameHistory", JSON.stringify(history));
}
function loadHistoryFromStorage() {
  const savedHistory =
    JSON.parse(localStorage.getItem("frogGameHistory")) || [];
  gameHistoryWrapper.innerHTML = "";

  savedHistory
    .filter((entry) => entry.totalBet > 0)
    .reverse()
    .forEach((entry) => {
      const card = createHistoryCard(entry);
      if (card) gameHistoryWrapper.appendChild(card);
    });
}
function saveHistoryEntry(entry) {
  const history = JSON.parse(localStorage.getItem("frogGameHistory")) || [];
  history.push(entry);
  localStorage.setItem("frogGameHistory", JSON.stringify(history));
}

window.addEventListener("betResult", (event) => {
  const { isWin, coefficient, totalBet } = event.detail;

  if (!totalBet || totalBet <= 0) return;

  const entry = {
    isWin,
    coefficient,
    totalBet,
    date: new Date().toISOString(),
  };

  const card = createHistoryCard(entry);
  if (card) {
    gameHistoryWrapper.prepend(card);
    saveBetToHistory(entry);
  }
});

loadHistoryFromStorage();

// Инициализация при загрузке страницы
// initBetHistory();

const telegramId = getTelegramId();
if (telegramId) {
  connectProfile(telegramId);
} else {
  console.log("Не удалось получить Telegram ID");
  if (userName) userName.textContent = "Гость";
  if (userId) userId.textContent = "User ID: 0000";
}

export { telegramId };

// ... остальной существующий код ...
// Замените весь код обработчика inventoryBtn на этот:
inventoryBtn.addEventListener("click", async () => {
  const gameHistorySection = document.querySelector(".user-page-game-history");
  const inventorySection = document.querySelector(".user-page-inventory");
  const isOpen = inventorySection.classList.contains("openInvSection");
  const emptyMessage = inventorySection.querySelector(
    ".user-page-inventory__empty"
  );

  if (isOpen) {
    inventorySection.classList.remove("openInvSection");
    if (gameHistorySection) gameHistorySection.style.display = "block";
  } else {
    if (gameHistorySection) gameHistorySection.style.display = "none";
    inventorySection.classList.add("openInvSection");

    const hasInventory = checkInventoryItems(telegramId);

    if (hasInventory) {
      if (emptyMessage) emptyMessage.style.display = "none";
      renderInventory(telegramId);
    } else {
      if (emptyMessage) emptyMessage.style.display = "block";
    }
  }
});

async function checkInventoryItems(tgId) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok) throw new Error("Не удалось получить пользователей");
    const users = await response.json();
    const user = users.find((user) => String(user.telegramId) === String(tgId));

    if (!user) {
      console.log("Пользователь не найден");
      return;
    }

    if (user.inventory && user.inventory.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Ошибка:", err.message);
  }
}
