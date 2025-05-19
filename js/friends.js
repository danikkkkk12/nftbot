// Копирование ссылки
const copyButton = document.getElementById("copyLinkBtn");
const notification = document.getElementById("copyNotification");

if (copyButton) {
  copyButton.addEventListener("click", async function (e) {
    e.preventDefault();
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
  inviteMainButton.addEventListener("click", function (e) {
    e.preventDefault();
    const shareMessage = `🚀 Привет!\n🌟 Я приглашаю тебя в эксклюзивного Telegram-бота!\n💰 Бонус: Получи 10% от депозита друга!\n🔗 Открыть бота: https://t.me/nftgo_bot\n🔥 Присоединяйся прямо сейчас!`;

    if (navigator.share) {
      navigator
        .share({
          title: "Приглашение в бота NFTGo",
          text: shareMessage,
          url: "https://t.me/nftgo_bot",
        })
        .catch((err) => {
          console.log("Web Share не сработал, используем fallback");
          openTelegramShare(shareMessage);
        });
    } else {
      openTelegramShare(shareMessage);
    }
  });
}

function openTelegramShare(message) {
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(
    "https://t.me/nftgo_bot"
  )}&text=${encodeURIComponent(message)}`;

  if (/Android/i.test(navigator.userAgent)) {
    window.location.href = `intent://share?text=${encodeURIComponent(
      message
    )}#Intent;package=org.telegram.messenger;scheme=tg;end`;
  } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = `tg://msg?text=${encodeURIComponent(message)}`;
  } else {
    window.open(tgUrl, "_blank");
  }
  setTimeout(() => {
    if (!document.hidden) {
      window.open(tgUrl, "_blank");
    }
  }, 500);
}
