document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalOverlay");
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const grid = document.getElementById("gridContainer");
  const searchInput = document.getElementById("searchInput");
  const buyBtn = document.getElementById("buyBtn");
  const priceButtons = document.querySelectorAll(".price-options button");

  let maxPrice = parseInt(document.querySelector(".price-options .active")?.dataset.price || "25");
  const selected = new Set();

  const items = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Potion",
    price: 25,
    image: "potion.png"
  }));

  function renderGrid() {
    grid.innerHTML = "";
    const search = searchInput.value.toLowerCase();

    items.forEach(item => {
      if (item.price > maxPrice) return;
      if (search && !item.name.toLowerCase().includes(search)) return;

      const card = document.createElement("div");
      card.className = "card" + (selected.has(item.id) ? " selected" : "");

      const price = document.createElement("div");
      price.className = "card-price";
      price.textContent = `${item.price} 💎`;

      const img = document.createElement("img");
      img.src = item.image;

      const label = document.createElement("div");
      label.className = "card-label";
      label.textContent = item.name;

      const info = document.createElement("div");
      info.className = "card-info";
      info.textContent = "Information";

      card.onclick = () => {
        if (selected.has(item.id)) {
          selected.delete(item.id);
        } else {
          selected.add(item.id);
        }
        renderGrid();
      };

      card.append(price, img, label, info);
      grid.appendChild(card);
    });
  }

  priceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      priceButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      maxPrice = parseInt(btn.dataset.price);
      renderGrid();
    });
  });

  searchInput.addEventListener("input", renderGrid);

  openBtn.onclick = () => modal.style.display = "flex";
  closeBtn.onclick = () => modal.style.display = "none";

  buyBtn.onclick = () => {
    alert(`Обрано ${selected.size} подарунків.`);
  };

  renderGrid();
});
