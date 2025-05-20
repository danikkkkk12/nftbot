const modalBtn = document.querySelector('.modaBtn')
const mainBalance = document.querySelector(".main-balance");
const modal = document.getElementById('modalContent')

mainBalance.style = "cursor: pointer;"

mainBalance.addEventListener('click', () => {
  modal.classList.toggle("is-hidden");
});

modalBtn.addEventListener('click', () => {
   modal.classList.add("is-hidden");
   document.querySelector('body').classList.remove("no-scroll");
});