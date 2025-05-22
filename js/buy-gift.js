import { telegramId } from './profile.js';

// Додавання подарунку в інвентар користувача
const addToInventory = async function (userId, itemId, count) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok) throw new Error("Не удалось получить список пользователей");

    const users = await response.json();
    const user = users.find((u) => String(u.telegramId) === String(userId));
    if (!user) throw new Error("Пользователь не найден");

    const updateRes = await fetch(
      `https://nftbotserver.onrender.com/api/users/${user.telegramId}/inventory`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: itemId,
          count: count,
        }),
      }
    );

    if (!updateRes.ok) throw new Error("Не удалось обновить инвентарь");

    const updatedUser = await updateRes.json();
    console.log("Инвентарь успешно обновлен:", updatedUser.inventory);
    alert("Подарок успешно куплен!");

  } catch (err) {
    console.error("Ошибка:", err.message);
    alert("Ошибка при покупке: " + err.message);
  }
};

// 12 однакових подарунків для прикладу
const gifts = Array.from({ length: 12 }, (_, i) => ({
  id: `potion-${i + 1}`,
  name: "Potion",
  price: 25,
  image: "potion-skin.svg",
}));

const gridContainer = document.getElementById("gridContainer");
const buyBtn = document.getElementById("buyBtn");

let selectedItem = null;

function renderGifts() {
  gridContainer.innerHTML = "";
  gifts.forEach(gift => {
    const card = document.createElement("div");
    card.classList.add("gift-card");
    card.dataset.id = gift.id;
    card.dataset.name = gift.name;
    card.dataset.price = gift.price;

    card.innerHTML = `
      <div class="card-price">${gift.price} <img src="web/images/inventory/ton.svg" class="gem-icon"></div>
      <img src="web/images/inventory/${gift.image}" alt="${gift.name}">
      <div class="card-label">${gift.name}</div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.gift-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedItem = gift;
    });

    gridContainer.appendChild(card);
  });
}

renderGifts();

buyBtn.addEventListener("click", () => {
  if (!selectedItem) {
    alert("Сначала выбери подарок!");
    return;
  }

  addToInventory(telegramId, selectedItem.id, 1);
});

// ✨ Модалка
const modalOverlay = document.getElementById("modalOverlay");
const openModalBtn = document.querySelectorAll(".inventory-skins-items-added-card");
const closeModalBtn = document.getElementById("closeModalGiftBtn");

// Відкрити модалку
openModalBtn.forEach((e) => {
  e.addEventListener("click", () => {
    modalOverlay.classList.remove("is-hidden");
  });
});

// Закрити модалку
closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-hidden");
});







 // card.innerHTML = `
  //   <div class="card-price">
  //     ${item.price} <img src="web/images/inventory/ton.svg" class="gem-icon">
  //   </div>
  //   <img src="web/images/inventory/${item.image}" alt="${item.name}">
  //   <div class="card-label">${item.name}</div>
  //   <div class="card-info">Information</div>
  // `;