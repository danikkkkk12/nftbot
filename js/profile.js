// const connectDB = require("../db/db");
const { Telegraf } = require("telegraf");
// const User = require("../server/api/user");

const lockIcon = document.querySelector(".user-page-inv__icon--lock");
const iconInv = document.querySelector(".user-page-inv__icon--inv");
const userInv = document.querySelector(".user-page-inv");
// profile
const userName = document.querySelector(".user-page-profile__name");
const userId = document.querySelector(".user-page-profile__id");
const userAvatar = document.querySelector(".user-page-profile__avatar");

async function connectProfile() {
  const telegramId =
    window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "5384952149";

  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    const users = await response.json();

    const user = users.find((user) => user.telegramId == telegramId);

    if (!user) {
      console.log("Користувача з таким Telegram ID не знайдено");
      return null;
    }

    const username = user.username || "Без імені";
    const avatar = user.avatar || "default-avatar-url.jpg";

    userName.textContent = username;
    userId.textContent = `User ID: ${user.telegramId}`;
    userAvatar.setAttribute("src", avatar);
  } catch (error) {
    console.error("Помилка при отриманні профілю:", error);
    return null;
  }
}

// modal
const promoBtnOpen = document.querySelector(".user-page-inv__btn--promo");
const promobackdrop = document.querySelector(".promo-backdrop");
const promoBtnClose = document.querySelector(".promo-modal__btn-close");
const promoInput = document.querySelector(".promo-modal__input");
const promoBtnSearchPromocode = document.getElementById(
  "promoModalSearchPromocode"
);
const promocodes = {
  lelelele52: "Вы получили 2 кг мефедрона",
  ez100ton: "Вы получили 100 ton на баланс",
  idiNaxui: "Иди нахуй",
};

lockIcon.addEventListener("click", () => {
  userInv.classList.add("open");
});
promoBtnOpen.addEventListener("click", () => {
  promobackdrop.classList.remove("is-hidden");
});
promoBtnClose.addEventListener("click", () => {
  promobackdrop.classList.add("is-hidden");
});
promoBtnSearchPromocode.addEventListener("click", () => {
  const inputValue = promoInput.value.trim();

  if (promocodes[inputValue]) {
    alert(promocodes[inputValue]);
  } else {
    alert("Промокод не действителен харе вводить на рандом");
  }

  promoInput.value = "";
});

new Swiper(".user-page-game-history__swiper", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,

  mousewheel: true,
});

connectProfile();
