// function loadPartial(id, url) {
//   fetch(url)
//     .then((response) => response.text())
//     .then((html) => {
//       document.getElementById(id).innerHTML = html;
//     })
//     .catch((error) => {
//       console.error(`Ошибка загрузки ${url}:`, error);
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadPartial("main-content", "partials/main.html");
//   loadPartial("balance-inventory-content", "partials/down-main.html");
//   // loadPartial('balance-content', 'partials/balance.html');
//   loadPartial("buy-gift-content", "partials/buy-gift.html");
//   // loadPartial('inventory-content', 'partials/inventory.html');
// });
// // app.use(express.static("public"))

const templates = document.querySelectorAll("template[load]");
const fetches = [];

templates.forEach((el) => {
  const url = el.getAttribute("load");
  const fetchPromise = fetch(url)
    .then((res) => res.text())
    .then((html) => {
      el.innerHTML = html;
      const clone = el.content.cloneNode(true);
      document.body.appendChild(clone);
    });

  fetches.push(fetchPromise);
});

Promise.all(fetches).then(() => {
  const scripts = [
    "js/main.js",
    "js/balance.js",
    "js/down-main.js",
    "js/buy-gift.js",
    "js/inventory.js",
    "js/crash-game.js",
    "js/nav-bar.js",
  ];

  scripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  });
});
