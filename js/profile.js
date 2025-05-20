// Отримання елементів DOM
const lockIcon = document.querySelector(".user-page-inv__icon--lock");
const iconInv = document.querySelector(".user-page-inv__icon--inv");
const userInv = document.querySelector(".user-page-inv");
// profile
const userName = document.querySelector(".user-page-profile__name");
const userId = document.querySelector(".user-page-profile__id");
const userAvatar = document.querySelector(".user-page-profile__avatar");

function getTelegramId() {
  // Спроба отримати з WebApp (якщо відкрито в Telegram)
  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
  }

  // Спроба отримати з URL (якщо передано ботом)
  const urlParams = new URLSearchParams(window.location.search);
  const initData = urlParams.get("tgInitData");

  if (initData) {
    try {
      const params = new URLSearchParams(initData);
      return params.get("user[id]");
    } catch (e) {
      console.error("Помилка парсингу initData:", e);
    }
  }

  return null;
}

async function connectProfile(telegramId) {
  if (!telegramId) {
    console.log("Telegram ID не знайдено");
    return null;
  }

  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok) throw new Error("Помилка мережі");

    const users = await response.json();
    const user = users.find((user) => user.telegramId == telegramId);

    if (!user) {
      console.log("Користувача з таким Telegram ID не знайдено");
      return null;
    }

    // Оновлення UI тільки якщо елементи існують
    if (userName) userName.textContent = user.username || "Без імені";
    if (userId) userId.textContent = `User ID: ${user.telegramId}`;
    if (userAvatar)
      userAvatar.setAttribute("src", user.avatar || "default-avatar-url.jpg");

    return user;
  } catch (error) {
    console.error("Помилка при отриманні профілю:", error);
    return null;
  }
}

// Обробка подій для модального вікна
const promoBtnOpen = document.querySelector(".user-page-inv__btn--promo");
const promobackdrop = document.querySelector(".promo-backdrop");
const promoBtnClose = document.querySelector(".promo-modal__btn-close");
const promoInput = document.querySelector(".promo-modal__input");
const promoBtnSearchPromocode = document.getElementById(
  "promoModalSearchPromocode"
);

const promocodes = {
  lelelele52: "Ви отримали 2 кг мефедрону",
  ez100ton: "Ви отримали 100 ton на баланс",
  idiNaxui: "Ідіть нахуй",
};

// Додаємо обробники подій тільки якщо елементи існують
if (lockIcon && userInv) {
  lockIcon.addEventListener("click", () => {
    userInv.classList.add("open");
  });
}

if (promoBtnOpen && promobackdrop) {
  promoBtnOpen.addEventListener("click", () => {
    promobackdrop.classList.remove("is-hidden");
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
      alert("Промокод не дійсний");
    }

    promoInput.value = "";
  });
}

// Ініціалізація Swiper
if (typeof Swiper !== "undefined") {
  new Swiper(".user-page-game-history__swiper", {
    direction: "vertical",
    slidesPerView: "auto",
    freeMode: true,
    mousewheel: true,
  });
}

const telegramId = getTelegramId();
alert(telegramIdtelegramId);
if (telegramId) {
  connectProfile(telegramId);
} else {
  console.log("Не вдалося отримати Telegram ID");
}
