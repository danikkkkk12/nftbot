const fixedBetBtns = document.querySelectorAll(".select-bet-change__btn");
const changeBetBtns = document.querySelectorAll(".select-bet-count__btn");
const fieldBet = document.querySelectorAll(".select-bet-count__number");
const selectBetBtns = document.querySelectorAll(".select-bet__btn");
const balancePole = document.querySelector(".main-balance");
const stopBtns = document.querySelectorAll(".stop-btn");
let balance = {
  value: parseFloat(balancePole.textContent),
};
let bet;
import { getIsGameActive } from "./frog-game.js";

function updateButtonsState() {
  const disabled = getIsGameActive();

  fixedBetBtns.forEach((btn) => (btn.disabled = disabled));
  changeBetBtns.forEach((btn) => (btn.disabled = disabled));
  selectBetBtns.forEach((btn) => (btn.disabled = disabled));
}

setInterval(updateButtonsState, 100);

const changeBet = function (field, fixedBtns, changeBtns, selectBtn) {
  let currentOperation = "";
  let currentValue = Number(field.textContent) || 0;

  stopBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (getIsGameActive()) return; // блокуємо при натисканні під час гри
      field.textContent = "0";
    });
  });

  changeBtns.forEach((el) => {
    el.addEventListener("click", () => {
      if (getIsGameActive()) return; // блокуємо при натисканні під час гри
      currentOperation = el.id;
      console.log(currentOperation);
    });
  });

  selectBtn.addEventListener("click", () => {
    if (getIsGameActive()) return; // блокуємо при натисканні під час гри

    if (currentValue === 0) {
      bet = 0;
      currentValue = 0;
      field.textContent = "0";
      alert("Сделайте ставку");
    } else if (currentValue <= balance.value) {
      bet = currentValue;
      balance.value -= bet;
      balancePole.innerHTML = `
      ${balance.value.toFixed(2)} 
      <img
        src="web/images/main/ton-icon.svg"
        alt="Token"
        class="main-balance__token"
      />
    `;
      alert("Ставка сделана");
      field.dataset.bet = bet; // <<< Ось це додано
      field.textContent = "0";
      currentValue = 0;
    } else {
      alert("Недостаточно средств на балансе");
      field.textContent = "0";
      currentValue = 0;
    }
  });

  fixedBtns.forEach((el) => {
    el.addEventListener("click", () => {
      if (getIsGameActive()) return; // блокуємо при натисканні під час гри
      const num = Number(el.textContent);
      if (currentOperation === "plus") {
        currentValue += num;
      } else if (currentOperation === "minus" && currentValue >= num) {
        currentValue -= num;
      }

      field.textContent = currentValue;
    });
  });

  return currentValue;
};

const firstFixedHalf = Array.from(fixedBetBtns).slice(0, 5);
const firstChangedHalf = Array.from(changeBetBtns).slice(0, 2);
const firstSelectBtn = Array.from(selectBetBtns)[0];

const secondFixedHalf = Array.from(fixedBetBtns).slice(5);
const secondChangedHalf = Array.from(changeBetBtns).slice(2);
const secondSelectBtn = Array.from(selectBetBtns)[1];

let fieldValues = [];

fieldBet.forEach((field, index) => {
  let value;
  if (index === 0) {
    value = changeBet(field, firstFixedHalf, firstChangedHalf, firstSelectBtn);
  } else if (index === 1) {
    value = changeBet(
      field,
      secondFixedHalf,
      secondChangedHalf,
      secondSelectBtn
    );
  }
  fieldValues.push(field);
});

export { changeBet };
export { fieldValues, balance, bet };

// slider

new Swiper(".bet-count__swiper", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,

  mousewheel: true,
});
