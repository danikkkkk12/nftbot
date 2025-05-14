const toggleButtons = document.querySelectorAll(".bal-inv__btn");
const betToggle = document.querySelector(".bet-Toggle");

console.log(betToggle);

if (betToggle) {
  betToggle.addEventListener("click", (event) => {
    if (!event.target.classList.contains("bal-inv__btn")) {
      return;
    }

    toggleButtons.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    const target = event.target.dataset.target;

    const switcherBlocks = document.querySelectorAll(".sw");

    switcherBlocks.forEach((block) => {
      block.classList.remove("active");
      if (block.classList.contains(`bet-switcher__${target}`)) {
        block.classList.add("active");
      }
    });
  });
} else {
  console.warn("Элемент .bet-toggle не найден");
}
