const toggleButtons = document.querySelectorAll(".bal-inv__btn");
const betToggle = document.querySelector(".bet-Toggle");
const giftCard = document.querySelectorAll('.inventory-skins-items-card')
const userNames = document.querySelector('.user-page-profile__name')
const betContainer = document.querySelector('.bet-count-list') 
const userProfImg = document.querySelector('.user-page-profile__avatar')




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


giftCard.forEach((e) => {
  e.addEventListener('click', () => {
const betValueEl = e.querySelector('.inventory-skins-items-card__current');
const betValue = betValueEl ? betValueEl.textContent.trim() : '';
    betContainer.innerHTML += `
    <li class="swiper-slide bet-count-list__item">
            <div class="bet-count-list__profile">
            <img src="${userProfImg.src}" class="bet-count-list__avatar" alt="avatar">
              <h3 class="bet-count-list__username">${userNames.textContent}</h3>
            </div>
            <div class="bet-count-list__number">
            <span class="count">${betValue}</span>
              
              <img
                src="web/images/main/ton-icon.svg"
                alt="diamond"
                class="bet-count-list__diamond"
              />
            </div>
          </li>
    `
  })
})



