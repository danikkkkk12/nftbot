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

const addAdminInput = document.querySelector(".admin-add__input-add");
const addAdminBtn = document.querySelector(".admin-add__btn--add");
const removeAdminInput = document.querySelector(".admin-add__input--remove");
const removeAdminBtn = document.querySelector(".admin-add__btn--remove");
const openAdminPage = document.querySelector(".user-page-inv__btn--admin");
const adminSection = document.querySelector(".admin");

import { getTelegramId } from "./profile.js";

const isUserAdmin = async function (tgId) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    const users = await response.json();

    const user = users.find((user) => user.telegramId === tgId);
    alert(user)

    if (user && user.isAdmin) {
      return user;
    } else {
      return false;
    }
  } catch (err) {
    console.log("Помилка при перевірці адміністратора:", err);
    return false;
  }
};

// Додати адміністратора
const addAdmins = async function (userId) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok)
      throw new Error("Не вдалося отримати список користувачів");

    const users = await response.json();
    const user = users.find((u) => String(u.telegramId) === String(userId));

    if (!user) {
      return alert("Ви ввели невірний ID");
    }

    if (user.isAdmin) {
      return alert("Користувач вже є адміністратором");
    }

    const updateRes = await fetch(
      `https://nftbotserver.onrender.com/api/users/${user.telegramId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: true }),
      }
    );

    if (updateRes.ok) {
      alert("Користувача успішно призначено адміністратором");
    } else {
      alert("Помилка при оновленні користувача");
    }
  } catch (err) {
    console.error("Помилка при додаванні адміністратора:", err);
  }
};

// Видалити адміністратора
const removeAdmins = async function (userId) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok)
      throw new Error("Не вдалося отримати список користувачів");

    const users = await response.json();
    const user = users.find((u) => String(u.telegramId) === String(userId));

    if (!user) {
      return alert("Ви ввели невірний ID");
    }

    if (!user.isAdmin) {
      return alert("Користувач не є адміністратором");
    }

    const updateRes = await fetch(
      `https://nftbotserver.onrender.com/api/users/${user.telegramId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: false }),
      }
    );

    if (updateRes.ok) {
      alert("Користувача успішно позбавлено прав адміністратора");
    } else {
      alert("Помилка при оновленні користувача");
    }
  } catch (err) {
    console.error("Помилка при знятті адміністратора:", err);
  }
};

// Показати секцію
const showSection = function (targetSection) {
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });
  targetSection.style.display = "block";
};

if (telegramId) {
  isUserAdmin(telegramId).then((user) => {
    if (user) {
      openAdminPage.style.display = "flex";
    } else {
      openAdminPage.style.display = "none";
    }
  });

  addAdminBtn.addEventListener("click", () => {
    const id = Number(addAdminInput.value.trim());
    if (!id) return alert("Введіть коректний ID користувача");
    addAdmins(id);
  });

  removeAdminBtn.addEventListener("click", () => {
    const id = Number(removeAdminInput.value.trim());
    if (!id) return alert("Введіть коректний ID користувача");
    removeAdmins(id);
  });
} else {
  console.log("Не удалось получить Telegram ID");
}

// Клік по кнопці входу в адмінку
openAdminPage.addEventListener("click", () => {
  showSection(adminSection);
});

