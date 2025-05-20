// Отримання елементів DOM
const lockIcon = document.querySelector(".user-page-inv__icon--lock");
const iconInv = document.querySelector(".user-page-inv__icon--inv");
const userInv = document.querySelector(".user-page-inv");
// profile

const languageButtons = document.querySelectorAll(
  ".user-page-change-language__btn"
);
const userName = document.querySelector(".user-page-profile__name");
const userId = document.querySelector(".user-page-profile__id");
const userAvatar = document.querySelector(".user-page-profile__avatar");

languageButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const selectedLang = btn.getAttribute("data-lang");

    languageButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const telegramId = getTelegramId(); // твоя функция для получения ID

    if (!telegramId) {
      console.log("Telegram ID не найден");
      return;
    }

    try {
      const response = await fetch(
        `https://your-api-url.com/api/users/${telegramId}/language`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language: selectedLang }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при обновлении языка");
      }

      console.log("Язык успешно обновлен в БД");
    } catch (error) {
      console.error(error);
    }
  });
});

function getTelegramId() {
  const urlParams = new URLSearchParams(window.location.search);
  const telegramId = urlParams.get("tgId");

  if (telegramId) return telegramId;

  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
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
new Swiper(".user-page-game-history__swiper", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  mousewheel: true,
});

const telegramId = getTelegramId();
if (telegramId) {
  connectProfile(telegramId);
} else {
  console.log("Не вдалося отримати Telegram ID");
}
