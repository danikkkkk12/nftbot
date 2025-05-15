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

  // card.onclick = () => {
  //   selected.has(item.id) ? selected.delete(item.id) : selected.add(item.id);

  //   renderGrid();
  // };

  return card;
}

function renderGrid() {
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
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  });
});

closeBtn.addEventListener("click", () => {
  modalOverlay.classList.add("is-hidden");
  if (document.body.style.overflow === "hidden") {
    document.body.style.overflow = "visible";
  } else {
    document.body.style.overflow = "hidden";
  }
});

renderGrid();

new Swiper(".grid", {
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
