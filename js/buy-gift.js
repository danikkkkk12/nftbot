const closeBtn = document.getElementById("closeGiftModalBtn");
const grid = document.querySelector(".grid__wrapper");
const searchInput = document.getElementById("searchInput");
const buyBtn = document.getElementById("buyBtn");
const priceButtons = document.querySelectorAll(".price-options button");
const openBtns = document.querySelectorAll(".inventory-skins-items-added-card");
const modalOverlay = document.querySelector(".modal-overlay");

let maxPrice = parseInt(
  document.querySelector(".price-options .active")?.dataset.price || "25"
);
const selected = new Set();
let swiperInstance = null;

const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "Potion",
  price: 25,
  image: "potion-skin.svg"
})); // Закрыли массив items

// Додавання подарунку в інвентар користувача
const addToInventory = async function (userId, itemId, count) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok) throw new Error("Не удалось получить список пользователей");

    const users = await response.json();
    const user = users.find((u) => String(u.telegramId) === String(userId));
    if (!user) throw new Error("Пользователь не найден");

    const selectedGift = gifts.find(g => g.id === itemId);
    if (!selectedGift) throw new Error("Подарок не найден");

    const totalCost = selectedGift.price * count;

    if (user.balance < totalCost) {
      alert(`Недостаточно средств. У тебя ${user.balance}, а нужно ${totalCost}`);
      return;
    }

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
    
    // Обновляем отображение инвентаря
    await renderInventory(userId);

  } catch (err) {
    console.error("Ошибка:", err.message);
    alert("Ошибка при покупке: " + err.message);
  }
};

// Функция для отображения инвентаря
async function renderInventory(userId) {
  const inventorySection = document.querySelector(".user-page-inventory");
  const emptyMessage = inventorySection.querySelector(".user-page-inventory__empty");
  
  try {
    const response = await fetch(`https://nftbotserver.onrender.com/api/users/${userId}/inventory`);
    if (!response.ok) throw new Error("Не удалось получить инвентарь");
    
    const inventory = await response.json();
    
    if (inventory && inventory.length > 0) {
      emptyMessage.style.display = "none";
      
      let itemsContainer = inventorySection.querySelector(".inventory-items-container");
      if (!itemsContainer) {
        itemsContainer = document.createElement("div");
        itemsContainer.className = "inventory-items-container";
        inventorySection.appendChild(itemsContainer);
      }
      
      itemsContainer.innerHTML = "";
      inventory.forEach(item => {
        const gift = gifts.find(g => g.id === item.itemId) || {
          name: item.itemId,
          image: "default-item.svg"
        };
        
        const itemElement = document.createElement("div");
        itemElement.className = "inventory-item";
        itemElement.innerHTML = `
          <img src="web/images/inventory/${gift.image}" alt="${gift.name}">
          <span>${gift.name} x${item.count}</span>
        `;
        itemsContainer.appendChild(itemElement);
      });
    } else {
      emptyMessage.style.display = "block";
      const itemsContainer = inventorySection.querySelector(".inventory-items-container");
      if (itemsContainer) itemsContainer.remove();
    }
  } catch (err) {
    console.error("Ошибка при загрузке инвентаря:", err);
    emptyMessage.style.display = "block";
  }
}

const gifts = Array.from({ length: 12 }, (_, i) => ({
  id: `potion-${i + 1}`,
  name: "Potion",
  price: 25,
  image: "potion-skin.svg",
}));

import { telegramId } from './profile.js';

// Додавання подарунку в інвентар користувача
const addToInventory = async function (userId, itemId, count) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok) throw new Error("Не удалось получить список пользователей");

    const users = await response.json();
    const user = users.find((u) => String(u.telegramId) === String(userId));
    if (!user) throw new Error("Пользователь не найден");

    const selectedGift = gifts.find(g => g.id === itemId);
    if (!selectedGift) throw new Error("Подарок не найден");

    const totalCost = selectedGift.price * count;

    if (user.balance < totalCost) {
      alert(`Недостаточно средств. У тебя ${user.balance}, а нужно ${totalCost}`);
      return;
    }

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
const closeModalBtn = document.querySelector(".close-btn");


openModalBtn.forEach((e) => {
  e.addEventListener("click", () => {
    modalOverlay.classList.remove("is-hidden");
  });
});

// Закрити модалку
closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-hidden");
  document.body.style.overflow = "";
});

renderGrid();
