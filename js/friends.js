const copyButton = document.getElementById("copyLinkBtn");
const notification = document.getElementById("copyNotification");

if (copyButton) {
  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(
        "tg://resolve?domain=nftgo_bot&startapp="
      );
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
    const shareMessage = `🚀 *Привет!*
🌟 Я приглашаю тебя в *эксклюзивного Telegram-бота*!
💰 *Бонус:* Получи *10%* от депозита друга!
🔗 Открыть бота: https://t.me/nftgo_bot
🔥 *Присоединяйся прямо сейчас!*`;
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tg://msg_url?url=${encodeURIComponent(
        "https://t.me/nftgo_bot"
      )}&text=${encodeURIComponent(shareMessage)}`;
    } else {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(
          "https://t.me/nftgo_bot"
        )}&text=${encodeURIComponent(shareMessage)}`,
        "_blank"
      );
    }
  });
}
