const navItems = document.querySelectorAll(".icon-navigation-bar .nav-item");
const iconNavigationBar = document.querySelector(".icon-navigation-bar");
const sections = document.querySelectorAll("section");

function setActiveItem(clickedItem) {
  navItems.forEach((item) => {
    item.classList.remove("active-item");
  });

  clickedItem.classList.add("active-item");

  if (clickedItem.id === "frog") {
    iconNavigationBar.classList.remove("purple-theme");
  } else {
    iconNavigationBar.classList.add("purple-theme");
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    const targetId = event.currentTarget.id;
    console.log(targetId, event.currentTarget);

    sections.forEach((section) => {
      section.style.display = "none";
    });

    if (targetId === "profile") {
      document.querySelector(".user-page").style.display = "block";
    } else if (targetId === "frog") {
      document.querySelector(".main-rocket").style.display = "block";
      document.querySelector(".down-main").style.display = "block";
    } else if (targetId === "gifts") {
      document.querySelector(".giveaway").style.display = "block";
    } else if (targetId === "bonus") {
      document.querySelector("#friends").style.display = "flex";
    }

    setActiveItem(this);
  });
});
const profileInvBtn = document.querySelector(".user-page-inventory__empty-btn")
profileInvBtn.addEventListener ("click", function(){
const sections = document.querySelectorAll("section")
sections.forEach((section) => {
      section.style.display = "none";
    });
      document.querySelector(".main-rocket").style.display = "block";
      document.querySelector(".down-main").style.display = "block";
})

document.addEventListener('DOMContentLoaded', () => {
    const initiallyActiveItem = document.querySelector(".icon-navigation-bar .nav-item.active-item");
    if (initiallyActiveItem) {
        if (initiallyActiveItem.id === "frog") {
            iconNavigationBar.classList.remove("purple-theme");
        } else {
            iconNavigationBar.classList.add("purple-theme");
        }
    } else {
        iconNavigationBar.classList.remove("purple-theme");
    }
});