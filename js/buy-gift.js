const closeBtn = document.getElementById("closeGiftModalBtn");
const gridContainer = document.getElementById("gridContainer");
const searchInput = document.getElementById("searchInput");
const buyBtn = document.getElementById("buyBtn");
// const optionsPrice = document.querySelector('.price-options')
const priceButtons = document.querySelectorAll('button[data-price]');

const openModalBtns = document.querySelectorAll(
  ".inventory-skins-items-added-card"
);
const modalOverlay = document.getElementById("modalOverlay");
const closeModalBtn = document.querySelector(".close-btn");


let maxPrice = parseInt(
  document.querySelector(".price-options .active")?.dataset.price || "25"
);
import { telegramId } from "./profile.js";

let selectedItem = null;

const gifts = [
  { name: "Plush Pepe", price: 1210, image: "../web/images/giveaway/gift/0.png" },
  { name: "Precious Peach", price: 137.5, image: "../web/images/giveaway/gift/1.png" },
  { name: "Durov's Cap", price: 247.5, image: "../web/images/giveaway/gift/2.png" },
  { name: "Diamond Ring", price: 10.23, image: "../web/images/giveaway/gift/3.png" },
  { name: "Neko Helmet", price: 14.78, image: "../web/images/giveaway/gift/4.png" },
  { name: "Loot Bag", price: 29.15, image: "../web/images/giveaway/gift/5.png" },
  { name: "Love Potion", price: 6.56, image: "../web/images/giveaway/gift/6.png" },
  { name: "Toy Bear", price: 15.4, image: "../web/images/giveaway/gift/7.png" },
  { name: "Perfume Bottle", price: 46, image: "../web/images/giveaway/gift/8.png" },
  { name: "Homemade Cake", price: 1.54, image: "../web/images/giveaway/gift/9.png" },
  { name: "Mini Oscar", price: 47.2, image: "../web/images/giveaway/gift/10.png" },
  { name: "Astral Shard", price: 44, image: "../web/images/giveaway/gift/11.png" },
  { name: "Top Hat", price: 6.6, image: "../web/images/giveaway/gift/12.png" },
  { name: "Genie Lamp", price: 23.1, image: "../web/images/giveaway/gift/13.png" },
  { name: "B-Day Candle", price: 1.1, image: "../web/images/giveaway/gift/14.png" },
  { name: "Jack-in-the-Box", price: 1.92, image: "../web/images/giveaway/gift/15.png" },
  { name: "Snow Globe", price: 3.28, image: "../web/images/giveaway/gift/16.png" },
  { name: "Swiss Watch", price: 20.9, image: "../web/images/giveaway/gift/17.png" },
  { name: "Vintage Cigar", price: 21.4, image: "../web/images/giveaway/gift/18.png" },
  { name: "Eternal Rose", price: 10.56, image: "../web/images/giveaway/gift/19.png" },
  { name: "Love Candle", price: 7.15, image: "../web/images/giveaway/gift/20.png" },
  { name: "Ion Gem", price: 43.89, image: "../web/images/giveaway/gift/21.png" },
  { name: "Sharp Tongue", price: 18.689, image: "../web/images/giveaway/gift/22.png" },
  { name: "Berry Box", price: 3.96, image: "../web/images/giveaway/gift/23.png" },
  { name: "Bunny Muffin", price: 4.345, image: "../web/images/giveaway/gift/24.png" },
  { name: "Hanging Star", price: 3.74, image: "../web/images/giveaway/gift/25.png" },
  { name: "Record Player", price: 6.6, image: "../web/images/giveaway/gift/26.png" },
  { name: "Scared Cat", price: 25.85, image: "../web/images/giveaway/gift/27.png" },
  { name: "Kissed Frog", price: 15.4, image: "../web/images/giveaway/gift/28.png" },
  { name: "Hypno Lollipop", price: 1.925, image: "../web/images/giveaway/gift/29.png" },
  { name: "Lol Pop", price: 1.1, image: "../web/images/giveaway/gift/30.png" },
  { name: "Ginger Cookie", price: 2.31, image: "../web/images/giveaway/gift/31.png" },
  { name: "Evil Eye", price: 3.179, image: "../web/images/giveaway/gift/32.png" },
  { name: "Signet Ring", price: 18.48, image: "../web/images/giveaway/gift/33.png" },
  { name: "Desk Calendar", price: 1.1, image: "../web/images/giveaway/gift/34.png" }
];



