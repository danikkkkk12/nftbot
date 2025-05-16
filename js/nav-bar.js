const navItems = document.querySelectorAll(".icon-navigation-bar .nav-item");

function setActiveItem(clickedItem) {
  navItems.forEach((item) => {
    if (item !== clickedItem) {
      item.classList.remove("active-item");
    }
  });

  clickedItem.classList.add("active-item");
}

const sections = document.querySelectorAll("section");

navItems.forEach((item) => {
  item.addEventListener("click", function (event) {
    const targetId = event.currentTarget.id;
    console.log(targetId, event.currentTarget);

    sections.forEach((section) => {
      section.style.display = "none";
    });

    if (targetId === "profile") {
      document.querySelector(".user-page").style.display = "block";
    } else if (targetId === "rocket") {
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
