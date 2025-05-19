const fixedBetBtns = document.querySelectorAll(".select-bet-change__btn");
const changeBetBtns = document.querySelectorAll(".select-bet-count__btn");
const fieldBet = document.querySelectorAll(".select-bet-count__number");
const selectBetBtns = document.querySelectorAll(".select-bet__btn");
const balancePole = document.querySelector(".main-balance");
let balance = parseFloat(balancePole.textContent);

const changeBet = function (field, fixedBtns, changeBtns, selectBtn) {
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
      const num = Number(el.textContent);
      if (currentOperation === "plus") {
        currentValue += num;
      } else if (currentOperation === "minus" && currentValue >= num) {
        currentValue -= num;
      }

      field.textContent = currentValue;
    });
  });

  selectBtn.addEventListener("click", () => { 
    if (currentValue === 0) {
      alert("Сделайте ставку");
    } else if (currentValue <= balance) {
      field.textContent = "";
      alert("Ставка сделана");
    } else if (currentValue >= balance) {
      alert("Недостаточно средств на балансе");
    }
  });
  return currentValue;
};

const firstFixedHalf = Array.from(fixedBetBtns).slice(0, 5);
const firstChangedHalf = Array.from(changeBetBtns).slice(0, 2);
const firstSelectBtn = Array.from(selectBetBtns)[0];

const secondFixedHalf = Array.from(fixedBetBtns).slice(5);
const secondChangedHalf = Array.from(changeBetBtns).slice(2);
const secondSelectBtn = Array.from(selectBetBtns)[1];

fieldBet.forEach((field, index) => {
  if (index === 0) {
    changeBet(field, firstFixedHalf, firstChangedHalf, firstSelectBtn);
  } else if (index === 1) {
    changeBet(field, secondFixedHalf, secondChangedHalf, secondSelectBtn);
  }
});


module.exports = { changeBet }; 
// slider

new Swiper(".bet-count__swiper", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,

  mousewheel: true,
});