// Отрисовка подарков
function renderGifts(maxPrice = Infinity) {
  gridContainer.innerHTML = "";

  gifts
    .filter(gift => gift.price <= maxPrice)
    .forEach(gift => {
      const card = document.createElement("div");
      card.classList.add("gift-card");
      card.dataset.name = gift.name;
      card.dataset.price = gift.price;

      card.innerHTML = `
        <div class="card-price">${gift.price} <img src="web/images/inventory/ton.svg" class="gem-icon"></div>
        <img src="${gift.image}" alt="${gift.name}">
        <div class="card-label">${gift.name}</div>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".gift-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectedItem = gift;
      });

      gridContainer.appendChild(card);
    });
}



renderGifts();

priceButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Удаляем активный класс со всех кнопок
    priceButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const selectedPrice = parseFloat(button.dataset.price);
    renderGifts(selectedPrice);
  });
});






// Покупка подарка
const addToInventory = async function (userId, itemId, count) {
  try {
    const response = await fetch("https://nftbotserver.onrender.com/api/users");
    if (!response.ok)
      throw new Error("Не удалось получить список пользователей");

    const users = await response.json();
    const user = users.find((u) => String(u.telegramId) === String(userId));
    if (!user) throw new Error("Пользователь не найден");

    const selectedGift = gifts.find((g) => g.id === itemId);
    if (!selectedGift) throw new Error("Подарок не найден");

    const totalCost = selectedGift.price * count;

    if (user.balance < totalCost) {
      alert(
        `Недостаточно средств. У тебя ${user.balance}, а нужно ${totalCost}`
      );
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

    await renderInventory(userId);
  } catch (err) {
    console.error("Ошибка:", err.message);
    alert("Ошибка при покупке: " + err.message);
  }
};

// Отображение инвентаря
async function renderInventory(userId) {
  const inventorySection = document.querySelector(".user-page-inventory");
  if (!inventorySection) return;

  try {
    const response = await fetch(
      `https://nftbotserver.onrender.com/api/users/${userId}/inventory`
    );
    if (!response.ok) throw new Error("Не удалось получить инвентарь");

    const inventory = await response.json();

    // Якщо інвентар порожній — показати повідомлення і вийти
    if (!inventory.length) {
      inventorySection.querySelector(
        ".user-page-inventory__empty"
      ).style.display = "block";
      inventorySection.querySelector(
        ".inventory-items-container"
      ).style.display = "none";
      return;
    } else {
      inventorySection.querySelector(
        ".user-page-inventory__empty"
      ).style.display = "none";
      inventorySection.querySelector(
        ".inventory-items-container"
      ).style.display = "flex";
    }

    let itemsContainer = inventorySection.querySelector(
      ".inventory-items-container"
    );
    if (!itemsContainer) {
      itemsContainer = document.createElement("div");
      itemsContainer.className = "inventory-items-container";
      inventorySection.appendChild(itemsContainer);
    }

    itemsContainer.innerHTML = "";

    inventory.forEach((item) => {
      const gift = gifts.find((g) => g.id === item.itemId) || {
        name: item.itemId,
        image: "default-item.svg",
      };

      const itemElement = document.createElement("div");
      itemElement.className = "inventory-item";

      itemElement.innerHTML = `
          <img src="web/images/inventory/${gift.image}" alt="${gift.name}" class="inventory-item__img">
          <span class="inventory-item__name">${gift.name} x${item.count}</span>
      `;

      itemsContainer.appendChild(itemElement);
    });
  } catch (err) {
    console.error("Ошибка при загрузке инвентаря:", err);
  }
}
export { renderInventory };

// Кнопка покупки
buyBtn.addEventListener("click", () => {
  if (!selectedItem) {
    alert("Сначала выбери подарок!");
    return;
  }

  addToInventory(telegramId, selectedItem.id, 1);
});

// Открытие модалки
openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalOverlay.classList.remove("is-hidden");
  });
});

// Закрытие модалки
closeModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-hidden");
  document.body.style.overflow = "";
});
