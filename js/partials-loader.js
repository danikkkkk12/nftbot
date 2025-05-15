// const templates = document.querySelectorAll("template[load]");
// const fetches = [];

// templates.forEach((el) => {
//   const url = el.getAttribute("load");
//   const fetchPromise = fetch(url)
//     .then((res) => res.text())
//     .then((html) => {
//       el.innerHTML = html;
//       const clone = el.content.cloneNode(true);
//       document.body.appendChild(clone);
//     });

//   fetches.push(fetchPromise);
// });

// Promise.all(fetches).then(() => {
//   const scripts = [
//     "js/main.js",
//     "js/balance.js",
//     "js/inventory.js",
//     "js/down-main.js",
//     "js/buy-gift.js",
//     "js/crash-game.js",
//     "js/nav-bar.js",
//   ];

//   scripts.forEach((src) => {
//     const script = document.createElement("script");
//     script.src = src;
//     document.body.appendChild(script);
//   });
// });
(async () => {
  const templates = document.querySelectorAll("template[load]");

  // Завантажуємо шаблони послідовно
  for (const el of templates) {
    const url = el.getAttribute("load");
    const res = await fetch(url);
    const html = await res.text();
    el.innerHTML = html;
    const clone = el.content.cloneNode(true);
    document.body.appendChild(clone);
  }

  // Завантажуємо скрипти послідовно
  const scripts = [
    "js/main.js",
    "js/balance.js",
    "js/inventory.js",
    "js/down-main.js",
    "js/buy-gift.js",
    "js/crash-game.js",
    "js/nav-bar.js",
    "js/profile.js",
  ];

  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
})();
