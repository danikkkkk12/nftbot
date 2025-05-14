const fixedBetBtns = document.querySelectorAll(".select-bet-change__btn");
const changeBetBtns = document.querySelectorAll(".select-bet-count__btn");
const fieldBet = document.querySelectorAll(".select-bet-count__number");

const changeBet = function (field, fixedBtns, changeBtns) {
  let currentValue = Number(field.textContent) || 0;
  let currentOperation = "";

  changeBtns.forEach((el) => {
    el.addEventListener("click", () => {
      currentOperation = el.id;
      console.log(currentOperation);
    });
  });

  fixedBtns.forEach((el) => {
    el.addEventListener("click", () => {
      if (currentOperation === "plus") {
        currentValue += Number(el.textContent);
      } else if (
        currentOperation === "minus" &&
        currentValue > Number(el.textContent)
      ) {
        currentValue -= Number(el.textContent);
      }

      field.textContent = currentValue;
    });
  });
};

const firstFixedHalf = Array.from(fixedBetBtns).slice(0, 5);
const firstChangedHalf = Array.from(changeBetBtns).slice(0, 2);
console.log(firstFixedHalf, firstChangedHalf);

const secondFixedHalf = Array.from(fixedBetBtns).slice(5);
const secondChangedHalf = Array.from(changeBetBtns).slice(2);
console.log(secondFixedHalf, secondChangedHalf);

fieldBet.forEach((field, index) => {
  if (index === 0) {
    changeBet(field, firstFixedHalf, firstChangedHalf);
  } else if (index === 1) {
    changeBet(field, secondFixedHalf, secondChangedHalf);
  }
});
