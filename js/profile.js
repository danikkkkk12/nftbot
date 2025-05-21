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
