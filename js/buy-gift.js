const modal = document.getElementById("modalOverlay");
const closeBtn = document.getElementById("closeModalBtn");
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
    document.body.style.overflow =
      document.body.style.overflow === "hidden" ? "visible" : "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-hidden");
  document.body.style.overflow =
    document.body.style.overflow === "hidden" ? "visible" : "hidden";
});

renderGrid();
