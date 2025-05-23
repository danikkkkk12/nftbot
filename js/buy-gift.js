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

function createCard(item) {
  const card = document.createElement("div");
  card.className = "card" + (selected.has(item.id) ? " selected" : "");
  card.classList.add("swiper-slide");
  card.innerHTML = `
    <div class="card-price">
      ${item.price} <img src="web/images/inventory/ton.svg" class="gem-icon">
    </div>
    <img src="web/images/inventory/${item.image}" alt="${item.name}">
    <div class="card-label">${item.name}</div>
    <div class="card-info">Information</div>
  `;
  return card;
}

function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper(".grid", {
    direction: "vertical",
    slidesPerView: 3,
    slidesPerGroup: 3,
    grid: {
      rows: 3,
      fill: "row",
    },
    spaceBetween: 7,
    mousewheel: true,

    breakpoints: {
      0: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
        },
      },
      411: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 3,
        },
      },
    },
  });
}

function renderGrid() {
  grid.style.visibility = "hidden";
  grid.innerHTML = "";

  const search = searchInput.value.toLowerCase();

  items.forEach((item) => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search);
    const withinPrice = item.price <= maxPrice;

    if (matchesSearch && withinPrice) {
      const card = createCard(item);
      grid.appendChild(card);
    }
  });

  requestAnimationFrame(() => {
    initSwiper();
    grid.style.visibility = "visible";
  });
}

function setActivePrice(button) {
  priceButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  maxPrice = parseInt(button.dataset.price);
  renderGrid();
}

priceButtons.forEach((btn) =>
  btn.addEventListener("click", () => setActivePrice(btn))
);

searchInput.addEventListener("input", renderGrid);

openBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalOverlay.classList.remove("is-hidden");
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-hidden");
  document.body.style.overflow = "";
});

renderGrid();