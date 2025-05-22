const addAdminInput = document.querySelector(".admin-add__input-add");
const addAdminBtn = document.querySelector(".admin-add__btn--add");
const removeAdminInput = document.querySelector(".admin-add__input--remove");
const removeAdminBtn = document.querySelector(".admin-add__btn--remove");
const openAdminPage = document.querySelector(".user-page-inv__btn--admin");
const adminSection = document.querySelector(".admin");

import { telegramId } from "./profile.js";

const isUserAdmin = async function (tgId) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    const users = await response.json();

    const user = users.find((user) => String(user.telegramId) === String(tgId));

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
