// Получаем элементы DOM
const lockIcon = document.querySelector(".user-page-inv__icon--lock");
const iconInv = document.querySelector(".user-page-inv__icon--inv");
const userInv = document.querySelector(".user-page-inv");
const inventoryBtn = document.querySelector(".user-page-inv__btn--inv");
const inventorySection = document.querySelector(".user-page-inventory");
const startPlayingBtn = document.querySelector(
  ".user-page-inventory__empty-btn"
);
const userName = document.querySelector(".user-page-profile__name");
const userId = document.querySelector(".user-page-profile__id");
const userAvatar = document.querySelector(".user-page-profile__avatar");

// Элементы для промокодов (если нужны)
const promoBtnOpens = document.querySelectorAll(".promo-open-btn");
const promobackdrop = document.querySelector(".promo-backdrop");
const promoBtnClose = document.querySelector(".promo-modal__btn-close");
const promoInput = document.querySelector(".promo-modal__input");
const promoBtnSearchPromocode = document.getElementById(
  "promoModalSearchPromocode"
);

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
    if (userAvatar)
      userAvatar.setAttribute("src", user.avatar || "default-avatar-url.jpg");

    return user;
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    return null;
  }
}

// Обработчик кнопки инвентаря
if (inventoryBtn && inventorySection) {
  inventoryBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".user-page-game-history").style.display = "none";
    document.querySelector(".user-page-inventory").style.display = "block";
    inventorySection.classList.toggle("open");

    // Проверяем есть ли предметы в инвентаре
    const hasItems = checkInventoryItems(); // Ваша функция проверки

    if (!hasItems) {
      const emptyMessage = inventorySection.querySelector(
        ".user-page-inventory__empty"
      );
      if (emptyMessage) {
        emptyMessage.style.display = "block";
      }
    }
  });
}

// Функция проверки инвентаря (заглушка)
function checkInventoryItems() {
  // Здесь должна быть реальная проверка вашего API
  return false; // Пока всегда пусто
}

// Обработчик иконки замка
if (lockIcon && inventorySection) {
  lockIcon.addEventListener("click", (e) => {
    e.preventDefault();
    userInv.classList.add("open");
    inventorySection.classList.add("open");
  });
}

// Инициализация Swiper для истории игр
if (document.querySelector(".user-page-game-history__swiper")) {
  new Swiper(".user-page-game-history__swiper", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    mousewheel: true,
  });
}

// Промокоды (если нужны)
const promocodes = {
  lelelele52: "Вы получили 2 кг мефедрону",
  ez100ton: "Вы получили 100 ton на баланс",
  idiNaxui: "Идите нахуй",
};

if (promoBtnOpens) {
  promoBtnOpens.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (promobackdrop) promobackdrop.classList.remove("is-hidden");
    });
  });
}

if (promoBtnClose && promobackdrop) {
  promoBtnClose.addEventListener("click", () => {
    promobackdrop.classList.add("is-hidden");
  });
}

if (promoBtnSearchPromocode && promoInput) {
  promoBtnSearchPromocode.addEventListener("click", () => {
    const inputValue = promoInput.value.trim();

    if (promocodes[inputValue]) {
      alert(promocodes[inputValue]);
    } else {
      alert("Промокод не действителен");
    }

    promoInput.value = "";
  });
}

export { getTelegramId };
// Подключаем профиль при загрузке

  const telegramId = getTelegramId();
  if (telegramId) {
    connectProfile(telegramId);
  } else {
    console.log("Не удалось получить Telegram ID");
    // Устанавливаем дефолтные значения
    if (userName) userName.textContent = "Гость";
    if (userId) userId.textContent = "User ID: 0000";
  }

// Получаем элементы DOM

const userBetHistoryContainer = document.querySelector(".user-page-game-history__swiper");
const noHistoryMessage = document.querySelector(".user-page-game-history__untitle");
const startGameButton = document.querySelector(".user-page-game-history__btn");

