const copyButton = document.getElementById("copyLinkBtn");
const notification = document.getElementById("copyNotification");

if (copyButton) {
  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(
        "tg://resolve?domain=danikkkkk12_nftbot&startapp="
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
    const referralLink = window.location.href;
    const shareMessage = `🚀 *Привет!*
🌟 Я приглашаю тебя в *эксклюзивного Telegram-бота*!
💰 *Бонус:* Получи *10%* от депозита друга!
🔗 Открыть бота: https://t.me/nftgo_bot
🔥 *Присоединяйся прямо сейчас!*`;

    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      referralLink
    )}&text=${encodeURIComponent(shareMessage)}`;
    window.open(telegramShareUrl, "_blank");
  });
}
