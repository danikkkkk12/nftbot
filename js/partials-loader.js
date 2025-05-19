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
    "js/add-user.js",
    "js/main.js",
    "js/ton.js",
    "js/balance.js",
    "js/inventory.js",
    "js/down-main.js",
    "js/buy-gift.js",
    "js/crash-game.js",
    "js/nav-bar.js",
    "js/profile.js",
    "js/frog-game.js",
    "js/giveaway.js",
    // "server/test-post.js",
    "js/friends.js",
    "js/translation.js"
  ];

  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.type = "module"
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }
})();