// Инициализация истории ставок
function initBetHistory() {
  if (!localStorage.getItem('betHistory')) {
    localStorage.setItem('betHistory', JSON.stringify([]));
  }
  
  const history = JSON.parse(localStorage.getItem('betHistory'));
  
  if (history.length > 0) {
    noHistoryMessage.style.display = 'none';
    startGameButton.style.display = 'none';
    
    userBetHistoryContainer.innerHTML = `
      <div class="swiper-wrapper user-page-game-history__swiper-wrapper">
        ${history.map(bet => `
          <div class="user-page-game-history__card swiper-slide">
            <div class="user-page-game-history__price">
              ${bet.amount.toFixed(2)}
              <img
                src="web/images/inventory/ton.svg"
                alt="diamond"
                class="user-page-game-history__diamond"
              />
            </div>
            <div class="user-page-game-history__data">
              Telegram Wallet <span>${bet.date}</span>.
            </div>
            <div class="user-page-game-history__coefficient ${bet.status}">
              ${bet.result}
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    new Swiper(".user-page-game-history__swiper", {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      mousewheel: true,
    });
  }
}

// Функция для форматирования даты
function getCurrentDateFormatted() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const hours = String(today.getHours()).padStart(2, '0');
  const minutes = String(today.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Функция для добавления новой ставки в историю
function addNewBetToHistory(amount) {
  const history = JSON.parse(localStorage.getItem('betHistory'));
  history.unshift({
    amount,
    result: `-${amount.toFixed(2)} TON`,
    status: 'pending',
    date: getCurrentDateFormatted()
  });
  localStorage.setItem('betHistory', JSON.stringify(history));
  initBetHistory();
}

// Функция для обновления результата ставки
function updateBetResult(isWin, coefficient) {
  const history = JSON.parse(localStorage.getItem('betHistory'));
  if (history.length > 0 && history[0].status === 'pending') {
    const betAmount = history[0].amount;
    history[0].status = isWin ? 'win' : 'lose';
    history[0].result = isWin 
      ? `+${(betAmount * coefficient).toFixed(2)} TON (x${coefficient.toFixed(2)})` 
      : `-${betAmount.toFixed(2)} TON`;
    localStorage.setItem('betHistory', JSON.stringify(history));
    initBetHistory();
  }
}

// Слушаем события из других модулей
window.addEventListener('newBet', (e) => {
  addNewBetToHistory(e.detail.amount);
});

window.addEventListener('betResult', (e) => {
  updateBetResult(e.detail.isWin, e.detail.coefficient);
});


const gameHistoryWrapper = document.querySelector(".user-page-game-history__swiper-wrapper");

function createHistoryCard({ isWin, coefficient, totalBet, date }) {
  const card = document.createElement("div");
  card.className = "user-page-game-history__card swiper-slide";

  card.innerHTML = `
    <div class="user-page-game-history__price">
      ${totalBet}
      <img
        src="web/images/inventory/ton.svg"
        alt="diamond"
        class="user-page-game-history__diamond"
      />
    </div>
    <div class="user-page-game-history__data" data-game-card-text>
      Telegram Wallet ${date}
    </div>
    <div
      class="user-page-game-history__coefficient ${isWin ? "win" : "lose"}"
      data-status="${isWin ? "win" : "lose"}"
    >
      ${isWin ? "+" : "-"}${coefficient.toFixed(2)}x
    </div>
  `;

  return card;
}

// Завантаження історії з localStorage
function loadHistoryFromStorage() {
  const savedHistory = JSON.parse(localStorage.getItem("frogGameHistory")) || [];

  for (let entry of savedHistory.reverse()) {
    const card = createHistoryCard(entry);
    gameHistoryWrapper.appendChild(card);
  }
}

// Зберегти нову гру в localStorage
function saveHistoryEntry(entry) {
  const history = JSON.parse(localStorage.getItem("frogGameHistory")) || [];
  history.push(entry);
  localStorage.setItem("frogGameHistory", JSON.stringify(history));
}

// Коли приходить результат гри
window.addEventListener("betResult", (event) => {
  const { isWin, coefficient, totalBet } = event.detail;
  const date = new Date().toLocaleDateString();

  const entry = { isWin, coefficient, totalBet, date };

  const card = createHistoryCard(entry);
  gameHistoryWrapper.prepend(card);

  saveHistoryEntry(entry);
});

// Початкове завантаження
loadHistoryFromStorage();


// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  initBetHistory();
  
  const telegramId = getTelegramId();
  if (telegramId) {
    connectProfile(telegramId);
  } else {
    console.log("Не удалось получить Telegram ID");
    if (userName) userName.textContent = "Гость";
    if (userId) userId.textContent = "User ID: 0000";
  }
});




