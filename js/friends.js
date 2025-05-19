const copyButton = document.getElementById("copyLinkBtn");
const notification = document.getElementById("copyNotification");

if (copyButton) {
  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText("https://t.me/nftgo_bot");
      notification.classList.add("show");

      setTimeout(() => notification.classList.remove("show"), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Не удалось скопировать ссылку. Попробуйте вручную.");
    }
  });
}

const inviteMainButton = document.querySelector(".invite-button-main");

if (inviteMainButton) {
  inviteMainButton.addEventListener("click", function () {
    const telegramDeepLink = "https://t.me/nftgo_bot";
    const shareMessage = `
🚀 *Привет!*  
🌟 Я приглашаю тебя в *эксклюзивного Telegram-бота*!  

💰 *Бонус:* Получи *10%* от депозита друга!  
🔗 [Открыть бота](https://t.me/nftgo_bot)  

🔥 *Присоединяйся прямо сейчас!*  
`;

    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        telegramDeepLink
      )}&text=${encodeURIComponent(shareMessage)}`,
      "_blank"
    );
  });
}
